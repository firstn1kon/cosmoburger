import { getAccessTokenWs } from "../../utils/utils"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks"
import { initWS, closeWS } from "../../services/slices/profile-slice"
import styles from "./orders.module.css"
import { getProfileStatus, getProfiledData } from "../../services/slices/selectors"
import Order from "../feed/order/order"
import Spinner from "../spinner/spinner"

const Orders = () => {
    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(getProfiledData)
    const statusWS = useAppSelector(getProfileStatus)

    useEffect(()=> {
        dispatch(initWS(`wss://norma.nomoreparties.space/orders?token=${getAccessTokenWs()}`))
        return () => {
            dispatch(closeWS())
        }
    // eslint-disable-next-line
    },[])

    return (
        <div className={styles.orders}>
            {statusWS === "init" && <Spinner/>}
            {[...orders].reverse().map(order => <Order key={order._id} showStatus={true} {...order}/>)}
        </div>
    )
}

export default Orders