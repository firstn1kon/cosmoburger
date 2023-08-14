import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { addToConstructor } from '../../services/slices/main-slice';
import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';
import useModal from '../../hooks/use-modal';
import OrderDetails from '../order-details/order-details';
import DragHelper from './drag-helper/drag-helper';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {

    const {saucesAndMains, bun, helper} = useSelector(state => state.main.constructor)
    const dispatch = useDispatch();
    
    const {renderModal, openModal} = useModal({Component: <OrderDetails uid="034536"/>})

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

    const total = [...saucesAndMains,{...bun},{...bun}].reduce((acc,curr) => acc + (curr.price === undefined?  0 : curr.price), 0);
    const dnone = saucesAndMains && bun ? styles.fadeIn : styles.dnone

    return (
        <section className={styles['constructor-section']} ref={dropTarget} style={{background}}>
            <div className={styles['constructor-wrapper']} style={{transform}} >
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={`${styles.top} ${dnone}`}
                />
                {helper && <DragHelper/>}
                <ul className={styles.elements}>
                    {saucesAndMains.map(({name, _uid, price, image_mobile}, i) => (
                        <ConstructorIngredient
                            key={_uid}
                            _uid={_uid}
                            text={name}
                            index={i} 
                            price={price} 
                            thumbnail={image_mobile}
                        />
                    ))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={`${styles.top} ${dnone}`}
                />
            </div>
            <div className={styles.result}>
                <div className={styles.total}>
                    <p className="text text_type_digits-medium mr-2">{total? total : 0}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button  disabled={helper} htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
                {renderModal}
            </div>
        </section>
    )
}
export default BurgerConstructor

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
};