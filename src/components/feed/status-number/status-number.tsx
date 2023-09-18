import styles from "./status-number.module.css"
import { FC } from "react"

interface IStatusNumber {
    title: string;
    extraClass?: string;
    orders: number[];
    idleText?: string;
}

const StatusNumber: FC<IStatusNumber> = ({title, extraClass, orders, idleText}) => {
    return (
        <>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <ul className={`${styles['list-orders']} ${extraClass? extraClass : null} text text_type_digits-default`}>
                {orders.map(order=><li className="fadeIn" key={order}>{order}</li>)}
                {!orders.length && idleText && <li className="text text_type_main-default text_color_inactive">{idleText}</li>}
            </ul>
           
        </>
    )
}
// сделать анимацию
export default StatusNumber