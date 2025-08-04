import { useState } from "react";
import "../style/form.css";
import Login from "./Login";
import Register from "./Register";
import { useDataProduct } from "../Context";
function Form() {
  const [active, setActive] = useState(true);
  const [hiddenBG, setHiddenBG] = useState(false);
  const { hidden, setHidden, setShowOverlyBG } = useDataProduct();
  return (
    <div className={`container_form ${hidden ? "showForm " : ""}`}>
      <i
        className="fa-solid fa-xmark"
        onClick={() => {
          setHidden(false), setShowOverlyBG(false);
        }}
      ></i>
      <div className="text_form">
        <h2
          className={`login ${active ? "active" : ""}`}
          onClick={() => {
            setActive(true);
          }}
        >
          LOGIN
        </h2>
        <h2
          className={`register ${active ? "" : "active"}`}
          onClick={() => {
            setActive(false);
          }}
        >
          REGISTER
        </h2>
      </div>
      <div className="border_form"></div>
      <Login active={active} setActive={setActive} />
      <Register active={active} setActive={setActive} setHiddenBG={setHiddenBG}/>
      <div className={`bgRegister ${hiddenBG ? "active" : " "}`}></div>
    </div>
  );
}

export default Form;
