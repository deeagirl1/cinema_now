import React from "react";
import { useHistory } from "react-router";
import AuthService from "./services/AuthService";
const LogOut = () => {
  const History = useHistory();
  AuthService.logout();
  History.push("/");
  window.location.reload();
  return <div></div>;
};
export default LogOut;
