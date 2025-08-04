import React, { useEffect, useState } from "react";
import SearchProduct from "./SearchProduct";
import { Link } from "react-router-dom";
import { useDataProduct } from "../Context";
function RenderProduct({ data }) {
  const {
    counters,
    handleCounterPlus,
    handleCounterDash,
    handleBagCounter,
    handleCartItem,
    createAccount,
    currentAccount,
    isLogin,
    setAlertLogin,
    setShowOverlyBG,
    wishlistActive,
    setWishlistActive,
    setUpdateWishlist,
    handleUWishlist,
  } = useDataProduct();
  const productPerPage = 24;
  const maxVisiblePages = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(data.length / productPerPage);
  const startIndex = (currentPage - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;
  const currentProducts = data.slice(startIndex, endIndex);
  function handlePageChange(page) {
    setCurrentPage(page);
  }
  function renderPagination() {
    const buttons = [];
    const startPage = Math.max(
      currentPage - Math.floor(maxVisiblePages / 2),
      1
    );
    const endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);

    if (currentPage >= 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          « Prev
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (currentPage <= pageCount) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next »
        </button>
      );
    }

    return buttons;
  }

  return (
    <React.Fragment>
      <div className="container_product">
        {currentProducts.map((reder, index) => {
          const { id, product_name, product_image, product_price, quality } =
            reder;
          const key = id || `${product_name}-${index}`; // fallback key
          return (
            <div className="child_product" key={key} data-id={id}>
              <i
                className={`fa-solid fa-bookmark ${
                  wishlistActive?.[id] ? "active" : ""
                }`}
                onClick={() => {
                  handleUWishlist(id);
                }}
              ></i>
              <div className="parent_product">
                <Link to={`/product/${id}`}>
                  <img
                    src={product_image}
                    alt={product_name}
                    className="product"
                  />
                </Link>
              </div>
              <h2 className="txtQTY">{quality}</h2>
              <h3 className="txt_name">{product_name}</h3>
              <p className="price">Price: {product_price}</p>
              <div className="addCard_counter">
                <div className="count">
                  <i
                    className={`fa-solid fa-minus `}
                    onClick={() => handleCounterDash(id)}
                  ></i>
                  <p className="num_count">{counters?.[id] || 0}</p>
                  <i
                    className="fa-solid fa-plus"
                    onClick={() => handleCounterPlus(id)}
                  ></i>
                </div>
                <i
                  className="fa-solid fa-plus add_cart"
                  onClick={() => {
                    handleBagCounter(); handleCartItem(id);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="pagination">{renderPagination()}</div>
      <SearchProduct />
    </React.Fragment>
  );
}

export default RenderProduct;
