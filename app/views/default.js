/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){

 	var Page1 = Ambow.extend(Ambow.View,{

 		render: function(){
 			this.$el.html('页面演示');
 			App.el.html(this.el);
 			return this;
 		}
 	});
 	
 	return Page1;
 	
 });