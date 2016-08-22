<?php
namespace CoachBundle;

use Core\Controller;


class SiteController extends Controller {

	public function indexAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			$parameterAry = $_GET;
			if(count($parameterAry)>0)
				$url = "/?".http_build_query($parameterAry);
			else
				$url = "/";
			$_SESSION['redirect_url'] = $url;
			$WechatAPI = new \Lib\WechatAPI();
			$WechatAPI->wechatAuthorize();
		}
		$databaseapi = new \Lib\DatabaseAPI();
		$type = $databaseapi->checkuser($user->openid);
		$this->render('site/index', array('type'=>$type));
		exit;
	}

	public function cardAction() {
		//600 pKCDxjrwNnpwUXTcyqzi2R3NZRCQ
		//800 pKCDxjm3GDEKbK19j_SH7VqFAaag
		$card = 'pKCDxjovWJyOM64_yoYnlWnBh6RY';
		//$card = array('600'=>'pGXbRsjjVihQHceLiRMgpFWDkNtU', '800'=>'pGXbRssyzDNSGX7qa6D689Vi_700');
		//$card = array('600'=>'pKCDxji6wCVuB38LBgBTx3U2yBoQ', '800'=>'pKCDxji6wCVuB38LBgBTx3U2yBoQ');
	
		$wechatapi = new \Lib\WechatAPI();
		$list = $wechatapi->cardList($card);
		$this->render('site/card', array('list'=>$list));
		exit;
	}
}
