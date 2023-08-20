<?php

namespace App\Controllers;

use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class HomeController extends ControllerWeb
{
    #[NoReturn] public function index(): void
    {
        $this->render("home");
    }
}