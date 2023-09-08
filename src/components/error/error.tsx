import { createPortal } from 'react-dom'
import { useEffect,  FC  } from 'react';
import errorImg from '../../images/error.svg'
import styles from './error.module.css'

const outter = document.createElement('div') as HTMLDivElement

interface IError {
    err: string,
    reload?: boolean,
    tryAgain?: () => void,
    inline?: boolean
}

const Error: FC<IError> = ({err, reload, tryAgain, inline = false}) => {

    useEffect(()=> {
        if(!inline) {
            outter.setAttribute('id', 'error');
            document.body.appendChild(outter);
            document.body.style.overflow="hidden";
            return () => {
                outter.remove();
                document.body.removeAttribute('style');
            }
         }
        // eslint-disable-next-line
    },[]);

    const content = reload 
        ? <a href='/' className={styles.link}>RELOAD</a> 
        : <div className={styles.link} onClick={tryAgain}>ЗАКРЫТЬ</div>

    const render = inline 
        ? <div className={`${styles.error} fadeIn`}>{err}</div>
        : createPortal(         
            <div className={styles.overlay}>
                <div className={styles.wrapper}>
                    <img src={errorImg} alt="Error"/>
                    Error - {err}
                    {content}
                </div>
            </div>
        ,outter)
                    

    return (
            render
    )
}

export default Error

