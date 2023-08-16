import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsFetch} from '../../services/slices/ingredients-slice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

function App() {

  const { isLoading, isError } = useSelector(state => state.ingredients)
  const dispatch = useDispatch();  

  useEffect(()=> {
    dispatch(ingredientsFetch())
    // eslint-disable-next-line
  },[]);

    return (
      <>
        {isError && <Error err={isError} reload={true}/>}
        {isLoading && <Spinner/>}
        <AppHeader/>
        <main>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        </main>

      </>
    )
}

export default App;