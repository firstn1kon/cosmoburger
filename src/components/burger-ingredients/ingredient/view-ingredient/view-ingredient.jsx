import useModal from '../../../../hooks/use-modal';
import { viewIngredientPropTypes } from '../../../../utils/prop-types';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../../../ingredient-details/ingredient-details';

import styles from '../../burger-ingredients.module.css'

const ViewIngredient = ({data}) => {

    const {image, price, name} = data;
    const {renderModal, openModal} = useModal({title: 'Детали ингредиента', Component: <IngredientDetails {...data}/>});

    return (
        <>
            <li className={styles.item} onClick={openModal}>
                <img src={image} alt={name}></img>
                <div className={styles.currency}><p className='text text_type_digits-default'>{price}</p> <CurrencyIcon type="primary" /></div>
                <p className={styles.description}>{name}</p>
                <Counter count={0} size="default" extraClass="m-1"/>
            </li>
            {renderModal}
        </>
    )
}

export default ViewIngredient

ViewIngredient.propTypes = viewIngredientPropTypes