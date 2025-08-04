import {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { jsx } from "react/jsx-runtime";
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
const allDataProduct = createContext({ allDataProduct: [] });
const useDataProduct = () => useContext(allDataProduct);
function Context({ children }) {
  const [link, setLink] = useState([]);
  const [active, setActive] = useState("All_Products");
  const [filterProduct, setFilterProduct] = useState(joinAllArrayProduct);
  const [dropItem, setDropItem] = useState(false);
  const [showOverlyBG, setShowOverlyBG] = useState(false);
  const [hidden, setHidden] = useState(false); //form login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [phoneLogin, setPhoneLogin] = useState("");
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
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    country: "Cambodia",
    province: "",
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
    window.localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [counterBag, createAccount, currentAccount, isLogin, counters]);
  function handleCreateAccount(customPassword) {
    function generateUserId() {
      let userId = createAccount.length + 1;
      return userId.toString().padStart(4, "0");
    }

    const passwordToUse = customPassword || password;

    if (
      phone.trim() === "" ||
      email.trim() === "" ||
      fullName.trim() === "" ||
      passwordToUse.trim() === ""
    ) {
      return;
    }

    const allInfo = {
      id: generateUserId(),
      fullname: fullName,
      password: passwordToUse,
      phone: phone,
      email: email,
      gender: gender,
    };

    setCreateAccount([allInfo, ...createAccount]);
    setFullName("");
    setPassword("");
    setPhone("");
    setEmail("");
    setGender("");
  }

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
  useEffect(() => {
    if (purchased.length > 0) {
      const userIndex = createAccount.findIndex(
        (check) => check.id === currentAccount.id
      );
      if (userIndex !== -1) {
        const updateAccount = [...createAccount];
        const user = { ...updateAccount[userIndex] };

        // បន្ថែម purchased ថ្មីទៅ purchased ចាស់ (preserve old items)
        const oldPurchased = user.purchased || [];

        // Option 1: បញ្ចូល purchased ថ្មីចុងក្រោយ
        const mergedPurchased = [...oldPurchased, ...purchased];

        // Option 2: (optional) អាច merge និង remove duplicate តាម id
        // const mergedPurchased = [...oldPurchased, ...purchased].reduce((acc, item) => {
        //   if (!acc.find(i => i.id === item.id)) acc.push(item);
        //   return acc;
        // }, []);

        user.purchased = mergedPurchased;
        updateAccount[userIndex] = user;
        setCreateAccount(updateAccount);
        setPurchased([]);
        /*// preserve old purchased items + add new purchased items
user.purchased = [...(user.purchased || []), ...purchased];
*/
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
    setCounterBag(total);
  }

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

  const handleSelectProvince = (province) => {
    setForm({ ...form, province });
    setSelectProvince(false);
  };
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSave() {
    if (!form.fullName || !form.phone || !form.address || !form.province) {
      alert("Please fill in all required fields.");
      return;
    }

    // update shippingAddress in createAccount
    const userIndex = createAccount.findIndex(
      (user) => user.id === currentAccount.id
    );

    if (userIndex !== -1) {
      const updatedAccount = [...createAccount];
      updatedAccount[userIndex] = {
        ...updatedAccount[userIndex],
        shippingAddress: { ...form },
      };

      setCreateAccount(updatedAccount);
      setShippingAddress(form); // optional, if you want this value globally as well
      setShowOverlyBG(false);
      alert("Address updated successfully!");
    } else {
      alert("User not found.");
    }
  }
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
      setWishlistActive(newWishlistActive);
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

  return (
    <allDataProduct.Provider
      value={{
        joinAllArrayProduct,
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
      }}
    >
      {children}
    </allDataProduct.Provider>
  );
}
export { useDataProduct };
export default Context;
