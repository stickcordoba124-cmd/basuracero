/* Tres contadores con el resumen del municipio. */
export default function Contadores({ datos }) {
  return (
    <div className="contadores">
      <div>
        <p className="contador-numero" style={{ color: '#F26722' }}>{datos.pendientes}</p>
        <p className="contador-texto">Pendientes</p>
      </div>
      <div>
        <p className="contador-numero" style={{ color: '#1F2933' }}>{datos.enProceso}</p>
        <p className="contador-texto">En proceso</p>
      </div>
      <div>
        <p className="contador-numero" style={{ color: '#1B8A4E' }}>{datos.resueltos}</p>
        <p className="contador-texto">Resueltos</p>
      </div>
    </div>
  );
}
