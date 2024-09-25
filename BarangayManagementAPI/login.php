<?php

include 'connection.php';

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // Check if email and password are provided
    if ($email && $password) {
        // SQL query to get the user by email and password
        $sql = "SELECT * FROM residents WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $email, $password);

        if($stmt->execute()){
            $result = $stmt->get_result();

            if($result->num_rows > 0){
                $user = $result->fetch_assoc();

                // Direct password comparison (assuming plain text)
                if($password === $user['password']){
                    // Generate a simple token based on resident_id
                    $residents_id = $user['residents_id'];
                    $token = base64_encode($residents_id);

                    // Return the login successful message with the token
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Login successful',
                        'token' => $token
                    ]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'User not found']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database error']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
    }
}
?>
