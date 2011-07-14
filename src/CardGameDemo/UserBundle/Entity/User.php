<?php

namespace CardGameDemo\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User's presentation 
 * 
 * @author Postupalsky Oleg <throyan@gmail.com>
 * 
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="cardgamedemo_users")
 */
class User
{
    /**
     * User Id
     * 
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer", unique="true")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * Time when user was created
     * 
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    private $created;
    
    /**
     * User Name
     * 
     * @var string
     * @ORM\Column(type="string", length=32, unique="true")
     */
    private $name;
    
    /**
     * User Password
     * 
     * @var string
     * @ORM\Column(type="string", length=256)
     */
    private $password;

    /**
     * User initialization
     * 
     * @param int $id user id
     */
    public function __construct($id)
    {
        $this->id = $id;
    }
                    
    /**
    * @ORM\prePersist
    */
    public function setCreatedAsNow()
    {
        $this->created = new \DateTime();
    }

    /**
     * Set id
     *
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * Get id
     *
     * @return int 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set created
     *
     * @param DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * Get created
     *
     * @return datetime 
     */
    public function getCreated()
    {
        return $this->created;
    }
    
    /*
     * Set Name
     * 
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }
    
    /**
     * Get Name
     * 
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * Set Password
     * 
     * @param string $pass
     */
    public function setPassword($pass)
    {
        $this->password = $pass;
    }
    
    /**
     * Get Password
     * 
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }
}