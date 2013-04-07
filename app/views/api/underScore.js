/**
 * @author gp
 * @datetime 2013-4-3
 * @description underScore.js
 */
 
 define(function(require,exports,module){
 	
 	require('resources/css/api/api.css');
 	
 	var json = require('app/data/underscore.json');

 	var ApiView = Ambow.extend(Ambow.View,{

 		render: function(){
 			var ApiCmp = require('api');
 			for(var k=0,jLen=json.length;k<jLen;k++){
 				var o = json[k];
 				var view = new ApiCmp({classData:o}).render();
 				this.$el.append(view.el);
 			}
 			App.el.html(this.el);
 		}
 	});
 	
 	return ApiView;
 
 });