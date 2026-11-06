import { NavLink, useNavigate, useLocation } from 'react-router-dom';

/* Barra de navegacion inferior con las cuatro pestanas del prototipo.
   El boton flotante no aparece dentro de Nuevo reporte, porque ahi
   el usuario ya esta creando uno. */
const PESTANAS = [
  { ruta: '/inicio', texto: 'Inicio', icono: '⌂' },
  { ruta: '/mapa', texto: 'Mapa', icono: '▦' },
  { ruta: '/mis-reportes', texto: 'Historial', icono: '◴' },
  { ruta: '/perfil', texto: 'Perfil', icono: '☺' },
];

export default function BarraInferior() {
  const navegar = useNavigate();
  const lugar = useLocation();
  const mostrarFlotante = lugar.pathname !== '/nuevo-reporte';

  return (
    <nav className="barra-inferior" aria-label="Navegacion principal">
      {mostrarFlotante && (
        <button
          type="button"
          className="boton-flotante"
          onClick={() => navegar('/nuevo-reporte')}
          aria-label="Crear un nuevo reporte"
        >
          +
        </button>
      )}
      {PESTANAS.map((p) => (
        <NavLink key={p.ruta} to={p.ruta} className="pestana">
          <span aria-hidden="true" style={{ fontSize: 18 }}>{p.icono}</span>
          {p.texto}
        </NavLink>
      ))}
    </nav>
  );
}
