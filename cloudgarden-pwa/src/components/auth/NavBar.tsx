/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This component will be responsible for showing the login and logout buttons
 * Ideas modified from: https://manage.auth0.com/dashboard/us/cloudgarden/applications/IcF1UdmW4g5cH4o9vEfU0Cmkk4k0RS5m/quickstart
 */

import React from "react";
import { useAuth0 } from "../../contexts";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;
