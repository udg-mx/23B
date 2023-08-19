<?php

global $template, $current_user, $user_id;
require_once 'common.php';

if (!$current_user)
{
    unset($_COOKIE['auth_id']);
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['remove'])
{
    $fileName = basename("uploads/{$_GET['remove']}");

    if (file_exists(__DIR__."/uploads/{$fileName}"))
    {
        @unlink(__DIR__."/uploads/{$fileName}");
    }

    header('Location: index.php');
    exit;
}



?>
<?php echo $template['header'];?>

    <div class="bg-white p-6 rounded shadow max-w-xxl w-full">
        <!-- Cabecera: Nombre del usuario y botón de cerrar sesión -->
        <div class="flex justify-between items-center mb-6">
            <span class="text-xl font-bold"><?= $current_user['name'] ?></span>
            <small class="text-sm"><?= $current_user['email'] ?></small>
            <a href="index.php?logout=true" class="bg-red-500 hover:bg-red-600 text-sm text-white p-2 rounded">
                <i class="fas fa-sign-out-alt"></i> Cerrar sesión
            </a>
        </div>
        <hr class="mt-5 mb-10 border-gray-300">

        <!-- Thumbnails de las imágenes con botones de descargar y eliminar -->
        <div class="grid grid-cols-4 gap-4 mb-4">

            <?php


            $filePath = __DIR__."/uploads";

            $fileList = array_filter(scandir($filePath), function($fileName) use ($filePath) {
                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                return is_file($filePath . '/' . $fileName) && in_array($fileExtension, ['jpeg', 'jpg', 'png']);
            });


                foreach ($fileList as $fileName):

                 ?>

                    <div class="relative w-36 h-36">
                        <img src="uploads/<?= $fileName ?>" alt="Imagen de ejemplo" class="rounded w-full h-full object-cover">
                        <div class="absolute bottom-1 right-1 space-x-1">
                            <a href="uploads/<?= $fileName ?>" class="text-blue-500 hover:text-blue-600 text-xs md:text-sm" target="_blank">
                                <i class="fas fa-download"></i>
                            </a>
                            <a href="app.php?remove=<?= htmlentities($fileName) ?>" class="text-red-500 hover:text-red-600 text-xs md:text-sm">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </div>

            <?php
                endforeach;

            ?>

        </div>

        <!-- Botón para agregar nuevas imágenes -->
        <form id="FormUpload" action="upload.php" method="post" enctype="multipart/form-data">
            <input type="file" name="fileToUpload" id="fileToUpload" accept="image/jpeg, image/png" class="opacity-0 absolute">
            <button type="button" class="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"  id="fileButton">
                <i class="fas fa-plus"></i> Agregar nueva imagen
            </button>

            <div id="fileSizeError" class="mt-3 text-red-600 hidden">El archivo es demasiado grande. Por favor, seleccione un archivo menor a 500 KB.</div>
        </form>
    </div>

    <script>
        const fileInput = document.getElementById('fileToUpload');
        const fileLabel = document.getElementById('fileLabel');
        const fileSizeError = document.getElementById('fileSizeError');
        const MAX_SIZE = 500000;

        fileInput.addEventListener('change', function() {
            const fileSize = this.files[0] ? this.files[0].size : 0;

            if (fileSize > MAX_SIZE) {
                fileSizeError.classList.remove('hidden');
            } else {
                fileSizeError.classList.add('hidden');

                if (fileSize > 0)
                {
                    document.getElementById("FormUpload").submit();
                }

            }
        });

        document.getElementById("fileButton").addEventListener("click", function() {
            document.getElementById("fileToUpload").click();
        });


    </script>

<?php echo $template['footer'];?>