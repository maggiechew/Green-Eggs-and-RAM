import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { AvatarPickProvider } from './providers/AvatarPickProvider';
import EggCollection from './utils/EggCollection';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import SSLight from './assets/fonts/SourceSansProLight.ttf';
import SSRegular from './assets/fonts/SourceSansProRegular.ttf';
import SSBold from './assets/fonts/SourceSansProBold.ttf';

const App = () => {
  const [loaded] = useFonts({
    SSLight,
    SSRegular,
    SSBold
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
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
