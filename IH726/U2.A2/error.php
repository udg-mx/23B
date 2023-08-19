<?php

global $template, $current_user;
require_once 'common.php';

?>
<?php echo $template['header'];?>

    <div class="w-full max-w-md mx-auto mt-6">
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p class="font-bold">Error:</p>
            <p>Correo o contraseña incorrectos</p>
        </div>
        <div class="mt-4 text-center">
            <a href="index.php" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Volver</a>
        </div>
    </div>
<?php echo $template['footer'];?>