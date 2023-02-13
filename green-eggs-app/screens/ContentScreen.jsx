import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
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
import { EggsUserContext } from '../providers/EggsSoundProvider';

export const ContentScreen = () => {
  const { currentEgg } = useContext(EggsUserContext);
  const creator = currentEgg.Creator;
  const egg = currentEgg.Egg;
  const arLink = egg.eggURIs.arURI;

  const navigation = useNavigation();
  const [value, setValue] = useState(currentEgg.eggName);
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
              <View style={styles.buttons}></View>
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
