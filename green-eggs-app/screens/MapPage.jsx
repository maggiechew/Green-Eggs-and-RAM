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
import { getGeoEggPoints } from '../utils/geoeggpoints';

export const MapPage = ({ navigation, children }) => {
  const { setCurrentEgg, showModal, setShowModal, modalType, setModalType } =
    useEggsUserContext();
  // MODAL STATES: enterZone, tutorial, newEgg
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo, user } = authContext;

  const [arrayOfZones, setArrayOfZones] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [location, setLocation] = useState(null);
  const [eggsInRange, setEggsInRange] = useState();
  const [zoneEggs, setZoneEggs] = useState();
  const [userStats, setUserStats] = useState({});
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo, user } = authContext;

  const defaultPicture = require('../assets/defaultavatar.jpg');

  useEffect(() => {
    async function _getZones() {
      const zones = await zonesFromDB();
      setArrayOfZones(zones);
    }
    _getZones();
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.seenTutorial) {
        setModalType('tutorial');
        setShowModal(true);
      }
    }
  }, [userInfo]);

  const handleMenu = () => {
    setShowMenu(!showMenu);
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
      setUserStats({});
    }
  }, [activeZone, userInfo]);

  useEffect(() => {
    const discoveredEggs = userInfo?.discoveredEggs;
    let returnValue = 0;
    const zoneEggLength = zoneEggs?.length;
    zoneEggs?.forEach((zoneEgg) => {
      if (discoveredEggs?.find((discovered) => discovered == zoneEgg.id))
        returnValue++;
    });
    const percentageZoneDiscovered = (returnValue / zoneEggLength) * 100;

    setUserStats({ ...userStats, zoneFound: percentageZoneDiscovered });
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
          showsUserLocation
          showsMyLocationButton
          provider='google'
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
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
            style={[styles.avatar, { backgroundColor: 'black' }]}
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
      />
      <MessagingModal
        visible={showModal}
        stats={userStats}
        modalType={modalType}
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
    // alignSelf: 'flex-start'
  },
  avatar: {
    borderWidth: 3,
    borderColor: 'gold',
    // borderStyle: 'solid',
    padding: -3,
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
