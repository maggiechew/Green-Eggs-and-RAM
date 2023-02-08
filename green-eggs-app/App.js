import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { AvatarPickProvider } from './providers/AvatarPickProvider';
import EggCollection from './utils/EggCollection';

const App = () => {
  return (
    <AvatarPickProvider>
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <EggCollection />
          <RootNavigator />
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </AvatarPickProvider>
  );
};

export default App;
