<?php
include 'datos.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil del alumno</title>
  <link rel="shortcut icon" href="./images/favicon.png" type="image/x-icon">
  <link rel="stylesheet" href="./CSS/normalize.css">
  <link rel="stylesheet" href="./CSS/estilos.css">
</head>

<body>

  <div class="nav">
    <a href="#">inicio</a>
    <a href="#">perfil</a>
    <a href="#">agendar cita</a>
  </div>

  <div class="container">
    <section class="foto_info_container">
      <?php
      while ($row = $result->fetch_assoc()) {
      ?>
      <div class="tabla_info">
        <div class="foto_perfil">
          <div class="circle" style="background-image: url('<?php echo htmlspecialchars($row['foto_url']); ?>');" alt="Foto de perfil"></div>
          <hr class="img_sub">
        </div>
        <div class="info_container">
          <div class="info">
            <span>Nombre: <?php echo htmlspecialchars($row['nombre']); ?></span>
            <span>Facultad: <?php echo htmlspecialchars($row['facultad']); ?></span>
            <span>Escuela profesional: <?php echo htmlspecialchars($row['escuela_profesional']); ?></span>
          </div>
        </div>
      </div>
      <hr>
      <section class="contenido">
        <div class="graph">
        </div>
        <div class="box">
          <h3>Diagnóstico:</h3>
          <p><?php echo htmlspecialchars($row['diagnostico']); ?></p>
        </div>
      </section>
      <?php
      }
      $result->free_result();
      ?>
    </section>
  </div>
</body>

</html>