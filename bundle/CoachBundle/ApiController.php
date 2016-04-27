<?php
namespace CoachBundle;

use Core\Controller;


class ApiController extends Controller {

	public function testAction() {
		
		exit;
	}

	public function isloginAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		return $this->statusPrint(1, $user);
	}


	public function callbackAction() {
		$request = $this->Request();
		$fields = array(
			'openid' => array('notnull', '3')
		);
		$request->validation($fields);
		$openid = $request->query->get('openid');
		$userapi = new \Lib\UserAPI();
		$userapi->userLogin($openid);
		$url = isset($_SESSION['redirect_url']) ? $_SESSION['redirect_url'] : "/";
		$this->redirect($url);
		exit;
	}

	public function getdataAction() {
		$data = $GLOBALS['HTTP_RAW_POST_DATA'];	
		$data = json_decode($data, true);
		$databaseapi = new \Lib\DatabaseAPI();
		$databaseapi->regUser($data['data']['openid'], $data['data']['nickname'], $data['data']['headimgurl']);
	}

	public function cardAction() {
		//600 pKCDxjrwNnpwUXTcyqzi2R3NZRCQ
		//800 pKCDxjm3GDEKbK19j_SH7VqFAaag
		$card = array('600'=>'pKCDxjrwNnpwUXTcyqzi2R3NZRCQ', '800'=>'pKCDxjm3GDEKbK19j_SH7VqFAaag');
		//$card = array('600'=>'pGXbRsjjVihQHceLiRMgpFWDkNtU', '800'=>'pGXbRssyzDNSGX7qa6D689Vi_700');
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		$databaseapi = new \Lib\DatabaseAPI();
		$type = $databaseapi->checkuser($user->openid);
		if (!$type) {
			return $this->statusPrint(2, '非VIP');
		}
		$wechatapi = new \Lib\WechatAPI();
		$list = $wechatapi->cardList($card[$type]);
		return $this->statusPrint(1, $list);
	}


}
