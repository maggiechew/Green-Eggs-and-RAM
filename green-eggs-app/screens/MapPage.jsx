import * as Location from 'expo-location';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, StatusBar } from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import { Avatar, IconButton, MD3Colors, Provider } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigation } from '@react-navigation/native';
import { isPointInPolygon, isPointWithinRadius } from 'geolib';
import AvatarMenu from '../components/AvatarMenu';
import { useEggsUserContext } from '../components/EggsUserProvider';
import { Zones } from '../components/Zones';
import { Markers } from '../components/Markers';
import { getUserProfile } from '../components/AddProfile';
import { auth } from '../config';
import { db } from '../config';
import { getPolygon, zonesFromDB } from '../utils/geopoints';
import { connectStorageEmulator } from 'firebase/storage';
import { getEggGeo, getMaggieEgg } from '../utils/geoeggpoints';
import { collection, getDocs, query } from 'firebase/firestore';

// const userHasFoundEggs = zone.eggs.filter(egg => user.eggs.includes(egg))
// const getZone = () => {
//   // const zone = await getPolygon();

//   const zone1 = {
//     id: 1,
//     fillColor: 'rgb(173,216,230)',

//     points: [
//       { latitude: 51.0506186802187, longitude: -114.08367378327999 },
//       { latitude: 51.053312338017435, longitude: -114.07846131626596 },
//       { latitude: 51.05417256819195, longitude: -114.06697534262804 },
//       { latitude: 51.05217362530177, longitude: -114.0622938623375 },
//       { latitude: 51.051236724285225, longitude: -114.06024068209865 },
//       { latitude: 51.04397146747781, longitude: -114.061396652624 },
//       { latitude: 51.04436672076427, longitude: -114.07841507201293 },
//       { latitude: 51.047404302242114, longitude: -114.08261847677073 }
//     ],

//     eggs: [
//       { id: 'marker-1', latitude: 51.049999, longitude: -114.066666 },
//       { id: 'marker-2', latitude: 51.050995, longitude: -114.071666 },
//       { id: 'marker-3', latitude: 51.049999, longitude: -114.076666 }
//     ]
//   };
//   const zone2 = {
//     id: 2,
//     fillColor: 'rgb(255,0,0)',
//     points: [
//       { latitude: 51.04379680428058, longitude: -114.05301340155006 },
//       { latitude: 51.04275306351686, longitude: -114.05012606287124 },
//       { latitude: 51.039417227860916, longitude: -114.05535868020573 },
//       { latitude: 51.042525331074025, longitude: -114.0626855495627 }
//     ],
//     eggs: [
//       {
//         id: 'marker-26',
//         latitude: 51.0426260995715,
//         longitude: -114.0578971961368
//       },
//       {
//         id: 'marker-22',
//         latitude: 51.04332912164011,
//         longitude: -114.05306167652023
//       }
//     ]
//   };
// };
// TEST FOR EGG // AUDIOPLAYER
const egg21 = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd',
  eggName: 'Egg 21 cool!',
  eggDescription: 'this is a cool egg Description!'
};
const egg = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd',
  eggName: 'Egg name is cool!',
  eggDescription: 'this is a cool egg Description!'
};
const egg2 = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd',
  eggName: 'Egg name is 222222 cool!',
  eggDescription: 'this is a cool egg Description!'
};

export const MapPage = ({ navigation, children }) => {
  const [arrayOfZones, setArrayOfZones] = useState();
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { currentEgg, setCurrentEgg } = useEggsUserContext();
  const { sound, setSound } = useEggsUserContext();
  const { isPlayerReady, setIsPlayerReady } = useEggsUserContext();
  const { isPlaying, setIsPlaying } = useEggsUserContext();

  // console.log('mappage: ', currentEgg);
  const [zoneToHide, setZoneToHide] = useState(null);
  const [location, setLocation] = useState(null);
  const [eggsInRange, setEggsInRange] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [zoneEggs, setZoneEggs] = useState();
  useEffect(() => {
    // const getZones = async () => {
    async function _getZones() {
      const zones = await zonesFromDB();
      // console.log('MUH ZONES@@@@!!!!!!!', zones);
      setArrayOfZones(zones);
    }
    // };
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

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  //HERE WE USE useEffect TO FETCH ZONE/ POLYGON DATA FROM FIREBASE
  //SAVE THAT INFORMATION INTO A VARIABLE (E.G. zones, setZones?)

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
    // console.log('ARRAY OF ZONES IS!!!', arrayOfZones);
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
    console.log('MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', zoneEggs)
    const isItInRadius = (egg) => {
      return isPointWithinRadius(
        { latitude: egg.geopoint.latitude, longitude: egg.geopoint.longitude },
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        100
      );
    };

    const replacementEggs = [];
    zoneEggs?.eggs.forEach((egg) => {
      if (isItInRadius(egg.geopoint)) {
        replacementEggs.push(egg);
      }
    });
    console.log('REPLACEMENT EGGS', replacementEggs)
    setEggsInRange(replacementEggs);
  }
},[location])

  // useEffect(() => {
  //   async function _getUserProfile() {
  //     const userData = await getUserProfile();
  //     setUserProfile(userData);
  //   }
  //   if (auth.currentUser) {
  //     _getUserProfile();
  //   }
  // }, [auth]);

  useEffect(() => {
    async function _getTheEggs() {
      const eggos = await getMaggieEgg(zoneToHide);
      // console.log('MUH EGGOSSSS!', eggos)
      setZoneEggs(eggos);
    }

    if (zoneToHide) {
      _getTheEggs();
      // console.log('HI MOM')
    } else {
      setZoneEggs(null);
      setEggsInRange(null);
    }
  }, [zoneToHide]);

  // temp egg2 until firestore connected
  useEffect(() => {
    setCurrentEgg(egg2);
  }, []);

  if (arrayOfZones == null) {
    return null;
  }
  // console.log('arrayOfZones: ', JSON.stringify(arrayOfZones));
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
          // console.log('\n\n\nfoo zone', JSON.stringify(zone));
          if (zone?.id === zoneToHide?.id) {
            // console.log('\n\n\nreturn markers');
            {/* console.log('ZONE EGGS!!!!!!!!!', zoneEggs);
            console.log('egggggs in RAAAAAAAAANGE', eggsInRange) */}
            return (
              <Markers
                key={zone.id}
                zoneEggs={zoneEggs}
                eggsInRange={eggsInRange}
                navigation={navigation}
              />
            );
          } else {
            // console.log('\n\n\nreturn zone');
            if (zone.id == 1) {
              zone.points = zone.points.map((x) => ({
                latitude: x.latitude,
                longitude: x.longitude
              }));
              // console.log('=====');
            }
            // console.log('+++++', zone);
            return <Zones key={zone.id} zone={zone} />;
          }
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
                userProfile?.avataruri == null || userProfile?.avataruri == ''
                  ? 'https://img.freepik.com/free-icon/user_318-792327.jpg?w=2000'
                  : userProfile.avataruri
            }}
          />
        </Pressable>
      </View>
      <AvatarMenu
        visible={showMenu}
        handleMenu={handleMenu}
        navigation={navigation}
      />

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
