import { Link } from "react-router-dom";

function Popular({id,product_image,product_name,quality,product_price,pre}) {
  
  return (
    <div className="childProductPopular" key={id}>
      <Link to={`/product/${id}`}><img src={product_image} alt="Picture Product" className="pro" /></Link>
      <h2 className="text_product">{product_name}</h2>
      <h3 className="txtQty">{quality}</h3>
      <div className="Parent_price">
        <h2 className="price">
          Price:
          {product_price} <span className="kg">{pre}</span>
        </h2>
      </div>
    </div>
  );
}

export default Popular;
