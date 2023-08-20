<?php

namespace App\Entities;

use App\App;
use App\Db\EntityManagerFactory;
use Doctrine\ORM\EntityRepository;

class ImageRepository extends EntityRepository
{
    private static \Doctrine\Persistence\ObjectRepository|EntityRepository|ImageRepository $_instance;

    public function findImages(): array
    {
        return $this->createQueryBuilder('i')  // 'i' es un alias para 'Image'
        ->where('i.user = :userId AND  (i.deleted != 1 OR i.deleted IS NULL) ')
            ->setParameter('userId', App::instance()->user()->getId())
            ->getQuery()
            ->getResult();
    }
    public function findImage(int $id): ? Image
    {
        return $this->createQueryBuilder('i')
        ->where('i.user = :userId AND i.id = :imageId  AND  (i.deleted != 1 OR i.deleted IS NULL) ')
            ->setParameter('imageId', $id)
            ->setParameter('userId', App::instance()->user()->getId())
            ->getQuery()
            ->getOneOrNullResult();
    }




    public function add(Image $image): void
    {
        $image->setUser(App::instance()->user());
        $image->setCreatedBy(App::instance()->user()->getId());

        EntityManagerFactory::getEntityManager()->persist($image);
        EntityManagerFactory::getEntityManager()->flush();
    }



    public function save(Image $image)
    {
        EntityManagerFactory::getEntityManager()->persist($image);
        EntityManagerFactory::getEntityManager()->flush();
    }

    public function remove(Image $image)
    {
        if ($image->getId())
        {
            $image->setDeleted(1);
            $image->setDeletedBy((int) App::instance()->user()->getId());
            $this->save($image);
        }
    }

    public static function instance(): ImageRepository
    {
        return static::$_instance ??= EntityManagerFactory::getEntityManager()->getRepository(Image::class);
    }
}