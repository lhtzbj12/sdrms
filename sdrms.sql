/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : sdrms

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 11/05/2019 22:04:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rms_backend_user
-- ----------------------------
DROP TABLE IF EXISTS `rms_backend_user`;
CREATE TABLE `rms_backend_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `real_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `user_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `is_super` tinyint(1) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `mobile` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `avatar` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rms_backend_user
-- ----------------------------
INSERT INTO `rms_backend_user` VALUES (1, 'lihaitao', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 0, 1, '18612348765', 'lhtzbj18@126.com', '/static/upload/1.jpg');
INSERT INTO `rms_backend_user` VALUES (3, '张三', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', 0, 1, '', '', '');
INSERT INTO `rms_backend_user` VALUES (5, '李四', 'lisi', 'e10adc3949ba59abbe56e057f20f883e', 0, 0, '', '', '');

-- ----------------------------
-- Table structure for rms_backend_user_rms_roles
-- ----------------------------
DROP TABLE IF EXISTS `rms_backend_user_rms_roles`;
CREATE TABLE `rms_backend_user_rms_roles`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rms_backend_user_id` int(11) NOT NULL,
  `rms_role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rms_course
-- ----------------------------
DROP TABLE IF EXISTS `rms_course`;
CREATE TABLE `rms_course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `short_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `price` double NOT NULL DEFAULT 0,
  `real_price` double NOT NULL DEFAULT 0,
  `img` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `start_time` datetime(0) NOT NULL,
  `end_time` datetime(0) NOT NULL,
  `seq` int(11) NOT NULL DEFAULT 0,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rms_course
-- ----------------------------
INSERT INTO `rms_course` VALUES (1, '2020考研政治精讲1', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (2, '2020考研政治精讲2', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (3, '2020考研政治精讲3', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (4, '2020考研政治精讲3', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (5, '2020考研政治精讲4', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (6, '2020考研政治精讲5', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (7, '2020考研政治精讲6', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (8, '2020考研政治精讲7', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (9, '2020考研政治精讲8', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (10, '2020考研政治精讲9', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (11, '2020考研政治精讲10', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (12, '2020考研政治精讲11', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (13, '2020考研政治精讲12', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (14, '2020考研政治精讲13', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (15, '2020考研政治精讲13', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (16, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (17, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (18, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (19, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (20, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (21, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (22, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (23, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (24, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (25, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (26, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (27, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (28, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (29, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (30, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (31, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (32, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (33, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (34, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);
INSERT INTO `rms_course` VALUES (35, '2020考研政治精讲15', '2020考研', 100, 0, '', '2019-04-30 16:00:00', '2019-05-30 16:00:00', 100, 1);

-- ----------------------------
-- Table structure for rms_resource
-- ----------------------------
DROP TABLE IF EXISTS `rms_resource`;
CREATE TABLE `rms_resource`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rtype` int(11) NOT NULL DEFAULT 0,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `parent_id` int(11) NULL DEFAULT NULL,
  `seq` int(11) NOT NULL DEFAULT 0,
  `icon` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `url_for` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rms_resource
