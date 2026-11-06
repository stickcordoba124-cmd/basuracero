import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Campo from '../components/Campo.jsx';
import Logo from '../components/Logo.jsx';

/* Nivel 0. Inicio de sesion.
   El aviso de error se muestra sobre esta misma pantalla y no
   en una ventana aparte, tal como quedo decidido en el taller
   GA5-220501095-AA1-EV01.
   El rol decide a donde entra la persona: el funcionario va a
   su panel y el ciudadano al inicio. */
export default function Login() {
  const navegar = useNavigate();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const [fallo, setFallo] = useState(false);

  function validar() {
    const e = {};
    if (!correo.trim()) e.correo = 'Escriba su correo electronico.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) e.correo = 'El correo no tiene un formato valido.';
    if (!clave) e.clave = 'Escriba su contrasena.';
    else if (clave.length < 8) e.clave = 'La contrasena debe tener al menos 8 caracteres.';
    return e;
  }

  function enviar(ev) {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) { setFallo(false); return; }

    /* Sin conexion a servicios: el rol se deduce del dominio del correo */
    if (correo.endsWith('@alcaldia.gov.co')) { navegar('/panel'); return; }
    if (correo.endsWith('@correo.com')) { navegar('/inicio'); return; }
    setFallo(true);
  }

  return (
    <main className="cuerpo" id="contenido">
      <div className="cabecera-bienvenida">
        <Logo />
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa para reportar y seguir los puntos de basura de tu barrio.</p>
      </div>

      <form className="seccion" onSubmit={enviar} noValidate>
        {fallo && (
          <div className="aviso" role="alert">
            <span aria-hidden="true">&#9888;</span>
            <div>
              <strong>No pudimos iniciar tu sesion</strong>
              <p>El correo o la contrasena no son correctos. Revisa tus datos e intenta otra vez.</p>
            </div>
          </div>
        )}

        <Campo
          id="correo" etiqueta="Correo electronico" tipo="email"
          marcador="ejemplo@correo.com" valor={correo}
          alCambiar={setCorreo} error={errores.correo}
          autoComplete="email" maxLength={150}
        />
        <Campo
          id="clave" etiqueta="Contrasena" tipo="password"
          marcador="Ingresa tu contrasena" valor={clave}
          alCambiar={setClave} error={errores.clave}
          autoComplete="current-password"
        />

        <p style={{ textAlign: 'right', marginTop: -4 }}>
          <Link className="enlace-verde" to="/login">Olvidaste tu contrasena?</Link>
        </p>

        <button type="submit" className="boton boton-verde">Ingresar</button>

        {fallo && (
          <div style={{ marginTop: 10 }}>
            <button type="button" className="boton boton-blanco" onClick={() => setFallo(false)}>
              Recuperar mi contrasena
            </button>
          </div>
        )}

        <p className="pie-formulario">
          No tienes cuenta? <Link className="enlace-verde" to="/registro">Registrate</Link>
        </p>
        <p className="apoyo centro" style={{ marginTop: 18 }}>
          Para la demostracion: jefferson@correo.com entra como ciudadano y
          carlos@alcaldia.gov.co entra como funcionario. Contrasena de ocho caracteres o mas.
        </p>
      </form>
    </main>
  );
}
