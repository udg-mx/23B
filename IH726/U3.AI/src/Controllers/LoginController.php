<?php

namespace App\Controllers;

use App\Entities\User;
use App\Entities\UserRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class LoginController extends ControllerWeb
{
    #[NoReturn] public function init(): void
    {
        if ($this->isLogged()) {
            $this->redirect(BASE_URL);
        }

        if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'register')
        {
            $this->registerPage();
        }
        else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'register')
        {
            $this->register();
        }
        else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login')
        {
            $this->login();
        }
        else
        {
            $this->loginPage();
        }

    }

    #[NoReturn] private function register(): void
    {
        $email = $_POST['email'] ?? null;
        $email = $email && filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
        $name = $_POST['name'] ?? null;
        $password = $_POST['password'] ?? null;
        $password = $password ? trim($password) : null;

        if ($email === null) $this->error('El correo no es válido', "/?action=register");
        if ($name === null) $this->error('El nombre no es válido', "/?action=register");
        if ($password === null) $this->error('La contraseña no es válida', "/?action=register");

        $user = UserRepository::instance()->findUserByEmail($email);

        if ($user)
        {
            $this->error('No es posible registrarse con ese correo. El usuario ya existe', "/?action=register");
        }

        $user = new User();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPassword(md5($password));
        $user->setCreatedAt(new \DateTime());

        $totalUsers = UserRepository::instance()->count([]);

        if ($totalUsers > 0) {
            $user->setType('user');
        } else {
            $user->setType('admin');
        }

        UserRepository::instance()->add($user);

        $this->success("Cuenta Creada", "/", "Cuenta Creada");

    }

    #[NoReturn] private function registerPage(): void
    {
        $this->viewOptions()->setCenterContent();
        $this->renderSimple($this->loadView('auth/register.twig'), 'Registrar');
    }

    #[NoReturn] private function loginPage(): void
    {
        $this->viewOptions()->setCenterContent();
        $this->renderSimple($this->loadView('auth/login.twig'), 'Login');
    }

    #[NoReturn] private function login(): void
    {
        $email = $_POST['email'] ?? null;
        $passwd = $_POST['password'] ?? null;
        $passwd = $passwd ? md5(trim($passwd)) : null;

        $user = $this->db()->getRepository('App\Entities\User')->findOneBy(['email' => $email, 'password' => $passwd]);

        if (!$user)
        {
            $this->error('Usuario y/o contraseña inválida', "/");
        }

        $this->app()->authInstance()->setSession($user);
        $this->redirect(BASE_URL);
    }

}