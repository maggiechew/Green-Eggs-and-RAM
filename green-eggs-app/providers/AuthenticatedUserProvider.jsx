import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { AvatarPickContext } from './AvatarPickProvider';
import { Alert } from 'react-native';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorState, setErrorState] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const { setPicture } = useContext(AvatarPickContext);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user?.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
          Alert.alert('No matching documents.');
          return;
        } else {
          let usersData = querySnap.data();
          setUserInfo(usersData);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      Alert.alert('No such user exists! Please try again');
    }
  };

  const handleSignup = async (values) => {
    const { email, password, firstname, lastname, avataruri } = values;
    const userRef = collection(db, 'users');

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await setDoc(doc(userRef, user.uid), {
      avataruri,
      firstname: firstname,
      lastname: lastname,
      email: email,
      discoveredEggs: [],
      likedEggs: [],
      friends: [],
      seenTutorial: false
    });
    return user;
  };

  const handleLogout = () => {
    setPicture(null);
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
    setUser(null);
  };
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber, authstatechanged is a listener
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, []);

  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        userInfo,
        errorState,
        isLoading,
        handleLogin,
        handleSignup,
        handleLogout
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
