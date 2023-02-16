import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

export const UserStats = ({ userStats }) => {
  const styles = useContext(StyleSheetContext);
  if (userStats && userStats.zoneFound) {
    let discoveredEggs = userStats.zoneFound;
    let undiscovered = 100 - discoveredEggs;
    return (
      <View>
        <Text style={styles.tutorialTitle}>Welcome to this zone!</Text>
        <Text style={styles.tutorialText}>
          You have discovered {discoveredEggs}% of this zone's eggs
        </Text>
        <Text style={styles.tutorialText}>
          There are {undiscovered}% of eggs still to discover!{' '}
        </Text>
      </View>
    );
  } else return <Text style={styles.tutorialText}>Loading...</Text>;
};

const styles = StyleSheet.create({
  tutorialTitle: {
    color: 'gold'
  },
  tutorialText: {
    color: 'white'
  }
});
