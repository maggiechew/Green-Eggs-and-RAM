import { Text, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Button, Card, List, SegmentedButtons } from 'react-native-paper';
import {
  EggsUserContext,
  useEggsUserContext
} from '../providers/EggsSoundProvider';

export const EggContent = () => {
  const { currentEgg } = useContext(EggsUserContext);
  // const egg = currentEgg;
  if (!currentEgg) return <Text>NO EGG LOADED</Text>;
  console.log('EGG CONTENT: ', currentEgg);
  return (
    <View>
      <View style={styles.card}>
        <Card mode='elevated'>
          <Card.Title
            title={currentEgg.eggName}
            // subtitle='@CoolEggPerson'
            subtitleNumberOfLines={2}
          />
          <Card.Content>
            <Text variant='bodyMedium' style={styles.shortDescription}>
              {currentEgg.eggDescription}
            </Text>
            {/* <Text style={styles.link}> </Text> */}
            {currentEgg.eggURIs.imageURI ? (
              <Card.Cover source={{ uri: currentEgg.eggURIs.imageURI }} />
            ) : (
              <Card />
            )}
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    height: '63%'
  }
});
