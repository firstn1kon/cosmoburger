import { useEffect, useCallback } from "react"
import { orderDataFetch } from "../../services/slices/order-data-slice"
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks"
import { useParams } from "react-router-dom"
import { getCurrentOrderData, getIngredients, getIsErrorOrderData, getIsLoadingOrderData } from "../../services/slices/selectors"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { regexURLorder } from "../../utils/utils"
import DisplayStatus from "../feed/order/display-status"
import IngredientInModal from "./ingredient"
import Error from "../error/error"
import Skeleton from "./skeleton"
import Error404 from "../error-404/error-404"
import styles from "./order-ws-details.module.css"

interface IObjectData {
    [key: string]: ICreateData
}

interface ICreateData {
    qty: number;
    price: number;
    id: string;
    image: string;
    name: string;
}

const OrderWsDetails = () => {

    const {orderId} = useParams()
    const dispatch = useAppDispatch()
    const allIngredients = useAppSelector(getIngredients)
    const [orderData] = useAppSelector(getCurrentOrderData)
    const isLoading = useAppSelector(getIsLoadingOrderData)
    const isError = useAppSelector(getIsErrorOrderData)
    const testURL = regexURLorder.test(orderId as string)

    const createData = useCallback(() => {
        let total = 0;
        const ingredients = orderData?.ingredients.reduce((acc , curr) => {
            const keys = allIngredients.find(ingredient => ingredient._id === curr)
            total += keys?.price ? keys.price : 0
            if(keys) {
                if(acc[curr]) {
                    acc[curr] = {...acc[curr], qty: acc[curr].qty +1}
                }
                else {
                    acc[curr] = {qty: 1, price: keys?.price, image: keys?.image_mobile, name: keys?.name, id: keys?._id}
                }
            }
            return acc
        },{} as IObjectData) 
        return {total, ingredients}
    },[orderData, allIngredients]) 

    const {total, ingredients} = createData()

    useEffect(()=> {
        if(typeof orderId === "string") dispatch(orderDataFetch(orderId))
    //eslint-disable-next-line
    },[])

    if(isError) return <Error err={isError} inline={true}/>
    if (isLoading) return <Skeleton/>
    if(!orderData || !testURL) return <Error404/>
    
    return (
        <div className={`${styles.wrapper} fadeIn`}>
            <h2 className={`${styles.title} text text_type_digits-default mb-10`}>#{orderData?.number}</h2>
            <span className="text text_type_main-medium mb-3">{orderData?.name}</span>
            <DisplayStatus status={orderData?.status}/>
            <h3 className="text text_type_main-medium mb-6 mt-15">Состав:</h3>
            <div className={styles.ingredients}>
                {ingredients
                    ? Object.values(ingredients).map((ingredient, i) => 
                        <IngredientInModal key={`${ingredient.id}${i}`} {...ingredient}/>) 
                    : null}
            </div>
            <div className={styles.bottom}>
                <FormattedDate date={new Date(orderData?.createdAt)} className="text text_type_main-default text_color_inactive"/>
                <div className={`${styles.cost} mt-10`}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default OrderWsDetails


