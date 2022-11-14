/* #startregion User entity procedures */

DROP PROCEDURE IF EXISTS isUserExist;
DELIMITER &&  
CREATE PROCEDURE isExisted (IN user_email VARCHAR(40))  
BEGIN  
    SELECT * FROM users WHERE email = user_email;  
END &&  
DELIMITER ;    

DROP PROCEDURE IF EXISTS createUser;
DELIMITER &&  
CREATE PROCEDURE createUser (IN user_name VARCHAR(40), IN user_email VARCHAR(40), IN user_pass VARCHAR(90))  
BEGIN  
    INSERT INTO users (name, email, password) VALUES (user_name, user_email, user_pass);  
    SELECT @new_user_id := LAST_INSERT_ID();
    SET @rate := 0;
    INSERT INTO names2users (user_id, name_id, rate) 
	SELECT @new_user_id, id, @rate := @rate + 1 FROM names;
END &&  
DELIMITER ;

/* #endregion User entity procedures */

/* #startregion Name entity procedures */

DROP PROCEDURE IF EXISTS getNames;
DELIMITER &&  
CREATE PROCEDURE getNames (IN u_id INT)  
BEGIN  
    SELECT n.name, n.id, n2u.rate FROM names n 
    INNER JOIN names2users n2u ON n2u.name_id = n.id WHERE n2u.user_id = u_id ORDER BY n2u.rate; 
END &&  
DELIMITER ; 

DROP PROCEDURE IF EXISTS createName;
DELIMITER &&  
CREATE PROCEDURE createName (IN user_name VARCHAR(40))  
BEGIN  
	SELECT @default_rate := COUNT(id) + 1 FROM names;
	INSERT INTO names (name) VALUES(user_name);
    SELECT @new_name_id := LAST_INSERT_ID();
	INSERT INTO names2users (user_id, name_id, rate) 
	SELECT id, @new_name_id, @default_rate FROM users;
END 
DELIMITER ;

DROP PROCEDURE IF EXISTS isNameExist;
DELIMITER &&  
CREATE PROCEDURE nameDupe (IN entered_name VARCHAR(40))  
BEGIN  
    SELECT * FROM names WHERE name = entered_name;  
END &&  
DELIMITER ; 

DROP PROCEDURE IF EXISTS changeName;
DELIMITER &&  
CREATE PROCEDURE changeName (IN n_id INT, IN new_name VARCHAR(40))  
BEGIN  
    UPDATE names SET name = new_name WHERE id = n_id;
END &&  
DELIMITER ; 

DROP PROCEDURE IF EXISTS changeRank;
DELIMITER &&  
CREATE PROCEDURE changeRank (IN u_id INT, IN n_id INT, IN new_rank INT)  
BEGIN  
    SELECT @old_rank := rate FROM names2users WHERE user_id = u_id AND name_id = n_id;
    IF @old_rank > new_rank THEN 
        UPDATE names2users SET rate = rate+1 WHERE user_id = u_id AND rate < @old_rank AND rate >= new_rank;
        UPDATE names2users SET rate = new_rank WHERE user_id = u_id AND name_id = n_id;
    ELSEIF @old_rank < new_rank THEN
        UPDATE names2users SET rate = rate-1 WHERE user_id = u_id AND rate > @old_rank  AND rate <= new_rank;
        UPDATE names2users SET rate = new_rank WHERE user_id = u_id AND name_id = n_id;
    END IF;
END &&  
DELIMITER ; 

DROP PROCEDURE IF EXISTS deleteName;
DELIMITER &&  
CREATE PROCEDURE deleteName (IN n_id INT)  
BEGIN  
    DECLARE u_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE userIdCursor CURSOR FOR SELECT id FROM users;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN userIdCursor;
    update_loop: LOOP
        FETCH userIdCursor INTO u_id;
        IF done THEN
            LEAVE update_loop;
        END IF;
        SELECT @old_rank := n2u.rate FROM names2users n2u WHERE n2u.name_id = n_id AND n2u.user_id = u_id;
        UPDATE names2users n2u SET n2u.rate = n2u.rate-1 WHERE n2u.rate > @old_rank AND n2u.user_id = u_id;
    END LOOP;

  CLOSE userIdCursor;
  DELETE FROM names2users WHERE name_id = n_id;
  DELETE FROM names WHERE id = n_id;
END &&  
DELIMITER ;

/* #endregion Name entity procedures */