# Web-2-Integrador

trabajo integrador de valentino coppola

# librerias usadas

Sequelize
Pug
Node
mysql2
express
dotenv
bootstrap

# Base de datos en:

Mysql

# Endpoints

get /inPac (lleva al menu principal de pacientes, y tiene una tabla mostrando todos los pacientes, sus valores y si estan asignados a una cama, muestra la cama y la habitacion en donde dicha cama se aloja)

get /inPac/anadir (lleva a una vista en donde se ingresan los datos de un paciente para luego ingresarlo al sistema)

post /inPac/anadir (crea el paciente y lo añade a la base de datos)

get /inPac/:id/internar (lleva a una vista en donde se muestran las camas disponibles para el paciente a internar)

post /inPac/:id/internar (ingresa el id del paciente a la cama y actualiza los valores de genero de la habitacion)

get /inPac/:id/editar (lleva a una vista en donde se puede cambiar los datos de un paciente)

post /inPac/:id/editar (le cambia los datos al  paciente)

get /inPac/:id/Historial (lleva a una vista donde uno puede ver y cambiar el historial medico del paciente)

post /inPac/:id/Historial (cambia el historial medico del paciente y vuelve a cargar la vista)

get /inPac/:id/excluir (elimina el paciente del sistema y si tenia una cama asignada la desocupa)

get /emergencias (lleva a una vista donde se puede crear un paciente de emergencia, al que se le pueden dejar valores nulos si se desconocen datos del paciente)

post /emergencias (crea el paciente y redirije al usuario hacia /inpac/:id/internar con el usuario recien creado como parametro)


get /habitaciones (lleva al menu principal de habitaciones, tiene una tabla mostrando todas las habitaciones, sus valores y las camas asignadas a cada habitacion y los pacientes en esas camas)

get /Habit/anadir (lleva a una vista en donde se ingresan los datos de una Habitacion para luego ingresarlo al sistema)

post /Habit/anadir (crea la habitacion y la añade a la base de datos)

get /Habit/anadirCam (lleva a una vista en donde se selecciona una habitacion con menos de 2 camas)

post /Habit/anadirCam (crea la cama y le asigna la cama seleccionada)

get /Habit/:id/editar (lleva a una vista en donde se puede cambiar los valores de una habitacion y las camas asignadas a esa habitacion)

post /Habit/:id/editar (cambia los valores de la habitacion y las camas)

get /Habit/:id/eliminar (elimina la habitacion y las camas de dicha habitacion)


get /cama/:id/desocupar (saca al paciente de la cama)

get /cama/:id/eliminar (elimina la cama del sistema)


# Instalacion/Uso

1 ejecutar `npm install` en consola

2 crear un .env con los valores [user, pass, host, port, name, DATABASE_URL]

3 ejecutar npm run start

# Otros Links

link al sistema - https://web-2-integrador.vercel.app

link al video - https://drive.google.com/file/d/1VyYUreAgd-M9w1GPrjxTZ_cu5hI-bFw3/view?usp=sharing