/**
 * Creation Date: March 22, 2020
 * Author: Luke Slevinsky
 * This component is a simple loading visual
 */

import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
