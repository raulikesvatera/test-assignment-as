<?php

namespace App\Serializer;

use App\Entity\Filter;
use App\Entity\FilterCriteria;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class FilterDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    )
    {
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = []): mixed
    {
        $filter = isset($data['id'])
            ? $this->entityManager->getRepository(Filter::class)->find($data['id'])
            : new Filter();

        $filter->setName($data['name']);
        $filter->setSelection($data['selection']);

        if (isset($data['filterCriteriaCollection'])) {
            $collection = $filter->getFilterCriteriaCollection();

            $existingCriteriaData = array_filter($data['filterCriteriaCollection'], fn($c) => isset($c['id']));
            $newCriteriaData = array_filter($data['filterCriteriaCollection'], fn($c) => !isset($c['id']));

            foreach ($collection as $existingCriteria) {
                $stillExists = false;
                foreach ($existingCriteriaData as $criteriaData) {
                    if ($criteriaData['id'] === $existingCriteria->getId()) {
                        $stillExists = true;
                        $existingCriteria->setField($criteriaData['field']);
                        $existingCriteria->setConditionType($criteriaData['condition_type']);
                        $existingCriteria->setValue($criteriaData['value']);
                        break;
                    }
                }
                if (!$stillExists) {
                    $collection->removeElement($existingCriteria);
                }
            }

            foreach ($newCriteriaData as $criteriaData) {
                $criteria = new FilterCriteria();
                $criteria->setField($criteriaData['field']);
                $criteria->setConditionType($criteriaData['condition_type']);
                $criteria->setValue($criteriaData['value']);
                $criteria->setFilter($filter);
                $collection->add($criteria);
            }
        }

        return $filter;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return Filter::class === $type && $format === 'json';
    }

    public function getSupportedTypes(?string $format): array
    {
        return $format === 'json' ? [Filter::class => false] : [];
    }
}
