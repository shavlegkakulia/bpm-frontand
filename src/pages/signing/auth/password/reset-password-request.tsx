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
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ResetPasswordRequest = (props) => {
  const [emal, setEmail] = useState<string | undefined>();

  const RESET_PASSWORD_QUERY = gql`
    mutation {
      resetPasswordRequest(
        email: "${emal}"
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
    if (data?.resetPasswordRequest?.succes) {
      props.history.push("/signin");
    }
  }, [data]);

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
          resetPassword();
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="inputBox last">
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

export default ResetPasswordRequest;
