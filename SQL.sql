/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - contactos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`contactos` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;

USE `contactos`;

/*Table structure for table `contacto` */

DROP TABLE IF EXISTS `contacto`;

CREATE TABLE `contacto` (
  `id_contacto` double NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `contacto` */

insert  into `contacto`(`id_contacto`,`primer_nombre`,`segundo_nombre`,`primer_apellido`,`segundo_apellido`,`id_genero`,`id_direccion`,`id_tipo_telefono`,`email`,`telefono`,`imagen`) values 
(1,'JUAN','CAMILO','PEREZ','SOSSA',1,3,1,'JUANCAMILO@GMAIL.COM','12345665879',NULL),
(2,'ANDRES','FERNANDO','LOPEZ','SUAREZ',1,4,2,'SUAREZ@GMAIL.COM','161616165',NULL);

/*Table structure for table `direccion` */

DROP TABLE IF EXISTS `direccion`;

CREATE TABLE `direccion` (
  `id_direccion` int(11) NOT NULL,
  `detalle_direccion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_direccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `direccion` */

insert  into `direccion`(`id_direccion`,`detalle_direccion`) values 
(1,'BARRIO JARDIN'),
(2,'BARRIO LA ESMERALDA'),
(3,'BARRIO LA RESERVA'),
(4,'BARRIO LOS PRADOS'),
(5,'BARRIO EL PEÑON');

/*Table structure for table `genero` */

DROP TABLE IF EXISTS `genero`;

CREATE TABLE `genero` (
  `id_genero` int(11) NOT NULL,
  `detalle_genero` varchar(50) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `genero` */

insert  into `genero`(`id_genero`,`detalle_genero`) values 
(1,'MASCULINO'),
(2,'FEMENINO'),
(3,'OTROS');

/*Table structure for table `tipo_telefono` */

DROP TABLE IF EXISTS `tipo_telefono`;

CREATE TABLE `tipo_telefono` (
  `id_tipo_telefono` int(11) NOT NULL,
  `detalle_tipo_telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `tipo_telefono` */

insert  into `tipo_telefono`(`id_tipo_telefono`,`detalle_tipo_telefono`) values 
(1,'HOGAR'),
(2,'TRABAJO'),
(3,'PRIVADO');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
