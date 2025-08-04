import React, { useEffect, useState } from "react";
import Reviewer from "../UI/Review/Reviewer";
import Julina_Profile from "../assets/Categories/Julina.webp";
import ListReviewer from "../UI/Review/ListReviewer";
import "../style/review.css";
import { useDataProduct } from "../Context";
function Customer() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [togglar, setTogglar] = useState(false);
  const [inputValue, setInputValue] = useState(false);
  const [submit, setSubmit] = useState(() => {
    try {
      const stored = localStorage.getItem("StoreReviews");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });
  useEffect(() => {
    window.localStorage.setItem("StoreReviews", JSON.stringify(submit));
  }, [submit]);
  const { createAccount, currentAccount,isLogin,setAlertLogin,setShowOverlyBG } = useDataProduct();
  function handleSubmit() {
    if (rating === 0 || review.trim() === "") {
      return setInputValue(true);
    }
    const userID = createAccount.find(
      (check) => check.id === currentAccount.id
    );
    const username = userID?.fullname;
    const newReview = {
      id: Date.now(),
      user: username,
      text: review,
      rating,
    };
    setSubmit([newReview, ...submit]);
    setHovered(0);
    setRating(0);
    setReview("");
    setTogglar(false);
    setInputValue(false);
  }

  return (
    <React.Fragment>
      <div className="containerMain">
        <h2 className="Dashboard"></h2>
      </div>
      <section id="Review">
        <div className="container_text">
          <h2 className="txt_review">All Reviewer</h2>
          <button
            className="add_review "
            onClick={() => {
              if (!isLogin) {
                setAlertLogin(true);
                setShowOverlyBG(true);
                return;
              }
              setTogglar(true);
            }}
          >
            Add Review
          </button>
        </div>
        <div className={`container_add_review ${togglar ? "active" : ""}`}>
          <Reviewer
            rating={rating}
            review={review}
            setRating={setRating}
            setHovered={setHovered}
            hovered={hovered}
            setReview={setReview}
            onSubmit={handleSubmit}
            togglar={togglar}
            setTogglar={setTogglar}
            inputValue={inputValue}
          />
        </div>
      </section>
      <section>
        <div className="box_reviewer">
          <ListReviewer submit={submit} Julina_Profile={Julina_Profile} />
        </div>
      </section>
    </React.Fragment>
  );
}
export default Customer;
