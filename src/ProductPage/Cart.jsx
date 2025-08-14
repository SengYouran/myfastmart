import { useEffect, useState } from "react";
import { useDataProduct } from "../Context";
import { Link } from "react-router-dom";
import React from "react";
function Cart({ setShowOverlyBG }) {
  const {
    dropItem,
    setDropItem,
    counterBag,
    setCounterBag,
    setCounters,
    createAccount,
    setCreateAccount,
    currentAccount,
    setKhmerMoney,
    khmerMoney,
    amountPayment,
    setAmountPayment,
  } = useDataProduct();
  const [showCount, setShowCount] = useState(null);
  const price_delivery = 1.25;
  const renderCart = createAccount?.find(
    (check) => check.id === currentAccount.id
  );
  const renderItemBag = renderCart?.storeBags || [];
  useEffect(() => {
    handleAmountPayment();
  }, [renderItemBag]);
  function handleDeleteCart(id) {
    const updateCounterBag = renderItemBag.find((check) => check.id === id);

    if (updateCounterBag && typeof setCounterBag === "function") {
      const newCounterUpdate = Math.max(
        counterBag - updateCounterBag.counters,
        0
      ); // ✅ No negative
      setCounterBag(newCounterUpdate);
    }

    const updatedCart = renderItemBag.filter((check) => check.id !== id);
    // ✅ Update storeBags inside the user
    const updatedCreateAccount = [...createAccount];
    const userIndex = updatedCreateAccount.findIndex(
      (acc) => acc.id === currentAccount.id
    );
    if (userIndex !== -1) {
      const updatedUser = { ...updatedCreateAccount[userIndex] };
      updatedUser.storeBags = updatedCart;
      updatedCreateAccount[userIndex] = updatedUser;
      setCreateAccount(updatedCreateAccount);
    }

    // ✅ Remove product counter from counters object
    setCounters((prev) => {
      const newCounters = { ...prev };
      delete newCounters[id];
      return newCounters;
    });

    setDropItem(true);
  }

  function handleAmountPayment() {
    let amountPayments = 0;
    let counter = 0;
    renderItemBag.forEach((item) => {
      const price = parseFloat(item.totalPrice) || 0;
      const count = parseInt(item.counters) || 0;
      amountPayments += price;
      counter += count;
    });
    const totalToPay =
      counter === 0
        ? 0
        : counter <= 3
        ? amountPayments + price_delivery
        : amountPayments;
    const formattedTotal = Number(totalToPay.toFixed(2));
    const khmerMoneyRaw = Math.round(formattedTotal * 4000);

    const khmerMoneyFormatted =
      new Intl.NumberFormat("km-KH").format(khmerMoneyRaw) + " ៛";

    setKhmerMoney(khmerMoneyFormatted);
    setAmountPayment(formattedTotal.toFixed(2));
  }
  const moreCounter = Array.from({ length: 100 }, (_, i) => i + 1);
  function resetNewCounter(newCounter, id) {
    const oldItem = renderItemBag.find((check) => check.id === id);
    const oldCount = oldItem?.counters || 0;
    const newTotal = counterBag - oldCount + newCounter;
    setCounterBag(newTotal);
    setCounters((prev) => ({
      ...prev,
      [id]: newCounter,
    }));
    // 3. Update storeBags in createAccount
    const updatedCreateAccount = [...createAccount];
    const userIndex = updatedCreateAccount.findIndex(
      (acc) => acc.id === currentAccount.id
    );

    if (userIndex !== -1) {
      const user = { ...updatedCreateAccount[userIndex] };
      user.storeBags = user.storeBags.map((item) =>
        item.id === id
          ? {
              ...item,
              counters: newCounter,
              totalPrice:
                newCounter *
                parseFloat(String(item.product_price).replace("$", "")),
            }
          : item
      );

      updatedCreateAccount[userIndex] = user;
      setCreateAccount(updatedCreateAccount);
    }

    // Optional UI refresh trigger
    setDropItem(true);
  }
  return (
    <div className={`hero-products1 ${dropItem ? "active" : ""}`}>
      <div>
        <p
          className="fa-solid fa-x"
          onClick={() => {
            setDropItem(false), setShowOverlyBG(false);
          }}
        ></p>
      </div>
      {renderItemBag.length > 0 ? (
        <div className="child-product1">
          <div className="text-about">
            {renderItemBag.map((render) => {
              const {
                id,
                product_image,
                product_price,
                product_name,
                counters,
              } = render;
              return (
                <React.Fragment key={id}>
                  <div
                    className="child_text"
                    onClick={(e) => {
                      e.stopProPagation();
                      setShowCount(null);
                    }}
                  >
                    <div className="products1">
                      <img
                        src={product_image}
                        alt="Product picture"
                        className="img-pro1"
                      />
                    </div>
                    <div className="container_infoProduct">
                      <div className="about">
                        <h2 className="text-h2">{product_name}</h2>
                      </div>
                      <div className="title">
                        <p className="happy">Enjoy with Products</p>
                        <p
                          className="fa-solid fa-trash"
                          onClick={() => handleDeleteCart(id)}
                        ></p>
                      </div>
                      <div className="qty" onClick={() => setShowCount(id)}>
                        <h3 className="text-h3">Quantity</h3>
                        <p className="p fa-solid fa-chevron-down">{counters}</p>
                      </div>
                      <div
                        className={`moreCounter ${
                          showCount === id ? "active" : ""
                        }`}
                      >
                        {moreCounter.map((render, index) => {
                          return (
                            <p
                              className="moreOption"
                              key={index}
                              onClick={() => {
                                resetNewCounter(render, id);
                                setShowCount(null);
                              }}
                            >
                              {render}
                            </p>
                          );
                        })}
                      </div>
                      <div className="price-checkout">
                        <p className="after-dis">After discount:</p>
                        <p className="curr-price">USD {product_price}</p>
                      </div>
                      <div className="price-checkout">
                        <p className="after-dis">តម្លៃបញ្ចុះរួច:</p>
                        <p className="curr-price">KHR 0</p>
                      </div>
                    </div>
                  </div>

                  <div className="border_oder_bag"></div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="border_checkOut"></div>
          <div className="conatiner_pay">
            <div className="amountPay">
              <div className="text_pay">
                <h2 className="amount">Amount to Pay</h2>
                <h2 className="amount">ចំនួនទឹកប្រាក់ត្រូវបង់</h2>
              </div>
              <div className="child_price">
                <p className="amount-price">USD ${amountPayment}</p>
                <p className="amount_khmer">KHR {khmerMoney}</p>
              </div>
            </div>
            <div className="delivery">
              <p className="delivery-text">Delivery</p>
              <p className="delivery-price">US ${price_delivery}</p>
            </div>
            <div className="checkOut">
              <div>
                <Link
                  to={"/checkouts"}
                  className="checkOut-item"
                  onClick={() => {
                    setDropItem(false);
                    setShowOverlyBG(false);
                  }}
                >
                  Check Out
                </Link>
              </div>
              <div>
                <Link
                  to={"/product"}
                  className="checkFlower"
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
        </div>
      ) : (
        <div className="noItemInBag">
          <div>
            <h2 className="emptyBag">Your bag is empty</h2>
          </div>
          <div>
            <p className="pText">
              Check out our latest arrivals stay up-to-date with latest styles
            </p>
          </div>
          <div>
            <p className="startShopping">Start shopping</p>
          </div>
          <div>
            <Link
              to="/product"
              className="checkFlower"
              onClick={() => {
                setDropItem(false);
                setShowOverlyBG(false);
              }}
            >
              More Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
