import { useNavigation } from '@react-navigation/native';
import {
  collection, doc, documentId,
  getDoc,
  getDocs, query,
  where
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { db, Images } from '../config';
import { AuthenticatedUserContext } from '../providers';
import { EggsUserContext } from '../providers/EggsSoundProvider';
function ImagesLikedEggs() {
  const imgWidth = Dimensions.get('screen').width * 0.5;
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  const { currentEgg, setCurrentEgg } = useContext(EggsUserContext);
  const userLikedEggs = userInfo.likedEggs;
  const navigation = useNavigation();

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

  // console.log('AllLikeEggsInfo', likeEggsInfo);
  const imageURIs = likeEggsInfo?.map(
    (image) => image.eggURIs.imageURI || 'defaultImage'
  );

  const getCreator = async (creatorID) => {
    const creatorRef = doc(db, 'creators', creatorID);
    const docSnap = await getDoc(creatorRef);
    if (!docSnap.exists) {
      console.log('No such document!');
    } else {
      const creatorData = docSnap.data();
      return {
        creatorName: creatorData.creatorName,
        creatorAvatarURI: creatorData.creatorAvatarURI,
        creatorBlurb: creatorData.creatorBlurb
      };
    }
  };

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
        {likeEggsInfo?.map((egg, index) => (
          // console.log('egg!!!!: ', egg),
          <TouchableHighlight
            key={index}
            onPress={async () => {
              console.log('EGGGGG is', egg);
              const creatorInfo = await getCreator(egg.creatorID);
              const combinedEgg = { Egg: egg, Creator: creatorInfo };
              setCurrentEgg(combinedEgg);
              navigation.navigate('Content');
            }}
          >
            <Image
              style={{ width: imgWidth, height: imgWidth }}
              source={{
                uri: egg.eggURIs.imageURI ? egg.eggURIs.imageURI : Images.logo
              }}
            />
          </TouchableHighlight>
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
              Alert.alert('LIKED the egg, you can see more details');
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
  console.log('userInfo: ', userInfo);
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
              {/* User NAME */}
              <View>
                <Text style={styles.name}>
                  Hi, {userInfo.firstname} {userInfo.lastname}
                </Text>
              </View>
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>
                    {userInfo.likedEggs.length}
                  </Text>
                  <Text style={styles.countText}>LIKED</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>
                    {userInfo.discoveredEggs.length}
                  </Text>
                  <Text style={styles.countText}>DISCOVERED</Text>
                </View>
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
  countNum: { fontFamily: 'SSBold', fontSize: 20, color: '#4b7bec' },
  countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#4b7bec' },
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
  },
  name: {
    fontFamily: 'SSBold',
    fontSize: 20,
    color: '#333',
    marginTop: 10,
    textAlign: 'center'
  }
});
