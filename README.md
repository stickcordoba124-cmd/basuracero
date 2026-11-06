# BasuraCero

Sistema ciudadano de reporte de microbasureros urbanos.

Proyecto formativo del Tecnologo en Analisis y Desarrollo de Software.
Jefferson Stick Murillo Cordoba. Ficha 3336056.
Centro Agroindustrial, Regional Quindio. SENA.

## Que hace

El ciudadano toma una foto de un punto de basura en su barrio, el sistema
guarda la ubicacion y la direccion, y el reporte entra a un flujo donde un
funcionario de aseo lo verifica y, si procede, lo asigna a una brigada de
limpieza que lo atiende y lo cierra.

El sistema maneja cinco roles: ciudadano, funcionario de aseo, coordinador,
administrador y grupos de limpieza.

Lo que queda fuera del alcance: el sistema no cobra servicios de recoleccion,
no reemplaza la ruta normal del carro de la basura, no sanciona a quien arroja
residuos y no publica datos personales de quien reporta.

## Requisitos

| Programa | Version |
|---|---|
| Node.js | 20 o superior |
| MySQL | 8.0.46 |
| Navegador | Chrome, Edge o Firefox actualizado |

## Estructura del repositorio

    basuracero/
      backend/     API en Node.js con Express
      frontend/    Interfaz en React con Vite
      .gitignore
      README.md

## Instalacion

### 1. Clonar el repositorio

    git clone <url-del-repositorio>
    cd basuracero

### 2. Base de datos

Crear la base de datos ejecutando los scripts de la evidencia
GA6-220501096-AA2-EV01, en este orden:

    01_estructura.sql
    02_datos.sql

### 3. Backend

    cd backend
    npm install
    copiar .env.example como .env y llenar DB_PASSWORD y SEMILLA_PASSWORD
    npm run semilla
    npm run dev

La API queda escuchando en http://localhost:4000

### 4. Frontend

    cd frontend
    npm install
    npm run dev

La aplicacion queda en http://localhost:5173

## Usuarios de prueba

El rol se deduce del dominio del correo, porque la interfaz todavia no
consume la API.

| Correo | Entra como |
|---|---|
| jefferson@correo.com | Ciudadano |
| carlos@alcaldia.gov.co | Funcionario |

La contrasena es la que se haya puesto en SEMILLA_PASSWORD, de ocho
caracteres o mas.

## Endpoints de la API

    POST  /api/v1/auth/iniciar-sesion
    GET   /api/v1/reportes
    POST  /api/v1/reportes
    POST  /api/v1/reportes/:id/verificacion
    POST  /api/v1/reportes/:id/asignacion
    GET   /api/v1/salud

## Reglas de negocio implementadas

1. Un ciudadano no puede tener dos reportes abiertos en la misma direccion.
2. Un reporte cerrado no admite verificacion ni asignacion.
3. No se asigna brigada a un reporte sin verificacion valida.

## Estrategia de ramas

| Rama | Para que |
|---|---|
| main | Solo lo entregado y funcionando |
| develop | Rama de integracion |
| feat/BC-NN-descripcion | Una por tarea del backlog |

Los mensajes de commit siguen la convencion del plan tecnico:
tipo, identificador de la tarea entre parentesis y que hace el cambio.

    feat(BC-18): asignar brigada a un reporte verificado

Tablero de tareas: https://trello.com/b/uKxEbbu0

## Evidencias relacionadas

| Evidencia | Producto |
|---|---|
| GA6-220501096-AA1-EV01 | Modelo logico y relacional |
| GA6-220501096-AA2-EV01 | Base de datos en MySQL |
| GA6-220501096-AA3/AA4-EV01 | Frontend en React |
| GA7-220501096-AA1-EV01 | Plan tecnico y estandares |
| GA7-220501096-AA1-EV02 | Control de versiones, este repositorio |
