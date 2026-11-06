# BasuraCero. Frontend en React

Evidencia GA6-220501096-AA3/AA4-EV01
Jefferson Stick Murillo Cordoba. Ficha 3336056
Tecnologo en Analisis y Desarrollo de Software
Centro Agroindustrial, Regional Quindio

## Que es

Primera version funcional del frontend de BasuraCero, construida en React a
partir del prototipo aprobado en la evidencia GA5-220501095-AA1-EV03 y del
mapa de navegacion GA5-220501095-AA1-EV05.

En esta etapa la interfaz todavia no se conecta a los servicios. Las pantallas
se alimentan del archivo src/data/datosDemo.js, cuyos nombres de campo y
valores permitidos son los mismos de la base de datos aprobada en la evidencia
GA6-220501096-AA2-EV01.

## Como ejecutarlo

Se necesita Node.js version 18 o superior.

    npm install
    npm run dev

Luego abrir en el navegador la direccion que aparece en pantalla,
normalmente http://localhost:5173

Para generar la version de produccion:

    npm run build
    npm run preview

## Usuarios de prueba

El rol se deduce del dominio del correo, porque no hay servidor todavia.

    Ciudadano    jefferson@correo.com    contrasena de 8 caracteres o mas
    Funcionario  carlos@alcaldia.gov.co  contrasena de 8 caracteres o mas

## Las once pantallas

    Nivel 0   Splash, Inicio de sesion, Registro
    Nivel 1   Inicio del ciudadano
    Nivel 2   Nuevo reporte, Mapa de reportes, Mis reportes
    Nivel 3   Detalle y seguimiento del caso
    Cierre    Confirmacion de envio
    Extra     Perfil
    Alterno   Panel del funcionario

## Organizacion de las carpetas

    index.html              pagina base
    vite.config.js          configuracion del empaquetador
    src/main.jsx            punto de entrada
    src/App.jsx             rutas de React Router
    src/styles/global.css   paleta, tipografia y estilos
    src/data/datosDemo.js   datos de demostracion
    src/components/         componentes reutilizables
    src/pages/              una pantalla por archivo
