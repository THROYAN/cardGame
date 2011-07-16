<?php

use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Exception\RouteNotFoundException;


/**
 * appprodUrlGenerator
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appprodUrlGenerator extends Symfony\Component\Routing\Generator\UrlGenerator
{
    static private $declaredRouteNames = array(
       '_cgdemo_enteruser' => true,
       '_cgdemo_indexpage' => true,
    );

    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function generate($name, array $parameters = array(), $absolute = false)
    {
        if (!isset(self::$declaredRouteNames[$name])) {
            throw new RouteNotFoundException(sprintf('Route "%s" does not exist.', $name));
        }

        $escapedName = str_replace('.', '__', $name);

        list($variables, $defaults, $requirements, $tokens) = $this->{'get'.$escapedName.'RouteInfo'}();

        return $this->doGenerate($variables, $defaults, $requirements, $tokens, $parameters, $name, $absolute);
    }

    private function get_cgdemo_enteruserRouteInfo()
    {
        return array(array (), array (  '_controller' => 'CardGameDemo\\GameBundle\\Controller\\DefaultController::enterAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/app/enter',  ),));
    }

    private function get_cgdemo_indexpageRouteInfo()
    {
        return array(array (), array (  '_controller' => 'CardGameDemo\\GameBundle\\Controller\\DefaultController::indexAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/app/',  ),));
    }
}
