import React, { useState } from "react";

function GiftPoint({ getPoint, money, handleSpentPoint }) {
  const [checkPoint, setCheckPoint] = useState(false);
  return (
    <React.Fragment>
      <div className="child_gift_point">
        <input type="text" className="conde_gift"  name="gift"/> 
        <div className="apply_gift">
          <h2 className="apply">Apply</h2>
        </div>
      </div>
      <div className="child_point">
        <div className="point_quetion">
          <h2 className="text_point">Point redemption</h2>
          <i class="fa-solid fa-question"></i>
        </div>
        <div className="point" onClick={() => setCheckPoint((prev) => !prev)}>
          <i className="fa-solid fa-money-check-dollar"></i>
          <div className="price_point">
            <h2 className="use_point">Use point</h2>
            <p className="price_in1">
              {getPoint} points ≈ ${money}
            </p>
          </div>
          <div className={`showPoint ${checkPoint ? "active" : ""}`}>
            <h2 className="your_point">Your point: {getPoint}</h2>
          </div>
          <div className={`no_yes ${checkPoint ? "active" : ""}`}>
            <p
              className={`no_spent`}
              onClick={(e) => {
                e.stopPropagation();
                setCheckPoint(false);
              }}
            >
              No, keep it
            </p>
            <p
              className="yes_spent"
              onClick={(e) => {
                e.stopPropagation();
                handleSpentPoint();
                setCheckPoint(false);
              }}
            >
              Yes, spent
            </p>
          </div>
        </div>
      </div>
      <div className="child_comment">
        <h2 className="text_comment">Comment</h2>
        <textarea className="form_comment" placeholder="Comment" name="comment"></textarea>
      </div>
    </React.Fragment>
  );
}

export default GiftPoint;
