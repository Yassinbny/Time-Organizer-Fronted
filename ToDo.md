Corrección Sprint 1:

* GRAVES ERRORES:

- FALLOS DE SEGURIDAD: 
	- listTaskModel devuelve las notas de todos los 		usuarios, no del usuario que está 		logueado (token)
	- en todos las rutas de tasks tenemos que pasar 		por authenticateToken

- en los listados para sort y order comprobar los valores permitidos (mirar mastercalss backend)

-HECHO revisar: if (!tasks) no tendría que ser if(tasks.length === 0)?

- en la petición de createTaskController gestionar id de la family y id color
en  .delete("/:idTask/notes/:idNote", deleteNotecontroller) .patch("/:idTask/notes/:idNote", updateNoteController) post("/:idTask/subtask/:idSubTask" eliminar ":idTask", no se usa

-HECHO listTaskByIdModel tiene un nombre no corecto. No devuelve la lista sino un task. Falta devolver subtarea y notas del task. (no lo veo como error, list en ingles es enseñar, no se refiere a lista en español)


* Otros errores

- los datos de admin van en él .env (ver master class). Tenéis el password de admin en claro en el código (problema de seguridad)

- ¡Estáis pasando por parseToken con todos los endpoint, esto significa que también en el login se controla el token! No

- en parseToken o signUpController, en caso de error, pasar por el middleware de los errores. Revisar en todo el código.

- en la validación de un usuario pasar el código de validación por req.param no req.query

- en app.js quitar app.use(parseToken), eliminar parseToken y poner req.currentUser = currentUser en authenticateToken.

- no habría llamado token el código de validación usuario (para no confundirlo con el JWT)

- getPool en caso de error tiene que volver a lanzar un error para parar el código y caer en el middleware de los errores

- No en todos los endpoint se implementa Joi (como en signin). Revisar todas las peticiones donde se envían datos

- en el login dar un mensaje de error genérico, no que me equivoqué de email o password (problema de privacy)

- deleteUserModel no funcionará nunca si tenemos datos (FK al usuario que queremos eliminar)

- se permite ejecutar createTaskFamilyController sin estar logueado (no se pasa por el middleware de ruta authenticateToken que comprueba el token en el header de la petición HTTP). Revisar en todo los endpont. Además, este endpont con el DB modificado no está bien.

-HECHO eliminar console.log de debug como "Se está creando la conexión".

- checkUser no hace falta, ya se pasa por authenticateToken. Tendría sentido el middleware checkUser si implementaba la existencia del usuario en el DB

* DB

- veo que de momento el DB no implementa:
	- la gestión de la repetición de task (ej cada semana). (no creo que tendreis tiempo, no lo implementaría en estas semanas de proyecto que quedan)
	- la gestión de autoevaluación

-HECHO en la tabla tasks start y finish no pueden ser de tipo DATE porque no permite guardar la hora y minutos. Será DATETIME

-HECHO No podemos poner la FK task_id en family. Hace falta una tabla intermedia tasks_family para asociar un task a una o más family. Si queréis permitir solo una family para cada tasks, en tasks tendríamos que crear una campo FK a family

-HECHO "SELECT * FROM users WHERE email LIKE ?" es "email = ?" (no LIKE)

- Lo que viene requiere la modifica de algunos endpoint que trabajan sobre notes, tasks, family, colors:
-HECHO falta user_id en la tabla notes
-HECHO  quitar NOT NULL en task_id de la tabla notes para poder crear un task generico
en createTables tendríamos que hacer insert en la tabla family con los valores que permitimos seleccionar
Crearía una tabla colores (insert en la tabla colores con los valores que permitimos) y en los tasks una fk a la tabla color
falta endpoint que devuelve la lista de colores
en creación de un task se indicará la/las family y el color


* ORGANIZACIÓN

- hay una carpeta validations donde se defines eschemas Joi pero luego hay otros que se definen directamente en los controladores (como para signup). Ponerlos todos en validations

- organización de código: pusisteis authenticateToken, checkUser, parseToken (que hace lo mismo de authenticateToken ) y isAdmin en validacions. Los pondría en una carpeta middlewares.

-HECHO en controllers y models organizasteis el código en carpetas (auth y user) pero luego dejaste files no organizados.

* README

- en el README.md poner los pasos para arrancar el backend

* POSTMAN

- en la colleción Postman habían peticiones sin body (como las de recuperación y reset password)


* CONSEJO *

No implementar endpoint que no podréis gestionar en estas semanas de proyecto. Se pueden dejar para el futuro.

* Nota importante * 

- En los requisitos para obtener el apto no incluí:
cambio contraseña - varios grupos no entendieron la diferencia entre cambio password y recuperación password.
- Joi en todos los endpoint - implementando Joi en algunos lo di como criterio válido