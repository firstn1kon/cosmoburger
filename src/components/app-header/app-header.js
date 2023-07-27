import { Component } from 'react';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'

class AppHeader extends Component {
  render() {
    return (
        <header className={styles.header}>
          <nav className={`${styles.nav} p-4`}>
            <ul className={`${styles.menu} text text_type_main-default`}>
              <li>
                <a href='/' className={styles.link}><BurgerIcon type="primary"/> <span className={`${styles.active} ml-2`}>Конструктор</span></a>
              </li>
              <li>
                <a href='/' className={styles.link}><ListIcon type="secondary" /><span className='ml-2'>Лента заказов</span></a>
              </li>
            </ul>
            <a href="/" className={styles.logo}><Logo/></a>
            <a href="/" className={styles.link}><ProfileIcon type="secondary" /><span className='ml-2  text text_type_main-default'>Личный кабинет</span></a>
          </nav>
        </header>
    )
  }
}
export default AppHeader;
