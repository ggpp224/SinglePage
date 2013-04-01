/**
 * @author gp
 * @datetime 2013-4-1
 * @description ListApi.js
 */
 
 define(function(require,exports,module){
 	var tpl = require('app/tpls/htm/listApi.html');
 	var apiView = Ambow.extend(Ambow.View,{
 		render:function(){
 			this.$el.html(tpl);
 			App.el.html(this.$el);
 		}
 	})
 	
 	return apiView;
 });