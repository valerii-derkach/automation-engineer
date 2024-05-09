-- The task description with prepared scripts
-- Please execute scripts on https://sqliteonline.com/

-- 3.1. Create tables and insert data
-- Create table “user” with the following structure:
-- [id] int,
-- ​[firstName] varchar(255),
-- ​[lastName] varchar(255),
-- ​[email] varchar(255),
-- ​[cultureID] int,
-- ​[deleted] bit,
-- ​[country] varchar(255),
-- ​[isRevokeAccess] bit,
-- ​[created] datetime

CREATE TABLE users (
  id int,
  firstName varchar(255),
  lastName varchar(255),
  email varchar(255),
  cultureID int,
  deleted bit,
  country varchar(255),
  isRevokeAccess bit,
  created datetime
);

-- Insert the data into the table:
-- (1, 'Victor', 'Shevchenko', 'vs@ gmail.com', 1033, 1, 'US', 0, '2011-04-05'),
-- ​(2, 'Oleksandr', 'Petrenko', 'op@ gmail.com', 1034, 0, 'UA', 0, '2014-05-01'),
-- ​(3, 'Victor', 'Tarasenko', 'vt@gmail.com', 1033, 1, 'US', 1, '2015-07-03'),
-- ​(4, 'Sergiy', 'Ivanenko', 'sergiy@gmail.com', 1046, 0, 'UA', 1, '2010-02-02'),
-- ​(5, 'Vitalii', 'Danilchenko', 'shumko@ gmail.com', 1031, 0, 'UA', 1, '2014-05-01'),
-- ​(6, 'Joe', 'Dou', 'joe@ gmail.com', 1032, 0, 'US', 1, '2009-01-01'),
-- ​(7, 'Marko', 'Polo', 'marko@gmail.com', 1033, 1, 'UA', 1, '2015-07-03')

INSERT INTO users (id, firstName, lastName, email, cultureID, deleted, country, isRevokeAccess, created) 
VALUES
(1, 'Victor', 'Shevchenko', 'vs@gmail.com', 1033, 1, 'US', 0, '2011-04-05'),
(2, 'Oleksandr', 'Petrenko', 'op@gmail.com', 1034, 0, 'UA', 0, '2014-05-01'),
(3, 'Victor', 'Tarasenko', 'vt@gmail.com', 1033, 1, 'US', 1, '2015-07-03'),
(4, 'Sergiy', 'Ivanenko', 'sergiy@gmail.com', 1046, 0, 'UA', 1, '2010-02-02'),
(5, 'Vitalii', 'Danilchenko', 'shumko@gmail.com', 1031, 0, 'UA', 1, '2014-05-01'),
(6, 'Joe', 'Dou', 'joe@gmail.com', 1032, 0, 'US', 1, '2009-01-01'),
(7, 'Marko', 'Polo', 'marko@gmail.com', 1033, 1, 'UA', 1, '2015-07-03');

-- Create table “group” with the following structure:
-- [id] int,
-- ​[name] varchar(255),
-- ​[created] datetime

CREATE TABLE group_table (
  id int,
  name varchar(255),
  created datetime
);

-- Insert the data into the table:
-- (10, 'Support', '2010-02-02'),
-- ​(12, 'Dev team', '2010-02-03'),
-- ​(13, 'Apps team', '2011-05-06'),
-- ​(14, 'TEST - dev team', '2013-05-06'),
-- ​(15, 'Guest', '2014-02-02'),
-- ​(16, 'TEST-QA-team', '2014-02-02'),
-- ​(17, 'TEST-team', '2011-01-07')
 
INSERT INTO group_table (id, name, created) 
VALUES
(10, 'Support', '2010-02-02'),
(12, 'Dev team', '2010-02-03'),
(13, 'Apps team', '2011-05-06'),
(14, 'TEST - dev team', '2013-05-06'),
(15, 'Guest', '2014-02-02'),
(16, 'TEST-QA-team', '2014-02-02'),
(17, 'TEST-team', '2011-01-07');

-- Create table “groupMembership” with the following structure:
-- [id] int,
-- ​[userID] int,
-- ​[groupID] int,
-- ​[created] datetime

CREATE TABLE groupMembership (
  id int,
  userID int,
  groupID int,
  created datetime
);

-- Insert the data into the table:
-- (110, 2, 10, '2010-02-02'),
-- ​(112, 3, 15, '2010-02-03'),
-- ​(114, 1, 10, '2014-02-02'),
-- ​(115, 1, 17, '2011-05-02'),
-- ​(117, 4, 12, '2014-07-13'),
-- ​(120, 5, 15, '2014-06-15')

INSERT INTO groupMembership (id, userID, groupID, created) 
VALUES
(110, 2, 10, '2010-02-02'),
(112, 3, 15, '2010-02-03'),
(114, 1, 10, '2014-02-02'),
(115, 1, 17, '2011-05-02'),
(117, 4, 12, '2014-07-13'),
(120, 5, 15, '2014-06-15');

-- 3.2. Select names of all empty test groups (group name starts with “TEST-”).

SELECT group_table.name AS GroupName
FROM group_table
LEFT JOIN groupMembership ON group_table.id = groupMembership.groupID
WHERE group_table.name LIKE 'TEST-%' AND groupMembership.userID IS NULL;

-- expected output:
-- TEST-QA-team

-- 3.3. Select user first names and last names for the users that have Victor as a first name and are not members of any test groups (they may be members of other groups or have no membership in any groups at all).

SELECT users.firstName AS FirstName, users.lastName AS LastName
FROM users
LEFT JOIN groupMembership ON users.id = groupMembership.userID
LEFT JOIN group_table ON groupMembership.groupID = group_table.id
WHERE users.firstName = 'Victor' AND (group_table.name NOT LIKE 'TEST-%');

-- expected output:
-- Victor Shevchenko
-- Victor Tarasenko

-- 3.4. Select users and groups for which user was created before the group for which he(she) is member of.

SELECT users.firstName AS FirstName, users.lastName AS LastName, group_table.name AS GroupName
FROM users
JOIN groupMembership ON users.id = groupMembership.userID
JOIN group_table ON groupMembership.groupID = group_table.id
WHERE users.created < group_table.created;

-- expected output:
-- Sergiy Ivanenko Dev team
