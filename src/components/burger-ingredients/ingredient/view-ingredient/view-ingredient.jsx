import { ingredientPropType } from '../../../../utils/prop-types';
import { useDrag } from "react-dnd";
import { useSelector} from 'react-redux';
import {createSelector } from "@reduxjs/toolkit";

import useModal from '../../../../hooks/use-modal';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../../../ingredient-details/ingredient-details';

import styles from '../../burger-ingredients.module.css'

const ViewIngredient = ({data}) => {

    const countIngredient = createSelector(
        (state) => state.main.constructor,
        (ingredients) => ingredients.filter(item => item._id === data._id).length 
    )

    const count = useSelector(countIngredient)




    
    // const pre = useSelector(state =>  state.main.constructor)
    // const count =  data.type === 'bun' ? pre.filter(item => item._id === data._id).length * 2 : pre.filter(item => item._id === data._id).length

    const {image, price, name} = data;
    const {renderModal, openModal} = useModal({title: 'Детали ингредиента', Component: <IngredientDetails data={data}/>});

    const[{opacity}, dragRef] = useDrag({
        type: 'ingredients',
        item: {data},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.2 : 1
        })
    });

    return (
        <>
            <li className={styles.item} onClick={openModal} ref={dragRef} style={{opacity}}>
                <img src={image} alt={name}></img>
                <div className={styles.currency}><p className='text text_type_digits-default'>{price}</p> <CurrencyIcon type="primary" /></div>
                <p className={styles.description}>{name}</p>
                <Counter count={data.type === 'bun' ? count * 2: count} size="default" extraClass="m-1"/>
            </li>
            {renderModal}
        </>
    )
}

export default ViewIngredient

ViewIngredient.propTypes = {
    data: ingredientPropType.isRequired
}