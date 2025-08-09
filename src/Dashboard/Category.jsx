function Category({ id, image, textName, imgRef }) {
  console.log(imgRef);
  return (
    <div className="product" data-id={id}>
      <img src={image} alt="Picture Categories" ref={imgRef} />
      <h2 className="text_CAT">{textName}</h2>
    </div>
  );
}
export default Category;
