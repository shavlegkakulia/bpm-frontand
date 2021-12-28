import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../../../components/IU/CheckBox";
import { gql, useQuery } from "@apollo/client";
import AuthService from "./../../../services/authService";
import DrawError from "../../../components/DrawError";

enum dropTypes {
  t1 = "t1",
  t2 = "t2",
  t3 = "t3",
}

interface IHilnessResponseData {
  data: IDictDataItems;
  succes: boolean;
  errorMessage: Array<string>;
  code: number;
}

interface IHilnessResponse {
  getGabitsAndHilnsess: IHilnessResponseData;
}

interface IDictDataItems {
  hilness: IDict[];
  human_habits: IDict[];
}

export interface IDict {
  id: number;
  translation_dict_id: number;
  locale_id: number;
  name: string;
  description: string;
}

interface IProps {
  onSetActiveHilness: React.Dispatch<React.SetStateAction<IDict[]>>;
  onSetActiveHuman_habits: React.Dispatch<React.SetStateAction<IDict[]>>;
  activeHilnsee: IDict[];
  activeHuman_habits: IDict[];
}

const HabitsAndComplains: React.FC<IProps> = (props) => {
  const toggleHilness = (h: IDict, remove?: boolean) => {
    const index = props.activeHilnsee.findIndex(
      (data) => data.translation_dict_id === h.translation_dict_id
    );
    if (index < 0 && !remove) {
      props.onSetActiveHilness((before) => [...before, h]);
    } else {
      const after = props.activeHilnsee.filter(
        (data) => data.translation_dict_id !== h.translation_dict_id
      );
      props.onSetActiveHilness([...after]);
    }
  };

  const toggleHabits = (h: IDict, remove?: boolean) => {
    const index = props.activeHuman_habits.findIndex(
      (data) => data.translation_dict_id === h.translation_dict_id
    );
    if (index < 0 && !remove) {
      props.onSetActiveHuman_habits((before) => [...before, h]);
    } else {
      const after = props.activeHuman_habits.filter(
        (data) => data.translation_dict_id !== h.translation_dict_id
      );
      props.onSetActiveHuman_habits([...after]);
    }
  };

  const GET_PATIENT_DATA_QUERY = gql`
    query {
      getGabitsAndHilnsess {
        data {
          hilness {
            name
            description
            translation_dict_id
          }
          human_habits {
            name
            description
            translation_dict_id
          }
        }
        succes
        errorMessage
        code
      }
    }
  `;

  const patientResponse = useQuery<IHilnessResponse>(GET_PATIENT_DATA_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${AuthService.GetToken()}`,
      },
    },
  });

  const GET_GENDER_DATA_QUERY = gql`
    query {
      getDictionary {
        data {
          hilness {
            name
            description
            translation_dict_id
          }
          human_habits {
            name
            description
            translation_dict_id
          }
        }

        succes
        errorMessage
        code
      }
    }
  `;

  // const genderResponse = useQuery<IHilnessResponse>(GET_GENDER_DATA_QUERY, {
  //   context: {
  //     headers: {
  //       authorization: `Bearer ${AuthService.GetToken()}`,
  //     },
  //   },
  // });

  return (
    <div className="generalInformation">
      <DrawError
        message={patientResponse?.data?.getGabitsAndHilnsess.errorMessage}
      />
      <div className="generalsTitle">Habits and Complains</div>
      <div className="habits">
        <div className="checkboxes">
          {!patientResponse.loading &&
            patientResponse.data?.getGabitsAndHilnsess.data.human_habits.map(
              (habits) => (
                <div
                  className="check-box"
                  key={`hab-${habits.translation_dict_id}`}
                >
                  <CheckBox
                    field={null}
                    type="checkbox"
                    name="CoffeinTaken"
                    className="checkbox"
                    helpertext={habits.name}
                    checked={
                      props.activeHuman_habits.findIndex(
                        (h) =>
                          h.translation_dict_id ===
                          habits.translation_dict_id
                      ) >= 0
                    }
                    onChange={() => {
                      toggleHabits(habits);
                    }}
                  />
                </div>
              )
            )}
        </div>
        <div className="dropdowns">
          {/* <Dropdown align={"end"} className={`habitsSwitch ${dropTypes.t1}`}>
            <Dropdown.Toggle className="dropdownCover">
              <div className="habitsDropdown">
                Medical Hystory{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="faChevronDown"
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item className="dropdownMenuItem">1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Dropdown align={"end"} className={`habitsSwitch ${dropTypes.t2}`}>
            <Dropdown.Toggle className="dropdownCover">
              <div className="habitsDropdown">
                Present Illness{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="faChevronDown"
                />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownMenu">
              {!patientResponse.loading &&
                patientResponse.data?.getGabitsAndHilnsess.data.hilness.map(
                  (hillnes) => (
                    <Dropdown.Item
                      key={`dropdown-${hillnes.translation_dict_id}`}
                      className="dropdownMenuItem"
                    >
                      <div
                        className="check-box"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CheckBox
                          field={null}
                          type="checkbox"
                          name="DrinkingHabits"
                          className="checkbox"
                          helpertext={hillnes.name}
                          checked={
                            props.activeHilnsee.findIndex(
                              (h) =>
                                h.translation_dict_id ===
                                hillnes.translation_dict_id
                            ) >= 0
                          }
                          onChange={() => {
                            toggleHilness(hillnes);
                          }}
                        />
                      </div>
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown align={"end"} className={`habitsSwitch ${dropTypes.t3}`}>
            <Dropdown.Toggle className="dropdownCover">
              <div className="habitsDropdown">
                Prescription Drugs{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="faChevronDown"
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item className="dropdownMenuItem">1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
        <div className="complains">
          <div className="boolets">
            {/* <div className="booletColumn">
              <div className={`boolet ${dropTypes.t1}`}>
                <span className="title">Stroke</span>
                <div className="close">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            </div> */}
            <div className="booletColumn">
              {props.activeHilnsee &&
                props.activeHilnsee.map((h) => (
                  <div
                    key={`item-${h.translation_dict_id}`}
                    className={`boolet ${dropTypes.t2}`}
                  >
                    <span className="title">{h.name}</span>
                    <div
                      className="close"
                      onClick={() => toggleHilness(h, true)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                  </div>
                ))}
            </div>
            {/* <div className="booletColumn">
              <div className={`boolet ${dropTypes.t3}`}>
                <span className="title">Stroke</span>
                <div className="close">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <div className={`boolet ${dropTypes.t3}`}>
                <span className="title">Stroke</span>
                <div className="close">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <div className={`boolet ${dropTypes.t3}`}>
                <span className="title">Stroke</span>
                <div className="close">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsAndComplains;
