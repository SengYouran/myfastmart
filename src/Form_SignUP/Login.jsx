import { useState } from "react";
import fackbook from "../assets/facebook logo.svg";
import google from "../assets/google logo.png";
import { useDataProduct } from "../Context";
function Login({ setActive, active }) {
  const [incorrect, setIncorrect] = useState(false);
  const [showPassd, setShowPassd] = useState(false);
  const {
    setCurrentAccount,
    createAccount,
    phoneLogin,
    setPhoneLogin,
    passwordLogin,
    setPasswordLogin,
    setIsLogin,
    setShowOverlyBG,
    setHidden,
  } = useDataProduct();
  function handleLoginAccount(e) {
    const currentUserLogin = createAccount.find(
      (find) => find.phone == phoneLogin && find.password == passwordLogin
    );
    if (currentUserLogin) {
      setCurrentAccount(currentUserLogin);
      setIncorrect(false);
      e.preventDefault();
      setIsLogin(true);
      setHidden(false);
      setShowOverlyBG(false);
      setActive(true);
    } else {
      e.preventDefault();
      setIncorrect(true);
      setIsLogin(false);
    }
  }
  return (
    <form
      className={`container_login ${active ? "hidden" : ""}`}
      onSubmit={handleLoginAccount}
    >
      <div className="container_phone">
        <h2 className="telephone">Telephone*</h2>
        <input
          type="tel"
          inputMode="numeric"
          name="telLogin"
          id="tel_login"
          className="phone"
          placeholder="Enter Telephone"
          value={phoneLogin}
          onChange={(e) => setPhoneLogin(e.target.value.trim())}
        />
      </div>
      <div className="form_password">
        <h2 className="telephone">Password*</h2>
        <input
          type={`${showPassd ? "text" : "password"}`}
          className="password"
          name="passwordLogin"
          id="passd_login"
          placeholder="Enter Password"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value.trim())}
        />
        <i
          class={` fa-solid fa-eye-slash ${showPassd ? "active" : ""}`}
          onClick={() => setShowPassd(true)}
        ></i>
        <i
          class={`fa-solid fa-eye ${showPassd ? "active" : ""}`}
          onClick={() => setShowPassd(false)}
        ></i>
      </div>
      <p className={`incorrect ${incorrect ? "active" : ""}`}>
        Incorrect Tel or Password!
      </p>
      <button className="btn_login" type="submit">
        LOGIN
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
          setActive(false);
        }}
      >
        New to Mini Mart? Register
      </h2>
    </form>
  );
}

export default Login;
