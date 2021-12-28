import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../../../components/IU/CheckBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppInput from "../../../components/IU/AppInput";
import { Field, FormikErrors, FormikTouched, useFormikContext } from "formik";
import { IPatientForms } from "./addPatients";

interface IProps {
  errors: FormikErrors<IPatientForms>;
  touched: FormikTouched<IPatientForms>;
  onSetTimeSeriesDate: React.Dispatch<React.SetStateAction<Date>>;
  onSetActivity: React.Dispatch<React.SetStateAction<number>>;
  timeSeriesDate: Date;
  activity: number;
}

const TimeSeriesData: React.FC<IProps> = ({ errors, touched, onSetTimeSeriesDate, onSetActivity, timeSeriesDate, activity }) => {
  const step = 1;
  const minActivity = 1;
  const maxActivity = 10;
  const formik = useFormikContext<IPatientForms>();

  return (
    <div className="generalInformation">
      <div className="generalsTitle">Time Series Data</div>
      <div className="timeSeries">
        <div className="calendar">
          <span className="title">Date Tame</span>

          <div className="seriesDate">
            <DatePicker
              selected={timeSeriesDate}
              onChange={(date) => {
                if (!Array.isArray(date)) {
                  onSetTimeSeriesDate(date);
                }
              }}
            />
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          </div>
        </div>
        <div className="activityBox">
          <span className="title">
            Activity {minActivity}/{maxActivity}
          </span>
          <div className="slidecontainer">
            <div id="tickmarks">
              {Array.from(Array(10).keys()).map((step) => (
                <p
                  key={step}
                  className={`${
                    (step + 1) === activity && "active"
                  }`}
                >
                  {step + 1}
                </p>
              ))}
            </div>
            <input
              type="range"
              min={minActivity}
              max={maxActivity}
              value={activity}
              step={step}
              onChange={(e) => onSetActivity(parseInt(e.target.value))}
              className="slider"
              id="myRange"
              list="tickmarks"
            />
          </div>
        </div>
        <div className="checkboxes">
          <div className="check-box">
            <CheckBox
              field={null}
              type="checkbox"
              name="weakness"
              className="checkbox"
              helpertext="Weakness"
              checked={touched.weakness}
              onChange={(e) => {formik.setFieldValue('weakness', e.target.checked)}}
            />
          </div>
          <div className="check-box">
            <CheckBox
              field={null}
              type="checkbox"
              name="headacke"
              className="checkbox"
              helpertext="Headacke"
              onChange={(e) => {formik.setFieldValue('headacke', e.target.checked)}}
            />
          </div>
          <div className="check-box">
            <CheckBox
              field={null}
              type="checkbox"
              name="bpAbnormality"
              className="checkbox"
              helpertext="BP Abnormality"
              onChange={(e) => {formik.setFieldValue('bpAbnormality', e.target.checked)}}
            />
          </div>
          <div className="check-box">
            <CheckBox
              field={null}
              type="checkbox"
              name="irregullarHeartbit"
              className="checkbox"
              helpertext="Irregullar Heartbit"
              onChange={(e) => {formik.setFieldValue('irregullarHeartbit', e.target.checked)}}
            />
          </div>
        </div>
        <div className="form">
          <div className="inputBox">
            <Field
              type="text"
              className="input systolic"
              name="systolic"
              helperText="Systolic"
              component={AppInput}
            />
            {errors.systolic && touched.systolic ? (
              <div className="errorMessage">{errors.systolic}</div>
            ) : null}
          </div>
          <div className="inputBox">
            <Field
              type="text"
              className="input diastolic"
              name="diastolic"
              helperText="Diastolic"
              component={AppInput}
            />
            {errors.diastolic && touched.diastolic ? (
              <div className="errorMessage">{errors.diastolic}</div>
            ) : null}
          </div>
          <div className="inputBox">
            <Field
              type="text"
              className="input pulse"
              name="pulse"
              helperText="Pulse"
              component={AppInput}
            />
            {errors.pulse && touched.pulse ? (
              <div className="errorMessage">{errors.pulse}</div>
            ) : null}
          </div>
          <div className="inputBox">
            <Field
              type="text"
              className="input oxygenSaturation"
              name="oxygenSaturation"
              helperText="Oxygen Saturation"
              component={AppInput}
            />
            {errors.oxygenSaturation && touched.oxygenSaturation ? (
              <div className="errorMessage">{errors.oxygenSaturation}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesData;
