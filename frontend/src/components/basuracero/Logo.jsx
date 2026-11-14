/* Logo de la aplicacion: circulo verde con hoja y el nombre. */
export default function Logo({ tamano = 'normal' }) {
  const clase = tamano === 'grande' ? 'logo-circulo' : 'logo-circulo';
  const estilo = tamano === 'pequeno' ? { width: 28, height: 28, fontSize: 15 } : undefined;
  return (
    <div className="logo-fila">
      <span className={clase} style={estilo} aria-hidden="true">&#127807;</span>
      <span className="logo-nombre">Basura<span>Cero</span></span>
    </div>
  );
}
