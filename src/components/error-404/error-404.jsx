import { Link } from 'react-router-dom'
import astronaut from '../../images/astronaut.svg'
import styles from './error-404.module.css'

const Error404 = () => {
    return (
        <div className={styles.wrapper}>
            <img  className={styles.astronaut} src={astronaut} alt="astronaut" />
            <div className={styles.info}>
                <p className='text text_type_digits-large'> 404</p>
                <p className='text text_type_main-medium mt-2'>Даже вселенная не может помочь - такой страницы нет.</p>
                <p className='text text_type_main-medium mt-4'>Начните свой млечный путь с <Link className={styles.link} to="/">главной страницы</Link>.</p>
            </div>
        </div>
    )
}

export default Error404