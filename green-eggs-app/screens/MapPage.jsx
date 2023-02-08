import * as Location from 'expo-location';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, StatusBar } from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import { Avatar, IconButton, MD3Colors, Provider } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigation } from '@react-navigation/native';
import { isPointInPolygon, isPointWithinRadius } from 'geolib';
import AvatarMenu from '../components/AvatarMenu';
import {
  getCreator,
  getEgg,
  useEggsUserContext
} from '../providers/EggsSoundProvider';
import { Zones } from '../components/Zones';
import { Markers } from '../components/Markers';
import { getUserProfile } from '../components/AddProfile';
import { auth } from '../config';
import { db } from '../config';
import { zonesFromDB } from '../utils/geopoints';
import { connectStorageEmulator } from 'firebase/storage';

import { getGeoEggPoints } from '../utils/geoeggpoints';
import { AuthenticatedUserContext } from '../providers';
import { collection, getDocs, query } from 'firebase/firestore';
import MessagingModal from '../components/MessagingModal';

export const MapPage = ({ navigation, children }) => {
  const [arrayOfZones, setArrayOfZones] = useState();
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // const [currentEggID, setCurrentEggID] = useState(null);
  const [currentEggID, setCurrentEggID] = useState('35WPCG0Ax3Gc7JlJRnNJ');

  const { currentEgg, setCurrentEgg } = useEggsUserContext();
  const { sound, setSound } = useEggsUserContext();
  const { isPlayerReady, setIsPlayerReady } = useEggsUserContext();
  const { isPlaying, setIsPlaying } = useEggsUserContext();
  const { showModal, setShowModal } = useEggsUserContext();

  const [zoneToHide, setZoneToHide] = useState(null);
  const [location, setLocation] = useState(null);
  const [eggsInRange, setEggsInRange] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [zoneEggs, setZoneEggs] = useState();

  const [userStats, setUserStats] = useState({});

  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo } = authContext;

  useEffect(() => {}, [showModal]);

  useEffect(() => {
    async function _getZones() {
      const zones = await zonesFromDB();
      setArrayOfZones(zones);
    }
    _getZones();
  }, []);

  useEffect(() => {
    async function _getUserProfile() {
      const userData = await getUserProfile();
      setUserProfile(userData);
    }
    if (auth.currentUser) {
      _getUserProfile();
    }
  }, [auth]);

  useEffect(() => {
    async function _getEgg() {
      const testEgg = await getEgg(currentEggID);
      const testCreator = await getCreator(testEgg.creatorID);
      const combinedEgg = { ...testEgg, ...testCreator };
      // console.log('MP TEST EGG: ', combinedEgg);
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
              } else {
                setZoneToHide(usersZone);
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

  useEffect(() => {
    async function _getTheEggs() {
      const eggos = await getGeoEggPoints(zoneToHide);
      setZoneEggs(eggos);
    }

    

    if (zoneToHide) {
      _getTheEggs()
    } else {
      setZoneEggs(null);
      setEggsInRange(null);
      setUserStats({})
    }
  }, [zoneToHide, userInfo]);

  useEffect(() => {
      const collectedEggs = userInfo?.eggs;
      let returnValue = 0;
      const zoneEggLength = zoneEggs?.length;
      zoneEggs?.forEach((zoneEgg) => {
        if (collectedEggs?.find((discovered) => discovered == zoneEgg.id))
          returnValue++;
      });
      const percentageZoneDiscovered = (returnValue / zoneEggLength) * 100;

      setUserStats({ ...userStats, zoneFound: percentageZoneDiscovered });
    
  },[zoneEggs, userInfo])


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
            style={styles.avatar}
            source={{
              uri:
                userInfo?.avataruri == null || userInfo?.avataruri == ''
                  ? 'https://img.freepik.com/free-icon/user_318-792327.jpg?w=2000'
                  : userInfo.avataruri
            }}
          />
        </Pressable>
      </View>
      <AvatarMenu
        visible={showMenu}
        handleMenu={handleMenu}
        navigation={navigation}
      />
      <MessagingModal visible={showModal} />

      <AudioPlayer visible={showAudioPlayer} navigation />

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
    zIndex: 46,
    alignSelf: 'flex-start'
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
