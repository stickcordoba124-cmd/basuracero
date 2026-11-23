import { useNavigate, Link } from 'react-router-dom';
import Campo from '../components/comunes/Campo.jsx';
import Boton from '../components/comunes/Boton.jsx';
import Aviso from '../components/comunes/Aviso.jsx';
import Logo from '../components/basuracero/Logo.jsx';
import useFormulario from '../hooks/useFormulario.js';
import { useSesion } from '../context/SesionContext.jsx';
import { iniciarSesion } from '../api/sesionApi.js';

/* Nivel 0. Inicio de sesion.
   El aviso de error se muestra sobre esta misma pantalla y no
   en una ventana aparte, tal como quedo decidido en el taller
   GA5-220501095-AA1-EV01.
   El rol decide a donde entra la persona: el funcionario va a
   su panel y el ciudadano al inicio. */
export default function Login() {
  const navegar = useNavigate();
  const { abrirSesion } = useSesion();

  function validar(v) {
    const e = {};
    if (!v.correo.trim()) e.correo = 'Escriba su correo electronico.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.correo)) e.correo = 'El correo no tiene un formato valido.';
    if (!v.clave) e.clave = 'Escriba su contrasena.';
    else if (v.clave.length < 8) e.clave = 'La contrasena debe tener al menos 8 caracteres.';
    return e;
  }

  const f = useFormulario({ correo: '', clave: '' }, validar);

  const entrar = f.enviar(async (v) => {
    const usuario = await iniciarSesion(v.correo.trim(), v.clave);
    abrirSesion(usuario);
    navegar(usuario.rol === 'funcionario' ? '/panel' : '/inicio', { replace: true });
  });

  return (
    <main className="cuerpo" id="contenido">
      <div className="cabecera-bienvenida">
        <Logo />
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa para reportar y seguir los puntos de basura de tu barrio.</p>
      </div>

      <form className="seccion" onSubmit={entrar} noValidate>
        {f.errorGeneral && (
          <Aviso titulo="No pudimos iniciar tu sesion">
            <p>{f.errorGeneral}</p>
          </Aviso>
        )}

        <Campo
          id="correo" etiqueta="Correo electronico" tipo="email" obligatorio
          marcador="ejemplo@correo.com" valor={f.valores.correo}
          alCambiar={f.cambiar('correo')} error={f.errores.correo}
          autoComplete="email" maxLength={150}
        />
        <Campo
          id="clave" etiqueta="Contrasena" tipo="password" obligatorio
          marcador="Ingresa tu contrasena" valor={f.valores.clave}
          alCambiar={f.cambiar('clave')} error={f.errores.clave}
          autoComplete="current-password"
        />

        <Boton tipo="submit" ocupado={f.enviando} textoOcupado="Verificando...">
          Ingresar
        </Boton>

        {/* La recuperacion de contrasena es la tarea BC-04 del backlog y
            tiene prioridad Should, asi que todavia no existe. Antes habia
            aqui un enlace que apuntaba a esta misma pantalla y no llevaba
            a ninguna parte. */}
        <p className="apoyo centro">
          Olvidaste tu contrasena? Por ahora la recuperacion se solicita en la oficina de
          atencion al ciudadano.
        </p>

        <p className="pie-formulario">
          No tienes cuenta? <Link className="enlace-verde" to="/registro">Registrate</Link>
        </p>
        <p className="apoyo centro nota-demo">
          Para la demostracion: jefferson@correo.com entra como ciudadano y
          carlos@alcaldia.gov.co entra como funcionario. Contrasena de ocho caracteres o mas.
        </p>
      </form>
    </main>
  );
}
