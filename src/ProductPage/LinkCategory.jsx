import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useDataProduct } from "../Context";
import "../style/product.css";
import RenderProduct from "./RenderProduct";
function LinkCategory() {
  const { link, handleLink, filterProduct, active } = useDataProduct();
  const linkRef = useRef(null);
  
  function scrollLeft() {
    linkRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }
  function scrollRight() {
    linkRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }
  return (
    <React.Fragment>
      <div className="Container_Links_product">
        <button className="scroll-button" id="scroll-left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="child_links" ref={linkRef}>
          {link.map((check, index) => {
            return (
              <Link
                className={`links ${check === active ? "actvie" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLink(check);
                }}
                key={index}
                data-typeproduct={check}
              >
                {check}
              </Link>
            );
          })}
        </div>
        <button
          className="scroll-button"
          id="scroll-right"
          onClick={scrollRight}
        >
          &gt;
        </button>
      </div>
      <RenderProduct data={filterProduct} />
    </React.Fragment>
  );
}

export default LinkCategory;
