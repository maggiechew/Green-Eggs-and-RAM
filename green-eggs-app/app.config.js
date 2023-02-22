import 'dotenv/config';
export default {
  expo: {
    name: 'green-eggs-app',
    slug: 'green-eggs-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    scheme: 'com.greeneggandram.greeneggsapp',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.greeneggandram.greeneggsapp',
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'This app uses your location to identify nearby eggs.'
      }
    },
    android: {
      package: 'com.greeneggandram.greeneggsapp',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      permissions: [
        'FOREGROUND_SERVICE',
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'ACCESS_BACKGROUND_LOCATION'
      ]
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      eas: {
        projectId: '6b50b09f-116d-48c7-a2f0-34d6e7428312'
      }
    }
  }
};
