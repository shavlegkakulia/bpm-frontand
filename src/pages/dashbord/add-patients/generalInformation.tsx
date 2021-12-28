import React from "react";
import AppInput from "../../../components/IU/AppInput";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Field, FormikErrors, FormikTouched, useFormikContext } from "formik";
import { IPatientForms } from "./addPatients";

interface IProps {
  errors: FormikErrors<IPatientForms>;
  touched: FormikTouched<IPatientForms>;
}

const GeneralInformation: React.FC<IProps> = ({ errors, touched }) => {
  const formik = useFormikContext<IPatientForms>();
  
  return (
    <div className="generalInformation">
      <div className="generalsTitle">General Information</div>
      <div className="form">
        <div className="inputBox">
          <Field
            type="text"
            className="input weight"
            name="weight"
            helperText="Weight"
            component={AppInput}
          />
          {errors.weight && touched.weight ? (
            <div className="errorMessage">{errors.weight}</div>
          ) : null}
        </div>
        <div className="inputBox">
          <Field
            type="text"
            className="input age"
            name="age"
            helperText="Age"
            component={AppInput}
          />
          {errors.age && touched.age ? (
            <div className="errorMessage">{errors.age}</div>
          ) : null}
        </div>
        <div className="inputBox">
          <Dropdown align={"end"} className="genderSwitch">
            <Dropdown.Toggle className="dropdownCover">
              <div className="genderDropdown">
                {formik.values.gender || "Gender"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="faChevronDown"
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item
                className="dropdownMenuItem"
                onClick={() => formik.setFieldValue("gender", "male")}
              >
                male
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdownMenuItem"
                onClick={() => formik.setFieldValue("gender", "female")}
              >
                female
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Field
            type="hidden"
            className="input gender"
            name="gender"
            placeholder="gender"
          />
          {errors.gender && touched.gender ? (
            <div className="errorMessage">{errors.gender}</div>
          ) : null}
        </div>
        <div className="inputBox">
          <Field
            type="text"
            className="input height"
            name="height"
            helperText="height"
            component={AppInput}
          />
          {errors.height && touched.height ? (
            <div className="errorMessage">{errors.height}</div>
          ) : null}
        </div>
        <div className="inputBox">
          <Field
            type="text"
            className="input bodyTemprature"
            name="bodyTemprature"
            helperText="bodyTemprature"
            component={AppInput}
          />
          {errors.bodyTemprature && touched.bodyTemprature ? (
            <div className="errorMessage">{errors.bodyTemprature}</div>
          ) : null}
        </div>
        <div className="inputBox">
          <Field
            type="text"
            className="input totalCollesterol"
            name="totalCollesterol"
            helperText="totalCollesterol"
            component={AppInput}
          />
          {errors.totalCollesterol && touched.totalCollesterol ? (
            <div className="errorMessage">{errors.totalCollesterol}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
