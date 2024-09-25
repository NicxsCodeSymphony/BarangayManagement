<?php
include 'connection.php';

// Fetch number of officials
$sqlOfficials = "SELECT COUNT(*) as total_officials FROM residents WHERE position = 'Official'";
$resultOfficials = $conn->query($sqlOfficials);
$officials = $resultOfficials->fetch_assoc();

// Fetch number of non-official residents
$sqlResidents = "SELECT COUNT(*) as total_residents FROM residents WHERE position != 'Official'";
$resultResidents = $conn->query($sqlResidents);
$residents = $resultResidents->fetch_assoc();

// Output data as JSON
echo json_encode([
    'officials' => $officials['total_officials'],
    'residents' => $residents['total_residents']
]);

$conn->close();
