import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Ingredient from './ingredient/ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
    const data = useSelector(state => state.main.ingredients)

    const [tab, setTab] = useState('bun');
    
    const filterDataByType = useCallback((data) => {
        const buns = data.filter(buns => buns.type === 'bun');
        const main = data.filter(main => main.type === 'main');
        const sauces = data.filter(sauce => sauce.type === 'sauce');
        return [buns, sauces, main];
        // eslint-disable-next-line
    },[data]);

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={tab === 'bun'} onClick={setTab}>Булки</Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={setTab}>Соусы</Tab>
                <Tab value="main" active={tab === 'main'} onClick={setTab}>Начинки</Tab>
            </div>
            <div className={styles.scroll}>
                {filterDataByType(data).map(ingredient => {
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


