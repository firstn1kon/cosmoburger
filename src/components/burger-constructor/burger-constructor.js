import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

const BurgerConstructor = ({data}) => {
    
    const total = data.reduce((acc,curr) => acc + curr.price, 0);

    return (
        <section style={{paddingTop: '100px'}}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
                    extraClass={styles.top}
                />
                <ul className={styles.elements}>
                    {data.map(({name, _uid, price, image_mobile}) => (
                        <li className={styles.item} key={_uid}>
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
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
                    extraClass={styles.top}
                />
            </div>
            <div className={styles.result}>
                <div className={styles.total}>
                    <p className="text text_type_digits-medium mr-2">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}
export default BurgerConstructor