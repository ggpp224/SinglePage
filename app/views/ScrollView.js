/**
 * @author gp
 * @datetime 2013-4-16
 * @description ScrollView.js
 */
 
 define(function(require,exports,module){
 	var tpl = require('app/tpls/htm/ScrollView.html');
 	var ScrollView = Ambow.extend(Ambow.View,{
 		
 		render:function(){
 			var me = this,
	             vscrollDistance,
	             scrollDirection,
	             scrollTop;
	        me.position = 0;
 			this.$el.html(tpl);
 			App.el.html(this.$el);
 			$('.scroll-body').scroll(function(e,d){
 				var el = this;
 				scrollTop = el.scrollTop;
 				console.log('el scrollTop:'+scrollTop);
 				vscrollDistance = scrollTop - me.position;
            	scrollDirection = vscrollDistance > 0 ? 1 : -1;
 				me.scrollTop = scrollTop;
 				if (Math.abs(vscrollDistance) >= 20 || (scrollDirection !== me.lastScrollDirection)) {
	                me.position = scrollTop;
	                me.lastScrollDirection = scrollDirection;
	                me.handleViewScroll(me.lastScrollDirection);
	            }
 				console.log(scrollTop);
 			});
 		},
 		
 		handleViewScroll:function(direction){
 			console.log('进入handle:'+direction);
 		},
 		
 		onScrolled: function(e,d){
 			alert(e);
 		}
 	});
 	return ScrollView;
 });