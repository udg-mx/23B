<?php

namespace App\Controllers;

use App\Entities\Image;
use App\Entities\ImageRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class GalleryController extends ControllerWeb
{
    protected function imageRepository(): ImageRepository
    {
        return ImageRepository::instance();
    }
    #[NoReturn] protected function index(): void
    {
        $images = [];
        foreach ($this->imageRepository()->findImages() ?? [] as $image) {
            $images[] = $image->toArray();
        }
        $this->renderView('gallery/index.twig', ['images' => $images]);
    }
}