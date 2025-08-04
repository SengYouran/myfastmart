import React, { useEffect, useState } from "react";
import "../style/checkouts.css";
import FormAddress from "./FormAddress";
import { useDataProduct } from "../Context";
import MyBags from "./MyBags";
import Banks from "./Banks";
import GiftPoint from "./GiftPoint";
import AmountPay from "./AmountPay";
import Voucher from "./Voucher";
function Checkouts() {
  const {
    setShowOverlyBG,
    createAccount,
    currentAccount,
    setCreateAccount,
    setUpdateSpentPoint,
    setPoint,
  } = useDataProduct();
  const [formAddress, setFormAddress] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [getPoint, setGetPoint] = useState(0);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    if (!currentAccount || createAccount.length === 0) return;
    const index = createAccount.findIndex(
      (acc) => acc.id === currentAccount.id
    );
    if (index === -1) return;
    const user = createAccount[index];

    const totalPoint = user.totalpoint || 0;
    setGetPoint(totalPoint);
  }, [createAccount, currentAccount]);
  function handleSpentPoint() {
    const index = createAccount.findIndex(
      (acc) => acc.id === currentAccount.id
    );
    if (index === -1) return;

    const user = createAccount[index];
    const totalPoint = user.totalpoint || 0;
    const dollarRate = 0.75;
    const totalMoney = totalPoint * dollarRate;
    setMoney(totalMoney);
    const oldSpentPoint = user.spentpoint || 0;
    const newSpentPoint = oldSpentPoint + totalPoint;

    const updatedUser = {
      ...user,
      point: [],
      totalpoint: 0,
      spentpoint: newSpentPoint,
    };

    const updatedAccounts = [...createAccount];
    updatedAccounts[index] = updatedUser;
    setUpdateSpentPoint(updatedUser);
    setPoint([]);
    setCreateAccount(updatedAccounts); // ✅ force full update
  }
  const findAddressUser = createAccount.find(
    (check) => check.id === currentAccount.id
  );
  const userAddress = findAddressUser?.shippingAddress;
  return (
    <React.Fragment>
      <div className="containerMain">
        <h2 className="Dashboard"></h2>
      </div>
      <div className="container_checkout">
        <div className="child_address_product">
          <div className="child_addr">
            <div className="address">
              <h2 className="text_addr">Add Address</h2>
              <i
                className="fa-solid fa-plus"
                onClick={() => {
                  setFormAddress(!formAddress);
                  setShowOverlyBG(true);
                }}
              ></i>
            </div>
            <div className="info_addr_null">
              {userAddress == undefined ? (
                <div
                  className={`container_alert_address ${
                    formAddress ? "" : "active"
                  }`}
                >
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <h2 className="no_account">មិនទាន់មានអាស្រ័យដ្ឋាន</h2>
                  <p className="please_register">
                    សូមធ្វើការបន្ថែមអាស្រ័យដ្ឋាន(Add Address +)
                  </p>
                  <div className="ok_not">
                    <h2
                      className="no_back"
                      onClick={() => {
                        setFormAddress(!formAddress);
                        setShowOverlyBG(false);
                      }}
                    >
                      ថយក្រោយ
                    </h2>
                    <h2
                      className="yes_goo"
                      onClick={() => {
                        setFormAddress(!formAddress);
                        setShowOverlyBG(true);
                      }}
                    >
                      ចុះឈ្មោះ
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="info_addr">
                  <i className="fa-solid fa-square-check"></i>
                  <div className="text_info">
                    <h2 className="info_user">{userAddress?.fullName}</h2>
                    <h2 className="info_user">
                      {userAddress?.address}, {userAddress?.province},{" "}
                      {userAddress?.country}
                    </h2>
                    <h2 className="info_user">{userAddress?.phone}</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my_bags">
            <h2 className="text_my_bags">My Shopping bag (...)</h2>
            <div className="border_my_bags"></div>
            <MyBags />
          </div>
          <FormAddress
            formAddress={formAddress}
            setFormAddress={setFormAddress}
            setShowOverlyBG={setShowOverlyBG}
          />
        </div>
        <div className="child_bank_amountPay">
          <h2 className="text_bank">Payment</h2>
          <Banks />
          <div className="container_receiver">
            <h2 className="reeciver">Receiver Phone</h2>
            <div className="checkbox_form_phone">
              <i class="fa-solid fa-square-check"></i>
              <input
                type="text"
                className="receiver_phone"
                value={userAddress?.phone}
              />
            </div>
          </div>
          <div className="container_gift">
            <div className="gift_point_check">
              <h2 className="text_gift">Redeem Code</h2>
              <h2 className="check_gift">
                Checkout my{" "}
                <span
                  className="gift_card"
                  onClick={() => {
                    setShowOverlyBG(true);
                    setVoucher(true);
                  }}
                >
                  gift card
                </span>
              </h2>
            </div>
            <GiftPoint
              getPoint={getPoint}
              money={money}
              handleSpentPoint={handleSpentPoint}
            />
          </div>
          <div className="container_payment">
            <h2 className="text_pay">Payment</h2>
            <div className="border_payment_checkout"></div>
            <AmountPay money={money} />
          </div>
        </div>
        <Voucher
          voucher={voucher}
          setShowOverlyBG={setShowOverlyBG}
          setVoucher={setVoucher}
        />
      </div>
    </React.Fragment>
  );
}

export default Checkouts;
