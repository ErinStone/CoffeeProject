CREATE SCHEMA `angular_roasts` DEFAULT CHARACTER SET latin1 ;

CREATE TABLE `angular_roasts`.`profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

  CREATE TABLE `angular_roasts`.`region` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


CREATE TABLE `angular_roasts`.`country` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `region` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `region_idx` (`region` ASC),
  CONSTRAINT `region`
    FOREIGN KEY (`region`)
    REFERENCES `angular_roasts`.`region` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  CREATE TABLE `angular_roasts`.`area` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `country` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `country_idx` (`country` ASC),
  CONSTRAINT `country`
    FOREIGN KEY (`country`)
    REFERENCES `angular_roasts`.`country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);  

CREATE TABLE `angular_roasts`.`roast` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `creation` DATE NOT NULL,
  `weight` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `region` INT(11) NOT NULL,
  `country` INT(11) NULL,
  `area` INT(11) NULL,
  `profile` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `region_idx` (`region` ASC),
  INDEX `area_idx` (`area` ASC),
  INDEX `country_idx` (`country` ASC),
  INDEX `profile_idx` (`profile` ASC),
  CONSTRAINT `region`
    FOREIGN KEY (`region`)
    REFERENCES `angular_roasts`.`region` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `area`
    FOREIGN KEY (`area`)
    REFERENCES `angular_roasts`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `country`
    FOREIGN KEY (`country`)
    REFERENCES `angular_roasts`.`country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  CONSTRAINT `profile`
    FOREIGN KEY (`profile`)
    REFERENCES `angular_roasts`.`profile`(`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
