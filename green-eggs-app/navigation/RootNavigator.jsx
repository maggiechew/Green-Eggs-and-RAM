import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';
import { auth } from '../config';
import EggsUserProvider from '../components/EggsUserProvider';

export const RootNavigator = () => {
  const { user, isLoading } = useContext(AuthenticatedUserContext);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <EggsUserProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </EggsUserProvider>
  );
};
