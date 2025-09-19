-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-09-2025 a las 09:16:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `web2.3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `IDCamas` int(11) NOT NULL,
  `Paciente` int(11) DEFAULT NULL,
  `Higenizado` tinyint(1) NOT NULL,
  `Habitacion` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`IDCamas`, `Paciente`, `Higenizado`, `Habitacion`) VALUES
(3, NULL, 0, 2),
(6, 211, 1, 4),
(9, 5, 1, 3),
(12, NULL, 1, 6),
(13, NULL, 1, 6),
(15, NULL, 1, 4),
(16, 4, 1, 1),
(17, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `IDCita` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Medico` int(11) NOT NULL,
  `Tipo` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `IDHab` int(11) NOT NULL,
  `Tipo` char(100) NOT NULL,
  `Ala` int(11) NOT NULL,
  `GeneroHab` char(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`IDHab`, `Tipo`, `Ala`, `GeneroHab`) VALUES
(1, 'Ginecologia', 2, 'Femenino'),
(2, 'Pediatria', 1, 'Vacio'),
(3, 'Neurologia', 2, 'Femenino'),
(4, 'Urgencias', 4, 'Desconocido'),
(6, 'Quimioterapia', 2, 'Vacio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `IDMed` int(11) NOT NULL,
  `Nombre` char(100) NOT NULL,
  `DNI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`IDMed`, `Nombre`, `DNI`) VALUES
(1, 'Juan Perez', 47040879),
(2, 'Peron Perez', 8289472),
(3, 'Ana Perez', 2739124);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `IDPaciente` int(11) NOT NULL,
  `Nombre` char(100) NOT NULL,
  `DNI` int(11) DEFAULT NULL,
  `Edad` int(3) DEFAULT NULL,
  `Genero` char(100) NOT NULL,
  `Historial` char(255) DEFAULT NULL,
  `Seguro` char(100) DEFAULT NULL,
  `Cita` int(11) DEFAULT NULL,
  `Motivo` varchar(100) DEFAULT NULL,
  `Sintoma` varchar(255) DEFAULT NULL,
  `Prioridad` varchar(100) DEFAULT NULL,
  `EvaluacionFisica` varchar(255) DEFAULT NULL,
  `PlanAtencion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`IDPaciente`, `Nombre`, `DNI`, `Edad`, `Genero`, `Historial`, `Seguro`, `Cita`, `Motivo`, `Sintoma`, `Prioridad`, `EvaluacionFisica`, `PlanAtencion`) VALUES
(1, 'Ana María López', 1245678, 1945, 'Femenino', 'Alergia a penicilina. Cirugía en 2020.', 'Ninguno', NULL, '', '', '', '', ''),
(3, 'Lucía Torres', 3759372, 2001, 'Femenino', 'Sin antecedentes clínicos importantes.', 'Ninguno', NULL, '', '', '', '', ''),
(4, 'Miguel Ángel Ruiz', 9573821, 1988, 'Femenino', 'Diabético tipo 2. Tratamiento con metformina.', 'Ninguno', NULL, '', '', '', '', ''),
(5, 'Sam Rivera', 57391052, 1992, 'Femenino', 'Asma diagnosticada en infancia.', 'Ninguno', NULL, '', '', '', '', ''),
(6, 'Elena García', 0, 1983, 'Masculino', 'Paciente oncológico. Seguimiento desde 2019.', 'Ninguno', NULL, '', '', '', '', ''),
(211, 'John Doe', NULL, 0, 'Desconocido', NULL, 'Desconocido', NULL, '', '', '', '', ''),
(212, 'John Doe', NULL, 0, 'Desconocido', NULL, 'Desconocido', NULL, '', '', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`IDCamas`),
  ADD KEY `Paciente` (`Paciente`),
  ADD KEY `Habitacion` (`Habitacion`),
  ADD KEY `Habitacion_2` (`Habitacion`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`IDCita`),
  ADD KEY `Medico` (`Medico`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`IDHab`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`IDMed`),
  ADD UNIQUE KEY `DNI` (`DNI`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`IDPaciente`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD UNIQUE KEY `Cita` (`Cita`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `IDCamas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `IDCita` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `IDHab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `IDMed` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `IDPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `camas`
--
ALTER TABLE `camas`
  ADD CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`Paciente`) REFERENCES `paciente` (`IDPaciente`),
  ADD CONSTRAINT `camas_ibfk_2` FOREIGN KEY (`Habitacion`) REFERENCES `habitacion` (`IDHab`);

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`IDCita`) REFERENCES `paciente` (`Cita`),
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`Medico`) REFERENCES `medicos` (`IDMed`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
