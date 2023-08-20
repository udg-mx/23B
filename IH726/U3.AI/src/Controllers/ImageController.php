<?php

namespace App\Controllers;

use App\Entities\Image;
use App\Entities\ImageRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class ImageController extends ControllerWeb
{
    protected function imageRepository(): ImageRepository
    {
        return ImageRepository::instance();
    }

    #[NoReturn] protected function image_upload(): void
    {

        if ($_FILES["fileToUpload"]["tmp_name"])
        {
            $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($fileInfo, $_FILES["fileToUpload"]["tmp_name"]);
            finfo_close($fileInfo);



            $fileNameSimple = strtolower(preg_replace("/[^a-zA-Z0-9_\-.]/", "", $_FILES["fileToUpload"]["name"]));
            $fileName = "{$this->utilities()->randomCode()}_".$fileNameSimple;
            $targetFile = $this->app()->uploadDirectory() . "/".$fileName;
            $fileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));

            if (!in_array($mime, ['image/jpeg', 'image/jpg', 'image/png']))
            {
                $this->error('El archivo no es una imagen válida.');
            }

            if ($fileType != "jpg" && $fileType != "png" && $fileType != "jpeg")
            {
                $this->error('Lo siento, sólo se permiten archivos JPG, JPEG & PNG.');
            }
            elseif ($_FILES["fileToUpload"]["size"] > 500000)
            {
                $this->error('Lo siento, tu archivo es demasiado grande.');
            }
            else {
                if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {

                    $image = new Image();
                    $image->setType($fileType);
                    $image->setName($fileNameSimple);
                    $image->setFileLocation($fileName);
                    ImageRepository::instance()->add($image);

                    $this->redirect(BASE_URL);


                } else {
                    $this->error('No fue posible cargar la imagen.');
                }
            }

        }

        $this->error('No fue posible cargar la imagen.');
    }

    protected function image_remove(): void
    {
        $imageId = $this->input->get('id') ?? null;

        if (!$imageId)
        {
            $this->error('No fue posible eliminar la imagen.');
        }

        $image = $this->imageRepository()->findImage( $imageId);

        if (!$image)
        {
            $this->error('No fue posible eliminar la imagen.');
        }

        try {
            if (file_exists($this->app()->uploadDirectory() . "/".$image->getFileLocation()))
            {
                unlink($this->app()->uploadDirectory() . "/".$image->getFileLocation());
            }

            $this->imageRepository()->remove($image);

        } catch (\Error $e) {
            $this->error('No fue posible eliminar la imagen.');
        }

        $this->redirect(BASE_URL);
    }


}