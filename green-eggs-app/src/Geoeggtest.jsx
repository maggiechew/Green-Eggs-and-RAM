import { View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { getGeoEggPoints } from '../utils/geoeggpoints';

const Geoeggtest = () => {
  const authContext = useContext(AuthenticatedUserContext);
  const { user } = authContext;
  const [eggGeoPoints, setEggGeoPoints] = useState([]);
  const getGeopoints = async () => {
    const gpegg = await getGeoEggPoints();
    console.log('GeoEggPoints!!!!: ', gpegg);
    setEggGeoPoints(gp);
  };
  useEffect(() => {
    if (user) getGeopoints();
  }, [user]);

  return (
    <View>
      <Text>GeoEggPoints</Text>
    </View>
  );
};

export default Geoeggtest;
