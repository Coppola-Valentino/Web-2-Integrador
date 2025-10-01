# Web-2-Integrador

trabajo integrador de valentino coppola

# librerias usadas

Sequelize
Pug
Node
mysql2
express
express-session
bcrypt
dotenv
bootstrap

# Base de datos en:

Mysql

# Endpoints

get /inPac (lleva al menu principal de pacientes, y tiene una tabla mostrando todos los pacientes, sus valores y si estan asignados a una cama, muestra la cama y la habitacion en donde dicha cama se aloja)

get /inPac/anadir (lleva a una vista en donde se ingresan los datos de un paciente para luego ingresarlo al sistema)

post /inPac/anadir (crea el paciente y lo añade a la base de datos)

get /inPac/:id/internar (lleva a una vista en donde se muestran las camas disponibles para el paciente a internar (accesible por administradores y medicos))

post /inPac/:id/internar (ingresa el id del paciente a la cama y actualiza los valores de genero de la habitacion (accesible por administradores y medicos))

get /inPac/:id/editar (lleva a una vista en donde se puede cambiar los datos de un paciente (accesible por administradores, medicos y enfermeros))

post /inPac/:id/editar (le cambia los datos al  paciente (accesible por administradores, medicos y enfermeros))

get /inPac/:id/Historial (lleva a una vista donde uno puede ver y cambiar el historial medico del paciente (accesible por administradores, medicos y enfermeros))

post /inPac/:id/Historial (cambia el historial medico del paciente y vuelve a cargar la vista (accesible por administradores, medicos y enfermeros))

get /inPac/:id/excluir (elimina el paciente del sistema y si tenia una cama asignada la desocupa (solo accesible por administradores))

get /inPac/:id/Alta (lleva a una vista para dar los motivos y tratamientos posteriores para el paciente (solo accesible por administradores y medicos))
 
post /inPac/:id/Alta (desocupa la cama que el paciente estaba usando y actualiza sus valores (solo accesible por administradores y medicos))

get /emergencias (lleva a una vista donde se puede crear un paciente de emergencia, al que se le pueden dejar valores nulos si se desconocen datos del paciente)

post /emergencias (crea el paciente y redirije al usuario hacia /inpac/:id/internar con el usuario recien creado como parametro)

get /habitaciones (lleva al menu principal de habitaciones, tiene una tabla mostrando todas las habitaciones, sus valores y las camas asignadas a cada habitacion y los pacientes en esas camas)

get /Habit/anadir (lleva a una vista en donde se ingresan los datos de una Habitacion para luego ingresarlo al sistema (solo accesible por administradores))

post /Habit/anadir (crea la habitacion y la añade a la base de datos (solo accesible por administradores))

get /Habit/anadirCam (lleva a una vista en donde se selecciona una habitacion con menos de 2 camas (solo accesible por administradores))

post /Habit/anadirCam (crea la cama y le asigna la cama seleccionada (solo accesible por administradores))

get /Habit/:id/editar (lleva a una vista en donde se puede cambiar los valores de una habitacion y las camas asignadas a esa habitacion (accesible por administradores, medicos y enfermeros))

post /Habit/:id/editar (cambia los valores de la habitacion y las camas (accesible por administradores, medicos y enfermeros))

get /Habit/:id/eliminar (elimina la habitacion y las camas de dicha habitacion (solo accesible por administradores))

get /Users (lleva a una vista donde se muestran los usuarios y su informacion (solo accesible por administradores))

get /Users/Register (lleva a una vista donde se permite crear otro usuario y darle un rol (solo accesible por administradores))

post /Users/Register (crea el usuario para su uso en el sistema (solo accesible por administradores))

get /Login (permite iniciar sesion en un usuario de la base de datos si se pasa un usuario y contraseña validos)

post /Login (inicia sesion en el usuario, permitiendo acceso al resto del sistema acorde con los permisos de dicho usuario)

get /Users/:id/EditUser (lleva a una vista que permite cambiar los datos del usuario pasado por parametros (solo accesible por administradores))

post /User/:id/EditUser (cambia los datos del usuario en cuestion (solo accesible por administradores))

get /Error (vista de error)

get /Permiso (vista de error si los permisos no son los necesarios)

# Usuarios para Testeo

Usuario: 'John Admin', Contraseña: 'John-#1', Rol: 'Admin'
Usuario: 'John Doctor', Contraseña: 'John-#2', Rol: 'Doctor'
Usuario: 'John Enfermero', Contraseña: 'John-#3', Rol: 'Enfermero'
Usuario: 'John Recepcionista', Contraseña: 'John-#4', Rol: 'Recepcionista'

# Instalacion/Uso

1 ejecutar `npm install` en consola

2 crear un .env con los valores [user, pass, host, port, name, DATABASE_URL]

3 ejecutar `npm run start` en consola

# Otros Links

link al sistema - https://web-2-integrador.vercel.app

link al video - https://drive.google.com/file/d/1VyYUreAgd-M9w1GPrjxTZ_cu5hI-bFw3/view?usp=sharing