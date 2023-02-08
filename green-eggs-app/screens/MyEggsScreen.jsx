import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddProfile from '../components/AddProfile';
import { AuthenticatedUserContext } from '../providers';

export const MyEggsScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo } = authContext;

  return <AddProfile />;
};
