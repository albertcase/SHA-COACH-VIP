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
</head>
<body>
<script type="text/javascript">
var cardListJSON = <?php echo json_encode($list);?>;
$(document).ready(function() {
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
});
</script>
</body>
</html>