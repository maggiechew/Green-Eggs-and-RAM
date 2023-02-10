import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../providers';

import { EggsUserContext } from '../providers/EggsSoundProvider';
// Fonts

function ImagesSaved({ images }) {
  const imgWidth = Dimensions.get('screen').width * 0.33333;
  const { currentEgg } = useContext(EggsUserContext);
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}
      >
        {images.map((ImagesSaved, index) => (
          <View key={index}>
            <Image
              title={currentEgg.eggName}
              subtitle={currentEgg.creatorName}
              style={{ width: imgWidth, height: imgWidth }}
              source={{ uri: currentEgg.eggURIs.imageURI }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export const MyEggsScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo } = authContext;

  console.log('userInfo: ', userInfo);
  console.log('eggs: ', userInfo.likedEggs);
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/photo%2FCalgary-1.png?alt=media&token=8c091175-62a8-46b6-a224-9bdfba2c736b'
              }}
            />
          </View>
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: userInfo.avataruri }}
                />
              </View>
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>
                    {userInfo.likedEggs.length}
                  </Text>
                  <Text style={styles.countText}>SAVE</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>8</Text>
                  <Text style={styles.countText}>DISCOVERED</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>10</Text>
                  <Text style={styles.countText}>TOTAL</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coverImage: { height: 200, width: Dimensions.get('window').width },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff'
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontFamily: 'SSBold', fontSize: 20 },
  countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' }
});
