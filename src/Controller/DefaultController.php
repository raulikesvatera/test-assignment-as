<?php

namespace App\Controller;

use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_default')]
    #[Route('/default/index', name: 'app_default_index')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
