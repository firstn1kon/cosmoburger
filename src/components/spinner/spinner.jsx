import logo from '../../images/spinner.svg'

import styles from './spinner.module.css'
const Spinner = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.wrapper}>
                Loading
                <img className={styles.spinner} src={logo} alt="spinner"></img>
            </div>
        </div>
    )
}

export default Spinner