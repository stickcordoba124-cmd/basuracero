# BasuraCero. Backend en Node.js

Evidencia GA7-220501096-AA1-EV01. Plan tecnico y estandares de construccion.
Jefferson Stick Murillo Cordoba. Ficha 3336056.

Primera parte del backend. Implementa cinco requerimientos funcionales
sobre la base de datos aprobada en la evidencia GA6-220501096-AA2-EV01.

## Requerimientos implementados

    RF.001  Autenticacion y autorizacion
    RF.003  Envio de reporte ciudadano
    RF.004  Visualizacion del mapa de reportes
    RF.006  Verificacion del reporte
    RF.007  Asignacion a grupos de limpieza

## Como ejecutarlo

Se necesita Node.js 18 o superior y la base de datos basuracero ya creada.

    npm install
    copiar .env.example como .env y llenarlo
    npm run semilla
    npm run dev

## Endpoints

    POST  /api/v1/auth/iniciar-sesion
    GET   /api/v1/reportes
    POST  /api/v1/reportes
    POST  /api/v1/reportes/:id/verificacion
    POST  /api/v1/reportes/:id/asignacion
    GET   /api/v1/salud

## Reglas de negocio implementadas

1. Un ciudadano no puede tener dos reportes abiertos en la misma direccion.
2. Un reporte cerrado no admite verificacion ni asignacion.
3. No se asigna brigada a un reporte que no tenga verificacion valida.
