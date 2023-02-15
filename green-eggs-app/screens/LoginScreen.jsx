import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthenticatedUserContext } from '../providers';

export const LoginScreen = ({ navigation }) => {
  const authContext = useContext(AuthenticatedUserContext);
  const { errorState, handleLogin } = authContext;

  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/egghunterlogo.png')}
              style={{ width: 250, height: 250, marginBottom: -70 }}
            />
            <Text style={styles.screenTitle}>EGG</Text>
            <Text style={styles.screenTitle2}>HUNTER</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name='email'
                  leftIconName='email'
                  placeholder='Enter email'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name='password'
                  leftIconName='key-variant'
                  placeholder='Enter password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType='password'
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to SignupScreen to create a new account */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Create a new account?'}
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Forgot Password'}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* App info footer */}
      <View style={styles.footer}>
        <Text
          style={styles.footerText}
          onPress={() => navigation.navigate('Home')}
        >
          Green Eggs & Ram © {new Date().getFullYear()}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 12
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenTitle: {
    fontFamily: 'Lobster-Regular',
    fontSize: 80,
    // fontWeight: '700',
    color: 'gold',
    paddingTop: 20,
    justifyContent: 'center',
    marginBottom: -40
  },
  screenTitle2: {
    fontFamily: 'Lobster-Regular',
    fontSize: 35,
    // fontWeight: '700',
    color: 'gold',
    // paddingTop: 20,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 25
  },
  footer: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'orange'
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gold'
  }
});
