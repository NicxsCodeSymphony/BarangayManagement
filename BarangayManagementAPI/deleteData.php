<?php

include 'connection.php';

// Allow Cross-Origin Requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Retrieve the ID from the query parameters
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) {
        // Prepare the SQL statement to get the image path before deleting the record
        $sql = "SELECT image FROM residents WHERE residents_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            $stmt->bind_result($imagePath);
            $stmt->fetch();
            $stmt->close();

            // Delete the resident record
            $sql = "DELETE FROM residents WHERE residents_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $id);

            if ($stmt->execute()) {
                // If there's an image associated, delete it from the server
                if ($imagePath && file_exists($imagePath)) {
                    unlink($imagePath);
                }
                echo json_encode(["status" => "success"]);
            } else {
                echo json_encode(["status" => "error", "message" => $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => $stmt->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid ID"]);
    }

    $conn->close();
} else {
    // If request method is not DELETE
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
