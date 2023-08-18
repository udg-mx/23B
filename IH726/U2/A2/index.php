<?php

global $template, $current_user;
require_once 'common.php';

if ($current_user)
{
    header('Location: user.php');
}
else
{
    header('Location: login.php');
}
exit;