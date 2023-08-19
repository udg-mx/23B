<?php

global $template, $current_user, $colors;
require_once 'common.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = trim(strtolower($_POST['email']));
    $password = trim($_POST['password']);
    $dob = $_POST['dob'];
    $fav_colors = $_POST['colors'];
    $hashedEmail = md5($email);

    $_SESSION[$hashedEmail] = [
        'name' => $name,
        'email' => $email,
        'password' => $password,
        'dob' => $dob,
        'colors' => is_string($fav_colors) ? [$fav_colors] : $fav_colors
    ];

    setcookie('auth_id', $hashedEmail, time() + 3600);
    setcookie("lastLogin", date("Y-m-d H:i:s"), time() + 3600);
    header('Location: index.php');
    exit;
}

?>
<?php echo $template['header'];?>
<div class="max-w-md mx-auto mt-6 bg-white p-5 rounded-lg shadow-md">
    <form action="register.php" method="post" autocomplete="off">
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Nombre:</label>
            <input type="text" id="name" name="name" required class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Correo electrónico:</label>
            <input type="email" id="email" name="email" required class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-600">Contraseña:</label>
            <input type="password" id="password" name="password" required class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
            <label for="dob" class="block text-sm font-medium text-gray-600">Fecha de nacimiento:</label>
            <input type="date" id="dob" name="dob" required class="mt-1 p-2 w-full border rounded-md">
        </div>


        <div class="mb-4">
            <label for="colors" class="block text-sm font-medium text-gray-600">Colores Favoritos:</label>
            <select id="colors" name="colors[]" required class="mt-1 p-2 w-full border rounded-md" multiple>
                <?php foreach ($colors as $color => $color_name): ?>
                    <option value="<?= $color; ?>"><?= $color_name ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="text-end">
            <a href="index.php" class="w-50 p-2 text-white bg-gray-500 rounded-md hover:bg-blue-600">Cancelar</a>
            <input type="submit" value="Registrar" class="w-50 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        </div>
    </form>
</div>
<?php echo $template['footer'];?>

