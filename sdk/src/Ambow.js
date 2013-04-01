/**
 * @author gp
 * @datetime 2013-3-26
 * @description Ambow.js
 */
 
 define(function(require,exports,module){
 	
 	require('backbone');
 	
 	var Ambow = {
 		
 		version:'1.0',
 		
 		//拷贝对象属性函数
 		apply:  function(o, c) {
			return _.extend(o,c);
		},
		
		viewStack : []
 	};
 	
 	module.exports = Ambow;
 	
 	Ambow.apply(Ambow,{
 		
 		//借助backbone继承实现类继承
 		extend:function(obj,protoProps, staticProps){
 			//查看backbone代码,Model.extend,View.extend等指向同一个继承函数
 			return Backbone.Model.extend.call(obj,protoProps, staticProps);
 		},
 			
 		applyIf : function(o, c) {
			if (o) {
				for (var p in c) {
					if (_.isUndefined(o[p])) {
						o[p] = c[p];
					}
				}
			}
			return o;
		}
 		
 	});
 	
 	/**
 	 * 封装backbone的View，以便在项目中做统一控制
 	 */
 	Ambow.View = Ambow.extend(Backbone.View,{
 		
 		//设置面包屑
 		setCurmbs: function(chain){
 			var crumbStr = '';
	 		if(_.isString(chain)){
	 			crumbStr=chain;
	 		}else{
	 			var arr=[],len=chain.length,lensub=len-1;
		 		for(var i=0;i<len;i++){
		 			var rec=chain[i];
		 			if(i>0&&i<lensub){
		 				arr.push('<a href="#!/'+rec.nav+'/">'+rec.text+'</a>');
		 			}else if(i==0){
		 				arr.push('<a class="bold" href="#!/'+rec.nav+'/">'+rec.text+'</a>');		 				
		 			}else{
		 				arr.push('<strong class="final-path">'+rec.text+'</strong>');		 						 				
		 			}
		 		}
		 		crumbStr=arr.join('<span class="separator"> / </span>');
	 		}
	 		
			$('#breadcrumb').html(crumbStr);
	 	}
	 	
 	});
 	
 	/**
 	 * 封装backbone的Model，以便在项目中做统一控制
 	 */
 	Ambow.Model = Ambow.extend(Backbone.Model,{
 		
 	});
 	
 	
 	/**
 	 * 封装backbone的collection(唉，深受ext思想毒害，觉得store能表达意思的同时还能少写几个字母)，以便在项目中做统一控制
 	 */
 	Ambow.Store = Ambow.extend(Backbone.Model,{
 		
 	});
 	
 	/**
 	 * 封装backbone的Router，以便在项目中做统一控制
 	 */
 	Ambow.Router = Ambow.extend(Backbone.Router,{
 		
 	});
 	
	Ambow.JSON = new (function(){
	    var useHasOwn = !!{}.hasOwnProperty,
	        isNative = function() {
	             return false;
	           
	        }(),
	        pad = function(n) {
	            return n < 10 ? "0" + n : n;
	        },
	        doDecode = function(json){
	            return json ? eval("(" + json + ")") : "";   
	        },
	        doEncode = function(o){
	            if(_.isUndefined(o) || o === null){
	                return "null";
	            }else if(_.isArray(o)){
	                return encodeArray(o);
	            }else if(_.isDate(o)){
	                return Ambow.JSON.encodeDate(o);
	            }else if(_.isString(o)){
	                return encodeString(o);
	            }else if(typeof o == "number"){
	                //don't use isNumber here, since finite checks happen inside isNumber
	                return _.isFinite(o) ? String(o) : "null";
	            }else if(_.isBoolean(o)){
	                return String(o);
	            }else {
	                var a = ["{"], b, i, v;
	                for (i in o) {
	                    // don't encode DOM objects
	                    if(!o.getElementsByTagName){
	                        if(!useHasOwn || o.hasOwnProperty(i)) {
	                            v = o[i];
	                            switch (typeof v) {
	                            case "undefined":
	                            case "function":
	                            case "unknown":
	                                break;
	                            default:
	                                if(b){
	                                    a.push(',');
	                                }
	                                a.push(doEncode(i), ":",
	                                        v === null ? "null" : doEncode(v));
	                                b = true;
	                            }
	                        }
	                    }
	                }
	                a.push("}");
	                return a.join("");
	            }   
	        },
	        m = {
	            "\b": '\\b',
	            "\t": '\\t',
	            "\n": '\\n',
	            "\f": '\\f',
	            "\r": '\\r',
	            '"' : '\\"',
	            "\\": '\\\\'
	        },
	        encodeString = function(s){
	            if (/["\\\x00-\x1f]/.test(s)) {
	                return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
	                    var c = m[b];
	                    if(c){
	                        return c;
	                    }
	                    c = b.charCodeAt();
	                    return "\\u00" +
	                        Math.floor(c / 16).toString(16) +
	                        (c % 16).toString(16);
	                }) + '"';
	            }
	            return '"' + s + '"';
	        },
	        encodeArray = function(o){
	            var a = ["["], b, i, l = o.length, v;
	                for (i = 0; i < l; i += 1) {
	                    v = o[i];
	                    switch (typeof v) {
	                        case "undefined":
	                        case "function":
	                        case "unknown":
	                            break;
	                        default:
	                            if (b) {
	                                a.push(',');
	                            }
	                            a.push(v === null ? "null" : Ambow.JSON.encode(v));
	                            b = true;
	                    }
	                }
	                a.push("]");
	                return a.join("");
	        };
	
	    /**
	     * <p>Encodes a Date. This returns the actual string which is inserted into the JSON string as the literal expression.
	     * <b>The returned value includes enclosing double quotation marks.</b></p>
	     * <p>The default return format is "yyyy-mm-ddThh:mm:ss".</p>
	     * @param {Date} d The Date to encode
	     * @return {String} The string literal to use in a JSON string.
	     */
	    this.encodeDate = function(o){
	        return '"' + o.getFullYear() + "-" +
	                pad(o.getMonth() + 1) + "-" +
	                pad(o.getDate()) + "T" +
	                pad(o.getHours()) + ":" +
	                pad(o.getMinutes()) + ":" +
	                pad(o.getSeconds()) + '"';
	    };
	
	    /**
	     * Encodes an Object, Array or other value
	     * @param {Mixed} o The variable to encode
	     * @return {String} The JSON string
	     */
	    this.encode = function() {
	        var ec;
	        return function(o) {
	            if (!ec) {
	                // setup encoding function on first access
	                ec = isNative ? JSON.stringify : doEncode;
	            }
	            return ec(o);
	        };
	    }();
	
	
	    /**
	     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError unless the safe option is set.
	     * @param {String} json The JSON string
	     * @return {Object} The resulting object
	     */
	    this.decode = function() {
	        var dc;
	        return function(json) {
	            if (!dc) {
	                // setup decoding function on first access
	                dc = isNative ? JSON.parse : doDecode;
	            }
	            return dc(json);
	        };
	    }();
	
	})();
	/**
	* @param {Mixed} o The variable to encode
	* @return {String} The JSON string
	* @member Ambow
	* @method encode
	*/
	Ambow.encode = Ambow.JSON.encode;
	/**
	* @param {String} json The JSON string
	* @param {Boolean} safe (optional) Whether to return null or throw an exception if the JSON is invalid.
	* @return {Object} The resulting object
	* @member Ambow
	* @method decode
	*/
	Ambow.decode = Ambow.JSON.decode;

 	
 	//ajax拦截
	Ambow.Asyn = function(opt){
		if(opt.isGet){
			var params = opt.arg;
			$.get(params[0],params[1],params[2],params[3]);	
			return;
		}else if(opt.isGetJson){
			var params = opt.arg;
			$.getJSON(params[0],params[1],params[2],params[3]);	
			return;
		}
		$.ajax(opt);
	}

	/**
	 * post请求
	 * @param {} opt object 包含
	 * url, String
	 * params ,Object 参数对象
	 * 
	 * 
	 */
	Ambow.post = function(opt){
		Ambow.Asyn({
				type:'post',
				data: Ambow.encode(opt.params),
				dataType:"json",
				url:opt.url,
				contentType:'application/json;charset=UTF-8',
				success:opt.success||function(){},
				error:opt.error||function(){}
		})
	};
	
	/**
	 * ajax请求
	 * @param {} opt
	 */
	Ambow.ajax = function(opt){
		Ambow.Asyn(opt);
	}
	
	/**
	 * get请求
	 */
	Ambow.get = function(){
		var opt ={
			isGet:true,
			arg:arguments
		};
		Ambow.Asyn(opt);
	},
	
	/**
	 * get请求，返回json
	 */
	Ambow.getJSON = function(){
		var opt ={
			isGetJson:true,
			arg:arguments
		};
		Ambow.Asyn(opt);
	}
 	
 });