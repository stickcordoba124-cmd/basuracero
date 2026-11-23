/* Aviso de una linea. Se usa para el error de credenciales, para la
   confirmacion de cuenta creada y para los mensajes del panel del
   funcionario, que antes repetian el mismo bloque de marcado. */
export default function Aviso({ tono = 'alerta', titulo, children }) {
  const esAlerta = tono === 'alerta';
  return (
    <div className={esAlerta ? 'aviso' : 'aviso aviso-verde'} role={esAlerta ? 'alert' : 'status'}>
      <span aria-hidden="true">{esAlerta ? '⚠' : '✓'}</span>
      <div>
        {titulo && <strong>{titulo}</strong>}
        {children}
      </div>
    </div>
  );
}
