import { FC } from "react"
import styles from "../feed.module.css"

interface IDisplayStatus {
    status: string
} 

const DisplayStatus: FC<IDisplayStatus> = ({status}) => {

    let renderStatus: string = ""

    switch (status) {
        case "created":
            renderStatus = "Создан";
            break;
        case "pending":
            renderStatus = "Готовится";
            break;
        case "done":
            renderStatus = "Выполнен";
            break;
        default: renderStatus = status
    };

    return (
        <span className={`text text_type_main-default ${status === "done" && styles['second-color']}`}>{renderStatus}</span>
    )
}

export default DisplayStatus