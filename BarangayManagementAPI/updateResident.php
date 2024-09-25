<?php
// Include the database connection file
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect data from the form
    $id = $_POST['residents_id'];
    $first_name = $_POST['first_name'];
    $middle_name = $_POST['middle_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $suffix = $_POST['suffix'];
    $gender = $_POST['gender'];
    $birth_date = $_POST['birth_date'];
    $birth_place = $_POST['birth_place'];
    $age = $_POST['age'];
    $civil_status = $_POST['civil_status'];
    $nationality = $_POST['nationality'];
    $religion = $_POST['religion'];
    $occupation = $_POST['occupation'];
    $contact = $_POST['contact'];
    $pwd_status = $_POST['pwd_status'];
    $pwd_id_no = $_POST['pwd_id_no'];
    $education = $_POST['education'];
    $purok = $_POST['purok'];
    $barangay = $_POST['barangay'];
    $senior_citizen = $_POST['senior_citizen'];
    $position = $_POST['position'];  // Added field

    // Fetch current image path from the database
    $sql = "SELECT image FROM residents WHERE residents_id = $id";
    $result = mysqli_query($conn, $sql);
    $currentImage = '';
    if ($result && $row = mysqli_fetch_assoc($result)) {
        $currentImage = $row['image'];
    }

    // File upload (image)
    $image = isset($_FILES['photo']) ? $_FILES['photo']['name'] : '';
    $target_dir = ($position === 'Official') ? 'uploads/officials/' : 'uploads/residents/';
    $target_file = $target_dir . basename($image);

    // Check if file is uploaded
    if (!empty($image)) {
        // Delete the previous image if it exists
        if (!empty($currentImage) && file_exists($currentImage)) {
            unlink($currentImage);
        }
        move_uploaded_file($_FILES['photo']['tmp_name'], $target_file);
        // Update query with new image
        $sql = "UPDATE residents SET
                first_name = '$first_name',
                middle_name = '$middle_name',
                last_name = '$last_name',
                email = '$email',
                password = '$password',
                suffix = '$suffix',
                gender = '$gender',
                birth_date = '$birth_date',
                birth_place = '$birth_place',
                age = '$age',
                civil_status = '$civil_status',
                nationality = '$nationality',
                religion = '$religion',
                occupation = '$occupation',
                contact = '$contact',
                pwd_status = '$pwd_status',
                pwd_id_no = '$pwd_id_no',
                education = '$education',
                purok = '$purok',
                barangay = '$barangay',
                senior_citizen = '$senior_citizen',
                position = '$position',
                image = '$target_file'
            WHERE residents_id = $id";
    } else {
        // Update query without changing the image
        $sql = "UPDATE residents SET
                first_name = '$first_name',
                middle_name = '$middle_name',
                last_name = '$last_name',
                email = '$email',
                password = '$password',
                suffix = '$suffix',
                gender = '$gender',
                birth_date = '$birth_date',
                birth_place = '$birth_place',
                age = '$age',
                civil_status = '$civil_status',
                nationality = '$nationality',
                religion = '$religion',
                occupation = '$occupation',
                contact = '$contact',
                pwd_status = '$pwd_status',
                pwd_id_no = '$pwd_id_no',
                education = '$education',
                purok = '$purok',
                barangay = '$barangay',
                senior_citizen = '$senior_citizen',
                position = '$position'
            WHERE residents_id = $id";
    }

    // Execute the query
    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => true, 'message' => 'Resident updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating resident: ' . mysqli_error($conn)]);
    }
}
?>
