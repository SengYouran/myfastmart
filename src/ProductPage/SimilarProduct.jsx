import { useEffect, useState } from "react";
import { useDataProduct } from "../Context";
import { Link } from "react-router-dom";
import "../style/product.css";
function SimilarProduct({ product_type }) {
  const {
    joinAllArrayProduct,
    counters,
    handleCounterDash,
    handleCounterPlus,
    handleCartItem,
    wishlistActive,
    handleUWishlist,
  } = useDataProduct();
  const [renderSimilar, setRenderSimilar] = useState([]);
  useEffect(() => {
    const similar = joinAllArrayProduct.filter(
      (check) => check.product_type === product_type
    );
    setRenderSimilar(similar);
  }, [product_type, joinAllArrayProduct]);

  function scrollTop() {
    window.scrollTo(0, 0);
  }
  return (
    <div className="container_product">
      {renderSimilar.map((reder, index) => {
        const { id, product_name, product_image, product_price, quality } =
          reder;
        const key = id || `${product_name}-${index}`;
        return (
          <div className="child_product" key={key} data-id={id}>
            <i
              className={`fa-solid fa-bookmark ${
                wishlistActive?.[id] ? "active" : ""
              }`}
              onClick={() => handleUWishlist(id)}
            ></i>
            <div className="parent_product">
              <Link to={`/product/${id}`} onClick={scrollTop}>
                <img src={product_image} alt="Product" className="product" />
              </Link>
            </div>
            <h2 className="txtQTY">{quality}</h2>
            <h3 className="txt_name">{product_name}</h3>
            <p className="price">Price: {product_price}</p>
            <div className="addCard_counter">
              <div className="count">
                <i
                  className="fa-solid fa-minus "
                  onClick={() => handleCounterDash(id)}
                ></i>
                <p className="num_count">{counters[id] || 0}</p>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => handleCounterPlus(id)}
                ></i>
              </div>
              <i
                className="fa-solid fa-plus add_cart"
                onClick={() => {
                  handleCartItem(id);
                }}
              ></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SimilarProduct;
