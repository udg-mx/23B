<?php

namespace App\Layouts;

use App\App;
use App\Db\EntityManagerFactory;
use App\Entities\User;
use App\Utilities;
use Doctrine\ORM\EntityManager;
use JetBrains\PhpStorm\NoReturn;
use Symfony\Component\HttpFoundation\InputBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class ControllerWeb
{
    private ViewOptions $_viewOptions;
    private Request $request;
    protected InputBag $input;
    private Response $response;

    public function __construct()
    {
        $this->request = Request::createFromGlobals();
        $this->response = new Response();
        $this->input = $_SERVER['REQUEST_METHOD'] === 'POST' ? $this->request->request : $this->request->query;
    }


    protected function db(): EntityManager
    {
        return EntityManagerFactory::getEntityManager();
    }

    protected function user(): User
    {
        return $this->app()->user();
    }

    private static function header(): void
    {

    }

    protected function app(): App
    {
        return App::instance();
    }

    protected function isLogged(): bool
    {
        return (bool) ($this->app()->user()->getId() ?? 0);
    }

    protected function loadView(string $view, array $data = null): string
    {
        return Layout::renderView($view, $data ?? []);
    }

    #[NoReturn] private function renderContent(string $template, string $content, string $title): void
    {
        Layout::renderContent($template, $content, $title, $this->viewOptions());
    }

    #[NoReturn] protected function render(string $content, string $title = null): void
    {
        $this->renderContent('full', $content, $title ?? "");
    }

    #[NoReturn] protected function renderView(string $view, array $data = null, string $title = null): void
    {
        $this->renderContent('full', $this->loadView($view, $data ?? []), $title ?? "");
    }

    #[NoReturn] protected function renderSimple(string $content, string $title): void
    {
        Layout::renderSimple($content, $title);
    }

    #[NoReturn] protected function renderRaw(string $view, array $data = null): void
    {
        Layout::renderRaw($view, $data ?? []);
    }

    protected function viewOptions(): ViewOptions
    {
        return $this->_viewOptions ??= new ViewOptions();
    }

    #[NoReturn] protected function error(string $message, string $back = null, string $title = null): void
    {
        Layout::error($message, $back, $title);
    }

    #[NoReturn] protected function success(string $message, string $continue, string $title): void
    {
        Layout::success($message, $continue, $title);
    }


    #[NoReturn] protected function redirect(string $string): void
    {
        header("Location: {$string}");
        exit;
    }


    public function init(): void
    {
        if ($this->input->get('action') && method_exists($this, $this->input->get('action')))
        {
            $method = $this->input->get('action');
            $this->{$method}();
        }
        else if (method_exists($this, 'index'))
        {
            $this->index();
        }
        else
        {
            $this->error404();
        }
    }

    #[NoReturn] static public function run(): void
    {
        $controller = new static();
        $controller->init();

    }

    #[NoReturn] protected function error404(): void
    {
        Layout::error404();
    }

    protected function utilities(): Utilities
    {
        return Utilities::instance();
    }

}