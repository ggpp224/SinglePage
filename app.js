/**
 * 程序入口文件
 */
 
 define(function(require,exports,app){
 	window.Ambow = require('ambow');
 	require('app/Router');
 	
 	//var Controller = Ambow.Controller;
 	
 	$('#btn').click(function(e){
 		
 		Ambow.router.load('test/test2',{a:11111,b:"dddd"});
 		
 		Ambow.router.getParams();
 		//Ambow.router.getHashPath();
 	});
 	
 	var MyController = Ambow.extend(Ambow.Controller,{
 		tagName:'div',
 		
 		className:'testName',
 		
 		initialize: function(){
 			
 		},
 		
 		render: function(){
 			Ambow.el.html('aaaaaa');
 			return this;
 		}
 	});
 	
 	var c = new MyController();
 	c.render();

 });