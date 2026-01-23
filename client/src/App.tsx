import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import { AuthProvider, FeedProvider } from '@contexts';

const config = {
  prefixes: ['bandtogethermobile://', 'https://band-together.app'],
  // Custom path parser to handle /setlist/:id/share URLs
  getStateFromPath: (path: string) => {
    // Handle /setlist/:id/share paths
    const shareMatch = path.match(/^\/setlist\/([^/]+)\/share$/);
    if (shareMatch) {
      // Set up browser history to have the setlist page as previous entry
      if (typeof window !== 'undefined' && window.history.length <= 1) {
        // Only manipulate history if this is the first entry (direct access)
        const setlistUrl = path.replace(/\/share$/, '');
        window.history.pushState(
          { page: 'setlist', setlistId: shareMatch[1] },
          '',
          setlistUrl
        );
        // Replace back to /share URL
        window.history.replaceState(
          { modal: 'share', setlistId: shareMatch[1] },
          '',
          path
        );
      }

      return {
        routes: [
          {
            name: 'MainDrawer',
            state: {
              routes: [
                {
                  name: 'SetlistDetails',
                  params: {
                    setlistId: shareMatch[1],
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



