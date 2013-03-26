/**
 * @author gp
 * @datetime 2013-3-26
 * @description Router.js
 */
 
 define(function(requier,exports,module){
 	
 	var Ambow = requier('ambow');
 	
 	var MyRouter = Ambow.extend(Ambow.Router,{
 		
 		initialize: function(opts){
 			this.route(/.+/,'initPage');
 			//this.on('route',this.initPage);
 		},
 		
 		
 		initPage: function(id){
 			var id = Backbone.history.getHash();
 			alert(id);
 		}
 		
 	});
 	
 	Ambow.router = new MyRouter();
 	
 	Backbone.history.start();
 	
 });