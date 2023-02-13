import { Text, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import {
  Avatar,
  Button,
  Card,
  List,
  SegmentedButtons
} from 'react-native-paper';
import {
  EggsUserContext,
  useEggsUserContext
} from '../providers/EggsSoundProvider';

export const EggContent = () => {
  const { currentEgg } = useContext(EggsUserContext);
  const creator = currentEgg.Creator;
  const egg= currentEgg.Egg;

  // if (!currentEgg) return <Text>NO EGG LOADED</Text>;
  // if (currentEgg) console.log('creator:', creator.creatorName)
  const LeftContent = () => (
    <Avatar.Image size={40} source={{ uri: creator.creatorAvatarURI }} />
  );

  return (
    <View>
      <View style={styles.card}>
        <Card mode='elevated'>
          <Card.Title
            title={egg.eggName}
            subtitle={creator.creatorName}
            subtitleNumberOfLines={2}
            left={LeftContent}
          />
          <Card.Content>
            <Text variant='bodyMedium' style={styles.shortDescription}>
              {egg.eggBlurb}
            </Text>
            {egg.eggURIs.imageURI ? (
              <Card.Cover source={{ uri: egg.eggURIs.imageURI }} />
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
  },
  shortDescription: {
    marginBottom: 20,
    marginTop: 10
  }
});
