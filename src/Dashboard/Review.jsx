import React from "react";

function Review({ id, profile, username, text_review }) {
  return (
    <React.Fragment>
      <div className="child_reviewer" key={id}>
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span className="star" key={star}>
              <i className="fa-solid fa-star"></i>
            </span>
          );
        })}
        <div className="comment">
          <p className="text-customer">{text_review}</p>
        </div>
        <div className="user_profile">
          <div className="profile">
            <div className="picture">
              <img src={profile} alt="User Profile" />
            </div>
            <div className="user_name">
              <h3 className="name">{username}</h3>
              <p className="happy_review">Happy reviews</p>
            </div>
          </div>
          <div className="quote_left">
            <i className="fa-solid fa-quote-left"></i>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Review;
