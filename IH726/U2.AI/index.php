<?php

global $template, $current_user;
require_once 'common.php';

if ($current_user)
{
    header('Location: app.php');
}
else
{
    header('Location: login.php');
}
exit;