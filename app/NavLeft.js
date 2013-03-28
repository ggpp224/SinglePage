/**
 * @author gp
 * @datetime 2013-3-28
 * @description 左侧导航区控制
 */
 
 define(function(require,exports,module){
 	var NavLeftView = Ambow.extend(Ambow.View,{
 		
 		tpl:'<ul><li><a idx="1" class="dd" href="javascript:void(0)">模块一</a></li><li><a idx="2" href="javascript:void(0)">模块二</a></li></ul>',
 		
 		events: {
 			'click li a': 'onNavItemClicked' 
 		},
 		
 		render: function(){
 			this.$el.html(this.tpl);
 			$('#content-aside').html(this.$el);
 			return this;
 		},
 		
 		onNavItemClicked: function(e){
 			var idx = e.target.getAttribute('idx');
 			switch(idx){
 				case '1':
 					Ambow.router.load('module1/Page1/')
 					break;
 				case '2':
 					Ambow.router.load('module2/Page2/')
 					break;
 			}
 			this.trigger('nav_module'+idx+'_click');
 		}
 	});
 	
 	return NavLeftView;
 });