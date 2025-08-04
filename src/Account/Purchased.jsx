import React, { useState } from "react";
import { useDataProduct } from "../Context";
import { Outlet, useNavigate } from "react-router-dom";

function Purchased() {
  const {
    isSidebarOpen,
    currentAccount,
    createAccount,
    hiddenPuchased,
    setHiddenPuchased,
    setIsSidebarOpen,
  } = useDataProduct();
  const navigate = useNavigate();
  const find_product_purchased = createAccount.find(
    (check) => check.id === currentAccount.id
  );
  const all_info_product = find_product_purchased?.purchased;
  function handleDetialProduct(id) {
    navigate(`detail/${id}`);
  }
  function goToProduct() {
    navigate("/product");
  }
  return (
    <React.Fragment>
      <div
        className={`all_container_purchased ${hiddenPuchased ? "active" : ""}`}
      >
        <div className={`container_purchased ${isSidebarOpen ? "" : "active"}`}>
          <h2 className="ordered_return">បានទិញ​ & ដូរទំនិញ</h2>
          <div className="text_ordered_return">
            <h2 className="text_ordered">បានទិញ​</h2>
            <h2 className="text_return">ដូរទំនិញ​</h2>
          </div>
          {all_info_product?.length === undefined ? (
            <div className="child_no_pruchased">
              <h2 className="no_pruchased">
                No purchases yet / មិនមានការទិញទំនិញទេ
              </h2>
              <button className="check_product" onClick={goToProduct}>
                តោះទៅទិញទំនិញ
              </button>
            </div>
          ) : (
            <div className="container_puchased_item">
              {all_info_product?.map((render) => {
                const priceKhmer = parseFloat(
                  render?.product_price.replace("$", "")
                );
                const khmerMoney = Math.round(priceKhmer * 4000); // គណនាជាពិត
                const khmerMoneyFormatteds =
                  new Intl.NumberFormat("km-KH").format(khmerMoney) + " ៛";
                const onlyDate = render?.dateTime.split(",")[0];
                const formattedTotal = Number(
                  (render?.totalPrice || 0).toFixed(2)
                );
                const priceUSD = formattedTotal.toFixed(2);
                const khmerMoneyRaw = Math.round(formattedTotal * 4000); // គណនាជាពិត
                const khmerMoneyFormatted =
                  new Intl.NumberFormat("km-KH").format(khmerMoneyRaw) + " ៛";
                return (
                  <div className="all_purchased_item" key={render.id}>
                    <div className="child_render_item_purchased">
                      <img
                        src={render?.product_image}
                        alt={render?.product_name}
                        className="pur_product"
                      />
                      <h2 className="pur_name_product">
                        {render?.product_name}
                      </h2>
                      <h2 className="pur_quantity">Qty. {render.counters}</h2>
                      <div className="pur_price">
                        <p className="pur_USD">USD {render?.product_price}</p>
                        <p className="pur_KHR">KHR {khmerMoneyFormatteds}</p>
                      </div>
                      <h2 className="day_month_year">{onlyDate}</h2>
                      <div className="pur_total_price">
                        <p className="pur_USD_total">Total: USD ${priceUSD}</p>
                        <p className="pur_KHR_total">
                          សរុប: KHR {khmerMoneyFormatted}
                        </p>
                      </div>
                      <h2
                        className="detial_product"
                        onClick={() => {
                          handleDetialProduct(render.id);
                          setHiddenPuchased(true);
                        }}
                      >
                        លម្អិតទំនិញ
                      </h2>
                    </div>
                    <div className="border_purchased"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
}

export default Purchased;
