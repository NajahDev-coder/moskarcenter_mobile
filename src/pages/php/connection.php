<?php
$servername="localhost";
$username="dbo750357994";
$password="Mall976@!";
$dbName="db750357994";

$conn = mysqli_connect($servername,$username,$password,$dbName);

if($conn->connect_error){
    die("connecrtion failed" . $conn->connect_error);
}

$sql = "select * from wp-users";

$result = mysqli_query($conn , $sql);

if(mysqli_num_rows($result) > 0){
    echo "success";
}else{
    echo json_encode("0 result");
}

$conn->close();

?>