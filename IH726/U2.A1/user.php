<?php
$lastLogin = isset($_COOKIE['lastLogin']) ? $_COOKIE['lastLogin'] : null;

$datetime1 = new DateTime($lastLogin);
$datetime2 = new DateTime();
$interval = $datetime1->diff($datetime2);
?>

<div class="max-w-md mx-auto mt-6 bg-white p-5 rounded-lg shadow-md">
    <h2 class="text-lg font-bold mb-4">Datos del Usuario</h2>

    <p><strong>Nombre:</strong> <?= $_SESSION['userdata']['name']; ?></p>
    <p><strong>Correo electrónico:</strong> <?= $_SESSION['userdata']['email']; ?></p>
    <p><strong>Fecha de nacimiento:</strong> <?= $_SESSION['userdata']['dob']; ?></p>

    <p class="mt-4">
        <strong>Tiempo desde el último inicio de sesión:</strong> <?= $interval->format('%d días, %h horas, %i minutos, %s segundos'); ?>
    </p>

    <a href="index.php?logout=true" class="mt-4 inline-block px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
        Cerrar sesión
    </a>
</div>