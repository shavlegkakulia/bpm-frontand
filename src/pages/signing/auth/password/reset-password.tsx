import React, { useEffect, useState } from "react";
import Translate from "../../../../services/translateService";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  useFormikContext,
  Formik,
} from "formik";
import AppInput from "../../../../components/IU/AppInput";
import {
  gql,
  QueryResult,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { apolloClient } from "../../../../App";
import AppButton from "../../../../components/IU/AppButton";
import DrawError from "../../../../components/DrawError";
import * as Yup from "yup";
import authService from "../../../../services/authService";

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  repeatPassword: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ResetPassword = (props) => {
  const [emal, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [repeatPassword, setRepeatPassword] = useState<string | undefined>();

  const RESET_PASSWORD_QUERY = gql`
    mutation {
      resetPassword(
        email: "${emal}"
        password: "${password}",
        repeatPassword: "${repeatPassword}",
        token: "${props?.match?.params?.resetToken}"
      ) {
        succes
        errorMessage
        code
      }
    }
  `;
  const [resetPassword, { data, loading, error }] =
  useMutation(RESET_PASSWORD_QUERY);

  useEffect(() => {
    if (data?.resetPassword?.succes) {
      props.history.push("/signin");
    }
  }, [data]);

  useEffect(() => {
    if(!props?.match?.params?.resetToken) {
      props.history.push("/signin");
    }
  }, []);

  return (
    <div className="loginForm">
      <DrawError message={data?.resetPassword?.errorMessage} />
      <h1 className="loginTitle">{Translate.T("signing.resetPassword")}</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={ResetSchema}
        onSubmit={(values) => {
          setEmail(values.email);
          setPassword(values.password);
          setRepeatPassword(values.repeatPassword);
          resetPassword();
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
            <div className="inputBox last">
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
   
            <AppButton
              title={Translate.T("signing.reset")}
              className="submitButton button"
              isLoading={loading}
              onClick={() => {}}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
