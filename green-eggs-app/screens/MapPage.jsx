import * as Location from 'expo-location'; // for using Location for Geofencing (?)
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, StatusBar } from 'react-native';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import { Avatar, IconButton, MD3Colors, Provider } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigation } from '@react-navigation/native';
import { isPointInPolygon } from 'geolib';
import AvatarMenu from '../components/AvatarMenu';

const listOfMarkers = [
  { name: 'marker-1', latitude: 51.049999, longitude: -114.066666 },
  { name: 'marker-2', latitude: 51.050995, longitude: -114.071666 },
  { name: 'marker-3', latitude: 51.049999, longitude: -114.076666 },
  { name: 'marker-4', latitude: 51.045999, longitude: -114.071666 }
];

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
  ]
}; //51.042525331074025, -114.0626855495627

const arrayOfZones = [zone1, zone2];

export const MapPage = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [hideZone, setHideZone] = useState(null);
  const [location, setLocation] = useState(null);
  console.log(location);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleMarkers = () => {
    setShowMarkers(!showMarkers);
  };
  const handleZone = (polygonInfo) => {
    setHideZone(polygonInfo);
    console.log(polygonInfo);
  };

  //HERE WE USE useEffect TO FETCH ZONE/ POLYGON DATA FROM FIREBASE
  //SAVE THAT INFORMATION INTO A VARIABLE (E.G. POLYGONS, SETPOLYGONS?)

  useEffect(() => {
    const getForegroundPermission = async () => {
      let status = await Location.requestForegroundPermissionsAsync();
      // console.log(status);
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
          console.log('I got here, ', newLocation);
          setLocation(newLocation);
          // ONLY USE NEWLOCATION IN THIS SCOPE
          // find one of polygons in array where isPointInPolygon == true & setCurrentZoneId( zoneId )
          //filter out zones(polygon) where id=currentZoneId when displaying
          //query Firebase for eggs within zoneId (if applicable); setCurrentEggs()
          //if isPointInPolygon == false for all zones, setCurrentEggs([])

          const whichOne = arrayOfZones.find((zone) => (zone.id = 1));
          console.log('Which one was: ', whichOne);

          console.log(
            isPointInPolygon(
              {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
              },
              zone1.points
            )
          );
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

  // useEffect(() => {
  //   const getCurrentPosition = async () => {
  //     let location = await Location.getCurrentPositionAsync();
  //     // console.log(location);
  //     console.log('Latitude is:' + location.coords.latitude);
  //     console.log('Longitude is:' + location.coords.longitude);
  //     console.log(polygonPoints);
  //     console.log(
  //       isPointInPolygon(
  //         {
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude
  //         },
  //         polygonPoints
  //       )
  //     );
  //     return;
  //   };
  //   getCurrentPosition();
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <MapView
        style={styles.map}
        showsUserLocation
        provider="google"
        initialRegion={{
          latitude: 51.049999,
          longitude: -114.066666,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {showMarkers &&
          listOfMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              pinColor="blue"
              onPress={(e) => console.log('You pressed me!')}
            />
          ))}
        {hideZone?.id !== 1 && (
          <Polygon
            coordinates={zone1.points}
            fillColor={zone1.fillColor}
            strokeWidth={0}
            // tappable={true}
            // onPress={() => {
            //   console.log('hi');
            // }}
          />
        )}
        {hideZone?.id !== 2 && (
          <Polygon
            coordinates={zone2.points}
            fillColor={zone2.fillColor}
            strokeWidth={0}
            // tappable={true}
            // onPress={() => {
            //   console.log('hi');
            // }}
          />
        )}
        <Marker
          coordinate={{
            latitude: 51.03755651477399,
            longitude: -114.04153733167199
          }}
          //   image={{uri: 'custom_pin'}}
          pinColor="rgb(255,0,0)"
          onPress={(e) =>
            hideZone?.id == 1
              ? handleZone(zone2)
              : hideZone?.id == 2
              ? handleZone(null)
              : handleZone(zone1)
          }
        />
        <Marker
          coordinate={{ latitude: 51.049999, longitude: -114.066666 }}
          //   image={{uri: 'custom_pin'}}
          pinColor="yellow"
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
            source={require('../sample-face.jpg')}
          />
        </Pressable>
      </View>
      <AvatarMenu
        visible={showMenu}
        handleMenu={handleMenu}
        navigation={navigation}
      />

      <AudioPlayer visible={showModal} handleModal={handleModal} />

      <View style={styles.playButtonContainer}>
        <IconButton
          icon="play-circle"
          iconColor={MD3Colors.error50}
          mode={'contained-tonal'}
          containerColor={'#ffffff'}
          size={35}
          onPress={() => setShowModal(true)}
        />
      </View>
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
