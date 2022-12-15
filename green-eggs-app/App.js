import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import NavigationWrapper from './components/NavigationWrapper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationWrapper />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
