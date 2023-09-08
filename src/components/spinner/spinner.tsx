
import logo from '../../images/spinner.svg'
import { FC } from 'react'
import styles from './spinner.module.css'

interface ISpinner {
    modal?: boolean,
    loadText?: string
}

const Spinner: FC<ISpinner> = ({modal = true, loadText = "Loading"}) => {

    const content = modal ? 
        <div className={styles.overlay}>
            <div className={styles.wrapper}>
                Loading
                <img className={styles.spinner} src={logo} alt="spinner"></img>
            </div>
        </div>
        : <div className={styles.loading}>{loadText}...</div>
    
    return (
        content
    )
}

export default Spinner
