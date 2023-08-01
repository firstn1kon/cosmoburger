import { modalOverlayPropTypes } from '../../utils/prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({close}) => {
    
    return (
        <div className={styles.overlay} onClick={close}></div>
    )
}

export default ModalOverlay

ModalOverlay.propTypes = modalOverlayPropTypes

