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

  const sliderCAT = useRef(null);
  const imgCAT = useRef(null);
  const intervalCAT = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotateIn, setRotateIn] = useState(true);

  useEffect(() => {
    const cleanupCategory = handleCategoryAutoScroll();
    const cleanupScroll = handleScroll();
    const cleanupRotate = handleRotateIn();

    return () => {
      cleanupScroll();
      cleanupRotate();
      cleanupCategory();
    };
  }, []);

  function handleRotateIn() {
    const intervalID = setInterval(() => {
      setRotateIn(false);
      setTimeout(() => {
        setCurrentIndex((prevID) => (prevID + 1) % bannerImage.length);
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
        slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
      } else {
        scrollAmount = 0;
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    };

    function handleResize() {
      clearInterval(intervalRef.current);
      if (!img || !slider) return;

      const maxScroll = slider.scrollWidth - img.clientWidth;
      const viewWidth = slider.clientWidth;
      const gap =
        window.innerWidth <= 600 ? 9 : window.innerWidth >= 1024 ? 11 : 10;
      const distance = img.clientWidth + gap;

      intervalRef.current = setInterval(() => {
        autoScroll(distance, maxScroll, viewWidth);
      }, scrollInterval);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }

  function handleCategoryAutoScroll() {
    const slider = sliderCAT.current;
    const img = imgCAT.current;

    let numberTotalScroll = 0;
    const intervalID = 3000;

    const autoScrollCAT = (distance, maxScroll, viewWidth) => {
      console.log(distance);
      if (numberTotalScroll < maxScroll - viewWidth) {
        numberTotalScroll += distance;
        slider.scrollTo({ left: numberTotalScroll, behavior: "smooth" });
      } else {
        numberTotalScroll = 0;
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    };

    function handleSize() {
      clearInterval(intervalCAT.current);
      if (!slider || !img) return;

      const maxScroll = slider.scrollWidth - img.clientWidth;
      const viewWidth = slider.clientWidth;
      const gap =
        window.innerWidth <= 600 ? 9 : window.innerWidth >= 1024 ? 11 : 10;
      const distance = img.clientWidth + gap;

      intervalCAT.current = setInterval(() => {
        autoScrollCAT(distance, maxScroll, viewWidth);
      }, intervalID);
    }

    handleSize();
    window.addEventListener("resize", handleSize);

    return () => {
      clearInterval(intervalCAT.current);
      window.removeEventListener("resize", handleSize);
    };
  }

  return (
    <div className="containerMain">
      <header className="Dashboard"></header>
      <BannerProduct />

      <section id="WelcomeBanner">
        <div className="dashboard">
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
          <div className="type_products" ref={sliderCAT}>
            {Categories_product.map(({ id, image, textName }, index) => (
              <Category
                key={id}
                image={image}
                textName={textName}
                imgRef={index === 0 ? imgCAT : null}
              />
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
