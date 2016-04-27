<?php

$routers = array();
$routers['/'] = array('CoachBundle\Site', 'index');
$routers['/callback'] = array('CoachBundle\Api', 'callback');
