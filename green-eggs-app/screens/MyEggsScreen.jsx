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
  const { userInfo } = useContext(AuthenticatedUserContext);
  const { setCurrentEgg } = useContext(EggsUserContext);
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

  const getCreator = async (creatorID) => {
    const creatorRef = doc(db, 'creators', creatorID);
    const docSnap = await getDoc(creatorRef);
    if (!docSnap.exists) {
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
              navigation.navigate('Content', { fromMyEgg: true });
            }}
          >
            <Image
              style={{ width: imgWidth, height: imgWidth }}
              source={
                      egg.eggURIs?.imageURI
                        ? { uri: egg.eggURIs.imageURI }
                        : require('../wonderlandSculpture-egg.jpg')
                    }
            />
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

function ImagesDiscoveredEggs() {
  const imgWidth = Dimensions.get('screen').width * 0.5;
  const { userInfo } = useContext(AuthenticatedUserContext);
  const userDiscoveredEggs = userInfo.discoveredEggs;
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
          discoverEggsInfo.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setDiscoverEggsInfo(discoverEggsInfo);
      };
      getDiscoverEggsInfo();
    } else {
      setDiscoverEggsInfo([]);
    }
  }, [userDiscoveredEggs]);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}
      >
        {discoverEggsInfo?.map(
          (egg, index) => (
            (
              <TouchableHighlight
                key={index}
                onPress={() => {
                  Alert.alert(
                    'This egg has only been discovered!\nLike this egg to save it for later'
                  );
                }}
              >
                <>
                  <Image
                    style={{
                      width: imgWidth,
                      height: imgWidth,
                      tintColor: '#616161'
                    }}
                    source={
                      egg.eggURIs?.imageURI
                        ? { uri: egg.eggURIs.imageURI }
                        : require('../wonderlandSculpture-egg.jpg')
                    }
                  />

                  <Image
                    style={{
                      width: imgWidth,
                      height: imgWidth,
                      position: 'absolute',
                      opacity: 0.2
                    }}
                    source={
                      egg.eggURIs?.imageURI
                        ? { uri: egg.eggURIs.imageURI }
                        : require('../wonderlandSculpture-egg.jpg')
                    }
                  />
                </>
              </TouchableHighlight>
            )
          )
        )}
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
                    backgroundColor: `#111111`,
                    borderWidth: 2,
                    borderColor: 'white'
                  }}
                  onPress={() => setShowContent('ImagesLikedEggs')}
                >
                  <Text
                    style={{
                      ...styles.interactButtonText,
                      color:
                        showContent === 'ImagesLikedEggs' ? 'gold' : 'orange',
                      fontFamily:
                        showContent === 'ImagesLikedEggs'
                          ? 'SSBold'
                          : 'SSRegular',
                      fontSize: 18
                    }}
                  >
                    LIKED: {userInfo?.likedEggs?.length || 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: `#111111`,
                    borderWidth: 2,
                    borderColor: 'white'
                  }}
                  onPress={() => setShowContent('ImagesDiscoveredEggs')}
                >
                  <Text
                    style={{
                      ...styles.interactButtonText,
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
                    DISCOVERED: {userInfo?.discoveredEggs?.length || 0}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* end of test */}
            </View>
            {/* border */}
            <View
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                marginTop: 10
              }}
            />

            {/* Audio Images View */}
            <View style={{ marginTop: 20 }}>
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
    backgroundColor: `#111111`,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    backgroundColor: `#111111`,
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
