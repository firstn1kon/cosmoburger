import { useCallback, useMemo } from 'react';
import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  addToConstructor, resetConstructor } from '../../services/slices/constructor-slice';
import { sendOrder, closeOrderModal, resetError } from '../../services/slices/order-slice';
import { getSaucesAndMains, getBun, getHelper, getIsOrderModalOpen, 
         getIsLoadingOrder, getIsErrorOrder, getNumberOrder, getUserName } from '../../services/slices/selectors';
import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';
import OrderDetails from '../order-details/order-details';
import DragHelper from './drag-helper/drag-helper';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import Error from '../error/error';
import Spinner from '../spinner/spinner';

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

    const saucesAndMains = useSelector(getSaucesAndMains)
    const bun = useSelector(getBun)
    const helper = useSelector(getHelper)
    const isOrderModalOpen = useSelector(getIsOrderModalOpen)
    const isLoading = useSelector(getIsLoadingOrder)
    const isError = useSelector(getIsErrorOrder)
    const numberOrder = useSelector(getNumberOrder)
    const user = useSelector(getUserName)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const total = useMemo(() =>
    [...saucesAndMains,{...bun},{...bun}].reduce((acc,curr) => acc + (curr.price === undefined?  0 : curr.price), 0),
    [saucesAndMains, bun]);
    
    const dnoneOrFadeIn = saucesAndMains && bun ? styles.fadeIn : styles.dnone
    const statusButton = isLoading ? <Spinner modal={false} loadText='Оформляем'/> : 'Оформить заказ'

    const fetchOrder = () => {
        if(!user) return navigate('/login')
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
                <Button  disabled={helper || isLoading} htmlType="button" type="primary" size="large" onClick={fetchOrder}>{statusButton}</Button>
            </div>
            {isOrderModalOpen && numberOrder && <Modal close={closeModal}><OrderDetails uid={numberOrder}/></Modal>}
            {isError && <Error err={isError} tryAgain={tryAgain}/>}
        </section>
    )
}
export default BurgerConstructor

