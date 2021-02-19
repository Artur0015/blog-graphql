import {useHistory} from "react-router-dom";
import React from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import s from "./login.module.css";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";
import {UserLoginCredentialsType} from "../../apollo/apollo-types";
import { LOGIN_USER, LoginUserResponseType} from "../../apollo/queries/auth";
import {userVar} from "../navigation/navigtaion";


let initialValues = {
    username: '',
    password: '',
    rememberMe: false
}

let validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})


function Login() {
    const history = useHistory()
    const [loginUser] = useMutation<LoginUserResponseType>(LOGIN_USER)

    async function handleSubmit(values: UserLoginCredentialsType, ev: FormikHelpers<UserLoginCredentialsType>) {
        try {
            const {data} = await loginUser({
                variables: values
            })
            userVar(data?.loginUser || null)
            history.push('/menu')
        } catch
            (e) {
            ev.setErrors({password: "Invalid credentials"})
        }
    }


    return <div className={s.div}>
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
            {(formik) => (<Form className={s.form}>
                <h1>Log in</h1>
                <Field placeholder='Username' className={s.input} name='username'/>
                <ErrorMessage name='username'>{msg => <span>{msg}</span>}</ErrorMessage>
                <Field placeholder='Password' className={s.input} name='password' type='password'/>
                <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                <Field type='checkbox' className={s.checkbox} name='rememberMe'/>
                <label>Remember me</label>
                <button type='submit' disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Log in
                </button>
            </Form>)
            }
        </Formik>
    </div>
}


export default Login