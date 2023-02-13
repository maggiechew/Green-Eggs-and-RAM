import { View, StyleSheet, StatusBar } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Card,
  Text,
  Divider,
  List,
  Avatar,
  SegmentedButtons
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
// import AudioPlayer from '../components/AudioPlayer';
import {
  EggsUserContext,
  useEggsUserContext
} from '../providers/EggsSoundProvider';

export const ContentScreen = () => {
  const { currentEgg } = useContext(EggsUserContext);

  const creator = currentEgg.Creator;
  const egg= currentEgg.Egg;
  console.log('egg', egg)

  const navigation = useNavigation();
  const [value, setValue] = useState(currentEgg.eggName);

  // Don't think the below is required as egg isn't pressable until in range/ egg found.

  // if (!currentEgg) {
  //   return <Text>NO EGG FOUND YET! Go find some eggs. </Text>;
  // }

  return (
    <View style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Card mode='elevated'>
            <Card.Title
              title={egg.eggName}
              subtitle={egg.creatorName}
              subtitleNumberOfLines={2}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  source={{ uri: creator.creatorAvatarURI }}
                />
              )}
            />
            <Card.Content>
              <Divider />
              <Text variant='bodyMedium' style={styles.shortDescription}>
                {egg.eggBlurb}
              </Text>
              {/* <Text style={styles.link}> </Text> */}
              <Divider />
              <Card.Cover source={{ uri: egg.eggURIs.imageURI }} />
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
                      console.log('Saved it');
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    onPress={() => {
                      console.log('Remove it');
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
      {/* <Card style={styles.subcontent}>
        <Card mode="contained" style={styles.sampleAudio}>
          <Text variant="headlineLarge">Audio Player here</Text>
          <Text>Audio Player here</Text>
        </Card>
        <Button onPress={() => navigation.navigate('Map')}>Go Back</Button>
      </Card> */}
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
    alignContent: 'space-between'
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
  }
});
