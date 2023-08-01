import { useState } from "react"

import Modal from "../components/modal/modal"

const useModal = ({title, Component}) => {

    const [isOpen, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false)
    };

    const openModal = () => {
        setOpen(true)
    };

    const renderModal = isOpen && (<Modal title={title} close={closeModal}>{Component}</Modal>);
    
    return { renderModal, openModal}
}

export default useModal