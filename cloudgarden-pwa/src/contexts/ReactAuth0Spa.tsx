/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This is a React context specifically to provide the web app with authentication
 * Ideas modified from: https://manage.auth0.com/dashboard/us/cloudgarden/applications/IcF1UdmW4g5cH4o9vEfU0Cmkk4k0RS5m/quickstart
 */

import React, { useState, useEffect, useContext, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

interface Auth0ProviderProps {
  children: React.ReactNode;
  auth0Options: Auth0ClientOptions;
  onRedirectCallback: Function;
}

export interface Auth0ContextType {
  isAuthenticated: boolean | undefined;
  user?: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: Function;
  handleRedirectCallback: Function;
  getIdTokenClaims: Function;
  loginWithRedirect: Function;
  getTokenSilently: Function;
  getTokenWithPopup: Function;
  logout: Function;
}

const defaultAuth0Context: Auth0ContextType = {
  isAuthenticated: false,
  loading: false,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => {},
  getTokenSilently: () => {},
  getTokenWithPopup: () => {},
  logout: () => {}
};

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

const Auth0Context = createContext<Auth0ContextType>(defaultAuth0Context);

const useAuth0 = () => useContext(Auth0Context);

const Auth0Provider: React.FC<Auth0ProviderProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  auth0Options
}: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(auth0Options);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any[]) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any[]) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any[]) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p: any[]) => auth0Client.getTokenWithPopup(...p),
        logout: (...p: any[]) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export { useAuth0, Auth0Provider };
