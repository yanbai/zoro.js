function Extend(tgt,src){for(var i in src){tgt[i]=src[i]}return tgt};
Extend(String.prototype,{ltrim:function(){return this.replace(/^\s+/,'')},rtrim:function(){return this.replace(/\s+$/,'')},trim:function(){return this.replace(/^\s+|\s+$/g,'')}});
Array.prototype.has = function(e){for(var i in this){if(this[i]===e)return true;}return false};
Array.prototype.each = function(fn){for(var i=0,l=this.length;i<l;i++)fn.call(this[i],i)};
Array.prototype.merge=function(arr){
	for(var i=0,l=arr.length;i<l;i++)this[this.length]=arr[i];
	return this
};
String.prototype.isPhoneNum=function(){if(this == '')return false;var reg =/^(((0[1-2]\d)|(0[3-9]\d{2}))-\d{7,8})?$/; return this.match(reg) ? true : false}
String.prototype.isAllChinese=function(){if(this == '')return false;var reg =/^([^\u0000-\u00FF]+)$/; return this.match(reg) ? true : false}
String.prototype.isAllNumber=function(){if(this == '')return false;var reg =/^(\d+)$/; return this.match(reg) ? true : false}
String.prototype.isWebSite=function(){if(this == '')return false;var reg =/^(www.)(\w)+.[a-zA-Z]{2,3}$/; return this.match(reg) ? true : false}
String.prototype.isEmail=function(){if(this == '')return false;var reg =/^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; return this.match(reg) ? true : false}
String.prototype.isMobil=function(){if(this == '')return false;var reg =/^(13[0-9]|15[0|1|3|6|7|8|9]|18[0|6|7|8|9])\d{8}$/; return this.match(reg) ? true : false}
String.prototype.isPic=function(){if(this == '')return false;var reg =/(.BMP|.JPG|.JPEG|.PNG|.GIF|.bmp|.jpg|.jpeg|.png|.gif)$/; return this.match(reg) ? true : false}
String.prototype.isMoney=function(){if(this == '')return false;var reg =/^(\d+)(万)?$/; return this.match(reg) ? true : false}
function G(a){return typeof a==='string'?document.getElementById(a):a};
												/*通用*/
var C={
    isIE : document.all?true:false,
    isIE6: this.isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1]==6),
	getElementTop : function(ele){
		var actualTop = ele.offsetTop;
		var current = ele.offsetParent;
		while(current !== null){
			actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
		}
		return actualTop;
	},
	getElements : function(parentsElement , selectTagName , className){
		if(!className){
			return parentsElement.getElementsByTagName(selectTagName)
		}
		else{
			var a = parentsElement.getElementsByTagName(selectTagName);
			var b = [];
			for(var i = 0, l=a.length ; i<l ; i++){
				if(a[i].className == className){b.push(a[i])}
			}
			return b.length ? b : null;
		}
	},
	elementsToArray : function(elements,array){
		if(elements.length>0){for(var i=elements.length-1;i>=0;i--){array.push(elements[i])}};
		return array;
	},
	getClassName : function(className,ele,tagName){
		var arr=[];
		var eles=null;
		if(ele) {
			ele = this.getId(ele);
			if(tagName)
				eles=ele.getElementsByTagName(tagName)
			else
				eles=ele.getElementsByTagName('*')
		}else
			eles=document.getElementsByTagName('*');
			
		for(var i=0;i<eles.length;i++){
			if(eles[i].className.search(new RegExp("\\b" + className + "\\b"))!=-1){
				arr.push(eles.item(i))
			}
		}
		return arr;
	},
	hasClass : function(element, className){
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    	return element.className.match(reg);
	},
	addClass : function(elem,value,e){
		if(e){this.stop(e)}
		 if(!elem.className){
	        elem.className=value;
	    }else{
	        var oValue=elem.className;
	        oValue+=" ";
	        oValue+=value;
	        elem.className=oValue;
    	}
	},
	removeClass : function(element, className,e){
		if(e){this.stop(e)}
		if (this.hasClass(element, className)) {
	        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        element.className = element.className.replace(reg, '');
	    }
	}
};
												/*事件*/
