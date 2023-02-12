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
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../providers';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config';
// Fonts

function ImagesLiked({ images }) {
  const imgWidth = Dimensions.get('screen').width * 0.33333;
  const { userInfo } = useContext(AuthenticatedUserContext);
  const userLikedEggs = userInfo.likedEggs;
  const userDiscoveredEggs = userInfo.discoveredEggs;

  const [userEggsURI, setUserEggsURI] = useState([]);
  let currentUserEggs = collection(db, 'eggs');
  console.log('currentUserEggsInfodetail!!!!!!!!!: ', currentUserEggs);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}
      >
        {images.map(() => (
          <View key={index}>
            <Image
              style={{ width: imgWidth, height: imgWidth }}
              source={{ uri: images }}
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
  console.log('likedeggs: ', userInfo.likedEggs);
  console.log('discoveredeggs: ', userInfo.discoveredEggs);

  const userLikedEggs = userInfo.likedEggs;
  console.log('userLikedEggs: ', userLikedEggs);
  let UsersEggsInfo = collection(db, 'eggs');
  console.log('AllEggsInfodetail: ', UsersEggsInfo);
  const unsubscribe = onSnapshot(UsersEggsInfo, (querySnapshot) => {
    const usersEggs = querySnapshot.docs.map((doc) => doc.data());
    console.log('usersEggs: ', usersEggs);
  });

  const [totalEggCount, setTotalEggCount] = useState(0);
  useEffect(() => {
    let totalRef = collection(db, 'eggs');
    const unsubscribe = onSnapshot(totalRef, (querySnapshot) => {
      setTotalEggCount(querySnapshot.size);
    });
    return () => unsubscribe();
  }, []);

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
                  <Text style={styles.countNum}>
                    {userInfo.discoveredEggs.length}
                  </Text>
                  <Text style={styles.countText}>DISCOVERED</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>{totalEggCount}</Text>
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
