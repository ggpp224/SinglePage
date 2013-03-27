/**
 * 定义全局变量
 */
define(function(require,exports,module){
	var util = require('app/util/Util');
	var GLOBAL = {
		HOST:'/'
		
	}
	
	
	var G_NavData ={};
	function _getNavData(obj,chain){
	 	var chain = chain||[];
	 	var noChildrenObj = {children:null};
	 	Ambow.applyIf(noChildrenObj,obj);
	 	chain.push(noChildrenObj);
	 	G_NavData[obj.nav]=chain;
	 	if(obj.children&&obj.children.length>0){
	 		var arr =obj.children,  len=arr.length;
	 		for(var i=0;i<len;i++){
	 			var rec = arr[i];
	 			var newChain = chain.slice(0);
	 			G_NavData[rec.nav]=newChain;
	 			_getNavData(rec,newChain);
	 		}
	 	}
	 }
	 
	 //面包屑配置，nav为文件名，注意不能重复
	 _navData = {
	 		text:'首页',
	 		nav:'home',
	 		children:[
	 			{
	 				text:'页面演示',
	 				nav:'default',
	 				children:[
	 					{"text":"guid","nav":"module1/Page1"},
						{"text":"未封装查询列表页","nav":"module2/Page2"}
	 				]
	 			}
	 		]
	 };
	 _getNavData(_navData,[]);
	 _navData=null;
	 GLOBAL.G_NavData=G_NavData;
	
	return GLOBAL;
	
});