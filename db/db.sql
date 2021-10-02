create database if not exists project;
use project;

CREATE TABLE usuario(
idUsuario varchar (24) not null,
email varchar (50), 
username varchar (50),
password varchar (50),
url varchar (300),
registerDate datetime,
primary key(idUsuario),
unique (email, username)
);
describe usuario;

insert into usuario values
('602d5aaef4d39a19a6f882f2', 'test@test.com', 'test1', 'jdgfajkfdghajfghj', '09f6c0bd-b371-476c-bd39-be3dde645f9e.jpeg', now());

insert into usuario values
('602d5aaef4d39a19a6f882f6', 'test1@test.com', 'test1', 'jdgfajkfdghajfghj', '09f6c0bd-b371-476c-bd39-be3dde645f9e.jpeg', now());

select * from usuario;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';

CREATE TABLE planta(
idPlant varchar (30) not null, 
scientificName varchar (30) not null,
primary key(idPlant),
unique(scientificName)
);

CREATE TABLE nodo_central(
idBluetoothNC varchar (30) not null,
nodeName varchar (50),
registerDate datetime,
url varchar (300),
idUsuario varchar(24),
idPlant varchar (24),
primary key(idBluetoothNC),
foreign key (idPlant) references planta(idPlant),
foreign key (idUsuario) references usuario(idUsuario)
);

CREATE TABLE nodo_sensores(
idBluetoothNS varchar (30) not null,
idPlant varchar (30) not null, 
url varchar (300),
idBluetoothNC varchar (30),
registerDate datetime,
alias varchar(30),
primary key(idBluetoothNS),
foreign key (idBluetoothNC) references nodo_central(idBluetoothNC),
foreign key (idPlant) references planta(idPlant)
);


insert into planta values ("123", "Helianthus ");
Insert into nodo_central values ("123456", "Jardin", now(), "/123456/imgs", "602d5aaef4d39a19a6f882f2", "123");
Insert into nodo_central values ("123457", "Casa", now(), "/123456/imgs", "602d5aaef4d39a19a6f882f2", "123");
select * from nodo_central;

Insert into nodo_sensores values ("123457", "123", "/123456/imgs", "123456", now(), "limon");

select * from nodo_central;
select * from nodo_sensores;
select * from planta;
select * from usuario;

describe nodo_sensores;
describe nodo_central;

