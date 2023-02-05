import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { AvatarPickProvider } from './providers/AvatarPickProvider';
import SavetUserInfo from './src/SavetUserInfo';

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <AvatarPickProvider>
        <SafeAreaProvider>
          <SavetUserInfo />
          <RootNavigator />
        </SafeAreaProvider>
      </AvatarPickProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
