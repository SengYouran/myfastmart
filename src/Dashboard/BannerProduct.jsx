import React, { useEffect, useRef, useState } from "react";

const banner = [
  "https://cdn.pixabay.com/photo/2019/10/05/08/53/shop-4527402_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/02/20/13/31/girl-7024553_1280.jpg",
];

const BannerProduct = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const extendedBanner = [...banner, banner[0]];

  // Scroll to index with option to disable smooth
  const scrollToIndex = (index, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;

    if (smooth) {
      container.style.scrollBehavior = "smooth";
    } else {
      container.style.scrollBehavior = "auto";
    }

    container.scrollTo({
      left: index * width,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Auto increment index every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll when currentIndex changes
  useEffect(() => {
    // If reached clone slide (last index), scroll smoothly to clone slide
    if (currentIndex === banner.length) {
      scrollToIndex(currentIndex, true);
      setIsJumping(true);
    } else {
      scrollToIndex(currentIndex, true);
    }
  }, [currentIndex]);

  // Handle scroll event for loop
  const handleScroll = () => {
    if (!isJumping) return;
    const container = containerRef.current;
    const width = container.offsetWidth;
    const scrollLeft = container.scrollLeft;

    // When scroll finished moving to clone slide (approximately)
    if (Math.round(scrollLeft) === banner.length * width) {
      // Disable smooth and jump to first slide instantly
      scrollToIndex(0, false);
      setCurrentIndex(0);
      setIsJumping(false);
    }
  };

  return (
    <>
      <div
        className="container_banner"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {extendedBanner.map((src, i) => (
          <div className="banner" key={i}>
            <img src={src} alt={`Banner-${i}`} className="img_banner" />
          </div>
        ))}
      </div>

      <div className="border-container">
        {banner.map((_, i) => (
          <div
            key={i}
            className={`border-bar ${
              i === currentIndex % banner.length ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </>
  );
};

export default BannerProduct;
