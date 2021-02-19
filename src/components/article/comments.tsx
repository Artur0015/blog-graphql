import React, {useState} from 'react'
import s from './article.module.css'
import {CommentType} from "../../apollo/apollo-types";


type propsType = {
    comments: Array<CommentType>
    isAuthenticated: boolean
    addComment: (commentText: string) => void
}


const Comments = ({comments, addComment, isAuthenticated}: propsType) => {
    const [comment, setComment] = useState('')


    function handleChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        setComment(ev.target.value)
    }

    function handleClick() {
        addComment(comment)
        setComment('')
    }


    return <>{(comments.length === 0
            ? <h2 className={s.empty}>No comments</h2>
            : <div className={s.comments}>
                <h2>Comments</h2>
                {comments.map((comment, index) => (
                    <div className={s.comment} key={index}>
                        <h3>{comment.author.username}</h3>
                        <p>{comment.text}</p>
                    </div>))}
            </div>
    )}
        {isAuthenticated &&
        <div className={s.commentInput}>
            <span>Write comment</span>
            <textarea onChange={handleChange} value={comment}/>
            <button onClick={handleClick}>Submit</button>
        </div>}
    </>
}


export default Comments