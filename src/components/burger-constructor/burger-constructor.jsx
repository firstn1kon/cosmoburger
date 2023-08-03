import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

import useModal from '../../hooks/use-modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

const BurgerConstructor = ({data}) => {
    
    const {renderModal, openModal} = useModal({Component: <OrderDetails uid="034536"/>})
  
    const saucesAndMains = data.filter(item => item.type !== 'bun')
    const bun = data.find(item => item.type === 'bun')
    const total = [...saucesAndMains,{...bun},{...bun}].reduce((acc,curr) => acc + curr.price, 0);

    return (
        <section className={styles['constructor-section']}>
            <div className={styles['constructor-wrapper']}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image_mobile}
                    extraClass={styles.top}
                />
                <ul className={styles.elements}>
                    {saucesAndMains.map(({name, _id, price, image_mobile}) => (
                        <li className={styles.item} key={_id}>
                            <div className={styles.wrapper}>
                                <DragIcon type="primary"/>
                                <ConstructorElement 
                                    text={name} 
                                    price={price} 
                                    thumbnail={image_mobile}
                                />
                            </div>
                        </li>
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
    data: PropTypes.arrayOf(ingredientPropType).isRequired
};