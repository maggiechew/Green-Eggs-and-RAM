import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  Easing
} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
// import MapButton from '../components/MapButton';
// put MapButton here cause i couldn't remember how to pass state up
import * as Location from 'expo-location'; // for using Location for Geofencing (?)
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';

const listOfMarkers = [
  { name: 'marker-1', latitude: 51.049999, longitude: -114.066666 },
  { name: 'marker-2', latitude: 51.050995, longitude: -114.071666 },
  { name: 'marker-3', latitude: 51.049999, longitude: -114.076666 },
  { name: 'marker-4', latitude: 51.045999, longitude: -114.071666 }
];

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    // Location.requestBackgroundPermissionsAsync()
    // Location.getCurrentPositionAsync().then((response) => {
    //   console.log(response)
    // })
    // Location.getForegroundPermissionsAsync().then((response) => {
    //   console.log(response);
    // });
  }, []);
  return (
    <View style={styles.container}>
      <AudioPlayer visible={showModal} />
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
        {listOfMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          />
        ))}

        <Marker
          coordinate={{ latitude: 51.049999, longitude: -114.066666 }}
          //   image={{uri: 'custom_pin'}}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="play-circle"
          iconColor={MD3Colors.Neutral10}
          mode={'contained-tonal'}
          containerColor={'#ffffff'}
          size={35}
          onPress={() => setShowModal(true)}
        />
      </View>
    </View>

    // <View style={styles.container}>
    //     <View style={styles.testContainer}></View>
    //     <View style={styles.buttonContainer}>
    //     <MapButton />
    //     </View>
    // </View>
  );
};

//TODO: add drawer/ change icon on mapbutton click
//TODO: what happens if they give one permission vs another for location?
//TODO: what is the practical difference in using fine vs coarse location?
//TODO: will the map page start focused on their location? If they are not within x distance of a zone, what (if anything) happens?

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexWrap: 'wrap-reverse',
    backgroundColor: 'blue',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
    // flexDirection: 'ltr',
    // height:'100%'
    // padding: 20
  },
  testContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    // position:'absolute',
    backgroundColor: 'pink'
  },
  buttonContainer: {
    // flex: 1,
    paddingRight: 10,
    paddingBottom: 20,
    zIndex: 46,
    alignItems: 'flex-end'
    // position:'absolute',
    // backgroundColor:'red'
  },
  button: {
    // alignSelf:'flex-end',
    zIndex: 45,
    // flex:1,
    paddingRight: 10
    // position: 'absolute',
  },
  map: {
    // flex: 9,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

export default MapPage;
