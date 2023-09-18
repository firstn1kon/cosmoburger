import {Routes, Route, useLocation, useNavigate}from "react-router-dom";
import { MainPage, NotFoundPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileOrdersPage, FeedPage } from "../../pages";
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/proteced-route-element";
import { useAppDispatch } from "../../hooks/store-hooks";
import { fetchUser,  checkAuth} from "../../services/slices/user-slice";
import { useEffect, useCallback } from "react";
import { ingredientsFetch } from "../../services/slices/ingredients-slice";
import { checkRefreshOrAccessTokens } from "../../utils/utils";
import AppHeader from '../app-header/app-header';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const background = location.state && location.state.modal;
    const navigate = useNavigate()

    const closeModal = useCallback(() =>  {
      navigate(-1)
    },[navigate])

    useEffect(()=> {
      if(checkRefreshOrAccessTokens()) {
          dispatch(fetchUser())
      }
      else {
          dispatch(checkAuth())
      }
      dispatch(ingredientsFetch())
      // eslint-disable-next-line
    },[])

      return (
        <>
          <AppHeader/>
          <main>
            <Routes location={background || location}>
              <Route/>
              <Route path="/" element={<MainPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
              <Route path="/feed" element={<FeedPage/>}/>
              <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
              <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>}/>}/> 
              <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>}/>}/> 
              <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>}/>}/>
              <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>}/>}/> 
              <Route path="profile/orders" element={<OnlyAuth component={<ProfileOrdersPage/>}/>}/>
              <Route path="ingredients/:ingredientId" element={<IngredientDetails/>}/>
            </Routes>
            {background && (
              <Routes>
                <Route path="/ingredients/:ingredientId" 
                  element={<Modal  title={'Детали ингредиента'} close={closeModal}><IngredientDetails/></Modal>}/>
              </Routes>
            )}
          </main>
        </>
      )
    }

export default App;