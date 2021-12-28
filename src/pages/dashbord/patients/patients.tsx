import React, { useState } from "react";
import AppButton from "../../../components/IU/AppButton";
import AppInput from "../../../components/IU/AppInput";
import SimpleBar from "simplebar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "simplebar/dist/simplebar.min.css";
import "./patients.scss";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import AuthService from "./../../../services/authService";
import DrawError from "../../../components/DrawError";

const Patients: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const nav = useHistory();

  const GET_PATIENTS_QUERY = gql`
    query {
      getPatients {
        data {
          id
          name
          age
          gender
          height
          weight
          user_id
          create_time
          patient_data {
            id
          }
          timeseries_data {
            id
          }
        }
      }
    }
  `;

  const patientsResponse = useQuery(GET_PATIENTS_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${AuthService.GetToken()}`,
      },
    },
  });
// console.log(patientsResponse.data)
//const patientsResponse: any = {}
  return (
    <div className="patients">
      {!patientsResponse.loading && <DrawError message={patientsResponse.data.getPatients.errorMessage} />}
      <div className="header-bar">
        <div className="inputBox">
          <AppInput
            type="search"
            className="input search"
            helperText="Search patients…"
            field={null}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchValue(e.currentTarget.value)
            }
            value={searchValue}
          />
        </div>
        <AppButton
          title={"Add New Patients +"}
          className="submitButton button"
          onClick={() => nav.push("/Patients/add")}
        />
      </div>

      <div className="gridTitle">Patients Grid</div>

      <div className="gridContainer">
        <SimpleBar className="patientScrollbar">
          <div className="wall">
            {!patientsResponse?.loading && patientsResponse?.data?.getPatients?.data.map((p) => (
              <div className="patientItem" key={p.name}>
                <div className="itemGroup">
                  <div className="item-first">
                    <div className="title-desc">
                      <div className="title">Name</div>
                      <div className="desc">{p.name}</div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Age</div>
                      <div className="desc">{p.age}</div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Treatment</div>
                      <div className="desc">Yes</div>
                    </div>
                  </div>
                  <div className="item-second">
                    <div className="title-desc">
                      <div className="title">Date</div>
                      <div className="desc">{new Date(p.create_time * 1000).getDate() +'/'+new Date(p.create_time * 1000).getMonth()}</div>
                    </div>
                    {/* <div className="title-desc">
                      <div className="title">Blood Preassure</div>
                      <div className="desc">120/70</div>
                    </div>
                    <div className="title-desc">
                      <div className="title">Hart Rate</div>
                      <div className="desc">85</div>
                    </div> */}
                  </div>
                </div>
                <div className="item-theerd">
                  <div
                    className="view"
                    onClick={() => nav.push(`/Patients/View/${p.id}`)}
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                    <span className="name">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default Patients;
