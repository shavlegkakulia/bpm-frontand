import React, { useEffect, useState } from "react";
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
import {
  gql,
  QueryResult,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { apolloClient } from "../../../App";
import AppButton from "../../../components/IU/AppButton";
import DrawError from "../../../components/DrawError";
import * as Yup from "yup";
import authService from "../../../services/authService";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const Login = (props) => {
  const [emal, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const VERIFY_QUERY = gql`
  mutation {
    verify(
      token: "${props?.match?.params?.token}"
    ) {
      
      succes
      errorMessage
      code
    }
  }
`;

  const [mutateFunction, response] = useMutation(VERIFY_QUERY);

  useEffect(() => {
    if (props?.match?.params?.token) {
      mutateFunction().then((r) => r);
    }
  }, [props?.match?.params?.token]);

  useEffect(() => {
    if (response.data?.verify?.succes) {
      alert("User is verified");
      props.history.push("/signin");
    }
  }, [response.data]);

  const LOGIN_USER_QUERY = gql`
    query {
      login(
        email: "${emal}"
        password: "${password}"
      ) {
        data {
          token
          refreshToken
        }
        succes
        errorMessage
        code
      }
    }
  `;

  const [LoginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER_QUERY);

  useEffect(() => {
    if (data?.login?.succes) {
      authService.SetToken(data.login.data.token, data.login.data.refreshToken);
      props.history.push("/dashboard");
    }
  }, [data]);

  return (
    <div className="loginForm">
      <DrawError
        message={
          data?.login?.errorMessage || response.data?.verify.errorMessage
        }
      />
      <h1 className="loginTitle">{Translate.T("signing.login")}</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          setEmail(values.email);
          setPassword(values.password);
          LoginUser();
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
            <div className="inputBox last">
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
            <div className="forgotPwdBox">
              <Link to="/password-reset-request" className="forgotPasword">
                {Translate.T("signing.forgotPassword")}
              </Link>
            </div>
            <AppButton
              title={Translate.T("signing.login")}
              type='submit'
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

// // Shape of form values
// interface FormValues {
//   email: string;
//   password: string;
// }

// interface OtherProps {
//   isLoading: boolean;
// }

// // Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
// const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
//   const { touched, errors, isSubmitting, isLoading } = props;
//   const { submitForm } = useFormikContext();

//   return (
//     <Form className="form">
//       <div className="inputBox">
//         <Field
//           type="email"
//           name="email"
//           className="input"
//           placeholder={Translate.T("signing.email")}
//         />
//         {touched.email && errors.email && (
//           <div className="errorMessage">{errors.email}</div>
//         )}
//       </div>

//       <div className="inputBox">
//         <Field
//           type="password"
//           name="password"
//           className="input"
//           // component={(data) =>
//           //   PasswordInput({
//           //     field: data.field,
//           //     form: data.form,
//           //     placeholder: Translate.T("signing.password"),
//           //   })
//           // }
//         />
//         {touched.password && errors.password && (
//           <div className="errorMessage">{errors.password}</div>
//         )}
//       </div>

//       <div className="forgotPwdBox">
//         <a href="#" className="forgotPasword">
//           {Translate.T("signing.forgotPassword")}
//         </a>
//       </div>

//       <AppButton
//         title={Translate.T("signing.login")}
//         isDisabled={isSubmitting}
//         className="submitButton button"
//         isLoading={isLoading}
//         onClick={submitForm}
//       />
//     </Form>
//   );
// };

// // The type of props MyForm receives
// interface MyFormProps {
//   initialEmail?: string;
// }

// // Wrap our form with the withFormik HoC
// const LoginForm = withFormik<MyFormProps, FormValues>({
//   // Transform outer props into form values
//   mapPropsToValues: (props) => {
//     return {
//       email: props.initialEmail || "kakuliash@gmail.com",
//       password: "111111",
//     };
//   },

//   // Add a custom validation function (this can be async too!)
//   validate: (values: FormValues) => {
//     let errors: FormikErrors<FormValues> = {};
//     if (!values.email) {
//       errors.email = "Required";
//     } else if (!values.email) {
//       errors.email = "Invalid email address";
//     }

//     if (!values.password) {
//       errors.password = "Required";
//     } else if (!values.password) {
//       errors.password = "Invalid email password";
//     }
//     return errors;
//   },

//   handleSubmit: (values) => {
//     const LOGIN_USER_QUERY = gql`
//     query {
//       login(
//         email: "${values.email}"
//         password: "${values.password}"
//       ) {
//         data {
//           token
//           refreshToken
//         }
//         succes
//         errorMessage
//         code
//       }
//     }
//   `;
//     apolloClient.query({ query: LOGIN_USER_QUERY }).then((response) => {
//       // extract your accessToken from your response data and return it
//       const { succes } = response.data.login;

//       if(succes) {
//         props.history.push('/signin')
//       }
//     });
//   },
// })(InnerForm);

// const Login = (props) => {
//   console.log(props?.match?.params);
//   const VERIFY_QUERY = gql`
//   mutation {
//     verify(
//       token: "${props?.match?.params?.token}"
//     ) {

//       succes
//       errorMessage
//       code
//     }
//   }
// `;

//   const [mutateFunction, { data, loading, error }] = useMutation(VERIFY_QUERY);
//   console.log(data, error);
//   useEffect(() => {
//     if (props?.match?.params) {
//       mutateFunction().then((r) => r);
//     }
//   }, [props?.match?.params]);

//   useEffect(() => {
//     if (data?.verify?.succes) {
//       alert("User is verified");
//     }
//   }, [data]);
//   return (
//     <div className="loginForm">
//       <DrawError message={data?.verify?.errorMessage} />
//       <h1 className="loginTitle">{Translate.T("signing.login")}</h1>
//       <LoginForm />
//     </div>
//   );
// };

export default Login;
