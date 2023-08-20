<?php

namespace App;

use App\Auth\Auth;
use App\Entities\User;

class App
{
    protected static App $instance;
    private User $user;

    public static function instance(): App
    {
        return self::$instance ??= new App();
    }

    public function __construct()
    {

        $this->user = new User();
        $whoops = new \Whoops\Run;
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
        $whoops->register();


        $this->validation();

    }

    public function authInstance(): Auth
    {
        return new Auth($this);
    }

    public function isLogged(): bool
    {
        return (bool) ($this->user()->getId() ?? 0);
    }

    public function setUser(User $user): App
    {
        $this->user = $user;
        return $this;
    }

    public function user(): User
    {
        return $this->user;
    }

    public function uploadDirectory(): string
    {
        return dirname(__DIR__) . '/uploads';
    }


    public function cacheDirectory(): string
    {
        return dirname(__DIR__) . '/cache';
    }

    public function cacheProxyDirectory(): string
    {
        return dirname(__DIR__) . '/cache/proxies';
    }

    protected function validation(): void
    {

        if (!file_exists($this->uploadDirectory()))
        {
            mkdir($this->uploadDirectory());
            chmod($this->uploadDirectory(), 0777);
        }

        if (!file_exists($this->cacheDirectory()))
        {
            mkdir($this->cacheDirectory());
            chmod($this->cacheDirectory(), 0777);
        }

        if (!file_exists($this->cacheProxyDirectory()))
        {
            mkdir($this->cacheProxyDirectory());
            chmod($this->cacheProxyDirectory(), 0777);
        }

    }

}