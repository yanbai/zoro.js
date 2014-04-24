Array.prototype.each = function(fn){for(var i=0,l=this.length;i<l;i++)fn.call(this[i],i)};
var $Evt=function(){
	var t=this;
	t.tipBox=[];
	t.fnBox=[];
	t.rule={mouseover:/o[\d]-([^\s]*)/g,click:/e[\d]-([^\s]*)/g,mousedown:/d[\d]-([^\s]*)/g,mouseout:/u[\d]-([^\s]*)/g};
	document.onclick = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.click)};
	//document.onmousedown = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.mousedown)};
//	document.onmouseover = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.mouseover)};
//	document.onmouseout = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.mouseout)};
	t.EvtBubble={
		//(class="ea-class-func")[禁止冒泡]
		1:function(e){
            stop_bubble(e);
            return true;
        },
		//(class="eb-class-func")[阻止返回默认值]
		2:function(e){
            prevent_default(e);
            return false;
        },
		//(class="ec-class-func")[禁止冒泡并阻止返回默认值]
		3:function(e){
            stop_bubble(e);
            prevent_default(e);
            return true;
        }
	};
};
$Evt.prototype={
	finder:function(target,event,rule){
		var FuncList=[];
		var c,el=target,isStop=false;
		while(el.tagName.toLowerCase()!='html'){
			//G('comtags').innerHTML+=el.tagName+'<br />';
			if(c=el.className.match(rule)){
				for(var i=0,l=c.length;i<l;i++){
					var a=c[i].replace(/[eod]([\d])-/,'').split('-');
					var sign=RegExp.$1;
					var cls=a[0],fn=a[1];
					var cname=window[cls];
					if(cname==undefined)return;
					var func=cname[fn];
					if(typeof func==='function'){
						FuncList.push(function(_el,cname,func){
							return function(){
								cname._event=event;//当前事件event
								cname._target=target;//触发事件的标签
								cname._self=_el;//设置事件的标签
								func.apply(cname,a.slice(2));
							}
						}(el,cname,func));
					}else alert('undefined:'+cls+'.'+fn);
					if(this.EvtBubble[sign]!=undefined)isStop=this.EvtBubble[sign](event);
				}
				if(isStop)break;else el=el.parentNode;
			}else el=el.parentNode;
		}
		if(!isStop && event.type=='click')this.clear();
		FuncList.each(function(){this()});
	},
	clear:function(){for(var i=0,l=this.tipBox.length;i<l;i++)this.tipBox[i].style.display='none';this.tipBox=[];this.fnBox.each(function(){this()});this.fnBox=[]},
	callback:function(fn){typeof fn==='function'&&this.fnBox.push(fn)},
	push:function(el){el=G(el);if(!el)return;if(!this.tipBox.has(el))this.tipBox.push(el)}
};$Evt=new $Evt;
/*
function $Evt(){
	var t = this;
    this.tipBox = [];
    this.fnBox = [];
    this.rule = {click:/e[\d]-([\S]*)/};
    this.bubble={
        1:function(e){stop_bubble(e)}
    };
    document.onclick= function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.click)};
}
$Evt.prototype={
    finder:function(target,event,rule){
        var FuncList=[];
        while(target.tagName.toLowerCase()!='html'){
            if(a = target.className.match(rule)){
                var classArray = a[1].split('-');
                var sign = RegExp.$1;
                var cla = window[classArray[0]];
                if (cla = undefined)return;
                var fn = cla[classArray[1]];
                if(typeof(fn)==='function'){
                    FuncList.push(
                        function(target,cla,fn){
                            return function(){
                                cla._event = event;
                                cla._target = target;
                                cla._self = target;
                                fn.apply(cla,a.slice(2));
                            }
                        }(target,cla,fn)
                    )
                }else{alert('undefined:'+cla+'.'+fn)};
                if(this.evtBubble[sign]!=undefined)isStop = this.EvtBubble[sign](event);
                if(isStop)break;else target = target.parentNode;
            }else target = target.parentNode;
        }
        if(!isStop && event.type=='click')this.clear();
        FuncList.each(function(){this();})
    },
    clear:function(){
        for(var i=0,l=this.tipBox.length;i<l;i++){
            this.tipBox[i].style.display = 'none';
        }
        this.tipBox = [];
        this.fnBox.each(function(){this();})
        this.fnBox = [];
    },
    callback:function(fn){
        typeof fn === 'function' && this.fnBox.push(fn)
    },
    push:function(ele){
        if(!G(ele))return;
        if(!this.tipBox.has(G(ele)))this.tipBox.push(G(ele));
    }
}
$Evt=new $Evt;
*/