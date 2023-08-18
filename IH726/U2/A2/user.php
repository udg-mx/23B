<?php

global $template, $current_user, $colors;
require_once 'common.php';

if (!$current_user)
{
    unset($_COOKIE['auth_id']);
    header('Location: index.php');
    exit;
}



$lastLogin = isset($_COOKIE['lastLogin']) ? $_COOKIE['lastLogin'] : null;

$datetime1 = new DateTime($lastLogin);
$datetime2 = new DateTime();
$interval = $datetime1->diff($datetime2);

?>
<?php echo $template['header'];?>
<div class="max-w-md mx-auto mt-6 bg-white p-5 rounded-lg shadow-md">
    <h2 class="text-lg font-bold mb-4">Datos del Usuario</h2>

    <p><strong>Nombre:</strong> <?= $current_user['name']; ?></p>
    <p><strong>Correo electrónico:</strong> <?= $current_user['email']; ?></p>
    <p><strong>Fecha de nacimiento:</strong> <?= $current_user['dob']; ?></p>

    <p class="mt-4">
        <strong>Tiempo desde el último inicio de sesión:</strong> <?= $interval->format('%d días, %h horas, %i minutos, %s segundos'); ?>
    </p>

    <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Colores:</h2>
        <div class="flex space-x-4">

            <?php

            foreach ($current_user['colors'] ?? [] as $color_id)
            {
                if ($colors[$color_id] ?? false)
                {
                    echo "<span class=\"w-12 h-12 bg-{$color_id}-500 rounded-full\" title=\"{$colors[$color_id]}\"></span>";
                }
            }
            ?>

        </div>
    </div>
    <hr class="mt-10 mb-10">
    <a href="index.php?logout=true" class="mt-4 inline-block px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
        Cerrar Sesión
    </a>
</div>
<?php echo $template['footer'];?>