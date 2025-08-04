import { useState } from "react";
import { useDataProduct } from "../Context";
import { provinces } from "../data/Info";
function AddressBook() {
  const {
    createAccount,
    currentAccount,
    selectProvince,
    setSelectProvince,
    form,
    handleChange,
    handleSelectProvince,
    handleSave,
    setForm,
    isSidebarOpen,
  } = useDataProduct();
  const [isEdit, setIsEdit] = useState(false);
  const find_Info_Addresss = createAccount.find(
    (check) => check.id === currentAccount.id
  );
  const info_address = find_Info_Addresss?.shippingAddress;
  const handleEdit = () => {
    const userData = createAccount.find((acc) => acc.id === currentAccount.id);
    if (userData && userData.shippingAddress) {
      setForm({
        fullName: userData.shippingAddress.fullName || "",
        phone: userData.shippingAddress.phone || "",
        address: userData.shippingAddress.address || "",
        country: userData.shippingAddress.country || "",
        province: userData.shippingAddress.province || "",
      });
    }
  };

  return (
    <div className={`contaier_address_book ${isSidebarOpen ? "" : "active"}`}>
      <h2 className="text_address">Address Book</h2>
      <div className={`child_infomation_address ${isEdit ? "" : "active"}`}>
        <h2 className="user_name_address">
          {info_address !== undefined ? info_address?.fullName : "Unnamed user"}
        </h2>
        <div className="location">
          <h2 className="phnom_penh">
            {info_address !== undefined
              ? info_address?.province
              : "Province not selected"}
            ,{" "}
            {info_address !== undefined
              ? info_address?.address
              : "No address on file"}
          </h2>
          <h2 className="tel_address">
            {info_address !== undefined
              ? info_address?.phone
              : "Phone number missing"}
          </h2>
          <p className="default">Default</p>
        </div>
        <h2
          className="btn_edit_address"
          onClick={() => {
            handleEdit();
            setIsEdit(true);
          }}
        >
          Edit
        </h2>
      </div>
      <div className={`form_add_edit_address ${isEdit ? "active" : ""}`}>
        <h2 className="form_edit_address">Edit address</h2>
        <h2 className="form_add_address">Add new address</h2>
        <form className="box_add_edit_info">
          <div className="form_fullname-address">
            <h2 className="text_name_address">Full Name</h2>
            <input
              type="text"
              className="input_username"
              name="fullNameAddressBook"
              id="fullNameAddressBook"
              value={form.fullName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form_telephon">
            <h2 className="text_mobile_number">Mobile number*</h2>
            <div className="form_mobile_input">
              <input
                type="text"
                name="codeAddressBook"
                id="codeAddressBook"
                className="number_code"
                value={"+ 855"}
                readOnly
              />
              <input
                type="text"
                className="number_phone"
                name="phoneAddressBook"
                id="phoneAddressBook"
                value={form.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form_add_input_address">
            <h2 className="text_add_address">Address*</h2>
            <input
              type="text"
              className="input_address"
              name="addressBook"
              id="addressBook"
              value={form.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form_select_country_province">
            <h2 className="text_country">Available country</h2>
            <div className="country_province">
              <div className="child_country">
                <h2 className="text_input_country">Country</h2>
                <input
                  type="text"
                  className="country"
                  name="countryAddressBook"
                  id="countryAddressBook"
                  value={form.country || ""}
                  autoComplete="countryAddressBook"
                  readOnly
                />
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div className="child_province">
                <h2 className="city_province">City / Province</h2>
                <input
                  type="text"
                  className="provinces"
                  name="provincesAddressBook"
                  id="provincesAddressBook"
                  value={form.province || ""}
                  onClick={() => setSelectProvince(!selectProvince)}
                  readOnly
                />
                <i
                  class="fa-solid fa-chevron-down"
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
        </form>
        <h2
          className="save"
          onClick={() => {
            handleSave();
            setIsEdit(false);
          }}
        >
          Save
        </h2>
      </div>
    </div>
  );
}

export default AddressBook;
