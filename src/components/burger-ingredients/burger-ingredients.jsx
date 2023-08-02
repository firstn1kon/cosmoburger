import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useState } from 'react';

import Ingredient from './ingredient/ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({data}) => {

    const [tab, setTab] = useState('bun');
    
    const filterDataByType = (data) => {
        const buns = data.filter(buns => buns.type === 'bun');
        const main = data.filter(main => main.type === 'main');
        const sauces = data.filter(sauce => sauce.type === 'sauce');
        return [buns, sauces, main];
    };

    const resultForRender = filterDataByType(data);

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={tab === 'bun'} onClick={setTab}>Булки</Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={setTab}>Соусы</Tab>
                <Tab value="main" active={tab === 'main'} onClick={setTab}>Начинки</Tab>
            </div>
            <div className={styles.scroll}>
                {resultForRender.map(ingredient => {
                    if (ingredient.length !== 0) {
                        return <Ingredient key={ingredient[0].type} data={ingredient} type={ingredient[0].type} tab={tab}/>
                    }
                    return null
                })}
            </div>
        </section>
    )
  }

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
};


