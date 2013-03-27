/**
 * @author gp
 * @datetime 2013-3-27
 * @description Util.js
 */
 
 define(function(require,exports,module){
 	return {
 		/**
		 * 格式化导航树数据
		 * @param {} obj
		 * @param {} chain
		 */
		getNavData: function(obj,chain){
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
		 			getNavData(rec,newChain);
		 		}
		 	}
		 }
 	}
 });