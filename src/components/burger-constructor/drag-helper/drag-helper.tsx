import styles from "../burger-constructor.module.css"

import ingrediens from '../../../images/ingredients.svg'

const DragHelper = () => {
    return (
        <div className={styles.helper}>
            <p className="text text_type_main-medium">Перетащите сюда булки, соусы и начинки</p>
            <img className="mt-15" src={ingrediens} alt="собери свой бургер"></img>
        </div>
    )
}

export default DragHelper