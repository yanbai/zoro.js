// JavaScript Document
function Extend(tgt,src){for(var i in src){tgt[i]=src[i]}return tgt};
function G(a){return typeof a==='string'?document.getElementById(a):a};
var loads=[];window.onload=function(){loads.each(function(){this()})};//加载完毕执行
Extend(Array.prototype,{
	merge:function(arr){for(var i=0,l=arr.length;i<l;i++)this[this.length]=arr[i];return this},
	each:function(f){for(var i=0,l=this.length;i<l;i++)f.call(this[i],i);return this},//basel(this,i)}});return this},
	motion:function(options,times,callback){$motion.push(this[0],options,times,callback);return this}
});
var _global=function(){
	this.isIE=document.all?true:false;
	this.isIE6=this.isIE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1]==6);
};
_global.prototype={
	extend:Extend,
	css:function(e){return e.currentStyle||document.defaultView.getComputedStyle(e,null)},
	rule:function(a,b){var e=[b||document];var types={'#':this.byId,'.':this.byClass,'>':this.byTagName,':':this.byType,'=':this.byName,'default':true},obj=[];for(var i=0,k=-1,l=a.length;i<l;i++){var s = a.charAt(i);if(typeof types[s]==='function'){k++;obj[k]=''}obj[k]+=s;}for(var i=0,l=obj.length;i<l;i++)e=types[obj[i].charAt(0)](e,obj[i].substr(1));return e},
	byType:function(o,t){var tags=[];o.each(function(){if(this.type==t)tags.push(this);});return tags},
	byId:function(o,t){return [o[0].getElementById(t)]},
	byTagName:function(o,t){var tags=[];o.each(function(i){tags.merge(o[i].getElementsByTagName(t))});return tags;},
	byClass:function(o,t){var _=[];o.each(function(i){var m=this.getElementsByTagName('*');for(var j=0,k=m.length;j<k;j++){if((' '+m[j].className+' ').indexOf(' '+t+' ')!==-1)_.push(m[j])}});return _;},
	byName:function(o,t){var tags=[];o.each(function(i){tags.merge(o[i].getElementsByName(t))});return tags}
};
var $set=new _global();var $=function(a,b){return $set.rule(a,b);};Extend($,$set);

var T={circ:{1:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;}},back:{1:function(t,b,c,d){if(s==undefined)var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;}},bounce:{1:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)) {return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)) {return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}}},linear:{1:function(t,b,c,d){ return c*t/d + b; }}};
var $motion=function(){
	var t=this;
	t.globalTimer=0;
	t.items=[];
	t.delay=15;
	t.animate=['quad','cubic','quart','quint','sine','expo',    'circ','elastic','back','bounce','linear'];
	t.unusual=' backgroundPosition opacity ';
	t.objlib={};
	t.onLoad();
};
$motion.prototype={
	onLoad:function(){
		var t=this;
		t.globalTimer=setInterval(function(){t.interval.call(t)},t.delay);
	},
	interval:function(){
		var arr=this.items;
		for(var j=(arr.length-1);j>=0;j--){
			for(var i in this.items[j][1])this[this.items[j][1][i].fn](j,i);
			if(++this.items[j][2]>this.items[j][3]){
				var fn=this.items[j][4];
				this.items.splice(j,1);
				if(typeof fn==='function')fn();
			}
		}
		
	},
	push:function(obj,options,times,callback){
		obj=G(obj);
		callback=callback||false;
		obj.style.display='block';
		for(var i in options){
			options[i]=Extend({from:false,ease:10,mode:1},options[i]);
			options[i].fn=this.unusual.indexOf(' '+i+' ')===-1?'general':i;
			options[i].motion = T[this.animate[options[i].ease]][options[i].mode];

			if(options[i].from===false){
				options[i].from = i=='backgroundPosition'?this.getBgPosVal(obj):parseInt($.css(obj)[i]);
				if(isNaN(options[i].from)){
					options[i].from = i=='height'?obj.offsetHeight:i=='width'?obj.offsetWidth:0;
				}
			}
			if(i=='backgroundPosition')options[i].to=[options[i].to[0]-options[i].from[0],options[i].to[1]-options[i].from[1]];
			else{options[i].to = options[i].to-options[i].from;}
			//if(i=='opacity')alert($.css(obj)[$.isIE?'filter':'opacity']);
		}
		var opts=[obj,options,0,times,callback];
		for(var i=0,l=this.items.length;i<l;i++){if(this.items[i][0]==obj){this.items[i] = opts;return}}
		this.items.push(opts);
	},
	getBgPosVal:function(obj){
		var css=$.css(obj);
		if($.isIE){
			var o=[parseInt(css.backgroundPositionX),parseInt(css.backgroundPositionY)];
		}else{
			var o=css.backgroundPosition.split(' ');
			var o=[parseInt(o[0]),parseInt(o[1])];
		}
		return o;
	},
	general:function(j,i){
		var e=this.items[j][1][i].motion(this.items[j][2],this.items[j][1][i].from,this.items[j][1][i].to,this.items[j][3]);
		if((i=='width'||i=='height')&&e<0)e=0;
		this.items[j][0].style[i] = e+'px';
	},
	opacity:function(j,i){
		var e=this.items[j][1][i].motion(this.items[j][2],this.items[j][1][i].from,this.items[j][1][i].to,this.items[j][3]);
		var obj=$.isIE?['filter','alpha(opacity='+(e*100)+')']:['opacity',e];
		this.items[j][0].style[obj[0]] = obj[1];
	},
	backgroundPosition:function(j,i){
		var a=this.items[j][1][i].motion(this.items[j][2],this.items[j][1][i].from[0],this.items[j][1][i].to[0],this.items[j][3]);
		var b=this.items[j][1][i].motion(this.items[j][2],this.items[j][1][i].from[1],this.items[j][1][i].to[1],this.items[j][3]);
		this.items[j][0].style.backgroundPosition = a+'px '+b+'px';
	},
	stop:function(){clearInterval(this.globalTimer)}
};$motion=new $motion;