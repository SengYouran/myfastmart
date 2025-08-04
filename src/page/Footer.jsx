import React, { useState } from "react";
import {
  dataFooter1,
  dataFooter4,
  dataFooter5,
} from "../data/footer";
import "../style/footer.css";
import Policy from "../Policy/Policy";
import { Link } from "react-router-dom";

function Footer() {
  const [policy, setPolicy] = useState(false);

  return (
    <>
      <footer className="container_footer">
        {/* Store Information */}
        <div className="child_footer">
          <h2 className="text_footer">Store Information</h2>
          {dataFooter1.map((info, index) => (
            <div className="parent-address" key={index}>
              <i className={info.icon} aria-hidden="true"></i>
              <p className="text_info">{info.info}</p>
            </div>
          ))}
          <div className="social_media" aria-label="Social Media">
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="TikTok">
              <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="Telegram">
              <i className="fa-brands fa-telegram" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="child_footer">
          <h2 className="text_footer">Info</h2>

          <div className="parent-address">
            <i className="fa-solid fa-greater-than" aria-hidden="true"></i>
            <button
              className="text_info link-button"
              onClick={() => setPolicy(true)}
              aria-label="Open Privacy Policy"
            >
              Privacy Policy
            </button>
          </div>

          <div className="parent-address">
            <i className="fa-solid fa-greater-than" aria-hidden="true"></i>
            <Link className="text_info" to="/about">
              About Us
            </Link>
          </div>

          <div className="parent-address">
            <i className="fa-solid fa-greater-than" aria-hidden="true"></i>
            <p className="text_info">Careers</p>
          </div>

          <div className="parent-address">
            <i className="fa-solid fa-greater-than" aria-hidden="true"></i>
            <Link className="text_info" to="/">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Payments */}
        <div className="child_footer">
          <h2 className="text_footer">We Accept Payments</h2>
          {dataFooter4.map((info, index) => (
            <div className="parent-payment" key={index}>
              <img
                src={info.info}
                alt={`Payment option ${index + 1}`}
                className="We_accept_payments"
              />
            </div>
          ))}
        </div>

        {/* App Section */}
        <div className="child_footer">
          <h2 className="text_footer">Our App</h2>
          {dataFooter5.map((info, index) => (
            <div className="parent-app" key={index}>
              <p className="text_info">{info.app_text}</p>
              <div className="image_app">
                <img src={info.app1} alt="Google Play Store" />
                <img src={info.app2} alt="Apple App Store" />
              </div>
            </div>
          ))}
        </div>
      </footer>

      {/* Modal Policy */}
      <Policy policy={policy} setPolicy={setPolicy} />

      <h2 className="text_year_footer">Powered By FAST MART © 2025</h2>
    </>
  );
}

export default Footer;
