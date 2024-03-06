import React from "react";

const CardFields = ({ review }) => {
  const render = (review) => {
    if (!review) {
      // console.log("no card body", review);
      return;
    }

    // console.log("There is card body", review);
    
    return (
      <>
        {review &&
          review.map((field) => (
            <div key={field._id}>
              <p>{JSON.stringify(field)}</p>
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="card mb-3">
        {/* <div className="card-header fs-3">{cardTitle}</div> */}
        <div className="card-body m-3">
          {render(review)}
          <br />
        </div>
        {/* <div className="card-footer">{cardFooter}</div> */}
      </div>
    </>
  );
};
export default CardFields;
