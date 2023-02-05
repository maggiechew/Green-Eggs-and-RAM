import { View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../config';
import { getIndividualUserRecord } from './getUserRecord';
import { AuthenticatedUserContext } from '../providers';
import { doc, onSnapshot } from 'firebase/firestore';

const SavetUserInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);

  const getUserRecord = async () => {
    const userRecord = await getIndividualUserRecord(user?.uid);
    setUserInfo(userRecord);
  };

  useEffect(() => {
    if (user) getUserRecord();
  }, [user]);

  return (
    <View>
      <Text>SavetUserInfo</Text>
    </View>
  );
};

export default SavetUserInfo;
