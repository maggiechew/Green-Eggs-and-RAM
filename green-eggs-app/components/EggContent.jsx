import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Card, List, SegmentedButtons } from 'react-native-paper';

export const EggContent = ({ egg }) => {
  if (!egg) return <Text>NO EGG LOADED</Text>;

  return (
    <View>
      <View style={styles.card}>
        <Card mode='elevated'>
          <Card.Title
            title={egg.eggName}
            // subtitle='@CoolEggPerson'
            subtitleNumberOfLines={2}
          />
          <Card.Content>
            <Text variant='bodyMedium' style={styles.shortDescription}>
              {egg.eggDescription}
            </Text>
            {/* <Text style={styles.link}> </Text> */}
            <Card.Cover source={require('../Content-Photo.jpg')} />
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
