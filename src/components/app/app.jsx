import { useEffect, useState  } from 'react';
import useApiBurger from '../../hooks/use-api-burger-hook';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

function App() {
  
  const [data, setData] = useState([]);
  const {getAllIngredients, isError, isLoading} = useApiBurger();
  
  useEffect(()=> {
    loadIngredients();
    // eslint-disable-next-line
  },[]);

  const loadIngredients = () => {
    getAllIngredients()
    .then(data => setData(data))
    .catch(e => console.log(e))
  };

    return (
      <>
        {isError && <Error err={isError}/>}
        {isLoading && <Spinner/>}
        <AppHeader/>
        <main>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </main>
      </>
    )
}

export default App;

