<?php

const APP_NAME = 'UDG';
if (!file_exists('vendor/autoload.php')) die("Please run composer install");
require_once 'vendor/autoload.php';

$app = \App\App::instance();
$app->authInstance()->auth();

(new \App\Routes)->route();