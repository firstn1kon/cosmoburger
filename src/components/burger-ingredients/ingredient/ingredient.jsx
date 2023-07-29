import PropTypes from 'prop-types';

import ViewIngredient from './viewIngredient/viewIngredient';

import { burgerIngredientsProptypes } from '../../../utils/propTypes';

import styles from '../burger-ingredients.module.css'

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
                {data.map(ingredient => <ViewIngredient key={ingredient._id} data={ingredient}/>)}
            </ul>
        </>
    )
}

export default Ingredient



Ingredient.propTypes = {
    data: PropTypes.arrayOf(burgerIngredientsProptypes).isRequired,
    type: PropTypes.string.isRequired
  }; 