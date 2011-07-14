<?php

namespace CardGameDemo\Controllers\DefaultController;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use CardGameDemo\UserBundle\Entity;

/**
 * @Route("/")
 */
class DefaultController extends Controller
{            
    /**
     * @Route("/enter", name="_cgdemo_enteruser")
     * @Template()
     */
    public function enterAction()
    {   
        // getting vkontakte user id         
        $id = intval($this->getRequest()->get('user_id'));
        // retrieving user entity
        $user = $this->getDoctrine()
                     ->getRepository('DebercUserBundle:User')                
                     ->find($id);
        
        // check if user weren't found
        if (null == $user) {
            // if user entity weren't found create new
            $user = $this->createUserEntity($id);            
        }                                    
        
        // encode user to json format
        $userAsJson = $this->entityToJson($user);
        return array(
            'userAsJson' => $userAsJson
        );            
    }
}