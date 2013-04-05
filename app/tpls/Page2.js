/**
 * @author gp
 * @datetime 2013-3-27
 * @description Page1.js
 */
 
 define(function(require,exports,module){
 	var tpls = {
 		init_tpl:[
 			'<div><%= name %></div>',
 			'<p><input type="button" class="btn btn_gray" id="btn" value="<%= btnName %>"></p>',
 			'<p><input type="button" class="btn btn_gray" id="paramsBtn" value="获取上个view传递过来的参数"></p>',
 			'<pre>onParamsBtnClicked: function(e){\n 	alert(Ambow.encode(Ambow.router.getParams()));\n}</pre>'
 		].join('')
 	}
 	
 	return tpls;
 });