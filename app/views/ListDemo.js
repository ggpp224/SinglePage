/**
 * @author gp
 * @datetime 2013-4-1
 * @description ListDemo.js
 */
 
 define(function(require,exports,module){
 	var List = require('list');
 	var ListView = Ambow.extend(Ambow.View,{
 		render: function(){
 			var list = new List.ListView({
				id:'train_list_server',
				pager:new List.ListPager({pageno:1,pagesize:15}),
				//checkboxs:true,
				store: new List.ListStore({
					url:'app/data/list.json',
					root:'rows'
				}),
		
		
				columns: [{
		
			        header: '序号',
			        dataIndex: 'idxs',
			        width:'30',
			        render:function(v){
			        	return v;
			        }
		
			    },{
		
			        header: '作业标题',
			        dataIndex: 'taskTitled',
			        width:'150',
			        render:function(v,row){
			        	return '<a href="#">'+v+'</a>';
		
			        }
		
			    },{
			        header: '开始时间',
			        dataIndex: 'starttime',
			        render:function(v){
			    		var date = new Date(v);
			    		return date.format("yyyy-MM-dd hh:mm:ss");
			        }
			    },{
			        header: '结束时间',
			        dataIndex: 'endtime',
			        render:function(v){
			    		var date = new Date(v);
			    		return date.format("yyyy-MM-dd hh:mm:ss");
			        }	        
			    },{
			        header: '状态',
			        width:40,
			        dataIndex: 'state',
			        render:function(v){
				        return v = v==0 ? '启用' :'停用';
			        }
			       
			    },{
			        header: '已提交',
			         width:60,
			        dataIndex: 'submitNumber'
			    },{
			        header: '待批改',
			         width:60,
			        dataIndex: 'preCorrectNumber'
			    }
			    ]
			});
			list.render(this.el);
			App.el.html(this.el);
			var store = list.store;
				store.load();
 		}
 	});
 	
 	return ListView;
 });