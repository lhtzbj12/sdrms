/*
SQLyog v10.2 
MySQL - 5.6.14 : Database - sdrms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sdrms` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sdrms`;

/*Table structure for table `rms_backend_user` */

DROP TABLE IF EXISTS `rms_backend_user`;

CREATE TABLE `rms_backend_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `real_name` varchar(255) NOT NULL DEFAULT '',
  `user_name` varchar(255) NOT NULL DEFAULT '',
  `user_pwd` varchar(255) NOT NULL DEFAULT '',
  `is_super` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `mobile` varchar(16) NOT NULL DEFAULT '',
  `email` varchar(256) NOT NULL DEFAULT '',
  `avatar` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `rms_backend_user` */

insert  into `rms_backend_user`(`id`,`real_name`,`user_name`,`user_pwd`,`is_super`,`status`,`mobile`,`email`,`avatar`) values (1,'lihaitao','admin','e10adc3949ba59abbe56e057f20f883e',0,1,'18612348765','lhtzbj18@126.com','/static/upload/1.jpg'),(3,'张三','zhangsan','e10adc3949ba59abbe56e057f20f883e',0,1,'','',''),(5,'李四','lisi','e10adc3949ba59abbe56e057f20f883e',0,0,'','','');

/*Table structure for table `rms_backend_user_rms_roles` */

DROP TABLE IF EXISTS `rms_backend_user_rms_roles`;

CREATE TABLE `rms_backend_user_rms_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rms_backend_user_id` int(11) NOT NULL,
  `rms_role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `rms_backend_user_rms_roles` */

/*Table structure for table `rms_resource` */

DROP TABLE IF EXISTS `rms_resource`;

CREATE TABLE `rms_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rtype` int(11) NOT NULL DEFAULT '0',
  `name` varchar(64) NOT NULL DEFAULT '',
  `parent_id` int(11) DEFAULT NULL,
  `seq` int(11) NOT NULL DEFAULT '0',
  `icon` varchar(32) NOT NULL DEFAULT '',
  `url_for` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `rms_resource` */

insert  into `rms_resource`(`id`,`rtype`,`name`,`parent_id`,`seq`,`icon`,`url_for`) values (7,1,'权限管理',8,100,'fa fa-balance-scale',''),(8,0,'系统菜单',NULL,200,'',''),(9,1,'资源管理',7,100,'','ResourceController.Index'),(12,1,'角色管理',7,100,'','RoleController.Index'),(13,1,'用户管理',7,100,'','BackendUserController.Index'),(14,1,'系统管理',8,90,'fa fa-gears',''),(21,0,'业务菜单',NULL,170,'',''),(22,1,'课程资源(空)',21,100,'fa fa-book',''),(23,1,'日志管理(空)',14,100,'',''),(25,2,'编辑',9,100,'fa fa-pencil','ResourceController.Edit'),(26,2,'编辑',13,100,'fa fa-pencil','BackendUserController.Edit'),(27,2,'删除',9,100,'fa fa-trash','ResourceController.Delete'),(29,2,'删除',13,100,'fa fa-trash','BackendUserController.Delete'),(30,2,'编辑',12,100,'fa fa-pencil','RoleController.Edit'),(31,2,'删除',12,100,'fa fa-trash','RoleController.Delete'),(32,2,'分配资源',12,100,'fa fa-th','RoleController.Allocate'),(35,1,' 首页',NULL,100,'fa fa-dashboard','HomeController.Index');

/*Table structure for table `rms_role` */

DROP TABLE IF EXISTS `rms_role`;

CREATE TABLE `rms_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `seq` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `rms_role` */

insert  into `rms_role`(`id`,`name`,`seq`) values (22,'超级管理员',20),(24,'角色管理员',10),(25,'课程资源管理员',5);

/*Table structure for table `rms_role_backenduser_rel` */

DROP TABLE IF EXISTS `rms_role_backenduser_rel`;

CREATE TABLE `rms_role_backenduser_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `backend_user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

/*Data for the table `rms_role_backenduser_rel` */

insert  into `rms_role_backenduser_rel`(`id`,`role_id`,`backend_user_id`,`created`) values (61,22,1,'2017-12-18 07:35:58'),(66,25,3,'2017-12-19 06:40:34');

/*Table structure for table `rms_role_resource_rel` */

DROP TABLE IF EXISTS `rms_role_resource_rel`;

CREATE TABLE `rms_role_resource_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=451 DEFAULT CHARSET=utf8;

/*Data for the table `rms_role_resource_rel` */

insert  into `rms_role_resource_rel`(`id`,`role_id`,`resource_id`,`created`) values (429,25,21,'2017-12-19 06:40:04'),(430,25,22,'2017-12-19 06:40:04'),(431,22,35,'2017-12-19 06:40:07'),(432,22,21,'2017-12-19 06:40:07'),(433,22,22,'2017-12-19 06:40:07'),(434,22,8,'2017-12-19 06:40:07'),(435,22,14,'2017-12-19 06:40:07'),(436,22,23,'2017-12-19 06:40:07'),(437,22,7,'2017-12-19 06:40:07'),(438,22,9,'2017-12-19 06:40:07'),(439,22,25,'2017-12-19 06:40:07'),(440,22,27,'2017-12-19 06:40:07'),(441,22,12,'2017-12-19 06:40:07'),(442,22,30,'2017-12-19 06:40:07'),(443,22,31,'2017-12-19 06:40:07'),(444,22,32,'2017-12-19 06:40:07'),(445,22,13,'2017-12-19 06:40:07'),(446,22,26,'2017-12-19 06:40:07'),(447,22,29,'2017-12-19 06:40:07'),(448,24,8,'2017-12-19 06:40:16'),(449,24,14,'2017-12-19 06:40:16'),(450,24,23,'2017-12-19 06:40:16');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
