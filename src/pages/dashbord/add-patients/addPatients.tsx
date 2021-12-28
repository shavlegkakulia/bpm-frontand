import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./addPatients.scss";
import { useHistory } from "react-router";
import AppInput from "../../../components/IU/AppInput";
import GeneralInformation from "./generalInformation";
import HabitsAndComplains, { IDict } from "./habitsAndComplains";
import TimeSeriesData from "./timeSeriseData";
import AppButton from "../../../components/IU/AppButton";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import AuthService from "./../../../services/authService";
import DrawError from "../../../components/DrawError";

export interface IPatientForms {
  name: string;
  weight: string;
  age: string;
  gender: string;
  height: string;
  bodyTemprature: string;
  totalCollesterol: string;
  systolic: string;
  diastolic: string;
  pulse: string;
  oxygenSaturation: string;
  timeSeriesDate: Date;
  activity: number;
  weakness: boolean;
  headacke: boolean;
  bpAbnormality: boolean;
  irregullarHeartbit: boolean;
}

const PatientSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  weight: Yup.number().required("required!"),
  age: Yup.number().required("required!"),
  gender: Yup.string().required("required!"),
  height: Yup.number().required("required!"),
  bodyTemprature: Yup.number().required("required!"),
  totalCollesterol: Yup.number().required("required!"),
  systolic: Yup.number().required("required!"),
  diastolic: Yup.number().required("required!"),
  pulse: Yup.number().required("required!"),
  oxygenSaturation: Yup.number().required("required!"),
});

const AddPatients: React.FC = () => {
  const [name, setName] = useState<string>();
  const [weight, setWeight] = useState<number | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const [bodyTemprature, setBodyTemperature] = useState<number | undefined>();
  const [totalCollesterol, setTotalCollesterol] = useState<
    number | undefined
  >();
  const [systolic, setSystolic] = useState<number | undefined>();
  const [diastolic, setDiastolic] = useState<number | undefined>();
  const [pulse, setPulse] = useState<number | undefined>();
  const [oxygenSaturation, setOxygenSaturation] = useState<
    number | undefined
  >();
  const [timeSeriesDate, setTimeSeriesDate] = useState<Date>(new Date());
  const [activity, setActivity] = useState<number>(1);
  const [weakness, setWeakness] = useState<boolean>();
  const [headacke, setHeadacke] = useState<boolean>();
  const [bpAbnormality, setBpAbnormality] = useState<boolean>();
  const [irregullarHeartbit, setIrregullarHeartbit] = useState<boolean>();
  const [activeHilnsee, setActiveHilness] = useState<Array<IDict>>([]);
  const [activeHuman_habits, setActiveHuman_habits] = useState<Array<IDict>>(
    []
  );
  const nav = useHistory();

  const habits = [
    ...activeHilnsee.map((data) => data.translation_dict_id),
    ...activeHuman_habits.map((data) => data.translation_dict_id),
  ];

  const CREATE_PATIENT_QUERY = gql`
  mutation {
    addPatient(
      patientInput: {
      name: "${name}",
      age: ${age},
      weight: ${weight},
      gender: ${gender || 1},
      height: ${height},
      bodyTemprature: ${bodyTemprature},
      totalCollesterol: ${totalCollesterol},
      timeSeries: {
        timeSeriesDate: "${timeSeriesDate.toDateString()}",
        activity: ${activity},
        weakness: ${weakness},
        headacke: ${headacke},
        bpAbnormality: ${bpAbnormality},
        irregullarHeartbit: ${irregullarHeartbit},
        systolic: ${systolic},
        diastolic: ${diastolic},
        pulse: ${pulse},
        oxygenSaturation: ${oxygenSaturation},
      },
      habits: "${habits.join("|")}",
      }
    ) {
      data {
        id
      }
      succes
      errorMessage
      code
    }
  }
`;

  const [mutateFunction, { data, loading, error }] = useMutation(
    CREATE_PATIENT_QUERY,
    {
      context: {
        headers: {
          authorization: `Bearer ${AuthService.GetToken()}`,
        },
      },
    }
  );

  return (
    <div className="addPatients">
      <DrawError message={data?.addPatient?.errorMessage} />
      <Formik
        initialValues={{
          name: "ffewrewrew",
          weight: "1",
          age: "1",
          gender: "1",
          height: "1",
          bodyTemprature: "1",
          totalCollesterol: "1",
          systolic: "1",
          diastolic: "1",
          pulse: "1",
          oxygenSaturation: "1",
          weakness: false,
          headacke: false,
          bpAbnormality: false,
          irregullarHeartbit: false,
          timeSeriesDate: new Date(),
          activity: 1,
        }}
        validationSchema={PatientSchema}
        onSubmit={(values) => {
          console.log(values);
          setName(values.name);
          setWeight(parseFloat(values.weight));
          setAge(parseFloat(values.age));
          setGender(parseFloat(values.gender));
          setHeight(parseFloat(values.height));
          setBodyTemperature(parseFloat(values.bodyTemprature));
          setTotalCollesterol(parseFloat(values.totalCollesterol));
          setSystolic(parseFloat(values.systolic));
          setDiastolic(parseFloat(values.diastolic));
          setPulse(parseFloat(values.pulse));
          setOxygenSaturation(parseFloat(values.oxygenSaturation));
          setWeakness(values.weakness);
          setHeadacke(values.headacke);
          setBpAbnormality(values.bpAbnormality);
          setIrregullarHeartbit(values.irregullarHeartbit);
          setTimeSeriesDate(values.timeSeriesDate);

          mutateFunction().then((Response) => {
            if (Response?.data?.addPatient?.succes) {
              nav.push(
                `/Patients/View/${Response?.data?.addPatient?.data?.id}`
              );
            }
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="patientNameBlock">
              <div className="header-bar">
                <div className="blockTitle">Add New Patient</div>
                <div className="goBack" onClick={() => nav.goBack()}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="faChevronLeft"
                  />{" "}
                  Back
                </div>
              </div>

              <div className="inputBox">
                <Field
                  type="text"
                  className="input name"
                  name="name"
                  helperText="Name / Surname / or Unic Number…"
                  component={AppInput}
                />
                {errors.name && touched.name ? (
                  <div className="errorMessage">{errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="generalsBlock">
              <GeneralInformation {...{ errors, touched }} />
            </div>
            <div className="generalsBlock">
              <HabitsAndComplains
                activeHilnsee={activeHilnsee}
                activeHuman_habits={activeHuman_habits}
                onSetActiveHilness={setActiveHilness}
                onSetActiveHuman_habits={setActiveHuman_habits}
              />
            </div>
            <div className="generalsBlock">
              <TimeSeriesData
                {...{ errors, touched }}
                onSetTimeSeriesDate={setTimeSeriesDate}
                onSetActivity={setActivity}
                activity={activity}
                timeSeriesDate={timeSeriesDate}
              />
            </div>
            <div className="buttonContainer">
              <AppButton
                title={"Save & View Prediction"}
                type="submit"
                isLoading={loading}
                className="submitButton button save"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPatients;
