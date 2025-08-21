import { useEffect, useState } from "react";
import { useDataProduct } from "../Context";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const {
    currentAccount,
    createAccount,
    isSidebarOpen,
    handleCartItem,
    setCountersWishlist,
    setCreateAccount,
    wishlistActive,
    setWishlistActive,
    setUpdateWishlist,
    setUpdateCounter,
  } = useDataProduct();
  const navigate = useNavigate();
  const findIndexUser = createAccount.find(
    (check) => check.id === currentAccount.id
  );
  const selectWishlist = findIndexUser?.wishlist ?? [];

  function handleAddBagCounter(id) {
    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );
    if (userIndex === -1) return;

    // ✅ 1. Remove from wishlist FIRST (to prevent UI lag)
    removeWishlist(id);

    // ✅ 2. Update counterWishlist
    setCountersWishlist((prev) => {
      const currentValue = prev[id] || 0;
      return {
        ...prev,
        [id]: currentValue + 1,
      };
    });
    
  }

  function removeWishlist(id) {
    
    const findIndexUser = createAccount.find(
      (check) => check.id === currentAccount.id
    );
    const oldWishlist = findIndexUser?.wishlist || [];
    const newWishlistActive = {
      ...wishlistActive,
      [id]: false,
    };
    const updatedWishlist = oldWishlist.filter((check) => check.id !== id);

    setWishlistActive(newWishlistActive);
    setUpdateWishlist(updatedWishlist);
  }
  function goToProduct() {
    navigate("/product");
  }
  return (
    <div className={`container_wishlist ${isSidebarOpen ? "" : "active"}`}>
      <h2 className="text_container_point">Wishlist (បញ្ជីរ)</h2>
      {selectWishlist?.length === undefined || selectWishlist?.length === 0 ? (
        <div className="child_no_pruchased">
          <h2 className="no_pruchased">
            Aww ..Snap. Your wish list is empty! / បញ្ជីរបស់អ្នកមិនមានទេ
          </h2>
          <p className="go_to_shop">
            ទិញសាច់ស្រស់ ទឹកសុទ្ធ និងគ្រឿងផ្ទះដ៏សមរម្យ—ងាយស្រួលក្នុងកន្លែងតែមួយ!
          </p>
          <button className="check_product" onClick={goToProduct}>
            តោះទៅទិញទំនិញ
          </button>
        </div>
      ) : (
        <div className="container_grip_product">
          {selectWishlist?.map((render) => {
            const { id, product_image, product_price, product_name } = render;
            return (
              <div className="conatiner_product_wishlist" key={id}>
                <div className="img_product_wishlist">
                  <img
                    src={product_image}
                    alt={product_name}
                    className="img_wishlist"
                  />
                </div>
                <div className="info_product_wishlist">
                  <div className="price_faMark">
                    <h2 className="price_wishlist">{product_price}</h2>
                    <div
                      className="child_custom_x"
                      onClick={() => removeWishlist(id)}
                    >
                      <span className="custom_x"></span>
                      <span className="custom_x"></span>
                    </div>
                  </div>
                  <h2 className="wishlist_name_product">{product_name}</h2>
                  <p className="wishlist_code_product">code: {id}</p>
                  <button
                    className="wishlist_to_bag"
                    onClick={() => {
                      handleAddBagCounter(id);
                      handleCartItem(id);
                    }}
                  >
                    Move to bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
