import { Navigate } from 'react-router-dom';
import { useSesion } from '../../context/SesionContext.jsx';

/* Protege las pantallas que necesitan una sesion abierta.
   Antes el usuario salia fijo del archivo de datos, asi que se podia
   escribir /inicio en la barra de direcciones sin haber entrado. */
export default function RutaPrivada({ rol, children }) {
  const { usuario } = useSesion();
  if (!usuario) return <Navigate to="/login" replace />;
  if (rol && usuario.rol !== rol) return <Navigate to="/inicio" replace />;
  return children;
}
