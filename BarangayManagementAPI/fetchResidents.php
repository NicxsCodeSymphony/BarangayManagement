<?php

include 'connection.php';

$sql = "SELECT * FROM residents WHERE position != 'Official'";
$result = $conn->query($sql);

$data = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
