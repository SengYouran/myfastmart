function Category({id,image, textName}) {
  return (
    <div className="product" data-id={id}>
      <img src={image} alt="Picture Categories" />
      <h2 className="text_Cty">{textName}</h2>
    </div>
  );
}
export default Category;
