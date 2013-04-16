/**
 * @author gp
 * @datetime 2013-4-16
 * @description ScrollView.js
 */
 
 define(function(require,exports,module){
 	var tpl = require('app/tpls/htm/ScrollView.html');
 	var ScrollView = Ambow.extend(Ambow.View,{
 		render:function(){
 			this.$el.html(tpl);
 			App.el.html(this.$el);
 		}
 	});
 	return ScrollView;
 });