import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Encabezado from '../components/Encabezado.jsx';
import Campo from '../components/Campo.jsx';
import Pildoras from '../components/Pildoras.jsx';
import BarraInferior from '../components/BarraInferior.jsx';
import { CATEGORIAS, NIVELES } from '../data/datosDemo.js';

/* Nivel 2, modulo 1. Formulario de nuevo reporte.

   El orden de los campos sigue el orden en que ocurre la accion:
   primero la foto, luego el lugar, despues el tipo de residuo y
   por ultimo el detalle. Es el criterio de eficacia del prototipo.

   Las categorias son las ocho que acepta ck_reporte_categoria y los
   niveles son los cinco de ck_reporte_nivel, para que los valores
   coincidan con la base de datos aprobada en la evidencia anterior. */
export default function NuevoReporte() {
  const navegar = useNavigate();
  const [foto, setFoto] = useState(false);
  const [direccion, setDireccion] = useState('Calle 8 #7-98, brisas del rio');
  const [categoria, setCategoria] = useState('escombro');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState(3);
  const [errores, setErrores] = useState({});

  function validar() {
    const e = {};
    if (!foto) e.foto = 'La foto es obligatoria, sin evidencia no se puede verificar el caso.';
    if (!direccion.trim()) e.direccion = 'Campo obligatorio.';
    else if (direccion.trim().length < 5) e.direccion = 'Escriba una direccion mas completa.';
    if (!categoria) e.categoria = 'Elija una categoria de residuo.';
    if (!descripcion.trim()) e.descripcion = 'Campo obligatorio.';
    else if (descripcion.trim().length < 15) e.descripcion = 'Describa el punto con al menos 15 caracteres.';
    else if (descripcion.length > 500) e.descripcion = 'Maximo 500 caracteres.';
    if (!nivel) e.nivel = 'Elija el nivel de la situacion.';
    return e;
  }

  function enviar(ev) {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length === 0) {
      navegar('/confirmacion', { state: { direccion } });
    }
  }

  return (
    <>
      <Encabezado titulo="Nuevo reporte" volver />
      <main className="cuerpo" id="contenido">
        <form className="seccion" onSubmit={enviar} noValidate>

          <div className={errores.foto ? 'campo campo-malo' : 'campo'}>
            <span className="oculto-visual" id="et-foto">Foto del punto de basura</span>
            <button
              type="button"
              className="caja-foto"
              onClick={() => setFoto((f) => !f)}
              aria-describedby={errores.foto ? 'foto-error' : undefined}
              aria-pressed={foto}
            >
              <span aria-hidden="true" style={{ fontSize: 26 }}>&#9673;</span>
              {foto ? 'Foto adjunta. Toca para quitarla' : 'Tomar o subir foto'}
            </button>
            {errores.foto && (
              <span className="mensaje-error" id="foto-error" role="alert">{errores.foto}</span>
            )}
          </div>

          <Campo
            id="direccion" etiqueta="Ubicacion"
            marcador="Direccion del punto"
            valor={direccion} alCambiar={setDireccion}
            error={errores.direccion} maxLength={200}
          />
          <p className="apoyo" style={{ marginTop: -8 }}>
            Tomada del GPS del telefono. Puedes corregirla si hace falta.
          </p>

          <Pildoras
            etiqueta="Categoria de residuo"
            opciones={CATEGORIAS}
            valor={categoria}
            alElegir={setCategoria}
          />

          <Campo
            id="descripcion" etiqueta="Descripcion" areaTexto
            marcador="Ej. Gran cantidad de escombros de construccion obstaculizando el paso peatonal en la vereda oeste..."
            valor={descripcion} alCambiar={setDescripcion}
            error={errores.descripcion} maxLength={500}
          />

          <Pildoras
            etiqueta="Nivel de la situacion"
            opciones={NIVELES}
            valor={nivel}
            alElegir={setNivel}
            variante="pildora-naranja"
          />

          <button type="submit" className="boton boton-naranja">Enviar reporte</button>
        </form>
      </main>
      <BarraInferior />
    </>
  );
}
