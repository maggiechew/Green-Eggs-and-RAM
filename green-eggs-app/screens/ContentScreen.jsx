import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Card,
  Divider,
  List,
  SegmentedButtons,
  Text
} from 'react-native-paper';
// import AudioPlayer from '../components/AudioPlayer';
import AudioPlayer from '../components/AudioPlayer';
import { EggsUserContext } from '../providers/EggsSoundProvider';

export const ContentScreen = () => {
  const { currentEgg } = useContext(EggsUserContext);

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
          <Card mode='elevated' style={{ backgroundColor: 'white' }}>
            <Card.Title
              title={currentEgg.eggName}
              subtitle={currentEgg.creatorName}
              subtitleNumberOfLines={2}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  source={{ uri: currentEgg.creatorAvatarURI }}
                />
              )}
            />
            <AudioPlayer contentButton={false} />
            <Card.Content>
              <Divider />
              <Text variant='bodyMedium' style={styles.shortDescription}>
                {currentEgg.eggBlurb}
              </Text>

              <Divider />
              <Card.Cover source={{ uri: currentEgg.eggURIs.imageURI }} />
              <View style={styles.buttons}></View>
            </Card.Content>
          </Card>
          <List.Section style={styles.list}>
            <List.Accordion title='Learn More'>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: currentEgg.eggName,
                    label: 'More about the Egg'
                  },
                  {
                    value: currentEgg.creatorName,
                    label: 'More about the Creator'
                  }
                ]}
              />
              <List.Item title={value} />
              {value === currentEgg.eggName && (
                <>
                  <Text>{currentEgg.eggDescription}</Text>
                </>
              )}
              {value === currentEgg.creatorName && (
                <>
                  <Text>{currentEgg.creatorBlurb}</Text>
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
  }
});
