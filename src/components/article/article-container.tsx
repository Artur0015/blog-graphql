import React from 'react'
import {useParams} from "react-router-dom"
import Article from "./article"
import Comments from "./comments"
import Preloader from "../preloader/preloader"
import {
    ADD_COMMENT,
    CHANGE_ARTICLE,
    ChangedArticleType,
    GET_ARTICLE_BY_ID,
    GetArticleByIdResponseType, NewCommentType,
} from "../../apollo/queries/article";
import {useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {CommentType, UserType} from "../../apollo/apollo-types";
import {userVar} from "../navigation/navigtaion";
import Error from "../error/error";


const ArticleContainer = () => {
    const articleId = Number(useParams<{ articleId: string }>().articleId)
    const {data, loading, error} = useQuery<GetArticleByIdResponseType>(GET_ARTICLE_BY_ID, {
        variables: {id: articleId}
    })
    const user = useReactiveVar<UserType | null>(userVar)
    const [changeArticle] = useMutation<ChangedArticleType>(CHANGE_ARTICLE)
    const [addComment] = useMutation<NewCommentType>(ADD_COMMENT, {
        update(cache, {data}) {
            const articleData = cache.readQuery<GetArticleByIdResponseType>({
                query: GET_ARTICLE_BY_ID,
                variables: {id: articleId}
            })
            if (articleData && data) {
                const comments = articleData.getArticleById.comments
                const newComment = data.addComment
                cache.writeQuery({
                    query: GET_ARTICLE_BY_ID,
                    variables: {id: articleId},
                    data: {
                        getArticleById: {...articleData.getArticleById, comments: [...comments, newComment]}
                    }
                })
            }

        }
    })


    async function handleCommentAddButtonClick(text: string) {
        if(user){
        addComment({
            variables: {articleId, text},
            optimisticResponse: {
                __typename: 'Mutation',
                addComment: {
                    __typename: 'CommentType',
                    text,
                    author: user,
                    id: -parseInt(    // <- copypasted
                        Math.random()
                            .toString(8)
                            .substr(2, 9),
                        10)
                }
            }
        })
    }}

    async function handleArticleSave(text: string) {
        changeArticle({
            variables: {id: articleId, text},
            optimisticResponse: {
                __typename: 'Mutation',
                changeArticle: {
                    text,
                    id: articleId,
                    __typename: "ArticleType"
                }
            }
        })
    }

    if(loading) {
        return <Preloader />
    }

    if(data && !error) {
        const article = data.getArticleById
        const isOwner = user?.username === article.author.username
        const isAuthenticated = !!user
        return <div>
                <Article article={article} changeArticle={handleArticleSave} isOwner={isOwner}/>
                <Comments comments={article.comments} addComment={handleCommentAddButtonClick}
                          isAuthenticated={isAuthenticated}/>
        </div>
        }

    return <Error />
}

        export default ArticleContainer