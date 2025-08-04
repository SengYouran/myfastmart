function Reviewer({
  rating,
  setRating,
  hovered,
  setHovered,
  review,
  setReview,
  onSubmit,
  inputValue,
}) {
  return (
    <div className="child_add_review">
      <h2 className="text_logo">Add Review</h2>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span
              key={star}
              className="star"
              style={{
                color: star <= (hovered || rating) ? "#4caf50" : "#999",
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              &#9733;
            </span>
          );
        })}
      </div>
      <div className="text_review">
        <textarea
          className="text_area" name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <h2 className={`set_value ${inputValue ? "active" : ""}`}>
          Please input and select rating stars
        </h2>
      </div>
      <button
        className="button"
        onClick={() => {
          onSubmit();
        }}
      >
        Add Your review
      </button>
    </div>
  );
}

export default Reviewer;
