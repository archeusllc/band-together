import './gesture-handler';
import './global.css';

import '@expo/metro-runtime'; // Necessary for Fast Refresh on Web
import { registerRootComponent } from 'expo';

import { App } from './src/App';

// Suppress React Native Web pointerEvents deprecation warning (known library issue)
const originalWarn = console.warn;
console.warn = function (...args: any[]) {
  if (args[0]?.includes?.('props.pointerEvents is deprecated')) {
    return;
  }
  originalWarn.apply(console, args);
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
