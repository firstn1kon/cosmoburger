import { createPortal } from 'react-dom'
import { useEffect } from 'react';

import PropTypes from 'prop-types';

import styles from './error.module.css'

import errorImg from '../../images/error.svg'


const outter = document.createElement('div');

const Error = ({err, reload, tryAgain}) => {

    useEffect(()=> {
        outter.setAttribute('id', 'error');
        document.body.appendChild(outter);
        document.body.style.overflow="hidden";
        return () => {
            outter.remove();
            document.body.removeAttribute('style');
        }
        // eslint-disable-next-line
    },[]);

    const content = reload 
        ? <a href='/' alt="reload" className={styles.link}>RELOAD</a> 
        : <div className={styles.link} onClick={tryAgain}>ЗАКРЫТЬ</div>

    return (
        createPortal(
            <div className={styles.overlay}>
                <div className={styles.wrapper}>
                    <img src={errorImg} alt="Error"/>
                    Error - {err}
                    {content}
                </div>
            </div>
        ,outter)
    )
}

export default Error

Error.propTypes = {
    err: PropTypes.string.isRequired,
    reload: PropTypes.bool,
    tryAgain: PropTypes.func
}