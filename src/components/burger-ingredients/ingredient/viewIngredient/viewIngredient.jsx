import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { burgerIngredientsProptypes } from '../../../../utils/propTypes';

import styles from '../../burger-ingredients.module.css'

const ViewIngredient = ({data}) => {
    const {image, price, name} = data;
    return (
        <li className={styles.item}>
            <img src={image} alt={name}></img>
            <div className={styles.currency}><p className='text text_type_digits-default'>{price}</p> <CurrencyIcon type="primary" /></div>
            <p className={styles.description}>{name}</p>
            <Counter count={0} size="default" extraClass="m-1"/>
        </li>
    )
}

export default ViewIngredient

ViewIngredient.propTypes = {
    data: burgerIngredientsProptypes.isRequired,
  }; 