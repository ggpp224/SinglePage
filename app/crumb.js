/**
 * @author gp
 * @datetime 2013-3-28
 * @description crumb.js
 */
 
 define(function(require,exports,module){
 	//require('global');
 	 //面包屑配置，nav为文件名，注意不能重复
	 _navData = {
	 		text:'首页',
	 		nav:'home',
	 		children:[
	 			{
	 				text:'页面演示',
	 				nav:'default',
	 				children:[
	 					{"text":"Page1页面","nav":"module1/Page1"},
						{"text":"Page2页面","nav":"module2/Page2"},
						{"text":"Slide动画","nav":"animate/Slide"}
	 				]
	 			},
	 			{
	 				text:'ListView API',
	 				nav:'ListApi',
	 				children:[
	 					{"text":"ListView Demo","nav":"ListDemo"}
	 				]
	 			}
	 		]
	 };
	 
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
	 
	 _getNavData(_navData,[]);
	 delete _navData;
	 
	 return G_NavData;
 	
 });