import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

enum iputTypes {
  password = "password",
  text = "text",
  search = "search",
  email = "email",
}

const AppInput = ({ field, ...props }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const { type } = props;
  const inputClassName =
    type === iputTypes.password
      ? "pwd"
      : type === iputTypes.search
      ? "search"
      : "";
  let iconContent: JSX.Element = <></>;
  if (type === iputTypes.password) {
    iconContent = showHidePassword ? (
      <FontAwesomeIcon icon={faEyeSlash} />
    ) : (
      <FontAwesomeIcon icon={faEye} />
    );
  } else if (type === iputTypes.search) {
    iconContent = props.value ? (
      <FontAwesomeIcon icon={faTimes} />
    ) : (
      <FontAwesomeIcon icon={faSearch} />
    );
  }

  const onActionClick = () => {
    if (type === iputTypes.password) {
      changeShowHidePassword(!showHidePassword);
    } else {
      if (props.value) {
        inputRef.current.value = "";
        const currentTarget = {
          currentTarget: {
            value: "",
          },
        };
        props.onChange && props.onChange(currentTarget);
      }
    }
  };

  const getProps = { ...props };
  if (!props.onChange) {
    delete props.onChange;
  }

  return (
    <div className={`input ${inputClassName}`}>
      <div className="floatingWraper">
        <input
          ref={inputRef}
          {...field}
          {...getProps}
          //onChange={(e: React.FormEvent<HTMLInputElement>) => props.onChange && props.onChange(e.currentTarget.value)}
          type={
            type === iputTypes.password
              ? showHidePassword
                ? "text"
                : "password"
              : type
          }
        />
        <span className="placeholder-label">{props.helperText}</span>
      </div>
      <div className="iconContent" onClick={onActionClick}>
        {iconContent}
      </div>
    </div>
  );
};

export default AppInput;
