/*
 * register.js
 *
 * author by Shengxihu
 */
'use strict'

require("../scss/register.scss")

var Vue = require('vue')
var $ = require('jquery')

new Vue({
  el: '#register_cont',
  data:{
    i: 0,
    email: {
      val: '',
      classObj: {},
      hint: ''
    },
    username: {
      val: '',
      classObj: {},
      hint: ''
    },
    password: {
      val: '',
      classObj: {},
      hint: ''
    },
    repassword: {
      val: '',
      classObj: {},
      hint: ''
    },
    hint_text: {
      email:{hint:"邮箱是您登录的唯一账号，请谨慎填写",right:"邮箱格式正确",wrong:"邮箱格式有误，请重新输入"},
      username:{hint:"请输入3-12个字符的用户名（包括字母/数字/下划线）",right:"用户名格式正确",wrong:"用户名格式有误，请重新输入"},
      password:{hint:"请输入6位以上密码",right:"密码格式正确",wrong:"请输入符合格式的密码"},
      repassword:{hint:"请再次输入密码",right:"再次输入密码正确",wrong:"两次输入不一致或密码格式不正确，请重新输入"}
    }
  },
  methods: {
    checkEmail: function(){
      var test=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(this.email.val),
      item='email'
      this.checkMsg(test,item)
      emailExist()
    },
    checkUsername: function(){
      var test=/^[a-zA-Z0-9_]{4,16}$/.test(this.username.val),
      item='username'
      this.checkMsg(test,item)
      usernameExist()
    },
    checkPassword: function(){
      var test=/^[a-zA-Z0-9_]{6,16}$/.test(this.password.val),
      item='password'
      this.checkMsg(test,item)
    },
    checkRePassword: function(){
      var test=(this.password.val==this.repassword.val && /^\S{6,16}$/.test(this.repassword.val) && this.repassword.val != ""),
      item='repassword'
      this.checkMsg(test,item)
    },
    checkMsg: function(test,item){
      if(test) {
        this[item].classObj = {
          right: true,
          wrong: false
        }
        this[item].hint = this.hint_text[item].right;
        this.i+=1
      }else{
        this[item].classObj = {
          right: false,
          wrong: true
        }
        this[item].hint = this.hint_text[item].wrong;
        this.i-=1
      }
    },
  initHint: function(e){
      var item = e.target.id
      this[item].hint = this.hint_text[item].hint
    },
    usernameExist: function() {
      $.post( url,
      {
        username: this.username
      },
      function(data){
        var obj=JSON.parse(data)
        if(obj.username) {
          this.i-=1
          alert("用户名已被注册！")
        } else {
          this.i-=1
        }
      })
    },
    emailExist: function() {
      $.post( url,
      {
        email: this.email
      },
      function(data){
        var obj=JSON.parse(data)
        if(obj.email) {
          this.i+=1
          alert("邮箱已被注册！")
        } else {
          this.i-=1
        }
      })
    },
    onSubmit: function(e){
      e.preventDefault()
      if(i=0) {
        $.post( url,
        {
          email: this.email,
          username: this.username,
          password: this.password
        },
        function(data){

        })
      } else {
        alert("您的输入有误，请更正后重新提交！")
      }
    }
  }
})