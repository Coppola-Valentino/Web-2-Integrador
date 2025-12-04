-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2025 a las 19:12:28
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
  `PlanID` int(11) NOT NULL,
  `MedicID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `altasmedicas`
--

INSERT INTO `altasmedicas` (`IDAlta`, `PacID`, `Fecha`, `PlanID`, `MedicID`) VALUES
(2, 1, '0000-00-00', 18, 1),
(3, 1, '0000-00-00', 21, 1),
(4, 1, '0000-00-00', 23, 1),
(5, 1, '0000-00-00', 27, 1),
(6, 1, '0000-00-00', 29, 1),
(7, 1, '0000-00-00', 31, 1),
(8, 1, '0000-00-00', 33, 1),
(9, 1, '2025-12-02', 35, 1),
(10, 214, '2025-12-02', 37, 1),
(11, 213, '2025-12-02', 39, 1);

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
(6, NULL, 1, 4),
(9, NULL, 1, 3),
(12, NULL, 1, 6),
(13, NULL, 1, 6),
(15, NULL, 1, 4),
(16, NULL, 1, 1),
(17, NULL, 1, 1),
(21, 214, 1, 18),
(22, NULL, 1, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `IDCita` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `MedicID` int(11) NOT NULL,
  `Tipo` char(255) NOT NULL,
  `PacID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`IDCita`, `Fecha`, `MedicID`, `Tipo`, `PacID`) VALUES
(1, '2025-12-28', 2, 'EvalFisica', 1),
(2, '2025-12-11', 2, 'Cirujia', 1),
(3, '2025-12-30', 2, 'EvalFisica', 6);

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
(6, 'Quimioterapia', 2, 'Femenino'),
(18, 'Urgencias', 2, 'Desconocido');

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

--
-- Volcado de datos para la tabla `histcirujias`
--

INSERT INTO `histcirujias` (`IDCiru`, `PacID`, `Tipo`, `Fecha`, `Estado`, `Diagnostico`, `Resumen`, `MedicID`) VALUES
(1, 1, 'Mequeretenge', '2025-12-02', 'Cancelado', 'no se', 'ni idea', 1);

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
  `Resonancia` varchar(255) DEFAULT NULL,
  `Fecha` date NOT NULL,
  `MedicID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `histevalfisica`
--

INSERT INTO `histevalfisica` (`IDEval`, `PacID`, `TipoSangre`, `Fisionomia`, `SignoVital`, `Mediciones`, `Palpacion`, `Auscultacion`, `Percusion`, `Etnicidad`, `Resonancia`, `Fecha`, `MedicID`) VALUES
(1, 1, '', 'Gorda', '', 'fatass', 'ni idea', 'e?', 'martillito', 'N', NULL, '2025-12-02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histinternacion`
--

CREATE TABLE `histinternacion` (
  `IDIntern` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `MedicID` int(11) NOT NULL,
  `AltaID` int(11) DEFAULT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date DEFAULT NULL,
  `PlanID` int(11) DEFAULT NULL,
  `Motivo` varchar(255) NOT NULL,
  `Sintomas` varchar(255) NOT NULL,
  `Prioridad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `histinternacion`
--

INSERT INTO `histinternacion` (`IDIntern`, `PacID`, `MedicID`, `AltaID`, `FechaInicio`, `FechaFin`, `PlanID`, `Motivo`, `Sintomas`, `Prioridad`) VALUES
(12, 1, 1, 9, '2025-12-02', '0000-00-00', 35, 'hemorragia interna', 'no se', 'Baja'),
(14, 1, 1, NULL, '0000-00-00', '2025-12-12', 30, 'hemorragia interna', 'no se', 'Media'),
(15, 1, 1, NULL, '2025-12-02', '2025-12-11', 32, 'hemorragia interna', 'no se', 'Media'),
(16, 1, 1, NULL, '2025-12-02', '2025-12-03', 34, 'no se murio', 'no se', 'Alta'),
(17, 214, 1, 10, '2025-12-02', '0000-00-00', 37, 'hemorragia interna', 'no se', 'Media'),
(18, 213, 1, 11, '2025-12-02', '2025-12-02', 39, 'hemorragia interna', 'no se', 'Baja'),
(19, 214, 1, NULL, '2025-12-03', '2025-12-03', 40, 'hemorragia interna', 'Sangrado', 'Alta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `IDMedicamento` int(255) NOT NULL,
  `PlanID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Dosis` double NOT NULL,
  `Tiempo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`IDMedicamento`, `PlanID`, `Nombre`, `Dosis`, `Tiempo`, `Cantidad`) VALUES
