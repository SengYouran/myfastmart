import WelcomBanner from "../Dashboard/WelcomBanner.jsx";
import Category from "../Dashboard/Category.jsx";
import Popular from "../Dashboard/Popular.jsx";
import DiscountShop from "../Dashboard/DiscountShop.jsx";
import Review from "../Dashboard/Review.jsx";
import { Link } from "react-router-dom";
import { dataTopMilk } from "../data/top_milk.js";
import TopDrink from "../Dashboard/TopDrink.jsx";
import {
  Categories_product,
  Popular_Product,
  Product_Discount,
  Review_Product,
  bannerImage,
} from "../data/categories.js";
import "../style/dashboard.css";
import { useEffect, useRef, useState } from "react";
import BannerProduct from "../Dashboard/BannerProduct.jsx";

function Dashboard() {
  const sliderRef = useRef(null);
  const firstImgRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotateIn, setRotateIn] = useState(true);
  useEffect(() => {
    handleScroll();
    handleRotateIn();
  }, []);

  function handleRotateIn() {
    const intervalID = setInterval(() => {
      setRotateIn(false);
      setTimeout(() => {
        setCurrentIndex((prevenID) => (prevenID + 1) % bannerImage.length);
        setRotateIn(true);
      }, 100);
    }, 5000);
    return () => clearInterval(intervalID);
  }
  function handleScroll() {
    const slider = sliderRef.current;
    const img = firstImgRef.current;

    let scrollAmount = 0;
    const scrollInterval = 3000;

    const autoScroll = (distance, maxScroll, viewWidth) => {
      if (scrollAmount < maxScroll - viewWidth) {
        scrollAmount += distance;
        slider.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollAmount = 0;
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    };

    const handleResize = () => {
      clearInterval(intervalRef.current);

      if (!img || !slider) return;

      const maxScroll = slider.scrollWidth - img.clientWidth;
      const viewWidth = slider.clientWidth;
      let imgWidth = img.clientWidth;
      let gap = 10;

      if (window.innerWidth <= 600) gap = 9;
      else if (window.innerWidth >= 1024) gap = 11;

      const distance = imgWidth + gap;

      intervalRef.current = setInterval(() => {
        autoScroll(distance, maxScroll, viewWidth);
      }, scrollInterval);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }
  return (
    <div className="containerMain">
      <header className="Dashboard"></header>
      <BannerProduct />

      <section id="WelcomeBanner">
        <div
          className={`dashboard `}
          onClick={() => {
            setShowWelcome(false);
            console.log("clic");
          }}
        >
          <WelcomBanner
            currentIndex={currentIndex}
            rotateIn={rotateIn}
            bannerImage={bannerImage}
          />
        </div>
      </section>

      <section id="Categories">
        <div className="border"></div>
        <div className="category">
          <h2 className="txtCty">Categories</h2>
          <div className="type_products">
            {Categories_product.map(({ id, image, textName }) => (
              <Category key={id} image={image} textName={textName} />
            ))}
          </div>
        </div>
      </section>
      <section id="Product_Popular">
        <div className="category">
          <h2 className="txtCty">Popular Product</h2>
          <div className="popularProduct">
            {Popular_Product.map(
              ({
                id,
                product_image,
                product_name,
                quality,
                product_price,
                pre,
              }) => (
                <Popular
                  key={id}
                  id={id}
                  product_image={product_image}
                  product_name={product_name}
                  quality={quality}
                  product_price={product_price}
                  pre={pre}
                />
              )
            )}
          </div>
        </div>
      </section>

      <section id="Shop_discount">
        <div className="container_Dis_Review">
          <div className="child_discount">
            <div className="parent_discount">
              <h2 className="txtDis">Discount Shop</h2>
              <Link className="more" to="/product">
                View more
              </Link>
            </div>

            <div className="product_discount">
              {Product_Discount.map(
                ({ id, textDis, textOrder, shop, image }) => (
                  <DiscountShop
                    key={id}
                    textDis={textDis}
                    textOrder={textOrder}
                    shop={shop}
                    image={image}
                  />
                )
              )}
            </div>

            <div className="top_milk">
              <h2 className="text_top_milk">Top Milk</h2>
            </div>

            <div className="container_product_milk" ref={sliderRef}>
              {dataTopMilk.map(
                ({ id, product_image, product_name, product_price }, index) => (
                  <TopDrink
                    key={id}
                    id={id}
                    product_image={product_image}
                    product_name={product_name}
                    product_price={product_price}
                    imgRef={index === 0 ? firstImgRef : null}
                  />
                )
              )}
            </div>
          </div>

          <div className="child_review">
            <div className="btn_review">
              <h2 className="text_review">Review</h2>
              <Link className="more_review" to="/review">
                Add Review
              </Link>
            </div>
            <div className="box_review">
              {Review_Product.map(({ id, profile, username, text_review }) => (
                <Review
                  key={id}
                  profile={profile}
                  username={username}
                  text_review={text_review}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
