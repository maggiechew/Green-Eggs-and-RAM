import * as Location from 'expo-location'; // for using Location for Geofencing (?)
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, StatusBar } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Avatar, IconButton, MD3Colors, Provider } from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigation } from '@react-navigation/native';
import AvatarMenu from '../components/AvatarMenu';

const listOfMarkers = [
  { name: 'marker-1', latitude: 51.049999, longitude: -114.066666 },
  { name: 'marker-2', latitude: 51.050995, longitude: -114.071666 },
  { name: 'marker-3', latitude: 51.049999, longitude: -114.076666 },
  { name: 'marker-4', latitude: 51.045999, longitude: -114.071666 }
];

export const MapPage = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
  }, []);
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
        {listOfMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            pinColor='blue'
          onPress={e => console.log('You pressed me!')}

          />
        ))}

        <Marker
          coordinate={{ latitude: 51.049999, longitude: -114.066666 }}
          //   image={{uri: 'custom_pin'}}
          pinColor='yellow'
          onPress={e => navigation.navigate('Content')}
          >
        </Marker>
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
      <AvatarMenu visible={showMenu} handleMenu={handleMenu} />

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
