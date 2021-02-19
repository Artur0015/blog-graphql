import s from "./menu.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type propsType = {
    currentPage: number
    articlesCount: number
    pageSize: number
}


function Paginator({articlesCount, pageSize, currentPage}: propsType) {
    const pagesCount = Math.ceil(articlesCount / pageSize)
    const pages = []


    if (pagesCount <= 4) {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    } else if ([1, 2, 3].includes(currentPage)) {
        for (let i = 1; i <= 4; i++) {
            pages.push(i)
        }
        pages.push(pagesCount)
    } else if ([1, 2].indexOf(currentPage) !== -1) {
        pages.push(1, 2, 3, pagesCount)
    } else if ([1, 2, pagesCount, pagesCount - 1].indexOf(currentPage) === -1) {
        pages.push(1, currentPage - 1, currentPage, currentPage + 1, pagesCount)
    } else if ([pagesCount, pagesCount - 1].indexOf(currentPage) !== -1) {
        pages.push(1, pagesCount - 2, pagesCount - 1, pagesCount)
    }

    return <div className={s.pagination}>
        {pages.map((page, index) =>
            <NavLink key={index} to={`?page=${page}`}>{page}</NavLink>
        )}
    </div>
}

export default Paginator