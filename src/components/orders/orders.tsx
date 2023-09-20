import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks"
import { initWS, closeWS } from "../../services/slices/profile-slice"
import { getProfileStatus, getProfiledData, getProfileError } from "../../services/slices/selectors"
import { getAccessTokenWs } from "../../utils/utils"
import { _wsProfile } from "../../utils/api"
import Error from "../error/error"
import Order from "../feed/order/order"
import Spinner from "../spinner/spinner"
import styles from "./orders.module.css"

const Orders = () => {
    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(getProfiledData)
    const statusWS = useAppSelector(getProfileStatus)
    const errorWS = useAppSelector(getProfileError)

    useEffect(()=> {
        dispatch(initWS(`${_wsProfile}${getAccessTokenWs()}`))
        return () => {
            dispatch(closeWS())
        }
    // eslint-disable-next-line
    },[])

    if(errorWS) return <Error err={`${errorWS} - ${statusWS}`} inline={true}/>

    return (
        <div className={styles.orders}>
            {statusWS === "init" && <Spinner/>}
            {orders && [...orders].reverse().map(order => <Order key={order._id} showStatus={true} {...order}/>)}
        </div>
    )
}

export default Orders