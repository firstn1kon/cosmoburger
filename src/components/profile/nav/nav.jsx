import { NavLink } from 'react-router-dom'
import { logoutUser } from '../../../services/slices/user-slice'
import styles from '../profile.module.css'
import { useDispatch } from 'react-redux'

const Nav = () => {

    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
    }
    return (
        <nav className={styles.nav}>
            <ul className={styles.menu}>
                <li className="text text_type_main-medium pb-4 pt-4">
                    <NavLink  end to='/profile'  className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        Профиль
                    </NavLink>
                </li>
                <li className="text text_type_main-medium pb-4 pt-4">
                    <NavLink end  to='/profile/orders' className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        История заказов
                    </NavLink>
                </li>
                <li className="text text_type_main-medium pb-4 pt-4">
                    <a href="/" onClick={logout} className={styles.link}>Выход</a>
                </li>
            </ul>
            <p className={`${styles.info} text text_type_main-default mt-20`}>В этом разделе вы можете<br/> изменить свои персональные данные</p>
        </nav>       
    )
}

export default Nav


