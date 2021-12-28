import React, { useCallback, useRef } from "react";

const AppButton = (props) => {
  const submit = useRef<HTMLInputElement>();
  const onClick = useCallback(() => {
    if (props.isLoading || props.isDisabled) return;
    if (props.onClick) {
      props.onClick();
    }
    if (props.type === "submit") submit.current.click();
  }, []);

  const className = props.isDisabled ? props.className + ' disabled' : props.className;

  return (
    <div className={className} onClick={onClick}>
      {props.isLoading ? (
        <img src="./../../assets/images/loading.svg" className="loader" />
      ) : (
        props.title
      )}
      <input type="submit" ref={submit} className="d-none" />
    </div>
  );
};

export default AppButton;
