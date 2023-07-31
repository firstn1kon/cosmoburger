import PropTypes from 'prop-types';

import styles from './error.module.css'

import errorImg from '../../images/error.svg'

const Error = ({err}) => {
    return (
        <div className={styles.overlay}>
        <div className={styles.wrapper}>
            <img src={errorImg} alt="Error"/>
            Error - {err}
            <a href='/' alt="reload" className={styles.link}>RELOAD</a>
        </div>
    </div>
    )
}
export default Error

Error.propTypes = {
    err: PropTypes.string.isRequired
}