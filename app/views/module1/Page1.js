/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){
 	var ddd = require('jquery');
 	var tpls = require('app/tpls/Page1.js');
 	var Page1 = Ambow.extend(Ambow.View,{
 		tagName:'div',
 		
 		className:'testName',
 		
 		initialize: function(){
 			
 		},
 		
 		events : {
 			'click #btn':'onJumpBtnClicked'
 		},
 		
 		render: function(){
 			this.$el.html(_.template(tpls.init_tpl,{name:"page1",btnName:"跳转到page2"}));
 			App.el.html(this.el);
 			return this;
 		},
 		
 		onJumpBtnClicked:function(e){
 			Ambow.router.load('module2/Page2',{name:'guopeng',sex:1});
 		}
 	});
 	
 	return Page1;
 	
 });