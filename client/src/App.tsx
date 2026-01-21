import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import { AuthProvider, FeedProvider } from '@contexts';

const config = {
  prefixes: ['bandtogethermobile://', 'https://band-together.app'],
};

export const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FeedProvider>
          <Navigation linking={config} />
        </FeedProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};



