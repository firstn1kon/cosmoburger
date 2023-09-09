import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
    close: ()=> void
}

const ModalOverlay: FC<IModalOverlay> = ({close}) => {
    
    return (
        <div className={styles.overlay} onClick={close}></div>
    )
}

export default ModalOverlay


