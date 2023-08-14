import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import styles from '../burger-constructor.module.css'

const ConstructorIngredient = ({text, _uid, price, thumbnail, handleClose, index, moveCard}) => {

    const ref = useRef(null)

    const[{opacity, classDrop}, dragRef] = useDrag({
        type: 'ingredients-constructor',
        item: {_uid, index},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 1 : 1,
            classDrop: monitor.isDragging() ? styles.drop : null
        })
    });

    const [{ handlerId }, dropTraget] = useDrop({
        accept: 'ingredients-constructor',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          
          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
        },
      })

      dragRef(dropTraget(ref))
    return (
        <li className={`${styles.item}`} key={_uid}  style={{opacity}} data-handler-id={handlerId}>
            <div className={styles.wrapper} ref={ref}>
                <DragIcon type="primary"/>
                <ConstructorElement 
                    text={text} 
                    price={price} 
                    thumbnail={thumbnail}
                    handleClose={() => handleClose(_uid)}
                    extraClass={classDrop}
                />
            </div>
        </li>
    )
}

export default ConstructorIngredient