import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Login from "./components/main/LoginForm";
import App from "./App";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  return (
    <Security
      issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
      clientId={process.env.REACT_APP_OKTA_CLIENT_ID}
      redirectUri={window.location.origin + "/implicit/callback"}
      onAuthRequired={onAuthRequired}
      pkce={true}
    >
      <SecureRoute path="/" component={App} />
      <Route
        path="/login"
        render={() => (
          <Login baseUrl="https://${process.env.REACT_APP_OKTA_ORG_URL}" />
        )}
      />
      <Route path="/implicit/callback" component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;
