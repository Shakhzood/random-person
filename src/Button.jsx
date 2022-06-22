import React from "react";

const Button = ({
  text = "btnText",
  className = "btn",
  dataLabel = "defaultText",
  onMouseOver = () => {},
  onClick = () => {},
}) => {
  return (
    <button
      className={className}
      data-label={dataLabel}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
