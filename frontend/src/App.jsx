import { Routes, Route, Navigate } from 'react-router-dom';
import Marco from './components/Marco.jsx';
import Splash from './pages/Splash.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Inicio from './pages/Inicio.jsx';
import NuevoReporte from './pages/NuevoReporte.jsx';
import Confirmacion from './pages/Confirmacion.jsx';
import Mapa from './pages/Mapa.jsx';
import Detalle from './pages/Detalle.jsx';
import MisReportes from './pages/MisReportes.jsx';
import Perfil from './pages/Perfil.jsx';
import PanelFuncionario from './pages/PanelFuncionario.jsx';

/* Rutas de la aplicacion.
   Siguen el mapa de navegacion aprobado en la evidencia
   GA5-220501095-AA1-EV05:

   Nivel 0  splash, login, registro
   Nivel 1  inicio
   Nivel 2  nuevo reporte, mapa, mis reportes
   Nivel 3  detalle del caso
   Flujo alterno  panel del funcionario
*/
export default function App() {
  return (
    <>
      <a className="salto-contenido" href="#contenido">Saltar al contenido</a>
      <Marco>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/nuevo-reporte" element={<NuevoReporte />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/mis-reportes" element={<MisReportes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/panel" element={<PanelFuncionario />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Marco>
    </>
  );
}
