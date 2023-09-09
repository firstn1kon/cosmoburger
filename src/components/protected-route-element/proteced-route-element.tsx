import { useAppSelector } from "../../hooks/store-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData, getIsAuth } from "../../services/slices/selectors";
import { FC, ReactElement } from "react";

interface IProtecedrouteElement {
  onlyUnAuth?: boolean,
  component: ReactElement,
}

const ProtectedRouteElement: FC<IProtecedrouteElement> = ({ onlyUnAuth = false, component }) => {
  const user = useAppSelector(getUserData);
  const isCkechedAuth = useAppSelector(getIsAuth)
  const location = useLocation();

  if (!isCkechedAuth) {
    return null;
  }

  if (onlyUnAuth && user.name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user.name) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: FC<Pick<IProtecedrouteElement, "component">> = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />);
