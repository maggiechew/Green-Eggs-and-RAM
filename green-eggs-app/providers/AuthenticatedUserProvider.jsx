import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { AvatarPickContext } from './AvatarPickProvider';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorState, setErrorState] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const { setPicture } = useContext(AvatarPickContext);

  const getUserInfo = async (id) => {
    const querySnapshot = await getDoc(doc(db, 'users', id));
    if (querySnapshot.exists()) {
      // console.log('Document data:', querySnapshot.data());
      setUserInfo(querySnapshot.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
    // return querySnapshot.data();
  };

  useEffect(() => {
    if (user) {
      getUserInfo(user.uid);
    }
  }, [user]);

  const handleLogin = async (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential);
      })
      .catch((error) => setErrorState(error.message));
    // console.log('this is Login user: ', values);
  };

  const handleSignup = async (values) => {
    const { email, password, firstname, lastname, avataruri } = values;
    const userRef = collection(db, 'users');
    // console.log('auth', auth);

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    // console.log('this is signUp user: ', user);
    await setDoc(doc(userRef, user.uid), {
      avataruri,
      firstname: firstname,
      lastname: lastname,
      email: email,
      eggs: [],
      friends: []
    });
    return user;
  };

  const handleLogout = () => {
    console.log(`**** handle logout ****`);
    setPicture(null);
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
    setUser(null);
  };
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

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
