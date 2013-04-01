/**
 * @author gp
 * @datetime 2012-7-6
 * @description List.js
 */

 /**
  * List view类
  */
 
 define(function(require,exports,module){
 	var Ambow = require('ambow');
 	 var ListView = Ambow.extend(Ambow.View,{	
	 	initialize: function(cfg){
	 		var cfg = cfg||{};
	 		Ambow.apply(this,cfg);
	
	 		//@property requered
	 		this.store = this.store||new Backbone.Collection();
	
	 		this.store.view = this;
	
	 		//@property requered
	 		this.columns = this.columns||[];
	 		if(this.checkboxs){
	 			this.columns.unshift({
		            header: '<input name="checkboxall" type="checkbox">',
		            width: .3,
		            dataIndex: 'aa',
		            render:function(dt,row){
		            	return '<input type="checkbox" index="'+row.index+'" class="chkc" name="check" />';
		            }
		        });
	 		}
	
	 		var me = this;
	 		//this.renderEl(me.renderTo);
	
	 		this.store.on('loaded',function(data){
	 			me._tempData = data;
	 			me.renderList(me.renderTo);
	 			if(me.pager){
		 				me.pager.render(me);
		 			}
	 		});
	
	 		this.store.on('datachanged',function(data){
	 			me._tempData = data;
	 			me.refresh();
	 			if(me.pager){
		 				me.pager.refresh();
		 			}
	 		});
	
	
	 	},
	
	 	items:[],
	
	 	cacheRecords:[],
	
	 	className:'tablebox',
	 	tbodyClass:'',
	
	 	tagName: 'table',
	 	tplHd: '<thead class="table_header"><tr><% _.each(list,function(item){ %> <th <% w=item.width; if(w){ if(w>1){%> width="<%= item.width %>" <%} else{ %> width="<%= item.width*100 %>" <% } } %> ><%= item.header %></th> <% }); %></tr></thead>',
	 	tplFoot:'<tfoot><tr><td class="tfoot" colspan="<%= colLen %>" ></td></tr></tfoot>',
	 	tplBd :'<tbody class="<%= cls %>"></tbody>',
	 	tpl: '<% _.each(rows,function(r){ %> ' +
	 			'<tr>' +
	 				'<% _.each(cols,function(c){%> <td> <%= r[c.dataIndex] %> </td> <%}) %>'+
	 			'</tr>' +
	 		 ' <%}) %>',
	
	 	mapModel:function(m){
	 		var cls = this.columns;
	 			_.each(cls,function(c){
	 				if(c.render){
	 					//_o[c.dataIndex] = c.render(r[c.dataIndex]);
	 					m.set(c.dataIndex,c.render(m.get(c.dataIndex),m.toJSON()));
	
	 				}
	
	 			});
	 			m.set('cols',cls);
	 			return m;
	
	 	},
	
	 	/**
	 	 * 通过行号获取对应model
	 	 * @param {} index
	 	 * @return {}
	 	 */
	 	//@public
	 	getModel:function(index){
	 		return this.store.at(index);
	 	},
	
	 	renderList: function(con){
	 		var me = this;
	 		this.cacheRecords=[];
	 		_.each(this.store.models ,function(m,idx){
	
	 			var m = m.clone();
	
	 			m.set("index",idx);
	 			m.set("idxs",idx+1);
	 			m = me.mapModel(m);
	 			me.cacheRecords.push(m);
	 			var it = new ListItem({model:m});
	 			me.items.push(it);
	 			me.addItem(it);
	 		});
			me.trigger('afterrender',me);
	
	 	},
	
	 	render: function(con){
	 		var con = con||this.renderTo||'';
			if(_.isString(con)){
	 			con = Dom(con);
	 		}
	
	 		var me = this;
	 		var head = _.template(this.tplHd,{list:this.columns});
	 		$(this.el).html(head);
	 		$(this.el).append(_.template(this.tplFoot,{colLen:this.columns.length}));
	 		$(this.el).append(_.template(this.tplBd,{cls:this.tbodyClass}));
	 		this.head=$(this.el).children('thead')[0];
	 		this.body = $(this.el).children('tbody')[0];
	 		this.foot = $(this.el).children('tfoot').find('td')[0];
	 		$(con).append(this.el);
	 		this.checkAll();
	 	},
	
	 	addItem:function(item){
	 		var me = this;
	 		item.renderTo(this.body);
	 		//行渲染后事件
	 		me.trigger('itemrender',item);
	 		item.on('cellclick',function(c,rowIdx,clumIdx,e){
	 			me.trigger('cellclick',c,rowIdx,clumIdx,e);
	 			var cbxEl = e.getTarget('input.chkc');
	 			if(cbxEl){
	 				me.trigger('checkclick',cbxEl[0],rowIdx,e);
	 			}
	 		});
	 		item.on('click',function(c,rowIdx,e){
	 			me.trigger('rowclick',c,rowIdx,e);
	 		});
	 	},
	
	 	/**
	 	 * @private
	 	 */
	 	refresh: function(){
	 		var me = this;
	 		$(this.body).html('');
	 		this.cacheRecords=[];
	 		_.each(this.store.models ,function(m,idx){
	 			var m = m.clone();
	 			m.set("index",idx);
	 			m.set("idxs",idx+1);
	 			m = me.mapModel(m);
	 			me.cacheRecords.push(m);
	 			var it = new ListItem({model:m});
	 			me.items.push(it);
	 			me.addItem(it);
	 		});
	
	 		if(me.checkboxs){
	 			var head = $(this.head);
	 			var cbxHead = head.find('input[name=checkboxall]');
	 			if(cbxHead.length>0){
	 				cbxHead[0].checked=false;
	 			}
	 		}
	
	 		me.trigger('afterrender',me);
	 	},
	
	 	//@private 全选checkbox
	 	checkAll:function(){
	 		if(this.checkboxs){
	 			var me = this;
	 			var head = $(this.head);
	 			var cbxHead = head.find('input[name=checkboxall]');
	 			cbxHead.change(function(e){
	 				var cbxBody = $(me.body).find('input[name=check]');
	 				if(this.checked){
	 					cbxBody.each(function(){
	 						this.checked = true;
	 					});
	 				}else{
	 					cbxBody.each(function(){
	 						this.checked = false;
	 					});
	 				}
	 				me.trigger('checkallclick',cbxHead[0],e);
	 			});
	 		}
	
	
	 	},
	
	 	//@public 获取勾选中的model集合
	 	getCheckedRecords:function(){
	 		var list = [];
	 		if(this.checkboxs){
	 			var cbxBody = $(this.body).find('input[name=check]');
	 			var me = this;
	 			cbxBody.each(function(){
	 						if(this.checked){
	 							var idx = this.getAttribute("index");
	 							list.push(me.store.at(parseInt(idx)));
	 						}
	
	 					});
	 		}
	
	 		return list;
	 	}
	
	 });
	
	
	 /**
	  * 数据操作类
	  */
	 var ListStore = Ambow.extend(Ambow.Store,{
	 	initialize: function(cfg){
	 		var cfg = cfg||{};
	 		Ambow.apply(this,cfg);
	 		this.URL=this.oriUrl = this.url;
	 		if(this.params){
	 			this.url = Ambow.urlAppend(this.oriUrl,Ambow.urlEncode(this.params));
	 		}
	
	 	},
	
	 	packURL: function(){
	 		if(this.packUrl){
	 			var p_url = this.packUrl.join('/');
	 			if(/\?/.test(this.url)){
	 				var arr = this.url.split('?');
	 				var pager =this.view.pager;
	 				if(pager){
	 					arr[0] += '/'+[p_url,pager.currPage,pager.pageSize].join('/');
	 				}else{
	 					arr[0] += '/'+p_url;
	 				}
	
	 				this.url =  arr.join('?');
	 			}else{
	 				this.url +=  '/'+p_url;
	 			}
	 		}
	 	},
	
	 	packUrl:[],
	
	 	load:function(){
	 		var me = this;
	 		me.oriUrl = Ambow.urlAppend(me.oriUrl,Ambow.urlEncode({_dc:new Date().valueOf()}));
	 		if(this.view.pager){
	 			var params = this.params||{};
	 			this.url = Ambow.urlAppend(me.oriUrl,Ambow.urlEncode(Ambow.apply(params,{pageno:1,pagesize:me.view.pager.pageSize})));
	 		}
	 		
	 		
	 		//this.packURL();
	 		//获取列表
	 		this.fetch({
	
	 			//@property requered
	 			//url:'index.php',
	
	
		 		success:function(c,res){
		 			me._data=res;
		 			//成功获取服务端数据触发loaded事件
		 			me.trigger('loaded',me,res);
		 		},
		 		error: function(){
		 			alert('error');
		 		}
	 		});
	 	},
	
	 	refresh: function(opt){
	 		var me = this;
	 		var opt = opt||{};
	 		var params = this.params||{};
	 			Ambow.apply(params,opt.params);
	 			Ambow.apply(params,{_dc:new Date().valueOf()});
	 			this.params= params;
	 		var pager = this.view.pager;
	 		if(pager){
	 			if(opt&&opt.params&&opt.params.pageno){pager.currPage=opt.params.pageno;}
	 			this.url = Ambow.urlAppend(me.URL,Ambow.urlEncode(Ambow.apply(params,{pageno:pager.currPage,pagesize:pager.pageSize})));
	 		}else{
	 			this.url = Ambow.urlAppend(me.URL,Ambow.urlEncode(params));
	 		}
	
	 			this.fetch({
		 			//url:'index.php',
			 		success:function(c,res){
			 			//成功获取服务端数据触发loaded事件
			 			me.trigger('datachanged',me);
			 			//alert('suc');
			 		},
			 		error: function(){
			 			alert('error');
			 		}
		 		});
	 		},
	
	 	parse: function(resp, xhr) {
	 		if(this.view.pager){
	 			 var totalCountStr = this.view.pager.totalCountMap||'totalCount';
			 	 this.totalCount = resp[totalCountStr];
	 		}
	
	
	 	  //@property requered
	 	  if(this.root){
	
	 	  	return resp[this.root];
	 	  }
	      return resp;
	    },
	
	    setUrl :function(url){
	    	this.oriUrl = url;
	    	this.url = url;
	    }
	
	
	 });
	
	
	 /**
	  * ROW 类
	  */
	 var ListItem = Ambow.extend(Ambow.View,{
	
	 	initialize: function(cfg){
	 		var cfg = cfg||{};
	 		Ambow.apply(this,cfg);
	
	
	 	},
	 	tagName: 'tr',
	 	className:'x-tr',
	 	tpl: '<% _.each(cols,function(c,idx){%> <td rel="<%=idx%>"> <%= eval(c.dataIndex) %> </td> <%}) %>',
	 	render:function(){
	 		if(this.model){
	 			var tds = _.template(this.tpl,this.model.toJSON());
	 			//$(this.el).html(removeNull(tds));
	 			$(this.el).html(tds);
	 		}
	 	},
	
	 	events: {
	 		'click td': function(e){
	 			var td = e.target;
	 			this.trigger('cellclick',td,this.model.get('index'),parseInt(td.getAttribute('rel')),e);
	 		}
	 	},
	
	 	renderTo:function(dom){
	 		var me = this;
	 		this.render();
	 		$(dom).append(this.el);
	 		$(this.el).click(function(e){
	 			me.trigger('click',this,me.model.get('index'),e);
	 		});
	 	}
	 });
	
	
	 /**
	  * 分页类
	  */
	 var ListPager = Ambow.extend(Ambow.View,{
	
	 	initialize: function(cfg){
	 		var cfg = cfg||{};
	 		Ambow.apply(this,cfg);
	
	
	 	},
	 	pageSize:10,
	 	//totalCount:100,
	 	currPage:1,
	 	tagName: 'ul',
	 	className:'pagination',
	 	tpl: '<% if(currPage>1){ %> <li><a class="first-page" href="javascript:" target="_self" >&laquo; 首页</a></li><li><a class="pre-page" href="javascript:" target="_self">&laquo; 上一页</a></li>  <% } %>'+
	 		 '<% for(var i=pagebegin;i<=pageend;i++){ if(currPage==i){ %> <li href="#1" target="_self" class="currentpage number"><%= i %></li> <% }else{ %> <li><a href="javascript:" target="_self" class="number"><%= i %></a></li>  <% } } %>'+
	 		 '<% if(currPage<totalPage){%> <li><a class="next-page" href="javascript:" target="_self">下一页 &raquo;</a></li><li><a class="last-page" href="javascript:" target="_self" > 尾页&raquo;</a></li> <%} %>',
	 	render:function(view){
	 		if(view){
	 			this.view = view;
	 			this.store = this.view.store;
	 			//this.pageSize = this.view.pageSize;
	 			this.url = this.store.URL;
	 		}
	
			$(this.el).html(this.getPageView());
			$(this.view.foot).html(this.el);
	
	 	},
	
	
	
	 	packURL: function(url,packUrl,params,num){
	 		var me = this;
	 		var num = num||1;
	 		var p_url = packUrl.join('/');
	 		if(/\?/.test(url)){
	 			var arr = url.split('?');
				arr[0] += '/';
				url =  arr.join('?');
	 		}
	
	 		var params = params||{};
	 		url = Ambow.urlAppend(url,Ambow.urlEncode(Ambow.apply(params,{pageno:num,pagesize:me.pageSize})));
	 		return url;
	 	},
	
	 	refresh: function(){
	 		$(this.el).html(this.getPageView());
	 	},
	
	 	getPageView: function(){
	 		this.totalCount = this.view.store.totalCount;
	 		var currPage = this.currPage;
	 		var totalPage = this.totalPage=Math.ceil(this.totalCount/this.pageSize);
	 		var linknum=5,pagebegin=0,pageend=0;
	 		if(totalPage<=1){
	 			pagebegin=0;pageend=-1
	 		}else if(totalPage>1 && totalPage<=linknum){
	 			pageend=totalPage;pagebegin=1
	 		}else if(totalPage>linknum){
				if(currPage < (Math.ceil(linknum/2)+1)){
					pageend=linknum;pagebegin=1
				}else{
					pageend=(totalPage>=(currPage+Math.floor(linknum/2)))?(currPage+2):totalPage;
						pagebegin=pageend-linknum+1;
				}
			}
	
			var htm = _.template(this.tpl,{totalPage:totalPage,currPage:currPage,linknum:linknum,pagebegin:pagebegin,pageend:pageend});
	 		return htm;
	 	},
	
	 	events: {
	 		"click .number": "onNumberClick",
	 		"click .pre-page": "onPrePageClick",
	 		"click .next-page": "onNextPageClick",
	 		"click .last-page": "onLastPageClick",
	 		"click .first-page": "onFirstPageClick"
	 	},
	
	 	//数字按钮事件
	 	onNumberClick: function(e){
	 		var a = e.target;
	 		var num = parseInt(a.innerHTML);
	 		this._handClick(num);
	 	},
	
	 	//上一页
	 	onPrePageClick: function(e){
	 		this._handClick(this.currPage-1);
	 	},
	
	 	//下一页
	 	onNextPageClick: function(e){
	 		this._handClick(this.currPage+1);
	 	},
	
	 	//尾页
	 	onLastPageClick: function(e){
	 		this._handClick(this.totalPage);
	 	},
	
	 	//首页
	 	onFirstPageClick: function(e){
	 		this._handClick(1);
	 	},
	
	 	_handClick: function(num){
	 		var me = this;
	 		this.currPage=num;
	 		var url = this.url;
	 		var params = this.store.params||{};
			delete params._dc;
	 		this.store.url=this.packURL(this.url,this.store.packUrl,params,num);
	 		this.store.refresh();
	 	},
	
	 	renderTo:function(dom){
	 		this.render();
	 		$(dom).append(this.el);
	 	}
	
	
	 });
	 var List ={
	 	ListView: ListView,
	 	ListStore: ListStore,
	 	ListItem: ListItem,
	 	ListPager: ListPager
	 }
 	return List;
 });
 

