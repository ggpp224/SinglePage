/**
 * 
 */
 
 seajs.config({
 
  base: './',
  
  // 加载 shim 插件
  plugins: ['shim'],

  // 配置 shim 信息，这样我们就可以通过 require('jquery') 来获取 jQuery
  alias: {
    'jquery': {
		src: 'sdk/jquery.js',    
      	exports: 'jQuery'
    },
    'underscore':{
    	src:'sdk/underscore.js',
    	exports: 'Underscore',
    	deps:['jquery']
    },
    'backbone':{
    	src: 'sdk/backbone.js',
    	exports:'Backbone',
    	deps:['underscore']
    },
    'ambow':'sdk/src/Ambow.js'
  }
});
