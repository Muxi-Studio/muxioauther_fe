/*
 * login.js
 *
 * author by Shengxihu
 */
'use strict';

//import css
require("../scss/login.scss")

var Vue = require('vue'),
request = require('superagent')

var onSubmit = function(e){
	request.post('../mock/user.json',
	{
	    username: this.username,
	    password: this.password
	},
	function(err, res){
	    if (err) {throw err};
	})
}
new Vue({
    el: '#login_content',
    data:{
        username: '',
        password: ''
    },
    methods: {
        onSubmit: onSubmit
    }
})



