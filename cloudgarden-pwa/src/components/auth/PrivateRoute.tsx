/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This component makes it so that you must authenticate before hitting the route
 * Ideas modified from: https://auth0.com/docs/quickstart/spa/react?framed=1&sq=1#configure-auth0
 */

import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../contexts";

interface PrivateRouteProps {
  component: React.FC<{}>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  ...rest
}) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
