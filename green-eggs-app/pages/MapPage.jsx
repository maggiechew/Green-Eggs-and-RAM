import { ImageBackground, StyleSheet, Text, View, Easing } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

const listOfMarkers = [
  { name: "marker-1", latitude: 51.049999, longitude: -114.066666 },
  { name: "marker-2", latitude: 51.050995, longitude: -114.071666 },
  { name: "marker-3", latitude: 51.049999, longitude: -114.076666 },
  { name: "marker-4", latitude: 51.045999, longitude: -114.071666 },
];

const MapPage = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation='true'
        initialRegion={{
          latitude: 51.049999,
          longitude: -114.066666,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {listOfMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}

        <Marker
          coordinate={{ latitude: 51.049999, longitude: -114.066666 }}
          //   image={{uri: 'custom_pin'}}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
// {/* <View style={styles.container}>
// <View style={styles.textContainer}>
//       <Text style={styles.text}>MapPage</Text>
//       </View>
//     </View> */}
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "space-between",
//       backgroundColor:'pink'
//     },
//     textContainer: {
//       flex: 1,
//       justifyContent: "center",
//       maxHeight: 200,
//       marginTop: 20,
//     },
//     text: {
//       color: "white",
//       fontSize: 42,
//       lineHeight: 84,
//       fontWeight: "bold",
//       textAlign: "center",
//       backgroundColor: "#000000c0",
//     },
//     buttonContainer: {
//       marginBottom: 10,
//       // backgroundColor: 'pink'
//     },
//     button: {
//       marginBottom: 10,
//       marginHorizontal: 10,
//       backgroundColor: "#FFCC33",
//       color: "black",
//       // textColor: 'blue'
//     },
//   });

export default MapPage;
