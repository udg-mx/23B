<?php

const APP_NAME = 'UDG';

define("BASE_URL", (function ()
{

    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);  // Aquí es donde quitamos el query string
    $url = $protocol . "://" . $host . $path;

    return $url;

})());
if (!file_exists('vendor/autoload.php')) die("Please run composer install");
require_once 'vendor/autoload.php';

$app = \App\App::instance();
$app->authInstance()->auth();

(new \App\Routes)->route();