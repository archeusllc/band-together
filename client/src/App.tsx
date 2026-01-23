import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import { AuthProvider, FeedProvider } from '@contexts';

export const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FeedProvider>
          <Navigation />
        </FeedProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};



