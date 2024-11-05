import React, {ReactNode, useContext, useState} from 'react';

type LoaderContextType = {
  loading: boolean,
  showLoader: () => void,
  hideLoader: () => void
}

const LoaderContext = React.createContext<LoaderContextType>({
  loading: false,
  showLoader: () => { },
  hideLoader: () => { }
})

type ProviderProps = {
  children?: ReactNode;
};

export const LoaderContextProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader debe usarse dentro de LoaderContextProvider");
  }
  return context;
};
