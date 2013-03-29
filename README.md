SinglePage
==========

利用backbone.js,underscore,seajs构造单页面框架

jquery,underscore 提供工具函数库 <br />
seajs提供模块化开发，模块的同步和异步加载<br />
backbone 提供了view,model,collection,event,router(history)基本组件功能和类继承的支持<br />
通过上面的函数/类库的基础支持，利用MVC和模块化开发的思想构建适合自己web App项目开发的架构。<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单页面最重要的就是对页面流转(描述不太准确，因为只存在一个html，就不存在跳转。但两者存在相似性，后面会用“view切换”来表述这个概念)。
如果view切换没有整体设计好，将切换代码分散在统一控制文件和各个view控制文件中将对开发后期和上线后维护造成极大的困难。不存在需求不变的项目，
所以你的架构从一开始就要想到应对变化，各个view功能的增删改不会对其它模块和整体造成冲击。这就是backbone的分层和seajs的模块化的意义所在。

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
