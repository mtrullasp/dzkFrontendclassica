import React, { useState, useEffect, useContext } from "react";

import { Button } from "@mui/material";
import MenuButton from "./MenuButton";
import { DispatchContext } from "./stores/Context";
// import './style.less'
// @ts-ignore
const { DZ } = window;
function Login() {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext);
  const [logged, setLogged] = useState(false);

  const getLoginStatus = () =>
    DZ?.ready(() =>
      DZ?.getLoginStatus(() => {
        // eslint-disable-next-line no-restricted-globals
        setLogged(status === "connected");
        // eslint-disable-next-line no-restricted-globals
        if (!logged && status === "connected") {
          // @ts-ignore
          myLogin(dispatch);
        }
      })
    );

  useEffect(getLoginStatus, []);

  const handleClick = () => {
    if (!logged) {
      // @ts-ignore
      myLogin(dispatch);
    }
  };

  return (
    <Button size="large" onClick={handleClick}>
      {logged ? null : "Log In"}
    </Button>
  );
}

export default Login;
