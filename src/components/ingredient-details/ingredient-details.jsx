import { ingredientPropType } from '../../utils/prop-types';

import styles from './ingredient-details.module.css'

const IngredientDetails = ({data}) => {
    const {name, fat, calories, carbohydrates, proteins, image_large} = data

    return (
        <div className={styles.wrapper}>
            <img src={image_large} alt={'dd'}></img>
            <h2 className='text text_type_main-medium mt-4'>{name}</h2>
            <ul className={`${styles.details} mt-8 mb-15 text_color_inactive`}>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Калории,ккал</h3>
                    <p className='text text_type_digits-default'>{calories}</p>
                </li>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Белки, г</h3>
                    <p className='text text_type_digits-default'>{proteins}</p>
                </li>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Жиры, г</h3>
                    <p className='text text_type_digits-default'>{fat}</p>
                </li>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Углеводы, г</h3>
                    <p className='text text_type_digits-default'>{carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails

IngredientDetails.propTypes = {
    data: ingredientPropType.isRequired
}