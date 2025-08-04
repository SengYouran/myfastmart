import { useDataProduct } from "../Context";
import React from "react";
function MyBags() {
  const { createAccount, currentAccount } = useDataProduct();
  const renderCart = createAccount.find(
    (check) => check.id === currentAccount.id
  );
  const renderItemMyBag = renderCart?.storeBags || [];
  return (
    <div className="container_checkout_product">
      {renderItemMyBag.map((render) => {
        const {
          id,
          product_image,
          product_price,
          product_name,
          counters,
          totalPrice,
        } = render;

        const formattedTotal = Number(totalPrice.toFixed(2));
        const khmerMoneyRaw = Math.round(formattedTotal * 4000); // គណនាជាពិត
        const khmerMoneyFormatted =
          new Intl.NumberFormat("km-KH").format(khmerMoneyRaw) + " ៛";
        return (
          <React.Fragment key={id}>
            <div className="container_my_bags" data-id={id}>
              <div className="child_my_bags">
                <img
                  src={product_image}
                  alt="Product picture"
                  className="product_my_bags"
                />
                <div className="info_my_bags">
                  <h2 className="text_pro_my_bags">{product_name}</h2>
                  <h2 className="code_product">Code: {id}</h2>
                  <h2 className="code_product">Quantity X {counters}</h2>
                </div>
              </div>
              <div className="container_price_my_bags">
                <p className="price_my_bags">USD {product_price}</p>
                <p className="price_my_bags">KHR {khmerMoneyFormatted}</p>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default MyBags;
