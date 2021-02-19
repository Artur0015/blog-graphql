import {gql} from "@apollo/client";
import {ArticlePageType, ArticlesWithCountType, ArticleType, CommentType} from "../apollo-types";

export const GET_ARTICLE_BY_ID = gql`query ($id: ID!) {
  getArticleById(id:$id){
    id
    header
    text
    author{
      username
    }
    comments{
        id
        text
        author{
        username
        }
  }
  }
  }
`

export const GET_ARTICLES = gql`query ($first: Int!, $skip: Int!) {
  getArticles(first:$first, skip: $skip) {
    count
    articles{
      id
      header
      text
      author{
        username
      }
    }
  }
}`


export const CHANGE_ARTICLE = gql`mutation ($id: ID!, $text: String!) {
  changeArticle(id: $id, text: $text) {
    id
    text
  }
}`

export const CREATE_ARTICLE = gql`mutation ($header: String!, $text: String!) {
  createArticle(header: $header, text: $text) {
    id
    header
    text
    author {
      username
    }
  }
}`

export const ADD_COMMENT = gql`mutation ($text:String!, $articleId: ID!) {
  addComment(text:$text, articleId:$articleId) {
    id
    text
    author{
       username
    }
  }
}`



export type GetArticleByIdResponseType = {
    getArticleById: ArticlePageType
}

export type ChangedArticleType =  {
    __typename: 'Mutation'
    changeArticle: {
        id: number,
        text: string
        __typename: 'ArticleType'
    }
}

export type GetArticlesResponseType = {
    getArticles: ArticlesWithCountType
}

export type CreateArticleResponseType = {
    createArticle: ArticleType
}

export type NewCommentType = {
    __typename: 'Mutation'
    addComment: CommentType
}
