import * as Location from 'expo-location'; // for using Location for Geofencing (?)
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, StatusBar } from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import { Avatar, IconButton, MD3Colors, Provider } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigation } from '@react-navigation/native';
import { isPointInPolygon } from 'geolib';
import AvatarMenu from '../components/AvatarMenu';
import { Zones } from '../components/Zones';
import { Markers } from '../components/Markers';
import { getUserProfile } from '../components/AddProfile';
import { auth } from '../config';

const zone1 = {
  id: 1,
  fillColor: 'rgb(173,216,230)',
  points: [
    { latitude: 51.0506186802187, longitude: -114.08367378327999 },
    { latitude: 51.053312338017435, longitude: -114.07846131626596 },
    { latitude: 51.05417256819195, longitude: -114.06697534262804 },
    { latitude: 51.05217362530177, longitude: -114.0622938623375 },
    { latitude: 51.051236724285225, longitude: -114.06024068209865 },
    { latitude: 51.04397146747781, longitude: -114.061396652624 },
    { latitude: 51.04436672076427, longitude: -114.07841507201293 },
    // { latitude: 51.036344130366125, longitude: -114.0804120774693 },
    { latitude: 51.047404302242114, longitude: -114.08261847677073 }
  ],
  eggs: [
    { id: 'marker-1', latitude: 51.049999, longitude: -114.066666 },
    { id: 'marker-2', latitude: 51.050995, longitude: -114.071666 },
    { id: 'marker-3', latitude: 51.049999, longitude: -114.076666 }
  ]
};
const zone2 = {
  id: 2,
  fillColor: 'rgb(255,0,0)',
  points: [
    { latitude: 51.04379680428058, longitude: -114.05301340155006 },
    { latitude: 51.04275306351686, longitude: -114.05012606287124 },
    { latitude: 51.039417227860916, longitude: -114.05535868020573 },
    { latitude: 51.042525331074025, longitude: -114.0626855495627 }
  ],
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

// TEST FOR EGG // AUDIOPLAYER
const egg = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd',
  eggName: 'egg name is cool!'
};

export const MapPage = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hideZone, setHideZone] = useState(null);
  const [location, setLocation] = useState(null);
  const [userProfile, setUserProfile] = useState({});
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

  const handleModal = () => {
    setShowModal(!showModal);
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
    // no-op subscription. in case not successful
    let subscription = { remove: () => {} };

    // subscribe async function
    const subscribe = async () => {
      return await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest },
        (newLocation) => {
          setLocation(newLocation);
          // ONLY USE NEWLOCATION IN THIS SCOPE

          // find one of polygons in array where isPointInPolygon == true & setCurrentZoneId( zoneId )
          //filter out zones(polygon) where id=currentZoneId when displaying
          //query Firebase for eggs within zoneId (if applicable); setCurrentEggs()
          //if isPointInPolygon == false for all zones, setCurrentEggs([])

          //currently eggs are conceptualized as part of zone object; can be updated to fetch dynamically upon request

          const whichOne = arrayOfZones.find((zone) =>
            isPointInPolygon(
              {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
              },
              zone.points
            )
          );
          // console.log('Which one is: ', whichOne);

          const determineZone = () => {
            if (whichOne === undefined) {
              setHideZone(null);
            } else setHideZone(whichOne);
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
  }, []);

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
        <Zones arrayOfZones={arrayOfZones} hideZone={hideZone} />

        <Marker
          coordinate={{
            latitude: 51.044325278363814,
            longitude: -114.09243144347215
          }}
          //   image={{uri: 'custom_pin'}}
          pinColor='blue'
          onPress={(e) => navigation.navigate('Content')}
        />
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

      <AudioPlayer
        visible
        egg={egg}
        showModal={true}
        handleModal={handleModal}
        navigation
      />

      {/* <View style={styles.playButtonContainer}>
        <IconButton
          icon='play-circle'
          iconColor={MD3Colors.error50}
          mode={'contained-tonal'}
          containerColor={'#ffffff'}
          size={35}
          onPress={() => setShowModal(true)}
        />
      </View> */}
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
  avatar: {
    // borderColor:'gray',
    // borderWidth: 50,
    // borderRadius:300,
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
