import React from "react";

const Button = ({ children, type, className, onClick, style, disabled }) => {
  return (
    <button className={className} type={type} style={style} onClick={onClick}
    disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
