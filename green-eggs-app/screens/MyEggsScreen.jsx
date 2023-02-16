import { useNavigation } from '@react-navigation/native';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
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

  const [likeEggsInfo, setLikeEggsInfo] = useState(null);

  useEffect(() => {
    if (userLikedEggs && userLikedEggs.length > 0) {
      const getLikeEggsInfo = async () => {
        const q = query(
          collection(db, 'eggs'),
          where(documentId(), 'in', userLikedEggs)
        );
        const querySnapshot = await getDocs(q);
        const likeEggsInfo = [];
        querySnapshot.forEach((doc) => {
          likeEggsInfo.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setLikeEggsInfo(likeEggsInfo);
      };
      getLikeEggsInfo();
    } else {
      setLikeEggsInfo([]);
    }
  }, [userLikedEggs]);

  const imageURIs = likeEggsInfo?.map(
    (image) => image.eggURIs.imageURI || 'defaultImage'
  );

  const getCreator = async (creatorID) => {
    const creatorRef = doc(db, 'creators', creatorID);
    const docSnap = await getDoc(creatorRef);
    if (!docSnap.exists) {
      // console.log('No such document!');
    } else {
      const creatorData = docSnap.data();
      return {
        creatorName: creatorData.creatorName,
        creatorAvatarURI: creatorData.creatorAvatarURI,
        creatorBlurb: creatorData.creatorBlurb
      };
    }
  };

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
          <TouchableHighlight
            key={index}
            onPress={async () => {
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
  const [discoverEggsInfo, setDiscoverEggsInfo] = useState(null);

  useEffect(() => {
    if (userDiscoveredEggs && userDiscoveredEggs.length > 0) {
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
    } else {
      setDiscoverEggsInfo([]);
    }
  }, [userDiscoveredEggs]);

  const imageDiscoverURIs = discoverEggsInfo?.map(
    (image) => image.eggURIs.imageURI || 'defaultImage'
  );

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
              Alert.alert('This egg has only been discovered! Like this egg to see this egg');
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
                  {userInfo.firstname} {userInfo.lastname}
                </Text>
              </View>
              {/* test */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white'
                  }}
                  onPress={() => setShowContent('ImagesLikedEggs')}
                >
                  <Text style={{ ...styles.interactButtonText, color: 'gold' }}>
                    LIKED: {userInfo.likedEggs.length}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white'
                  }}
                  onPress={() => setShowContent('ImagesDiscoveredEggs')}
                >
                  <Text style={{ ...styles.interactButtonText, color: 'gold' }}>
                    DISCOVERED: {userInfo.discoveredEggs.length}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* end of test */}
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
                  <Text
                    style={{
                      color:
                        showContent === 'ImagesLikedEggs' ? 'gold' : 'orange',
                      fontFamily:
                        showContent === 'ImagesLikedEggs'
                          ? 'SSBold'
                          : 'SSRegular',
                      fontSize: 18
                    }}
                  >
                    Liked Eggs
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth:
                      showContent === 'ImagesDiscoveredEggs' ? 2 : 0
                  }}
                  onPress={() => setShowContent('ImagesDiscoveredEggs')}
                >
                  <Text
                    style={{
                      color:
                        showContent === 'ImagesDiscoveredEggs'
                          ? 'gold'
                          : 'orange',
                      fontFamily:
                        showContent === 'ImagesDiscoveredEggs'
                          ? 'SSBold'
                          : 'SSRegular',
                      fontSize: 18
                    }}
                  >
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    // height: 1000,
    backgroundColor: 'black',
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
    borderColor: 'white'
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontFamily: 'SSBold', fontSize: 20, color: 'gold' },
  countText: { fontFamily: 'SSRegular', fontSize: 18, color: 'gold' },
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
  // showContentButtonTextLiked: {
  //   color: showContent === 'ImagesLikedEggs' ? 'gold' : 'orange',
  //   fontFamily: 'SSRegular',
  //   fontSize: 18
  // },
  // showContentButtonTextDisc: {
  //   color: showContent === 'ImagesDiscoveredEggs' ? 'gold' : 'orange',
  //   fontFamily: 'SSRegular',
  //   fontSize: 18
  // },
  name: {
    fontFamily: 'SSBold',
    fontSize: 20,
    color: 'gold',
    marginTop: 10,
    textAlign: 'center'
  },
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
    margin: 5,
    borderRadius: 4
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    fontSize: 18,
    paddingVertical: 6
  }
});
