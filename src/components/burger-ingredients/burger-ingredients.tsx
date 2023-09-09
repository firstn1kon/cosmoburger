import { useCallback, useEffect, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { setCurrentTab } from '../../services/slices/ingredients-slice';
import { getIngredients, getCurrentTab } from '../../services/slices/selectors';
import { IBasicIngredient, TypesMenu } from '../../utils/types/common.types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from './ingredient/ingredient';
import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {

    const data = useAppSelector(getIngredients)
    const tab = useAppSelector(getCurrentTab)
    const dispatch = useAppDispatch()
    const containerRef = useRef<HTMLDivElement>(null);
    const typesRef = useRef<HTMLHeadingElement[]>([]);

    useEffect(()=> {
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dispatch(setCurrentTab((entry.target.id)));
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
            if (types) types.forEach(() => observer.disconnect())
            observer.disconnect()
        }
    })

    const filterDataByType = useCallback((data: IBasicIngredient[]) : IBasicIngredient[][]  => {
        const buns = data.filter(buns => buns.type === 'bun');
        const main = data.filter(main => main.type === 'main');
        const sauces = data.filter(sauce => sauce.type === 'sauce');
        return [buns, sauces, main];
        // eslint-disable-next-line
    },[data]);

    const moveToPosition = (value: string) => {
        typesRef.current.forEach(type => {
            if(type.id === value) type.scrollIntoView({behavior: "smooth"}) 
        })
    }

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={tab === 'bun'} onClick={moveToPosition}>Булки</Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={moveToPosition}>Соусы</Tab>
                <Tab value="main" active={tab === 'main'} onClick={moveToPosition}>Начинки</Tab>
            </div>
            <div className={styles.scroll} ref={containerRef}>
                {filterDataByType(data).map((ingredient, i )=> {
                    if (ingredient.length !== 0) {
                        const preparedData: {data: IBasicIngredient[], type: TypesMenu} = {
                            data: ingredient,
                            type: ingredient[0].type
                        }
                        return <Ingredient 
                            ref={ref => typesRef.current[i] = ref as HTMLHeadingElement} 
                            key={preparedData.type} 
                            {...preparedData}/>
                    }
                    return null
                })}
            </div>
        </section>
    )
  }

export default BurgerIngredients;
