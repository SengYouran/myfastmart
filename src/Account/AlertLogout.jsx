import { useDataProduct } from "../Context";
import "../style/account.css";
function AlertLogin({ alertLogout, setAlertLogout }) {
  const { setShowOverlyBG } = useDataProduct();
  return (
    <div className={`container_logout ${alertLogout ? "active" : ""}`}>
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h2 className="logout_account">តើចង់ចាក់ចេញមែនទេ?</h2>
      <p className="text_logout">សូមធ្វើការចុចប៊ូតុងខាងក្រោម(...)</p>
      <div className="no_keep">
        <h2
          className="no_back"
          onClick={() => {
            setAlertLogout(false);
            setShowOverlyBG(false);
          }}
        >
          No, Keet it
        </h2>
        <button
          className="yes_logout"
          onClick={() => {
            setAlertLogout(false);
          }}
        >
          Yes, Logout
        </button>
      </div>
    </div>
  );
}

export default AlertLogin;
