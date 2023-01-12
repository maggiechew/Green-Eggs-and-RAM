import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MusicRoute = () => (
  <SafeAreaView style={{ padding: 20 }}>
    <Text>Music</Text>
  </SafeAreaView>
);

const AlbumsRoute = () => (
  <SafeAreaView style={{ padding: 20 }}>
    <Text>Albums</Text>
  </SafeAreaView>
);

const RecentsRoute = () => (
  <SafeAreaView style={{ padding: 20 }}>
    <Text>Recents</Text>
  </SafeAreaView>
);

const NotificationsRoute = () => (
  <SafeAreaView style={{ padding: 20 }}>
    <Text>Notifications</Text>
  </SafeAreaView>
);

const NavigationWrapper = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline'
    },
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline'
    }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavigationWrapper;
