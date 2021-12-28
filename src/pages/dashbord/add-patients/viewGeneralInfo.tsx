import React, { useEffect, useState } from "react";
import AppInput from "../../../components/IU/AppInput";
import { Dropdown, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Field, Form, Formik, FormikErrors, FormikTouched, useFormikContext } from "formik";
import { IPatientForms } from "./addPatients";
import AppButton from "../../../components/IU/AppButton";
import * as Yup from "yup";
import { useParams } from "react-router";
import GeneralInformation from "./generalInformation";
import HabitsAndComplains, { IDict } from "./habitsAndComplains";
import { gql, useMutation } from "@apollo/client";
import AuthService from './../../../services/authService';
import { GET_PATIENT_QUERY } from "./viewPatient";

interface IProps {
  patientData: any;
  info: any;
}

const PatientSchema = Yup.object().shape({
  weight: Yup.number().required("required!"),
  age: Yup.number().required("required!"),
  gender: Yup.string().required("required!"),
  height: Yup.number().required("required!"),
  bodyTemprature: Yup.number().required("required!"),
  totalCollesterol: Yup.number().required("required!")
});

interface IParams {
  patientId: string;
}

const ViewGeneralInfo: React.FC<IProps> = (props) => {
  const params = useParams<IParams>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeHilnsee, setActiveHilness] = useState<Array<IDict>>([]);
  const [activeHuman_habits, setActiveHuman_habits] = useState<Array<IDict>>(
    []
  );

  const habits = [
    ...activeHilnsee.map((data) => data.translation_dict_id),
    ...activeHuman_habits.map((data) => data.translation_dict_id),
  ];

  const UPDATE_PATIENT_QUERY = gql`
  mutation EditPatient($patient_id: Int, $age: Int!, $weight: Float!, $gender: Int!, $height: Float!, $bodyTemprature: Float!, $totalCollesterol: Float!, $habits: String){
    editPatient(
      patientInput: {
      patient_id: $patient_id
      age: $age,
      weight: $weight,
      gender: $gender,
      height: $height,
      bodyTemprature: $bodyTemprature,
      totalCollesterol: $totalCollesterol,
      habits: $habits
      }
    ) {
      succes
      errorMessage
      code
    }
  }
`;

  const [updateFunction, { data, loading, error }] = useMutation(
    UPDATE_PATIENT_QUERY,
    {
      refetchQueries: [GET_PATIENT_QUERY],
      context: {
        headers: {
          authorization: `Bearer ${AuthService.GetToken()}`,
        },
      },
    }
  );

  useEffect(() => {
    if(show) {
     const habits: IDict[] = [];
     const hilness: IDict[] = [];
      props.patientData.human_habits.map(data => {
  
        let hd = {
          id: data.id,
          translation_dict_id: data.dict_id,
          locale_id: 2,
          name: data.dictionary.translation.name,
          description: ''
        }
        habits.push(hd);
        console.log('*****************************************', hd)
     
      })
     
      props.patientData.hilness.map(data => {
  
        let hd = {
          id: data.id,
          translation_dict_id: data.dict_id,
          locale_id: 2,
          name: data.dictionary.translation.name,
          description: ''
        }
        hilness.push(hd);
        console.log('*****************************************', hd)
     
      })
      setActiveHuman_habits(habits);
      setActiveHilness(hilness);
     // setActiveHuman_habits(...(props.patientData.human_habits || []));
    }
  }, [show])

  return (
    <div className="generalInformation view">
      <div className="generalsTitle view">
        <div className="generalsTitle">General Information</div>
        <AppButton
          title={"Edit"}
          className="submitButton button edit"
          onClick={handleShow}
        />
      </div>
      <div className="generalInfoFlexView">
        <div className="info-left">
          <div className="first">
            <div className="keyvalue">
              <div className="key">Weight</div>
              <div className="value">{props?.info?.weight}KG</div>
            </div>
            <div className="keyvalue">
              <div className="key">Height</div>
              <div className="value">{props?.info?.height}CM</div>
            </div>
            <div className="keyvalue">
              <div className="key">Body Temperature</div>
              <div className="value">{props?.info?.weight}</div>
            </div>
          </div>
          <div className="second">
            <div className="keyvalue">
              <div className="key">Age</div>
              <div className="value">{props?.info?.age}</div>
            </div>
            <div className="keyvalue">
              <div className="key">Gender</div>
              <div className="value">
                {props?.info?.gender == 1 ? "Male" : "Female"}
              </div>
            </div>
            <div className="keyvalue">
              <div className="key">Total colesterol</div>
              <div className="value">50</div>
            </div>
          </div>
        </div>
        <div className="line-breack"></div>
        <div className="info-right">
          {props?.patientData?.hilness?.length > 0 && <div className="hilness">
            {props?.patientData?.hilness?.map((h) => (
              <div className="item" key={h.id}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
                <span>{h?.dictionary.translation?.name}</span>
              </div>
            ))}
          </div>}
          {props?.patientData?.human_habits?.length > 0 &&<div className="habits">
            <span className="title">Present Hilness</span>
            <div className="bl">
              {props?.patientData?.human_habits?.map((hb) => (
                <div className="bool" key={hb.name}>
                  {hb?.dictionary.translation?.name}
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              weight: parseFloat(props?.info?.weight) || 0,
              age: parseInt(props?.info?.age) || 0,
              gender: parseInt(props?.info?.gender) || 0,
              height: parseFloat(props?.info?.height) || 0,
              bodyTemprature: parseFloat(props?.info?.bodyTemprature) || 0,
              totalCollesterol: parseFloat(props?.info?.totalCollesterol) || 0,
            }}
            validationSchema={PatientSchema}
            onSubmit={(values) => {
              console.log(values)
              updateFunction({
                variables: {
                  patient_id: parseInt(params.patientId.toString()),
                  age: values.age,
                  weight: parseFloat(values.weight.toString()),
                  gender: parseFloat(values.gender.toString()),
                  height: parseFloat(values.height.toString()),
                  bodyTemprature: parseFloat(values.bodyTemprature.toString()),
                  totalCollesterol: parseFloat(values.totalCollesterol.toString()),
                  habits: habits.join("|")
                }
              }).then(() => {
                setActiveHilness([]);
                setActiveHuman_habits([]);
                handleClose()
              });
            }}
          >
            {({ errors, touched }) => (
              <Form className="form addPatients">
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
                <AppButton
                  title={"Save"}
                  className="submitButton button addistory"
                  type="submit"
                  loading={loading}
                />
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewGeneralInfo;
