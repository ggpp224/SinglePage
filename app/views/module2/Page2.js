/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){
 	var tpls = require('app/tpls/Page1.js');
 	var Page = Ambow.extend(Ambow.View,{
 		tagName:'div',
 		
 		className:'testName',
 		
 		initialize: function(){
 			
 		},
 		
 		events : {
 			'click #btn':'onJumpBtnClicked'
 		},
 		
 		render: function(){
 			this.$el.html(_.template(tpls.init_tpl,{name:"page2",btnName:"跳转到page1"}));
 			Ambow.el.html(this.el);
 			return this;
 		},
 		
 		onJumpBtnClicked:function(e){
 			Ambow.router.load('module1/Page1/');
 		}
 	});
 	
 	return Page;
 	
 });