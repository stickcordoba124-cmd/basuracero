import { useNavigate } from 'react-router-dom';
import BarraInferior from '../components/basuracero/BarraInferior.jsx';
import Boton from '../components/comunes/Boton.jsx';
import { Cargando, ErrorCarga } from '../components/comunes/Estados.jsx';
import usePeticion from '../hooks/usePeticion.js';
import { useSesion } from '../context/SesionContext.jsx';
import { listarMisReportes } from '../api/reportesApi.js';

/* Pantalla de perfil.
   El prototipo la anunciaba en la barra inferior pero no la tenia
   disenada. Se construyo para que ninguna pestana quede sin destino. */
export default function Perfil() {
  const navegar = useNavigate();
  const { usuario, cerrarSesion } = useSesion();
  const mios = usePeticion(() => listarMisReportes(usuario.id_usuario), [usuario.id_usuario]);
  const iniciales = usuario.nombre.split(' ').map((p) => p[0]).join('').slice(0, 2);

  function salir() {
    cerrarSesion();
    navegar('/login', { replace: true });
  }

  return (
    <>
      <div className="cuerpo" id="contenido">
        <header className="cabecera cabecera-oscura">
          <h1>Mi perfil</h1>
        </header>

        <div className="seccion seccion-lista">
          <div className="fila-avatar">
            <span className="avatar" aria-hidden="true">{iniciales}</span>
            <div>
              <h2 className="nombre-perfil">{usuario.nombre}</h2>
              <p className="apoyo cargo-perfil">{usuario.rol === 'funcionario' ? 'Funcionario' : 'Ciudadano'}</p>
            </div>
          </div>

          <div className="fila-perfil"><span>Correo</span><span>{usuario.correo}</span></div>
          <div className="fila-perfil"><span>Telefono</span><span>{usuario.telefono ?? 'Sin registrar'}</span></div>
          <div className="fila-perfil"><span>Rol</span><span>{usuario.rol}</span></div>
          <div className="fila-perfil">
            <span>Reportes enviados</span>
            <span>
              {mios.cargando && '...'}
              {mios.error && 'No disponible'}
              {mios.datos && mios.datos.length}
            </span>
          </div>

          {mios.cargando && <Cargando texto="Contando tus reportes..." />}
          {mios.error && <ErrorCarga mensaje={mios.error} alReintentar={mios.reintentar} />}

          <div className="pila-botones">
            <Boton color="blanco" onClick={salir}>Cerrar sesion</Boton>
          </div>
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
