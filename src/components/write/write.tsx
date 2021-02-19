import {useHistory} from "react-router";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import s from "./write.module.css";
import React from "react";
import {useMutation, useReactiveVar} from "@apollo/client";
import {
    CREATE_ARTICLE,
    CreateArticleResponseType,
} from "../../apollo/queries/article";
import {ArticleType} from "../../apollo/apollo-types";
import {userVar} from "../navigation/navigtaion";
import Error from "../error/error";


const validationSchema = Yup.object({
    header: Yup.string().required(),
    text: Yup.string().required().min(5)
})

const initialValues = {
    header: '',
    text: ''
}

type valuesType = typeof initialValues

function Write() {
    const history = useHistory()
    const [createArticle] = useMutation<CreateArticleResponseType>(CREATE_ARTICLE)
    const user = useReactiveVar(userVar)


    async function handleSubmit(values: valuesType, ev: FormikHelpers<valuesType>) {
        if (user) {
            await createArticle({
                    variables: values,
                    update(cache, {data}) {
                        if (!data) {
                            ev.setErrors({header: 'Something went wrong'})
                            return
                        }
                        cache.modify({
                            fields: {
                                getArticles({articles}: { articles: Array<ArticleType> }): Array<ArticleType> {
                                    return [data.createArticle, ...articles]
                                }
                            }
                        })
                    }
                }
            )
            history.push('/menu')
        } else {
            ev.setErrors({header: "You are not authenticated"})
        }

    }

    return (
        <Formik validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}>
            <Form className={s.form}>
                <h1>New Article</h1>
                <label htmlFor='header'>Article header</label>
                <Field name="header"/>
                <ErrorMessage name='header'>{msg => <span>{msg}</span>}</ErrorMessage>
                <label>Article content</label>
                <Field name='text' as='textarea'/>
                <ErrorMessage name='text'>{msg => <span>{msg}</span>}</ErrorMessage>
                <button disabled={false}>Save</button>
            </Form>
        </Formik>)
}

export default Write