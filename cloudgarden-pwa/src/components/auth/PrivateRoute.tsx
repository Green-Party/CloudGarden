/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This component makes it so that you must authenticate before hitting the route
 * Ideas modified from: https://manage.auth0.com/dashboard/us/cloudgarden/applications/IcF1UdmW4g5cH4o9vEfU0Cmkk4k0RS5m/quickstart
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
        appState: { targetUrl: window.location.pathname }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
