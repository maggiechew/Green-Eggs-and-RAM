import * as Location from 'expo-location';
import { isPointInPolygon, isPointWithinRadius } from 'geolib';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import AvatarMenu from '../components/AvatarMenu';
import { Markers } from '../components/Markers';
import { useEggsUserContext } from '../providers/EggsSoundProvider';
import { zonesFromDB } from '../utils/geopoints';
import AudioSheet from '../components/AudioSheet';
import MessagingModal from '../components/MessagingModal';
import { Zones } from '../components/Zones';
import { AuthenticatedUserContext } from '../providers';
import { eggTotalFetch } from '../utils/eggFetch';
import { getGeoEggPoints } from '../utils/geoeggpoints';
import { mapStyle } from '../components/mapStyle';

export const MapPage = ({ navigation, children }) => {
  const [arrayOfZones, setArrayOfZones] = useState();
  const [showMenu, setShowMenu] = useState(false);

  const {
    setCurrentEgg,
    currentEgg,
    showModal,
    setShowModal,
    modalType,
    setModalType,
    sound,
    setSound
  } = useEggsUserContext();
  // MODAL STATES: enterZone, tutorial, newEgg

  const [activeZone, setActiveZone] = useState(null);
  const [location, setLocation] = useState(null);
  const [eggsInRange, setEggsInRange] = useState();
  const [zoneEggs, setZoneEggs] = useState();
  const [userStats, setUserStats] = useState({});
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo, user } = authContext;
  const userID = user.uid;

  const defaultPicture = require('../assets/defaultavatar.jpg');

  async function _getEggTotal() {
    const eggs = await eggTotalFetch();
    setUserStats({ ...userStats, everyEgg: eggs });
  }

  useEffect(() => {
    async function _getZones() {
      const zones = await zonesFromDB();
      setArrayOfZones(zones);
    }

    _getZones();
    _getEggTotal();
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.seenTutorial) {
        setModalType('tutorial');
        setShowMenu(false);
        setShowModal(true);
      }
    }
  }, [userInfo]);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const getForegroundPermission = async () => {
      let status = await Location.requestForegroundPermissionsAsync();
      if (!status.granted) {
        Alert.alert(
          'Permission to access location was denied',
          'Permissions are required to use this app! To turn location on, go to the App Settings from your phone menu.'
        );
        return;
      }
    };
    getForegroundPermission();
  }, []);

  useEffect(() => {
    if (arrayOfZones == null) return;
    // no-op subscription. in case not successful
    let subscription = { remove: () => {} };

    // subscribe async function
    const subscribe = async () => {
      return await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest, distanceInterval: 2 },
        (newLocation) => {
          setLocation(newLocation);

          const usersZone = arrayOfZones.find((zone) =>
            isPointInPolygon(
              {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
              },
              zone.geopoints
            )
          );

          const determineZone = () => {
            if (activeZone !== usersZone) {
              if (usersZone === undefined) {
                setActiveZone(null);
                setCurrentEgg(null);
              } else {
                setActiveZone(usersZone);
                if (modalType !== 'enterZone' && modalType !== 'tutorial') {
                  setModalType('enterZone');
                }
              }
            }
          };
          determineZone();
        }
      );
    };

    // return subscription promise
    subscribe()
      .then((result) => (subscription = result))
      .catch((err) => console.warn(err));

    // return remove function for cleanup
    return subscription.remove;
  }, [arrayOfZones]);

  useEffect(() => {
    if (activeZone) {
      _getEggTotal();
      setShowMenu(false);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [activeZone]);

  useEffect(() => {
    if (zoneEggs) {
      const isItInRadius = (egg) => {
        return isPointWithinRadius(
          {
            latitude: egg.geopoint.latitude,
            longitude: egg.geopoint.longitude
          },
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          egg.discoveryRadius ? egg.discoveryRadius : 100
        );
      };

      const replacementEggs = [];
      zoneEggs?.forEach((egg) => {
        if (isItInRadius(egg)) {
          replacementEggs.push(egg);
        }
      });
      replacementEggs !== eggsInRange ? setEggsInRange(replacementEggs) : null;
    }
  }, [location, zoneEggs]);

  useEffect(() => {
    async function _getTheEggs() {
      const eggos = await getGeoEggPoints(activeZone);
      setZoneEggs(eggos);
    }

    if (activeZone) {
      _getTheEggs();
    } else {
      setZoneEggs(null);
      setEggsInRange(null);
      setCurrentEgg(null);

      setUserStats({});
    }
  }, [activeZone, userInfo]);

  useEffect(() => {
    const discoveredEggs = userInfo?.discoveredEggs;
    const allDiscoveredEggs = discoveredEggs?.length || 0;

    const totalEggs = userStats?.everyEgg;
    let returnValue = 0;
    const zoneEggLength = zoneEggs?.length;
    zoneEggs?.forEach((zoneEgg) => {
      if (discoveredEggs?.find((discovered) => discovered == zoneEgg.id))
        returnValue++;
    });
    const percentageZoneDiscovered = Math.ceil(
      (returnValue / zoneEggLength) * 100
    );
    const percentageAllDiscovered = Math.ceil(
      (allDiscoveredEggs / totalEggs) * 100
    );

    const toSetStats = {
      ...userStats,
      zoneFoundPercentage: percentageZoneDiscovered,
      allDiscovered: allDiscoveredEggs,
      allFoundPercentage: percentageAllDiscovered
    };
    setUserStats(toSetStats);
  }, [zoneEggs, userInfo]);

  if (arrayOfZones == null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {location && (
        <MapView
          style={styles.map}
          showsCompass={false}
          customMapStyle={mapStyle}
          showsUserLocation
          showsMyLocationButton
          provider='google'
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          {arrayOfZones?.map((zone) => {
            if (zone?.id === activeZone?.id) {
              return (
                <Markers
                  key={zone.id}
                  zoneEggs={zoneEggs}
                  eggsInRange={eggsInRange}
                  navigation={navigation}
                />
              );
            } else return <Zones key={zone.id} zone={zone} />;
          })}
        </MapView>
      )}

      <View style={styles.avatarButtonContainer}>
        <Pressable
          onPress={() => {
            handleMenu();
          }}
        >
          <Avatar.Image
            style={[styles.avatar, { backgroundColor: `#111111` }]}
            source={
              userInfo?.avataruri == null
                ? defaultPicture
                : {
                    uri: userInfo.avataruri
                  }
            }
          />
        </Pressable>
      </View>
      <AvatarMenu
        visible={showMenu}
        handleMenu={handleMenu}
        navigation={navigation}
        userStats={userStats}
      />
      <MessagingModal
        visible={showModal}
        userInfo={userInfo}
        stats={userStats}
        modalType={modalType}
        handleModal={handleModal}
      />

      <AudioSheet navigation />

      <StatusBar style='light' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  avatarButtonContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    zIndex: 46
  },
  avatar: {
    borderWidth: 3,
    margin: 2,
    borderColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  playButtonContainer: {
    paddingRight: 10,
    paddingBottom: 20,
    zIndex: 5,
    alignSelf: 'flex-end'
  },
  button: {
    zIndex: 45,
    paddingRight: 10
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});
