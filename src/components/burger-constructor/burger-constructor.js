import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
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
                    <li className={styles.item}>
                        <div className={styles.wrapper}>
                            <DragIcon type="primary"/>
                            <ConstructorElement 
                                text="Говяжий метеорит (отбивная)" 
                                price={3000} 
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-04-mobile.png'}
                            />
                        </div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.wrapper}>
                            <DragIcon type="primary"/>
                            <ConstructorElement 
                                text="Биокотлета из марсианской Магнолии" 
                                price={424} 
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-01-mobile.png'}
                            />
                        </div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.wrapper}>
                            <DragIcon type="primary"/>
                            <ConstructorElement 
                                text="Говяжий метеорит (отбивная)" 
                                price={3000} 
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-04-mobile.png'}
                            />
                        </div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.wrapper}>
                            <DragIcon type="primary"/>
                            <ConstructorElement 
                                text="Биокотлета из марсианской Магнолии" 
                                price={424} 
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-01-mobile.png'}
                            />
                        </div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.wrapper}>
                            <DragIcon type="primary"/>
                            <ConstructorElement 
                                text="Говяжий метеорит (отбивная)" 
                                price={3000} 
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-04-mobile.png'}
                            />
                        </div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.wrapper}>
                            <DragIcon type="primary"/>
                            <ConstructorElement 
                                text="Биокотлета из марсианской Магнолии" 
                                price={424} 
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-01-mobile.png'}
                            />
                        </div>
                    </li>
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
                    <p className="text text_type_digits-medium mr-2">12345</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}
export default BurgerConstructor