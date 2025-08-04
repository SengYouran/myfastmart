import { Link } from "react-router-dom"
function TopDrink({id, product_image, product_name, product_price, imgRef}) {
  return (
    <div className="child_top_milk" data-id={id}>
        <div className="child_img">
            <Link to={`/product/${id}`}><img src={product_image} alt="Product Picture" className="img" ref={imgRef} /></Link>
            <h2 className="product_name">{product_name}</h2>
            <p className="price">Price: {product_price}</p>
        </div>
    </div>
  )
}

export default TopDrink