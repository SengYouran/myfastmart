import { Link, useParams } from "react-router-dom";
import "../style/productDetail.css";
import { useDataProduct } from "../Context";
import card from "../assets/cart-white.png";
import React, { useEffect, useState } from "react";
import ChildOrderProduct from "./ChildOrderProduct";
import SimilarProduct from "./SimilarProduct";
import { Infomation } from "../data/Info";
function ProductDetail() {
  const { joinAllArrayProduct } = useDataProduct();
  const { id } = useParams();
  const [orderProduct, setOrderProduct] = useState([]);
  const [moneyKhmer, setMoneyKhmer] = useState(0);
  useEffect(() => {
    const product_Order = joinAllArrayProduct.find((order) => order.id == id);
    if (product_Order) {
      setOrderProduct(product_Order);
      const new_Price = product_Order.product_price;
      const cut_$ = parseFloat(new_Price.replace("$", ""));
      const khmerMoneyRaw = Math.round(cut_$ * 4000);
      const khmerMoneyFormatted =
        new Intl.NumberFormat("km-KH").format(khmerMoneyRaw) + " ៛";
      setMoneyKhmer(khmerMoneyFormatted);
    }
  }, [id, joinAllArrayProduct]);
  if (!orderProduct || Object.keys(orderProduct).length === 0)
    return <p>កំពុងផ្ទុកទិន្នន័យ... ឬ​ មិនមានផលិតផលនេះទេ។</p>;
  const { product_type } = orderProduct;
  return (
    <React.Fragment>
      <div className="containerMain">
        <h2 className="Dashboard"></h2>
      </div>
      <div className="shop_more">
        <h2 className="ordernow">{orderProduct?.product_type}</h2>
        <Link className="more" to={"/product"}>
          Shoping More
        </Link>
      </div>
      <ChildOrderProduct
        orderProduct={orderProduct}
        moneyKhmer={moneyKhmer}
        card={card}
      />
      <h2 className="similar_text">ស្រដៀង {product_type}</h2>
      <SimilarProduct product_type={product_type} />
      <div className="AboutMart">
        {Infomation.map((render) => {
          const { id, image, text } = render;
          return (
            <div className="box_aboutMart" key={id} data-id={id}>
              <img src={image} alt={text} className="img" />
              <h2 className="aboutText">{text}</h2>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
export default ProductDetail;
