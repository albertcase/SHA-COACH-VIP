$(document).ready(function(){
    var sharepath = 'http://coach-mom.samesamechina.com/';
    wx.ready(function(){
        wx.onMenuShareTimeline({
            title: '大声说出对妈妈的爱，赢取全新Saddle手袋！',
            link: sharepath,
            imgUrl: window.location.origin+'/app/images/kv.png',
            success:function(){

            },
            cancel:function(){
            }
        });
        wx.onMenuShareAppMessage({
            title: '大声说出对妈妈的爱，赢取全新Saddle手袋！',
            desc: '大声说出对妈妈的爱，赢取全新Saddle手袋！',
            link: sharepath,
            imgUrl: window.location.origin+'/app/images/kv.png',
            type: '',
            dataUrl: '',
            success:function(){

            },
            cancel:function(){
            }
        });

    });

});