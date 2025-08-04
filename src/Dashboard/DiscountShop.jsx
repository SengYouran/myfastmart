import { Link } from "react-router-dom";

function DiscountShop({id,image,textDis,textOrder,shop}) {
  return (
    <div className="parent_dis" data-id={id}>
        <div className="disBlur"></div>
      <img src={image} alt="Discount Banner" className="disProduct" />
      <h2 className="txtDis">{textDis}</h2>
      <p className="txtOrder">{textOrder}</p>
      <Link className="shopNow" to="/product">
        {shop}
      </Link>
      
    </div>
  );
}

export default DiscountShop;
