/**
 * @author gp
 * @datetime 2013-3-28
 * @description 左侧导航区控制
 */
 
 define(function(require,exports,module){
 	require('resources/css/bootstrap.css');
 	require('sdk/components/jquery.menu-aim.js');
 	var NavLeftView = Ambow.extend(Ambow.View,{
 		
// 		tpl:['<ul>',
// 				'<li><a idx="1" class="dd" href="javascript:void(0)">模块一</a></li>',
// 				'<li><a idx="2" href="javascript:void(0)">模块二</a></li>',
// 				'<li><a idx="3" href="javascript:void(0)">ListView</a></li>',
// 				'<li><a idx="4" href="javascript:void(0)">UnderScore Api</a></li>',
// 				'<li><a idx="5" href="javascript:void(0)">Grass Api</a></li>',
//
// 			'</ul>'].join(''),
 		
 		
 		events: {
 			'click li a.sub-menu-item, a.maintainHover': 'onSubMenuItemClicked' 
 		},
 		
 		render: function(){
 			this.$el.html(_.template(this.tpl,this.data));
 			$('#content-aside').html(this.$el);
 			var $menu = $(".dropdown-menu");
 			$menu.menuAim({
	            activate: activateSubmenu,
	            deactivate: deactivateSubmenu,
	            exitMenu: function() {return true;},
	            exit:deactivateSubmenu

	        });
	        function activateSubmenu(row) {
	            var $row = $(row),
	                submenuId = $row.data("submenuId"),
	                $submenu = $("#" + submenuId),
	                height = $menu.outerHeight(),
	                width = $menu.outerWidth();
	
	            // Show the submenu
	            $submenu.css({
	                display: "block",
	                top: -1,
	                left: width - 3,  // main should overlay submenu
	                width:width
	                //height: height - 4  // padding for main dropdown's arrow
	            });
	
	            // Keep the currently activated row's highlighted look
	            $row.find("a").addClass("maintainHover");
	        }

	        function deactivateSubmenu(row) {
	            var $row = $(row),
	                submenuId = $row.data("submenuId"),
	                $submenu = $("#" + submenuId);
	
	            // Hide the submenu and remove the row's highlighted look
	            $submenu.css("display", "none");
	            $row.find("a").removeClass("maintainHover");
	        }
 			return this;
 		},
 		onSubMenuItemClicked: function(){
 			 $(".popover").css("display", "none");
            $("a.maintainHover").removeClass("maintainHover");
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
 				case '4':
 					Ambow.router.load('api/underScore/')
 					break;
 				case '3':
 					Ambow.router.load('ListApi/')
 					break;
 				case '5':
 					Ambow.router.load('api/grass/')
 					break;
 			}
 			this.trigger('nav_module'+idx+'_click');
 		},
 		
 		tpl: ['<div class="nav-collapse collapse">',
            	'<ul class="nav">',
              		'<li class="active">',
                		'<ul class="dropdown-menu" role="menu">',
                			'<% _.each(menu,function(rec){ %>',	
                			'<li data-submenu-id="<%=rec.id%>">',
                        		'<a href="#"><%=rec.title%></a>',
                        		'<div id="<%=rec.id%>" class="popover">',
                           			'<h3 class="popover-title"><%=rec.title%></h3>',
                            		'<div class="popover-content">',
                            			'<ul>',
                            				'<% _.each(rec.menu,function(r){ %>',
                            				'<li><a class="sub-menu-item" href="#!/<%=r.link%>"> <%=r.title%></a><li>',
                            				'<%})%>',
                            			'</ul>',
                            		'</div>',
                            	'</div>',	
                    		'</li>',
                    		'<% }) %>',
                		'</ul>',
                	'</li>',
                '</ul>',
               '</div>'].join(''),
         data:{
         	menu:[
         		{
         			id:'menu-api',
         			title:'API',
         			link:'api/underScore/',
         			menu:[
         				{
         					title:'underscore',
         					link:'api/underScore/'
         				},
         				{
         					title:'grass',
         					link:'api/grass/'
         				}
         			]
         		},
         		{
         			id:'menu-demo',
         			title:'页面演示',
         			link:'module1/Page1/',
         			menu:[
         				{
         					title:'page1',
         					link:'module1/Page1/'
         				},
         				{
         					title:'page2',
         					link:'module2/Page2/'
         				}
         			]
         		},
         		{
         			id:'menu-cmp',
         			title:'组件示例',
         			link:'ListApi/',
         			menu:[
         				{
         					title:'ListView',
         					link:'ListApi/'
         				}
         			]
         		}
         	]	
         }
         
 	});
 	
 	return NavLeftView;
 });