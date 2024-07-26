import { forwardRef, useRef } from "react";

const Input = ({ id, label, errorMsg, ...props }) => {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
      {errorMsg && <p className="control-error">{errorMsg}</p>}
    </div>
  );
};

export default Input;
