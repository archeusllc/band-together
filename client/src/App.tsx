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
                    // Store the original path to preserve it
                    originalPath: path,
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
  // Preserve the original URL path instead of regenerating it
  getPathFromState: (state: any) => {
    // If we have the original path stored, use it
    if (state?.routes?.[0]?.state?.routes?.[0]?.params?.originalPath) {
      return state.routes[0].state.routes[0].params.originalPath;
    }
    // Otherwise let React Navigation generate the path normally
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



