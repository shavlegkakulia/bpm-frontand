import React, {
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import Translate from "../../../services/translateService";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  useFormikContext,
  Formik,
} from "formik";
import AppInput from "../../../components/IU/AppInput";
import { gql, useMutation } from "@apollo/client";
import AppButton from "../../../components/IU/AppButton";
import * as Yup from "yup";
import DrawError from "../../../components/DrawError";
import { Link } from "react-router-dom";
import CheckBox from "../../../components/IU/CheckBox";

const SignupSchema = Yup.object().shape({
  company: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  repeatPassword: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

export const SignUp = (props) => {
  const [emal, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [company, setCompany] = useState<string | undefined>();
  const CREATE_USER_QUERY = gql`
  mutation {
    signup(
      userInput: {
      email: "${emal}"
      password: "${password}",
      company: "${company}",
      }
    ) {
      data {
        id
        email
      }
      succes
      errorMessage
      code
    }
  }
`;

  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_USER_QUERY);

  useEffect(() => {
    if (data?.signup?.succes) {
      props.history.push("/signin");
    }
  }, [data]);
  console.log(loading, data);
  return (
    <div className="loginForm">
      <DrawError message={data?.signup?.errorMessage} />
      <h1 className="loginTitle">{Translate.T("signing.signup")}</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
          company: "",
          acceptTerms: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setEmail(values.email);
          setPassword(values.password);
          setCompany(values.company);
          // same shape as initial values
          mutateFunction();
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="inputBox">
              <Field
                name="email"
                type="email"
                className="input"
                helperText={Translate.T("signing.email")}
                component={AppInput}
              />
              {errors.email && touched.email ? (
                <div className="errorMessage">{errors.email}</div>
              ) : null}
            </div>
            <div className="inputBox">
              <Field
                name="password"
                type="password"
                className="input"
                helperText={Translate.T("signing.password")}
                component={AppInput}
              />
              {errors.password && touched.password ? (
                <div className="errorMessage">{errors.password}</div>
              ) : null}
            </div>
            <div className="inputBox">
              <Field
                name="repeatPassword"
                type="password"
                className="input"
                helperText={Translate.T("signing.repeatPassword")}
                component={AppInput}
              />
              {errors.repeatPassword && touched.repeatPassword ? (
                <div className="errorMessage">{errors.repeatPassword}</div>
              ) : null}
            </div>
            <div className="inputBox last">
              <Field
                name="company"
                type="text"
                className="input"
                helperText={Translate.T("signing.myCompany")}
                component={AppInput}
              />
              {errors.company && touched.company ? (
                <div className="errorMessage">{errors.company}</div>
              ) : null}
            </div>

            <div className="check-box">
              <Field
                type="checkbox"
                name="acceptTerms"
                className="checkbox"
                helpertext='Agree Terms & Conditions'
                component={CheckBox}
              />
                {errors.acceptTerms && touched.acceptTerms ? (
                <div className="errorMessage">{errors.acceptTerms}</div>
              ) : null}
            </div>

            <AppButton
              title={Translate.T("signing.signup")}
              className="submitButton button"
              isLoading={loading}
              type='submit'
              onClick={() => {}}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
