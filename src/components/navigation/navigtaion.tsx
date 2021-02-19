import React, {useEffect} from 'react'
import cn from "classnames";
import s from "./navigation.module.css";
import {NavLink} from "react-router-dom";
import {
    GET_CURRENT_USER_INFO,
    GetCurrentUserInfoResponseType,
    LOGOUT_USER,
    LogoutResponseType
} from "../../apollo/queries/auth";
import {makeVar, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {UserType} from "../../apollo/apollo-types";


export const userVar = makeVar<UserType | null>(null)


function Navigation() {
    const [buttonText, setButtonText] = React.useState('>')
    const user = useReactiveVar<null | UserType>(userVar)
    const {data, loading} = useQuery<GetCurrentUserInfoResponseType>(GET_CURRENT_USER_INFO)
    const [logoutUser] = useMutation<LogoutResponseType>(LOGOUT_USER)


    useEffect(() => {
        userVar(data?.currentUser || null)
    }, [data])

    function handleClick() {
        if (buttonText === '>') {
            setButtonText('<')
        } else {
            setButtonText('>')
        }
    }

    async function handleLogoutClick() {
        await logoutUser()
        userVar(null)
    }

    if (loading) {
        return <></>
    }


    return <div className={cn({[s.non_active]: buttonText === '>'}, s.nav)}>
        <button onClick={handleClick}>{buttonText}</button>
        {user && <img src={user.photo} alt={'photo'}/>}
        <span><NavLink to='/menu' activeClassName={s.active_button}>Menu</NavLink></span>
        {user
            ? <>
                <span> <NavLink to='/write' activeClassName={s.active_button}>Write</NavLink></span>
                <span> <NavLink to={'/profile/' + user.username} activeClassName={s.active_button}>Profile</NavLink></span>
                <span><NavLink to='/menu' onClick={handleLogoutClick}>Log Out</NavLink></span>
            </>
            : <>
                <span><NavLink to='/login' activeClassName={s.active_button}>Log in</NavLink></span>
                <span><NavLink to='/signup' activeClassName={s.active_button}>Sign up</NavLink></span>

            </>}
    </div>
}


export default Navigation