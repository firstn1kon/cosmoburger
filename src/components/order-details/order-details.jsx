import { orderDetailsPropTypes } from '../../utils/prop-types'

import done from '../../images/done.svg'

import styles from './order-details.module.css'

const OrderDetails = ({uid}) => {
    
    return (
        <div className={styles.wrapper}>
            <h2 className='text text_type_digits-large'>{uid}</h2>
            <span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
            <img className="mt-15 mb-15" src={done} alt="success" />
            <span className='text text_type_main-default'>
                Ваш заказ начали готовить
                <p className='text text_type_main-default text_color_inactive mt-2 mb-25'>Дождитесь готовности на орбитальной станции</p>
            </span>
        </div>
    )
}

export default OrderDetails

OrderDetails.propTypes = orderDetailsPropTypes