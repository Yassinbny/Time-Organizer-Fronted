/**

# TIME-ORGANIZER

TIME ORGANIZER: UNA AGENDA DIVERTIDA, PARA PERSONAS DISTRAÍDAS.
Aplicación tipo agenda para organizar el tiempo y las tareas del día a día, enfocada en
personas con TDA (Trastorno por déficit de atención), aunque puede ser útil para cualquiera quien quiera
usarla.



# CÓMO ARRANCAR EL FRONTEND


    * Abre la terminal y navega hasta la carpeta raíz del proyecto (si ya no estás en ella).

    * Ejecuta el comando npm install o npm i (creará una carpeta "node_modules" que contiene todas las independencias instaladas).

    * Crea el archivo .env y copia en el la estructura del archivo .env.example rellenando los campos vacíos con los datos necesarios para configurar la ruta del backend.

    * Ejecuta el comando npm run dev para lanzar el servidor.

    * Abre tu navegador y ve a http://localhost:5173 para ver la aplicación en funcionamiento.



# TECNOLOGÍAS UTILIZADAS:


    ● React.js
    ● Vite.js
    ● Tailwind CSS
    ● Metodología Mobile-First



# LISTA DE RUTAS:


    ● / → Página de inicio.

    ● /signup → Registrar un nuevo usuario.

    ● /confirm/:validationCode → Validar un usuario recién registrado con un código.

    ● /login → Login o inicio de sesión de usuario.

    ● /user-profile → Devolver el perfil del usuario.

    ● /admin-profile → Devolver el perfil del administrador.

    ● /administrator → Listado de usuarios y permisos del administrador.

    ● /recover-password → Recuperar contraseña.

    ● /confirmation-recover-password → Confirmación para recuperar la contraseña.

    ● /change-password → Cambiar contraseña con código de recuperación.

    ● /calendar → Calendarios y listas.

    ● /help → Página de ayuda.

    ● * → Página de errores.



# LA PLATAFORMA PERMITE:


 * * SI NO ESTÁ REGISTRADO, PUEDE:

    ● Visualizar la página principal de la plataforma

    ● Registrarse, facilitando sus datos:
        ○ e-mail
        ○ username
        ○ contraseña


 * * SI YA ES UN USUARIO REGISTRADO, PUEDE:

    ● Iniciar sesión con sus datos:
        ○ e-mail
        ○ contraseña

    ● Visualizar un calendario en distintos formatos:
        ○ planificador diario
        ○ calendario semanal
        ○ calendario mensual

    ● Crear y modificar tareas, añadiendo:
        ○ color
        ○ descripción
        ○ fecha y hora de inicio y de finalización
        ○ clasificación por ámbito (casa, trabajo...)
        ○ subtareas (mayor detalle a la tarea)
        ○ puntuación a las tareas finalizadas
        
    ● Búsqueda / filtro por:
        ○ tarea (compra, gym, reunión)
        ○ familia (trabajo, estudios, casa)
        ○ fecha

    ● Ordenar por horas, tareas o familias

    ● Marcar las tareas y subtareas como finalizadas

    ● Contabilizar las subtareas finalizadas

    ● Listado con todas las tareas finalizadas

    ● Finalizar automáticamente las tareas y subtareas que hayan acabado hace 1 hora

    ● Eliminar tareas y subtareas

    ● Aplazar una o todas las tareas del día (semana, mes) simultáneamente

    ● Gestión del perfil (personalizar sus datos):
        ○ username
        ○ contraseña
        ○ avatar


 * * SI ES UN USUARIO ADMINISTRADOR, PODRÁ:

    ● Deshabilitar a los usuarios inactivos, enviando un correo de aviso

    ● Rehabilitar un usuario

    ● Eliminar un usuario


# DESARROLLADORES:


    ● Yassin Benyaiche
    ● Juan Coronado
    ● Robert Muresan
    ● Inez Siepak
    ● Beatriz Tejero
