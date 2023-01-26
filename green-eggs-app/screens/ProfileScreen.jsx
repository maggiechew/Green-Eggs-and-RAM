import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import AddProfile from '../components/AddProfile';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  return <AddProfile />;
};
