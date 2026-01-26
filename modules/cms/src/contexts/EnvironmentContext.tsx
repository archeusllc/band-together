import React, { createContext, useContext, useState, useEffect } from 'react';

export type Environment = 'development' | 'staging' | 'production';

interface EnvironmentContextType {
  environment: Environment;
  apiUrl: string;
  setEnvironment: (env: Environment) => void;
}

const ENV_URLS: Record<Environment, string> = {
  development: 'http://localhost:3001',
  staging: 'https://band-together-staging.fly.dev',
  production: 'https://bandtogether.fake',
};

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

export const EnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [environment, setEnvironmentState] = useState<Environment>(() => {
    return (localStorage.getItem('adminEnvironment') as Environment) ||
      'development';
  });

  const setEnvironment = (env: Environment) => {
    setEnvironmentState(env);
    localStorage.setItem('adminEnvironment', env);
  };

  const apiUrl = ENV_URLS[environment];

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        apiUrl,
        setEnvironment,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      'useEnvironment must be used within EnvironmentProvider'
    );
  }
  return context;
};
