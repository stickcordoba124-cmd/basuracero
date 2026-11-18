import { Routes, Route } from 'react-router-dom';
import Marco from './components/basuracero/Marco.jsx';
import RutaPrivada from './components/basuracero/RutaPrivada.jsx';
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
import NoEncontrado from './pages/NoEncontrado.jsx';

/* Rutas de la aplicacion.
   Siguen el mapa de navegacion aprobado en la evidencia
   GA5-220501095-AA1-EV05:

   Nivel 0  splash, login, registro
   Nivel 1  inicio
   Nivel 2  nuevo reporte, mapa, mis reportes
   Nivel 3  detalle del caso
   Flujo alterno  panel del funcionario

   Las pantallas posteriores al inicio de sesion van envueltas en
   RutaPrivada, que devuelve al login si no hay sesion abierta.
   La ultima ruta muestra la pantalla de direccion no encontrada.
*/
const privada = (elemento, rol) => <RutaPrivada rol={rol}>{elemento}</RutaPrivada>;

export default function App() {
  return (
    <>
      <a className="salto-contenido" href="#contenido">Saltar al contenido</a>
      <Marco>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inicio" element={privada(<Inicio />)} />
          <Route path="/nuevo-reporte" element={privada(<NuevoReporte />)} />
          <Route path="/confirmacion" element={privada(<Confirmacion />)} />
          <Route path="/mapa" element={privada(<Mapa />)} />
          <Route path="/detalle/:id" element={privada(<Detalle />)} />
          <Route path="/mis-reportes" element={privada(<MisReportes />)} />
          <Route path="/perfil" element={privada(<Perfil />)} />
          <Route path="/panel" element={privada(<PanelFuncionario />, 'funcionario')} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </Marco>
    </>
  );
}
