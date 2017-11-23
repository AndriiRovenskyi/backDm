drop database if exists Fire;
create database Fire;
use Fire;

CREATE TABLE Categories(
	id int primary key auto_increment,
    nameCategories varchar(36)
);

CREATE TABLE subCategories(
	id int primary key auto_increment,
    nameSubUa varchar(36),
    nameSubRu varchar(36),
    nameSubEng varchar(36),
    nameSubPl varchar(36),
    img varchar(55),
    id_cat int
);


CREATE TABLE Commodities(
	id int primary key auto_increment,
    nameCommoditiesUa varchar(36),
    nameCommoditiesRu varchar(36),
    nameCommoditiesEng varchar(36),
    nameCommoditiesPL varchar(36),
    descriptionUa varchar(255),
    descriptionRu varchar(255),
    descriptionEng varchar(255),
    descriptionPl varchar(255),
    img varchar(55),
    price int,
    id_sub int
);

CREATE TABLE News(
	id int primary key auto_increment,
    nameNewEng varchar(36),
    nameNewUa varchar(36),
    nameNewRu varchar(36),
    nameNewPl varchar(36),
    descriptionUa varchar(255),
    descriptionEng varchar(255),
    descriptionRu varchar(255),
    descriptionPl varchar(255)
);



#one to many from category to commodity
alter table Commodities add constraint foreign key(id_sub) references subCategories(id) ON DELETE CASCADE;
alter table subCategories add constraint foreign key(id_cat) references Categories(id) ON DELETE CASCADE;
ALTER TABLE subCategories ADD UNIQUE nameCat (nameSubUa,nameSubEng,nameSubPl,nameSubRu id_cat);
alter table News ADD UNIQUE (nameNewEng,nameNewUa,nameNewPl,nameNewRu);



