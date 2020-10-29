import React, { useEffect, useState, createContext, useCallback } from 'react';

interface ContextProps {
  onboarding: boolean,
  setOnboarding: (value: boolean) => void
}

const ContextOnboarding = createContext<ContextProps>({
  onboarding: false,
  setOnboarding: () => {}
});

export const ContextProvider: React.FC = ({ children }) => {
  const [onboarding, setOnboarding] = useState(false);

  const handleOnboarding = useCallback((value: boolean) => {
    setOnboarding(value);
  }, []);

  return (
    <ContextOnboarding.Provider
      value={{ onboarding, setOnboarding: handleOnboarding }}
    >
      { children }
    </ContextOnboarding.Provider>
  );
}

export default ContextOnboarding;