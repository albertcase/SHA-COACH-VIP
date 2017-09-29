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
		// $user_agent = $_SERVER['HTTP_USER_AGENT'];
		// if (strpos($user_agent, 'MicroMessenger') === false) {
		//     // 非微信浏览器禁止浏览
		//     echo "HTTP/1.1 401 Unauthorized";
		//     exit;
		// }
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
		$card = array('600'=>'pKCDxjkyPzMD0jAEiqtAKfMHFVtw', '800'=>'pKCDxjtgLstoCPustaWJGgRr96Qo');
		//2017-09-29
        // $card = array('600'=>'pKCDxju7I_sAbTej_yT4giH0a5tQ', '800'=>'pKCDxjoBDqGmeNgr9O2VFp4liQb0');
//		$card = array('600'=>'pKCDxjuCi-4soPXfuxoB9qHWYuZ0', '800'=>'pKCDxji-2gs9O-bREh-sSlJJ1qSU'); //2017-08-31
//        $card = array('600'=>'pKCDxjvs_llyYBIrZdFuKyD1Bg3w', '800'=>'pKCDxjhQza5s5dGKPCIjg3FHjEPE'); 2017-07-31
//        $card = array('600'=>'pKCDxjj-oXPVLU3BFjg0j6kiJZHk', '800'=>'pKCDxjqnW-fvmRez79LzMlKgaRFE'); 2017-06-30
        // $card = array('600'=>'pKCDxjpPGbCkQbYSFbVc9QXtZEp4', '800'=>'pKCDxjjP6WPJPZnUzMMRL6enFaho'); 2017-05-31
		//$card = array('600'=>'pGXbRsjjVihQHceLiRMgpFWDkNtU', '800'=>'pGXbRssyzDNSGX7qa6D689Vi_700');
		//$card = array('600'=>'pKCDxji6wCVuB38LBgBTx3U2yBoQ', '800'=>'pKCDxji6wCVuB38LBgBTx3U2yBoQ');
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
