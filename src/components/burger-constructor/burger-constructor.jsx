import { useCallback, useMemo } from 'react';
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import {  addToConstructor, resetConstructor } from '../../services/slices/constructor-slice';
import { sendOrder, closeOrderModal, resetError } from '../../services/slices/order-slice';

import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';
import OrderDetails from '../order-details/order-details';
import DragHelper from './drag-helper/drag-helper';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import Error from '../error/error';

import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {

    const[{transform, background}, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(itemId) {
            dispatch(addToConstructor(itemId.data))
        },
        collect: monitor => ({
            transform: monitor.isOver() ? 'Scale(.95)' : null,
            background: monitor.isOver() ? '#171719' : null
        })
    });

    const {saucesAndMains, bun, helper} = useSelector(state => state.kit)
    const {isOrderModalOpen, isLoading, isError} = useSelector(state => state.order)
    const {number} = useSelector(state => state.order.data.order)
    const dispatch = useDispatch();

    const total = useMemo(() =>
    [...saucesAndMains,{...bun},{...bun}].reduce((acc,curr) => acc + (curr.price === undefined?  0 : curr.price), 0),
    [saucesAndMains, bun]);
    
    const dnoneOrFadeIn = saucesAndMains && bun ? styles.fadeIn : styles.dnone
    const statusButton = isLoading ? 'Оформляем ...' : 'Оформить заказ'

    const fetchOrder = () => {
        const ingredients = [...saucesAndMains, {...bun}].map(ingredient => ingredient._id)
        const dataOrder = {ingredients}
        dispatch(sendOrder(dataOrder))
    }

    const closeModal = useCallback(() =>  {
        dispatch(closeOrderModal())
        dispatch(resetConstructor())
    },[dispatch])

    const tryAgain = useCallback(() =>  {
        dispatch(resetError())
    },[dispatch])

    return (
        <section className={styles['constructor-section']} ref={dropTarget} style={{background}}>
            <div className={styles['constructor-wrapper']} style={{transform}} >
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={`${styles.top} ${dnoneOrFadeIn}`}
                />
                {helper && <DragHelper/>}
                <ul className={styles.elements}>
                    {saucesAndMains.map((data, i) => (
                        <ConstructorIngredient
                            key={data._uid}
                            index={i}
                            data={data} 
                        />
                    ))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={`${styles.top} ${dnoneOrFadeIn}`}
                />
            </div>
            <div className={styles.result}>
                <div className={styles.total}>
                    <p className="text text_type_digits-medium mr-2">{total? total : 0}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button  disabled={helper} htmlType="button" type="primary" size="large" onClick={fetchOrder}>{statusButton}</Button>
            </div>
            {isOrderModalOpen && number && <Modal close={closeModal}><OrderDetails uid={number}/></Modal>}
            {isError && <Error err={isError} tryAgain={tryAgain}/>}
        </section>
    )
}
export default BurgerConstructor

