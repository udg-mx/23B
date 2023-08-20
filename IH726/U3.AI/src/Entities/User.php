<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="App\Entities\UserRepository")
 * @ORM\Table(name="users")
 * @ORM\HasLifecycleCallbacks()
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     */
    private $type;

    /**
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $deleted_at;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $deleted;

    /**
     * @ORM\Column(type="integer")
     */
    private $created_by;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $deleted_by;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updated_at;

    /**
     * @ORM\Column(type="integer")
     */
    private $updated_by;

    // Getters and setters

    public function getId(): ? int
    {
        return $this->id;
    }

    public function getName(): ? string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getType(): ? string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getPassword(): ? string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getEmail(): ? string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getCreatedAt(): ? \DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTime $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getDeletedAt(): ? \DateTime
    {
        return $this->deleted_at;
    }

    public function setDeletedAt(?\DateTime $deleted_at): void
    {
        $this->deleted_at = $deleted_at;
    }

    public function getCreatedBy(): ? int
    {
        return $this->created_by;
    }

    public function setCreatedBy(int $created_by): void
    {
        $this->created_by = $created_by;
    }

    public function getDeletedBy(): ? int
    {
        return $this->deleted_by;
    }

    public function setDeletedBy(?int $deleted_by): void
    {
        $this->deleted_by = $deleted_by;
    }

    public function getUpdatedAt(): ? \DateTime
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTime $updated_at): void
    {
        $this->updated_at = $updated_at;
    }

    public function getUpdatedBy(): ? int
    {
        return $this->updated_by;
    }

    public function setUpdatedBy(?int $updated_by): void
    {
        $this->updated_by = $updated_by;
    }

    public function isAdmin(): bool
    {
        return $this->getType() === 'admin';
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'email' => $this->getEmail(),
            'type' => $this->getType(),
            'isAdmin' => $this->isAdmin()

        ];
    }



    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue(): void
    {
        $this->created_at = new \DateTime();
        $this->created_by = $this->created_by ?? 0;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function setUpdatedAtValue(): void
    {
        $this->updated_at = new \DateTime();
        $this->updated_by = $this->updated_by ?? 0;
    }



    public function getDeleted(): int
    {
        return (int) $this->deleted;
    }

    public function setDeleted(int $deleted): void
    {
        $this->deleted = $deleted;
    }

}
