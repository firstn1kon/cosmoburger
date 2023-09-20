import { FC } from "react"
import { TypeStatus } from "../../../utils/types/common.types"
import styles from "../feed.module.css"

interface IDisplayStatus {
    status: string
} 

const DisplayStatus: FC<IDisplayStatus> = ({status}) => {

    let renderStatus: string = ""

    switch (status) {
        case TypeStatus.CREATED:
            renderStatus = "Создан";
            break;
        case TypeStatus.PENDING:
            renderStatus = "Готовится";
            break;
        case TypeStatus.DONE:
            renderStatus = "Выполнен";
            break;
        default: renderStatus = status
    };

    return (
        <span className={`text text_type_main-default ${status === "done" && styles['second-color']}`}>{renderStatus}</span>
    )
}

export default DisplayStatus