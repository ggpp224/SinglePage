/**
 * 程序入口文件
 */
 //https://github.com/ggpp224/jQuery-menu-aim
 define(function(require,exports,module){
 	
 	
 	window.Ambow = require('ambow');
 	
 	//将全局变量赋给App
 	window.App = require('global');
 	
 	//加载events枚举
 	window.Events = require('app/Events');
 	
 	//渲染左侧面板
 	var LeftNavView = require('app/NavLeft');
 	App.leftNav = new LeftNavView().render();
 	 	
 	//指向业务主要操作的中间内容区域JQuery对象,方便操作
 	App.el = $('#content-view');
 	
 	App.G_NavData = require('crumb');
 	require('app/Router');
 	
 	//加载默认页
 	//Ambow.router.load('module1/Page1/');
 	Ambow.router.load('home/');
 		
 	
 });