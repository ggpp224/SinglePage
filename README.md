SinglePage
==========

利用backbone.js,underscore,seajs构造单页面框架

<h4>组织目录</h4>
<pre>

  SinglePage 
    |-- index.html				<span class="note">起始页html</span>
    |-- app.js					<span class="note">应用入口文件</span>
    |-- config.js				<span class="note">js文件路径配置</span>  
      
    `-- app					        <span class="note">应用代码</span>
          | -- global.js			<span class="note">全局变量</span>
          | -- Router.js			<span class="note">view切换的路由控制</span>
          | -- crumb.js				<span class="note">面包屑配置</span>
          ` -- views				<span class="note">文件view类，应用的绝大部分控制在此文件夹下</span>          
          ` -- models				<span class="note">存放model</span>         
          ` -- stores				<span class="note">存放collection</span> 
          ` -- tpls				<span class="note">存放模板文件</span>            
          ` -- util				<span class="note">工具类</span>                              
    `-- sdk					    <span class="note">函数/类库</span>
          | -- jquery.js,sea.js ...		
          ` -- src				        <span class="note">框架源代码</span>
                 | -- Ambow.js			<span class="note">框架源代码</span>
    `-- resources				<span class="note">资源文件夹</span>
          ` -- css				<span class="note">存放css</span>
          ` -- images		    <span class="note">存入图片</span>
         		          

         
</pre>
