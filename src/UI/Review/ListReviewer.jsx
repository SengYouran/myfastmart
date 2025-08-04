function ListReviewer({ submit, Julina_Profile }) {
  //const StoreReview = JSON.parse(localStorage.getItem("StoreReview")) || {};
  return (
    <>
      {submit.length == 0 ? (
        <h2 className="no_data">No data reviewer</h2>
      ) : (
        submit.map((create) => {
          return (
            <div className="child_reviewer" key={create.id}>
              {[1, 2, 3, 4, 5].map((star) => {
                return (
                  <span className="star" key={star + create.id}>
                    <i
                      className="fa-solid fa-star"
                      style={{
                        color: star <= create.rating ? "#4caf50" : "#999",
                      }}
                    ></i>
                  </span>
                );
              })}
              <div className="comment">
                <p className="text-customer">{create.text}</p>
              </div>
              <div className="user_profile">
                <div className="profile">
                  <div className="picture">
                    <img src={Julina_Profile} alt="User Profile" />
                  </div>
                  <div className="user_name">
                    <h3 className="name">Kim yujong</h3>
                    <p className="happy_review">Happy reviews</p>
                  </div>
                </div>
                <div className="quote_left">
                  <i className="fa-solid fa-quote-left"></i>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default ListReviewer;
