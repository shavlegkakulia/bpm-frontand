import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import SimpleBar from "simplebar-react";
import AppButton from "../../../components/IU/AppButton";
import { gql, useMutation } from "@apollo/client";
import AuthService from "./../../../services/authService";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TimeSeriesData from "./timeSeriseData";
import { GET_PATIENT_QUERY } from "./viewPatient";
import { useParams } from "react-router";

interface IProps {
  timeseries_data: Itimeseries_data[];
}

const PatientSchema = Yup.object().shape({
  systolic: Yup.number().required("required!"),
  diastolic: Yup.number().required("required!"),
  pulse: Yup.number().required("required!"),
  oxygenSaturation: Yup.number().required("required!"),
});

interface Itimeseries_data {
  systolic: string;
  diastolic: string;
  pulse: string;
  oxygenSaturation: string;
  data_time: string;
  activity: number;
  weakness: boolean;
  headacke: boolean;
  bpAbnormality: boolean;
  irregullarHeartbit: boolean;
  id: number;
}

interface IParams {
  patientId: string;
}

const ViewTimeSeries: React.FC<IProps> = (props) => {
  const params = useParams<IParams>();
  const [curTseries, setCurSeries] = useState<number>();
  const [show, setShow] = useState(false);
  const [activity, setActivity] = useState<number>(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [timeSeriesDate, setTimeSeriesDate] = useState<Date>(new Date());

  const DELETE_QUERY = gql`
  mutation {
    deletePatientTimeseries(
     t_id: ${curTseries}
    ) {
      succes
      errorMessage
      code
    }
  }
`;

  const [getPatient, {  }] = useMutation(DELETE_QUERY, {
    refetchQueries: [GET_PATIENT_QUERY],
    context: {
      headers: {
        authorization: `Bearer ${AuthService.GetToken()}`,
      },
    },
  });

  const ADD_TIMESERIES_QUERY = gql`
  mutation AddTimeSeries($timeSeriesDate: String!, $activity: Int!, $weakness: Boolean!, $headacke: Boolean!, $bpAbnormality: Boolean!, $irregullarHeartbit: Boolean!, $systolic: Float!, $diastolic: Float!, $pulse: Float!, $oxygenSaturation: Float!, $patient_id: Int){
    addTimeSeries(
      timeseriesInput: {
        timeSeriesDate: $timeSeriesDate,
        activity: $activity,
        weakness: $weakness,
        headacke: $headacke,
        bpAbnormality: $bpAbnormality,
        irregullarHeartbit: $irregullarHeartbit,
        systolic: $systolic,
        diastolic: $diastolic,
        pulse: $pulse,
        oxygenSaturation: $oxygenSaturation,
        patient_id: $patient_id
      }
    ) {
      succes
      errorMessage
      code
    }
  }
`;

  const [addTimeseries, { data, loading, error }] = useMutation(
    ADD_TIMESERIES_QUERY,
    {
      refetchQueries: [GET_PATIENT_QUERY],
      context: {
        headers: {
          authorization: `Bearer ${AuthService.GetToken()}`,
        },
      },
    }
  );

  const deleteT = (id: number) => {
    setCurSeries(id);
    setTimeout(() => {
      getPatient();
    }, 500);
  };

  return (
    <div className="generalInformation">
      <div className="generalsTitle view">
        Time Series Data
        <div className="butContainer">
          <AppButton
            title={"Prediction"}
            className="submitButton secondary button istory"
          />
          <AppButton
            title={"Add Time Series Data"}
            className="submitButton button addistory"
            onClick={handleShow}
          />
        </div>
      </div>
      <div className="gridContainer">
        <div className="patientName">
          <span className="key">Name</span>
          <span className="value">Lorem Ipsum</span>
        </div>
        <SimpleBar className="patientScrollbar">
          <div className="wall">
            {props?.timeseries_data?.map((td) => (
              <div className="patientItem" key={td.id}>
                <div className="itemGroup">
                  <div className="item-first">
                    <div className="title-desc">
                      <div className="title">Date</div>
                      <div className="desc">
                        {new Date(parseInt(td.data_time) * 1000).getDay() +
                          "/" +
                          new Date(parseInt(td.data_time) * 1000).getMonth()}
                      </div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Activity</div>
                      <div className="desc">{td.activity}</div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Headacke</div>
                      <div className="desc">{td.headacke ? "Yes" : "No"}</div>
                    </div>
                  </div>
                  <div className="item-second">
                    <div className="title-desc">
                      <div className="title">Weakness</div>
                      <div className="desc">{td.weakness ? "Yes" : "No"}</div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Diastolic</div>
                      <div className="desc">{td.diastolic}</div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Pulse</div>
                      <div className="desc">{td.pulse}</div>
                    </div>
                  </div>
                </div>
                <div className="item-theerd">
                  <div className="view" onClick={deleteT.bind(this, td.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span className="name">Delete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Time Series Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              systolic: 1,
              diastolic: 1,
              pulse: 1,
              oxygenSaturation: 1,
              weakness: false,
              headacke: false,
              bpAbnormality: false,
              irregullarHeartbit: false,
              timeSeriesDate: new Date(),
              activity: 1,
            }}
            validationSchema={PatientSchema}
            onSubmit={(values) => {
              addTimeseries({
                variables: {
                  activity: activity,
                  bpAbnormality: values.bpAbnormality,
                  diastolic: parseFloat(values.diastolic.toString()),
                  headacke: values.headacke,
                  irregullarHeartbit: values.irregullarHeartbit,
                  oxygenSaturation: parseFloat(values.oxygenSaturation.toString()),
                  pulse: parseFloat(values.pulse.toString()),
                  systolic: parseFloat(values.systolic.toString()),
                  timeSeriesDate: timeSeriesDate.toLocaleDateString(),
                  weakness: values.weakness,
                  patient_id: parseInt(params.patientId)
                }
              }).then(() => handleClose());
            }}
          >
            {({ errors, touched }) => (
              <Form className="form addPatients">
                <div className="generalsBlock">
                  <TimeSeriesData
                    {...{ errors, touched }}
                    onSetTimeSeriesDate={setTimeSeriesDate}
                    onSetActivity={setActivity}
                    activity={activity}
                    timeSeriesDate={timeSeriesDate}
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

export default ViewTimeSeries;
