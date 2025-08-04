import { Outlet } from "react-router-dom";
function Product() {
  return (
    <div className="containerMain">
      <h2 className="Dashboard"></h2>
      <Outlet />
    </div>
  );
}

export default Product;
