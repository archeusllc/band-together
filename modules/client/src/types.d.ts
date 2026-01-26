import { ClassName } from 'nativewind';

declare module 'react-native' {
  interface ViewProps {
    className?: ClassName;
  }
  interface TextProps {
    className?: ClassName;
  }
  interface TextInputProps {
    className?: ClassName;
  }
  interface PressableProps {
    className?: ClassName;
  }
  interface ScrollViewProps {
    className?: ClassName;
  }
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
