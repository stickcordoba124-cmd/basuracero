/* Campo de formulario controlado.
   El rotulo va encima del campo, no dentro, para que no
   desaparezca al escribir. Es el criterio de accesibilidad
   que quedo escrito en el prototipo.

   Los campos obligatorios llevan un asterisco visible y
   aria-required, porque antes no habia forma de saber cuales
   eran hasta que fallaba el envio. */
export default function Campo({
  id, etiqueta, valor, alCambiar, error,
  tipo = 'text', marcador = '', areaTexto = false,
  obligatorio = false, ...resto
}) {
  const idError = `${id}-error`;
  const comunes = {
    id,
    name: id,
    value: valor,
    onChange: (e) => alCambiar(e.target.value),
    placeholder: marcador,
    required: obligatorio || undefined,
    'aria-required': obligatorio ? 'true' : undefined,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? idError : undefined,
    ...resto,
  };
  return (
    <div className={error ? 'campo campo-malo' : 'campo'}>
      <label htmlFor={id}>
        {etiqueta}
        {obligatorio && <span className="obligatorio" aria-hidden="true"> *</span>}
      </label>
      {areaTexto ? <textarea {...comunes} /> : <input type={tipo} {...comunes} />}
      {error && <span className="mensaje-error" id={idError} role="alert">{error}</span>}
    </div>
  );
}
