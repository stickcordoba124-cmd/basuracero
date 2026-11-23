import { useEffect, useState } from 'react';

/* Logica de la bandeja del funcionario.

   Aprobar, descartar y asignar estaban escritos dentro de la pantalla,
   que era el archivo mas largo del proyecto. La pantalla ahora solo
   pinta y este hook guarda las decisiones.

   REGLA 3 del plan tecnico: no se asigna un grupo de limpieza a un
   reporte que no tenga una verificacion aprobada. */
export default function useVerificacion(bandeja, grupos) {
  const [casos, setCasos] = useState([]);
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    setCasos((bandeja ?? []).map((c) => ({ ...c, decision: null, grupo: '', asignado: false })));
  }, [bandeja]);

  const cambiarCaso = (id, cambios) =>
    setCasos((cs) => cs.map((c) => (c.id_reporte === id ? { ...c, ...cambios } : c)));

  function decidir(id, decision) {
    cambiarCaso(id, { decision });
    setAviso(decision === 'aprobado'
      ? `Reporte ${id} aprobado. Ya puede asignar el grupo de limpieza.`
      : `Reporte ${id} descartado. Se notificara al ciudadano.`);
  }

  function elegirGrupo(id, grupo) {
    cambiarCaso(id, { grupo });
  }

  function asignar(id) {
    const caso = casos.find((c) => c.id_reporte === id);
    if (caso.decision !== 'aprobado') {
      setAviso('Primero debe aprobar la verificacion del reporte.');
      return;
    }
    if (!caso.grupo) {
      setAviso('Elija primero el grupo de limpieza.');
      return;
    }
    cambiarCaso(id, { asignado: true });
    const nombre = (grupos ?? []).find((g) => String(g.id_grupo) === String(caso.grupo))?.nombre_grupo;
    setAviso(`Reporte ${id} asignado a ${nombre}. El estado pasa a programado.`);
  }

  const pendientes = casos.filter((c) => c.decision === null || (c.decision === 'aprobado' && !c.asignado));

  return { casos, pendientes, aviso, decidir, elegirGrupo, asignar };
}
