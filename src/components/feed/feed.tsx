import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks"
import { useEffect, useMemo } from "react"
import { initWS, closeWS } from "../../services/slices/feed-slice"
import { getFeedData, getFeedStatus, getFeedError, getFeedUrl} from "../../services/slices/selectors"
import { _wsFeed } from "../../utils/api"
import Error from "../error/error"
import Spinner from "../spinner/spinner"
import Order from "./order/order"
import StatusNumber from "./status-number/status-number"
import styles from "./feed.module.css"

const Feed = () => {
    const dispatch = useAppDispatch();
    const {total, totalToday, orders} = useAppSelector(getFeedData)
    const statusWS = useAppSelector(getFeedStatus)
    const errorWS = useAppSelector(getFeedError)
    const urlWS = useAppSelector(getFeedUrl)

    useEffect(()=> {
        dispatch(initWS(_wsFeed))
        return () => {
            dispatch(closeWS())
        }
    // eslint-disable-next-line
    },[])

    const doneOrders = useMemo(() => orders.filter(order => order.status === "done").map(order => order.number),[orders])
    const pendingOrders = useMemo(() => orders.filter(order => order.status === "pending").map(order => order.number),[orders])

    if(errorWS) return <Error err={`${errorWS} - ${statusWS}, adress: ${urlWS}`} inline={true}/>

    return (
        <>  
            {statusWS === "init" && <Spinner/>}
            <div className="container">
                <h2 className={`${styles.title} text text_type_main-large mt-10 mb-10 fadeIn`}>Лента заказов</h2>
            </div>
            <div className="main-wrapper fadeIn">
                <div className={styles.orders}>
                    {orders.map(order => <Order key={order._id} data={order}/>)}
                </div>
                <div className={styles.stats}>
                    <div className={styles['orders-stats']}>
                        <div>
                            <StatusNumber title="Готовы:" orders={doneOrders} extraClass={styles['second-color']}/>
                        </div>
                        <div>
                            <StatusNumber title="В работе:" idleText="Все заказы выполнены" extraClass="beatheart" orders={pendingOrders}/>
                        </div>
                    </div>
                    <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
                    <p className={`${styles.shadow} text text_type_digits-large`}>{total}</p>
                    <h3 className="text text_type_main-medium mt-15 ">Выполнено за сегодня:</h3>
                    <p className={`${styles.shadow} text text_type_digits-large`}>{totalToday}</p>
                </div>
            </div>
        </>
    )
}

export default Feed

