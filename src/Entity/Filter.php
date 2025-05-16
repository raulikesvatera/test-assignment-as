<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\FilterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FilterRepository::class)]
class Filter
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['filter:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['filter:read'])]
    #[Assert\NotBlank(message: 'The name field cannot be empty')]
    private ?string $name = '';

    #[ORM\Column(length: 255)]
    #[Groups(['filter:read'])]
    #[Assert\NotBlank(message: 'The selection field cannot be empty')]
    private string $selection = '';

    #[ORM\OneToMany(targetEntity: FilterCriteria::class, mappedBy: 'filter', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['filter:read'])]
    #[Assert\Count(
        min: 1,
        minMessage: 'Filter must have at least one criteria'
    )]
    #[Assert\Valid]
    #[MaxDepth(1)]
    private Collection $filterCriteriaCollection;

    public function __construct()
    {
        $this->filterCriteriaCollection = new ArrayCollection();
    }

    public function addFilterCriteria(FilterCriteria $criteria): self
    {
        if (!$this->filterCriteriaCollection->contains($criteria)) {
            $this->filterCriteriaCollection[] = $criteria;
            $criteria->setFilter($this);
        }
        return $this;
    }

    public function removeFilterCriteria(FilterCriteria $criteria): self
    {
        if ($this->filterCriteriaCollection->removeElement($criteria)) {
            if ($criteria->getFilter() === $this) {
                $criteria->setFilter(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, FilterCriteria>
     */
    public function getFilterCriteriaCollection(): Collection
    {
        return $this->filterCriteriaCollection;
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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSelection(): string
    {
        return $this->selection;
    }

    public function setSelection(string $selection): static
    {
        $this->selection = $selection;

        return $this;
    }
}
