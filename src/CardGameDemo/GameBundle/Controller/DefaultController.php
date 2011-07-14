<?php

namespace CardGameDemo\GameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use CardGameDemo\UserBundle\Entity;

/**
 * @Route("/app")
 */
class DefaultController extends Controller
{            
    /**
     * @Route("/enter", name="_cgdemo_enteruser")
     * @Template()
     */
    public function enterAction()
    {   
        return array();
    }
    
    /**
     * @Route("/", name="_cgdemo_indexpage")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
}