<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\FilterCriteriaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FilterCriteriaRepository::class)]

class FilterCriteria
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['filter:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['filter:read'])]
    #[Assert\NotBlank(message: 'The criteria field field cannot be empty')]
    private ?string $field = null;

    #[ORM\Column(length: 255)]
    #[Groups(['filter:read'])]
    #[Assert\NotBlank(message: 'The criteria condition type field cannot be empty')]
    private ?string $condition_type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['filter:read'])]
    #[Assert\NotBlank(message: 'The criteria value field cannot be empty')]
    private ?string $value = null;

    #[ORM\ManyToOne(targetEntity: Filter::class, inversedBy: 'filterCriteriaCollection')]
    private ?Filter $filter = null;

    public function getFilter(): ?Filter
    {
        return $this->filter;
    }

    public function setFilter(?Filter $filter): self
    {
        $this->filter = $filter;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getField(): ?string
    {
        return $this->field;
    }

    public function setField(string $field): static
    {
        $this->field = $field;

        return $this;
    }

    public function getConditionType(): ?string
    {
        return $this->condition_type;
    }

    public function setConditionType(string $condition_type): static
    {
        $this->condition_type = $condition_type;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }
}
