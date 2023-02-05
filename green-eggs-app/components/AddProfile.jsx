import React, { useState, useEffect } from 'react';
import { db } from '../config';
import { auth } from '../config';
import { collection, doc, getDoc } from 'firebase/firestore';
import { View, Text, StyleSheet } from 'react-native';
import { async } from '@firebase/util';

export const getUserProfile = async () => {
  const userRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists) {
  } else {
    const userData = docSnap.data();
    return {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      avataruri: userData.avataruri
    };
  }
};

const AddProfile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function _getUserProfile() {
      const userData = await getUserProfile();
      setUser(userData);
    }
    if (auth.currentUser) {
      _getUserProfile();
    }
  }, [auth]);
  return (
    <View>
      <Text style={styles.modalText}>
        Welcome,{' '}
        {user?.firstname == null || user?.firstname == ''
          ? user?.email
          : user?.firstname}{' '}
        !
      </Text>
      <Text style={styles.Text}>
        Display Name: {user?.firstname + ' ' + user?.lastname}{' '}
      </Text>
      <Text style={styles.Text}>Login email: {user?.email}</Text>
    </View>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
  modalText: {
    color: 'lightblue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  Text: {
    color: 'lightblue',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  }
});
