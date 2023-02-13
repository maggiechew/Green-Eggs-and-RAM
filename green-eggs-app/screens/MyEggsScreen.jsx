import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../providers';
import { Images } from '../config';
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  documentId
} from 'firebase/firestore';
import { db } from '../config';

function ImagesLikedEggs() {
  const imgWidth = Dimensions.get('screen').width * 0.5;
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  const userLikedEggs = userInfo.likedEggs;

  console.log('userLikedEggs: ', userLikedEggs);
  const [likeEggsInfo, setLikeEggsInfo] = useState(null);

  useEffect(() => {
    if (userLikedEggs) {
      const getLikeEggsInfo = async () => {
        const q = query(
          collection(db, 'eggs'),
          where(documentId(), 'in', userLikedEggs)
        );
        const querySnapshot = await getDocs(q);
        const likeEggsInfo = [];
        querySnapshot.forEach((doc) => {
          likeEggsInfo.push(doc.data());
        });
        setLikeEggsInfo(likeEggsInfo);
      };
      getLikeEggsInfo();
    }
  }, [userLikedEggs]);

  console.log('AllLikeEggsInfo', likeEggsInfo);
  const imageURIs = likeEggsInfo?.map((image) => image.eggURIs.imageURI);
  console.log('imageURIs: ', imageURIs);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}
      >
        {imageURIs?.map((image, index) => (
          <View key={index}>
            <Image
              style={{ width: imgWidth, height: imgWidth }}
              onPress={() => {
                navigator.navigate('Content');
              }}
              source={{ uri: image }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

function ImagesDiscoveredEggs() {
  const imgWidth = Dimensions.get('screen').width * 0.5;
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  const userDiscoveredEggs = userInfo.discoveredEggs;
  const navigation = useNavigation();
  console.log('userDiscoveredEggs: ', userDiscoveredEggs);
  const [discoverEggsInfo, setDiscoverEggsInfo] = useState(null);

  useEffect(() => {
    if (userDiscoveredEggs) {
      const getDiscoverEggsInfo = async () => {
        const q = query(
          collection(db, 'eggs'),
          where(documentId(), 'in', userDiscoveredEggs)
        );
        const querySnapshot = await getDocs(q);
        const discoverEggsInfo = [];
        querySnapshot.forEach((doc) => {
          discoverEggsInfo.push(doc.data());
        });
        setDiscoverEggsInfo(discoverEggsInfo);
      };
      getDiscoverEggsInfo();
    }
  }, [userDiscoveredEggs]);

  // console.log('AllDiscoverEggsInfo', discoverEggsInfo);
  const imageDiscoverURIs = discoverEggsInfo?.map(
    (image) => image.eggURIs.imageURI || 'defaultImage'
  );
  console.log('imageDiscoverURIs: ', imageDiscoverURIs);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}
      >
        {imageDiscoverURIs?.map((image, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              navigation.navigate('Content');
            }}
          >
            <Image
              style={{ width: imgWidth, height: imgWidth }}
              source={image == 'defaultImage' ? Images.logo : { uri: image }}
            />
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

export const MyEggsScreen = () => {
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo } = authContext;
  const [totalEggCount, setTotalEggCount] = useState(0);

  useEffect(() => {
    let totalRef = collection(db, 'eggs');
    const unsubscribe = onSnapshot(totalRef, (querySnapshot) => {
      setTotalEggCount(querySnapshot.size);
    });
    return () => unsubscribe();
  }, []);

  const [showContent, setShowContent] = useState('ImagesLikedEggs');

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
              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity style={styles.interactButton}>
                  <Text style={styles.interactButtonText}>Follower</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: '#4b7bec'
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: '#4b7bec' }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Audio Images View */}
            <View style={{ marginTop: 20 }}>
              <View style={styles.profileContentButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'ImagesLikedEggs' ? 2 : 0
                  }}
                  onPress={() => setShowContent('ImagesLikedEggs')}
                >
                  <Text style={styles.showContentButtonText}>Liked Eggs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth:
                      showContent === 'ImagesDiscoveredEggs' ? 2 : 0
                  }}
                  onPress={() => setShowContent('ImagesDiscoveredEggs')}
                >
                  <Text style={styles.showContentButtonText}>
                    Discovered Eggs
                  </Text>
                </TouchableOpacity>
              </View>
              {showContent === 'ImagesLikedEggs' ? (
                <ImagesLikedEggs />
              ) : (
                <ImagesDiscoveredEggs />
              )}
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
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
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
  countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6'
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000'
  },
  showContentButtonText: {
    color: '#333',
    fontFamily: 'SSRegular',
    fontSize: 18
  }
});
