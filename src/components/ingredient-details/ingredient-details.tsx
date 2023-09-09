import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredients, getIsLoadingIngredients } from '../../services/slices/selectors';
import { NotFoundPage } from '../../pages';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks/store-hooks';
import styles from './ingredient-details.module.css'


const IngredientDetails = () => {

    const {ingredientId} = useParams()
    const ingredients= useAppSelector(getIngredients)
    const isLoading= useAppSelector(getIsLoadingIngredients)

    const  data = useMemo(() => ingredients.find((ingredient) => ingredient._id === ingredientId),[ingredientId, ingredients])

    if (!data && !isLoading) return <NotFoundPage/>
    if (isLoading) return <Spinner/>

    return (
        <div className={styles.wrapper}>
            <img src={data?.image_large} alt={'dd'}></img>
            <h2 className='text text_type_main-medium mt-4'>{data?.name}</h2>
            <ul className={`${styles.details} mt-8 mb-15 text_color_inactive`}>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Калории,ккал</h3>
                    <p className='text text_type_digits-default'>{data?.calories}</p>
                </li>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Белки, г</h3>
                    <p className='text text_type_digits-default'>{data?.proteins}</p>
                </li>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Жиры, г</h3>
                    <p className='text text_type_digits-default'>{data?.fat}</p>
                </li>
                <li className={styles.item}>
                    <h3 className=' text text_type_main-default'>Углеводы, г</h3>
                    <p className='text text_type_digits-default'>{data?.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails

