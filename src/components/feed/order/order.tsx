import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IBaseOrderWs } from "../../../utils/types/common.types";
import { useAppSelector } from "../../../hooks/store-hooks";
import { getIngredients } from "../../../services/slices/selectors";
import { useCallback } from "react";
import DisplayStatus from "./display-status";

import styles from "./order.module.css"

interface IOrder extends IBaseOrderWs{
    showStatus?: boolean;
}

interface ICreateData {
    image: string | undefined;
    more: null | number;
    id: string | undefined;
    alt: string | undefined;
}

const Order: FC<IOrder> = ({createdAt, ingredients, name, number, status, showStatus = false}) => {
   

    const allIngredients = useAppSelector(getIngredients)


    // const prepareData = ingredients.reduce((acc , curr) => {
    //     if(acc[curr]) {
    //         acc[curr] = {...acc[curr], qty: acc[curr].qty +1}
    //     }
    //     else {
    //         const keys = allIngredients.find(ingredient => ingredient._id === curr)
    //         acc[curr] = {qty: 1, price: keys?.price, image: keys?.image_mobile, name: keys?.name}
    //     }
    //     return acc
    // },{} as any)

    const createData = useCallback(() => {
        let total = 0;
        const thumbs: ICreateData[] = []
        ingredients.forEach((ingredientInOrder,i, arr) => {
                const dataIngredient = allIngredients.find(ingredient => ingredient._id === ingredientInOrder)
                total += dataIngredient?.price ? dataIngredient?.price : 0
                if(i < 6) thumbs.push({
                    image: dataIngredient?.image_mobile, 
                    more: i === 5 ? arr.length - (i+1) : null,
                    id: dataIngredient?._id,
                    alt: dataIngredient?.name
                })
        })
        return {total, thumbs}
    },[ingredients, allIngredients])

    const dataForRender = createData()

    return (
        <div className={`${styles.order} p-6 ${styles.fadeInFromLeft}`}>
            <div className={`${styles.header} mb-6`}>
                <div className="text text_type_digits-default">{number}</div>
                <time className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(createdAt)} />
                </time>
            </div>
            <h3 className="text text_type_main-medium mb-2">{name}</h3>
            {showStatus && <DisplayStatus status={status}/>}
            <div className={styles.info}>
                <div className={`${styles.ingredients} mt-6`}>
                    {dataForRender.thumbs.map((thumb, i, arr)=> 
                        <div key={`${thumb.id}${i}`} className={styles.ingredient} style={{zIndex: arr.length - i}}>
                            <img src={thumb.image} alt={thumb.alt}></img>
                            {thumb.more ? <div className={`${styles.qty} text text_type_main-default`}>+{thumb.more}</div> : null}
                        </div>
                    )}
                </div>
                <div className={styles.cost}>
                    <h3 className="text text_type_digits-default">{dataForRender.total}</h3>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default Order

