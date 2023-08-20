<?php

namespace App\Controllers;

use App\Entities\Document;
use App\Entities\User;
use App\Entities\UserRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class UserController extends ControllerWeb
{
    private User $_user;

    public function __construct()
    {
        parent::__construct();

        if (!$this->user()->isAdmin())
        {
            $this->error('No tienes permisos para acceder a esta sección', '/');
        }

        $this->currentUser();
    }

    protected function userRepo(): UserRepository
    {
        return UserRepository::instance();
    }


    protected function currentUser(): User
    {
        return $this->_user ??= (function (): User
        {
            $user = $this->userRepo()->findUserById((int) $this->input->get('id'));
            if (!$user) $this->error('No se ha encontrado el usuario', '/?action=users');
            return $user;
        })();

    }

    public function user_edit(): void
    {
        $this->renderView('users/form.twig', [
            'action' => 'user_update',
            'action_label' => 'Guardar',
            'user' => $this->currentUser()->toArray(),
            'currentUser' => (int) $this->currentUser()->getId() === (int) $this->user()->getId() ? 1 : 0,

        ], 'Editar Usuario');
    }

    public function user_update(): void
    {

        $name = $this->input->get('name');
        $email = $this->input->get('email');
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        $password = $this->input->get('password');
        $type = $this->input->get('type');

        if (!$name) $this->error('Falta el nombre del usuario');
        if (!$email) $this->error('Falta el email del usuario');
        if ((int) $this->currentUser()->getId() !== (int) $this->user()->getId())
        {
            if (!$type) $this->error('Falta el tipo de usuario');
        }

        $existingUser = $this->userRepo()->findUserByEmail($email);
        if ($existingUser && (int) $existingUser->getId() != (int) $this->currentUser()->getId()) $this->error('Ya existe un usuario con ese email');

        $user = $this->currentUser();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPassword($password ? md5($password) : $this->currentUser()->getPassword());
        if ((int) $this->currentUser()->getId() !== (int) $this->user()->getId())
        {
            $user->setType($type);
        }
        $this->userRepo()->save($user);

        $this->redirect("/?action=users");
    }

    #[NoReturn] protected function user_remove(): void
    {

        if ((int) $this->currentUser()->getId() === (int) $this->user()->getId())
        {
            $this->error('No puedes eliminar tu propio usuario', '/?action=users');
        }

        $this->userRepo()->remove($this->currentUser());
        $this->redirect('/?action=users');
    }
}