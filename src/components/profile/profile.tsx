import React from "react";
import {useLocation, useParams} from "react-router-dom";
import s from './profile.module.css'
import Post from "../menu/post";
import Paginator from "../menu/paginator";
import {useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {
    CHANGE_USER_DATA,
    ChangeUserDataResponseType,
    GET_USER_BY_USERNAME,
    GetUserByUsernameResponseType
} from "../../apollo/queries/profile";
import {userVar} from "../navigation/navigtaion";
import Preloader from "../preloader/preloader";
import UserInfo from "./user-info";
import Error from "../error/error";
import axios from "axios";


function Profile() {
    const pageSize = 3
    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1
    const username = useParams<{ username: string }>().username
    const user = useReactiveVar(userVar)
    const {data, loading, error} = useQuery<GetUserByUsernameResponseType>(GET_USER_BY_USERNAME, {
        variables: {
            username,
            first: pageSize,
            skip: pageSize * (currentPage - 1)
        }
    })
    const [changeUserInfo] = useMutation<ChangeUserDataResponseType>(CHANGE_USER_DATA)
    const isOwner = user?.username === username


    function changeUserAboutMe(aboutMe: string) {
        if (user) {
            changeUserInfo({
                variables: {aboutMe},
                optimisticResponse: {
                    __typename: 'Mutation',
                    changeUserData: {
                        id: user.id,
                        aboutMe,
                        __typename: 'UserType'
                    }
                }
            })
        }
    }

    async function setPhoto({target: {files}}: React.ChangeEvent<HTMLInputElement>) {
        if (files && files.length) {
            const formData = new FormData()
            formData.append('photo', files[0])
            const {data: {photo: newPhoto}} = await axios.post<{ photo: string }>('http://localhost:8000/api/user/upload/', formData, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken',
                xsrfHeaderName: 'X-CSRFTOKEN',
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            })
            if (user) {
            userVar({...user,photo: newPhoto})
            }
        }
    }


    if (loading) {
        return <Preloader/>
    }

    const profileUser = data?.getUserByUsername
    if (profileUser && profileUser.articles.articles.length && !error) {
        const articles = profileUser.articles.articles
        const count = profileUser.articles.count
        return <div className={s.profile}>
            <h1>{profileUser.username}</h1>
            <UserInfo changeAboutMe={changeUserAboutMe} user={profileUser} isOwner={isOwner} setPhoto={setPhoto}
                      currentUser={user}/>
            <div className={s.articles}>
                {articles.map((article) =>
                    <Post key={article.id} article={article}/>)}
                <Paginator currentPage={currentPage} articlesCount={count} pageSize={3}/>
            </div>
        </div>
    }

    return <Error/>
}

export default Profile