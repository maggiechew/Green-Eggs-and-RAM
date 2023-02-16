import * as Location from 'expo-location';
import { isPointInPolygon, isPointWithinRadius } from 'geolib';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import AvatarMenu from '../components/AvatarMenu';
import { Markers } from '../components/Markers';
import { Zones } from '../components/Zones';
import { useEggsUserContext } from '../providers/EggsSoundProvider';
import { zonesFromDB } from '../utils/geopoints';

import AudioSheet from '../components/AudioSheet';
import MessagingModal from '../components/MessagingModal';
import { AuthenticatedUserContext } from '../providers';
import { getGeoEggPoints } from '../utils/geoeggpoints';

export const MapPage = ({ navigation, children }) => {
  const [arrayOfZones, setArrayOfZones] = useState();
  const [showMenu, setShowMenu] = useState(false);

  const {
    currentEgg,
    setCurrentEgg,
    showModal,
    setShowModal,
    currentEggID,
    setCurrentEggID,
    modalType,
    setModalType
  } = useEggsUserContext();
  // MODAL STATES: enterZone, tutorial, newEgg

  const [zoneToHide, setZoneToHide] = useState(null);
  const [location, setLocation] = useState(null);
  const [eggsInRange, setEggsInRange] = useState();
  const [zoneEggs, setZoneEggs] = useState();
  const [userStats, setUserStats] = useState({});

  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo, user } = authContext;
  const userID = user.uid;

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

  useEffect(() => {
    async function _getEgg() {
      const testEgg = await getEgg(currentEggID);
      const testCreator = await getCreator(testEgg.creatorID);
      const combinedEgg = { ...testEgg, ...testCreator };
      setCurrentEgg(combinedEgg);
    }
    if (currentEggID) {
      _getEgg();
    } else {
      setCurrentEgg(null);
    }
  }, [currentEggID]);

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
        { accuracy: Location.LocationAccuracy.Highest },
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
            if (zoneToHide !== usersZone) {
              if (usersZone === undefined) {
                setZoneToHide(null);
                setCurrentEgg(null);
              } else {
                setZoneToHide(usersZone);
                if (modalType !== 'enterZone' && modalType !== 'tutorial') {
                  setModalType('enterZone');
                  setShowModal(true);
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
          100
        );
      };

      const replacementEggs = [];
      zoneEggs?.forEach((egg) => {
        if (isItInRadius(egg)) {
          replacementEggs.push(egg);
        }
      });
      setEggsInRange(replacementEggs);
    }
  }, [location, zoneEggs]);

  //leave this for dicorverd eggs_Yan
  useEffect(() => {
    if (!eggsInRange || eggsInRange.length == 0) return;
    const updatedUser = { ...userInfo };
    updatedUser.discoverdEggs = updatedUser.discoverdEggs || [];
    eggsInRange.forEach((eggsInRange) => {
      if (!updatedUser.discoverdEggs.includes(eggsInRange.id)) {
        updatedUser.discoverdEggs.push(eggsInRange.id);
      }
    });
  }, [eggsInRange]);

  useEffect(() => {
    async function _getTheEggs() {
      const eggos = await getGeoEggPoints(zoneToHide);
      setZoneEggs(eggos);
    }

    if (zoneToHide) {
      _getTheEggs();
    } else {
      setZoneEggs(null);
      setEggsInRange(null);
      setUserStats({});
    }
  }, [zoneToHide, userInfo]);

  useEffect(() => {
    const collectedEggs = userInfo?.likedEggs;
    let returnValue = 0;
    const zoneEggLength = zoneEggs?.length;
    zoneEggs?.forEach((zoneEgg) => {
      if (collectedEggs?.find((discovered) => discovered == zoneEgg.id))
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
      <MapView
        style={styles.map}
        showsUserLocation
        provider='google'
        initialRegion={{
          latitude: 51.049999,
          longitude: -114.066666,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {arrayOfZones?.map((zone) => {
          if (zone?.id === zoneToHide?.id) {
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
