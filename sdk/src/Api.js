/**
 * @author gp
 * @datetime 2013-4-7
 * @description Api.js
 */
 
 define(function(require,exports,module){
 	require('ambow');
 	var ApiView = Ambow.extend(Ambow.View,{
 		
 		className: 'members',
 		
 		events: {
 			'click a.expandable' : "onExpandClicked",
 			'click input.run' : "onRunCodeBtnClicked"
 		},
 		
 		render: function(){
 			var classData = this.options.classData;
 			if(classData){
 				var htm = '';
 				htm += _.template(this.tpl,classData);
 				this.$el.html(htm);
 			}
 			return this;
 		},
 		
 		onExpandClicked: function(e){
 			var a = $(e.target);
 			var aParent = a.closest('div');
 			aParent.toggleClass(function(index,name,statu){
 				if(aParent.hasClass('open')){
 					aParent.find('div.long').hide();
 					aParent.find('div.short').show();
 				}else{
 					aParent.find('div.long').show();
 					aParent.find('div.short').hide();
 				}
 				return "open";
 			});
 		},
 		
 		onRunCodeBtnClicked: function(e){
 			var dom = $(e.target);
 			var pre = dom.prev('pre');
 			if(pre.length>0){
 				var tx = pre.html();
 				eval(tx);
 			}
 		},
 		
 		tpl:['<div class="subsection">',
				'<div class="cmp-class">',
					'<h3 class="component"><a class="class-source-link" href="javascript:void(0)"><%=name%></a></h3>',
				'</div>',
				'<div class="doc-contents">',
					'<%=desc%>',
				'</div>',
				'<% _.each(members,function(rec){ %>',
				'<div class="member inherited" id="method-addChildEls" style="display: block;">',
					'<a class="side expandable" href="javascript:void(0)"><span>&nbsp;</span></a>',
					'<div class="title">',
						'<a class="name expandable" href="javascript:void(0)"><%= rec.name %></a>',
						'( <span class="pre"><% var recs =rec.params,len=recs.length-1;  _.each(recs,function(r,index){print( !!r.optional?("["+r.name +"]"):r.name + (index==len?"":", ")) }) %></span> )',
					'</div>',
					'<div class="description">',
						'<div class="short"><% print(Ambow.ellipsis(rec.desc,40,true)) %></div>',
						'<div class="long">',
							'<p><%= rec.desc %></p>',
							'<h5 class="pa">Parameters</h5>',
							'<ul>',
								'<% _.each(rec.params,function(r){ %>',
								'<li>',
									'<span class="pre"><%= r.name %></span> : <a href="javascript:void(0)"><%= r.type %></a>',
									'<div class="sub-desc"><p><%= r.desc %></p></div>',
								'</li>',
								'<% }) %>',
							'</ul>',
							'<% if(rec.back){ %>',
							'<h5 class="pa">Returns</h5>',
							'<ul>',
								'<li>',
									'<span class="pre"><a href="javascript:void(0)"><%= rec.back.type %></a></span>',
									'<div class="sub-desc"><p><%= rec.back.desc %></p></div>',
								'</li>',
							'</ul>',
							'<% } %>',
							'<% var codes = rec.code; if(codes) {%>',
							'<div>',
								'<% _.each(codes,function(r){ %>',
								'<div class="code-section">',
									'<pre>',
										'<%= r.code %>',
									'</pre>',
									'<input type="button" value="<%=r.name%>" class="run">',
								'</div>',
								'<% }) %>',
							'</div>',
							'<% } %>',
						'</div>',
					'</div>',
				'</div>',
				'<% }) %>',
			'</div>'].join('')
 	});
 	
 	return ApiView;
 	
 });