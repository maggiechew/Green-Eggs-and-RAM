import * as Location from 'expo-location'; // for using Location for Geofencing (?)
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Avatar, IconButton, MD3Colors } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';

const listOfMarkers = [
  { name: 'marker-1', latitude: 51.049999, longitude: -114.066666 },
  { name: 'marker-2', latitude: 51.050995, longitude: -114.071666 },
  { name: 'marker-3', latitude: 51.049999, longitude: -114.076666 },
  { name: 'marker-4', latitude: 51.045999, longitude: -114.071666 }
];

export const MapPage = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.avatarButtonContainer}>
        <Avatar.Image
          style={styles.avatar}
          source={require('../sample-face.jpg')}
        />
      </View>
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
    // borderColor: 'blue',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  // avatarContainer: {
  //   borderColor: 'pink',
  //   borderWidth: 4,
  //   zIndex: 47
  // },
  avatarButtonContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    zIndex: 46,
    // alignItems: 'flex-end',
    alignSelf: 'flex-start'
    // borderColor: 'blue',
    // borderWidth: 4
  },
  avatar: {
    // borderColor:'gray',
    // borderWidth: 50
  },

  playButtonContainer: {
    paddingRight: 10,
    paddingBottom: 20,
    zIndex: 46,
    alignSelf: 'flex-end'
    // borderColor: 'red',
    // borderWidth: 4
  },
  // playButton: {
  //   paddingRight: 10,
  //   paddingBottom: 20,
  //   zIndex: 46,
  //   alignItems: 'flex-end',
  //   borderColor: 'green',
  //   borderWidth: 4
  // },
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
