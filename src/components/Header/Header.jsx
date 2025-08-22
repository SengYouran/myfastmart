import ChildHeader from "./ChildHeader";
import "./header.css";
import "../../App.css";
import SearchProduct from "../../ProductPage/SearchProduct";
import { useEffect, useState } from "react";
import { useDataProduct } from "../../Context";
import { useNavigate } from "react-router-dom";
import fast_mart from "../../assets/FAST MART.png";
const dataHeader = [
  { id: 1, link: "🏠 Dashboard", path: "/" },
  { id: 2, link: "📦 Products", path: "/product" },
  { id: 3, link: "🛒 About Us", path: "/about" },
  { id: 4, link: "👤 Reviews", path: "/review" },
];
function Header({ openCalendar }) {
  const navigator = useNavigate();
  const [showHidden, setShowHidden] = useState(false);
  const {
    setShowOverlyBG,
    setDropItem,
    setHidden,
    isLogin,
    setSearchActive,
    createAccount,
    currentAccount,
  } = useDataProduct();
  const [isHeader, setIsHeader] = useState(false);
  const [newCounter, setNewCounter] = useState(0);
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setIsHeader(false);
      } else {
        setIsHeader(true);
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeader]);

  function handleAccountLogin() {
    if (isLogin) {
      setHidden(false);
      setShowOverlyBG(false);
    } else {
      setHidden(true);
      setShowOverlyBG(true);
    }
  }

  useEffect(() => {
    // បើមិន login ឬ currentAccount មិនមាន ID កុំដំណើរការ
    if (!isLogin || !currentAccount?.id) {
      setNewCounter(0);
      return;
    }

    // រក user ត្រឹមត្រូវ
    const counterUser = createAccount.find(
      (check) => check.id === currentAccount.id
    );
    /*let totalCounters = 0;
     storeBags.forEach((item) => {
     totalCounters += item.counters || 0;
      }); */
    const storeBags = counterUser?.storeBags || [];
    const totalCounters = storeBags.reduce(
      (sum, item) => sum + (item.counters || 0),
      0
    );
    setNewCounter(totalCounters);
  }, [createAccount, currentAccount?.id, isLogin]);

  return (
    <>
      <header>
        <div className={`container_header ${isHeader ? "active" : ""}`}>
          <div className="bigScrenn">
            <i
              className="fa-solid fa-bars"
              onClick={() => {
                setShowHidden(true);
              }}
            ></i>
            <img
              className="logo_small_media"
              src={fast_mart}
              alt="FAST MART LOGO"
            />
          </div>
          <div className="logo_big_screen">
            <img
              className="logo"
              src={fast_mart}
              alt="FAST MART LOGO"
              onClick={() => navigator("/")}
            />
          </div>
          <div className="informInfo">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => setSearchActive(true)}
            ></i>
            <i className="fas fa-calendar-alt" onClick={openCalendar}></i>
            {isLogin ? (
              <i
                className="fa-solid fa-bag-shopping"
                onClick={() => {
                  setDropItem(true);
                  setShowOverlyBG(true);
                }}
              >
                <p className="count_number">{newCounter}</p>
              </i>
            ) : null}
            <div className="accountLogin">
              {isLogin ? (
                <i
                  className={`fa-solid fa-face-smile `}
                  onClick={() => navigator("/account")}
                ></i>
              ) : (
                <i
                  className={`fa-solid fa-circle-user `}
                  onClick={() => {
                    handleAccountLogin();
                  }}
                ></i>
              )}
            </div>
            <SearchProduct />
          </div>
        </div>
      </header>
      <header className={`container-header ${showHidden ? "open" : ""}`}>
        <div className="child_custom_x" onClick={() => setShowHidden(false)}>
          <span className="custom_x"></span>
          <span className="custom_x"></span>
        </div>
        <h2 className="logo-Mobile">Fast Mart</h2>
        <ChildHeader dataHeader={dataHeader} setShowHidden={setShowHidden} />
      </header>
    </>
  );
}

export default Header;
