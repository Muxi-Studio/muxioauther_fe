/*
 * register.js
 *
 * author by Shengxihu
 */
'use strict'

require("../scss/register.scss")

var Vue = require('vue')
var request = require('superagent')

var  hint_text = {
    email:{hint:"邮箱是您登录的唯一账号，请谨慎填写",right:"邮箱格式正确",wrong:"邮箱格式有误，请重新输入"},
    username:{hint:"请输入3-12个字符的用户名（包括字母/数字/下划线）",right:"用户名格式正确",wrong:"用户名格式有误，请重新输入"},
    password:{hint:"请输入6位以上密码",right:"密码格式正确",wrong:"请输入符合格式的密码"},
    repassword:{hint:"请再次输入密码",right:"再次输入密码正确",wrong:"两次输入不一致或密码格式不正确，请重新输入"}
},
checkEmail = function(){
    var i = 0,
    test=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(this.val[i])
    test?this.emailExist(i):this.checkMsg(test,i)
},
checkUsername = function(){
    var i = 1,
    test=/^[a-zA-Z0-9_]{4,16}$/.test(this.val[i])
    test?this.usernameExist(i):this.checkMsg(test,i)
},
checkPassword = function(){
    var i = 2,
    test=/^[a-zA-Z0-9_]{6,16}$/.test(this.val[i])
    this.checkMsg(test,i)
},
checkRePassword = function(){
    var i = 3,
    test=(this.val[2]==this.val[i] && /^\S{6,16}$/.test(this.val[i]) && this.val[i] != "")
    this.checkMsg(test,i)
},
checkMsg = function(test,i){
    var item = event.target.id
    if(test) {
        this.class_obj.$set(i,{ right: true, wrong: false })  
        this.hint.$set(i,this.hint_text[item].right) 
        this.flag.$set(i,true) 
    } else {
        this.class_obj.$set(i,{ right: false, wrong: true })  
        this.hint.$set(i,this.hint_text[item].wrong) 
        this.flag.$set(i,false) 
    }
},
initHint = function(i){
    var item = event.target.id
    this.hint.$set(i,this.hint_text[item].hint) 
},
usernameExist = function(i) {
    var checkExistMsg=this.checkExistMsg
    request.get('../mock/user.json',function(err,res){
        if (err) {throw err};
        checkExistMsg(res.body.username, '用户名',i)
    })
},
emailExist = function(i) {
    var checkExistMsg=this.checkExistMsg
    request.get('../mock/user.json',function(err,res){
        if (err) {throw err};
        checkExistMsg(res.body.email, '用户名',i)
    })
},
checkExistMsg = function(test,msg,i) {
    if(test) {
        this.hint.$set(i,msg+'已被注册')
        this.class_obj.$set(i,{ right: false, wrong: true })
        this.flag.$set(i,false) 
    } else {
        this.hint.$set(i,msg+'输入正确')
        this.class_obj.$set(i,{ right: true, wrong: false })
        this.flag.$set(i,true) 
    }
},
onSubmit = function(e){
    var bol = true
    e.preventDefault()
    this.flag.forEach(function(value){
        if(value == false){
            bol = false
        }
    })
    if (!bol) {
        alert("您的输入有误，请重新输入后提交！")
    } else {
        request.post('../mock/user.json',
        {
            email: this.val[0],
            username: this.val[1],
            password: this.val[2]
        },
        function(err, res){
            if (err) {throw err};
        })
    }
}

new Vue({
    el: '#register_cont',
    data:{
        val: ['','','',''],
        hint: ['','','',''],
        class_obj: [{},{},{},{}],
        flag: [false,false,false,false],
        hint_text: hint_text
    },
    methods: {
        checkEmail: checkEmail,
        checkUsername: checkUsername,
        checkPassword: checkPassword,
        checkRePassword: checkRePassword,
        checkMsg: checkMsg,
        initHint: initHint,
        usernameExist: usernameExist,
        emailExist: emailExist,
        checkExistMsg: checkExistMsg,
        onSubmit: onSubmit
    }
})