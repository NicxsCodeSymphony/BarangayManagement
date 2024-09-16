<?php

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $barangayName = $_POST['barangayName'];
    $municipality = $_POST['municipality'];
    $province = $_POST['province'];
    $phoneNumber = $_POST['phoneNumber'];
    $email = $_POST['email'];

    // Fetch the current photo path from the database
    $sql = "SELECT image FROM barangay_info WHERE barangay_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($currentPhoto);
    $stmt->fetch();
    $stmt->close();

    // Handle photo upload
    $photoPath = $currentPhoto; // Default to current photo if no new photo is uploaded
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $photoName = basename($_FILES['photo']['name']);
        $photoPath = $uploadDir . $photoName;
        move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath);
    }

    // Update query
    $sql = "UPDATE barangay_info SET barangay_name=?, municipality=?, province=?, number=?, email=?, image=? WHERE barangay_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $barangayName, $municipality, $province, $phoneNumber, $email, $photoPath, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
