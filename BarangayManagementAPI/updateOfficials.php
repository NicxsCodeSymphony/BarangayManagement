<?php
require 'connection.php'; // Include your database connection script

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $official_id = $_POST['official_id'];
    $name = $_POST['name'];
    $position = $_POST['position'];
    $age = $_POST['age'];
    $birthDate = $_POST['birthDate'];
    $gender = $_POST['gender'];
    $civilStatus = $_POST['civilStatus'];
    $birthPlace = $_POST['birthPlace'];
    $email = $_POST['email'];
    $phoneNumber = $_POST['phoneNumber'];
    $purokArea = $_POST['purokArea'];
    $status = $_POST['status'];

    $photo = $_FILES['photo']['name'] ?? '';
    if ($photo) {
        $target_dir = "uploads/officials/";
        $target_file = $target_dir . basename($_FILES["photo"]["name"]);
        move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file);
    }

    $sql = "UPDATE officials SET
            name = '$name',
            position = '$position',
            age = '$age',
            birthDate = '$birthDate',
            gender = '$gender',
            civilStatus = '$civilStatus',
            birthPlace = '$birthPlace',
            email = '$email',
            phoneNumber = '$phoneNumber',
            purokArea = '$purokArea',
            status = '$status'";

    if ($photo) {
        $sql .= ", photo = 'uploads/officials/$photo'";
    }

    $sql .= " WHERE official_id = $official_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}
?>
