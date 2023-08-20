<?php

namespace App\Entities;

use App\App;
use App\Db\EntityManagerFactory;
use Doctrine\ORM\EntityRepository;

class DocumentRepository extends EntityRepository
{
    private static \Doctrine\Persistence\ObjectRepository|EntityRepository|DocumentRepository $_instance;

    public function findAllDocuments(): array
    {

        return $this->createQueryBuilder('d')
        ->where('d.user = :userId AND  (d.deleted != 1 OR d.deleted IS NULL) ')
            ->setParameter('userId', App::instance()->user()->getId())
            ->getQuery()
            ->getResult();
    }

    public function findOneById(int $id): ? Document
    {
        return $this->createQueryBuilder('d')
        ->where('d.user = :userId AND d.id = :imageId  AND  (d.deleted != 1 OR d.deleted IS NULL) ')
            ->setParameter('imageId', $id)
            ->setParameter('userId', App::instance()->user()->getId())
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function add(Document $document): void
    {
        $document->setUser(App::instance()->user());
        $document->setCreatedBy(App::instance()->user()->getId());

        EntityManagerFactory::getEntityManager()->persist($document);
        EntityManagerFactory::getEntityManager()->flush();
    }



    public function save(Document $document)
    {
        EntityManagerFactory::getEntityManager()->persist($document);
        EntityManagerFactory::getEntityManager()->flush();
    }

    public function remove(Document $document)
    {
        if ($document->getId())
        {
            $document->setContent('');
            $document->setDeleted(1);
            $document->setDeletedBy((int) App::instance()->user()->getId());
            $this->save($document);
        }
    }

    public static function instance(): DocumentRepository
    {
        return static::$_instance ??= EntityManagerFactory::getEntityManager()->getRepository(Document::class);
    }
}