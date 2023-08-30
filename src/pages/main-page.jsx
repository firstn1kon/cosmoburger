import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from 'react-redux';
import { getIsLoadingIngredients } from "../services/slices/selectors";
import { getIsErrorIngredients } from "../services/slices/selectors";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Spinner from "../components/spinner/spinner";
import Error from "../components/error/error";

export const MainPage = () => {

    const isLoading = useSelector(getIsLoadingIngredients)
    const isError = useSelector(getIsErrorIngredients)

    return (
        <DndProvider backend={HTML5Backend}>
            {isError && <Error err={isError} reload={true}/>}
            {isLoading && <Spinner/>}
            <div className="main-wrapper">
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </DndProvider>
    )
}