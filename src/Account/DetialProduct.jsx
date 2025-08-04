import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDataProduct } from "../Context";

function DetialProduct() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    createAccount,
    currentAccount,
    hiddenPuchased,
    setHiddenPuchased,
  } = useDataProduct();
  const { id } = useParams(); // ✅ gets ":id"
  const [product, setProduct] = useState(null);
  const [bank, setBank] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [priceKHR, setPriceKHR] = useState("");
  const [totalKHR, setTotalKHR] = useState("");
  const [shipAddress, setShipAddress] = useState(null);
  console.log(isSidebarOpen);
  useEffect(() => {
    const filter_product_detial = createAccount.find(
      (check) => check.id === currentAccount.id
    ); // find the account that match ID
    const find_bank_name = filter_product_detial?.selectBank; //find bank
    const filter_product_purchased = filter_product_detial?.purchased; //filter and selcet purchased
    const find_product = filter_product_purchased?.find(
      (check) => check.id == id
    ); // find item that match ID in useParam
    //==================add float to priceUSD(2.9 = 2.90)
    const formattedTotal = Number((find_product?.totalPrice || 0).toFixed(2));
    const priceUSD = formattedTotal.toFixed(2);
    //====================end============================
    //====================convert USD price to KHR ======
    const priceKhmer = parseFloat(find_product?.product_price.replace("$", ""));
    const khmerMoney = Math.round(priceKhmer * 4000); // គណនាជាពិត
    const khmerMoneyFormatted =
      new Intl.NumberFormat("km-KH").format(khmerMoney) + " ៛";
    //====================end=============================
    /*Total to pay  */
    const covertUSD = Math.round(formattedTotal * 4000);
    const KHR = new Intl.NumberFormat("km-KH").format(covertUSD) + " ៛";
    // end
    // filter and select ship address======================
    const shipped = filter_product_detial?.shippingAddress;
    //==================end================================

    setShipAddress(shipped);
    setProduct(find_product);
    setBank(find_bank_name);
    setPriceKHR(khmerMoneyFormatted);
    setPriceUSD(priceUSD);
    setTotalKHR(KHR);
  }, [createAccount, currentAccount]);
  return (
    <div
      className={`container_detial_product ${hiddenPuchased ? "active" : ""}`}
    >
      <h2 className="text_detial">
        <span className="exchange">Exchange |</span> ទិញរួច បើមិនពេញចិត្តទំនិញ
        ប្ដូរបាន ដោយឥតគិតថ្លៃ! (​លើកលែងបន្លែ សាច់)
      </h2>
      <div className="exit_time_code">
        <h2
          className="exit_detial_product"
          onClick={() => {
            setIsSidebarOpen(false);
            setHiddenPuchased(false);
          }}
        >
          Exit
        </h2>
        <div className="time_code">
          <div className="order_shipping">
            <h2 className="order_detial">Order No . #{product?.id}</h2>
            <div className="child_ship">
              <i class="fa-solid fa-circle"></i>
              <p className="shipping">Shipped</p>
            </div>
          </div>
          <h2 className="date_time_clock">{product?.dateTime}</h2>
        </div>
      </div>
      <div className="pending_packed_shipped">
        <div className="pending">
          <i class="fa-solid fa-check"></i>
          <p className="txt_pending">Pending</p>
        </div>
        <div className="border_padding"></div>
        <div className="packed">
          <i class="fa-solid fa-check"></i>
          <p className="txt_packed">Packed</p>
        </div>
        <div className="border_padding"></div>
        <div className="shipped">
          <i class="fa-solid fa-check"></i>
          <p className="txt_shipped">Shipped</p>
        </div>
      </div>
      <div className="child_detial_product">
        <div className="about_product_detial">
          <div className="bag_txt_pro">
            <i class="fa-solid fa-bag-shopping"></i>
            <h2 className="order_item_txt">Order item ({product?.counters})</h2>
          </div>
          <div className="border_bag_pro"></div>
          <div className="container_my_bags">
            <div className="child_my_bags">
              <img
                src={product?.product_image}
                alt="Product picture"
                className="product_my_bags"
              />
              <div className="info_my_bags">
                <h2 className="text_pro_my_bags">{product?.product_name}</h2>
                <h2 className="code_product">Code: {product?.id}</h2>
                <h2 className="code_product">Quantity X {product?.counters}</h2>
              </div>
            </div>
            <div className="container_price_my_bags">
              <p className="price_my_bags">USD {product?.product_price}</p>
              <p className="price_my_bags">KHR {priceKHR}</p>
            </div>
          </div>
        </div>
        <div className="about_payment_location">
          <div className="child_payment">
            <div className="bag_txt_pay">
              <i class="fa-solid fa-sack-dollar"></i>
              <h2 className="order_summary_txt">Order Summary</h2>
            </div>
            <div className="border_bag_pro"></div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">Payment method</h2>
              <h2 className="name_bank">{bank} Pay</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">Amount to pay</h2>
              <h2 className="price">${priceUSD}</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">Delivery Fee</h2>
              <h2 className="delivery_pay">$1.25</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">Just detailed prices</h2>
              <h2 className="name_bank">/ 1</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">Total</h2>
              <h2 className="price">USD ${priceUSD}</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">សរុប</h2>
              <h2 className="price">KHR {totalKHR}</h2>
            </div>
          </div>
          <div className="child_payment">
            <div className="bag_txt_pay">
              <i class="fa-solid fa-truck-fast"></i>
              <h2 className="order_summary_txt">Shipping Address</h2>
            </div>
            <div className="border_bag_pro"></div>
            <div className="ship_address_user">
              <i class="fa-solid fa-user"></i>
              <h2 className="bank_pay_price">{shipAddress?.fullName}</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">SILVER</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">{shipAddress?.phone}</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">{shipAddress?.address}</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">{shipAddress?.province}</h2>
            </div>
            <div className="child_bank_pay">
              <h2 className="bank_pay_price">{shipAddress?.country}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetialProduct;
