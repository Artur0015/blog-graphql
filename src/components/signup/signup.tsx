import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import s from "../login/login.module.css";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {UserRegistrationCredentialsType} from "../../apollo/apollo-types";
import {CREATE_USER} from "../../apollo/queries/auth";
import {useMutation} from "@apollo/client";


const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('You must confirm password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})


function Signup() {
    const history = useHistory()
    const [createUser] = useMutation<{createUser:{response: string}}>(CREATE_USER)


    async function handleSubmit(values: UserRegistrationCredentialsType, ev: FormikHelpers<UserRegistrationCredentialsType>) {
        const {data} = await createUser({
            variables: values
        })
        let response = data?.createUser.response
        if(response === "Username already exists.") {
            ev.setErrors({ username: response})
        }else if (response === 'OK') {
            history.push('/menu')
        }

    }

    return <>
        <div className={s.div}/>
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
            {formik => (
                <Form className={s.form}>
                    <h1>Sign up</h1>
                    <Field placeholder='Username' className={s.input} name='username'/>
                    <ErrorMessage name='username'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Password' className={s.input} name='password' type='password'/>
                    <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Repeat Password' className={s.input} name='passwordConfirmation'
                           type='password'/>
                    <ErrorMessage name='passwordConfirmation'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Sign up</button>
                </Form>
            )}
        </Formik>
    </>
}
export default Signup