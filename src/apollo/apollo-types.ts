export interface ArticleType {
    id: number
    header: string
    text: string
    author: CommonUserType
}

export type ArticlesWithCountType = {
    count: number,
    articles: Array<ArticleType>
}

export interface ArticlePageType extends ArticleType {
    comments: Array<CommentType>
}

export interface CommonUserType {
    username: string
}

export interface UserType extends CommonUserType {
    id: number
    photo: string
    __typename: 'UserType'
}


export interface UserProfileType extends UserType {
    aboutMe: string
    articles: ArticlesWithCountType
}

export interface UserCredentialsType extends CommonUserType {
    password: string
}

export interface UserRegistrationCredentialsType extends UserCredentialsType{
    passwordConfirmation: string
}

export interface UserLoginCredentialsType extends UserCredentialsType {
    rememberMe: boolean
}

export type CommentType = {
    id: number
    text: string
    author: CommonUserType
    __typename: 'CommentType'
}