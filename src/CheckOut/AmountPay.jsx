import { Link, useNavigate } from "react-router-dom";
import { useDataProduct } from "../Context";
import { useEffect, useState } from "react";

function AmountPay({ money }) {
  const {
    amountPayment,
    khmerMoney,
    createAccount,
    setCreateAccount,
    currentAccount,
    setDropItem,
    setShowOverlyBG,
    setPurchased,
    setCounterBag,
    setCounters,
    setPoint,
    selectBank,
  } = useDataProduct();
  const navigate = useNavigate();
  const filterCounters = createAccount.find(
    (check) => check.id === currentAccount.id
  );
  const counter = filterCounters?.storeBags || [];

  let counters = 0;
  counter.forEach((counter) => (counters += counter.counters));
  function handleSavePoint() {
    if (amountPayment <= 0) return;
    const newPoints = Math.floor(amountPayment / 10);
    if (newPoints > 0) {
      // ✅ Add new history
      const now = new Date();
      const date = now.toLocaleDateString("en-GB"); // format: DD/MM/YYYY
      const newHistory = { date, point: newPoints };

      setPoint((prev) => [newHistory, ...prev]);
    }
  }

  function handleClearStoreBags() {
    const now = new Date();
    const dateTime = now.toLocaleString("en-US", {
      timeZone: "Asia/Phnom_Penh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    if (!selectBank) return;

    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );

    if (userIndex === -1) return;

    const user = createAccount[userIndex];
    const storeBags = user.storeBags || [];

    const purchasedWithBank = storeBags.map((item) => ({
      ...item,
      dateTime,
      bank: selectBank, // ✅ add bank
    }));

    // Clear storeBags and set purchased
    const updateAccount = [...createAccount];
    updateAccount[userIndex] = {
      ...user,
      storeBags: [],
      purchased: [...(user.purchased || []), ...purchasedWithBank],
    };

    setCreateAccount(updateAccount);
    setPurchased(purchasedWithBank); // trigger useEffect (even though it's no longer strictly needed)
    setCounterBag(0);
    setCounters({});
  }
  const [totalPaymet, setTotalPayment] = useState(0);
  const [KHR, setKHR] = useState(0);
  useEffect(() => {
    if (money !== 0) {
      const payWithPoint = amountPayment - money;
      const USD = payWithPoint.toFixed(2);
      setTotalPayment(USD);
      const khmerMoneyRaw = Math.round(payWithPoint * 4000); // គណនាជាពិត
      const khmerMoneyFormatted =
        new Intl.NumberFormat("km-KH").format(khmerMoneyRaw) + " ៛";
      setKHR(khmerMoneyFormatted);
    } else {
      setTotalPayment(amountPayment);
      setKHR(khmerMoney);
    }
  }, [money, khmerMoney]);
  return (
    <div className="conatiner_payment_checkout">
      <div className="child_USD">
        <h2 className="text_price_USD">Amount to Pay</h2>
        <p className="price_USD">USD {totalPaymet}</p>
      </div>
      <div className="child_KHR">
        <h2 className="text_price_USD">ចំនួនទឹកប្រាក់ដែលត្រូវបង់</h2>
        <p className="price_KHR">KHR {KHR}</p>
      </div>
      <div className="child_delivery">
        <h2 className="delivery-text">Delivery</h2>
        <p className={`delivery-price ${counters <= 3 ? "" : "active"}`}>
          USD $1.25
        </p>
      </div>
      <div className={`alertError ${!selectBank ? "active" : ""}`}>
        <h2 className="hasError">Has a error!</h2>
      </div>
      <div className="checkout_place">
        <div className="container_checkouts_item">
          <button
            className="checkouts_item"
            onClick={() => {
              handleSavePoint();
              handleClearStoreBags();
              if (!selectBank) return;
              navigate("/");
            }}
          >
            Check Out
          </button>
        </div>
        <div className="container_shopping_more">
          <Link
            to={"/product"}
            className="shopping_more"
            onClick={() => {
              setDropItem(false);
              setShowOverlyBG(false);
            }}
          >
            Shopping more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AmountPay;
