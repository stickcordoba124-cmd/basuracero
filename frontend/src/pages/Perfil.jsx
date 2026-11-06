import { useNavigate } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior.jsx';
import { USUARIO, REPORTES } from '../data/datosDemo.js';

/* Pantalla de perfil.
   El prototipo la anunciaba en la barra inferior pero no la tenia
   disenada. Se construyo para que ninguna pestana quede sin destino. */
export default function Perfil() {
  const navegar = useNavigate();
  const mios = REPORTES.filter((r) => r.id_usuario === USUARIO.id_usuario);
  const iniciales = USUARIO.nombre.split(' ').map((p) => p[0]).join('').slice(0, 2);

  return (
    <>
      <div className="cuerpo" id="contenido">
        <header className="cabecera cabecera-oscura">
          <h1>Mi perfil</h1>
        </header>

        <div className="seccion" style={{ paddingTop: 16 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
            <span className="avatar" aria-hidden="true">{iniciales}</span>
            <div>
              <h2 style={{ marginBottom: 2 }}>{USUARIO.nombre}</h2>
              <p className="apoyo" style={{ margin: 0 }}>Ciudadano</p>
            </div>
          </div>

          <div className="fila-perfil"><span>Correo</span><span>{USUARIO.correo}</span></div>
          <div className="fila-perfil"><span>Telefono</span><span>{USUARIO.telefono}</span></div>
          <div className="fila-perfil"><span>Rol</span><span>{USUARIO.rol}</span></div>
          <div className="fila-perfil"><span>Reportes enviados</span><span>{mios.length}</span></div>

          <div style={{ marginTop: 22 }}>
            <button type="button" className="boton boton-blanco" onClick={() => navegar('/login')}>
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
