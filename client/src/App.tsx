import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import { AuthProvider, FeedProvider } from '@contexts';

const config = {
  prefixes: ['bandtogethermobile://', 'https://band-together.app'],
  // Custom path parser to handle /setlist/:id/* paths
  getStateFromPath: (path: string) => {
    // Handle /setlist/:id/* paths (match any subpath after setlist ID)
    const setlistMatch = path.match(/^\/setlist\/([^/]+)(\/.*)?$/);
    if (setlistMatch) {
      return {
        routes: [
          {
            name: 'MainDrawer',
            state: {
              routes: [
                {
                  name: 'SetlistDetails',
                  params: {
                    setlistId: setlistMatch[1],
                  },
                },
              ],
            },
          },
        ],
      };
    }
    // Let React Navigation handle other paths normally
    return undefined;
  },
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



