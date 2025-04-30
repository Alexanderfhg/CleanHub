// components/PrivateRoute.js
import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const PrivateRoute = ({ roles = [] }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Puedes agregar un spinner de carga aquí
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirige a login si no hay usuario, guardando la ubicación previa
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica roles si se especifican
  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirige a página no autorizada si no tiene el rol necesario
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está bien, renderiza los componentes hijos
  return <Outlet />;
};

export default PrivateRoute;