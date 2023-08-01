import { modalPropTypes } from '../../utils/prop-types'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'

import styles from './modal.module.css'

const Modal = ({children, title, close}) => {

    useEffect(()=> {
        outter.setAttribute('id', 'modal');
        document.body.appendChild(outter);
        document.body.style.overflow="hidden";
        window.addEventListener('keyup', closeByEscape);
        return () => {
            outter.remove();
            window.removeEventListener('keyup', closeByEscape);
            document.body.removeAttribute('style');
        }
        // eslint-disable-next-line
    },[]);

    const closeByEscape = (e) => {
        if (e.code === "Escape") {
            close();
        }
    };

    const outter = document.createElement('div');

    return (
        createPortal(
            <>
                <ModalOverlay close={close}/>         
                <div className={`${styles.modal} pl-10 pr-10 pt-10`}>
                    <h2 className='text text_type_main-large'>{title}</h2>
                    <div className={styles.close} onClick={close}><CloseIcon type="primary"/></div>
                    {children}
                </div>
            </>
        ,outter)
    )
}

export default Modal

Modal.propTypes = modalPropTypes