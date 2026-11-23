import { createContext, useContext, useMemo, useState } from 'react';

/* Estado global de la sesion.

   Antes el usuario salia fijo del archivo de datos de prueba, asi que
   el inicio de sesion no cambiaba nada y el nombre que mostraba la
   pantalla de inicio era siempre el mismo. El usuario es el unico dato
   que de verdad comparten todos los modulos, asi que es el unico que
   se sube a un estado global. Lo demas sigue siendo estado local. */

const SesionContext = createContext(null);

export function ProveedorSesion({ children }) {
  const [usuario, setUsuario] = useState(null);

  const valor = useMemo(() => ({
    usuario,
    esFuncionario: usuario?.rol === 'funcionario',
    abrirSesion: setUsuario,
    cerrarSesion: () => setUsuario(null),
  }), [usuario]);

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

/** Devuelve la sesion actual. */
export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error('useSesion se debe usar dentro de ProveedorSesion.');
  return contexto;
}
