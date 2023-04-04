CREATE USER 'footrix' @'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'footrix' @'localhost' WITH
GRANT OPTION;
drop database if exists footrix;
create database footrix;
use footrix;
commit;

CREATE TABLE `contact` (
  `id` CHAR(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `attachment` mediumblob,
  UNIQUE(`id`),
  PRIMARY KEY (`id`)
);
