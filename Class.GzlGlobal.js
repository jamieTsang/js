/*���峣�ù������ by jamieTsang*/
/*
����comment��
*/
/*
����webDate����
*/
if(document.all){  
	window.XMLHttpRequest=function(){var get=['Microsoft.XMLHTTP','Msxml2.XMLHTTP'];
		for(var i=0;i<get.length;i++){try{return new ActiveXObject(get[i])}catch(e){}};
	};  
}
webDate=function(fn){  
	var Htime=new XMLHttpRequest();   
	Htime.open('HEAD', '/?t='+(Math.random()));
	Htime.send(null); 
	Htime.onreadystatechange=function(){
		Htime.readyState==4&&(fn(new Date(Htime.getResponseHeader('Date'))))
	}; 
}
time2ArrayFull=function(m){
  var timer=[];
  m-=(D=parseInt(m/86400000))*86400000;  
  m-=(H=parseInt(m/3600000))*3600000;  
  S=parseInt((m-=(M=parseInt(m/60000))*60000)/1000);
  timer[0]=D<10?0:D.toString().charAt(0);//����ʮλ
  timer[1]=D.toString().slice(-1);//������λ
  timer[2]=H<10?0:H.toString().charAt(0);//Сʱʮλ
  timer[3]=H.toString().slice(-1);//Сʱ��λ
  timer[4]=M<10?0:M.toString().charAt(0);//����ʮλ
  timer[5]=M.toString().slice(-1);//���Ӹ�λ
  timer[6]=S<10?0:S.toString().charAt(0);//��ʮλ
  timer[7]=S.toString().slice(-1);//���λ
  return timer;
}
time2StringFull=function (t){  
   with(t)return [getFullYear(),'��'  
    ,('0'+(getMonth()+1)).slice(-2),'��'  
    ,('0'+getDate()).slice(-2),'�� '  
    ,('0'+getHours()).slice(-2),': '  
    ,('0'+getMinutes()).slice(-2),': '  
    ,('0'+getSeconds()).slice(-2)].join('');
} 
int2timeFull=function (m){  
  m-=(D=parseInt(m/86400000))*86400000;  
  m-=(H=parseInt(m/3600000))*3600000;  
  S=parseInt((m-=(M=parseInt(m/60000))*60000)/1000);  
  return D+'��'+H+'Сʱ'+M+'��'+S+'��';
}
int2timeDay=function (m){  
  m-=(D=parseInt(m/86400000))*86400000;
  return(m<=0)? D+'��': D+1+'��';
}
/*
����GzlCookie��
���캯��GzlCookie(name);
���ԣ�name //����cookie����
������setCookie(value,minutes) args:[obj]cookieֵ&[num]���� return:[obj]//����cookie
������getCookie() return:[obj]document.cookie //����cookieֵ�����򷵻�null
������clearCookie() return:[obj]//ɾ��cookie
*/

function GzlCookie(name){
	this.name=name;
};
GzlCookie.prototype = function(){
	_setCookie = function(name,value,minutes){
		var exp=new Date();
		exp.setTime(exp.getTime()+minutes*60*1000);
		document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString()+";path=/;";
	},
	setCookie = function(value,minutes){
		_setCookie(this.name,value,minutes);
		return this;
	},

	getCookie = function(){
		if(document.cookie.length>0){
			var c_start=document.cookie.indexOf(this.name+"=");
			if(c_start!=-1){
				c_start+=this.name.length+1;
				var c_end=document.cookie.indexOf(";",c_start);
			}
			if(c_end==-1){
				c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return null
	},
	
	clearCookie = function(){
		_setCookie(this.name,null,-1);
		return this;
	}
	return{
		setCookie:setCookie,
		getCookie:getCookie,
		clearCookie:clearCookie
	}
}();

//Object������� ʹ�÷���:$('#Ŀ����󻭿�').announce($('#��λ����'),$('#��ת��һҳ'),$('#��ת��һҳ'),��λ���,�Զ�ִ�м��ʱ��);
	jQuery.fn.announce=function (settings) {
		settings = jQuery.extend({
			textCont:$('#textCont'),
			next:$('#next'),
			prev:$('#prev'),
			liWidth:0,
			time:4000
		},settings);
		var $_textContLi=settings.textCont.find('li');
		var ancNum=settings.textCont.find('li').length;
		if(settings.liWidth==0){
			settings.liWidth=$_textContLi.width();
		}
		settings.textCont.css('width',ancNum*settings.liWidth)
		var itv=setInterval(excute_Next,settings.time);
		function excute_Next(){
			settings.textCont.stop(true,false).animate({'left':-settings.liWidth},300,'swing',function(){$(this).find('li:eq(0)').appendTo($(this));$(this).css('left',0);});
		}
		function excute_Prev(){
			var $_lastLi=settings.textCont.find('li:last');
			$_lastLi.css({'position':'absolute','left':-settings.liWidth});
			settings.textCont.stop(true,false).animate({'left':+settings.liWidth},300,'swing',function(){$_lastLi.insertBefore($(this).find('li:eq(0)')).attr('style','');$(this).css('left',0);});
		}
		settings.next.click(function(){
			clearInterval(itv);
			excute_Next();
			itv=setInterval(excute_Next,settings.time);
		});
		settings.prev.click(function(){
			clearInterval(itv);
			excute_Prev();
			itv=setInterval(excute_Next,settings.time);
		});
	}

/*
���峣���ַ�������
*/
//��չString��filter����(�����������˿ո񡢻��з������ں�)
String.prototype.filter = function(){
	return this.replace(/(^\s*)|(\s*$)|<\/?.+?>/g, "").replace(/[\r\n]/g, "").replace(/=/g, "[equal]").replace(/-/g, "[hyphen]");
};
/*
//ֻ���Ի��з�
function ignoreEnter(str) {
	return str.replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "");
};
//ֻ���Կո�
function ignoreSpaces(str) {
	return str.replace(/\s+/g, "");
};
//%��ת��%25,?ת%3F
function setpresent(str) {
	return str = Str.replace(/%/g, "%25").replace(/\?/g, "%3F");
}
//ȥ�����ں�(���ں��ڹ���ajax���ã�)
function remove_equal(str) {
	return str = str.replace(/=/g, "[equal]");
}*/



















