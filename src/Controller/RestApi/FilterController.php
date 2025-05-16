<?php

namespace App\Controller\RestApi;

use App\Entity\Filter;
use App\Service\ValidationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class FilterController extends AbstractController
{
    private ValidationService $validationService;

    public function __construct(
        ValidationService $validationService
    ) {
        $this->validationService = $validationService;
    }

    #[Route('/rest-api/filter/create', methods: ['POST'])]
    public function create(
        Request                $request,
        SerializerInterface    $serializer,
        EntityManagerInterface $entityManager,
        ValidatorInterface     $validator
    ): Response
    {
        $jsonContent = $request->getContent();
        $filter = $serializer->deserialize($jsonContent, Filter::class, 'json', [
            'groups' => ['filter:read'],
            'ignore_unknown' => true,
            'allow_extra_attributes' => true,
        ]);

        if ($errors = $this->validationService->validateEntity($filter)) {
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($filter);
        $entityManager->flush();

        return $this->json($filter, 201, [], ['groups' => ['filter:read']]);
    }

    #[Route('/rest-api/filter/retrieve')]
    public function retrieve(EntityManagerInterface $entityManager, \Symfony\Component\Serializer\SerializerInterface $serializer): JsonResponse
    {
        $filtersRepository = $entityManager->getRepository(Filter::class);
        $filters = $filtersRepository->findAll();

        $jsonContent = $serializer->serialize($filters, 'json', [
            'groups' => ['filter:read'],
        ]);

        return new JsonResponse($jsonContent, 200, [], true);
    }

    #[Route('/rest-api/filter/delete/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $filter = $entityManager->getRepository(Filter::class)->find($id);

        if (!$filter) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($filter);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/rest-api/filter/update', methods: ['PUT'])]
    public function update(
        Request                $request,
        SerializerInterface    $serializer,
        EntityManagerInterface $entityManager,
        ValidatorInterface     $validator
    ): Response
    {
        $jsonContent = $request->getContent();

        $context = [
            'groups' => ['filter:read'],
        ];

        $filter = $serializer->deserialize($jsonContent, Filter::class, 'json', $context);

        if ($errors = $this->validationService->validateEntity($filter)) {
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($filter);
        $entityManager->flush();

        return $this->json($filter, 201, [], ['groups' => ['filter:read']]);
    }
}
