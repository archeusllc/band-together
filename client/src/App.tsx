import 'react-native-gesture-handler';
import { Navigation } from './navigation';
import { AuthProvider, FeedProvider } from '@contexts';

const config = {
  prefixes: ['bandtogethermobile://', 'https://band-together.app'],
};

export function App() {
  return (
    <AuthProvider>
      <FeedProvider>
        <Navigation linking={config} />
      </FeedProvider>
    </AuthProvider>
  );
}



