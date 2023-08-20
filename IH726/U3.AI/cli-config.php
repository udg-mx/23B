<?php

require_once "vendor/autoload.php";

use Doctrine\ORM\Tools\Console\ConsoleRunner;

$entityManager = \App\Db\EntityManagerFactory::getEntityManager();

return ConsoleRunner::createHelperSet($entityManager);
