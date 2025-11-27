-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2025 a las 10:38:24
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
-- Estructura de tabla para la tabla `altasmedicas`
--

CREATE TABLE `altasmedicas` (
  `IDAlta` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Medicamento` varchar(255) NOT NULL,
  `PlanID` int(11) NOT NULL,
  `CantMedicamento` int(11) DEFAULT NULL,
  `DosisMedicamento` double DEFAULT NULL,
  `TiempoMedicamento` int(11) DEFAULT NULL,
  `MedicID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `MedicID` int(11) NOT NULL,
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
-- Estructura de tabla para la tabla `histcirujias`
--

CREATE TABLE `histcirujias` (
  `IDCiru` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Fecha` date NOT NULL,
  `Estado` varchar(255) NOT NULL,
  `Diagnostico` varchar(255) NOT NULL,
  `Resumen` varchar(255) NOT NULL,
  `MedicID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histevalfisica`
--

CREATE TABLE `histevalfisica` (
  `IDEval` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `TipoSangre` varchar(255) NOT NULL,
  `Fisionomia` varchar(255) NOT NULL,
  `SignoVital` varchar(255) NOT NULL,
  `Mediciones` varchar(255) NOT NULL,
  `Palpacion` varchar(255) NOT NULL,
  `Auscultacion` varchar(255) NOT NULL,
  `Percusion` varchar(255) NOT NULL,
  `Etnicidad` varchar(255) NOT NULL,
  `Fecha` date NOT NULL,
  `MedicID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histinternacion`
--

CREATE TABLE `histinternacion` (
  `IDIntern` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `MedicID` int(11) NOT NULL,
  `AltaID` int(11) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `PlanID` int(11) NOT NULL,
  `Motivo` varchar(255) NOT NULL,
  `Sintomas` varchar(255) NOT NULL,
  `Prioridad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `Seguro` char(100) DEFAULT NULL,
  `Cita` int(11) DEFAULT NULL,
  `Telefono` int(11) DEFAULT NULL,
  `Direccion` char(255) DEFAULT NULL,
  `PadreID` int(11) NOT NULL,
  `MadreID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`IDPaciente`, `Nombre`, `DNI`, `Edad`, `Genero`, `Seguro`, `Cita`, `Telefono`, `Direccion`, `PadreID`, `MadreID`) VALUES
(1, 'Ana María López', 1245678, 1945, 'Femenino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(3, 'Lucía Torres', 3759372, 2001, 'Femenino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(4, 'Miguel Ángel Ruiz', 9573821, 1988, 'Femenino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(5, 'Sam Rivera', 57391052, 1992, 'Femenino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(6, 'Elena García', 0, 1983, 'Masculino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(211, 'John Doe', NULL, 0, 'Desconocido', 'Desconocido', NULL, NULL, NULL, 0, 0),
(212, 'John Doe', NULL, 0, 'Desconocido', 'Desconocido', NULL, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planatencion`
--

CREATE TABLE `planatencion` (
  `IDPlan` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `Medicamento` varchar(255) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Tratamiento` varchar(255) NOT NULL,
  `Terapia` varchar(255) NOT NULL,
  `CantMedicamento` int(11) DEFAULT NULL,
  `DosisMedicamento` double DEFAULT NULL,
  `TiempoMedicamento` int(11) DEFAULT NULL,
  `MedicID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `IDUser` int(11) NOT NULL,
  `Usuario` char(100) DEFAULT NULL,
  `Pass` char(100) DEFAULT NULL,
  `Rol` char(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`IDUser`, `Usuario`, `Pass`, `Rol`) VALUES
(1, 'John Admin', 'John #1', 'Admin'),
(2, 'John Doctor', 'John #2', 'Doctor'),
(3, 'John Enfermero', 'John #3', 'Enfermero'),
(4, 'John Recepcionista', 'John #4', 'Recepcionista');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `altasmedicas`
--
ALTER TABLE `altasmedicas`
  ADD PRIMARY KEY (`IDAlta`),
  ADD KEY `MedicamentoID` (`Medicamento`),
  ADD KEY `PlanID` (`PlanID`),
  ADD KEY `PacID` (`PacID`),
  ADD KEY `MedicID` (`MedicID`);

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
  ADD KEY `Medico` (`MedicID`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`IDHab`);

--
-- Indices de la tabla `histcirujias`
--
ALTER TABLE `histcirujias`
  ADD PRIMARY KEY (`IDCiru`),
  ADD KEY `PacID` (`PacID`),
  ADD KEY `MedicID` (`MedicID`);

--
-- Indices de la tabla `histevalfisica`
--
ALTER TABLE `histevalfisica`
  ADD PRIMARY KEY (`IDEval`),
  ADD KEY `PacID` (`PacID`),
  ADD KEY `MedicID` (`MedicID`);

--
-- Indices de la tabla `histinternacion`
--
ALTER TABLE `histinternacion`
  ADD PRIMARY KEY (`IDIntern`),
  ADD KEY `PacID` (`PacID`),
  ADD KEY `MedicID` (`MedicID`),
  ADD KEY `AltaID` (`AltaID`),
  ADD KEY `PlanID` (`PlanID`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`IDPaciente`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD UNIQUE KEY `Cita` (`Cita`),
  ADD KEY `PadreID` (`PadreID`),
  ADD KEY `MadreID` (`MadreID`);

--
-- Indices de la tabla `planatencion`
--
ALTER TABLE `planatencion`
  ADD PRIMARY KEY (`IDPlan`),
  ADD KEY `PacID` (`PacID`),
  ADD KEY `MedicamentoID` (`Medicamento`),
  ADD KEY `MedicID` (`MedicID`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`IDUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `altasmedicas`
--
ALTER TABLE `altasmedicas`
  MODIFY `IDAlta` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `histcirujias`
--
ALTER TABLE `histcirujias`
  MODIFY `IDCiru` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `histevalfisica`
--
ALTER TABLE `histevalfisica`
  MODIFY `IDEval` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `histinternacion`
--
ALTER TABLE `histinternacion`
  MODIFY `IDIntern` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `IDPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT de la tabla `planatencion`
--
ALTER TABLE `planatencion`
  MODIFY `IDPlan` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `altasmedicas`
--
ALTER TABLE `altasmedicas`
  ADD CONSTRAINT `altasmedicas_ibfk_1` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`),
  ADD CONSTRAINT `altasmedicas_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`);

--
-- Filtros para la tabla `histcirujias`
--
ALTER TABLE `histcirujias`
  ADD CONSTRAINT `histcirujias_ibfk_1` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`),
  ADD CONSTRAINT `histcirujias_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `histevalfisica`
--
ALTER TABLE `histevalfisica`
  ADD CONSTRAINT `histevalfisica_ibfk_1` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`),
  ADD CONSTRAINT `histevalfisica_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `histinternacion`
--
ALTER TABLE `histinternacion`
  ADD CONSTRAINT `histinternacion_ibfk_1` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`) ON UPDATE CASCADE,
  ADD CONSTRAINT `histinternacion_ibfk_2` FOREIGN KEY (`PlanID`) REFERENCES `planatencion` (`IDPlan`) ON UPDATE CASCADE,
  ADD CONSTRAINT `histinternacion_ibfk_3` FOREIGN KEY (`AltaID`) REFERENCES `altasmedicas` (`IDAlta`) ON UPDATE CASCADE,
  ADD CONSTRAINT `histinternacion_ibfk_4` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `planatencion`
--
ALTER TABLE `planatencion`
  ADD CONSTRAINT `planatencion_ibfk_1` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`),
  ADD CONSTRAINT `planatencion_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
