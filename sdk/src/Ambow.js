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
 		
 		
 		
 		applyIf : function(o, c) {
			if (o) {
				for (var p in c) {
					if (!Ambow.isDefined(o[p])) {
						o[p] = c[p];
					}
				}
			}
			return o;
		},
		
		isDefined : function(v) {
			return typeof v !== 'undefined';
		}
 		
 	});
 	
 	/**
 	 * 封装backbone的View，以便在项目中做统一控制
 	 */
 	Ambow.View = Ambow.extend(Backbone.View,{
 		
 		//设置面包屑
 		setCurmbs: function(chain){
 			var crumbStr = '';
	 		if(_.isString(chain)){
	 			crumbStr=chain;
	 		}else{
	 			var arr=[];
		 		for(var i=0,len=chain.length;i<len;i++){
		 			var rec=chain[i];
		 			arr.push('<a href="#!/'+rec.nav+'/">'+rec.text+'</a>');
		 		}
		 		crumbStr=arr.join('>>');
	 		}
	 		
			$('#breadcrumb').html(crumbStr);
	 	}
	 	
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
 	
 	
 	
 	//ajax拦截
	Ambow.Asyn = function(opt){
		if(opt.isGet){
			var params = opt.arg;
			$.get(params[0],params[1],params[2],params[3]);	
			return;
		}else if(opt.isGetJson){
			var params = opt.arg;
			$.getJSON(params[0],params[1],params[2],params[3]);	
			return;
		}
		$.ajax(opt);
	}

	/**
	 * post请求
	 * @param {} opt object 包含
	 * url, String
	 * params ,Object 参数对象
	 * 
	 * 
	 */
	Ambow.post = function(opt){
		Ambow.Asyn({
				type:'post',
				data: Ambow.encode(opt.params),
				dataType:"json",
				url:opt.url,
				contentType:'application/json;charset=UTF-8',
				success:opt.success||function(){},
				error:opt.error||function(){}
		})
	};
	
	/**
	 * ajax请求
	 * @param {} opt
	 */
	Ambow.ajax = function(opt){
		Ambow.Asyn(opt);
	}
	
	/**
	 * get请求
	 */
	Ambow.get = function(){
		var opt ={
			isGet:true,
			arg:arguments
		};
		Ambow.Asyn(opt);
	},
	
	/**
	 * get请求，返回json
	 */
	Ambow.getJSON = function(){
		var opt ={
			isGetJson:true,
			arg:arguments
		};
		Ambow.Asyn(opt);
	}
 	
 });