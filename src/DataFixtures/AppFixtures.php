<?php

namespace App\DataFixtures;

use App\Entity\Filter;
use App\Entity\FilterCriteria;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i < 4; $i++) {
            $filter = new Filter();
            $filter
                ->setName('Test filter number ' . $i)
                ->setSelection('Selection ' . $i);
            $manager->persist($filter);

            for ($j = 1; $j <= rand(1, 4); $j++) {
                $criteria = new FilterCriteria();
                $criteria
                    ->setField('Amount')
                    ->setConditionType('Equal')
                    ->setValue($j . 0)
                    ->setFilter($filter);

                $filter->addFilterCriteria($criteria);

                $manager->persist($criteria);
            }
        }

        $manager->flush();
    }
}
