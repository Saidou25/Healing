import React from "react";

const Card = ({ title, footer, body, rowName, columnName }) => {
  console.log(rowName);

  const renderField = (field) => {
    if (field.includes(".png")) {
      return (
        <>
          {/* <div className="row"></div> */}
          <div className="row">
            <div className="col-2">
              <img
                className="img-fluid img-fit"
                src={field}
                alt="hello"
                style={{ height: "40px" }}
              />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {/* <div className="row"></div> */}
          <span className="col-4">
            {field}
            {/* <br /> */}
          </span>
        </>
      );
    }
  };

  const renderFooter = (footerField) => {
    console.log(footerField)
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header fs-3">{title}</div>

        <div className="card-body m-3 fs-5">
          <div className={rowName}>
            {body &&
              body.map((field, index) => (
                <div
                  className={field.includes(".png") ? "col-2" : "col-12"}
                  key={index}
                >
                  {renderField(field)}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="card-footer text-primary fs-5">
        <div className="row">
          {footer && 
          footer.map((footerField, index) => (
          <div key={index}>
             {renderFooter(footerField)}
          </div>))}
        </div>
      </div>
    </>
  );
};
export default Card;
