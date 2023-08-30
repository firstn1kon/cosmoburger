import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData, getIsAuth } from "../../services/slices/selectors";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(getUserData);
  const isCkechedAuth = useSelector(getIsAuth)
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
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
