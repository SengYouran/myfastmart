import { useEffect, useRef, useState } from "react";
import { useDataProduct } from "../Context";
import { Link, useNavigate } from "react-router-dom";
function SearchProduct() {
  const {
    joinAllArrayProduct,
    setFilterProduct,
    setActive,
    searchActive,
    setSearchActive,
  } = useDataProduct();
  const [valueSearch, setValueSearch] = useState("");
  const [filterValueProduct, setFilterValueProduct] = useState([]);
  const focusSearch = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (searchActive && focusSearch.current) {
      focusSearch.current.focus();
    }
  }, [searchActive]);
  useEffect(() => {
    filterSearching();
  }, [valueSearch]);
  function Keyup(e) {
    const value = e.target.value;
    setValueSearch(value);
  }
  function KeyDown(e) {
    if (e.key === "Enter") {
      if (valueSearch === "") return;
      setFilterProduct(filterValueProduct);
      setActive("All_Products");
      bgGroundOverly();
      navigate("/product");
    }
  }
  function filterSearching() {
    const valueProduct = valueSearch.toLowerCase();

    if (valueProduct === "") {
      setTimeout(() => {
        setFilterValueProduct([]); // don't show any product
      }, 300);
      return;
    }
    setTimeout(() => {
      const filterValue = joinAllArrayProduct.filter((filter) =>
        filter.product_name.toLowerCase().includes(valueProduct)
      );
     
      setFilterValueProduct(filterValue);
    }, 300);
  }
  function bgGroundOverly() {
    setValueSearch("");
    setSearchActive(false);
  }
  return (
    <>
      <div className={`super_search ${searchActive ? "active" : ""}`}>
        <div className={`container_search `}>
          <input
            ref={focusSearch}
            type="search"
            name="search"
            className="search"
            placeholder="What are you searching for?"
            onChange={Keyup}
            onKeyDown={KeyDown}
            value={valueSearch}
          />
          <div className="border_bottom"></div>
        </div>
      </div>
      <div
        className={`BgOverlay ${searchActive ? "active" : ""}`}
        onClick={bgGroundOverly}
      ></div>
    </>
  );
}

export default SearchProduct;
