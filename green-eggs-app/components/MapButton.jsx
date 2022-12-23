import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

const MapButton = () => (
  <IconButton
    icon="camera"
    iconColor={MD3Colors.Neutral10}
    mode={'contained-tonal'}
    containerColor={'#ffffff'}
    size={35}
    onPress={() => console.log('Pressed')}
  />
);

export default MapButton;