"use strict"
/*
 * Just for photo page
 * */
$(document).ready(function(){
    var qsid = Common.queryString('id'),
        uid;
    Api.isLogin(function(datalogin){
        if(datalogin.status==1){
            uid = datalogin.msg.id;
            if(qsid == uid){
                $('.btn-sprite').eq(0).removeClass('btn-joinplay').addClass('btn-gogallery');
            }else{
                //not submit your image
                $('.btn-sprite').eq(0).addClass('btn-joinplay').removeClass('btn-gogallery');
            }
            //loading the page content
            Api.getGreeting({
                id:qsid
            },function(data){
                console.log(data);
                var listdata = data.msg;
                //enableScroll = true;
                if(data.status==1){

                    $('.photo-frame').attr('class','photo-frame photo photo-'+listdata.background);
                    $('.p-inner img').attr('src',listdata.image);
                    $('.leave-words').html(listdata.greeting);
                    $('.user-name').html(listdata.nickname);

                    if(listdata.isballot){
                        $('.icon-good').removeClass('notlike');
                    }else{
                        $('.icon-good').addClass('notlike');
                    }
                    $('.icon-good').html(listdata.ballot);

                }else{
                    //alert(data.msg);
                }
                //    logged
            });

        }else{
            //alert(data.msg);
        }
    });

    //
    var enabled = true;
    $('.btn-sprite').on('click',function(){
        if($(this).hasClass('btn-gogallery')){
            //’回首爱语‘
            Common.goGallerypage();

        }else if($(this).hasClass('btn-joinplay')){
        //    ’我也要玩‘
            Api.isFollow(function(data){
                if(data.status==1){
                    //    followed
                    Common.goIndexpage();
                }else{
                    //not follow,show qrcode pop
                    $('.qrcode-pop').removeClass('hide');
                }
            });
        }else if($(this).hasClass('btn-like')){
        //    '点赞'
            if(!enabled) return;
            enabled = false;
            Api.ballot({
                id:qsid
            },function(data){
                enabled = true;
                if(data.status==1){
                    var voteNum = parseInt($('.icon-good').html());
                    $('.icon-good').html(++voteNum);
                    $('.icon-good').removeClass('notlike');
                }else{
                    alert(data.msg);
                }
            });
        }
    });



});