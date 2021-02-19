import Photo from './error-photo.jpg'
import s from './error.module.css'
import {useHistory} from "react-router";


function Error() {
    const history = useHistory()

    function handleClick() {
        history.push('/menu')
    }


    return <div>
        <img src={Photo} alt="photo" className={s.img} />
        <button className={s.button} onClick={handleClick}>GET TO MENU</button>
    </div>
}

export default Error