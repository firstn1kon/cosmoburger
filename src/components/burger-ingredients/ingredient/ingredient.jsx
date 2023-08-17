import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';
import { forwardRef } from 'react';

import ViewIngredient from './view-ingredient/view-ingredient';

import styles from '../burger-ingredients.module.css'

const Ingredient = forwardRef(({data, type}, ref) => {

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
    };
    return (
        <>
            <h2 id={type} data-scroll={type} ref={ref} className={`${styles.title} text text_type_main-medium`}>{titleType}</h2>
            <ul className={styles.wrapper}>
                {data.map(ingredient => <ViewIngredient key={ingredient._id} data={ingredient}/>)}
            </ul>
        </>
    )
})

export default Ingredient

Ingredient.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
}