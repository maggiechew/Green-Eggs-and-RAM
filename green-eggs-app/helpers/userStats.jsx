import { View, Text } from 'react-native'
import React from 'react'

export const userStats = ({userStats}) => {
    let discoveredEggs= userStats.zoneFound
    let undiscovered = 100 - discoveredEggs
  return (
    <View>
    <Text>Welcome to this zone!</Text>
      <Text>You have discovered {discoveredEggs}% of this zone's eggs</Text>
      <Text>There are {undiscovered}% of eggs still to discover! </Text>
    </View>
  )
}
