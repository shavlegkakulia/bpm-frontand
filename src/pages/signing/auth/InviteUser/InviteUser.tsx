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
import { Link } from "react-router-dom";
import './InviteUser.scss';

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const InviteUser = (props) => {
  const [emal, setEmail] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  // const LOGIN_USER_QUERY = gql`
  //   query {
  //     login(
  //       email: "${emal}"
  //       password: "${password}"
  //     ) {
  //       data {
  //         token
  //         refreshToken
  //       }
  //       succes
  //       errorMessage
  //       code
  //     }
  //   }
  // `;

  // const [LoginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER_QUERY);

  // useEffect(() => {
  //   if (data?.login?.succes) {
  //     authService.SetToken(data.login.data.token, data.login.data.refreshToken);
  //     props.history.push("/dashboard");
  //   }
  // }, [data]);

  return (
    <div className="InviteUser">
      {/* <DrawError
        message={
          data?.login?.errorMessage
        }
      /> */}
     
      <Formik
        initialValues={{
          email: "",
          name: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          setName(values.name);
          setEmail(values.email);
         // LoginUser();
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
             <h1 className="loginTitle">INVITE USER</h1>
             <h2 className="description">Invite user to monitoring their health.</h2>
             <div className="inputBox">
              <Field
                name="name"
                type="text"
                className="input"
                helperText={Translate.T("signing.name")}
                component={AppInput}
              />
              {errors.name && touched.name ? (
                <div className="errorMessage">{errors.name}</div>
              ) : null}
            </div>
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
              title={'Send Invite'}
              className="submitButton button"
              isLoading={false}
              onClick={() => {}}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default InviteUser;
