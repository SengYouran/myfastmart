import { useState } from "react";

function useProducts(
  joinAllArrayProduct,
  isLogin,
  counters,
  setCounters,
  setCounterBag,
  setCreateAccount,
  setAlertLogin,
  setShowOverlyBG
) {
  const [searchActive, setSearchActive] = useState(false);
  const [link, setLink] = useState([]);
  const [active, setActive] = useState("All_Products");
  const [filterProduct, setFilterProduct] = useState(joinAllArrayProduct);

  function handleCartItem(id) {
    if (!isLogin) {
      setAlertLogin(true);
      setShowOverlyBG(true);
      return;
    }
    const product = joinAllArrayProduct.find((p) => p.id === id);
    if (!product) return;

    const { product_image, product_name, product_price } = product;
    const counterValue = counters[id] ?? 1;
    const cut_$ = parseFloat(String(product_price).replace("$", ""));

    if (counterValue <= 0) {
      alert("Select counter");
      return;
    }

    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );
    if (userIndex !== -1) {
      const updatedItem = {
        id,
        product_image,
        product_name,
        product_price,
        counters: counterValue,
        totalPrice: cut_$ * counterValue,
      };

      const updatedCreateAccount = [...createAccount];
      const user = { ...updatedCreateAccount[userIndex] };
      const oldCart = user.storeBags || [];

      const existingIndex = oldCart.findIndex((item) => item.id === id);
      let newCart;
      if (existingIndex !== -1) {
        newCart = [...oldCart];
        newCart[existingIndex] = updatedItem;
      } else {
        newCart = [updatedItem, ...oldCart];
      }

      user.storeBags = newCart;

      updatedCreateAccount[userIndex] = user;
      setCreateAccount(updatedCreateAccount);
    }
  }
  function handleLink(type) {
    setActive(type);

    const rederData =
      type === "All_Products"
        ? joinAllArrayProduct
        : joinAllArrayProduct.filter(
            (type_pro) => type_pro.product_type === type
          );
    setFilterProduct(rederData);
  }
  function handleCounterPlus(id) {
    setCounters((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  function handleCounterDash(id) {
    setCounters((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  }
  function handleBagCounter() {
    if (!isLogin) {
      setAlertLogin(true);
      setShowOverlyBG(true);
      return;
    }

    const total = Object.values(counters).reduce(
      (sum, count) => sum + count,
      0
    );
    setCounterBag(
      (prev) =>
        total +
        Object.values(counterWishlist).reduce((sum, count) => sum + count, 0)
    );
  }
  return {
    searchActive,
    setSearchActive,
    link,
    setLink,
    active,
    setActive,
    filterProduct,
    setFilterProduct,
    handleCartItem,
    handleLink,
    handleCounterPlus,
    handleCounterDash,
    handleBagCounter,
  };
}
export default useProducts;
