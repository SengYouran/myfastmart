function Voucher({ voucher, setShowOverlyBG, setVoucher }) {
  return (
    <div className={`container_voucher ${voucher ? "active" : ""}`}>
      <div className="text_exit_voucher">
        <h2 className="select_voucher">Select a voucher</h2>
        <i
          class="fa-solid fa-xmark"
          onClick={() => {
            setShowOverlyBG(false);
            setVoucher(false);
          }}
        ></i>
      </div>
      <div className="child_voucher">
        <h2 className="no_voucher">You have no gift card yet</h2>
      </div>
    </div>
  );
}

export default Voucher;
