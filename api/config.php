<?php
$mysql_db_name = 'elonchan';
$mysql_db_user = 'root';
$mysql_db_password = 'ILoveTesla';
$mysql_host = '';


$polaczenie = @new mysqli($mysql_host, $mysql_db_user, $mysql_db_password, $mysql_db_name);
if ($polaczenie->connect_errno!=0){
	echo "Error (MySQL): ".$polaczenie->connect_errno;
	exit;
}
/*
CREATE DATABASE `elonchan`;

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `room` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `msgid` int(11) NOT NULL
) 
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);
 MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
*/
?>