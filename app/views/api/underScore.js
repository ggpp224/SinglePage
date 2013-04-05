/**
 * @author gp
 * @datetime 2013-4-3
 * @description underScore.js
 */
 
 define(function(require,exports,module){
 	require('resources/css/api/underScore.css');
 	var tpls = require('app/tpls/api/underScore');
 	var json = require('app/data/underscore.json');

 	var ApiView = Ambow.extend(Ambow.View,{
 		
 		className: 'members',
 		
 		events: {
 			'click a.expandable' : "onExpandClicked",
 			'click input.run' : "onRunCodeBtnClicked"
 		},
 		
 		render: function(){
 			var htm = '',tpl = tpls.member_tpl;
 			for(var k=0,jLen=json.length;k<jLen;k++){
 				var o = json[k];
 				htm += _.template(tpl,o);
 			}
 			this.$el.html(htm);
 			App.el.html(this.$el);
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
 		}
 	});
 	
 	return ApiView;
 
 });