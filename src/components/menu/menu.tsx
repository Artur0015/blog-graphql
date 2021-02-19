import React from 'react'
import Preloader from '../preloader/preloader'
import {useLocation} from 'react-router-dom'
import Post from "./post";
import Paginator from "./paginator";
import {useQuery} from "@apollo/client";
import {
    GET_ARTICLES,
    GetArticlesResponseType
} from "../../apollo/queries/article";
import Error from "../error/error";


function Menu() {
    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1
    const pageSize = 5
    const {
        loading,
        called,
        error,
        data
    } = useQuery<GetArticlesResponseType>(GET_ARTICLES, {
        variables: {
            first: pageSize,
            skip: pageSize * (currentPage - 1)
        }})


    if (loading || !called) {
        return <Preloader/>
    }

    if (data?.getArticles.articles.length && !error) {
        const articles = data.getArticles.articles
        const count = data.getArticles.count
        return <>
            {articles.map((article) =>
                <Post article={article} key={article.id}/>)}
            <Paginator currentPage={currentPage} articlesCount={count} pageSize={pageSize}/>
        </>
    }


    return <Error />
}


export default Menu