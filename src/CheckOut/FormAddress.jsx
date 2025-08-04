import React, { useState } from "react";
import { useDataProduct } from "../Context";
import { provinces } from "../data/Info";
function FormAddress({ formAddress, setFormAddress, setShowOverlyBG }) {
  const {
    selectProvince,
    setSelectProvince,
    form,
    handleChange,
    handleSelectProvince,
    handleSave,
    handleAddress,
  } = useDataProduct();

  return (
    <React.Fragment>
      <i
        class={`fa-solid fa-xmark xmark_icon ${formAddress ? "active" : ""}`}
        onClick={() => {
          setFormAddress(!formAddress);
          setShowOverlyBG(false);
        }}
      ></i>
      <form
        className={`box_add_address_checkout ${formAddress ? "active" : ""}`}
        onSubmit={handleSave}
      >
        <div className="form_fullname-address">
          <h2 className="text_name_address">Full Name</h2>
          <input
            type="text"
            className="input_username"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form_telephon">
          <h2 className="text_mobile_number">Mobile number*</h2>
          <div className="form_mobile_input">
            <input
              type="text"
              className="number_code"
              value={"+ 855"}
              readOnly
            />
            <input
              type="text"
              className="number_phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_add_input_address">
          <h2 className="text_add_address">Address*</h2>
          <input
            type="text"
            className="input_address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="form_select_country_province">
          <h2 className="text_country">Available country</h2>
          <div className="country_province">
            <div className="child_country">
              <h2 className="text_input_country">Country</h2>
              <input
                type="text" name="countryCheckout"
                className="country"
                value={form.country}
                readOnly
              />
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div className="child_province">
              <h2 className="city_province">City / Province</h2>
              <input
                type="text"
                className="province" name="provinceCheckout"
                readOnly
                value={form.province}
                onClick={() => setSelectProvince(!selectProvince)}
              />
              <i
                className="fa-solid fa-chevron-down"
                onClick={() => setSelectProvince(!selectProvince)}
              ></i>
              <div
                className={`list_city_province ${
                  selectProvince ? "active" : ""
                }`}
              >
                {provinces.map((render, index) => {
                  return (
                    <h2
                      className="any_list"
                      key={index}
                      onClick={() => handleSelectProvince(render)}
                    >
                      {render}
                    </h2>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="save_infomation">
          <h2
            className="save_btn"
            onClick={() => {
              setFormAddress(!formAddress);
              handleSave();
              handleAddress();
            }}
          >
            Save
          </h2>
        </div>
      </form>
    </React.Fragment>
  );
}

export default FormAddress;
