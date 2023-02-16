import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  SegmentedButtons,
  Text
} from 'react-native-paper';
import AudioPlayer from '../components/AudioPlayer';
import { db } from '../config';
import { AuthenticatedUserContext } from '../providers';
import { EggsUserContext } from '../providers/EggsSoundProvider';

export const ContentScreen = () => {
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  const { currentEgg } = useContext(EggsUserContext);
  const creator = currentEgg.Creator;
  const egg = currentEgg.Egg;
  const arLink = egg.eggURIs.arURI;
  const userID = user.uid;
  const navigation = useNavigation();
  const [value, setValue] = useState(currentEgg.eggName);

  const newLikeEggs = async () => {
    await updateDoc(doc(db, 'users', userID), {
      likedEggs: arrayUnion(currentEgg.Egg.id)
    });

    navigation.navigate('MyEggs');
  };

  const removeEggs = async () => {
    await updateDoc(doc(db, 'users', userID), {
      likedEggs: arrayRemove(currentEgg.Egg.id)
    });
  };

  const [setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(arLink);
    setResult(result);
  };

  return (
    <View style={styles.background}>
      <ScrollView style={styles.container}>
        <Card mode='elevated' style={{ backgroundColor: 'black' }}>
          <Card.Title
            title={egg.eggName}
            titleStyle={{ color: 'gold', fontSize: 16 }}
            subtitleStyle={{ color: 'white' }}
            subtitle={creator.creatorName}
            subtitleNumberOfLines={2}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{ uri: creator.creatorAvatarURI }}
              />
            )}
          />
          <AudioPlayer contentButton={false} />
          <Card.Content>
            {/* <Divider /> */}
            <Text variant='bodyMedium' style={styles.shortDescription}>
              {egg.eggBlurb}
            </Text>

            <Divider />
            <Card.Cover source={{ uri: currentEgg.Egg.eggURIs.imageURI }} />
            <View style={styles.buttons}>
            <Card.Actions style={styles.buttons}>
                  {!userInfo.likedEggs.includes(currentEgg.Egg.id) ? (
                    <Button
                      onPress={() => {
                        newLikeEggs(currentEgg);
                      }}
                    >
                      Add To My Liked Eggs
                    </Button>
                  ) : (
                    <Button
                      onPress={() => {
                        removeEggs(currentEgg);
                      }}
                    >
                      Remove From My Liked Eggs
                    </Button>
                  )}
                  </Card.Actions>



            </View>
          </Card.Content>
        </Card>
       
        {arLink && (
          <Button
            style={styles.arButton}
            onPress={() => {
              _handlePressButtonAsync();
            }}
          >
            <Text>Click here for an Augmented Reality (AR) experience</Text>
          </Button>
        )}
        <View>
          <Text style={styles.bodyText}>{egg.eggDescription}</Text>
        </View>
        <View>
          <View style={styles.creatorView}>
            <Text style={[styles.bodyText, styles.titleText]}>
              About the Creator
            </Text>
            <Card.Title
              subtitleStyle={{ color: 'white' }}
              subtitle={creator.creatorName}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  source={{ uri: creator.creatorAvatarURI }}
                />
              )}
            />
            <Text style={styles.bodyText}>{creator.creatorBlurb}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '80%'
  },
  card: {
    height: '100%'
  },
  subcontent: {
    height: '20%'
  },
  sampleAudio: {
    height: '75%'
  },
  background: {
    height: '100%',
    alignContent: 'space-between',
    backgroundColor: 'black'
    // background: 'black'
  },
  buttons: {
    flex: 1,
    alignItems: 'center'
  },
  shortDescription: {
    paddingVertical: 10,
    paddingTop: 15,
    color: 'white'
  },
  list: {
    margin: 20
  },
  arButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    textColor: 'white',
    backgroundColor: '#FFCC33'
  },
  bodyText: {
    color: 'white',
    marginHorizontal: 20
  },
  titleText: {
    color: 'gold',
    marginVertical: 10,
    marginBottom: 0,
    fontSize: 16
  },
  creatorView: {
    margin: 10
  }
});
