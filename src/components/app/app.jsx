import { Component } from 'react';

import { data } from '../../utils/data';
import { cartData } from '../../utils/constructor';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends Component {
  render() {
    return (
      <>
        <AppHeader/>
        <main>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={cartData}/>
        </main>
      </>
    )
  }
}

export default App;

