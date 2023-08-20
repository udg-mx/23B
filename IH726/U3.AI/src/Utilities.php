<?php

namespace App;

class Utilities
{
    static protected Utilities $instance;
    public static function instance(): Utilities
    {
        return self::$instance ??= new Utilities();
    }

    public function randomCode(int $length = 6): string
    {
        $code = '';
        for ($i = 0; $i < rand($length, $length); $i++)
        {
            $code .= chr(rand(97, 122));
        }
        return $code;
    }
}