var E={
	addHandler:function(element, type, handler){
		if(element.addEventListener){element.addEventListener(type,handler,false)}
		else if(element.attachEvent){element.attachEvent('on'+type,handler)}
		else{element['on'+type]=handler}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){element.removeEventListener(type,handler,false)}
		else if(element.detachEvent){element.detachEvent('on'+type,handler)}
		else{element['on'+type]=null}
	},
	getEvent:function(event){return event ? event : window.event;},
	getTarget:function(event){event.target || event.srcElement},
	preventDefault:function(event){if(event.preventDefault){event.preventDefault()}else{event.returnValue=false}},
	stopPropagation:function(event){if(event.stopPropagation){event.stopPropagation();}else{event.cancelBubble=true}}
};
												/*表单*/
var F={										
	getInputs : function(field){return field.getElementsByTagName('input');},
	getSelects : function(field){return field.getElementsByTagName('select');},
	inputValueToArray : function(arrayName,inputs){
		for(var i=0,l=inputs.length;i<l;i++){
			inputs[i].value ? arrayName[i]=inputs[i].value : arrayName[i]=0;
		}
	},
	selectValueToArray:function(arrayName,selects){
		for(var i=0,l=selects.length;i<l;i++){
			selects[i].value ? arrayName[i]=selects[i].value : arrayName[i]=0;
		}
	},
	focusEffects:function(textId,textColor,focusBorderColor,defaultValue){
		if(G(textId)){
			var inputBox=G(textId),
			defaultTextColor=inputBox.style.color,
			defaultBorderColor=inputBox.style.borderColor,
			defaultValue = defaultValue || inputBox.defaultValue; 
			var focusEffect = function(){
				with(inputBox.style){color=textColor;borderColor=focusBorderColor;borderStyle='solid';borderWidth='1px';};
				if(inputBox.value==defaultValue){inputBox.value='';};
			};
			var blurEffect = function(){
				with(inputBox.style){color=defaultTextColor;borderColor=defaultBorderColor;borderStyle='solid';borderWidth='1px';};
				if(inputBox.value==''){inputBox.value=defaultValue;};
			}
			E.addHandler(inputBox,'focus',focusEffect)
			E.addHandler(inputBox,'blur',blurEffect)
		}
	}
};


//@Tween 缓动函数
// t: current time（当前时间）；
// b: beginning value（初始值）；
// c: change in value（变化量）；
// d: duration（持续时间）
//@return 当前时间的值（位移）	
var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        }
    }
};			

//@A 动作动画函数									
var A = {
	//tab切换
	tabClick : function(obj,num,no,callback){
		if(!no){no=2;};var endi=1+no;
		for(i=1;i<endi;i++){
			(function(x){
				if(x==num){
					if($('#'+obj+'_'+x).hasClass('on')){
						$('#'+obj+'_'+x).removeClass('on');
						G(obj+'_content_'+x).style.display='none';
					}
					else{
						$('#'+obj+'_'+x).addClass('on');G(obj+'_'+x).blur();G(obj+'_content_'+x).style.display='block';
					}
				}else{
					$('#'+obj+'_'+x).removeClass('on');G(obj+'_content_'+x).style.display = 'none';
				}
			})(i)
		}},
	positionAnimate : function(ele , obj , time){
		var defaultProperty = {};
		var b=[],c=[];
		for(var i in obj){
			if(ele.style[i]){}else {ele.style[i] = '0px'}
			defaultProperty[i] = ele.style[i]   //defaultProperty为原始样式对象
		}
		if(!time){
			var t = 0;
			var d = 10;
			for(var i in obj){
				var j = 0;
				b[j] = parseInt(defaultProperty[i],10);
				c[j] = parseInt(obj[i],10) - b;
				j++
			}
			function Run(){
				
				for(var i in obj){
					
					var j = 0;
					ele.style[i] = Math.ceil(Tween.Linear(t,b[j],c[j],d)) + "px";
					
				}
				if(t<d){ t++; setTimeout(Run, 10); }
			}
			Run();
		}else{
			t = 0;
			d = Math.ceil(time/10);
			for(var i in obj){
				var j = 0;
				b[j] = parseInt(defaultProperty[i],10);
				c[j] = parseInt(obj[i],10) - b;
				j++
			}
			function Run(){
				for(var i in obj){
					var j = 0;
					ele.style[i] = Math.ceil(Tween.Linear(t,b[j],c[j],d)) + "px";
				}
				if(t<d){ t++; setTimeout(Run, 10); }
			}
			Run();
		}
	},
	//@fadein 渐进函数
	// t: current time（当前时间）
	// b: beginning value（初始值）
	// c: change in value（变化量）
	// d: duration（持续时间）
	//@return
	fadein : function(ele){
		var t = 0,
			d = 5,
			b = 0,
			c = 1;
		ele.style.display='inline-block';
		if(C.isIE){
			var run = function(){
				ele.style.filter = "Alpha(opacity="+String(100*Tween.Linear(t,b,c,d))+")";
				if(t<d){ t++; setTimeout(arguments.callee, 10); }
			}
			run();
		}
		else{
			var run = function(){
				ele.style.opacity = Tween.Linear(t,b,c,d);
				if(t<d){ t++; setTimeout(arguments.callee, 10); }
			}
			run();
		}
	},
	fadeout : function(ele){
		var t = 0,
			d = 5,
			b = 1,
			c = -1;
		if(!C.isIE){
			var run = function(){
				ele.style.opacity = Tween.Linear(t,b,c,d);
				if(t<d){ t++; setTimeout(arguments.callee, 10); }
				if(ele.style.opacity==0){ele.style.display = 'none'}
			}
		}
		else{
			var run = function(){
				ele.style.filter = "Alpha(opacity="+String(100*Tween.Linear(t,b,c,d))+")";
				if(t<d){ t++; setTimeout(arguments.callee, 10); }
				if(ele.style.filter=="Alpha(opacity=0)"){ele.style.display = 'none'}
			}
		}
		run();
	}
};


