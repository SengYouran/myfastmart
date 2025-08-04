import { useDataProduct } from "../Context";
function AddToBag({
  product_image,
  product_price,
  setShowBag,
  showBag,
}) {
   const { setDropItem } = useDataProduct();
  return (
    <div className={`container_toBage ${showBag ? "show_bag":""}`}>
      <div className="child_product_bag">
        <img src={product_image} alt="Product Picture" className="bag_img" />
      </div>
      <div className="child_text_bag">
        <h2 className="bag_text">បានបន្ថែមទៅកន្រ្កកទំនិញ</h2>
        <p className="bag_price">តម្លៃទំនិញ: {product_price}</p>
        <button className="go_bag" onClick={()=>{setShowBag(false),setDropItem(true)}}>ឆែកមើលទំនិញ</button>
      </div>
    </div>
  );
}

export default AddToBag;
