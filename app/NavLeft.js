/**
 * @author gp
 * @datetime 2013-3-28
 * @description 左侧导航区控制
 */
 
 define(function(require,exports,module){
 	require('resources/css/menu-aim.css');
 	require('sdk/components/jquery.menu-aim.js');
 	var NavLeftView = Ambow.extend(Ambow.View,{

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

 		
 		tpl: ['<div class="nav-collapse collapse">',
            	'<ul class="nav">',
              		'<li class="active">',
                		'<ul class="dropdown-menu" role="menu">',
                			'<% _.each(menu,function(rec){ %>',	
                			'<li data-submenu-id="<%=rec.id%>">',
                        		'<a href="#!/<%=rec.link%>"><%=rec.title%></a>',
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
         				},
         				{
         					title:'ScrollView',
         					link:'ScrollView/'
         				}
         			]
         		}
         	]	
         }
         
 	});
 	
 	return NavLeftView;
 });