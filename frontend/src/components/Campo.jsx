/* Campo de formulario controlado.
   El rotulo va encima del campo, no dentro, para que no
   desaparezca al escribir. Es el criterio de accesibilidad
   que quedo escrito en el prototipo. */
export default function Campo({
  id, etiqueta, valor, alCambiar, error,
  tipo = 'text', marcador = '', areaTexto = false, ...resto
}) {
  const idError = `${id}-error`;
  const comunes = {
    id,
    name: id,
    value: valor,
    onChange: (e) => alCambiar(e.target.value),
    placeholder: marcador,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? idError : undefined,
    ...resto,
  };
  return (
    <div className={error ? 'campo campo-malo' : 'campo'}>
      <label htmlFor={id}>{etiqueta}</label>
      {areaTexto ? <textarea {...comunes} /> : <input type={tipo} {...comunes} />}
      {error && <span className="mensaje-error" id={idError} role="alert">{error}</span>}
    </div>
  );
}
