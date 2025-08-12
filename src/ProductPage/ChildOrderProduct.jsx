import React, { useState } from "react";
import AddToBag from "./AddToBag";
import Cart from "./Cart";
import { useDataProduct } from "../Context";

function ChildOrderProduct({ moneyKhmer, orderProduct, card }) {
  const { id, product_name, product_image, product_price, quality } =
    orderProduct;
  const [showBag, setShowBag] = useState(false);
  const {
    showOverlyBG,
    setShowOverlyBG,
    counters,
    handleCartItem,
    handleCounterDash,
    handleCounterPlus,
    handleBagCounter,
    isLogin,
  } = useDataProduct();
  return (
    <React.Fragment>
      <div className="container_order">
        <div className="child_product">
          <img
            src={product_image}
            alt="Product Order"
            className="big_product"
          />
          <img
            src={product_image}
            alt="Product Order"
            className="small_product"
          />
        </div>
        <div className="product_infomation">
          <h2 className="qaulity">{quality}</h2>
          <h2 className="code_product">លេខកូដ {id}</h2>
          <h2 className="name_product">{product_name}</h2>
          <h2 className="khmer_price">
            លុយខ្មែរ <span className="kh">{moneyKhmer}</span>
          </h2>
          <h2 className="usa_price">
            លុយដុល្លា <span className="usa">{product_price}</span>
          </h2>
          <h2 className="price_1item">តម្លៃជា​ឯកតា {product_price} / នីមួយ</h2>
          <div className="addCard_counter">
            <i
              className={`fa-solid fa-minus ${
                (counters[id] || 0) === 0 ? "disabled" : ""
              }`}
              onClick={() => handleCounterDash(id)}
            ></i>
            <p className="num_count">{counters?.[id] || 0}</p>
            <i
              className="fa-solid fa-plus"
              onClick={() => handleCounterPlus(id)}
            ></i>
          </div>
          <div className="add_to_card">
            <img src={card} alt={card} className="card" />
            <p
              className="text_add"
              onClick={() => {
                setShowOverlyBG(true);
                handleCartItem(id);
                handleBagCounter();
                if (!isLogin) return;
                setShowBag(true);
              }}
            >
              បន្ថែមទៅកន្ត្រក
            </p>
          </div>
          <div className="border_order"></div>
          <h2 className="text_information">
            ផលិតផលនៅក្នុងស្តុកហើយនឹងត្រូវដឹកជញ្ជូនក្នុងរយៈពេល​ ១ ថ្ងៃ។
          </h2>
        </div>
      </div>
      <AddToBag
        product_image={product_image}
        product_price={product_price}
        setShowBag={setShowBag}
        showBag={showBag}
        showOverlyBG={showOverlyBG}
        setShowOverlyBG={setShowOverlyBG}
      />
      <Cart setShowOverlyBG={setShowOverlyBG} />
      <div
        className={`bgOverlyFull ${showOverlyBG ? "showOverlyBG" : ""}`}
      ></div>
    </React.Fragment>
  );
}

export default ChildOrderProduct;
