import { FC } from "react"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./order-ws-details.module.css"

interface IIngredientInModal {
        price: number;
        qty: number;
        image: string;
        name: string;
}

const IngredientInModal: FC<IIngredientInModal> = ({price, qty, image, name}) => {
    return (
        <div className={styles.ingredient}>
        <div className={styles.thumb}>
            <img src={image} alt={name}></img>
        </div>
        <p className={`${styles.grow} text text_type_main-default`}>{name}</p>
        <div className={styles.qty}>
            <p className="text text_type_digits-default">{qty} x {price}</p>
            <CurrencyIcon type="primary"/>
        </div>
    </div>
    )
}

export default IngredientInModal