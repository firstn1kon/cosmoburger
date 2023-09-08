import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { FC } from 'react';
import styles from './modal.module.css'

interface IModal {
    children: React.ReactNode;
    title?: string,
    close: () => void,
}

const outter = document.createElement('div') as HTMLDivElement
const Modal: FC<IModal> = ({children, title, close}) => {

    useEffect(()=> {
        const closeByEscape = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                close();
            }
        };
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

