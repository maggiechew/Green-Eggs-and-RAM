import { View, Text } from 'react-native';
import { db } from '../config';
import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { zonesFromDB } from '../utils/geopoints';

const Geotest = () => {
  const authContext = useContext(AuthenticatedUserContext);
  const { user } = authContext;
  const [geoPoints, setGeoPoints] = useState([]);
  const getGeopoints = async () => {
    const gp = await zonesFromDB();
    setGeoPoints(gp);
  };
  useEffect(() => {
    if (user) getGeopoints();
  }, [user]);

  return (
    <View>
      <Text>Geotest</Text>
    </View>
  );
};

export default Geotest;
