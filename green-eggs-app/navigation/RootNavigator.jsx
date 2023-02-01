import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';
import { auth } from '../config';
import EggsSoundProvider from '../providers/EggsSoundProvider';

export const RootNavigator = () => {
  const { user, isLoading } = useContext(AuthenticatedUserContext);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <EggsSoundProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </EggsSoundProvider>
  );
};
