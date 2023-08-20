<?php


/**
 * Get the value of an environment variable or return a default value.
 * Ensures that Dotenv is initialized.
 *
 * @param string $key The key of the environment variable.
 * @param mixed $default Default value if the key is not set.
 * @return string
 */
function env(string$key, mixed $default = null): string
{
    static $initialized = false;

    if (!$initialized && class_exists(Dotenv\Dotenv::class)) {

        $initialized = true;
        try {
            $dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
            $dotenv->load();

        }
        catch (\Exception $e) {
            die($e->getMessage());
        }

    }

    return isset($_ENV[$key]) ? (string) $_ENV[$key] : (string) $default;
}