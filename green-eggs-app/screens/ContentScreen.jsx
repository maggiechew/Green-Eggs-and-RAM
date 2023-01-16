import { View, StyleSheet, StatusBar } from 'react-native';
import React, { useState } from 'react';
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

const ContentScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('The Piece');

  return (
    <View style={styles.background}>
      <ScrollView style={styles.container}>
        <Card mode="elevated">
          <Card.Title
            title="COOL EGG NAME"
            subtitle="@CoolEggPerson"
            subtitleNumberOfLines={2}
            left={(props) => (
              <Avatar.Image {...props} source={require('../crazy-chick.jpg')} />
            )}
          />
          <Card.Content>
            <Divider />
            <Text variant="bodyMedium" style={styles.shortDescription}>
              Here's a short descriptor of this egg. Blah blah blah. Doop doop
              doop. I'm a good egg.
              Here's a short descriptor of this egg. Blah blah blah. Doop doop
              doop. I'm a good egg.
            </Text>
            {/* <Text style={styles.link}> </Text> */}
            <Divider />
          <View style={styles.buttons}>
          <Card.Actions style={styles.buttons}>
          <Button onPress={() => {console.log('Loved it')}}>Love</Button>
          <Button onPress={() => {console.log('Saved it')}}>Save</Button>
          <Button onPress={() => {console.log('Shared it')}}>Share</Button>
          <Button onPress={() => {console.log('Reported it')}}>Report</Button>
        </Card.Actions>
        </View>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={require('../Content-Photo.jpg')} />
          <Card.Content>
            <List.Section>
              <List.Accordion
                title="Learn More"
              >
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  buttons={[
                    {
                      value: 'The Piece',
                      label: 'More about the piece'
                    },
                    {
                      value: 'The Artist',
                      label: 'More about the Artist'
                    }
                  ]}
                />
                <List.Item title={value} />
                {value === 'The Piece' && (
                    <>

                <Text>Five little eggies</Text>
                <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

</Text>
                    </>
                
                )}
                {value === 'The Artist' && (
                  <>
                    <Text>Links here</Text>
                    <Text>The woman, the legend The woman, the legend</Text>
                    <Text>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </Text>
                  </>
                )}
              </List.Accordion>
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
      <Card style={styles.subcontent}>
        <Card mode="contained" style={styles.sampleAudio}>
          <Text variant="headlineLarge">Audio Player here</Text>
          <Text>Audio Player here</Text>
        </Card>
        <Button onPress={() => navigation.navigate('Map')}>Go Back</Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  subcontent: {
  },
  sampleAudio: {
  },
  background: {
      flex:1,
      alignContent: 'space-between'
    },
    buttons: {
        flex:1,
        alignItems:'center',
    },
    shortDescription: {
        paddingVertical: 10,
        paddingTop: 15,
    }
});

export default ContentScreen;
