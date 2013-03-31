/**
 * @author gp
 * @datetime 2013-3-26
 * @description 路由控制，单例，调用实例：Ambow.router
 * 我们定义自己的hash规则，如hash为:#!/page1/name:wang/age:1
 * 以!/开头，表示我们要监控以!/开头的hash
 * !/page1/表示我的hash路径 获取方法:Ambow.router.getHashPath();
 * name:wang/age:1表是我们的hash参数 获取方法：Ambow.router.getParams()
 */
 
 define(function(require,exports,module){
 	
 	var Ambow = require('ambow');
 	
 	var MyRouter = Ambow.extend(Ambow.Router,{
 		
 		initReg: /^!\//,
 		
 		hashPathReg: /!\/[^:]*\//gi,
 		
 		initialize: function(opts){
 			this.route(this.initReg,'initPage');
 			this.on({
 				"loadStart" : this.onLoadStart,
 				"loadComplete" : this.onLoadComplete
 			});
 		},
 		
 		onLoadStart:function(){
 			$('#js-frame-loading-template').show();
 		},
 		
 		onLoadComplete: function(){
 			$('#js-frame-loading-template').hide();
 		},
 		
 		
 		/*routes:{
 			'*actions':'initPage'
 		},*/
 		
 		
 		initPage: function(id){
 			//var loading =  $('#js-frame-loading-template');
 			//loading.show();
 			this.trigger('loadStart');
 			var me = this;
 			var hash = this.getHashObject(),path=hash.hashPath;
 			require.async('app/views/'+path,function(View){
 				var oldView = Ambow.viewStack.pop();
 				if(oldView){
 					//清除对上一个view上绑定的事件的监听和销毁上一个view对象
 					oldView.stopListening();
 					oldView=null;
 				}
 				var view = new View();
 				Ambow.viewStack.push(view);
 				view.render();
 				//path.substr(path.lastIndexOf('/')+1)
 				view.setCurmbs(App.G_NavData[path]);
 				me.trigger('loadComplete');
 			});
 		},
 		
 		load: function(hash,params){
 			var paramsStr='';
 			if(params){
 				for(var key in params){
 					paramsStr += '/'+key+':'+params[key];
 				}
 			}
 			this.navigate('!/'+hash+paramsStr,{trigger:true})
 			
 		},
 		
 		/**
 		 * @param (Boolean) all 是否同时获取hash的path和参数
 		 * @return (object)
 		 * @description 获取hash参数,注意：参数的定义格式为 /a:3/与path的区别是是否包含冒号
 		 */
 		getParams:function(all){
 			var hash = Backbone.history.getHash();
 			var params = hash.match(this.hashPathReg),len=params.length;
 			var path='';
 			if(len>0){
 				path = params[0],pathLen=path.length;
 				var params = hash.substr(pathLen).split('/'),paramLen=params.length;
 				path = path.substring(2,pathLen-1);
 				var o = {};
 				for(var i=0;i<paramLen;i++){
 					var s = params[i];
 					var sa=s.split(':');
 					o[sa[0]]=sa[1];
 				}
 				if(all){
 					o.hashPath=path;
 				}
 				return o;
 			}
 			if(all){
 				return {hashPath:path};
 			}
 			return null;
 		},
 		
 		
 		getHashObject:function(){
 			return this.getParams(true);
 		},
 		
 		getHashPath:function(){
 			var hash = Backbone.history.getHash();
 			
 			var path = hash.match(this.hashPathReg);
 			
 			if(path.length>0){
 				path = path[0],pathLen=path.length;
 				path = path.substring(2,pathLen-1)
 				return path;
 			}
 			
 			return '';

 		}
 		
 	});
 	
 	Ambow.router = new MyRouter();
 	
 	Backbone.history.start();
 	
 });