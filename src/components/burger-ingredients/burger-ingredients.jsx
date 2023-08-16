import { useCallback, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../services/slices/ingredients-slice';

import Ingredient from './ingredient/ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {

    const data = useSelector(state => state.ingredients.ingredients)
    const tab = useSelector(state => state.ingredients.currentTab)
    const dispatch = useDispatch()

    const containerRef = useRef(null);
    const typesRef = useRef([]);

    useEffect(()=> {
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dispatch(setCurrentTab((entry.target.dataset.scroll)));
                }
              });
        }
        const options = {
            root: containerRef.current,
            rootMargin: '0% 0% -90% 0%',
            threshold: 0.1
          }
        const observer = new IntersectionObserver(callback, options)
        const types = typesRef.current
        if (types) types.forEach((type) => observer.observe(type));
        return () => {
            types.forEach((type) => observer.unobserve(type))
            observer.disconnect()
        }
    })

    const filterDataByType = useCallback((data) => {
        const buns = data.filter(buns => buns.type === 'bun');
        const main = data.filter(main => main.type === 'main');
        const sauces = data.filter(sauce => sauce.type === 'sauce');
        return [buns, sauces, main];
        // eslint-disable-next-line
    },[data]);

    const moveToPosition = (index) => {
        typesRef.current[index].scrollIntoView({behavior: "smooth"})
        }

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className='text text_type_main-large' >Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={tab === 'bun'} onClick={() => moveToPosition(0)}>Булки</Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={() => moveToPosition(1)}>Соусы</Tab>
                <Tab value="main" active={tab === 'main'} onClick={() => moveToPosition(2)}>Начинки</Tab>
            </div>
            <div className={styles.scroll} ref={containerRef}>
                {filterDataByType(data).map((ingredient, i )=> {
                    if (ingredient.length !== 0) {
                        return <Ingredient ref={ref => typesRef.current[i] = ref} key={ingredient[0].type} data={ingredient} type={ingredient[0].type}/>
                    }
                    return null
                })}
            </div>
        </section>
    )
  }

export default BurgerIngredients;
