/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){
 	var tpls = require('app/tpls/Page2.js');
 	var Page = Ambow.extend(Ambow.View,{
 		tagName:'div',
 		
 		className:'testName',
 		
 		initialize: function(){
 			
 		},
 		
 		events : {
 			'click #btn':'onJumpBtnClicked',
 			'click #paramsBtn': 'onParamsBtnClicked'
 		},
 		
 		render: function(){
 			this.$el.html(_.template(tpls.init_tpl,{name:"page2",btnName:"跳转到page1"}));
 			App.el.html(this.el);
 			return this;
 		},
 		
 		onJumpBtnClicked:function(e){
 			Ambow.router.load('module1/Page1/');
 		},
 		
 		onParamsBtnClicked: function(e){
 			alert(Ambow.encode(Ambow.router.getParams()));
 		}
 	});
 	
 	return Page;
 	
 });