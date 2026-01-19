import 'react-native-gesture-handler';
import { Navigation } from './navigation';
import { AuthProvider } from '@contexts';

const config = {
  prefixes: ['bandtogethermobile://', 'https://band-together.app'],
};

export function App() {
  return (
    <AuthProvider>
      <Navigation linking={config} />
    </AuthProvider>
  );
}



