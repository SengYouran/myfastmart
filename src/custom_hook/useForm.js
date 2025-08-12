import { useState } from "react";

function useForm() {
  const [hidden, setHidden] = useState(false); //form login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [phoneLogin, setPhoneLogin] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    country: "Cambodia",
    province: "",
  });
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
  return {
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
  };
}
export default useForm;
