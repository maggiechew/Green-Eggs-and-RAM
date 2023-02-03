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
import { getPolygon } from '../utils/geopoints';
import { connectStorageEmulator } from 'firebase/storage';
import { getEggGeo } from '../utils/geoeggpoints';

// const userHasFoundEggs = zone.eggs.filter(egg => user.eggs.includes(egg))
const getZone = async () => {
  const zone1 = {
    id: 1,
    fillColor: 'rgb(173,216,230)',

    points: await getPolygon(db, '0siUtfXKMH0t7WUEmp8c'),
    eggs: await getEggGeo(db, '4Erv42U5LYyH2T9YtiOm')

    // eggs: [
    //   await getEggGeo(db, '4Erv42U5LYyH2T9YtiOm'),
    //   await getEggGeo(db, '8Iq7h03tsrJgPTCV5LF8'),
    //   await getEggGeo(db, 'LgECFIh2QEvyiouEknwp')
    // ]
  };
  const zone2 = {
    id: 2,
    fillColor: 'rgb(255,0,0)',
    points: await getPolygon(db, 'gSLkCCFwpnTU2PLqJfI3'),

    eggs: [
      {
        id: 'marker-26',
        latitude: 51.0426260995715,
        longitude: -114.0578971961368
      },
      {
        id: 'marker-22',
        latitude: 51.04332912164011,
        longitude: -114.05306167652023
      }
    ]
  };

  const arrayOfZones = [zone1, zone2];
  return arrayOfZones;
};
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
  useEffect(() => {
    const getZones = async () => {
      const zones = await getZone();
      setArrayOfZones(zones);
    };
    getZones();
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
              zone.points
            )
          );

          const determineZone = () => {
            if (usersZone === undefined) {
              setZoneToHide(null);
              setEggsInRange(null);
            } else {
              //if zoneToHide is not null, then we can use it to filter the eggs
              // const zoneEggs = await fetchEggs(usersZone.id);
              // const zoneEggs = usersZone.eggs;
              // if zoneToHide === usersZone, then we can use the eggs in the zone
              // if zoneToHide !== usersZone, do not show eggs
              setZoneToHide(usersZone);
            }
          };
          determineZone();

          if (usersZone) {
            //if user is in zone (line 153) const zoneEggs = await fetch (...)
            //add to new line in 154
            const isItInRadius = (point) => {
              return isPointWithinRadius(
                { latitude: point.latitude, longitude: point.longitude },
                {
                  latitude: newLocation.coords.latitude,
                  longitude: newLocation.coords.longitude
                },
                100
              );
            };

            const replacementEggs = [];
            // zoneEggs.forEach((egg) => {
            usersZone.eggs.forEach((egg) => {
              if (isItInRadius(egg)) {
                replacementEggs.push(egg);
              }
            });
            setEggsInRange(replacementEggs);
          }
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
            return (
              <Markers
                key={zone.id}
                zone={zone}
                currentEggs={eggsInRange}
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
