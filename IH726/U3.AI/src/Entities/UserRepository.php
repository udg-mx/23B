<?php

namespace App\Entities;

use App\App;
use App\Db\EntityManagerFactory;
use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    private static \Doctrine\Persistence\ObjectRepository|EntityRepository|UserRepository $_instance;

    public function findAllUsers(): array
    {
        return $this->createQueryBuilder('u')
        ->where(' (u.deleted != 1 OR u.deleted IS NULL) ')
            ->getQuery()
            ->getResult();
    }
    public function findUserById(int $userId): ? User
    {
        return $this->createQueryBuilder('u')
            ->where('u.id = :userId AND (u.deleted != 1 OR u.deleted IS NULL)')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function findUserByEmail(string $email): ? User
    {
        return $this->createQueryBuilder('u')
            ->where('u.email = :email AND (u.deleted != 1 OR u.deleted IS NULL)')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }


    public function add(User $user): void
    {
        EntityManagerFactory::getEntityManager()->persist($user);
        EntityManagerFactory::getEntityManager()->flush();
    }

    public function save(User $user)
    {
        EntityManagerFactory::getEntityManager()->persist($user);
        EntityManagerFactory::getEntityManager()->flush();
    }

    public function remove(User $user)
    {
        if ($user->getId())
        {
            $user->setDeleted(1);
            $user->setDeletedBy((int) App::instance()->user()->getId());
            $this->save($user);
        }
    }

    public static function instance(): UserRepository
    {
        return static::$_instance ??= EntityManagerFactory::getEntityManager()->getRepository(User::class);
    }

}