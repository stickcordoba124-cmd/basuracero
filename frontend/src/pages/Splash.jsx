import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Nivel 0 del mapa de navegacion. Pantalla de entrada.
   Pasa sola al inicio de sesion a los dos segundos, y tambien
   se puede adelantar con el boton, para no obligar a esperar. */
export default function Splash() {
  const navegar = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navegar('/login'), 2000);
    return () => clearTimeout(t);
  }, [navegar]);

  return (
    <main className="splash" id="contenido">
      <span className="logo-circulo" style={{ width: 76, height: 76, fontSize: 38 }} aria-hidden="true">
        &#127807;
      </span>
      <h1>BasuraCero</h1>
      <p>Reporta los puntos de basura de tu barrio</p>
      <div style={{ width: '100%', maxWidth: 260, marginTop: 10 }}>
        <button type="button" className="boton boton-verde" onClick={() => navegar('/login')}>
          Comenzar
        </button>
      </div>
    </main>
  );
}
