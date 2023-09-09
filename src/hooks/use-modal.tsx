import { useState } from "react"
import { ReactNode } from "react"

import Modal from "../components/modal/modal"

interface IUseModal {
    title?: string,
    Component: ReactNode
}

const useModal= ({title, Component}: IUseModal) => {

    const [isOpen, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false)
    };

    const openModal = () => {
        setOpen(true)
    };

    const renderModal = isOpen ? (<Modal title={title} close={closeModal}>{Component}</Modal>) : null
    
    return { renderModal, openModal}
}

export default useModal