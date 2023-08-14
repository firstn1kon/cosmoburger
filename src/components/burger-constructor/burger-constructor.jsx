import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { addToConstructor, deleteFromConstructor, sortInConstrucor } from '../../services/slices/main-slice';
import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';
import useModal from '../../hooks/use-modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {

    const data = useSelector(state => state.main.constructor)


    const dispatch = useDispatch();
    
    const {renderModal, openModal} = useModal({Component: <OrderDetails uid="034536"/>})

    const[{isHover}, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(itemId) {
            dispatch(addToConstructor(itemId.data))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
  
    const saucesAndMains = data.filter(item => item.type !== 'bun')
    const bun = data.find(item => item.type === 'bun')
    const total = [...saucesAndMains,{...bun},{...bun}].reduce((acc,curr) => acc + curr.price, 0);

    const deleteIngredient = (uid) => {
        dispatch(deleteFromConstructor(uid))
    }

    const moveCard = (dragIndex, hoverIndex) => {
        dispatch(sortInConstrucor({dragIndex, hoverIndex}))
      }

    return (
        <section className={styles['constructor-section']}>
            <div className={styles['constructor-wrapper']} style={{transform: isHover? 'Scale(1.05)' : null}} ref={dropTarget}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={styles.top}
                />
                <ul className={styles.elements}>
                    {saucesAndMains.map(({name, _uid, price, image_mobile}, i) => (
                        <ConstructorIngredient
                            key={_uid}
                            text={name}
                            index={i} 
                            price={price} 
                            thumbnail={image_mobile}
                            moveCard={moveCard}
                            handleClose={() => deleteIngredient(_uid)}
                        />
                        // <li className={styles.item} key={_uid}>
                        //     <div className={styles.wrapper}>
                        //         <DragIcon type="primary"/>
                        //         <ConstructorElement 
                        //             text={name} 
                        //             price={price} 
                        //             thumbnail={image_mobile}
                        //             handleClose={() => deleteIngredient(_uid)}
                        //         />
                        //     </div>
                        // </li>
                    ))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={styles.top}
                />
            </div>
            <div className={styles.result}>
                <div className={styles.total}>
                    <p className="text text_type_digits-medium mr-2">{total? total : 0}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
                {renderModal}
            </div>
        </section>
    )
}
export default BurgerConstructor

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
};