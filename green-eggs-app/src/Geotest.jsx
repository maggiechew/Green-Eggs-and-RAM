import { View, Text } from 'react-native';

import { db } from '../config';
import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { getPolygon } from '../utils/geopoints';

const Geotest = () => {
  const authContext = useContext(AuthenticatedUserContext);
  const { user } = authContext;
  const [geoPoints, setGeoPoints] = useState([]);
  const getGeopoints = async () => {
    // const q = query(
    //   collection(db, 'zone'),
    //   where('id', '==', 'DCsKkEr286F2ZDnhitVR')
    // );
    // const querySnapshot = await getDoc(doc(db, 'zone', 'DCsKkEr286F2ZDnhitVR'));
    // console.log('querySnapshot', querySnapshot.data());
    // querySnapshot.forEach((doc) => {
    // const data = querySnapshot.data();
    // console.log('GeoData', data);
    // const gp = Object.keys(data)

    //   .filter((key) => key.startsWith('geo_'))
    //   .map((key) => data[key]);
    // console.log('gp!!!!!', gp);
    // const geopoint = new GeoPoint(data.geo_1.latitude, data.geo_1.longitude);
    // geopoints.push(geoPoints);
    // });
    const gp = await getPolygon(db, '0siUtfXKMH0t7WUEmp8c');
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
