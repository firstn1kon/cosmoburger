import styles from "./order-ws-details.module.css"

const Skeleton = () => {
    return (
        <div className={`${styles.wrapper} fadeIn`}>
            <div className={`${styles.number} ${styles.skeleton}`}></div>
            <div className={`${styles.name} ${styles.skeleton} mb-3`}></div>
            <div className={`${styles.status} ${styles.skeleton}`}></div>
            <div className={`${styles.composition} ${styles.skeleton}`}></div>
            <div className={styles.ingredients}>
                <div className={`${styles.ingredient}`}>
                    <div className={`${styles.image} ${styles.skeleton}`}></div>
                    <div className={`${styles.grow} ${styles.desc} ${styles.skeleton}`}></div>
                    <div className={`${styles.price} ${styles.skeleton}`}></div>
                </div>
                <div className={styles.ingredient}>
                    <div className={`${styles.image} ${styles.skeleton}`}></div>
                    <div className={`${styles.grow} ${styles.desc} ${styles.skeleton}`}></div>
                    <div className={`${styles.price} ${styles.skeleton}`}></div>
                </div>
                <div className={styles.ingredient}>
                    <div className={`${styles.image} ${styles.skeleton}`}></div>
                    <div className={`${styles.grow} ${styles.desc} ${styles.skeleton}`}></div>
                    <div className={`${styles.price} ${styles.skeleton}`}></div>
                </div>
                <div className={styles.ingredient}>
                    <div className={`${styles.image} ${styles.skeleton}`}></div>
                    <div className={`${styles.grow} ${styles.desc} ${styles.skeleton}`}></div>
                    <div className={`${styles.price} ${styles.skeleton}`}></div>
                </div>
            </div>
            <div className={`${styles.bottom} mt-10`}>
                <div className={`${styles.date} ${styles.skeleton}`}></div>
                <div className={`${styles.total} ${styles.skeleton}`}></div>
            </div>
        </div>
    )
}

export default Skeleton