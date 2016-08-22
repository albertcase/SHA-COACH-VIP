<?php

$routers = array();
$routers['/'] = array('CoachBundle\Site', 'index');
$routers['/card'] = array('CoachBundle\Site', 'card');
$routers['/callback'] = array('CoachBundle\Api', 'callback');
$routers['/api/card'] = array('CoachBundle\Api', 'card');