import React, { useState } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";

interface LoginFormProps {
  baseUrl: String;
}

const LoginForm = ({ baseUrl }: LoginFormProps) => {
  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ url: baseUrl });
    oktaAuth
      .signIn({ username, password })
      .then((res: any) => setSessionToken(res.sessionToken))
      .catch((err: any) => console.log("Found an error", err));
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    authService.redirect({ sessionToken });
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
export default LoginForm;
