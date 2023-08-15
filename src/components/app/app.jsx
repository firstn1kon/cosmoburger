import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsFetch, closeIngredientModal, dataViewingIngredient } from '../../services/slices/main-slice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {
  const {isLoading, isError, isIngredientModalOpen} = useSelector(state => state.main)
  const pickIngredient = useSelector(dataViewingIngredient)
  const dispatch = useDispatch();  

  useEffect(()=> {
    dispatch(ingredientsFetch())
    // eslint-disable-next-line
  },[]);

  const closeModal = useCallback(() =>  {
    dispatch(closeIngredientModal())
},[dispatch])

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
        {isIngredientModalOpen && pickIngredient && 
        <Modal  title={'Детали ингредиента'} close={closeModal}><IngredientDetails data={pickIngredient}/></Modal>
        }
      </>
    )
}

export default App;

