<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="App\Entities\ImageRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="images")
 */
class Image
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     */
    private $file_location;

    /**
     * @ORM\Column(type="string")
     */
    private $type;

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

    // Getters and setters...

    public function getId(): int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getFileLocation(): string
    {
        return $this->file_location;
    }

    public function setFileLocation(string $file_location): void
    {
        $this->file_location = $file_location;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTime $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getDeletedAt(): ?\DateTime
    {
        return $this->deleted_at;
    }

    public function setDeletedAt(?\DateTime $deleted_at): void
    {
        $this->deleted_at = $deleted_at;
    }

    public function getCreatedBy(): int
    {
        return $this->created_by;
    }

    public function setCreatedBy(int $created_by): void
    {
        $this->created_by = $created_by;
    }

    public function getDeletedBy(): ?int
    {
        return $this->deleted_by;
    }

    public function setDeletedBy(?int $deleted_by): void
    {
        $this->deleted_by = $deleted_by;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTime $updated_at): void
    {
        $this->updated_at = $updated_at;
    }

    public function getUpdatedBy(): ?int
    {
        return $this->updated_by;
    }

    public function setUpdatedBy(?int $updated_by): void
    {
        $this->updated_by = $updated_by;
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

    public function toArray(): array
    {
        $data = [];

        $data['id'] = $this->getId();
        $data['user'] = $this->getUser();
        $data['name'] = $this->getName();
        $data['file_location'] = $this->getFileLocation();
        $data['type'] = $this->getType();
        $data['created_at'] = $this->getCreatedAt();
        $data['deleted_at'] = $this->getDeletedAt();
        $data['created_by'] = $this->getCreatedBy();
        $data['deleted_by'] = $this->getDeletedBy();
        $data['updated_at'] = $this->getUpdatedAt();
        $data['updated_by'] = $this->getUpdatedBy();

        return $data;


    }

}
