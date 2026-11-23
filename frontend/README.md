# BasuraCero. Frontend en React

Evidencias GA6-220501096-AA3/AA4-EV01 y GA7-220501096-AA4-EV01
Jefferson Stick Murillo Cordoba. Ficha 3336056
Tecnologo en Analisis y Desarrollo de Software
Centro Agroindustrial, Regional Quindio

## Que es

Primera version funcional del frontend de BasuraCero, construida en React a
partir del prototipo aprobado en la evidencia GA5-220501095-AA1-EV03 y del
mapa de navegacion GA5-220501095-AA1-EV05.

En esta etapa la interfaz todavia no se conecta a los servicios. Las pantallas
piden la informacion a las funciones de src/api, y esas funciones devuelven por
ahora los datos de src/data/datosDemo.js, cuyos nombres de campo y valores
permitidos son los mismos de la base de datos aprobada en la evidencia
GA6-220501096-AA2-EV01. Cuando el backend este listo solo cambia src/api, las
pantallas no se tocan.

## Que se agrego en la evidencia GA7-220501096-AA4-EV01

Esta entrega sale de pasar la lista de chequeo de componentes frontend sobre el
codigo anterior y corregir los hallazgos:

    src/api/           capa de datos, unica puerta hacia la informacion
    src/hooks/         usePeticion, useFormulario y useVerificacion
    src/context/       estado global de la sesion
    components/comunes     componentes genericos, sin reglas del proyecto
    components/basuracero  componentes propios del dominio

Ademas: estados de cargando, error y sin resultados en todas las pantallas que
cargan datos, campos obligatorios marcados, boton de envio que se bloquea para
que no se envie dos veces, la REGLA 1 del plan tecnico comprobada en el
formulario, pantalla propia para direcciones que no existen, y la pestana
actual resaltada en la barra inferior.

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
    src/api/                capa de datos, una funcion por consulta
    src/hooks/              logica reutilizable de pantallas y formularios
    src/context/            estado global de la sesion
    src/components/comunes/     componentes genericos
    src/components/basuracero/  componentes del dominio
    src/pages/              una pantalla por archivo

## Datos de prueba

El archivo src/data/datosDemo.js trae los tres casos que pide la lista de
chequeo:

    Caso normal   reportes 1 a 4, con los tres estados y categorias distintas
    Caso limite   reporte 7, nivel 5 critico y descripcion en el tope de 500
    Caso de error el reporte 1 esta abierto en la direccion que trae por
                  defecto el formulario, asi que al enviarlo sin cambiarla se
                  dispara la REGLA 1

Para ver los estados de error de todas las pantallas, poner SIMULAR_FALLO en
true dentro de src/api/clienteDatos.js.
