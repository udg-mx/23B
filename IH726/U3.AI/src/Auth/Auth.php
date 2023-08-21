<?php

namespace App\Auth;

use App\App;
use App\Controllers\LoginController;
use App\Db\EntityManagerFactory;
use App\Entities\User;
use App\Entities\UserRepository;
use Doctrine\ORM\EntityManager;
use JetBrains\PhpStorm\NoReturn;

class Auth
{
    private App $app;

    public function __construct(App $app)

        {if (session_status() == PHP_SESSION_NONE) session_start();
        $this->app = $app;
    }

    protected function db(): EntityManager
    {
        return EntityManagerFactory::getEntityManager();
    }

    public function auth(): void
    {

        if (isset($_GET['logout']) && $_GET['logout'])
        {
            $this->logout();
        }

        if (isset($_SESSION['user']))
        {

            $user = UserRepository::instance()->findUserById((int) $_SESSION['user']);

            if ($user)
            {
                $this->app()->setUser($user);
                return;
            }
        }

        LoginController::run();

    }

    public function app(): App
    {
        return $this->app;
    }

    public function setSession(User $user): void
    {
        $_SESSION['user'] = $user->getId();
    }

    #[NoReturn] public function logout(): void
    {
        session_destroy();
        header('Location: ' . BASE_URL);
        exit;

    }

}