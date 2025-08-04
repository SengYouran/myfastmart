import { Link, Outlet } from "react-router-dom";
import "../style/account.css";
import React from "react";
import LinkAccount from "../Account/LinkAccount";
function Account() {
  return (
    <React.Fragment>
      <div className="containerMain">
        <h2 className="Dashboard"></h2>
      </div>
      <div className="supper_account">
        <LinkAccount />
      </div>
      <Outlet />
    </React.Fragment>
  );
}

export default Account;
