<?php

global $template, $current_user, $user_id;
require_once 'common.php';

if (!$current_user)
{
    unset($_COOKIE['auth_id']);
    header('Location: index.php');
    exit;
}

$fileUploaded = false;
$targetDir = __DIR__."/uploads/";
$errorMessage = "";

if ($_FILES["fileToUpload"]["tmp_name"]) {


    $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($fileInfo, $_FILES["fileToUpload"]["tmp_name"]);
    finfo_close($fileInfo);

    $fileName = strtolower(preg_replace("/[^a-zA-Z0-9_\-.]/", "", $_FILES["fileToUpload"]["name"]));
    $fileName = "{$user_id}_".$fileName;
    $targetFile = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));

    if (!in_array($mime, ['image/jpeg', 'image/jpg', 'image/png'])) {
        $errorMessage = "El archivo no es una imagen válida.";
    }

    if ($fileType != "jpg" && $fileType != "png" && $fileType != "jpeg") {
        $errorMessage = "Lo siento, sólo se permiten archivos JPG, JPEG & PNG.";
    } // Verifica el tamaño
    elseif ($_FILES["fileToUpload"]["size"] > 500000) {
        $errorMessage = "Lo siento, tu archivo es demasiado grande.";
    } // Si no hay errores, intenta subir el archivo
    else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {

            header('Location: index.php');
            exit;

        } else {
            $errorMessage = "Lo siento, hubo un error subiendo tu archivo.";
        }
    }

}



    if ($errorMessage): ?>
        <?php echo $template['header'];?>
        <div class="w-full max-w-md mx-auto mt-6">
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p class="font-bold">Error:</p>
                <p><?= $errorMessage ?></p>
            </div>
            <div class="mt-4 text-center">
                <a href="index.php" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Volver</a>
            </div>
        </div>
        <?php echo $template['footer'];?>
<?php
    else:
        header('Location: index.php');
        exit;
    endif;

