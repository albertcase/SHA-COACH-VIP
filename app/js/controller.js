//redpacket
;(function(){
    'use strict';
    var controller = function(){

        //init the canvas
        this.canvas = new fabric.Canvas('c');
        this.canvas.setWidth($('.block-photo .p-inner').width());
        this.canvas.setHeight($('.block-photo .p-inner').height());
        this.curBackground=1;
        this.id='';
        this.openid = '';
    };
    controller.prototype = {
        init:function(){
            //loading all the resourse, such as css,js,image
            var self = this;

            Common.goFirstPage();

            Api.isLogin(function(data){
                console.log(data);
                if(data.status==1){
                    //    logged
                    self.LoadingGreetingPage();
                    self.id = data.msg.id;
                    self.openid = data.msg.openid;
                }else{
                    alert(data.msg);
                }

            });

            //test
            //self.LoadingGreetingPage();
            $('.btn-share').on('click',function(){
                self.shareSuccess();
            });

            /*
             *  Get Key code
             * */
            self.SubmitKeycodeForm();

            /*Submit the register information*/
            self.SubmitInformationForm();

            var labelRadio = $('.form-info .radio-inline');
            //select the radio
            labelRadio.on('click',function(){
                labelRadio.removeClass('actived');
                $(this).addClass('actived');
            });
        },
        randomGreetingBg:function(){
            var self = this;
            var bgName =  Math.round(Math.random() * (4 - 1) + 1);
            $('.photo-frame').attr('class','photo-frame photo photo-'+bgName);
            this.curBackground = bgName;
        },
        LoadingGreetingPage:function(){
            var self = this,
                canvas = self.canvas,
                words = $('#input-tomom').val();
            /*
             *  Input your words and then sent them to server
             *  submit words and image
             *  If submit success, show the share-pop
             */
            Common.goWriteGreetingPage();
            self.randomGreetingBg();
            $('.btn-camera').on('click', function(){
                $('#capture').trigger('click');
            });
            //input file change
            $('#capture').on('change', function(e){
                var canvaswidth = $('.block-photo').width();;
                self.uploadPhoto(e.target,canvaswidth)
            });
            //submit your message
            var enable = true;
            $('.pin-2 .btn-submit').on('click', function(){

                /*
                 *  Input your words and then sent them to server
                 *  submit words and photo number
                 *  If submit success, show the share-pop
                 */
                if(!enable) return;
                enable = false;

                //render new picture
                var renderPic = canvas.toDataURL({
                    format: 'png',
                    quality: 1
                });
                //    submit writeGreeting
                Api.writeGreeting({
                    greeting:words,
                    background:self.curBackground,
                    image:renderPic
                },function(data){
                    console.log(data);
                    enable = true;
                    if(data.status==1){
                        //    success
                        $('.share-pop').removeClass('hide');
                        var sharepath = window.location.origin+'/photo?id='+self.id;

                        wx.ready(function(){
                            wx.onMenuShareTimeline({
                                title: '大声说出对妈妈的爱，赢取全新Saddle手袋！',
                                link: sharepath,
                                imgUrl: window.location.origin+'/app/images/kv.png',
                                success:function(){
                                    self.shareSuccess();
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
                                    self.shareSuccess();
                                },
                                cancel:function(){
                                }
                            });

                        });

                    }else{
                        alert(data.msg);
                    }

                });
            });


            $('.pin-2 .btn-back').on('click', function(){
                Common.goIndexpage();
            });
        },
        uploadPhoto:function(ele,canvaswidth){
            var self = this;

            lrz(ele.files[0],{width:canvaswidth*2},{quality:1})
                .then(function (rst) {
                    // 处理成功会执行
                    //step=1;
                    fabric.Image.fromURL(rst.base64,function(imgobj){
                        imgobj.scale(0.5);
                        imgobj.set({
                            selectable:true,
                            hasControls:false,
                            hasBorders:false
                        });
                        self.canvas.add(imgobj);

                    });
                    $('.btn-camera').addClass('hide');
                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });

        },
        MobileValidate:function(){
            var validate = true,
                inputMobile = $('.form-validate .input-phone');
            if(!inputMobile.val()){
                Common.errorMsg.add(inputMobile.parent(),'手机号码不能为空');
                validate = false;
            }else{
                var reg=/^1\d{10}$/;
                if(!(reg.test(inputMobile.val()))){
                    validate = false;
                    Common.errorMsg.add(inputMobile.parent(),'手机号格式错误，请重新输入');
                }else{
                    Common.errorMsg.remove(inputMobile.parent());
                }
            }
            if(validate){
                return true;
            }else{
                return false;
            }
        },
        FormKeycodeValidate:function(){
            var validate = true,
            inputMobile = $('.form-validate .input-phone'),
            inputKeyCode = $('.form-validate .input-keycode');
            if(!inputMobile.val()){
                Common.errorMsg.add(inputMobile.parent(),'手机号码不能为空');
                validate = false;
            }else{
                var reg=/^1\d{10}$/;
                if(!(reg.test(inputMobile.val()))){
                    validate = false;
                    Common.errorMsg.add(inputMobile.parent(),'手机号格式错误，请重新输入');
                }else{
                    Common.errorMsg.remove(inputMobile.parent());
                }
            }
            //for keycode
            if(!inputKeyCode.val()){
                Common.errorMsg.add(inputKeyCode.parent(),'验证码不能为空');
                validate = false;
            }else{
                Common.errorMsg.remove(inputKeyCode.parent());
            }

            if(validate){
                return true;
            }else{
                return false;
            }
        },
        FormInforValidate:function(){
            var validate = true,
                inputSurname = $('.form-info .input-surname'),
                inputName = $('.form-info .input-name'),
                radioGender =$("input[type='radio'][name='gender']:checked"),
                inputMobile = $('.form-info .input-mobile'),
                inputEmailPrev = $('.form-info .input-email-pre'),
                inputEmailAfter = $('.form-info .input-email-after');

            //姓
            if(!inputSurname.val()){
                Common.errorMsg.add(inputSurname.parent(),'姓不能为空');
                validate = false;
            }else{
                Common.errorMsg.remove(inputSurname.parent());
            }
            //名
            if(!inputName.val()){
                Common.errorMsg.add(inputName.parent(),'名不能为空');
                validate = false;
            }else{
                Common.errorMsg.remove(inputName.parent());
            }

            //邮箱
            if(!inputEmailPrev.val() || !inputEmailAfter.val()){
                Common.errorMsg.add(inputEmailPrev.parent(),'邮箱不能为空');
                validate = false;
            }else{
                Common.errorMsg.remove(inputEmailPrev.parent());
            }

            if(validate){
                return true;
            }else{
                return false;
            }
        },
        SubmitKeycodeForm:function(){
            var self = this;

            /*
            *click get keycode button, validate mobile first and then connect api to sent user message
            */
            var enableClick = true;
            $('.btn-getkeycode').on('click',function(e){
                e.preventDefault();
                if(self.MobileValidate()){
                    //    start to get keycode
                    console.log('validate phone number');
                    $('.btn-getkeycode').addClass('disabled');
                    if(!enableClick) return;
                    enableClick = false;
                    var mobile = $('.input-phone').val();
                    Api.sendVerifycode({
                        mobile:mobile
                    },function(data){
                        enableClick = true;
                        $('.btn-getkeycode').removeClass('disabled');
                        if(data.status==1){
                            console.log('短信发送成功');
                        }else{
                            alert(data.msg);
                        }
                    });

                };
            });

            /*
             * Submit the Form, so we need FormKeycodeValidate first and then api
             */
            //var enableSubmit = true;
            $('.form-validate .form-btn-submit').on('click',function(){
                if(self.FormKeycodeValidate()){
                    //if(!enableSubmit) return;
                    //enableSubmit = false;
                    //    start to get keycode
                    var phonenumber = $('.input-phone').val();
                    var keycode = $('.input-keycode').val();
                    Api.customerBind({
                        mobile:phonenumber,
                        verifycode:keycode
                    },function(data){
                        console.log(data);
                        //enableSubmit = true;
                        if(data.status==1){
                            //update info page
                            $('.input-mobile').val(phonenumber);
                            Common.goInfoPage();
                        }else{
                            alert(data.msg);
                        }
                    });
                };
            });
            //show the privacy pop
            $('.privacy-term').on('click',function(){
                $('.term-pop').removeClass('hide').addClass('animate fade');
            });

        //    close the pop
        //    self.closePop();
        },
        SubmitInformationForm:function(){
            /*
            * Submit the register information form
            * */
            var self = this;
            var enableSubmit = true;
            $('.form-info .form-btn-submit').on('click',function(){
                if(self.FormInforValidate()){
                    if(!enableSubmit) return;
                    enableSubmit = false;
                    Api.customerRegister({
                        firstname:$('.input-surname').val(),
                        lastname:$('.input-name').val(),
                        mobile :$('.input-mobile').val(),
                        email:$('.input-email-pre').val()+'@'+$('.input-email-after').val(),
                        gender:$('input[name="gender"]:checked').val(),
                        openid:self.openid,
                    },
                    function(data){
                        enableSubmit = true;
                        if(data.status==1){
                            //update info page
                            //go coupon page
                            Common.goCouponPage();
                            $('.coupon').on('click',function(){
                                self.addCouppon(1);
                            });
                        }else{
                            alert(data.msg);
                        }
                    });
                }
            });

        },
        shareSuccess:function(){
            var self = this;
            Api.openidverify(function(data){
                $('.share-pop').addClass('hide');
                if(data.status==1){
                //    已经绑定过
                    Common.goCouponPage();
                }else if(data.status==0){
                //    未登录
                    Common.goIndexpage();
                }else{
                    //    未绑定
                    Common.goMobilePage();
                }
            });
        },
        addCouppon:function(i){
            Api.coupon({

            },function(data){
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

            });

        }
    };

    if (typeof define === 'function' && define.amd){
        // we have an AMD loader.
        define(function(){
            return controller;
        });
    }
    else {
        this.controller = controller;
    }


}).call(this);

$(document).ready(function($){
    //load for home page
    var redpacket = new controller();
    redpacket.init();
});