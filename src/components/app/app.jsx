import { useEffect, useState  } from 'react';
import { getAllIngredients } from '../../utils/api';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

function App() {
  
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  
  useEffect(()=> {
    loadIngredients();
    // eslint-disable-next-line
  },[]);

  const loadIngredients = () => {
    setError(false);
    getAllIngredients()
    .then(data => {
      setLoading(false)
      setData(data)
    })
    .catch(e => {
      setLoading(false)
      setError(e.message);
      console.log(e)
    })
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

