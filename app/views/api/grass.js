/**
 * @author gp
 * @datetime 2013-4-7
 * @description 框架API 实例
 */
 
define(function(require,exports,module){
 	
	require('resources/css/api/api.css');
	
 	var classData = require('app/data/grass.json');
 	
 	var ApiCmp = require('api');
 	
 	var GrassView = Ambow.extend(Ambow.View,{
 		
 		render: function(){
 			var ApiView = new ApiCmp({classData:classData}).render();
 			App.el.empty().append(ApiView.el);
 		}
 	});
 	
 	return GrassView;
 });