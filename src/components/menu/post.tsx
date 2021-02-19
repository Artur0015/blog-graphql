import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './menu.module.css'
import {ArticleType} from "../../apollo/apollo-types";


const Post = ({article}: { article: ArticleType }) => {
    if (article.text.length >= 300) {
        article.text = article.text.slice(0, 300) + '...'
    }

    return <div className={s.post}>
        <NavLink to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h1>{article.header}</h1>
            <p>{article.text}</p></NavLink>
        <span>By <a href={'/profile/' + article.author.username}>{article.author.username}</a></span>
    </div>
}

export default Post