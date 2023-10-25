<?php
$host = "192.168.1.23";
$port = 3306;
$username = "root";
$password = "ibarra06";
$database = "universidad";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión a la base de datos fallida: " . $conn->connect_error);
}

$sql = "SELECT nombre, foto_url, facultad, diagnostico, escuela_profesional FROM tu_tabla";
$result = $conn->query($sql);

if (!$result) {
    die("Error en la consulta: " . $conn->error);
}
?>