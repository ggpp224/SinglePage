/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){

 	var Page1 = Ambow.extend(Ambow.View,{
 		
 		render: function(){
 			var tpl = require('app/tpls/htm/organize.html');
 			this.$el.html(tpl);
 			App.el.html(this.el);
 		}
 		
 	});
 	
 	return Page1;
 	
 });