-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: Labo_End
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add equipement',6,'add_equipement'),(22,'Can change equipement',6,'change_equipement'),(23,'Can delete equipement',6,'delete_equipement'),(24,'Can view equipement',6,'view_equipement'),(25,'Can add laboratoire',7,'add_laboratoire'),(26,'Can change laboratoire',7,'change_laboratoire'),(27,'Can delete laboratoire',7,'delete_laboratoire'),(28,'Can view laboratoire',7,'view_laboratoire'),(29,'Can add employe',8,'add_employe'),(30,'Can change employe',8,'change_employe'),(31,'Can delete employe',8,'delete_employe'),(32,'Can view employe',8,'view_employe'),(33,'Can add unite',9,'add_unite'),(34,'Can change unite',9,'change_unite'),(35,'Can delete unite',9,'delete_unite'),(36,'Can view unite',9,'view_unite'),(37,'Can add matrice',10,'add_matrice'),(38,'Can change matrice',10,'change_matrice'),(39,'Can delete matrice',10,'delete_matrice'),(40,'Can view matrice',10,'view_matrice'),(41,'Can add document',11,'add_document'),(42,'Can change document',11,'change_document'),(43,'Can delete document',11,'delete_document'),(44,'Can view document',11,'view_document');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_Labo_app_employe_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_Labo_app_employe_id` FOREIGN KEY (`user_id`) REFERENCES `labo_app_employe` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-05-20 04:14:51.320304','1','Laboratoire microbiologie',1,'[{\"added\": {}}]',7,1),(2,'2024-05-20 04:15:15.833607','2','Laboratoire Phisicochime',1,'[{\"added\": {}}]',7,1),(3,'2024-05-20 04:15:37.140663','1','HPLC',1,'[{\"added\": {}}]',6,1),(4,'2024-05-20 04:16:35.812400','2','Abdellatif',1,'[{\"added\": {}}]',8,1),(5,'2024-05-20 04:18:44.938472','1','Matiere premiere',1,'[{\"added\": {}}]',9,1),(6,'2024-05-20 04:20:59.014505','1','Matrice for HPLC - Abdellatif',1,'[{\"added\": {}}]',10,1),(7,'2024-05-20 04:21:03.629939','1','Matrice for HPLC - Abdellatif',2,'[]',10,1),(8,'2024-05-20 05:21:29.118693','2','Equipement1',1,'[{\"added\": {}}]',6,1),(9,'2024-05-26 10:08:44.879460','3','tif',1,'[{\"added\": {}}]',8,1),(10,'2024-05-26 16:20:43.562193','3','tif',2,'[{\"changed\": {\"fields\": [\"Superuser status\"]}}]',8,1),(11,'2024-05-26 16:22:18.203011','3','tif',2,'[]',8,1),(12,'2024-05-26 16:22:33.102595','3','tif',2,'[]',8,1),(13,'2024-05-27 04:12:19.122498','4','newuser',2,'[{\"changed\": {\"fields\": [\"Role\", \"Is staff\"]}}]',8,1),(14,'2024-05-27 04:14:46.932068','4','newuser',2,'[{\"changed\": {\"fields\": [\"Last login\", \"Role\"]}}]',8,1),(15,'2024-05-28 07:32:49.701539','17','AD/dsad',1,'[{\"added\": {}}]',6,1),(16,'2024-05-28 07:33:01.712653','17','agi/1231',2,'[{\"changed\": {\"fields\": [\"Code machine\"]}}]',6,1),(17,'2024-05-28 07:59:47.026021','18','2 KILIAN',1,'[{\"added\": {}}]',6,1),(18,'2024-05-28 11:35:52.215094','19','2 KILIAN',1,'[{\"added\": {}}]',6,1),(19,'2024-05-28 13:30:10.133381','16','Matrice for agitateur - abdo',1,'[{\"added\": {}}]',10,1),(20,'2024-05-28 13:30:20.348023','17','Matrice for agitateur - Abdellatif',1,'[{\"added\": {}}]',10,1),(21,'2024-05-28 13:30:24.855465','18','Matrice for agitateur - tif',1,'[{\"added\": {}}]',10,1),(22,'2024-05-28 13:30:29.859767','19','Matrice for agitateur - newuser',1,'[{\"added\": {}}]',10,1),(23,'2024-05-28 13:30:39.057760','20','Matrice for Balance - abdellatif elkerbani',1,'[{\"added\": {}}]',10,1),(24,'2024-05-28 13:30:46.864548','21','Matrice for HPLC - abdo',1,'[{\"added\": {}}]',10,1),(25,'2024-05-28 13:30:51.332568','22','Matrice for Balance - abdellatif12',1,'[{\"added\": {}}]',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(11,'Labo_app','document'),(8,'Labo_app','employe'),(6,'Labo_app','equipement'),(7,'Labo_app','laboratoire'),(10,'Labo_app','matrice'),(9,'Labo_app','unite'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-20 04:11:47.097022'),(2,'contenttypes','0002_remove_content_type_name','2024-05-20 04:11:47.183881'),(3,'auth','0001_initial','2024-05-20 04:11:47.684210'),(4,'auth','0002_alter_permission_name_max_length','2024-05-20 04:11:47.784026'),(5,'auth','0003_alter_user_email_max_length','2024-05-20 04:11:47.792874'),(6,'auth','0004_alter_user_username_opts','2024-05-20 04:11:47.803054'),(7,'auth','0005_alter_user_last_login_null','2024-05-20 04:11:47.808829'),(8,'auth','0006_require_contenttypes_0002','2024-05-20 04:11:47.816649'),(9,'auth','0007_alter_validators_add_error_messages','2024-05-20 04:11:47.822560'),(10,'auth','0008_alter_user_username_max_length','2024-05-20 04:11:47.835293'),(11,'auth','0009_alter_user_last_name_max_length','2024-05-20 04:11:47.841253'),(12,'auth','0010_alter_group_name_max_length','2024-05-20 04:11:47.866754'),(13,'auth','0011_update_proxy_permissions','2024-05-20 04:11:47.880575'),(14,'auth','0012_alter_user_first_name_max_length','2024-05-20 04:11:47.887535'),(15,'Labo_app','0001_initial','2024-05-20 04:11:48.978457'),(16,'admin','0001_initial','2024-05-20 04:11:49.174102'),(17,'admin','0002_logentry_remove_auto_add','2024-05-20 04:11:49.184309'),(18,'admin','0003_logentry_add_action_flag_choices','2024-05-20 04:11:49.192507'),(19,'sessions','0001_initial','2024-05-20 04:11:49.272062'),(20,'Labo_app','0002_equipement_code_machine_equipement_connecte_ad_and_more','2024-05-22 09:49:59.889330'),(21,'Labo_app','0003_equipement_image','2024-05-28 07:22:47.252063'),(22,'Labo_app','0004_alter_equipement_image','2024-05-30 14:35:11.945095'),(23,'Labo_app','0005_alter_employe_role','2024-05-31 15:59:13.777195'),(24,'Labo_app','0006_unite_responsable','2024-06-03 15:39:01.224548');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('027qj44xo0kbczqijbyl6y5s310k6si7','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7ja:-uJcnURbwC5DbwfiA7ER6BqhDogD7DIpKW4EEH4q0vM','2024-06-14 19:16:14.506109'),('0jzptx72qmp3gmp5jnqxvlwk2unge80g','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBApZ:X1FFlxy_FdmO-OloHDc6mdA9O-MKfBZoPFntZNDRtBE','2024-06-09 10:10:21.809123'),('10ukslhw75v7klfwc6s9vxfbwht159b8','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sB7EF:mZc1XND5tkMIZWtcB7VDaBFzsXkHa2g0FkgM1eZhKGQ','2024-06-09 06:19:35.974319'),('1ohuy4ge674t645kn8zad2eemk3wlsk2','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD4yZ:jAHwKKxCS8x7arNHKfYNKETjdVUEKq7JNIEaNXgLKpI','2024-06-14 16:19:31.748615'),('24qsko9o10h9m8i16tga8etkuvxe5eug','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAqX:JY_PgiSOL0zAl42PjkXMruJ58chR9YRNZgsql4P9Sjk','2024-06-09 10:11:21.833969'),('26rp6gb5u3jqk5iup33elue7yj1nhzr0','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBRj2:VjFq0gT38DTMVXrPAiZdk5hy8_KGyN83Tgz7dmkpfN0','2024-06-10 04:12:44.513452'),('395c9vb8z73ah80pzqeq7he34krohozr','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBB69:1qUwRdpe1yeyI1ZZtpTRFdS7djLkXpidu1L0t6lNpRY','2024-06-09 10:27:29.701292'),('3l51b1vmxw0ksy9codht326xywz742wb','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5Pg:VV0naQeceZFZrLgqCXAivgzu7TtgvjkEAgP1OWlxJrY','2024-06-14 16:47:32.029156'),('3mgo8pfo5uqmjegigqmxiz5sam0v97y5','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD8og:orrSxusnjoyehqKKgp_M_Z_Ywlr19HdU8_xDjbuabCU','2024-06-14 20:25:34.117265'),('438h89oou2npymnvgtx7y6amugdgy6jn','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5PH:8aV1thqgiDxU6S0wS_b4QozakanW7Fb8xrj3JMp_8Wk','2024-06-14 16:47:07.903335'),('4zpfty5ytyni7e67sfio7a63dsgb3301','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5bH:WuGplDOStwVCot7F8_rqmd0igdJjfLY7WFYE1Qt3JKo','2024-06-14 16:59:31.176463'),('5as69i6wri9z6f6kt180lc08tj3s3zd7','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7kO:fKnekfmuAsS-gHQuoNVMGD7Q_owvhDxeldji-Tx2pmw','2024-06-14 19:17:04.471223'),('5fmfsvu61elv2bbz9n94k3l9vb6br7zi','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAl8:LEy-sEu6vZagZJnFo6w-lrDu9XnbDaWDtTpJvoTn0HQ','2024-06-09 10:05:46.483776'),('5qn9xgcn2g5a745qcww55bkyjydl9n9w','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBRiO:Zi4cUiYGb0dSxNqieP9R-BCQwfpFEsfHsDLwktl0G0o','2024-06-10 04:12:04.973205'),('5yrlq5kcxllikpnf0hi0rwmv94k99pg3','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD4x4:jCXm9zsULjSh40MAKV_F5H1o9fqQlXAPoRYZV4Al8QQ','2024-06-14 16:17:58.589729'),('7vvl9zm94s12le0g2payby5usydbf4dg','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAj0:NjDFOhgP9awPT9_ZRnJzcf25lWhZHKnsMU9TMc4dwKE','2024-06-09 10:03:34.880820'),('84y677wdha4tecxmuf9wvm9wazhay16x','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sD4gf:dXmWutcnpT8e1vZ5SOy9HS0U19nDu6xtVI3WgkNZBGM','2024-06-14 16:01:01.728494'),('8620gg6pst7i6mvk5689pmk2sekwt9ep','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7nl:VlIzpvXwTI_rLkldsux7mnk-LKZ-kpYznVSAW1e-CQ4','2024-06-14 19:20:33.070858'),('86j9w2hrtipe0rqd3nftiebvfdraa7eg','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5aV:TfuNTgTLe2fmp0CW2XWJc_kvFA3JYQfDAjU38S2PYy0','2024-06-14 16:58:43.164995'),('8gfe9yb5v9kadnfpv88s4pf4qhxfu8le','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAmy:5VK_VvkD57zYlQl8fr_2_NQ3kQD_pfFFkHj4gKotTzw','2024-06-09 10:07:40.705974'),('8ijxwb5iruu8z4ekk48727jgpn67k92m','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7sE:F2wzlDWtmRDtZlXo2ofucnQaW2maZoDVQIQqkM0eCdA','2024-06-14 19:25:10.878697'),('8pt4cskf1u19aycpjepgujonsybdfisk','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAmO:e4LRyJ2dIKbshztTJuWjHP7_li0u0RE2MTQOuq_YuJE','2024-06-09 10:07:04.665090'),('9b8c25np7kk6nl8nk2nkq2gi1zvg486j','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sCv2x:Q46lg1YYbOwgVwzJS1GT3_Fo85qITo2jKzkXU7pXOTk','2024-06-14 05:43:23.249741'),('9ff9dr4vi4wcjhqt6r853z0ysfnn939p','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAYx:xV8RSWeWWGqdez6WyXzDrBZtJ7iEZ7sSpFATIwp_ryA','2024-06-09 09:53:11.016510'),('a0h27ndr0lihdd8gmrx92zep7gaap7gr','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sD3DK:0Lkcl4UWziJIp0WM91LfiL-ISaXb6QjDjpaF7M-zGB8','2024-06-14 14:26:38.796973'),('a6v0oxd35x858wg1w54638yjztrhmrfk','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAmX:-BbqS5dB6GjjsHuF_wf2eaAZCmSQimEcTKN3_BG01MI','2024-06-09 10:07:13.474342'),('apdh49p7kktxbr01x3eqvvrwqxxkjt64','.eJxVjEEOwiAQRe_C2hCYtgIu3XsGMgwzUjU0Ke3KeHfbpAvd_vfef6uI61Li2niOY1YXZY06_Y4J6cl1J_mB9T5pmuoyj0nvij5o07cp8-t6uH8HBVvZauOGhMxGQpIz9MjiLQt46MWDFbeB0NkMJgxAGdAieXIWgRx1yYP6fAEYzTha:1sD4jH:WZGtMcItb_aoWu0eXCj5tYW8DujXPIaJFXjLZ9xMkAk','2024-06-14 16:03:43.198224'),('bb88rrvt5dumgdcktp14q7mc147jfi2j','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sD31w:w3LiwvWMUCCv3Q-ImFedcBEB2YT4Vcs2LWrXPv7PbCQ','2024-06-14 14:14:52.356646'),('bupnpa8zopm99w0x55ql09zh47twjvgs','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBv6f:a37duGUt5RPhb9VGBzX2v-Mms4CEAzcCKgztyO5vS5E','2024-06-11 11:35:05.707870'),('byqww0ldwidb9il79zc95liq2hftqnid','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sCTJl:DBNuMOvxXYAjK-apK4s4ISZC1nzWCFiWascAadD4urY','2024-06-13 00:06:53.183137'),('c0m6t6rilbfsb5zepiu1lun3xpsf4ng2','.eJxVjDEOAiEQRe9CbQgiDGBp7xnIDAOyaiBZdivj3XWTLbT9773_EhHXpcZ15DlOLM4iiMPvRpgeuW2A79huXabelnkiuSlyp0NeO-fnZXf_DiqO-q1N0Ox1yIaRFWrFCGS9dQoKWO-zdZRCAVW0LwkMnPQxkwuWCTB4R-L9AeEiN8o:1sD4Vd:mhv0hbIzTwR1ySiY7RhN9K_NKf8IwEWLjwQuvYuvACQ','2024-06-14 15:49:37.393193'),('d0h6fhuw6h8s1z5pupl077ufl9v79qs5','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7ma:8Q1d98xE-PX4L2uTh1sFvNoNsKUv3ETdKFKsSIVUuDE','2024-06-14 19:19:20.204047'),('d8ncphlkdrarbrh5suga3ew5mv6wsm9d','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1s8uPg:_S1LVfGYeNkJvm5RydrOR1MoLt_B3qmZEv8trAiUW7g','2024-06-03 04:14:16.680577'),('em7be9oo4xxl3n2x6t2ow5hbx1i28m9i','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBJ2E:koKZk-J7wM3x24GaEeHRr--UHw46As69Y7S67CQ9XJw','2024-06-09 18:55:58.746602'),('f029f1961hhdcdyastxjsy44s5pdd6ql','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7mS:t5rIyJHR5bovflvW-4gq9U8LQaB1P_orip6NiEXyXwA','2024-06-14 19:19:12.120341'),('fvbi5doxmwo2wynokrn0sd3olij3t6li','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sDrVF:58BmHjh4hw9O4MC8ecJl5wJVyp7-lq16DoskxvJlPQg','2024-06-16 20:08:29.435006'),('ga228mrsyfef2lcdocpd7lwikh8bx89y','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAl1:b_q0elC-RfCGs312hb3IbHLV1mdcC0AEAeWR6OetIPs','2024-06-09 10:05:39.044340'),('ghw7t44x4rhacp4ks9fln6lyxgyjdpmo','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD4oP:dzP2ebLLH4SDEp5QqAUrm-Nxqk4mCqRvkIzJxGkXL6c','2024-06-14 16:09:01.734986'),('hd1u2hn2gmubbgj9uu90pxg6wdfbbgsy','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBauF:JMUrQBsXjBnAQQ9lk5q148DlYPoRMvWwuyQ1AVesH00','2024-06-10 14:00:55.232771'),('hnvy1kxt79s72lrmx6hcjk6y1jisbrmq','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAjH:iarpYs_kxGe1RBqeEgQopI_ZBZPUIEYM7p1PJYjTzy0','2024-06-09 10:03:51.771925'),('i7206kzlkhzigm1l59i76p8b44mcs0ft','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD8oK:EHSrXtRFsME1Td5EE7RrZuXwtqGba9FYM61KYHTItLo','2024-06-14 20:25:12.075165'),('ifxj8clxtu3pfd1u5k1npsjwv1f09baq','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5bU:1ohCKiAUlK2vgU64OCif7T0T9DyzkkLYeglaCvJ2yxA','2024-06-14 16:59:44.332687'),('j48gitpc87z95v13p79yyegpth36c3xw','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7gu:09FLVnbuDR0S0HQbOEe1ZqjNxQZN9kWm7MvbTvjagZE','2024-06-14 19:13:28.403339'),('jbljx7qvf8w2416xn0ctg9cvmf5rvru5','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD4kf:8IhILZzQ3Z7OBBF0MAJBLtCzQ1UsgdbLF3eA6aC13hw','2024-06-14 16:05:09.338230'),('k0lu89sve6h3diga00wu2llih2db38iu','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBJ2c:cJpjzq-a5_gJRBx-g-dHnLNI21UdVoiw1ATsbEzzGGQ','2024-06-09 18:56:22.856673'),('k5c9yl50kimbj7c6ss3karrd5vr7fx8y','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBrIq:41LnjKQeG1AWgNrJu0qvy2zLk_ePIIom_g1jYHqApXU','2024-06-11 07:31:24.070094'),('k6za5ofy5epgm4ktlfif92r9a17ambj4','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAf1:g1-X20HpXkYLsxuhwPJGj2bluVdzPkwlSz4IcCh9ESA','2024-06-09 09:59:27.956621'),('k9jrom8zi05p3wiqady033t9yoz2itya','.eJxVjEEOwiAQRe_C2hCYtgIu3XsGMgwzUjU0Ke3KeHfbpAvd_vfef6uI61Li2niOY1YXZY06_Y4J6cl1J_mB9T5pmuoyj0nvij5o07cp8-t6uH8HBVvZauOGhMxGQpIz9MjiLQt46MWDFbeB0NkMJgxAGdAieXIWgRx1yYP6fAEYzTha:1sD4jy:vb_DnPXFC7sUkRmP_t4rMGDLPan_YPgi4P1G6Ltlyk0','2024-06-14 16:04:26.504082'),('kczfl0t6vfzq8k0qwuu6g914p9z76ksg','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBGZg:maehpGF_FdkoB7XBhRBKQVPm6W8ZwNTF-oySLg8BXJQ','2024-06-09 16:18:20.266288'),('khn9bt0smqhl0n8xfbfysvtm4wzqobe8','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5an:70PuWXRjOyI0jEhWrMpB3MNden1CtW5L5TlqwzPolW4','2024-06-14 16:59:01.522630'),('kq758nd7vxogg407ydqm9zv3t8jgvk8u','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7jG:bflAXliZBSmwtHqe2lZuOb9fYohzaUkCrBClb0kkgJg','2024-06-14 19:15:54.016156'),('lft3v3n90kfwzti405ew2c8ksrfs8jmn','.eJxVjDsOwjAQBe_iGllh_VtT0nMGy_aucQA5UpxUiLuTSCmgfTPz3iLEdalh7TyHkcRFoDj9binmJ7cd0CO2-yTz1JZ5THJX5EG7vE3Er-vh_h3U2OtWs6NEXCACFTVkXxCHYnR0CrJBzc5bRa5kr1BZQDhbzE4b8CqVzWPx-QL9fzfQ:1sD3kN:n0w6_pzxUAMBxdIrEzWwxqBrN739Rm1fvcuHV8Jp0OY','2024-06-14 15:00:47.929305'),('lxup8rkizxchlz5rszjfn3umcybdiksm','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAhu:Z157__tLc9KiL7MaAa5KUGKYGDzfMVIjCN6d69EBV0M','2024-06-09 10:02:26.251579'),('mbph2bd00bsex3xqel94qieeuzsuqiqj','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7oF:m9OH-Z-vf4UbW0eEkrC_iNix45T-ogo6KhdEjhlZ5JU','2024-06-14 19:21:03.840533'),('mdf89lvmp6r2jy6c4ihd0pd60rv2v3rx','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5cX:I4SUQRm1TtRTfYQ3F05aoYlOPnn_eLZlqWAw_lJlD74','2024-06-14 17:00:49.144115'),('mi6q0mryd4vsha9ku70qmhkzj18k1whc','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5Ox:-lagMlShXp5cgN7kHvCxlEKBl4KoBPCkl6iAsDt-xfc','2024-06-14 16:46:47.233139'),('mu3e951lnht8rfhaax6eot11ba8d4mqs','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBUk5:wWG_ZkWPyX7ZESon7KWrNyWVcAnOWi9Hvi_V6N4bFlA','2024-06-10 07:26:01.476919'),('n1z371dauxjrson6baovd0gz5len61w9','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sEP1Y:u0kYm9NjqXpVQBnUsoBkPCkcCOmJ_XasSqWmL7l4V2s','2024-06-18 07:56:04.427832'),('nq9jmja2qeqpnefz7xaqe6abym8fcz28','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAlT:-E4gP0ADP4cVordbuHJcYUgiFaoElTiTSP1KUC1bvdI','2024-06-09 10:06:07.253312'),('nqnk3a7cw9ctci57n49jjj9xovbhesy0','.eJxVjDEOAiEQRe9CbQgiDGBp7xnIDAOyaiBZdivj3XWTLbT9773_EhHXpcZ15DlOLM4iiMPvRpgeuW2A79huXabelnkiuSlyp0NeO-fnZXf_DiqO-q1N0Ox1yIaRFWrFCGS9dQoKWO-zdZRCAVW0LwkMnPQxkwuWCTB4R-L9AeEiN8o:1sD4Xv:G_uMUUgDY7bSo-mRTkJwfBInGZ45dHlTPrz2ma4HRbU','2024-06-14 15:51:59.232810'),('o5wtj1aapey91n3b0oedjykswtihyuwz','.eJxVjEEOwiAQRe_C2hCYtgIu3XsGMgwzUjU0Ke3KeHfbpAvd_vfef6uI61Li2niOY1YXZY06_Y4J6cl1J_mB9T5pmuoyj0nvij5o07cp8-t6uH8HBVvZauOGhMxGQpIz9MjiLQt46MWDFbeB0NkMJgxAGdAieXIWgRx1yYP6fAEYzTha:1sD4is:IUA4IXH5KaJnpQdJE8caeMP7iA6ApBz3t-DoO_UNTz4','2024-06-14 16:03:18.379333'),('oydifn29zslbrxpo5oi4vm0mdzw8jeqe','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAj9:PDhN1KM9uT3neAihXEtvG7m3gd33VIh3GIDPpwfN5jA','2024-06-09 10:03:43.173072'),('pfle1w9h4j7noi69kh3hm4uddygg200a','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBGkB:46TU20Qi9KGcoHs2y0cRiin5SF9tMgd1zvmLRlgrEJY','2024-06-09 16:29:11.264330'),('pk6gxdgp0unqkqrazcmf8rd7rxf67tjs','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBRlA:pAitS4p4Z-A2tZS1JDQc4ZuUDyD4WWrr4TMehTxmfbQ','2024-06-10 04:14:56.915082'),('pl5m42ffd7qk1r0srpoxakw1j8i7ptfh','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBVNr:MZFf6fHfLVh33u0ptJF9gpx3KNadPBmmpv-UOMpkio0','2024-06-10 08:07:07.958854'),('pveboq9g25ozs8zho6851l9kumxx1f1l','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBGzu:tWTA7Y-lAR5kj6Q6WKP6ACLOOUHdHDVDyBT1EYjOxvI','2024-06-09 16:45:26.035377'),('qa2zcyqedzck3d910d8whkvqo09n7jh1','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7lS:RT76yYKvax4CiBfd3iRyNt9DtKs7h2023EPQWrXtWYs','2024-06-14 19:18:10.082189'),('qa5blx4g8de5emx5m68kcxtdh9fp6jl4','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBAhm:2a6mqdEyrgjAv2-deDVb6RrLyp_Sv9Fj5j1I7PJpHSs','2024-06-09 10:02:18.935225'),('qbweowz15492iz8cpzyntopjyqsej84i','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sEOzn:vdbOxQo7jN-YLOByVUc36o5DGqJ_okwrmLkSqkzfiNQ','2024-06-18 07:54:15.911495'),('qc28g90indsvycr2s2hvrfj4yc0fxa7r','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7n2:aIqU2MsqMG1ldd4lLUVi3ZwPK1jSltUtReZKHHWseYQ','2024-06-14 19:19:48.783137'),('qcoskj9kjsoiwaliwq5uxqqd51qdv2dt','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5bj:LYy9CVl4PfHFDoYV-77Ihy8nCxj1VNvTbsB-vZJ8rrg','2024-06-14 16:59:59.090434'),('r70o725wgvuwpcpvanfgob2pk8c7zce2','.eJxVjEEOwiAQRe_C2pCRMg24dO8ZyMAwUjWQlHbVeHdt0oVu_3vvbyrQupSw9jyHidVFWXX63SKlZ6474AfVe9Op1WWeot4VfdCub43z63q4fweFevnWyNG56JkRHVjgMxqiPDKgyCAJR4gi3rGAeDuwZUtC1jgvhgwYVO8P_WQ4aQ:1sBJ2L:U1rWdwRYtBNZnng8AiIuuxkPF0i2MATqHsAkzgkIjxo','2024-06-09 18:56:05.595176'),('rbe72uwfei92lli10w72y73og07g8ezy','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBGVD:01aFzllbdAlejG6oDbr7tuwu9KkELLKDmGrPey7hhUA','2024-06-09 16:13:43.728754'),('rrm43co9lvf8dm1lktyjgwciep1sfmb3','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7vT:uw8b9TO3XYFkaNWJwvUw6518t-5gffgXFOdxeB6vc4I','2024-06-14 19:28:31.687721'),('sxd1lyags5gsdi52n2g2fkepe5zz6adn','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5cn:71LE6tBRHbmuES65ef8_wCbTaqH4zy7BwR6KndVqO4c','2024-06-14 17:01:05.688048'),('t5senjplqbdc76cjqnploa0i7r2zc864','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sD3BY:-IfmeO8Gl7xoKng7tetFve490Lxk57V-qboGiwV3AhI','2024-06-14 14:24:48.943687'),('tpanrohr2fjzgm2ee41wnsdvhri78vyd','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7nE:9JkjdA_4I88-AhahoTLSJgba8PEb_kok6Crtf1g_D6o','2024-06-14 19:20:00.927498'),('tsqwd4xcog03c7oqsi9m2pa8373mxerj','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sEP1G:5ENWVo14EqPYlPXN4PTEm1z-u1nITySaQH6PeFPsBCs','2024-06-18 07:55:46.019396'),('tvvrbwe1fhj828db1nxq6xliwfcgk6lq','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD4nU:MemxedQgmwqfWPDQlcGNT7UxHAd9bZ02YBTozGRxtQc','2024-06-14 16:08:04.379823'),('u40yfshx80k4a90sx8kdsljwahnr75c9','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sEPO0:Nbh_7lTRr3hGr07iry2pEPm6LKsX3FNEId2nyzprHOY','2024-06-18 08:19:16.098404'),('u49b6ede0r5wf2uh4stu7ufba2wsmmsd','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sD3Be:JKLM33JhEdtltV1QnasyUxf5D_XrOzmi5mwuF-aOMtk','2024-06-14 14:24:54.728489'),('uaed42vq6qt4phawbznv6041jlcfzq01','.eJxVjDsOwjAQBe_iGllh_VtT0nMGy_aucQA5UpxUiLuTSCmgfTPz3iLEdalh7TyHkcRFoDj9binmJ7cd0CO2-yTz1JZ5THJX5EG7vE3Er-vh_h3U2OtWs6NEXCACFTVkXxCHYnR0CrJBzc5bRa5kr1BZQDhbzE4b8CqVzWPx-QL9fzfQ:1sD4R8:fIFC7k4LiUyzHMoM_ugxA41zzjSmkDrbcgm3OPSqK4A','2024-06-14 15:44:58.578276'),('uvycgmktlhvv2m1f5s74qn39owsjdsqb','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1kGAapGkhKuzL-uzbpQrf3nHNfLMK21rgNWuKc2ZlJzU6_YwJ8UNtJvkO7dY69rcuc-K7wgw5-7Zmel8P9O6gw6re21oIKJCCoAgqNyxQmo8GSk16G4gV4KchraUoChxYNks9KTV4ZLZC9P_29N7E:1sD7iD:4Si_QuS7oLnOOSFDfoyNWLme_PI43Ds_fq1DWVfyw_A','2024-06-14 19:14:49.725291'),('vh3wzndqdtwmylzrsw41sn8c1oxyeuot','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7v5:3fhJa4Kuid9MlChUacEWCKkuBrVk7jpiI3DEW_34K2g','2024-06-14 19:28:07.242823'),('xg4h5rrf4dmn8hlu52go9pzf4os1j1q8','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBGYb:cd7UqYFpQ-sTFKwGx7G21u8JPz2xT6BKnQHJAYsYUiI','2024-06-09 16:17:13.460380'),('xnslgjy32gjb6ly5pyljod40p2ps4mbc','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD4qh:m8grFgok2028oGvHofk8KBlMW_1Ep1XEddaxAjdrYBw','2024-06-14 16:11:23.570619'),('xsgh0mov3o1vkfmfx0xm37hgfbwj4tqd','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5k7:1AvhMkGscII8EeU2UWESQ0X6_L58cGSmnPIlymd8xEI','2024-06-14 17:08:39.893655'),('xxwjv2nl89ycd90haci9tdszxukhprnt','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD5b1:4nUAu7b6WJui5AylqkjkxwKPfHaDIFIVNezu33ySRPo','2024-06-14 16:59:15.597743'),('yab6yn0rcke00sojh1m7bpurxwy7sw98','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sD32w:l_f-gfhUnU5YDeFvwIZRPmtLj6QhTE-I0fezBtTxLQs','2024-06-14 14:15:54.662180'),('z5onipiasexeclu8y8a6dbh0jaf6tlyp','.eJxVjEEOwiAQRe_C2hCgIMWl-56BzDBTqRpISrsy3l1JutDte-__l4iwbznujde4kLgIbcTpFyKkB5du6A7lVmWqZVsXlD2Rh21yqsTP69H-HWRo-bseKZxdGoCCVV5z0EhjYlKWWA-owBtvYZ61Q1KBnOFOgh8AbCKDJN4fFec4uw:1sD7rx:kbx14jaz02ZrN_Pg1zuJ3dSQx8d95fTB4I7wXYfo-2Q','2024-06-14 19:24:53.379288'),('zq77tq61w6vxldq2foejtng3d1jttpzz','.eJxVjMsOwiAURP-FtSHlEaAu3fsN5D5AqgaS0q4a_9026UJ3kzlnZhMR1qXEtac5TiyuQonLb4dAr1QPwE-ojyap1WWeUB6KPGmX98bpfTvdv4MCvexrIoLBwahGZ_eggzdOczbEgyX2PkOAnCkFjeBNsAEtKq-VZmTjkhWfL_TcOFs:1sBGVc:B2ZQ1IgwYncZTLFtcl7vvSnHBgR2H_PlIMv8_RShN4g','2024-06-09 16:14:08.333308');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_document`
--

DROP TABLE IF EXISTS `labo_app_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_document` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `pdf` varchar(100) DEFAULT NULL,
  `equipement_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Labo_app_document_equipement_id_336b3066_fk_Labo_app_` (`equipement_id`),
  CONSTRAINT `Labo_app_document_equipement_id_336b3066_fk_Labo_app_` FOREIGN KEY (`equipement_id`) REFERENCES `labo_app_equipement` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_document`
--

LOCK TABLES `labo_app_document` WRITE;
/*!40000 ALTER TABLE `labo_app_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_app_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_employe`
--

DROP TABLE IF EXISTS `labo_app_employe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_employe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `role` varchar(30) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_employe`
--

LOCK TABLES `labo_app_employe` WRITE;
/*!40000 ALTER TABLE `labo_app_employe` DISABLE KEYS */;
INSERT INTO `labo_app_employe` VALUES (1,'pbkdf2_sha256$600000$uytTIJ0r48qAsNvwQQ1rYz$0aMCYeTObVWMIWNpekuVb2Hf/oGjqksxfUUhGie3AW8=','2024-05-31 16:01:01.702483',1,'abdo@gmail.com','abdo','analyst',1,1),(2,'Abdo123',NULL,0,'abdellatif@gmail.com','Abdellatif','analyst',0,1),(3,'Abdo123&&&',NULL,1,'tif@gmail.com','tif','analyst',1,1),(4,'pbkdf2_sha256$600000$Yp5sriRMzEvUv8SwotvbzT$cUSjkWmR6L0LS6slIeDz5dB7DVYmS7oWyRGQIolhhRE=','2024-06-04 07:54:15.844060',0,'newuser@example.com','newuser','analyst',1,1),(5,'pbkdf2_sha256$600000$4Jz9eGR1TOWkoxcm6ZdAfA$BJc3OGTscX8BCybAW7YIeGbJykYWMqF9gN25g+fXOdw=',NULL,0,'t@gmail.com','abdellatif elkerbani','analyst',0,1),(6,'pbkdf2_sha256$600000$H0KK89uPrv9fUjPzZrzSWx$uep5sgJPgURB4J3RBSeCRCP/blK1wRYu0H47ty3VxDk=',NULL,0,'abdellatif12@gmail.com','abdellatif12','analyst',0,1),(7,'pbkdf2_sha256$600000$vXOxowLrCNuGTtZZJJef3G$+CZ1dpvuXYk0zu2Bs1jM5Ee0qgTn5PXRUWqvtHRI3Ig=',NULL,0,'admin@gmail.com','abdellatif12','admin',0,1),(8,'pbkdf2_sha256$600000$jVDSSs2ZiNr2PB75Wwkkkp$UbP7UwX3nGe50DBYcArxvfIm63xhcvHN9LtZXDDMnAw=','2024-05-31 15:44:58.564109',0,'pls_god@gmail.com','incha2alah','admin',0,1),(9,'pbkdf2_sha256$600000$wuCtlVe2TlZ72dD3IXIuIv$JnBDcYNGhQ88nzFKt8JfiiTU5lOOF0LjiVgCYvKZMRg=','2024-05-31 15:51:59.225209',0,'analyst@gmail.com','analyst','analyst',0,1),(10,'pbkdf2_sha256$600000$Z5RVzpcdgJMNFF2lFpTtsq$stUMBKwexL3FF7EC4KRU4/lA5NtPmQ/GavTc+ErsUc4=','2024-05-31 16:04:26.493112',0,'tech@gmail.com','tech','admin',0,1),(11,'pbkdf2_sha256$600000$9N1taChKJoMaHHmGwS0Tog$wYM+v3wBawBz+M6A3aWQFTBFZXBLoWhESz531WuCsNc=',NULL,0,'teeech@gmail.com','tech','Technicien',0,1),(12,'pbkdf2_sha256$600000$lgC8e7ggO6h2u7S4Co475x$FyCfSdtDHirJfD6hltpL9vMrQZOxNwDPAFtVe0aWrhM=','2024-06-04 08:19:16.079941',0,'admiiiin@gmail.com','admin','administrateur',0,1),(13,'pbkdf2_sha256$600000$ypqOvT4aRcJyPeDZNj40YK$ikpPHUaiaYEQXr3q9kgN6CvuBZCT/Y8+yVwg0FGV6EU=',NULL,0,'ana@gmail.com','ana','analyst',0,1),(14,'pbkdf2_sha256$600000$N0pSB9rs4mxAxzh1AlFHiU$f92cvazJXtxga4mlKmawQ03qxrP99ZDc3+DJM2DfbcY=','2024-05-31 20:25:12.034360',0,'anan@gmail.com','ana','analyst',0,1);
/*!40000 ALTER TABLE `labo_app_employe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_employe_groups`
--

DROP TABLE IF EXISTS `labo_app_employe_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_employe_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `employe_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Labo_app_employe_groups_employe_id_group_id_7e46eade_uniq` (`employe_id`,`group_id`),
  KEY `Labo_app_employe_groups_group_id_1daad722_fk_auth_group_id` (`group_id`),
  CONSTRAINT `Labo_app_employe_gro_employe_id_a74371db_fk_Labo_app_` FOREIGN KEY (`employe_id`) REFERENCES `labo_app_employe` (`id`),
  CONSTRAINT `Labo_app_employe_groups_group_id_1daad722_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_employe_groups`
--

LOCK TABLES `labo_app_employe_groups` WRITE;
/*!40000 ALTER TABLE `labo_app_employe_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_app_employe_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_employe_user_permissions`
--

DROP TABLE IF EXISTS `labo_app_employe_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_employe_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `employe_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Labo_app_employe_user_pe_employe_id_permission_id_66d717da_uniq` (`employe_id`,`permission_id`),
  KEY `Labo_app_employe_use_permission_id_47aa8159_fk_auth_perm` (`permission_id`),
  CONSTRAINT `Labo_app_employe_use_employe_id_d9444179_fk_Labo_app_` FOREIGN KEY (`employe_id`) REFERENCES `labo_app_employe` (`id`),
  CONSTRAINT `Labo_app_employe_use_permission_id_47aa8159_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_employe_user_permissions`
--

LOCK TABLES `labo_app_employe_user_permissions` WRITE;
/*!40000 ALTER TABLE `labo_app_employe_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_app_employe_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_equipement`
--

DROP TABLE IF EXISTS `labo_app_equipement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_equipement` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appareil` varchar(100) NOT NULL,
  `laboratoire_id` bigint NOT NULL,
  `Code_machine` varchar(20) DEFAULT NULL,
  `Connecte_AD` varchar(100) DEFAULT NULL,
  `Connecte_reseau` varchar(100) DEFAULT NULL,
  `Etat` varchar(100) DEFAULT NULL,
  `Etat_materiel_informatique` varchar(100) DEFAULT NULL,
  `Fournisseur` varchar(100) DEFAULT NULL,
  `Logiciel` varchar(100) DEFAULT NULL,
  `Password` varchar(20) DEFAULT NULL,
  `Sauvegarde` varchar(100) DEFAULT NULL,
  `Situation` varchar(100) DEFAULT NULL,
  `Version_windows` varchar(100) DEFAULT NULL,
  `connecté_imprimante` varchar(10) DEFAULT NULL,
  `date_installation` varchar(100) DEFAULT NULL,
  `modele` varchar(100) DEFAULT NULL,
  `numero_serie` varchar(40) DEFAULT NULL,
  `planning_sauvegarde` varchar(100) DEFAULT NULL,
  `version_logiciel` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Labo_app_equipement_laboratoire_id_c30776fa_fk_Labo_app_` (`laboratoire_id`),
  CONSTRAINT `Labo_app_equipement_laboratoire_id_c30776fa_fk_Labo_app_` FOREIGN KEY (`laboratoire_id`) REFERENCES `labo_app_laboratoire` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_equipement`
--

LOCK TABLES `labo_app_equipement` WRITE;
/*!40000 ALTER TABLE `labo_app_equipement` DISABLE KEYS */;
INSERT INTO `labo_app_equipement` VALUES (25,'HPLC',2,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','null','equipement_images/scrum_A2QNnpE.jpg'),(28,'py',2,'null','null','null','null','shit','null','null','hellll','null','null','null','null','null','null','null','null','null','equipement_images/Pharma5_O2Uf092.png'),(29,'HPLC21',1,'sdasd','asdasd','asdasd','en service','asdasd','dgdgd','asdasd','asdasd','sdasd','dasd','asdasd','asdasd','asdasd','asdasd','asdadf','asdasd','dfgdfg','equipement_images/IMG_20230518_114431.a35ece55f10e.jpg'),(33,'test',2,NULL,NULL,NULL,'asdasd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'equipement_images/IMG_20230518_113201.77610a93076e.jpg'),(34,'asdas',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'equipement_images/Agitateur_petit.jfif');
/*!40000 ALTER TABLE `labo_app_equipement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_laboratoire`
--

DROP TABLE IF EXISTS `labo_app_laboratoire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_laboratoire` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_laboratoire`
--

LOCK TABLES `labo_app_laboratoire` WRITE;
/*!40000 ALTER TABLE `labo_app_laboratoire` DISABLE KEYS */;
INSERT INTO `labo_app_laboratoire` VALUES (1,'Laboratoire microbiologie','desc'),(2,'Laboratoire Phisicochime','desc'),(6,'test','desc');
/*!40000 ALTER TABLE `labo_app_laboratoire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_matrice`
--

DROP TABLE IF EXISTS `labo_app_matrice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_matrice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_acces` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `employe_id` bigint NOT NULL,
  `equipement_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Labo_app_matrice_employe_id_3baba806_fk_Labo_app_employe_id` (`employe_id`),
  KEY `Labo_app_matrice_equipement_id_d74a57f3_fk_Labo_app_` (`equipement_id`),
  CONSTRAINT `Labo_app_matrice_employe_id_3baba806_fk_Labo_app_employe_id` FOREIGN KEY (`employe_id`) REFERENCES `labo_app_employe` (`id`),
  CONSTRAINT `Labo_app_matrice_equipement_id_d74a57f3_fk_Labo_app_` FOREIGN KEY (`equipement_id`) REFERENCES `labo_app_equipement` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_matrice`
--

LOCK TABLES `labo_app_matrice` WRITE;
/*!40000 ALTER TABLE `labo_app_matrice` DISABLE KEYS */;
INSERT INTO `labo_app_matrice` VALUES (45,'2024-06-01','actif',5,28),(47,'2024-06-01','actif',3,28),(50,'2024-06-01','actif',1,28),(51,'2024-06-01','actif',2,28),(52,'2024-06-01','actif',7,28),(55,'2024-06-01','actif',10,28),(56,'2024-06-01','actif',4,28),(57,'2024-06-03','actif',6,28);
/*!40000 ALTER TABLE `labo_app_matrice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_app_unite`
--

DROP TABLE IF EXISTS `labo_app_unite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labo_app_unite` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `laboratoire_id` bigint NOT NULL,
  `responsable_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Labo_app_unite_laboratoire_id_db891f15_fk_Labo_app_` (`laboratoire_id`),
  KEY `Labo_app_unite_responsable_id_e67b1633_fk_Labo_app_employe_id` (`responsable_id`),
  CONSTRAINT `Labo_app_unite_laboratoire_id_db891f15_fk_Labo_app_` FOREIGN KEY (`laboratoire_id`) REFERENCES `labo_app_laboratoire` (`id`),
  CONSTRAINT `Labo_app_unite_responsable_id_e67b1633_fk_Labo_app_employe_id` FOREIGN KEY (`responsable_id`) REFERENCES `labo_app_employe` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_app_unite`
--

LOCK TABLES `labo_app_unite` WRITE;
/*!40000 ALTER TABLE `labo_app_unite` DISABLE KEYS */;
INSERT INTO `labo_app_unite` VALUES (1,'Matiere premiere','desc',2,1),(2,'Produit fini','ici c\'est la description de l\'unite de Produit fini.',1,1);
/*!40000 ALTER TABLE `labo_app_unite` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-04 15:07:40
