import { Formik } from 'formik';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormErrorMessage, TextInput } from '../components';
import { Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { signupValidationSchema } from '../utils';
import { AuthenticatedUserContext } from '../providers';
import { AvatarPickContext } from '../providers/AvatarPickProvider';

export const SignupScreen = ({ navigation }) => {
  const authContext = useContext(AuthenticatedUserContext);
  const { user, handleSignup, errorState } = authContext;
  const avatarConxt = useContext(AvatarPickContext);
  const { picture, pickImage } = avatarConxt;

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility
  } = useTogglePasswordVisibility();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: consits app logo and screen title */}
        <View style={styles.logoContainer}>
          <Text style={styles.screenTitle}>Create a new account!</Text>
        </View>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={pickImage}>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.avatar} />
          ) : (
            <Ionicons style={styles.crossIcon} name='add-circle-outline' />
          )}
        </TouchableOpacity>

        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            avataruri: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={signupValidationSchema}
          onSubmit={async (values) => {
            values.avataruri = picture;
            await handleSignup(values);
          }}
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
                name='firstname'
                leftIconName='account'
                placeholder='First name'
                autoCapitalize='none'
                keyboardType='text'
                textContentType='firstName'
                value={values.firstname}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
              />
              <FormErrorMessage
                error={errors.firstname}
                visible={touched.firstname}
              />
              <TextInput
                name='lastname'
                leftIconName='account'
                placeholder='Last name'
                autoCapitalize='none'
                keyboardType='text'
                textContentType='lastName'
                value={values.lastname}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
              />
              <FormErrorMessage
                error={errors.lastname}
                visible={touched.lastname}
              />
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
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <TextInput
                name='password'
                leftIconName='key-variant'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='newPassword'
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
              <TextInput
                name='confirmPassword'
                leftIconName='key-variant'
                placeholder='Confirm password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType='password'
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              {/* Display Screen Error Mesages */}
              {errorState !== '' ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Signup button */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
              </Button>
            </>
          )}
        </Formik>
        {/* Button to navigate to Login screen */}
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={'Already have an account?'}
          onPress={() => navigation.navigate('Login')}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#111111`,
    paddingHorizontal: 12
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontFamily: 'Lobster-Regular',
    fontSize: 32,
    fontWeight: '300',
    color: 'gold',
    paddingTop: 30
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
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarPlaceholder: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  crossIcon: {
    position: 'absolute',
    fontSize: 40,
    color: '#FFF',
    marginTop: 8,
    marginLeft: 2
  }
});
