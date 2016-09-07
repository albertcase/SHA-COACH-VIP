<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>COACH</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" >
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <script type="text/javascript" src="http://coach.samesamechina.com/api/v1/js/912e9ed6-7426-49c0-98f2-903fa4bf0d7a/wechat"></script>
    <script type="text/javascript" src="/dist/js/lib/zepto.min.js"></script>
     <style type="text/css">
        *{
            padding: 0;
            margin: 0;
        }
        .content{
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%,-50%);
            text-align: center;
        }
        img{
            width: 100%;
            max-width: 100%;
        }
        .logo{
            width: 40vw;
            margin: 0 auto 10vh;
        }
        .tips{
            width: 60vw;
            margin: 0 auto;
        }

    </style>
</head>
<body>
<!--Start page-->
<div class="content">
    <div class="logo">
        <img src="/app/images/logo.png" alt=""/>
    </div>
    <div class="tips">
        <img src="/images/card-tips.png" alt=""/>
    </div>
</div>
<!--End page-->
<script type="text/javascript">
var cardListJSON = <?php echo json_encode($list);?>;
setTimeout("showcard()",100);
function showcard() {
     wx.addCard({
        cardList: [{
            cardId: cardListJSON[0].cardId,
            cardExt: '{"timestamp":"'+cardListJSON[0].cardExt.timestamp+'","signature":"'+cardListJSON[0].cardExt.signature+'","openid":"'+cardListJSON[0].cardExt.openid+'","code":"'+cardListJSON[0].cardExt.code+'"}'
        }],
        success: function(res) {
            var cardList = res.cardList;
            //alert(JSON.stringfiy(res));
        },
        fail: function(res) {
            //alert(JSON.stringfiy(res));
        },
        complete: function(res) {
            //alert(JSON.stringfiy(res));
        },
        cancel: function(res) {
            //alert(JSON.stringfiy(res));
        },
        trigger: function(res) {
            //alert(JSON.stringfiy(res));
        }
    });
}

//hide weixin share button
wx.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

    wx.hideOptionMenu();
//    wx.hideMenuItems({
//        menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
//    });
    wx.hideAllNonBaseMenuItem();
});




</script>
</body>
</html>