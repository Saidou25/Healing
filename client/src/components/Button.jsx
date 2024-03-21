import React from "react";

const Button = ({ children, type, className, onClick, style }) => {
  return (
    <button className={className} type={type} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
