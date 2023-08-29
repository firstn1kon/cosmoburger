import PropTypes from 'prop-types';

import logo from '../../images/spinner.svg'

import styles from './spinner.module.css'

const Spinner = ({modal = true, loadText = "Loading"}) => {

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

Spinner.propTypes = {
    modal: PropTypes.bool,
    loadText: PropTypes.string,
}