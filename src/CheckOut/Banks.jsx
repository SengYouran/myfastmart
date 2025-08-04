import React, { useEffect } from "react";
import { useDataProduct } from "../Context";
import { banks } from "../data/Info";

function Banks() {
  const {
    selectBank,
    setSelectBank,
    handleBanks,
    currentAccount,
    createAccount,
  } = useDataProduct();

  const handleCheckboxChange = (bankName) => {
    setSelectBank((prev) => (prev === bankName ? "" : bankName));
  };

  const userIndex = createAccount.findIndex(
    (user) => user.id === currentAccount.id
  );
  const user = createAccount[userIndex];

  // ✅ call handleBanks when selectBank changes
  useEffect(() => {
    if (currentAccount.id) {
      handleBanks();
    }
  }, [selectBank]); // <-- listen for selectBank change

  return banks.map((bank) => (
    <div className="cart_bank" key={bank.id}>
      <input
        type="checkbox"
        className="checkbox_cart" name="bank"
        checked={user?.selectBank === bank.name}
        onChange={() => handleCheckboxChange(bank.name)}
      />
      <img src={bank.bank} alt={bank.name} className="cart" />
    </div>
  ));
}

export default Banks;
