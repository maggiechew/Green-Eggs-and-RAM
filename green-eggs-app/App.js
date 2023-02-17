import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { AvatarPickProvider } from './providers/AvatarPickProvider';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';


const App = () => {
  const [fontsLoaded] = useFonts({
    SSLight: require('./assets/fonts/SourceSansProLight.ttf'),
    SSRegular: require('./assets/fonts/SourceSansProRegular.ttf'),
    SSBold: require('./assets/fonts/SourceSansProBold.ttf'),
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf')
  });

  if (!fontsLoaded) {
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
          <RootNavigator />
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </AvatarPickProvider>
  );
};

export default App;
