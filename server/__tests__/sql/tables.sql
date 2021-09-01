DROP TABLE IF EXISTS comment; 
DROP TABLE IF EXISTS rating; 
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS category; 

CREATE TABLE category (
    name VARCHAR(45) NOT NULL, 
    PRIMARY KEY(name)
);

CREATE TABLE article (
    id         INT          NOT NULL auto_increment, 
	 title      VARCHAR(256) NOT NULL, 
    author     VARCHAR(256) NOT NULL, 
    published  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    edited     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    image      LONGTEXT     NOT NULL, 
    caption    LONGTEXT     NOT NULL,
    lead       LONGTEXT     NOT NULL, 
    text       LONGTEXT     NOT NULL, 
    category   VARCHAR(45)  NOT NULL, 
    priority   BOOLEAN      NOT NULL, 
    PRIMARY KEY(id), 
    FOREIGN KEY(category) REFERENCES category(name) 
); 

CREATE TABLE comment (
    nickname   VARCHAR(45)  NOT NULL, 
    text       VARCHAR(256) NOT NULL,
    published  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    articleId  INT          NOT NULL, 
    PRIMARY KEY (nickname, text), 
    FOREIGN KEY(articleId) REFERENCES article(id)
);

CREATE TABLE rating (
   id        INT NOT NULL AUTO_INCREMENT, 
   value     INT NOT NULL, 
   articleId INT NOT NULL, 
   PRIMARY KEY(id),
   FOREIGN KEY(articleId) REFERENCES article(id)
); 

-- triggers fix addressing time zone issue -- 
DELIMITER //
CREATE TRIGGER trg_article BEFORE INSERT ON article FOR EACH ROW BEGIN
  SET NEW.published = CURRENT_TIMESTAMP - INTERVAL 1 HOUR;
  SET NEW.edited = CURRENT_TIMESTAMP - INTERVAL 1 HOUR;
END //
DELIMITER ; 

DELIMITER // 
CREATE TRIGGER trg_update_article BEFORE UPDATE ON article FOR EACH ROW BEGIN
  SET NEW.edited = CURRENT_TIMESTAMP - INTERVAL 1 HOUR;
END //
DELIMITER ; 

DELIMITER //
CREATE TRIGGER trg_comment BEFORE INSERT ON comment FOR EACH ROW BEGIN
  SET NEW.published = CURRENT_TIMESTAMP - INTERVAL 1 HOUR;
END //
DELIMITER ; 