//弹出层
var popUp=function(options){
	//初始化
	this._initialize(options);
};

popUp.prototype={
	_initialize:function(options){
		var opt = this._setOptions(options);
		this._bgColor = opt.background;
		this._opacity = opt.opacity;
		this._timer = opt.timer;
		var iframe = document.createElement('iframe');
		iframe.className = 'overlay';
		iframe.frameBorder = 0;
		iframe.scrolling='no';
		var div = document.createElement('div');
		div.className = 'overlay2';
		var tanchu = document.createElement('div');
		tanchu.className = 'tanchu';
		document.documentElement.appendChild(iframe);
		document.documentElement.appendChild(div).innerHTML="123"; //DOM操作
        document.documentElement.appendChild(tanchu).innerHTML='<div class="tit"><span></span></div><div class="txt"></div>';
		iframe.style.cssText = "height:100%; position:fixed; _position:absolute; top:0; left:0; z-index:98; background:#000;  display:none;overflow:hidden;_height:expression((document.documentElement.clientHeight>document.documentElement.scrollHeight?document.documentElement.	clientHeight:document.documentElement.scrollHeight)+'px');_width:expression((document.documentElement.clientWidht>document.documentElement.scrollWidth?document.documentElement.clientWidth:document.documentElement.scrollWidth)+'px'); opacity:0.5"
		div.style.cssText =  "width:100%;height:100%;position:fixed;_position:absolute;top:0;left:0;z-index:99;background:#000;overflow:hidden;_height:expression((document.documentElement.clientHeight>document.documentElement.scrollHeight?document.documentElement.clientHeight:document.documentElement.scrollHeight)+'px');_width:expression((document.documentElement.clientWidht>document.documentElement.scrollWidth?document.documentElement.clientWidth:document.documentElement.scrollWidth)+'px');display:none;opacity:0.5"
		tanchu.style.cssText='position:absolute; z-index:3; border:1px solid #f5f3f6; display:none; z-index:100';
		this._iframe = iframe;
		this._div = div;
		this._tanchu = tanchu;
		this._tanchu.firstChild.style.cssText = 'height:36px;background:#06F;padding:0 13px 0 13px;width:532px;font:bold 14px/36px "宋体";color:#fff;background:blue repeat-x;position:relative'
		this._tanchu.lastChild.style.cssText = 'min-height:116px; _height:116px; display:inline-block; background:#fff; width:558px;'
	},
    _setOptions:function(options){
        this.options = {
            close : true,
            opacity:0.5,
            background:'white'
        };
        return Extend(this.options,options || {});
    },
    popUp:function(content,title){
        var o={close:1};
        (arguments[2]!=undefined)&&$.extend(o,arguments[2]);
        this.title=title;
        this.content=content;
		var _close = document.createElement('div');
		_close.innerHTML = 'x';_close.className = 'close';_close.onclick = function(){signUpAlert.close()}
		_close.style.cssText = 'position:absolute; right:10px; top:7px; cursor:pointer; font:bold 18px "黑体";'
		this._tanchu.firstChild.firstChild.innerHTML = title;
		this._tanchu.firstChild.firstChild.appendChild(_close);
        this._tanchu.lastChild.innerHTML = content;
        o.close==1 ? _close.style.display = 'block' : $tanchuan.find('.close').style.display = 'none';
        this.dark();
		/*
if(C.isIE6()){
			var _t = document.documentElement.scrollTop+document.documentElement.clientHeight/2-138;
			with(G('tanchuan').style){position='absolute';top=_t}
		}
*/
    },
    close:function(){
        this.hide();
        /*
if($("#name").length==1){
            window.location.href='/logout/';
        }else{
            window.location.href='/logout/?forword=signup';
        }
*/
    },
    show:function(){
        $('#tanchuan').show();
    },
    hide:function(){
        $('#tanchuan').hide();
        $('.overlay').hide();
		$('.overlay2').hide();
    },
    dark:function(callback){
		A.fadein(this._iframe);
		A.fadein(this._div);
        A.fadein(this._tanchu)
    },
    brighter:function(callback){
        $('.overlay').fadeOut();
    },
    successContent:function(){
        return "<p class='success'>行业分销，资源共享。<br />恭喜您，您已经成功加入金品网。</p>";
    },

    failContent:function(id){
        return "<div class='fail'><div class='alert_box'><div class='top'></div><div class='content'><div id='mod_login_close' class='close' onClick='alert_hidden()'>x</div><p></p></div><div class='bottom'></div></div><p class='txt_p'>系统检测到您的联系人邮箱未填写，<br />该邮箱为方便您找回密码用，请立即填写</p></div><form onsubmit='return updateEmail();' action='/login/updateEmail/' method='post'><label for='email'>邮箱：</label><input type='text' name='email' id='email'/><input id='uid' type='hidden' name='uid' value='"+id+"'/><button type='submit'><span>提交</span></button></form>";
    },

    loadingContent:function(){
        return "<p class='loading'>请稍等</p>"	
    },
    successAlert:function(){
        this.alert(this.successContent(),'提示',{
            close:0
        });//匹配成功
        setTimeout(function(){
            this.hide;
            location.reload();
        },3000);
    },
    failAlert:function(id){
        this.alert(this.failContent(id),'重要提示');//匹配失败
    },
    loading:function(){
        this.alert(this.loadingContent(),'',{
            close:0
        });//请稍等
    },
    login:function(){
        this.alert('<form class="send_form" action="/home/userLogin/" method="post" id="loginform" onsubmit="return check_login()">\
			<div class="left" style="position:relative">\
				<p><label>用户名：</label><input type="text" style="color:#BBBBBB" value="手机号/邮箱" name="username" id="username" /></p>\
				<p style="margin-bottom:0px"><label>密&nbsp;&nbsp;码：</label><input type="password" name="password" id="password" /></p>\
				<span class="error"></span>\
				<label id="signin_auto_label"><input type="checkbox" id="signin_auto" value="1" > 下次自动登录</label>\
				<p><a id="tanchu_btn2" href="javascript:;" onclick="checklogin()"></a><a style="position:relative; top:-10px; left:10px; color:#8e8e8e; text-decoration:underline" href="/forget" target="_blank">忘记密码</a></p>\
			</div>\
			<div class="right">\
				<p>强强联合，资源共享</p>\
				<a href="/register" id="tanchu_btn3" target="_blank"></a>\
				<p id="tanchuan_logo">支持中国旅行社协会会员账号登录</p>\
			</div>\
			</form>','登录金品');
		F.focusEffects('username','#000','#f77b22');
		F.focusEffects('password','#000','#f77b22');
    }
}
//ajax
var xmlHttp;
function S_xmlhttprequest(){
    if(window.ActiveXObject){
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }else if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
}


/*
jQuery.fn.sizeChange=function(width_m,height_m){
	var $pic=this;
	var defaultWidth=parseInt($pic.css('width'),10),defaultHeight=parseInt($pic.css('height'),10);
	var newWidth=defaultWidth*width_m,newHeight=defaultHeight*height_m;
	$pic.animate({width:newWidth,height:newHeight},200);
}
jQuery.fn.setSize=function(newWidth,newHeight){
	var $pic=this;
	$pic.animate({width:newWidth,height:newHeight},200);
}
*/