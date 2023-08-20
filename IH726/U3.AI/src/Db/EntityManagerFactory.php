<?php

namespace App\Db;

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Configuration;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Doctrine\Common\Annotations\AnnotationReader;

class EntityManagerFactory
{
    private static ?EntityManager $entityManager = null;

    public static function getEntityManager(): EntityManager
    {
        if (self::$entityManager === null) {

            $dbFile = dirname(__DIR__, 2) . '/cache/database.sqlite';
            $config = new Configuration();

            if (!file_exists(dirname(__DIR__, 2)."/cache/proxies"))
            {
                mkdir(dirname(__DIR__, 2)."/cache/proxies");
                chmod(dirname(__DIR__, 2)."/cache/proxies", 0777);
            }
            $config->setProxyDir(dirname(__DIR__, 2)."/cache/proxies");
            $config->setProxyNamespace('App\\Entities\\Proxies');



            // Set up driver
            $driver = new AnnotationDriver(new AnnotationReader(), [dirname(__DIR__) . "/Entities"]);
            $config->setMetadataDriverImpl($driver);

            if (!(env('ENV') === 'production')) {
                $config->setAutoGenerateProxyClasses(true);
            } else {
                $config->setAutoGenerateProxyClasses(false);
            }

            $connectionParams = [
                'driver'   => 'pdo_sqlite',
                'path'     => $dbFile,
            ];

            try {
                $connection = DriverManager::getConnection($connectionParams, $config);
                self::$entityManager = new EntityManager($connection, $config);
                static::dbExist($dbFile, self::$entityManager);
            }
            catch (\Exception $e) {
                echo "Error de conexión: " . $e->getMessage();
            }

        }

        return self::$entityManager;
    }
    protected static function dbExist($dbFile, EntityManager $entityManager): void
    {
        if (!file_exists($dbFile)) {
            touch($dbFile);


            try {

                $tool = new \Doctrine\ORM\Tools\SchemaTool($entityManager);
                $classes = array(
                    $entityManager->getClassMetadata('App\Entities\User'),
                    $entityManager->getClassMetadata('App\Entities\Image'),
                    $entityManager->getClassMetadata('App\Entities\Document')
                );
                $tool->createSchema($classes);

            }
            catch (\Exception $e) {
                echo "Error de conexión: " . $e->getMessage();
                exit;
            }

        }
    }
}