/**
 * 程序入口文件
 */
 
 define(function(require,exports,app){
 	window.Ambow = require('ambow');
 	require('app/Router');
 	
 	//var Controller = Ambow.Controller;
 	
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