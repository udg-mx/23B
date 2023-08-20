<?php

namespace App;

use App\Controllers\DocumentController;
use App\Controllers\DocumentsController;
use App\Controllers\GalleryController;
use App\Controllers\ImageController;
use App\Controllers\HomeController;
use App\Controllers\UserController;
use App\Controllers\UsersController;
use App\Layouts\Layout;
use Symfony\Component\HttpFoundation\InputBag;
use Symfony\Component\HttpFoundation\Request;

class Routes
{
    private Request $request;
    private InputBag $input;

    public function __construct()
    {
        $this->request = Request::createFromGlobals();
        $this->input =  $_SERVER['REQUEST_METHOD'] === 'POST' ? $this->request->request : $this->request->query;
    }

    public function route()
    {
        if ($this->validRoute('gallery'))
        {
            GalleryController::run();

        }
        else if ($this->validRoute('image'))
        {
            ImageController::run();
        }
        else if ($this->validRoute('document'))
        {
            DocumentController::run();
        }
        else if ($this->validRoute('documents'))
        {
            DocumentsController::run();
        }
        else if ($this->validRoute('user'))
        {
            UserController::run();
        }
        else if ($this->validRoute('users'))
        {
            UsersController::run();
        }
        else if ($this->input->get('action'))
        {

            Layout::error404();
        }
        else
        {
            GalleryController::run();
        }
    }

    protected function validRoute(string $action): bool
    {
        if ($this->input->get('action') === $action)
        {
            return true;
        }
        else if (str_starts_with($this->input->get('action'), "{$action}_"))
        {
            return true;
        }

        return false;
    }

}