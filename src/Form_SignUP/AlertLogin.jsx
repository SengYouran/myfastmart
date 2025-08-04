import { useDataProduct } from "../Context";
import "../style/form.css";
function AlertLogin() {
  const { alertLogin, setAlertLogin, setHidden, setShowOverlyBG } =
    useDataProduct();
  return (
    <div className={`container_alert ${alertLogin ? "active" : ""}`}>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <h2 className="no_account">មិនទាន់បានចុះឈ្មោះ</h2>
      <p className="please_register">
        សូមធ្វើការចុះឈ្មោះជាមុនសិន(Register or Login)
      </p>
      <div className="ok_not">
        <h2
          className="no_back"
          onClick={() => {
            setAlertLogin(false);
            setShowOverlyBG(false);
          }}
        >
          ថយក្រោយ
        </h2>
        <h2
          className="yes_goo"
          onClick={() => {
            setHidden(true);
            setAlertLogin(false);
          }}
        >
          ចុះឈ្មោះ
        </h2>
      </div>
    </div>
  );
}

export default AlertLogin;
