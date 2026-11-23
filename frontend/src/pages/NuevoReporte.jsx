import { useNavigate } from 'react-router-dom';
import Encabezado from '../components/basuracero/Encabezado.jsx';
import BarraInferior from '../components/basuracero/BarraInferior.jsx';
import Campo from '../components/comunes/Campo.jsx';
import Boton from '../components/comunes/Boton.jsx';
import Aviso from '../components/comunes/Aviso.jsx';
import Pildoras from '../components/comunes/Pildoras.jsx';
import useFormulario from '../hooks/useFormulario.js';
import { useSesion } from '../context/SesionContext.jsx';
import { crearReporte } from '../api/reportesApi.js';
import { CATEGORIAS, NIVELES } from '../data/datosDemo.js';

/* Nivel 2, modulo 1. Formulario de nuevo reporte.

   El orden de los campos sigue el orden en que ocurre la accion:
   primero la foto, luego el lugar, despues el tipo de residuo y
   por ultimo el detalle. Es el criterio de eficacia del prototipo.

   Las categorias son las ocho que acepta ck_reporte_categoria y los
   niveles son los cinco de ck_reporte_nivel, para que los valores
   coincidan con la base de datos aprobada en la evidencia anterior.

   La REGLA 1 del plan tecnico, no dos reportes abiertos del mismo
   ciudadano en la misma direccion, se comprueba al enviar y el
   mensaje aparece sobre el formulario. */
const INICIAL = {
  foto: false,
  direccion: 'Calle 8 #7-98, brisas del rio',
  categoria: 'escombro',
  descripcion: '',
  nivel: 3,
};

function validar(v) {
  const e = {};
  if (!v.foto) e.foto = 'La foto es obligatoria, sin evidencia no se puede verificar el caso.';
  if (!v.direccion.trim()) e.direccion = 'Campo obligatorio.';
  else if (v.direccion.trim().length < 5) e.direccion = 'Escriba una direccion mas completa.';
  if (!v.categoria) e.categoria = 'Elija una categoria de residuo.';
  if (!v.descripcion.trim()) e.descripcion = 'Campo obligatorio.';
  else if (v.descripcion.trim().length < 15) e.descripcion = 'Describa el punto con al menos 15 caracteres.';
  else if (v.descripcion.length > 500) e.descripcion = 'Maximo 500 caracteres.';
  if (!v.nivel) e.nivel = 'Elija el nivel de la situacion.';
  return e;
}

export default function NuevoReporte() {
  const navegar = useNavigate();
  const { usuario } = useSesion();
  const f = useFormulario(INICIAL, validar);

  const enviar = f.enviar(async (v) => {
    await crearReporte({ ...v, id_usuario: usuario.id_usuario, autor: usuario.nombre });
    navegar('/confirmacion', { state: { direccion: v.direccion } });
  });

  /* Aviso antes de salir si ya se escribio algo. El boton de volver
     del encabezado cancela la salida cuando la persona dice que no. */
  function confirmarSalida() {
    const hayTexto = f.valores.descripcion.trim() !== '' || f.valores.foto;
    if (!hayTexto) return true;
    // eslint-disable-next-line no-alert
    return window.confirm('Tienes un reporte sin enviar. Si sales se pierde lo que escribiste.');
  }

  return (
    <>
      <Encabezado titulo="Nuevo reporte" volver alVolver={confirmarSalida} />
      <main className="cuerpo" id="contenido">
        <form className="seccion" onSubmit={enviar} noValidate>

          {f.errorGeneral && (
            <Aviso titulo="No pudimos enviar el reporte">
              <p>{f.errorGeneral}</p>
            </Aviso>
          )}

          <div className={f.errores.foto ? 'campo campo-malo' : 'campo'}>
            <span className="oculto-visual" id="et-foto">Foto del punto de basura</span>
            <button
              type="button"
              className="caja-foto"
              onClick={() => f.cambiar('foto')(!f.valores.foto)}
              aria-describedby={f.errores.foto ? 'foto-error' : undefined}
              aria-pressed={f.valores.foto}
            >
              <span aria-hidden="true" className="icono-foto">&#9673;</span>
              {f.valores.foto ? 'Foto adjunta. Toca para quitarla' : 'Tomar o subir foto *'}
            </button>
            {f.errores.foto && (
              <span className="mensaje-error" id="foto-error" role="alert">{f.errores.foto}</span>
            )}
          </div>

          <Campo
            id="direccion" etiqueta="Ubicacion" obligatorio
            marcador="Direccion del punto"
            valor={f.valores.direccion} alCambiar={f.cambiar('direccion')}
            error={f.errores.direccion} maxLength={200}
          />
          <p className="apoyo nota-campo">
            Tomada del GPS del telefono. Puedes corregirla si hace falta.
          </p>

          <Pildoras
            etiqueta="Categoria de residuo"
            opciones={CATEGORIAS}
            valor={f.valores.categoria}
            alElegir={f.cambiar('categoria')}
          />

          <Campo
            id="descripcion" etiqueta="Descripcion" areaTexto obligatorio
            marcador="Ej. Gran cantidad de escombros de construccion obstaculizando el paso peatonal..."
            valor={f.valores.descripcion} alCambiar={f.cambiar('descripcion')}
            error={f.errores.descripcion} maxLength={500}
          />

          <Pildoras
            etiqueta="Nivel de la situacion"
            opciones={NIVELES}
            valor={f.valores.nivel}
            alElegir={f.cambiar('nivel')}
            variante="pildora-naranja"
          />

          <Boton tipo="submit" color="naranja" ocupado={f.enviando} textoOcupado="Enviando reporte...">
            Enviar reporte
          </Boton>
        </form>
      </main>
      <BarraInferior />
    </>
  );
}
