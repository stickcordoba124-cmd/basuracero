import { useNavigate, useLocation } from 'react-router-dom';
import Boton from '../components/comunes/Boton.jsx';
import Logo from '../components/basuracero/Logo.jsx';

/* Pantalla para una direccion que no existe.
   Antes la ruta comodin mandaba al splash sin decir nada, asi que
   quien escribia mal la direccion creia que la aplicacion se habia
   reiniciado sola. */
export default function NoEncontrado() {
  const navegar = useNavigate();
  const lugar = useLocation();

  return (
    <main className="cuerpo seccion centro-pantalla" id="contenido">
      <Logo />
      <h2>Esta pagina no existe</h2>
      <p className="apoyo">
        No encontramos la direccion <strong>{lugar.pathname}</strong>. Puede que el enlace
        este mal escrito o que la pantalla haya cambiado de lugar.
      </p>
      <div className="pila-botones">
        <Boton onClick={() => navegar('/inicio')}>Ir al inicio</Boton>
        <Boton color="blanco" onClick={() => navegar(-1)}>Volver atras</Boton>
      </div>
    </main>
  );
}
