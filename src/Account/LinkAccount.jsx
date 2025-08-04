import { NavLink, useNavigate } from "react-router-dom";
import { useDataProduct } from "../Context";
import React, { useState } from "react";

function LinkAccount() {
  const navigate = useNavigate();
  const {
    currentAccount,
    setCurrentAccount,
    setIsLogin,
    setIsSidebarOpen,
    isSidebarOpen,
    hiddenPuchased,
  } = useDataProduct();

  function handleLogout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("storeCurrentAccount");
    setCurrentAccount([]);
    setIsLogin(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
    navigate("/");
  }
  return (
    <React.Fragment>
      <div
        className={`child_back ${
          isSidebarOpen || hiddenPuchased ? "" : "active"
        }`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <i className="fa-solid fa-left-long"></i>
        <h2 className={`back`}>Go back!</h2>
      </div>
      <div
        className={`container_link_account ${isSidebarOpen ? "active" : ""}`}
      >
        <div className="tel_name">
          <h2 className="name">{currentAccount?.fullname}</h2>
          <h2 className="tel">{currentAccount?.phone}</h2>
        </div>

        <div className="border_link"></div>

        <div className="my_account">
          <h2 className="account">My Account</h2>
          <div className="link_acc_add">
            <NavLink
              to="/account/editprofile"
              className={({ isActive }) =>
                isActive ? "user_link active" : "user_link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fa-solid fa-user"></i>
              <span className="text_link">Personal Details</span>
            </NavLink>

            <NavLink
              to="/account/editaddress"
              className={({ isActive }) =>
                isActive ? "user_link active" : "user_link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fa-solid fa-house"></i>
              <span className="text_link">Address Book</span>
            </NavLink>
          </div>
        </div>

        <div className="my_account">
          <h2 className="account">My Shop</h2>
          <div className="link_acc_add">
            <NavLink
              to="/account/purchased"
              className={({ isActive }) =>
                isActive ? "user_link active" : "user_link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fa-solid fa-file"></i>
              <span className="text_link">Purchased</span>
            </NavLink>

            <NavLink
              to="/account/pointlist"
              className={({ isActive }) =>
                isActive ? "user_link active" : "user_link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fa-solid fa-square-plus"></i>
              <span className="text_link">Points</span>
            </NavLink>

            <NavLink
              to="/account/wishlist"
              className={({ isActive }) =>
                isActive ? "user_link active" : "user_link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fa-solid fa-gift"></i>
              <span className="text_link">Wishlist</span>
            </NavLink>
          </div>
        </div>

        <div className="my_account">
          <h2 className="account">Settings</h2>
          <div className="link_acc_add">
            <NavLink
              to="/account/password"
              className={({ isActive }) =>
                isActive ? "user_link active" : "user_link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="fa-solid fa-key"></i>
              <span className="text_link">Change Password</span>
            </NavLink>
          </div>
        </div>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className={`minheight ${isSidebarOpen ? "active" : ""}`}></div>
    </React.Fragment>
  );
}

export default LinkAccount;
