import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Campo from '../components/Campo.jsx';
import Logo from '../components/Logo.jsx';

/* Nivel 0. Registro de un nuevo usuario.

   Los campos vienen del taller GA5-220501095-AA1-AA1-EV01, donde se
   justifico por que el registro necesita correo y contrasena ademas
   de los datos de identificacion.

   Se agrego el campo Telefono, que si existe en la tabla usuario de
   la base de datos aprobada y faltaba en el prototipo. */
export default function Registro() {
  const navegar = useNavigate();
  const [datos, setDatos] = useState({
    nombres: '', apellidos: '', cedula: '', nacimiento: '',
    correo: '', telefono: '', clave: '', clave2: '',
  });
  const [errores, setErrores] = useState({});
  const [listo, setListo] = useState(false);

  const cambiar = (campo) => (valor) => setDatos((d) => ({ ...d, [campo]: valor }));

  function validar() {
    const e = {};
    if (!datos.nombres.trim()) e.nombres = 'Campo obligatorio.';
    else if (datos.nombres.trim().length < 3) e.nombres = 'Escriba al menos 3 caracteres.';

    if (!datos.apellidos.trim()) e.apellidos = 'Campo obligatorio.';
    else if (datos.apellidos.trim().length < 3) e.apellidos = 'Escriba al menos 3 caracteres.';

    if (!datos.cedula.trim()) e.cedula = 'Campo obligatorio.';
    else if (!/^\d{6,12}$/.test(datos.cedula.trim())) e.cedula = 'Solo numeros, entre 6 y 12 digitos.';

    if (!datos.nacimiento) e.nacimiento = 'Campo obligatorio.';

    if (!datos.correo.trim()) e.correo = 'Campo obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo)) e.correo = 'El correo no tiene un formato valido.';

    if (datos.telefono && !/^\d{7,15}$/.test(datos.telefono.trim())) {
      e.telefono = 'Solo numeros, entre 7 y 15 digitos.';
    }

    if (!datos.clave) e.clave = 'Campo obligatorio.';
    else if (datos.clave.length < 8) e.clave = 'Minimo 8 caracteres.';

    if (!datos.clave2) e.clave2 = 'Confirme la contrasena.';
    else if (datos.clave2 !== datos.clave) e.clave2 = 'Las dos contrasenas no coinciden.';

    return e;
  }

  function enviar(ev) {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length === 0) setListo(true);
  }

  if (listo) {
    return (
      <main className="cuerpo seccion" id="contenido">
        <div className="aviso aviso-verde" role="status" style={{ marginTop: 24 }}>
          <span aria-hidden="true">&#10003;</span>
          <div>
            <strong>Cuenta creada</strong>
            <p>Ya puedes iniciar sesion con el correo {datos.correo}.</p>
          </div>
        </div>
        <button type="button" className="boton boton-verde" onClick={() => navegar('/login')}>
          Ir a iniciar sesion
        </button>
      </main>
    );
  }

  return (
    <main className="cuerpo" id="contenido">
      <div className="cabecera-bienvenida">
        <Logo />
        <h2>Crear cuenta</h2>
        <p>Completa tus datos para registrarte.</p>
      </div>

      <form className="seccion" onSubmit={enviar} noValidate>
        <div className="fila-doble">
          <Campo id="nombres" etiqueta="Nombres" marcador="Jefferson Stick"
                 valor={datos.nombres} alCambiar={cambiar('nombres')}
                 error={errores.nombres} maxLength={100} autoComplete="given-name" />
          <Campo id="apellidos" etiqueta="Apellidos" marcador="Murillo Cordoba"
                 valor={datos.apellidos} alCambiar={cambiar('apellidos')}
                 error={errores.apellidos} maxLength={100} autoComplete="family-name" />
        </div>

        <div className="fila-doble">
          <Campo id="cedula" etiqueta="Cedula" marcador="Numero de cedula"
                 valor={datos.cedula} alCambiar={cambiar('cedula')}
                 error={errores.cedula} inputMode="numeric" maxLength={12} />
          <Campo id="nacimiento" etiqueta="Fecha de nacimiento" tipo="date"
                 valor={datos.nacimiento} alCambiar={cambiar('nacimiento')}
                 error={errores.nacimiento} />
        </div>

        <Campo id="correo" etiqueta="Correo electronico" tipo="email"
               marcador="ejemplo@correo.com" valor={datos.correo}
               alCambiar={cambiar('correo')} error={errores.correo}
               maxLength={150} autoComplete="email" />

        <Campo id="telefono" etiqueta="Telefono (opcional)" tipo="tel"
               marcador="3001112233" valor={datos.telefono}
               alCambiar={cambiar('telefono')} error={errores.telefono}
               inputMode="numeric" maxLength={20} autoComplete="tel" />

        <div className="fila-doble">
          <Campo id="clave" etiqueta="Crear contrasena" tipo="password"
                 marcador="Min. 8 caracteres" valor={datos.clave}
                 alCambiar={cambiar('clave')} error={errores.clave}
                 autoComplete="new-password" />
          <Campo id="clave2" etiqueta="Confirmar contrasena" tipo="password"
                 marcador="Repite tu clave" valor={datos.clave2}
                 alCambiar={cambiar('clave2')} error={errores.clave2}
                 autoComplete="new-password" />
        </div>

        <button type="submit" className="boton boton-verde">Registrarme</button>

        <p className="pie-formulario">
          Ya tienes cuenta? <Link className="enlace-verde" to="/login">Inicia sesion</Link>
        </p>
      </form>
    </main>
  );
}
