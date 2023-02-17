import { ImageBackground, StyleSheet, Text, View, Easing } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { BounceIn, FadeIn } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export const HomePage = ({ navigation }) => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../wonderlandSculpture-egg.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <Animated.View
        entering={BounceIn.delay(500)}
        style={styles.textContainer}
      >
        <Text style={styles.text}>EGG HUNTER YYC</Text>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(1200)}
        style={styles.buttonContainer}
      >
        <Button
          icon="account"
          mode="contained-tonal"
          style={styles.Button}
          onPress={() => navigation.navigate('Login')}
        >
          {' '}
          Log In
        </Button>
      </Animated.View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 200,
    marginTop: 20
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0'
  },
  buttonContainer: {
    marginBottom: 10
  },
  Button: {
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFCC33'
  }
});
