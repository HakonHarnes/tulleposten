DELETE FROM rating WHERE 1;
DELETE FROM comment WHERE 1;
DELETE FROM article WHERE 1;
DELETE FROM category WHERE 1;

INSERT INTO category VALUES ('nyheter'); 
INSERT INTO category VALUES ('kjendis'); 
INSERT INTO category VALUES ('kultur'); 
INSERT INTO category VALUES ('sport'); 

INSERT INTO article VALUES (
   1, 
   'Vetle Harnes vinner volleyballturnering', 
   'Ola Nordmann', 
   DEFAULT, 
   DEFAULT,
   'https://g.acdn.no/obscura/API/dynamic/r1/ece5/tr_480_434_l_f/0000/nobl/2016/3/9/13/DSC_5166.JPG?chk=964428', 
   'Bildet viser sjefen', 
   'I denne artikkelen beskriver Vetle følelsen av å vinne volleyballturnering i mosjøen', 
   'blablabla gøy artikkel', 
   'kjendis', 
   1 ); 

INSERT INTO article VALUES (
   2, 
   'Vetlegutten forteller: Slik lager du bulkeshake', 
   'Håkon Harnes', 
   DEFAULT, 
   DEFAULT,
   'https://i.ytimg.com/vi/42jnx2yC6Ik/maxresdefault.jpg',
   'Bildet viser bulkeshaken', 
   'I denne arikkelen viser Vetle deg sine triks for å lage bulkeshake!', 
   'heihei gøy tekst', 
   'nyheter', 
   1 ); 

INSERT INTO article VALUES (
   3, 
   'Snøkaos på Østlandet', 
   'Sint Nordlending', 
   DEFAULT, 
   DEFAULT,
   'https://i.ytimg.com/vi/McZtCIDAu6U/hqdefault.jpg',
   'Bildet viser sint Nordlending', 
   'I denne arikkelen uttrykker gutten sine sterke følelser for snøkaoset på østlandet', 
   'jææææævla søringa', 
   'nyheter', 
   1 ); 

INSERT INTO comment VALUES('Ola', 'Fint og flott', DEFAULT, 1); 
INSERT INTO comment VALUES('Kari', 'Huffamei',     DEFAULT, 2); 
INSERT INTO comment VALUES('Jarle', 'Flink gutt',  DEFAULT, 2); 

INSERT INTO rating VALUES(DEFAULT, 5, 1);
INSERT INTO rating VALUES(DEFAULT, 3, 1);
INSERT INTO rating VALUES(DEFAULT, 3, 1);
INSERT INTO rating VALUES(DEFAULT, 3, 2);