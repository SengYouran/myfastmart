import React, { useState } from "react";
import { useDataProduct } from "../Context";

function SettingPassword() {
  const { createAccount, setCreateAccount, currentAccount, isSidebarOpen } =
    useDataProduct();
  const [currentPassd, setCurrentPassd] = useState("");
  const [newPassd, setNewPassd] = useState("");
  const [confirmPassd, setConfirmPassd] = useState("");
  const [check, setCheck] = useState(false);

  function handleChangePassd(e) {
    e.preventDefault();

    const passd = currentAccount?.password;
    let hasError = false;

    if (currentPassd !== passd) {
      hasError = true;
      alert("Current password is incorrect");
    }

    if (newPassd !== confirmPassd) {
      hasError = true;
      alert("New password and confirm password do not match");
    }

    if (hasError) {
      setCheck(true);
      return;
    }

    const userIndex = createAccount.findIndex(
      (user) => user.id === currentAccount.id
    );

    if (userIndex !== -1) {
      const updateAccounts = [...createAccount];
      updateAccounts[userIndex] = {
        ...updateAccounts[userIndex],
        password: confirmPassd,
      };
      setCreateAccount(updateAccounts);

      // clear input
      setCurrentPassd("");
      setNewPassd("");
      setConfirmPassd("");
      setCheck(false);

      alert("Password updated successfully");
    }
  }

  return (
    <div className={`container_password ${isSidebarOpen ? "" : "active"}`}>
      <h2 className="text_edit_password">Edit password</h2>
      <form className="child_edit_passd" onSubmit={handleChangePassd}>
        <div className="current_passd">
          <h2 className="txt_current_passd">Current password</h2>
          <input
            type="password"
            name="currentPassword"
            className={`enter_current_passd ${check ? "active" : ""}`}
            placeholder="Enter current password"
            value={currentPassd}
            onChange={(e) => setCurrentPassd(e.target.value)}
          />
        </div>
        <div className="child_new_passd">
          <h2 className="txt_new_passd">New password</h2>
          <input
            type="password"
            name="newPassword"
            className={`new_passd ${check ? "active" : ""}`}
            placeholder="Enter new password"
            value={newPassd || ""}
            onChange={(e) => setNewPassd(e.target.value)}
          />
        </div>
        <div className="child_new_passd">
          <h2 className="txt_comfirm_passd">Confirm new password</h2>
          <input
            type="password"
            name="confirmPassword"
            className={`comfirm_new_passd ${check ? "active" : ""}`}
            placeholder="Enter confirm new password"
            value={confirmPassd || ""}
            onChange={(e) => setConfirmPassd(e.target.value)}
          />
        </div>
        <button className="btn_save_password" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default SettingPassword;
