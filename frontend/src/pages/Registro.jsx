import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Campo from '../components/comunes/Campo.jsx';
import Boton from '../components/comunes/Boton.jsx';
import Aviso from '../components/comunes/Aviso.jsx';
import Logo from '../components/basuracero/Logo.jsx';
import useFormulario from '../hooks/useFormulario.js';
import { pedir } from '../api/clienteDatos.js';

/* Nivel 0. Registro de un nuevo usuario.

   Los campos vienen del taller GA5-220501095-AA1-EV01, donde se
   justifico por que el registro necesita correo y contrasena ademas
   de los datos de identificacion.

   Se agrego el campo Telefono, que si existe en la tabla usuario de
   la base de datos aprobada y faltaba en el prototipo. */
const INICIAL = {
  nombres: '', apellidos: '', cedula: '', nacimiento: '',
  correo: '', telefono: '', clave: '', clave2: '',
};

function validar(d) {
  const e = {};
  if (!d.nombres.trim()) e.nombres = 'Campo obligatorio.';
  else if (d.nombres.trim().length < 3) e.nombres = 'Escriba al menos 3 caracteres.';

  if (!d.apellidos.trim()) e.apellidos = 'Campo obligatorio.';
  else if (d.apellidos.trim().length < 3) e.apellidos = 'Escriba al menos 3 caracteres.';

  if (!d.cedula.trim()) e.cedula = 'Campo obligatorio.';
  else if (!/^\d{6,12}$/.test(d.cedula.trim())) e.cedula = 'Solo numeros, entre 6 y 12 digitos.';

  if (!d.nacimiento) e.nacimiento = 'Campo obligatorio.';

  if (!d.correo.trim()) e.correo = 'Campo obligatorio.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo)) e.correo = 'El correo no tiene un formato valido.';

  if (d.telefono && !/^\d{7,15}$/.test(d.telefono.trim())) {
    e.telefono = 'Solo numeros, entre 7 y 15 digitos.';
  }

  if (!d.clave) e.clave = 'Campo obligatorio.';
  else if (d.clave.length < 8) e.clave = 'Minimo 8 caracteres.';

  if (!d.clave2) e.clave2 = 'Confirme la contrasena.';
  else if (d.clave2 !== d.clave) e.clave2 = 'Las dos contrasenas no coinciden.';

  return e;
}

export default function Registro() {
  const navegar = useNavigate();
  const [creado, setCreado] = useState('');
  const f = useFormulario(INICIAL, validar);

  const crear = f.enviar(async (v) => {
    await pedir(v);
    setCreado(v.correo);
  });

  if (creado) {
    return (
      <main className="cuerpo seccion" id="contenido">
        <Aviso tono="exito" titulo="Cuenta creada">
          <p>Ya puedes iniciar sesion con el correo {creado}.</p>
        </Aviso>
        <Boton onClick={() => navegar('/login')}>Ir a iniciar sesion</Boton>
      </main>
    );
  }

  return (
    <main className="cuerpo" id="contenido">
      <div className="cabecera-bienvenida">
        <Logo />
        <h2>Crear cuenta</h2>
        <p>Completa tus datos para registrarte. Los campos con asterisco son obligatorios.</p>
      </div>

      <form className="seccion" onSubmit={crear} noValidate>
        <div className="fila-doble">
          <Campo id="nombres" etiqueta="Nombres" marcador="Jefferson Stick" obligatorio
                 valor={f.valores.nombres} alCambiar={f.cambiar('nombres')}
                 error={f.errores.nombres} maxLength={100} autoComplete="given-name" />
          <Campo id="apellidos" etiqueta="Apellidos" marcador="Murillo Cordoba" obligatorio
                 valor={f.valores.apellidos} alCambiar={f.cambiar('apellidos')}
                 error={f.errores.apellidos} maxLength={100} autoComplete="family-name" />
        </div>

        <div className="fila-doble">
          <Campo id="cedula" etiqueta="Cedula" marcador="Numero de cedula" obligatorio
                 valor={f.valores.cedula} alCambiar={f.cambiar('cedula')}
                 error={f.errores.cedula} inputMode="numeric" maxLength={12} />
          <Campo id="nacimiento" etiqueta="Fecha de nacimiento" tipo="date" obligatorio
                 valor={f.valores.nacimiento} alCambiar={f.cambiar('nacimiento')}
                 error={f.errores.nacimiento} />
        </div>

        <Campo id="correo" etiqueta="Correo electronico" tipo="email" obligatorio
               marcador="ejemplo@correo.com" valor={f.valores.correo}
               alCambiar={f.cambiar('correo')} error={f.errores.correo}
               maxLength={150} autoComplete="email" />

        <Campo id="telefono" etiqueta="Telefono (opcional)" tipo="tel"
               marcador="3001112233" valor={f.valores.telefono}
               alCambiar={f.cambiar('telefono')} error={f.errores.telefono}
               inputMode="numeric" maxLength={20} autoComplete="tel" />

        <div className="fila-doble">
          <Campo id="clave" etiqueta="Crear contrasena" tipo="password" obligatorio
                 marcador="Min. 8 caracteres" valor={f.valores.clave}
                 alCambiar={f.cambiar('clave')} error={f.errores.clave}
                 autoComplete="new-password" />
          <Campo id="clave2" etiqueta="Confirmar contrasena" tipo="password" obligatorio
                 marcador="Repite tu clave" valor={f.valores.clave2}
                 alCambiar={f.cambiar('clave2')} error={f.errores.clave2}
                 autoComplete="new-password" />
        </div>

        <Boton tipo="submit" ocupado={f.enviando} textoOcupado="Creando la cuenta...">
          Registrarme
        </Boton>

        <p className="pie-formulario">
          Ya tienes cuenta? <Link className="enlace-verde" to="/login">Inicia sesion</Link>
        </p>
      </form>
    </main>
  );
}
