/**
 * @author gp
 * @datetime 2013-4-2
 * @description Slide.js
 */
 
 define(function(require,exports,module){
 	var tpl = require('app/tpls/htm/Slide.html');
 	module.exports = Ambow.extend(Ambow.View,{
 		
 		events: {
 			'click #slideBtn1': "onSlideBtn1Clicked",
 			'click #slideBtn2': "onSlideBtn2Clicked"
 		},
 		
 		render: function(){
 			App.el.html(this.$el.html(tpl));
 		},
 		
 		onSlideBtn1Clicked: function(){
 			var el = $('#inlineCon');
			var i =0;
			var s=setInterval(function(){
				i+=20;
				el.css('left',-i+'px');
				if(i>=700){
					clearInterval(s);
				}
			},20);
 		},
 		
 		onSlideBtn2Clicked: function(){
 			var picEl = $('#imgUl');
			var j=0;
			var picTimer=setInterval(function(){
				j+=25;
				picEl.css('left',-j+'px');
				if(j>=500){
					clearInterval(picTimer);
				}
			},20);
 		}
 		
 	});
 	
 });