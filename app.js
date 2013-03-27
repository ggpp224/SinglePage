/**
 * 程序入口文件
 */
 
 define(function(require,exports,module){
 	window.Ambow = require('ambow');
 	window.App = require('global');
 	require('app/Router');
 	
 	Ambow.router.load('module1/Page1/');
 	

 });