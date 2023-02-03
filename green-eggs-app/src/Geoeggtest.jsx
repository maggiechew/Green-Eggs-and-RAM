import { View, Text } from 'react-native';
import {
  collection,
  query,
  where,
  GeoPoint,
  getDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config';
import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { getEggGeo } from '../utils/geoeggpoints';

const Geoeggtest = () => {
  const authContext = useContext(AuthenticatedUserContext);
  const { user } = authContext;
  const [geoPoints, setGeoPoints] = useState([]);
  const getGeopoints = async () => {
    const gp = await getEggGeo(db, 'Wt4pkmBfEAhsOQqybPYa');
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

export default Geoeggtest;
