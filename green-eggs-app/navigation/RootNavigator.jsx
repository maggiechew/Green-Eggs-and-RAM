import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { LoadingIndicator } from '../components';
import { AuthenticatedUserContext } from '../providers';
import EggsSoundProvider from '../providers/EggsSoundProvider';
import StyleSheetProvider from '../providers/StyleSheetProvider';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export const RootNavigator = () => {
  const { user, isLoading } = useContext(AuthenticatedUserContext);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <EggsSoundProvider>
      <StyleSheetProvider>
        <NavigationContainer>
          {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </StyleSheetProvider>
    </EggsSoundProvider>
  );
};
