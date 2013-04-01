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
		},
		
		isEmpty : function(v, allowBlank){
            return v === null || v === undefined || (!allowBlank ? v === '' : false);
        },
		
		urlAppend : function(url, s){
            if(!Ambow.isEmpty(s)){
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },

		
		/**
		 * 
		 */
		 urlDecode : function(string, overwrite){
            if(Ambow.isEmpty(string)){
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
                
            for(var i=0,len=pairs.length;i<len;i++){
            	var pair = pairs[i];
            	pair = pair.split('=');
                name = d(pair[0]);
                value = d(pair[1]);
                obj[name] = overwrite || !obj[name] ? value :
                            [].concat(obj[name]).concat(value);
            }
            
            return obj;
        },
        
        urlEncode : function(o, pre){
            var empty,
                buf = [],
                e = encodeURIComponent;

           /* _.each(o, function(key, item){
                empty = Ambow.isEmpty(item);
                _.each(empty ? key : item, function(val){
                    buf.push('&', e(key), '=', (!Ambow.isEmpty(val) && (val != key || !empty)) ? (_.isDate(val) ? Ambow.encode(val).replace(/"/g, '') : e(val)) : '');
                });
            });*/
            
            for(var key in o){
            	var item = o[key];
            	empty = Ambow.isEmpty(item);
            	var val = empty ? key : item;
            	buf.push('&', e(key), '=', (!Ambow.isEmpty(val) && (val != key || !empty)) ? (_.isDate(val) ? Ambow.encode(val).replace(/"/g, '') : e(val)) : '');
            }
   
            if(!pre){
                buf.shift();
                pre = '';
            }
            return pre + buf.join('');
        },
        
        getCookie : function (O){var o="",l=O+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(l);if(i!=-1){i+=l.length;var I=document.cookie.indexOf(";",i);if(I==-1)I=document.cookie.length;o=unescape(document.cookie.substring(i,I))}};return o},
		
        // 植入cookie n->cookieq名,v->cookie值,t->时间(毫秒),p->路径,c->域名
		setCookie : function (n,v,t,p,c){var T="";if(t){T=new Date((new Date).getTime()+t);T="; expires="+T.toGMTString()};document.cookie=n+"="+escape(v)+T+(p?';path='+p:'/')+(c?';domain='+c:'')}
 		
 	});
 	
 	/**
 	 * 封装backbone的View，以便在项目中做统一控制
 	 */
 	Ambow.View = Ambow.extend(Backbone.View,{
 		
 		render: function(){return this;},
 		
 		//设置面包屑
 		setCurmbs: function(chain){
 			var crumbStr = '';
 			if(!chain){
 				$('#breadcrumb').html(crumbStr);
 				return;
 			}
 			
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
 	Ambow.Store = Ambow.extend(Backbone.Collection,{
 		
 	});
 	
 	/**
 	 * 封装backbone的Router，以便在项目中做统一控制
 	 */
 	Ambow.Router = Ambow.extend(Backbone.Router,{
 		
 	});
 	
 	Ambow.apply(Date.prototype,{
 		format:function(format){
				var o = {
					"M+" : this.getMonth()+1, //month
					"d+" : this.getDate(), //day
					"h+" : this.getHours(), //hour
					"m+" : this.getMinutes(), //minute
					"s+" : this.getSeconds(), //second
					"q+" : Math.floor((this.getMonth()+3)/3), //quarter
					"S" : this.getMilliseconds() //millisecond
				} ;
		
				if(/(y+)/.test(format)) {
					format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
				}
		
				for(var k in o) {
					if(new RegExp("("+ k +")").test(format)) {
						format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
					}
				}
				return format;
		}
 	});
 	
 	Ambow.apply(jQuery.Event.prototype,{
 		getTarget : function(selector){
			var target = $(this.target);
			if(target.filter(selector).length>0){
				return target;
			}
			var parent = target.parents(selector);
			if(parent.length>0){
				return parent;
			}
			return null;
		}
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