import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import styles from '../burger-ingredients.module.css'

const ingredientProptypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
})

const Ingredient = ({data, type}) => {

    let titleType;

    switch (type) {
        case 'bun':
            titleType = 'Булки'
            break;
        case 'main':
            titleType = 'Начинки';
            break;
        case 'sauce':
            titleType = 'Соусы';
            break;
        default: titleType = 'Булка' 
    }
    
    return (
        <>
            <h2 className={`${styles.title} text text_type_main-medium`}>{titleType}</h2>
                <ul className={styles.wrapper}>
                {data.map(ingredient => <View key={ingredient._id} data={ingredient}></View>)}
            </ul>
        </>
    )
}

export default Ingredient

const View = ({data}) => {
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

Ingredient.propTypes = {
    data: PropTypes.arrayOf(ingredientProptypes).isRequired,
    type: PropTypes.string.isRequired
  }; 