/*All the api collection*/
Api = {
    //api/status
    isFollow:function(callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/status',
            type:'POST',
            dataType:'json',
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    //{"status":1,"msg":{"id":"1","openid":"oKCDxjivJ92ky4dxLT8dt1jcXtn4","nickname":"nickname","headimgurl":"headimgurl","greeting":false,"background":false,"ballot":"1”}}
    isLogin:function(callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/islogin',
            type:'POST',
            dataType:'json',
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    // greeting  background
    writeGreeting:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/greeting',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    //id
    ballot:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/ballot',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    //mobile
    sendVerifycode:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/sendverifycode',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    //mobile verifycode
    customerBind:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/customerbind',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });

        //test code
        //var data = {
        //  status:1
        //};
        //callback(data);


    },
    // firstname lastname mobile email gender openid
    customerRegister:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/customerregister',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    //age  row
    //"status":1,"msg":{"nowpage":1,"rowcount":4,"totalpage":3,"list":[{"id":"1","nickname":"","greeting":"123123","type":"5"},{"id":"1","nickname":"","greeting":"123123","type":"5"},{"id":"1","nickname":"","greeting":"123123","type":"5"},{"id":"1","nickname":"","greeting":"123123","type":"5"}]}}
    galleryList:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/list',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    //id
    getGreeting:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/getgreeting',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    coupon:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/card',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },
    openidverify:function(callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/openidverify',
            type:'POST',
            dataType:'json',
            success:function(data){
                Common.msgBox.remove();
                return callback(data);
            }
        });
    },

};

//test api
(function(){
    //Api.isFollow(function(data){
    //    console.log(data);
    //});

    //Api.writeGreeting({greeting:'happy',background:2},function(data){
    //    console.log(data);
    //});

    //Api.ballot({id:'123'},function(data){
    //    console.log(data);
    //});

    //Api.sendVerifycode({mobile:'18502130583'},function(data){
    //    console.log(data);
    //});

    //Api.customerBind({mobile:'18502130583',verifycode:'76j8'},function(data){
    //    console.log(data);
    //});

    //Api.customerRegister({
    //    firstname:'zhang',
    //    lastname:'ya',
    //    mobile :'18502130583',
    //    email:'1@qq.com',
    //    gender:'女',
    //    openid:'123',
    //},
    //function(data){
    //    console.log(data);
    //});

    //Api.galleryList({
    //    page:'1',
    //    row:'6'
    //},
    //function(data){
    //    console.log(data);
    //});


})();