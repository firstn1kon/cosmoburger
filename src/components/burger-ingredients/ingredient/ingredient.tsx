import { ForwardedRef, forwardRef, FC } from 'react';
import { IBasicIngredient, TypesMenu } from '../../../utils/types/common.types';
import ViewIngredient from './view-ingredient/view-ingredient';
import styles from '../burger-ingredients.module.css'

interface ICurrentSection {
    data: IBasicIngredient[],
    type: TypesMenu,
    ref: ForwardedRef<HTMLHeadingElement>
}

const Ingredient: FC <ICurrentSection> = forwardRef(({data, type}, ref) => {

    let titleType;

    switch (type) {
        case TypesMenu.BUN:
            titleType = 'Булки'
            break;
        case TypesMenu.MAIN:
            titleType = 'Начинки';
            break;
        case TypesMenu.SAUCE:
            titleType = 'Соусы';
            break;
        default: titleType = 'Булка' 
    };
    return (
        <>
            <h2 id={type} ref={ref} className={`${styles.title} text text_type_main-medium`}>{titleType}</h2>
            <ul className={styles.wrapper}>
                {data.map(ingredient => <ViewIngredient key={ingredient._id} data={ingredient}/>)}
            </ul>
        </>
    )
})

export default Ingredient