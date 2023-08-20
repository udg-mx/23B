<?php

namespace App\Layouts;

use App\App;
use JetBrains\PhpStorm\NoReturn;

class Layout
{

    static public function renderView(string $view, array $data): string
    {

        $data['BaseUrl'] = BASE_URL;
        // twig render
        try {
            $loader = new \Twig\Loader\FilesystemLoader(dirname(__DIR__, 2) . '/views');
            $twig = new \Twig\Environment($loader, [
                'cache' => false,
            ]);
            $template = $twig->load($view);
            return $template->render($data);
        }
        catch (\Exception $e) {
            die($e->getMessage());
        }
    }

    #[NoReturn] static public function renderContent(string $template, string $content, string $title, ViewOptions $options = null): void
    {
        $app = App::instance();

        $data = $options?->toArray() ?? [];
        $data['content'] = $content;
        $data['title'] = $title;
        $data['isLogged'] = App::instance()->isLogged();
        $data['user'] = $app->user()->toArray();
        $data['isAdmin'] = $app->user()->isAdmin();

        static::header();
        echo self::renderView("templates/{$template}.twig", $data);
        exit;
    }

    public static function header(int $status = 0): void
    {
        if (!headers_sent())
        {
            static::setHttpResponseCode($status);
            header('Content-Type: text/html; charset=utf-8');
        }
    }

    protected static function setHttpResponseCode($code): void {

        if (headers_sent()) return;

        $status_codes = array(
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout'
        );

        if (isset($status_codes[$code])) {
            header("HTTP/1.1 " . $code . " " . $status_codes[$code]);
        }
    }


    #[NoReturn] public static function renderRaw(string $view, array $data = null): void
    {
        static::header();
        echo self::renderView($view, $data ?? []);
        exit;
    }


    #[NoReturn] public static function error(string $message, string $back = null, string $title = null): void
    {
        $data = (new ViewOptions())->setCenterContent()->toArray();
        $data['message'] = $message;
        $data['back'] = $back ? : BASE_URL;
        static::renderSimple(self::renderView('dialogues/error.twig', $data), 'Error' . ($title ? " - {$title}" : ''));
    }

    #[NoReturn] public static function success(string $message, string $continue, string $title): void
    {

        $data = (new ViewOptions())->setCenterContent()->toArray();
        $data['message'] = $message;
        $data['continue'] = $continue ? : BASE_URL;
        static::renderSimple(self::renderView('dialogues/success.twig', $data), $title);
    }


    #[NoReturn] public static function renderSimple(string $content, string $title, ViewOptions $options = null): void
    {
        self::renderContent('simple', $content, $title, $options);
    }

    #[NoReturn] public static function error404(): void
    {
        self::header(404);
        self::renderSimple(self::renderView('errors/404.twig', []), 'El recurso no existe', (new ViewOptions())->setCenterContent());
    }


}