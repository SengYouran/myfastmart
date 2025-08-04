import { useDataProduct } from "../Context";
function PersonalDetial() {
  const {
    currentAccount,
    setCurrentAccount,
    isSidebarOpen,
    handleCreateAccount,
  } = useDataProduct();

  // បង្កើត handler ផ្លាស់ប្តូរព័ត៌មានជាមួយ update currentAccount ត្រង់នេះ
  const handleChange = (field, value) => {
    setCurrentAccount({
      ...currentAccount,
      [field]: value,
    });
  };

  return (
    <div className={`container_personal ${isSidebarOpen ? "" : "active"}`}>
      <h2 className="edit_profile">Edit Profile</h2>
      <form
        className={`container_register`}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAccount(null);
        }}
      >
        <div className="gender">
          <h2 className="text_gender">Gender*</h2>
          <label className="men_wowen">
            <input
              type="radio"
              className="radio_men_wowen"
              name="gender"
              value="Male"
              checked={currentAccount.gender === "Male"}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
            Male
          </label>
          <label className="men_wowen">
            <input
              type="radio"
              className="radio_men_wowen"
              name="gender"
              value="Female"
              checked={currentAccount.gender === "Female"}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
            Female
          </label>
        </div>

        <div className="fullname-account">
          <h2 className="name">Full Name</h2>
          <input
            type="text"
            className="username" name="username"
            value={currentAccount.fullname || ""}
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
          <i className="fa-solid fa-check"></i>
        </div>

        <div className="container_phone_account">
          <h2 className="telephone">Telephone*</h2>
          <input
            type="tel"
            inputMode="numeric"
            className="phone" name="code"
            value={currentAccount.phone || ""}
            disabled
          />
          <i className="fa-solid fa-check"></i>
        </div>

        <div className="container_phone_account">
          <h2 className="telephone">Email (optional)</h2>
          <input
            type="email"
            className="phone" name="phone"
            value={currentAccount.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <i className="fa-solid fa-check"></i>
        </div>

        <button className="btn_register" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default PersonalDetial;
