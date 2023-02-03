import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geotest from './src/Geotest';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { AvatarPickProvider } from './providers/AvatarPickProvider';
import Geoeggtest from './src/Geoeggtest';

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <AvatarPickProvider>
        <SafeAreaProvider>
          <Geoeggtest />
          <RootNavigator />
        </SafeAreaProvider>
      </AvatarPickProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
