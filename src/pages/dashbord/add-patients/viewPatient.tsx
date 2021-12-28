import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./addPatients.scss";
import { useHistory, useParams } from "react-router";
import AppInput from "../../../components/IU/AppInput";
import GeneralInformation from "./generalInformation";
import HabitsAndComplains from "./habitsAndComplains";
import TimeSeriesData from "./timeSeriseData";
import AppButton from "../../../components/IU/AppButton";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import AuthService from "../../../services/authService";
import DrawError from "../../../components/DrawError";
import ViewGeneralInfo from "./viewGeneralInfo";
import ViewTimeSeries from "./viewTimeSeries";

interface IParams {
  patientId: string;
}

enum dictionaryDataTypes {
  illness = "illness",
  human_habits = "human_habits",
}
export const GET_PATIENT_QUERY = gql`
query GetPatient($patient_id: Int!) {
  getPatient(patient_id: $patient_id) {
    data {
      id
      name
      age
      gender
      height
      weight
      user_id
      patient_data {
        id
        dict_id
        dictionary {
          key
          translation {
            name
          }
        }
      }
      timeseries_data {
        id
        data_time
        systolic
        diastolic
        pulse
        oxygen_saturation
        temperature
        irregular_heart_beat
        activity
        weakness
        headacke
        bpAbnormality
        irregullarHeartbit
      }
    }
  }
}
`;
const ViewPatient: React.FC = () => {
  const nav = useHistory();
  const params = useParams<IParams>();
  const [patientData, setPatientData] = useState<any>();



  const [getter, { loading, error, data }] = useLazyQuery(GET_PATIENT_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${AuthService.GetToken()}`,
      },
    },
  });

  useEffect(() => {
    if (params.patientId)
      getter({
        variables: {
          patient_id: parseInt(params.patientId),
        },
      }).then((res) => {
        if (res.data.getPatient.data) {
          const pd = res.data.getPatient.data.patient_data;
          const hilness = pd.filter((data) =>
            data.dictionary.key.startsWith(dictionaryDataTypes.illness)
          );

          const human_habits = pd.filter((data) =>
            data.dictionary.key.startsWith(dictionaryDataTypes.human_habits)
          );
          setPatientData({ hilness, human_habits });
        }
      });
  }, [params.patientId]);

  useEffect(() => {
    if (data?.getPatient?.data.patient_data) {
      const pd = data.getPatient.data.patient_data;
      const hilness = pd.filter((data) =>
        data.dictionary.key.startsWith(dictionaryDataTypes.illness)
      );

      const human_habits = pd.filter((data) =>
        data.dictionary.key.startsWith(dictionaryDataTypes.human_habits)
      );
      setPatientData({ hilness, human_habits });
    }
  }, [loading, data?.getPatient?.data.patient_data]);
console.log('data?.getPatient?.data', data?.getPatient?.data)
  return (
    <div className="addPatients">
      <DrawError message={data?.getPatient?.errorMessage} />
      <div className="patientNameBlock">
        <div className="header-bar">
          <div className="blockTitle">View Patient Data</div>
          <div className="goBack" onClick={() => nav.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} className="faChevronLeft" />{" "}
            Back
          </div>
        </div>

        <div className="viewName">
          {data?.getPatient?.data.name}
          {/* <div className="butContainer">
            <AppButton
              title={"View History"}
              className="submitButton secondary button istory"
              isDisabled={true}
            />
            <AppButton
              title={"Add History"}
              className="submitButton button addistory"
              isDisabled={true}
            />
          </div> */}
        </div>
      </div>
      <div className="generalsBlock">
        <ViewGeneralInfo
          patientData={patientData}
          info={data?.getPatient.data}
        />
      </div>
      <div className="generalsBlock">
        <ViewTimeSeries
          timeseries_data={data?.getPatient?.data.timeseries_data}
        />
      </div>
    </div>
  );
};

export default ViewPatient;
