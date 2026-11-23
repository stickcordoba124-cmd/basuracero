/* Marco del telefono. Envuelve todas las pantallas para que la
   aplicacion se vea como lo definio el prototipo: 390 x 844. */
export default function Marco({ children }) {
  return (
    <div className="marco">
      <div className="barra-estado" aria-hidden="true">
        <span>9:41</span>
        <span>BasuraCero</span>
      </div>
      {children}
    </div>
  );
}
