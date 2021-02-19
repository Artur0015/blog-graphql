import React from 'react'
import preloader from './preloadimg.gif'
import s from  './preloader.module.css'

const Preloader = () => {
    return <img src={preloader} alt='preloader' className={s.preloader}/>
}

export default Preloader