(1, 7, 'Bingus', 6, 24, 100),
(2, 30, 'viagra', 6, 3, 7),
(3, 30, '', 0, 0, 0),
(4, 30, '', 0, 0, 0),
(5, 30, '', 2314442.2323, 0, 0),
(6, 30, '', 0, 0, 0),
(8, 6, 'Crack', 100, 1, 75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `IDPaciente` int(11) NOT NULL,
  `Nombre` char(100) NOT NULL,
  `DNI` int(11) DEFAULT NULL,
  `Edad` date DEFAULT NULL,
  `Genero` char(100) NOT NULL,
  `Seguro` char(100) DEFAULT NULL,
  `Telefono` int(11) DEFAULT NULL,
  `Direccion` char(255) DEFAULT NULL,
  `Alergias` varchar(255) DEFAULT NULL,
  `PadreID` int(11) NOT NULL,
  `MadreID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`IDPaciente`, `Nombre`, `DNI`, `Edad`, `Genero`, `Seguro`, `Telefono`, `Direccion`, `Alergias`, `PadreID`, `MadreID`) VALUES
(1, 'Ana Maria Lopez', 124567890, '1921-10-12', 'Femenino', 'Ninguno', 1234567890, '', 'Mani', 218, 218),
(3, 'Lucia Torres', 3759372, '2000-01-28', 'Femenino', 'Ninguno', NULL, NULL, '', 0, 0),
(4, 'Miguel Angel Ruiz', 9573821, '1989-10-13', 'Femenino', 'Ninguno', NULL, NULL, '', 218, 218),
(5, 'Sam Rivera', 57391052, '0000-00-00', 'Femenino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(6, 'ElenaGarcia', 89271992, '2025-12-24', 'Femenino', 'Ninguno', NULL, NULL, NULL, 0, 0),
(211, 'John Doe', NULL, '0000-00-00', 'Desconocido', 'Desconocido', NULL, NULL, NULL, 0, 0),
(212, 'John Doe', NULL, '0000-00-00', 'Desconocido', 'Desconocido', NULL, NULL, NULL, 0, 0),
(213, 'John Doe', 7592231, '2025-12-01', 'Desconocido', 'Desconocido', 0, '', NULL, 0, 0),
(214, 'John Doe', NULL, NULL, 'Desconocido', 'Desconocido', NULL, NULL, NULL, 0, 0),
(215, 'pepe', 773892881, '2025-12-25', 'Masculino', 'Ninguno', NULL, NULL, '', 0, 0),
(216, 'a', 89291, '1738-06-03', 'Masculino', 'Ninguno', NULL, NULL, '', 0, 0),
(217, 'John Doe', NULL, '1905-06-03', 'Desconocido', 'Desconocido', NULL, NULL, '', 0, 0),
(218, 'John Doe', NULL, '2025-12-02', 'Desconocido', 'Desconocido', NULL, NULL, '', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planatencion`
--

CREATE TABLE `planatencion` (
  `IDPlan` int(11) NOT NULL,
  `PacID` int(11) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Tratamiento` varchar(255) NOT NULL,
  `Terapia` varchar(255) NOT NULL,
  `MedicID` int(11) NOT NULL,
  `TipoDePlan` varchar(255) NOT NULL,
  `Intervenciones` varchar(255) DEFAULT NULL,
  `Cuidados` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planatencion`
--

INSERT INTO `planatencion` (`IDPlan`, `PacID`, `FechaInicio`, `FechaFin`, `Tratamiento`, `Terapia`, `MedicID`, `TipoDePlan`, `Intervenciones`, `Cuidados`) VALUES
(6, 1, '2025-12-04', '2025-12-07', 'mequeretenge', '2', 1, 'Preliminar', 'bingus Mingus', ''),
(7, 1, '2025-12-11', '2025-12-25', 'mequeretenge', 'aaaaaaa', 1, 'Preliminar', NULL, ''),
(8, 1, '2025-12-04', '2025-12-21', 'mequeretenge', 'no3', 1, 'Preliminar', NULL, ''),
(9, 3, '2026-01-11', '2026-01-09', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(10, 4, '2025-12-03', '2025-12-14', 'mequeretenge', 'no3', 1, 'Preliminar', NULL, ''),
(11, 4, '2025-12-25', '2025-12-28', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(12, 1, '2025-12-05', '2025-12-20', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(13, 1, '2025-12-11', '2026-01-04', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(14, 6, '2025-12-10', '2025-12-26', 'mequeretenge', 'aaaaaaa', 1, 'Preliminar', NULL, ''),
(15, 5, '2025-12-11', '2025-12-12', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(16, 1, '2025-12-03', '2025-12-20', 'mequeretenge', '25', 1, 'Preliminar', NULL, ''),
(17, 1, '2025-12-15', '2025-12-01', 'mequeretenge', 'no', 1, 'Posterior', NULL, ''),
(18, 1, '2025-12-01', '2025-12-01', 'mequeretenge', 'no', 1, 'Posterior', NULL, ''),
(19, 212, '2025-12-01', '2025-12-01', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(20, 1, '2025-12-01', '2025-12-01', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(21, 1, '2025-12-11', '2025-12-06', 'mequeretenge', 'aaaaaaa', 1, 'Posterior', NULL, ''),
(22, 1, '2025-12-03', '2025-12-20', 'mequeretenge', 'no4', 1, 'Preliminar', NULL, ''),
(23, 1, '2025-12-04', '2025-12-06', 'mequeretenge', '25', 1, 'Posterior', NULL, ''),
(24, 1, '2025-12-30', '2025-12-31', 'mequeretenge', '25', 1, 'Preliminar', NULL, ''),
(25, 213, '2025-12-01', '2025-12-01', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(26, 1, '2025-12-03', '2025-12-26', 'mequeretenge', 'no2', 1, 'Preliminar', NULL, ''),
(27, 1, '2025-12-24', '2025-12-28', 'mequeretenge', 'no', 1, 'Posterior', NULL, ''),
(28, 1, '2025-12-01', '2025-12-01', 'mequeretenge', 'no', 1, 'Preliminar', NULL, ''),
(29, 1, '2025-12-18', '2025-12-21', 'mequeretenge', 'aaaaaaa', 1, 'Posterior', NULL, ''),
(30, 1, '2025-12-10', '2025-12-19', 'mequeretenge', 'no4', 1, 'Preliminar', NULL, ''),
(31, 1, '2025-12-18', '2025-12-25', 'mequeretenge', 'no', 1, 'Posterior', NULL, ''),
(32, 1, '2025-12-25', '2025-12-02', 'mequeretenge', 'no4', 1, 'Anterior', NULL, ''),
(33, 1, '2025-12-01', '2025-12-02', 'mequeretenge', 'no', 1, 'Posterior', NULL, ''),
(34, 1, '2026-01-01', '2025-12-16', 'mequeretenge', 'aaaaaaa', 1, 'Anterior', NULL, ''),
(35, 1, '2025-12-02', '2025-12-11', 'mequeretenge', 'no3', 1, 'Posterior', NULL, ''),
(36, 214, '2026-01-01', '2026-01-11', 'mequeretenge', 'aaaaaaa', 1, 'Anterior', NULL, ''),
(37, 214, '2025-12-13', '2025-12-19', 'mequeretenge', 'no', 1, 'Posterior', NULL, ''),
(38, 213, '2025-12-18', '2025-12-25', 'mequeretenge', 'aaaaaaa', 1, 'Anterior', NULL, ''),
(39, 213, '2025-12-19', '2025-12-11', 'mequeretenge', 'aaaaaaa', 1, 'Posterior', NULL, ''),
(40, 214, '2025-12-01', '2025-12-01', 'mequeretenge', 'no', 1, 'Preliminar', 'bingus', 'Merengue');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `IDUser` int(11) NOT NULL,
  `Usuario` char(100) DEFAULT NULL,
  `Especialidad` varchar(255) DEFAULT NULL,
  `Pass` char(100) DEFAULT NULL,
  `Rol` char(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`IDUser`, `Usuario`, `Especialidad`, `Pass`, `Rol`) VALUES
(1, 'John Admin', NULL, '$2a$10$6NegiagTBmKReoHjsisrS.zdSIvM9wb/RU9MHXUGsj9mQH.8bQ7.y', 'Admin'),
(2, 'John Doctor', 'Odontologo', '$2a$10$MEoTOVRS7WHUBzcmLjqrG.MlgxWw13eR3h5Kk0F/JYghRVVvwMhz6', 'Doctor'),
(3, 'John Enfermero', NULL, '$2a$10$ozGmueVsBh5jx/F8wp6QOeh6u7I3170rnK2/dAoDPFv3SDmN8I.hS', 'Enfermero'),
(4, 'John Recepcionista', NULL, '$2a$10$VaM6fCbpfyD6BUyyD1nPdejJu0Z1U6zCUe.Ujj8uvhvnsVWnS8b2i', 'Recepcionista');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `altasmedicas`
--
ALTER TABLE `altasmedicas`
  ADD PRIMARY KEY (`IDAlta`),
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
  ADD KEY `Medico` (`MedicID`),
  ADD KEY `PacID` (`PacID`);

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
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`IDMedicamento`),
  ADD KEY `PlanID` (`PlanID`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`IDPaciente`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD KEY `PadreID` (`PadreID`),
  ADD KEY `MadreID` (`MadreID`);

--
-- Indices de la tabla `planatencion`
--
ALTER TABLE `planatencion`
  ADD PRIMARY KEY (`IDPlan`),
  ADD KEY `PacID` (`PacID`),
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
  MODIFY `IDAlta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `IDCamas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `IDCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `IDHab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `histcirujias`
--
ALTER TABLE `histcirujias`
  MODIFY `IDCiru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `histevalfisica`
--
ALTER TABLE `histevalfisica`
  MODIFY `IDEval` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `histinternacion`
--
ALTER TABLE `histinternacion`
  MODIFY `IDIntern` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `IDMedicamento` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `IDPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;

--
-- AUTO_INCREMENT de la tabla `planatencion`
--
ALTER TABLE `planatencion`
  MODIFY `IDPlan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `altasmedicas`
--
ALTER TABLE `altasmedicas`
  ADD CONSTRAINT `altasmedicas_ibfk_1` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`),
  ADD CONSTRAINT `altasmedicas_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`) ON UPDATE CASCADE,
  ADD CONSTRAINT `altasmedicas_ibfk_3` FOREIGN KEY (`PlanID`) REFERENCES `planatencion` (`IDPlan`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`MedicID`) REFERENCES `user` (`IDUser`),
  ADD CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`PacID`) REFERENCES `paciente` (`IDPaciente`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `medicamento_ibfk_1` FOREIGN KEY (`PlanID`) REFERENCES `planatencion` (`IDPlan`) ON DELETE CASCADE ON UPDATE CASCADE;

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
