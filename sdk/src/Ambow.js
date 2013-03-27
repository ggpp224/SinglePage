/**
 * @author gp
 * @datetime 2013-3-26
 * @description Ambow.js
 */
 
 define(function(require,exports,module){
 	
 	require('backbone');
 	
 	var Ambow = {
 		
 		version:'1.0',
 		
 		//剽窃 ext拷贝对象属性函数，真心觉得很好用
 		apply:  function(o, c, defaults) {
			if (defaults) {
				Ambow.apply(o, defaults);
			}
			if (o && c && typeof c == 'object') {
				for (var p in c) {
					o[p] = c[p];
				}
			}
			return o;
		},
		
		viewStack : []
 	};
 	
 	module.exports = Ambow;
 	
 	Ambow.apply(Ambow,{
 		
 		//借助backbone继承实现类继承
 		extend:function(obj,protoProps, staticProps){
 			//查看backbone代码,Model.extend,View.extend等指向同一个继承函数
 			return Backbone.Model.extend.call(obj,protoProps, staticProps);
 		},
 		
 		//指向业务主要操作的中间内容区域JQuery对象
 		el: $('#content-center')
 		
 	});
 	
 	/**
 	 * 封装backbone的View，以便在项目中做统一控制
 	 */
 	Ambow.View = Ambow.extend(Backbone.View,{
 		
 	});
 	
 	/**
 	 * 封装backbone的Model，以便在项目中做统一控制
 	 */
 	Ambow.Model = Ambow.extend(Backbone.Model,{
 		
 	});
 	
 	
 	/**
 	 * 封装backbone的collection(唉，深受ext思想毒害，觉得store能表达意思的同时还能少写几个字母)，以便在项目中做统一控制
 	 */
 	Ambow.Store = Ambow.extend(Backbone.Model,{
 		
 	});
 	
 	/**
 	 * 封装backbone的Router，以便在项目中做统一控制
 	 */
 	Ambow.Router = Ambow.extend(Backbone.Router,{
 		
 	});
 	
 	
 	
 });