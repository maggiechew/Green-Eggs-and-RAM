import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Avatar, Card
} from 'react-native-paper';
import {
  EggsUserContext
} from '../providers/EggsSoundProvider';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

export const EggContent = () => {
  const { currentEgg } = useContext(EggsUserContext);
  const styles = useContext(StyleSheetContext);
  const creator = currentEgg.Creator;
  const egg = currentEgg.Egg;

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
