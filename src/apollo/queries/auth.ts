import {gql} from "@apollo/client";
import {UserType} from "../apollo-types";

export const LOGIN_USER = gql`
mutation ($username:String!, $password:String!, $rememberMe: Boolean!){
  loginUser(username:$username, password:$password, rememberMe:$rememberMe) {
    id
    username
    photo
  }
}
`

export const LOGOUT_USER = gql`mutation {
  logoutUser{
    response
  }
}`

export const CREATE_USER = gql`
mutation ($username:String!, $password:String!){
  createUser(username:$username, password:$password) {
    response
  }
}
`

export const GET_CURRENT_USER_INFO = gql`
query{
  currentUser{
    id
    username
    photo
  }
}
`

export type GetCurrentUserInfoResponseType = {
    currentUser: UserType | null
}

export type LoginUserResponseType = {
    loginUser: UserType
}

export type LogoutResponseType = {
    logoutUser: { response: string }
}