import { MouseEvent } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/store-hooks'
import { getUserName } from '../../services/slices/selectors'
import { regexProfileUrl, regexFeedeUrl } from '../../utils/utils'
import { Logo, BurgerIcon, ListIcon, ProfileIcon, LogoutIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { logoutUser } from '../../services/slices/user-slice'
import styles from './app-header.module.css'

const AppHeader = () => {

  const {pathname} = useLocation();
  const user = useAppSelector(getUserName)
  const dispatch = useAppDispatch()

  const showUserName= user ? user : 'Личный кабинет'

  const logout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(logoutUser())
}

    return (
        <header className={styles.header}>
          <nav className={`${styles.nav} p-4`}>
            <ul className={`${styles.menu} text text_type_main-default`}>
              <li>
                <NavLink to='/'  className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                  <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/> 
                    <span className="ml-2 text text_type_main-default">Конструктор</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/feed'  className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                  <ListIcon type={regexFeedeUrl.test(pathname) ? 'primary' : 'secondary'} />
                    <span className='ml-2 text text_type_main-default'>Лента заказов</span>
                </NavLink>
              </li>
            </ul>
            <Link to='/' ><div className={styles.logo}><Logo/></div></Link>
            <ul className={`${styles.menu} text text_type_main-default`}>
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                  <ProfileIcon type={regexProfileUrl.test(pathname) ? 'primary' : 'secondary'} />
                    <span className='ml-2  text text_type_main-default'>{showUserName}</span>
                </NavLink>
              </li>
              {user 
                ? <li style={{position: "relative"}}>
                    <button onClick={logout} className={styles.logout}><LogoutIcon type="secondary"/></button>
                  </li>
                : null
              }
            </ul>
          </nav>
        </header>
    )
}

export default AppHeader;
