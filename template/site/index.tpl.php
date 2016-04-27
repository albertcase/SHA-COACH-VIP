<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>COACH生日礼券-5月</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" >
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" type="text/css" href="/dist/css/screen.css"/>
    <script type="text/javascript" src="http://coach.samesamechina.com/api/v1/js/912e9ed6-7426-49c0-98f2-903fa4bf0d7a/wechat"></script>
    <script type="text/javascript" src="/dist/js/lib/zepto.min.js"></script>
    <script type="text/javascript" src="/dist/js/rem.js"></script>
</head>
<body>
<div class="wrapper">
    <div class="t1">
        <img src="/dist/images/t1.png" id="titleImg" alt=""/>
    </div>
    <div class="slides">
        <img class="slide current" src="/dist/images/slide-1.png" alt=""/>
        <img class="slide" src="/dist/images/slide-2.png" alt=""/>
        <img class="slide" src="/dist/images/slide-3.png" alt=""/>
        <img class="slide" src="/dist/images/slide-4.png" alt=""/>
    </div>
    <div class="t2">
        <img src="" alt=""/>
    </div>
    <div class="button">
        <img src="/dist/images/button.png" alt=""/>
    </div>
</div>
<script type="text/javascript">
    var type='<?php echo $type;?>';
    $(document).ready(function() {
        var priceImgEle = document.getElementById('changeImg');
        var titleImg = document.getElementById('titleImg');
        if (type=='600') {
            priceImgEle.src=window.location.origin+'/images/t2.png';
            titleImg.src=window.location.origin+'/images/t1.png';
        } else if (type=='800') {
            priceImgEle.src=window.location.origin+'/images/t2-800.png';
            titleImg.src=window.location.origin+'/images/t1-800.png';
        } else {

        }

        var enabled =true;
        $('.button').on('click',function(){
            if(!enabled) return;
            enabled=false;
            $.ajax({
                url:'/api/card',
                type:'POST',
                dataType:'json',
                success:function(data){
                    enabled=true;
                    if(data.status){
                        var cardListJSON = data.msg;
                        wx.addCard({
                            cardList: [{
                                cardId: cardListJSON[i-1].cardId,
                                cardExt: '{"timestamp":"'+cardListJSON[i-1].cardExt.timestamp+'","signature":"'+cardListJSON[i-1].cardExt.signature+'"}'
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
                }
            });
        });
    });
</script>
</body>
</html>