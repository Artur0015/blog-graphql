import React from "react";
import {ChangeEvent, useRef, useState} from "react";
import s from './profile.module.css'
import {UserProfileType, UserType} from "../../apollo/apollo-types";


type PropsType = {
    changeAboutMe: (text: string) => void
    user: UserProfileType
    isOwner: boolean
    setPhoto: (ev: React.ChangeEvent<HTMLInputElement>) => void
    currentUser: UserType | null
}

function UserInfo({changeAboutMe, user, isOwner, setPhoto, currentUser}: PropsType) {
    const [text, setText] = useState(user.aboutMe)
    const [isEditMode, changeEditModeTo] = useState(false)
    const imageInputRef = useRef<HTMLInputElement | null>(null)


    function clickFileInput() {
        if (imageInputRef.current) {
            imageInputRef.current.click()
        }
    }

    function activateEditMode() {
        if (isOwner) {
            changeEditModeTo(true)
        }
    }

    function dropChanges() {
        setText(user.aboutMe)
        changeEditModeTo(false)
    }

    function saveChanges() {
        changeAboutMe(text)
        changeEditModeTo(false)
    }

    function handleTextChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        setText(ev.target.value)
    }


    return <>
        <div className={s.image_space}>
            <img src={(isOwner && currentUser) ? currentUser.photo :user.photo} alt="photo"/>
            {isOwner && <>
                <button onClick={clickFileInput}>Upload image</button>
                <input type="file" style={{display: 'none'}} ref={imageInputRef} onChange={setPhoto}/>
            </>}
        </div>
        <div className={s.about}>
            {isEditMode
                ? <textarea value={text} onChange={handleTextChange} onDoubleClick={dropChanges} onKeyPress={ev => {
                    if (ev.key === 'Enter') {
                        saveChanges()
                    }
                }}/>
                : <p onDoubleClick={activateEditMode}>{user.aboutMe || 'User didn\'t tell anything about himself'}</p>
            }
        </div>
    </>
}

// const UserInfo = () => {
//     return <>Ok</>
// }

export default UserInfo