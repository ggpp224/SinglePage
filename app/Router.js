/**
 * @author gp
 * @datetime 2013-3-26
 * @description Router.js
 */
 
 define(function(requier,exports,module){
 	
 	var Ambow = requier('ambow');
 	
 	var MyRouter = Ambow.extend(Ambow.Router,{
 		routes:{
 			help:"help"
 		},
 		help:function(a,b){
 			alert(a);
 		}
 	});
 	
 	Ambow.router = new MyRouter();
 	
 	Backbone.history.start();
 	
 });