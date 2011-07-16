<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appprodUrlMatcher
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appprodUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = urldecode($pathinfo);

        // _cgdemo_enteruser
        if ($pathinfo === '/app/enter') {
            return array (  '_controller' => 'CardGameDemo\\GameBundle\\Controller\\DefaultController::enterAction',  '_route' => '_cgdemo_enteruser',);
        }

        // _cgdemo_indexpage
        if (rtrim($pathinfo, '/') === '/app') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', '_cgdemo_indexpage');
            }
            return array (  '_controller' => 'CardGameDemo\\GameBundle\\Controller\\DefaultController::indexAction',  '_route' => '_cgdemo_indexpage',);
        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
