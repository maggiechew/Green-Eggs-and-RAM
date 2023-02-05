import { View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { testFolder, getUserRecord } from './getUserRecord';

const Usertest = () => {
  const authContext = useContext(AuthenticatedUserContext);
  const { user } = authContext;
  const [userInfo, setUserInfo] = useState([]);
  const getUserInfo = async () => {
    const UserInfo = await getUserRecord();
    setUserInfo(UserInfo);
  };
  useEffect(() => {
    if (user) getUserInfo();
  }, [user]);

  return (
    <View>
      <Text>UserInfo</Text>
    </View>
  );
};

export default Usertest;
