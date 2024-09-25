<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Your database and form submission logic
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Fetch POST data for residents
    $position = $_POST['position'];
    $positionType = $_POST['position_type'];
    $firstName = $_POST['first_name'];
    $middleName = $_POST['middle_name'];
    $lastName = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $suffix = $_POST['suffix'];
    $gender = $_POST['gender'];
    $birthDate = $_POST['birth_date'];
    $birthPlace = $_POST['birth_place'];
    $age = $_POST['age'];
    $civilStatus = $_POST['civil_status'];
    $nationality = $_POST['nationality'];
    $religion = $_POST['religion'];
    $occupation = $_POST['occupation'];
    $contact = $_POST['contact'];
    $pwdStatus = $_POST['pwd_status'];
    $pwdIdNo = $_POST['pwd_id_no'];
    $education = $_POST['education'];
    $purok = $_POST['purok'];
    $barangay = $_POST['barangay'];
    $seniorCitizen = $_POST['senior_citizen'];
    $relationship = $_POST['relationship'];

    // Initialize image path
    $imagePath = null;

    // Determine the upload directory based on the position
    $uploadDir = ($position === 'Official') ? 'uploads/officials/' : 'uploads/residents/';

    // Check if the upload directory exists, create it if not
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Handle image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        // Sanitize file name and move uploaded file
        $imageName = basename($_FILES['image']['name']);
        $imagePath = $uploadDir . $imageName;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            $imagePath = null; // Set to null if upload failed
        }
    }

    // Prepare SQL query
    $sql = "INSERT INTO residents (
                position, position_type, first_name, middle_name, last_name, email, password, suffix, relationship,
                gender, birth_date, birth_place, age, civil_status, nationality, religion, occupation,
                contact, pwd_status, pwd_id_no, education, purok, barangay, senior_citizen, image, created_at
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()
            )";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("SQL prepare error: " . $conn->error);
    }

    // Bind parameters - Ensure that types are correctly specified
    $stmt->bind_param(
        "sssssssssssssssssssssssss",
        $position, $positionType, $firstName, $middleName, $lastName, $email, $password,  $suffix, $relationship,
        $gender, $birthDate, $birthPlace, $age, $civilStatus, $nationality, $religion, $occupation,
        $contact, $pwdStatus, $pwdIdNo, $education, $purok, $barangay, $seniorCitizen, $imagePath
    );

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
