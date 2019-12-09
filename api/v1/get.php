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

if (isset($_GET['last'])==FALSE or $_GET['last']==''){
    $last=0;
}else{
    $last = intval($_GET['last']);
}



if ($rezultat = @$polaczenie->query(sprintf("SELECT * FROM chat WHERE room='%s' ORDER BY msgid", 
    mysqli_real_escape_string($polaczenie, $_GET['room'])))){
        if ($rezultat->num_rows == 0){die('[]');}
        $r = array();
        while($row = $rezultat->fetch_assoc()){
            if($last != 0){
                $last--;
            }else{
                $r = array_merge($r, array($row['msgid'] => $row['message']) );
            }
        }
    die(json_encode($r, JSON_PRETTY_PRINT | JSON_FORCE_OBJECT));
}else{
    hasError('Server Error, errorcode: api/get/1');
}
?>