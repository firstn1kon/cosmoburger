import { useEffect } from 'react';
import ViewIngredient from './view-ingredient/view-ingredient';
import { ingredientPropTypes } from '../../../utils/prop-types';

import styles from '../burger-ingredients.module.css'

const Ingredient = ({data, tab, type}) => {

    useEffect(() => {
        if (tab === type) {
            const elementCoordinates = document.querySelector(`#${type}`)
            elementCoordinates.scrollIntoView({behavior: "smooth"});
        }
    },[tab, type])

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
            <h2 id={type} className={`${styles.title} text text_type_main-medium`}>{titleType}</h2>
                <ul className={styles.wrapper}>
                {data.map(ingredient => <ViewIngredient key={ingredient._id} data={ingredient}/>)}
            </ul>
        </>
    )
}

export default Ingredient

Ingredient.propTypes = ingredientPropTypes