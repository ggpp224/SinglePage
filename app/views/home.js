/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){

 	var Page1 = Ambow.extend(Ambow.View,{
 		
 		render: function(){
 			var me = this;
 			Ambow.get(App.HOST+'app/tpls/htm/organize.html',function(rs){
 				me.$el.html(rs);
 				App.el.html(me.el);
 			});
 			
 			
 			
 			
 			

 		}
 	});
 	
 	return Page1;
 	
 });