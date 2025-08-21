import { use, useEffect, useRef, useState } from "react";
import fackbook from "../assets/facebook logo.svg";
import google from "../assets/google logo.png";
import { useDataProduct } from "../Context";
function Register({ setActive, active, setHiddenBG }) {
  const [activePassd, setActivePassd] = useState(false);
  const {
    email,
    setEmail,
    phone,
    setPhone,
    fullName,
    setFullName,
    handleCreateAccount,
    gender,
    setGender,
  } = useDataProduct();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassd1, setShowPassd1] = useState(false);
  const [showPassd2, setShowPassd2] = useState(false);
  function handlePassword() {
    if (password1 === password2 && password1.length >= 6) {
      setActivePassd(false);
      setActive(true);
      setHiddenBG(false);
      setPassword1("");
      setPassword2("");
      return true;
    } else {
      setActivePassd(true);
      setHiddenBG(true);
      setActive(false);
      alert("Passwords do not match or too short");
      return false;
    }
  }

  return (
    <form className={`container_register ${active ? "" : "hidden"}`}>
      <div className="gender">
        <h2 className="text_gender">Gender*</h2>
        <label className="men_wowen">
          <input
            type="radio"
            className="radio_men_wowen"
            name="genderMale"
            id="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label className="men_wowen">
          <input
            type="radio"
            className="radio_men_wowen"
            name="genderFemale"
            id="gender1"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
      </div>
      <div className="fullname">
        <h2 className="name">Full Name</h2>
        <input
          type="text"
          name="usernameRegister"
          id="usernameRegister"
          className="username"
          placeholder="Enter Your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="container_phone">
        <h2 className="telephone">Telephone*</h2>
        <input
          type="tel"
          inputMode="numeric"
          name="telRegister"
          id="telRegister"
          className="phone"
          placeholder="Enter Telephone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="container_phone">
        <h2 className="telephone">Email(optional)</h2>
        <input
          type="text"
          className="phone"
          name="phoneRegister"
          id="phoneRegister"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        className="btn_register"
        onClick={(e) => {
          e.preventDefault(); // បញ្ឈប់ default behavior
          if (
            fullName.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === ""
          )
            return;
          setActivePassd(true);
          setHiddenBG(true);
        }}
      >
        CREATE ACCOUNT
      </button>
      <h2 className="forget_password">Forget Your Password?</h2>
      <div className="border_or">
        <div className="border_left"></div>
        <h2 className="text_or">OR</h2>
        <div className="border_right"></div>
      </div>
      <div className="facebook">
        <img src={fackbook} alt="Facebook logo" className="facebook_logo" />
        <h2 className="txet_fb">Continue With Facebook</h2>
      </div>
      <div className="google">
        <img src={google} alt="Google logo" className="google_logo" />
        <h2 className="txet_fb">Continue With Google</h2>
      </div>
      <h2
        className="new_to_register"
        onClick={() => {
          setActive(true);
        }}
      >
        Already have an account? Login
      </h2>
      <div className={`password_regsiter ${activePassd ? "active" : " "}`}>
        <span className="res_passd1">
          <input
            type={`${showPassd1 ? "text" : "password"}`}
            className="passd"
            name="passwordRegister"
            id="passd1"
            placeholder="Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <i
            class={` fa-solid fa-eye-slash ${showPassd1 ? "active" : ""}`}
            onClick={() => setShowPassd1(true)}
          ></i>
          <i
            class={`fa-solid fa-eye ${showPassd1 ? "active" : ""}`}
            onClick={() => setShowPassd1(false)}
          ></i>
        </span>
        <span className="res_passd2">
          <input
            type={`${showPassd2 ? "text" : "password"}`}
            className="passd"
            name="comfirmPasswordRegister"
            id="passd2"
            placeholder="Comfirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <i
            class={` fa-solid fa-eye-slash ${showPassd2 ? "active" : ""}`}
            onClick={() => setShowPassd2(true)}
          ></i>
          <i
            class={`fa-solid fa-eye ${showPassd2 ? "active" : ""}`}
            onClick={() => setShowPassd2(false)}
          ></i>
        </span>
        <h2
          className="comfirm"
          onClick={() => {
            if (handlePassword()) {
              handleCreateAccount(password2);
            }
          }}
        >
          Confirm
        </h2>
      </div>
    </form>
  );
}

export default Register;
