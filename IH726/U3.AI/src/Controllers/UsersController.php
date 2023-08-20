<?php

namespace App\Controllers;

use App\Entities\Document;
use App\Entities\User;
use App\Entities\UserRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class UsersController extends ControllerWeb
{
    public function __construct()
    {
        parent::__construct();

        if (!$this->user()->isAdmin())
        {
            $this->error('No tienes permisos para acceder a esta sección', BASE_URL);
        }
    }

    protected function userRepo(): UserRepository
    {
        return UserRepository::instance();
    }
    #[NoReturn] protected function index(): void
    {
        $users = [];
        foreach ($this->userRepo()->findAllUsers() as $document)
        {
            $users[] = $document->toArray();
        }

        $this->renderView('users/index.twig', [
            'users' => $users,
            'current_user_id' => $this->user()->getId(),
        ], 'Usuarios');
    }

    protected function users_new(): void
    {

        $this->renderView('users/form.twig', [
            'action' => 'users_add',
            'action_label' => 'Agregar Usuario',
        ], 'Nuevo Usuario');
    }

    protected function users_add(): void
    {

        $name = $this->input->get('name');
        $email = $this->input->get('email');
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        $password = $this->input->get('password');
        $type = $this->input->get('type');

        if (!$name) $this->error('Falta el nombre del usuario');
        if (!$email) $this->error('Falta el email del usuario');
        if (!$password) $this->error('Falta la contraseña del usuario');
        if (!$type) $this->error('Falta el tipo de usuario');

        $existingUser = $this->userRepo()->findUserByEmail($email);
        if ($existingUser) $this->error('Ya existe un usuario con ese email');

        $document = new User();
        $document->setName($name);
        $document->setEmail($email);
        $document->setPassword(md5($password));
        $document->setType($type);
        $this->userRepo()->add($document);

        $this->redirect(BASE_URL."?action=users");

    }
}