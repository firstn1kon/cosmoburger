import { useState } from 'react';
import PropTypes from 'prop-types';

import Ingredient from './ingredient/ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredients.module.css'

const burgerIngredientsProptypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
})

const BurgerIngredients = ({data}) => {
    const [tab, setTab] = useState('one');
    
    const filterDataByType = (data) => {
        const buns = data.filter(buns => buns.type === 'bun');
        const main = data.filter(main => main.type === 'main');
        const sauces = data.filter(sauce => sauce.type === 'sauce');
        return [buns, sauces, main];
    }

    const resultForRender = filterDataByType(data)

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="one" active={tab === 'one'} onClick={setTab}>Булки</Tab>
                <Tab value="two" active={tab === 'two'} onClick={setTab}>Соусы</Tab>
                <Tab value="three" active={tab === 'three'} onClick={setTab}>Начинки</Tab>
            </div>
            <div className={styles.scroll}>
                {resultForRender.map(ingredient => {
                    if (ingredient.length !== 0) {
                        return <Ingredient key={ingredient[0].type} data={ingredient} type={ingredient[0].type}/>
                    }
                    return null
                })}
            </div>
        </section>
    )
  }

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(burgerIngredientsProptypes).isRequired
  }; 


