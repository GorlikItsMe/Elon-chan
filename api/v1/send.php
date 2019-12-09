<?php
require_once("../config.php");

function hasError($desc){
    echo($desc);
    header("HTTP/1.0 500 Not Found");
    die();
}



if (isset($_GET['room'])==FALSE or $_GET['room']==''){
    hasError("GET room parametr required");
}

if (isset($_GET['msg'])==FALSE or $_GET['msg']==''){
    hasError("GET msg parametr required");
}

$msg = htmlentities($_GET['msg']);

if ($rezultat = @$polaczenie->query(sprintf("SELECT msgid FROM chat WHERE room='%s' ORDER BY msgid", 
    mysqli_real_escape_string($polaczenie, $_GET['room'])))){
        $id = $rezultat->num_rows+1;        
}else{
    hasError('Server Error, errorcode: api/send/1');
}


if ($rezultat = @$polaczenie->query(sprintf("INSERT INTO `chat` (`room`, `message`, `msgid`) VALUES ('%s', '%s', '%s')",
    mysqli_real_escape_string($polaczenie,$_GET['room']),
    mysqli_real_escape_string($polaczenie,$_GET['msg']),
    mysqli_real_escape_string($polaczenie,$id)))){
        die('ok');
    }else{
        hasError('Server Error, errorcode: api/send/2');
    }

?>