import {Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../page/Footer";
import Cart from "../ProductPage/Cart";
import { useDataProduct } from "../Context"; // ✅ Use context
import Form from "../Form_SignUP/Form";
import AlertLogin from "../Form_SignUP/AlertLogin";
import Calendar from "../Form_SignUP/Calendar";
import { useRef } from "react";
import "../style/form.css";
import Scroll from "../Scroll";
function RootLayout() {
  const { cartItem, showOverlyBG, setShowOverlyBG} =
    useDataProduct(); // ✅ Get necessary state
  const refCalendar = useRef();
  const openCalendar = () => {
    if (refCalendar.current) {
      refCalendar.current.flatpickr.open(); // បើក calendar popup
    }
  };
  return (
    <div className="supper-app">
      <Scroll />
      <Header openCalendar={openCalendar} />
      <Form />
      <AlertLogin />
      <Calendar refCalendar={refCalendar} />
      {/* ✅ Cart component visible on all pages */}
      <Cart cartItem={cartItem} setShowOverlyBG={setShowOverlyBG} />

      {/* ✅ Overlay */}
      <div
        className={`bgOverlyFull ${showOverlyBG ? "showOverlyBG" : ""}`}
      ></div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
