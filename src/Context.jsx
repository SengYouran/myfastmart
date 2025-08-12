import { createContext, useContext, useEffect, useState } from "react";
import {
  allDrink_water_beer,
  all_Cake,
  all_Coffee,
  all_Fruit,
  all_Juice,
  all_Kitchen,
  all_Meats,
  all_Oli,
  all_Shampoo,
  all_milk,
  all_skinCare,
  all_vegetable,
} from "./data/product";
import { dataTopMilk } from "./data/top_milk";
const joinAllArrayProduct = [
  ...all_Fruit,
  ...all_Shampoo,
  ...all_Kitchen,
  ...all_skinCare,
  ...allDrink_water_beer,
  ...all_vegetable,
  ...all_milk,
  ...dataTopMilk,
  ...all_Oli,
  ...all_Cake,
  ...all_Coffee,
  ...all_Juice,
  ...all_Meats,
];
import { useRef } from "react"; // បន្ថែមលើគេ
import useForm from "./custom_hook/useForm";
import useProducts from "./custom_hook/useProducts";
const allDataProduct = createContext({ allDataProduct: [] });
const useDataProduct = () => useContext(allDataProduct);
function Context({ children }) {
  //useForm from custom hook
  const {
    hidden,
    setHidden,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    fullName,
    setFullName,
    gender,
    setGender,
    passwordLogin,
    setPasswordLogin,
    phoneLogin,
    setPhoneLogin,
    form,
    setForm,
    handleCreateAccount,
    handleSelectProvince,
    handleChange,
    handleSave,
  } = useForm();
  //end useForm=============
  //========================================================

  const [dropItem, setDropItem] = useState(false);
  const [showOverlyBG, setShowOverlyBG] = useState(false);
  const [alertLogin, setAlertLogin] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [khmerMoney, setKhmerMoney] = useState("0.00");
  const [amountPayment, setAmountPayment] = useState("0.00");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hiddenPuchased, setHiddenPuchased] = useState(false);
  const [selectProvince, setSelectProvince] = useState(false);
  const [selectBank, setSelectBank] = useState("");
  const [point, setPoint] = useState([]);
  const [counters, setCounters] = useState(() => {
    try {
      const storeCounter = localStorage.getItem("Counter");
      return storeCounter ? JSON.parse(storeCounter) : {};
    } catch (err) {
      return {};
    }
  });
  const [counterWishlist, setCountersWishlist] = useState(() => {
    try {
      const storeCounter = localStorage.getItem("CounterWishlist");
      return storeCounter ? JSON.parse(storeCounter) : {};
    } catch (err) {
      return {};
    }
  });

  const [isLogin, setIsLogin] = useState(() => {
    try {
      const storedLogin = localStorage.getItem("isLogin");
      return storedLogin ? JSON.parse(storedLogin) : false;
    } catch (err) {
      return false;
    }
  });
  const [createAccount, setCreateAccount] = useState(() => {
    try {
      const storeUserAccount = localStorage.getItem("storeUserAccount");
      return storeUserAccount ? JSON.parse(storeUserAccount) : [];
    } catch (err) {
      return [];
    }
  });
  const [currentAccount, setCurrentAccount] = useState(() => {
    try {
      const storeCurrentAccount = localStorage.getItem("storeCurrentAccount");
      return storeCurrentAccount ? JSON.parse(storeCurrentAccount) : [];
    } catch (err) {
      return [];
    }
  });
  const [counterBag, setCounterBag] = useState(() => {
    try {
      const storeCounters = localStorage.getItem("StoreBagCounter");
      return storeCounters ? JSON.parse(storeCounters) : 0;
    } catch (err) {
      return [];
    }
  });
  const [purchased, setPurchased] = useState([]);
  /* const [purchased, setPurchased] = useState(() => {
    try {
      const storePurchased = localStorage.getItem("storePuchased");
      return storePurchased ? JSON.parse(storePurchased) : [];
    } catch (err) {
      return [];
    }
  });*/
  useEffect(() => {
    window.localStorage.setItem("StoreBagCounter", JSON.stringify(counterBag));
    window.localStorage.setItem(
      "storeUserAccount",
      JSON.stringify(createAccount)
    );
    window.localStorage.setItem(
      "storeCurrentAccount",
      JSON.stringify(currentAccount)
    );
    window.localStorage.setItem("Counter", JSON.stringify(counters));
    window.localStorage.setItem(
      "CounterWishlist",
      JSON.stringify(counterWishlist)
    );
    window.localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [counterBag, createAccount, currentAccount, isLogin, counters]);

  function handleAddress() {
    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );
    const updateAccount = [...createAccount];
    const user = { ...updateAccount[userIndex] };
    if (shippingAddress) {
      user.shippingAddress = shippingAddress;
      setCreateAccount(updateAccount); // ✅ this is what was missing
    }
  }
  function handleBanks() {
    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );
    if (userIndex !== -1) {
      const updateAccount = [...createAccount];
      const user = { ...updateAccount[userIndex] };
      user.selectBank = selectBank;
      updateAccount[userIndex] = user;
      setCreateAccount(updateAccount); // ✅ this is what was missing
    }
  }
  const isFirstPurchasedRun = useRef(true); // ការការពារ first-run

  useEffect(() => {
    if (isFirstPurchasedRun.current) {
      isFirstPurchasedRun.current = false;
      return;
    }

    if (purchased.length > 0) {
      const userIndex = createAccount.findIndex(
        (check) => check.id === currentAccount.id
      );
      if (userIndex !== -1) {
        const updateAccount = [...createAccount];
        const user = { ...updateAccount[userIndex] };
        const oldPurchased = user.purchased || [];

        const merged = [...oldPurchased, ...purchased].reduce((acc, item) => {
          if (!acc.find((i) => i.id === item.id)) acc.push(item);
          return acc;
        }, []);

        user.purchased = merged;
        updateAccount[userIndex] = user;
        setCreateAccount(updateAccount);
        setPurchased([]); // clear
      }
    }
  }, [purchased]);
  useEffect(() => {
    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );
    if (userIndex !== -1) {
      const updateAccount = [...createAccount];
      const user = { ...updateAccount[userIndex] };
      const oldPoint = user?.point || [];
      const newPoint = [...oldPoint, ...point];
      user.point = newPoint;
      updateAccount[userIndex] = user;
      setCreateAccount(updateAccount);
    }
  }, [point]);
  useEffect(() => {
    const filterTypeProduct = joinAllArrayProduct.map(
      (type) => type.product_type
    );
    const select_one_type_product = new Set(filterTypeProduct);
    const new_arr_Type = ["All_Products", ...select_one_type_product];
    setLink(new_arr_Type);
  }, []);

  // ✅ Auto update counterBag when counters change
  useEffect(() => {
    const total = Object.values(counterWishlist).reduce(
      (sum, count) => sum + count,
      0
    );
    setCounterBag(
      (prev) =>
        Object.values(counters).reduce((sum, count) => sum + count, 0) + total
    );
  }, [counterWishlist]);

  const [wishlistActive, setWishlistActive] = useState({});
  const [updatedWishlist, setUpdateWishlist] = useState([]);
  useEffect(() => {
    if (!isLogin) {
      setShowOverlyBG(true);
      setAlertLogin(true);
      return;
    }

    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );

    if (userIndex !== -1) {
      const updateAccount = [...createAccount];
      const user = { ...updateAccount[userIndex] };

      user.wishlist = updatedWishlist;
      user.wishlistactive = wishlistActive;

      updateAccount[userIndex] = user;
      setCreateAccount(updateAccount);
    }
  }, [wishlistActive, updatedWishlist]);
  function handleUWishlist(id) {
    if (!isLogin) {
      setShowOverlyBG(true);
      setAlertLogin(true);
      return;
    }
    const item = joinAllArrayProduct.find((check) => check.id === id);
    if (!item) return;
    // ✅ Toggle wishlistActive
    const newWishlistActive = {
      ...wishlistActive,
      [id]: !wishlistActive[id],
    };
    setWishlistActive(newWishlistActive); // update UI
    /* setWishlistActive((prev) => ({
         ...prev,
         [id]: !prev[id],
       }));*/
    const userIndex = createAccount.findIndex(
      (check) => check.id === currentAccount.id
    );

    if (userIndex !== -1) {
      const user = createAccount[userIndex];
      const wishlist = user.wishlist || [];
      const isExist = wishlist.some((w) => w.id === id);
      const updatedWishlist = isExist
        ? wishlist.filter((w) => w.id !== id) // remove
        : [item, ...wishlist]; // add
      setUpdateWishlist(updatedWishlist);

      /* option a
      // ✅ Update both wishlist & wishlistActive
     const updatedUser = {
       ...user,
       wishlist: updatedWishlist,
       wishlistactive: newWishlistActive,
     };
 
     const updatedAccounts = [...createAccount];
     updatedAccounts[userIndex] = updatedUser;
 
     setCreateAccount(updatedAccounts);
     setCurrentAccount(updatedUser); // optional*/
    }
  }
  const [userPoints, setUserPoints] = useState([]);

  // Find current user and their points
  useEffect(() => {
    const currentUser = createAccount.find(
      (acc) => acc.id === currentAccount.id
    );
    const points = Array.isArray(currentUser?.point) ? currentUser.point : [];
    setUserPoints(points);
  }, [createAccount, currentAccount]);

  // Sync totalPoint to user's account, only when needed
  useEffect(() => {
    const index = createAccount.findIndex(
      (acc) => acc.id === currentAccount.id
    );
    if (index !== -1) {
      const updatedAccounts = [...createAccount];
      const user = { ...updatedAccounts[index] };

      const storedPoints = user.point || [];
      const storedTotal = storedPoints?.reduce(
        (sum, item) => sum + item.point,
        0
      );

      if (user.totalpoint !== storedTotal) {
        user.totalpoint = storedTotal;
        updatedAccounts[index] = user;
        setCreateAccount(updatedAccounts);
      }
    }
  }, [userPoints, currentAccount.id]);

  const [updateSpentPoint, setUpdateSpentPoint] = useState([]);
  useEffect(() => {
    const UserIndex = createAccount.findIndex(
      (acc) => acc.id === currentAccount.id
    );
    if (UserIndex !== -1) {
      const updateAccount = [...createAccount];
      const user = { ...updateAccount[UserIndex] };
      const updatePoint = {
        ...user,
        point: updateSpentPoint?.point ?? user?.point,
        totalpoint: updateSpentPoint?.totalpoint ?? user?.totalpoint,
        spentpoint: updateSpentPoint?.spentpoint ?? user?.spentpoint,
      };
      updateAccount[UserIndex] = updatePoint;
      setCreateAccount(updateAccount);
    }
  }, [updateSpentPoint, currentAccount.id]);

  //useProduct from customer hook
  const {
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
  } = useProducts(
    joinAllArrayProduct,
    isLogin,
    counters,
    setCounters,
    setCounterBag,
    setCreateAccount,
    setAlertLogin,
    setShowOverlyBG
  );
  //end useProducts
  return (
    <allDataProduct.Provider
      value={{
        joinAllArrayProduct,
        searchActive,
        setSearchActive,
        handleLink,
        link,
        filterProduct,
        setFilterProduct,
        active,
        setActive,
        handleCounterDash,
        handleCounterPlus,
        counters,
        setCounters,
        counterBag,
        dropItem,
        setDropItem,
        showOverlyBG,
        setShowOverlyBG,
        handleBagCounter,
        handleCartItem,
        handleAddress,
        handleBanks,
        setCounterBag,
        hidden,
        setHidden,
        email,
        setEmail,
        phone,
        setPhone,
        fullName,
        setFullName,
        password,
        setPassword,
        currentAccount,
        setCurrentAccount,
        handleCreateAccount,
        createAccount,
        setCreateAccount,
        phoneLogin,
        setPhoneLogin,
        passwordLogin,
        setPasswordLogin,
        setIsLogin,
        isLogin,
        setAlertLogin,
        alertLogin,
        gender,
        setGender,
        setShippingAddress,
        setKhmerMoney,
        khmerMoney,
        amountPayment,
        setAmountPayment,
        setIsSidebarOpen,
        isSidebarOpen,
        selectProvince,
        setSelectProvince,
        form,
        setForm,
        handleChange,
        handleSelectProvince,
        handleSave,
        selectBank,
        setSelectBank,
        purchased,
        setPurchased,
        hiddenPuchased,
        setHiddenPuchased,
        point,
        setPoint,
        setUpdateWishlist,
        wishlistActive,
        setWishlistActive,
        handleUWishlist,
        userPoints,
        setUpdateSpentPoint,
        setCountersWishlist,
      }}
    >
      {children}
    </allDataProduct.Provider>
  );
}
export { useDataProduct };
export default Context;
