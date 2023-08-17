import { ingredientPropType } from '../../../../utils/prop-types';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from "@reduxjs/toolkit";
import { openIngredientModal, setViewIngredient } from '../../../../services/slices/ingredients-slice';
import { getBun, getSaucesAndMains } from '../../../../services/slices/selectors';


import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../../burger-ingredients.module.css'

const ViewIngredient = ({data}) => {

    const {image, price, name} = data;

    const countIngredient = createSelector(
        getSaucesAndMains,
        getBun,
        (ingredients, bun) => data.type === 'bun' && bun._id ===  data._id? 2 : ingredients.filter(item => item._id === data._id).length 
    )

    const count = useSelector(countIngredient)
    const dispatch = useDispatch()

    const[{opacity}, dragRef] = useDrag({
        type: 'ingredients',
        item: {data},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.2 : 1
        })
    });

    const openModal = () => {
        dispatch(openIngredientModal())
        dispatch(setViewIngredient(data._id))
    }

    return (
        <>
            <li className={styles.item} onClick={openModal} ref={dragRef} style={{opacity}}>
                <img src={image} alt={name}></img>
                <div className={styles.currency}><p className='text text_type_digits-default'>{price}</p> <CurrencyIcon type="primary" /></div>
                <p className={styles.description}>{name}</p>
                {count ? <Counter count={count} size="default" extraClass="m-1"/> : null}
            </li>
        </>
    )
}

export default ViewIngredient

ViewIngredient.propTypes = {
    data: ingredientPropType.isRequired
}