<?php

global $template, $current_user;
require_once 'common.php';

if ($current_user)
{
    include 'user.php';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = trim(strtolower($_POST['email']));
    $password = trim($_POST['password']);
    $hashedEmail = md5($email);

    if (isset($_SESSION[$hashedEmail])) {
        $user = $_SESSION[$hashedEmail];

        if ($user['password'] === $password) {
            setcookie('auth_id', $hashedEmail, time() + 3600);
            setcookie("lastLogin", date("Y-m-d H:i:s"), time() + 3600);
            header('Location: index.php');
            exit;
        }
    }
    include "error.php";
    exit;
}
?>
<?php echo $template['header'];?>
<form method="post" action="login.php" class="bg-white p-6 rounded-lg shadow-md" autocomplete="off">
    <div class="mb-4">
        <label class="block text-gray-700">Correo</label>
        <input type="email" name="email" required class="w-full mt-2 border rounded-md">
    </div>
    <div class="mb-4">
        <label class="block text-gray-700">Contraseña</label>
        <input type="password" name="password" required class="w-full mt-2 border rounded-md">
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Iniciar Sesión</button>
    <a href="register.php" class="block mt-4 text-blue-500">¿No tienes cuenta? Regístrate aquí</a>
</form>
<?php echo $template['footer'];?>