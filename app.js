module.exports = {
  expo: {
    name: 'client',
    slug: 'client',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_MAPS_KEY,
      },
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_MAPS_KEY,
        },
      },
      package: 'com.s21216.client',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'c5959b58-9172-48a4-8181-a0aad176fb44',
      },
    },
  },
};