-- ----------------------------
INSERT INTO `rms_resource` VALUES (7, 1, '权限管理', 8, 100, 'fa fa-balance-scale', '');
INSERT INTO `rms_resource` VALUES (8, 0, '系统菜单', NULL, 200, '', '');
INSERT INTO `rms_resource` VALUES (9, 1, '资源管理', 7, 100, '', 'ResourceController.Index');
INSERT INTO `rms_resource` VALUES (12, 1, '角色管理', 7, 100, '', 'RoleController.Index');
INSERT INTO `rms_resource` VALUES (13, 1, '用户管理', 7, 100, '', 'BackendUserController.Index');
INSERT INTO `rms_resource` VALUES (14, 1, '系统管理', 8, 90, 'fa fa-gears', '');
INSERT INTO `rms_resource` VALUES (21, 0, '业务菜单', NULL, 170, '', '');
INSERT INTO `rms_resource` VALUES (22, 1, '课程资源', 21, 100, 'fa fa-book', 'CourseController.Index');
INSERT INTO `rms_resource` VALUES (23, 1, '日志管理(空)', 14, 100, '', '');
INSERT INTO `rms_resource` VALUES (25, 2, '编辑', 9, 100, 'fa fa-pencil', 'ResourceController.Edit');
INSERT INTO `rms_resource` VALUES (26, 2, '编辑', 13, 100, 'fa fa-pencil', 'BackendUserController.Edit');
INSERT INTO `rms_resource` VALUES (27, 2, '删除', 9, 100, 'fa fa-trash', 'ResourceController.Delete');
INSERT INTO `rms_resource` VALUES (29, 2, '删除', 13, 100, 'fa fa-trash', 'BackendUserController.Delete');
INSERT INTO `rms_resource` VALUES (30, 2, '编辑', 12, 100, 'fa fa-pencil', 'RoleController.Edit');
INSERT INTO `rms_resource` VALUES (31, 2, '删除', 12, 100, 'fa fa-trash', 'RoleController.Delete');
INSERT INTO `rms_resource` VALUES (32, 2, '分配资源', 12, 100, 'fa fa-th', 'RoleController.Allocate');
INSERT INTO `rms_resource` VALUES (35, 1, ' 首页', NULL, 100, 'fa fa-dashboard', 'HomeController.Index');
INSERT INTO `rms_resource` VALUES (36, 2, '编辑', 22, 100, '', 'CourseController.Edit');
INSERT INTO `rms_resource` VALUES (37, 2, '删除', 22, 100, '', 'CourseController.Delete');

-- ----------------------------
-- Table structure for rms_role
-- ----------------------------
DROP TABLE IF EXISTS `rms_role`;
CREATE TABLE `rms_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `seq` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rms_role
-- ----------------------------
INSERT INTO `rms_role` VALUES (22, '超级管理员', 20);
INSERT INTO `rms_role` VALUES (24, '角色管理员', 10);
INSERT INTO `rms_role` VALUES (25, '课程资源管理员', 5);

-- ----------------------------
-- Table structure for rms_role_backenduser_rel
-- ----------------------------
DROP TABLE IF EXISTS `rms_role_backenduser_rel`;
CREATE TABLE `rms_role_backenduser_rel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `backend_user_id` int(11) NOT NULL,
  `created` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rms_role_backenduser_rel
-- ----------------------------
INSERT INTO `rms_role_backenduser_rel` VALUES (61, 22, 1, '2017-12-18 07:35:58');
INSERT INTO `rms_role_backenduser_rel` VALUES (66, 25, 3, '2017-12-19 06:40:34');

-- ----------------------------
-- Table structure for rms_role_resource_rel
-- ----------------------------
DROP TABLE IF EXISTS `rms_role_resource_rel`;
CREATE TABLE `rms_role_resource_rel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `created` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 474 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rms_role_resource_rel
-- ----------------------------
INSERT INTO `rms_role_resource_rel` VALUES (448, 24, 8, '2017-12-19 06:40:16');
INSERT INTO `rms_role_resource_rel` VALUES (449, 24, 14, '2017-12-19 06:40:16');
INSERT INTO `rms_role_resource_rel` VALUES (450, 24, 23, '2017-12-19 06:40:16');
INSERT INTO `rms_role_resource_rel` VALUES (451, 25, 21, '2019-05-11 13:57:37');
INSERT INTO `rms_role_resource_rel` VALUES (452, 25, 22, '2019-05-11 13:57:37');
INSERT INTO `rms_role_resource_rel` VALUES (453, 25, 36, '2019-05-11 13:57:37');
INSERT INTO `rms_role_resource_rel` VALUES (454, 25, 37, '2019-05-11 13:57:37');
INSERT INTO `rms_role_resource_rel` VALUES (455, 22, 35, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (456, 22, 21, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (457, 22, 22, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (458, 22, 36, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (459, 22, 37, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (460, 22, 8, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (461, 22, 14, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (462, 22, 23, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (463, 22, 7, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (464, 22, 9, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (465, 22, 25, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (466, 22, 27, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (467, 22, 12, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (468, 22, 30, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (469, 22, 31, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (470, 22, 32, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (471, 22, 13, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (472, 22, 26, '2019-05-11 13:57:51');
INSERT INTO `rms_role_resource_rel` VALUES (473, 22, 29, '2019-05-11 13:57:51');

SET FOREIGN_KEY_CHECKS = 1;
