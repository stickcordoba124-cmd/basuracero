import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/comunes/Boton.jsx';

/* Nivel 0 del mapa de navegacion. Pantalla de entrada.
   Pasa sola al inicio de sesion a los dos segundos, y tambien
   se puede adelantar con el boton, para no obligar a esperar.

   El cambio de pantalla reemplaza la entrada en el historial. Antes
   la agregaba, asi que el boton atras del navegador devolvia aqui y
   a los dos segundos volvia a empujar al login: no habia forma de
   salir hacia atras. */
export default function Splash() {
  const navegar = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navegar('/login', { replace: true }), 2000);
    return () => clearTimeout(t);
  }, [navegar]);

  return (
    <main className="splash" id="contenido">
      <span className="logo-circulo logo-grande" aria-hidden="true">&#127807;</span>
      <h1>BasuraCero</h1>
      <p>Reporta los puntos de basura de tu barrio</p>
      <div className="pila-botones">
        <Boton onClick={() => navegar('/login', { replace: true })}>Comenzar</Boton>
      </div>
    </main>
  );
}
