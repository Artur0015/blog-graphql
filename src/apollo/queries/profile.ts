import {gql} from "@apollo/client";
import {UserProfileType} from "../apollo-types";

export const GET_USER_BY_USERNAME = gql`query ($username:String!, $first: Int!, $skip: Int!) {
  getUserByUsername(username:$username, first: $first, skip:$skip) {
    id
    username
    photo
    aboutMe
    articles{
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
  }
}
`

export const CHANGE_USER_DATA = gql`mutation ($aboutMe: String!) {
  changeUserData(aboutMe:$aboutMe) {
    id
    aboutMe
  }
}`

export type GetUserByUsernameResponseType = {
    getUserByUsername: UserProfileType
}

export type ChangeUserDataResponseType = {
    __typename: 'Mutation'
    changeUserData: {
        id: number
        aboutMe: string,
        __typename: 'UserType'
    }
}