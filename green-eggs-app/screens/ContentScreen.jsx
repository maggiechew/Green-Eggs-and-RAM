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
  const { userInfo, setUserInfo, user } = useContext(AuthenticatedUserContext);
  const { currentEgg, setCurrentEgg } = useContext(EggsUserContext);
  const creator = currentEgg.Creator;
  const egg = currentEgg.Egg;
  const arLink = egg.eggURIs.arURI;
  const userID = user.uid;
  const navigation = useNavigation();
  const [value, setValue] = useState(currentEgg.eggName);

  const newLikeEggs = async (egg) => {
    await updateDoc(doc(db, 'users', userID), {
      likedEggs: arrayUnion(egg.id)
    });
    navigation.navigate('MyEggs');
  };

  const removeEggs = async (egg) => {
    await updateDoc(doc(db, 'users', userID), {
      likedEggs: arrayRemove(egg.id)
    });
    navigation.navigate('MyEggs');
  };
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      arLink
    );
    setResult(result);
  };
  
  return (
    <View style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Card mode='elevated' style={{ backgroundColor: 'white' }}>
            <Card.Title
              title={egg.eggName}
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
                  {/* <Button
                    onPress={() => {
                      console.log('Loved it');
                    }}
                  >
                    Love
                  </Button> */}
                  <Button
                    onPress={() => {
                      newLikeEggs(currentEgg);
                      console.log('Liked it');
                    }}
                  >
                    Like
                  </Button>
                  <Button
                    onPress={() => {
                      removeEggs(currentEgg);
                      console.log('Remove Egg');
                    }}
                  >
                    Remove
                  </Button>
                  {/* <Button
                    onPress={() => {
                      console.log('Reported it');
                    }}
                  >
                    Report
                  </Button> */}
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
              <Text>Click here to enjoy your AR experience</Text>
            </Button>
          )}
          <List.Section style={styles.list}>
            <List.Accordion title='Learn More'>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: egg.eggName,
                    label: 'More about the Egg'
                  },
                  {
                    value: creator.creatorName,
                    label: 'More about the Creator'
                  }
                ]}
              />
              <List.Item title={value} />
              {value === egg.eggName && (
                <>
                  <Text>{egg.eggDescription}</Text>
                </>
              )}
              {value === creator.creatorName && (
                <>
                  <Text>{creator.creatorBlurb}</Text>
                </>
              )}
            </List.Accordion>
          </List.Section>
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
    backgroundColor: 'white',
    background: 'white'
  },
  buttons: {
    flex: 1,

    alignItems: 'center'
  },
  shortDescription: {
    paddingVertical: 10,
    paddingTop: 15
  },
  list: {
    margin: 20
  },
  arButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    textColor: 'white',
    backgroundColor: '#FFCC33'
  }
});
