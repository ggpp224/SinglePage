SinglePage
==========

利用backbone.js,underscore,seajs构造单页面框架，针对以前的单页面框架，利用backbone和seajs作了重构。有兴趣的可以查阅easyui项目，
不要被它的名字误导，只是在ui库用了easyui,框架完全可以脱离easyui,比如另一个项目WebMobile，用的同一套框架，而ui库换成了jquery mobile.

jquery,underscore 提供工具函数库 <br />
seajs提供模块化开发，模块的同步和异步加载<br />
backbone 提供了view,model,collection,event,router(history)基本组件功能和类继承的支持<br />
通过上面的函数/类库的基础支持，利用MVC和模块化开发的思想构建适合自己web App项目开发的架构。<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单页面最重要的就是对页面流转(描述不太准确，因为只存在一个html，就不存在跳转。但两者存在相似性，后面会用“view切换”来表述这个概念)。
如果view切换没有整体设计好，将切换代码分散在统一控制文件和各个view控制文件中将对开发后期和上线后维护造成极大的困难。不存在需求不变的项目，
所以你的架构从一开始就要想到应对变化，各个view功能的增删改不会对其它模块和整体造成冲击。这就是backbone的分层和seajs的模块化的意义所在。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所谓架构就是提供代码组织方式，制定项目开发约定，提供通用功能的统一控制，提高可维护性，让前端开发者主要关注各个模块（view）的业务开发，
提高开发效率。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们对backbaone的View,collection,model作了针对项目作了进一层的封装，其实也就是多作了一层继承，对应的类分别是Ambow.View,
Ambow.Store,Ambow.model.继承可以写作Ambow.extend，例如继承view： Ambow.extend(Ambow.View,{ .... }); ,继承collection: Ambow.extend(Ambow.Store,{ ... }),其它的都是类似的写法。为什么要多作一层
继承？ 这是为了对项目的统一控制，你的写法不再是继承Backbone，而是继承Ambow.View/Store/Model ,这样我可以在基类中添加一些我的统一控制，比如：每个view的面包屑，会随每个view的切换而改变，我只在基类中
实现其改变功能，这样你在写每个view的控制时就不需关注这些，框架给你做了，针不项目不同特点，我们可以在model或store基类中添加一些经常用的方法和事件..., 另一个控制view统一切换的就是Router类，我们在项目
起始文件app.js实现了单例实例化：Ambow.router ,这里要约定的就是你要把你每个view的控制文件，即view类(其实这个view的大部分功能是controller，其实我是很愿意把这个类命名为Ambow.Controller,但为了个backbone的统一还是叫view吧)
放在views目录下。 比如views目录下有Page1.js，和Page2.js两个view类，要从Page1切换到Page2你只需要调用Ambow.router.load('Page2/'),框架会自动切换到Page2.没有一成不变的框架，我们需要针对不同的项目特点对框架作
不同的调整，但大体思想是一致的。

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
