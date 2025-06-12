# Web-2-Integrador

trabajo integrador de valentino coppola

# Tablas:

Paciente{
  `IDPaciente` int(11) NOT NULL PRIMARY_KEY AUTO_INCREMENT,
  `Nombre` char(100) NOT NULL,
  `Edad` int(3) NOT NULL,
  `DNI` int(11) NOT NULL,
  `Genero` char(100) NOT NULL,
  `Historial` char(100) NOT NULL,
  `Seguro` char(100) DEFAULT NULL,
  `Cita` int(11) DEFAULT NULL
}

Camas{
  `IDCamas` int(11) NOT NULL PRIMARY_KEY AUTO_INCREMENT,
  `Paciente` int(11) DEFAULT NULL, (conectado a IDPaciente)
  `Higenizado` tinyint(1) NOT NULL,
  `Habitacion` int(100) NOT NULL (conectado a IDHab)
}

Habitacion{ 
  `IDHab` int(11) NOT NULL PRIMARY_KEY AUTO_INCREMENT,
  `Tipo` char(100) NOT NULL,
  `Ala` int(11) NOT NULL,
  `GeneroHab` char(100) DEFAULT NULL
}

# Valores de Testeo en backup

`camas`{ (`IDCamas`, `Paciente`, `Higenizado`, `Habitacion`)
  (3, NULL, 0, 2),
  (6, 211, 1, 4),
  (9, 5, 1, 3),
  (12, NULL, 1, 6),
  (13, NULL, 1, 6),
  (15, NULL, 1, 4),
  (16, 4, 1, 1),
  (17, 1, 1, 1);
}

`habitacion`{ (`IDHab`, `Tipo`, `Ala`, `GeneroHab`)
  (1, 'Ginecologia', 2, 'Femenino'),
  (2, 'Pediatria', 1, 'Vacio'),
  (3, 'Neurologia', 2, 'Femenino'),
  (4, 'Urgencias', 4, 'Desconocido'),
  (6, 'Quimioterapia', 2, 'Vacio');
}

`paciente`{ (`IDPaciente`, `Nombre`, `DNI`, `Edad`, `Genero`, `Historial`, `Seguro`, `Cita`)
  (1, 'Ana María López', 1245678, 1945, 'Femenino', 'Alergia a penicilina. Cirugía en 2020.', 'Ninguno', NULL),
  (3, 'Lucía Torres', 3759372, 2001, 'Femenino', 'Sin antecedentes clínicos importantes.', 'Ninguno', NULL),
  (4, 'Miguel Ángel Ruiz', 9573821, 1988, 'Femenino', 'Diabético tipo 2. Tratamiento con metformina.', 'Ninguno', NULL),
  (5, 'Sam Rivera', 57391052, 1992, 'Femenino', 'Asma diagnosticada en infancia.', 'Ninguno', NULL),
  (6, 'Elena García', 0, 1983, 'Masculino', 'Paciente oncológico. Seguimiento desde 2019.', 'Ninguno', NULL),
  (211, 'John Doe', NULL, 0, 'Desconocido', NULL, 'Desconocido', NULL),
  (212, 'John Doe', NULL, 0, 'Desconocido', NULL, 'Desconocido', NULL);
}

# Cambios para su funcionamiento local

## Cambiar:
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

## Por:
const sequelize = new Sequelize("web2_3", "bingus", "merequetenge", {
host: localhost,
dialect: 'mysql',
logging: false,
port: 3000,
});

## luego ir a:
http://localhost:3000