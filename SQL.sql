-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for contactos
CREATE DATABASE IF NOT EXISTS `contactos` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `contactos`;

-- Dumping structure for table contactos.contacto
CREATE TABLE IF NOT EXISTS `contacto` (
  `id_contacto` int(11) NOT NULL AUTO_INCREMENT,
  `primer_nombre` varchar(50) NOT NULL,
  `segundo_nombre` varchar(50) DEFAULT NULL,
  `primer_apellido` varchar(50) NOT NULL,
  `segundo_apellido` varchar(50) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  `id_direccion` int(11) DEFAULT NULL,
  `id_tipo_telefono` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_contacto`),
  KEY `id_genero` (`id_genero`),
  KEY `id_direccion` (`id_direccion`),
  KEY `id_tipo_telefono` (`id_tipo_telefono`),
  CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`),
  CONSTRAINT `contacto_ibfk_2` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`),
  CONSTRAINT `contacto_ibfk_3` FOREIGN KEY (`id_tipo_telefono`) REFERENCES `tipo_telefono` (`id_tipo_telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table contactos.contacto: ~10 rows (approximately)
INSERT INTO `contacto` (`id_contacto`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `id_genero`, `id_direccion`, `id_tipo_telefono`, `email`, `telefono`, `imagen`) VALUES
	(1, 'Juan', 'Carlos', 'Pérez', 'Gómez', 1, 1, 1, 'juan.perez@example.com', '1234567890', 'imagen1.jpg'),
	(2, 'Ana', 'María', 'López', NULL, 2, 2, 2, 'ana.lopez@example.com', '0987654321', 'imagen2.jpg'),
	(3, 'Luis', 'Alberto', 'Martínez', 'Ramírez', 1, 3, 3, 'luis.martinez@example.com', '1112223334', 'imagen3.jpg'),
	(4, 'María', 'Luisa', 'Fernández', NULL, 2, 1, 1, 'maria.fernandez@example.com', '5556667778', 'imagen4.jpg'),
	(5, 'Carlos', NULL, 'García', 'Hernández', 1, 2, 2, 'carlos.garcia@example.com', '4445556667', 'imagen5.jpg'),
	(6, 'Sofía', NULL, 'González', 'López', 2, 3, 3, 'sofia.gonzalez@example.com', '3334445556', 'imagen6.jpg'),
	(7, 'Pedro', 'Antonio', 'Rodríguez', 'Sánchez', 1, 1, 1, 'pedro.rodriguez@example.com', '2223334445', 'imagen7.jpg'),
	(8, 'Lucía', 'Isabel', 'Jiménez', NULL, 2, 2, 2, 'lucia.jimenez@example.com', '1112223334', 'imagen8.jpg'),
	(9, 'Miguel', NULL, 'Hernández', 'Ruiz', 1, 3, 3, 'miguel.hernandez@example.com', '4445556667', 'imagen9.jpg'),
	(10, 'Elena', NULL, 'Castro', 'Vargas', 2, 1, 1, 'elena.castro@example.com', '5556667778', 'imagen10.jpg');

-- Dumping structure for table contactos.direccion
CREATE TABLE IF NOT EXISTS `direccion` (
  `id_direccion` int(11) NOT NULL,
  `detalle_direccion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_direccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table contactos.direccion: ~5 rows (approximately)
INSERT INTO `direccion` (`id_direccion`, `detalle_direccion`) VALUES
	(1, 'BARRIO JARDIN'),
	(2, 'BARRIO LA ESMERALDA'),
	(3, 'BARRIO LA RESERVA'),
	(4, 'BARRIO LOS PRADOS'),
	(5, 'BARRIO EL PEÑON');

-- Dumping structure for table contactos.genero
CREATE TABLE IF NOT EXISTS `genero` (
  `id_genero` int(11) NOT NULL,
  `detalle_genero` varchar(50) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table contactos.genero: ~3 rows (approximately)
INSERT INTO `genero` (`id_genero`, `detalle_genero`) VALUES
	(1, 'MASCULINO'),
	(2, 'FEMENINO'),
	(3, 'OTROS');

-- Dumping structure for table contactos.tipo_telefono
CREATE TABLE IF NOT EXISTS `tipo_telefono` (
  `id_tipo_telefono` int(11) NOT NULL,
  `detalle_tipo_telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table contactos.tipo_telefono: ~3 rows (approximately)
INSERT INTO `tipo_telefono` (`id_tipo_telefono`, `detalle_tipo_telefono`) VALUES
	(1, 'HOGAR'),
	(2, 'TRABAJO'),
	(3, 'PRIVADO');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
