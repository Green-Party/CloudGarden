/**
 * Creation Date: January 26, 2020
 * Author: Gillian Pierce
 * Renders the direct app routes and side navigation
 */
import { useState, useEffect } from "react";

export const useAuth = (auth: any) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.getAuthState().then((isAuthenticated: boolean) => {
      if (isAuthenticated != authenticated) {
        setAuthenticated(isAuthenticated);
      }
    });
  });

  useEffect(() => {
    if (authenticated) {
      auth.getUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [authenticated]);

  return [authenticated, user];
};
