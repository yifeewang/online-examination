function Online_Exam(){
	this.mainBox = document.getElementsByClassName('mainBox')[0];
	this.examArea = document.getElementsByClassName('ExamArea')[0];
	this.index = document.getElementsByClassName('index')[0];
	this.title = document.getElementsByClassName('title')[0];
	this.value = document.getElementsByClassName('value');
	this.value1 = document.getElementsByClassName('value1');
	this.tools = document.getElementsByClassName('tools')[0];
	this.btn1 =  document.getElementsByClassName('btn1');
	this.btn2 =  document.getElementsByClassName('btn2');
	this.timeRemain = document.getElementsByClassName('timeRemain')[0];
	this.analyze = document.getElementsByClassName('analyze')[0];
	this.bbq= document.getElementsByClassName('bbq')[0];
	
	this.count =0;
	this.arr = this.getNum(1,26,10);							//随机获取选择题题号
	this.arr2 = [];										//选中选择题答案的集合 与题号对应
	this.arr2.length =10;
	this.arr_judge = this.getNum(1,21,10);     			//随机获取判断题题号
	this.arr_judge2 = [];								//选中判断题答案的集合 与题号对应
	this.arr_judge2.length =10;
	this.arr_write = this.getNum(1,11,5);     			//随机获取填空题题号
	this.arr_write2 = [];								//选中填空题答案的集合 与题号对应
	this.arr_write2.length =5;
	this.num = 0;										//题号
	this.startTime = 60*60-1;								//倒计时时间
	var _this = this;
	this.initcontent();									//随机输入题目
	
	this.getAnswer();									//每次点击答案的时候保存对应的答案
	
	this.timer1 = setInterval(()=>{						//倒计时功能
		this.reckByTime();
	},1000);
	
	[...this.tools.children].forEach(function(item,i){	//添加上一题下一题和交卷按钮事件
		item.addEventListener('click',function(){
			_this.anotherTitle(this);
		})
	});
	[...this.btn1].forEach(function(item,i){			//题号按钮
		item.addEventListener('click',function(){
			_this.thisTitle(this);
		})
	});
}
Online_Exam.prototype = {
	//上一题与下一题与交卷按钮
	anotherTitle(that){
		if(that == this.tools.children[0]){
			this.num--;
			if(this.num<0){
				alert('前面没有啦');
				this.num=0;
			}
			this.initcontent();
			this.getAnswer();
			//在切换题目时，显示之前已经选好的答案，让其checked为true
			this.getAnswer2();
		}else if(that == this.tools.children[1]){
			this.num++;
			if(this.num>24){
				alert('已经到底啦');
				this.num=24;
			}
			this.initcontent();
			this.getAnswer();
			//在切换题目时，显示之前已经选好的答案，让其checked为true
			this.getAnswer2();
		}else if(that == this.tools.children[2]){
			this.flag=false;
			for(let i=0;i<this.btn1.length;i++){
				if(this.btn1[i].style.background==''){
					this.flag = true;
					break;
				}
			}
			if(this.flag){
				if(confirm('您还有部分答题未完成，确定要提交吗')){
					this.showAnswer();
				}
			}else{
				if(confirm('确定要提交试卷吗？')){
					this.showAnswer();
				}
			}	
		}
	},
	//点击按钮选题
	thisTitle(that){
		this.num = that.innerText - 1;
		this.initcontent();
		this.getAnswer();
		//在切换题目时，显示之前已经选好的答案，让其checked为true
		this.getAnswer2();
	},
	//倒计时功能
	reckByTime(){
		this.minute = Math.floor(this.startTime/60);
		if(this.minute<10){
			this.minute = '0'+this.minute;
		}
		this.second = Math.floor(this.startTime%60);
		if(this.second<10){
			this.second = '0'+this.second;
		}
		if(this.startTime>=0){
			this.timeRemain.innerText = this.minute+'分'+this.second+'秒';
		}else{
			clearInterval(this.timer1);
			alert('you are a loser');//显示一个隐藏的div,显示统计结果;
			this.showAnswer();
			
		}
		this.startTime--;
	},
	//随机从题库取题
	getNum(a,b,c){
		var arr = [];
		while(arr.length<c){
			var num = this.getRand(a,b);
			if(arr.indexOf(num) == -1){
				arr.push(num);
			}
		}
		return arr;
	},
	//初始化页面题目
	initcontent(){
		if(this.num<10){
			this.index.innerText = this.num +1 +'.';
			this.title.innerText = danxuan[this.arr[this.num]].title;
			this.value[0].previousElementSibling.innerText ='A';
			this.value[1].previousElementSibling.innerText ='B';
			this.value[2].previousElementSibling.innerText ='C';
			this.value[3].previousElementSibling.innerText ='D';	
			this.value[0].innerHTML = danxuan[this.arr[this.num]].selectionA;
			this.value[1].innerHTML = danxuan[this.arr[this.num]].selectionB;
			this.value[2].innerHTML = danxuan[this.arr[this.num]].selectionC;
			this.value[3].innerHTML = danxuan[this.arr[this.num]].selectionD;
		}else if(this.num>=10&&this.num<20){
			this.index.innerText = this.num +1 +'.';
			this.title.innerText = panduan[this.arr_judge[this.num-this.arr.length]].title;
			this.value[0].previousElementSibling.innerText ='';
			this.value[1].previousElementSibling.innerText ='';
			this.value[2].previousElementSibling.innerText ='';
			this.value[3].previousElementSibling.innerText ='';			
			this.value[0].innerHTML = panduan[this.arr_judge[this.num-this.arr.length]].right;
			this.value[1].innerHTML = panduan[this.arr_judge[this.num-this.arr.length]].wrong;
			this.value[2].innerHTML = '';
			this.value[3].innerHTML ='';
		}else{
			this.index.innerText = this.num +1 +'.';
			this.title.innerHTML = tiankong[this.arr_write[this.num-this.arr.length-this.arr_judge.length]].title;
			this.value[0].previousElementSibling.innerText ='';
			this.value[1].previousElementSibling.innerText ='';
			this.value[2].previousElementSibling.innerText ='';
			this.value[3].previousElementSibling.innerText ='';			
			this.value[0].innerHTML = '';
			this.value[1].innerHTML = '';
			this.value[2].innerHTML = '';
			this.value[3].innerHTML ='';
		}
		
	},
	//获取随机数
	getRand(a,b){
		return Math.floor(Math.random()*(a-b)+b);
	},
	//每次点击答案的时候保存对应的答案
	getAnswer(){
		var _this = this;
		//点击li
		[...this.btn2].forEach(function(item,i){			
			item.addEventListener('click',function(){
				if(_this.num<20){
					_this.value[i].children[0].checked = true;
					_this.getAnswer1(i);
				}
			})
		});
		//点击input-radio
		if(this.num<10){
			[...this.value].forEach(function(item,i){
				item.children[0].addEventListener('click',function(){
					_this.getAnswer1(i);
				})
			})
		}else if(this.num>=10&&this.num<20){
			for(let i=0;i<2;i++){
				this.value[i].children[0].addEventListener('click',function(){
					_this.getAnswer1(i);
				})
			}
		}else{
			this.title.children[0].addEventListener('blur',function(){
					_this.getAnswer1();
					console.log(_this.arr_write2);
			})
		}
	},
	getAnswer1(i){
		if(this.num<10){
			console.log(this.num);
			this.arr2[this.num]=this.value[i].previousElementSibling.innerText;//.push(this.value[i].previousElementSibling.innerText);
			//显示已做选择题题目
			for(var j=0;j<this.arr2.length;j++){
				if(this.arr2[j]){
					this.btn1[j].style.background = '#00CD50';
				}else{
					this.btn1[j].style.background = '';
				}
			}
		}else if(this.num>=10&&this.num<20){
			this.arr_judge2[this.num-10]=this.value[i].children[1].innerText;
			for(var j=0;j<this.arr_judge2.length;j++){
				if(this.arr_judge2[j]){
					this.btn1[10+j].style.background = '#00CD50';
				}else{
					this.btn1[10+j].style.background = '';
				}
			}
		}else{
			this.arr_write2[this.num-20]=this.title.children[0].value;
			for(var j=0;j<this.arr_write.length;j++){
				if(this.arr_write2[j]){
					this.btn1[20+j].style.background = '#00CD50';
				}else{
					this.btn1[20+j].style.background = '';
				}
			}
		}
			
	},
	//保存按钮
	getAnswer2(){
		if(this.num<10){
			if(this.arr2[this.num] == 'A'){
				this.value[0].children[0].checked = true;
			}else if(this.arr2[this.num] == 'B'){
				this.value[1].children[0].checked = true;
			}else if(this.arr2[this.num] == 'C'){
				this.value[2].children[0].checked = true;
			}else if(this.arr2[this.num] == 'D'){
				this.value[3].children[0].checked = true;
			}
		}else if(this.num>=10&&this.num<20){
			if(this.arr_judge2[this.num-this.arr.length] == 'true'){
				this.value[0].children[0].checked = true;
			}else if(this.arr_judge2[this.num-this.arr.length] == 'false'){
				this.value[1].children[0].checked = true;
			}
		}else{
			if(this.arr_write2[this.num-20]){
				this.title.children[0].value = this.arr_write2[this.num-20];
			}
		}
		
	},
	showAnswer(){
		this.analyze.style.display = 'block';
		this.bbq.style.display ='block';
		$('.analyze').animate({
			width:'900px',
			height:'570px'
		},300)
		//单选
		for(let i=0;i<this.arr2.length;i++){
			if(this.arr2[i] == danxuan[this.arr[i]].answer){
				this.count++;
				$(".analyze-true").append("<span>"+ (i+1+" 、")+"</span>");
			}else{
				$(".analyze-false1").append("<span>"+ (i+1+" 、")+"</span>");
				$(".analyze-false2").append("<span>"+(i+1+" 、")+danxuan[this.arr[i]].title+"&nbsp; &nbsp; 答案："+danxuan[this.arr[i]].answer+"<br></span>");
			}
		}
		//判断
		for(let i=0;i<this.arr_judge2.length;i++){
			if(this.arr_judge2[i] == panduan[this.arr_judge[i]].answer){
				this.count++;
				$(".analyze-true").append("<span>"+ (this.arr2.length+i+1+" 、")+"</span>");
			}else{
				$(".analyze-false1").append("<span>"+ (this.arr2.length+i+1+" 、")+"</span>");
				$(".analyze-false2").append("<span>"+(this.arr2.length+i+1+" 、")+panduan[this.arr_judge[i]].title+"&nbsp; &nbsp; 答案："+panduan[this.arr_judge[i]].answer+"<br></span>");
			}
		}
		for(let i=0;i<this.arr_write2.length;i++){
			if(this.arr_write2[i] == tiankong[this.arr_write[i]].answerA||this.arr_write2[i] == tiankong[this.arr_write[i]].answerB){
				this.count++;
				$(".analyze-true").append("<span>"+ (this.arr_judge2.length+this.arr2.length+i+1+" 、")+"</span>");
			}else{
				$(".analyze-false1").append("<span>"+ (this.arr_judge2.length+this.arr2.length+i+1+" 、")+"</span>");
				$(".analyze-false2").append("<span>"+(this.arr_judge2.length+this.arr2.length+i+1+" 、")+tiankong[this.arr_write[i]].title+"&nbsp; &nbsp; 答案："+tiankong[this.arr_write[i]].answerA+"<br></span>");
			}
		}
		$(".analyze-true").append("<span>答对:"+this.count+"题</span>");
		$(".analyze-false1").append("<span>答错"+(this.arr_write2.length+this.arr2.length+this.arr_judge2.length-this.count)+"</span>");
		
	}
}























//--------------------------------------------------------------------------------------------------------

var danxuan = {
	"1":{
		"title":"下面哪种不是jquery的选择器()",
		"answer":"C",
		"selectionA":"<input type='radio' name='1' value='' />基本选择器",
		"selectionB":"<input type='radio' name='1' value='' />层次选择器",
		"selectionC":"<input type='radio' name='1' value='' />CSS选择器",
		"selectionD":"<input type='radio' name='1' value='' />表当选择器"
	},
	"2":{
		"title":"当DOM加载完成后要执行的函数，下面哪个是正确的()",
		"answer":"C",
		"selectionA":"<input type='radio' name='2' value='' />jQuery(expression, [context])",
		"selectionB":"<input type='radio' name='2' value='' />jQuery(html,[ownerDocument])",
		"selectionC":"<input type='radio' name='2' value='' />jQuery(callback)",
		"selectionD":"<input type='radio' name='2' value='' />jQuery(elements)"
	},
	"3":{
		"title":"下面哪一个是用来追加到指定元素的末尾的()",
		"answer":"C",
		"selectionA":"<input type='radio' name='3' value='' />insertAfter()",
		"selectionB":"<input type='radio' name='3' value='' />append()",
		"selectionC":"<input type='radio' name='3' value='' />appendTo()",
		"selectionD":"<input type='radio' name='3' value='' />after()"
	},
	"4":{
		"title":"下面哪一个不是jquery对象访问的方法()",
		"answer":"D",
		"selectionA":"<input type='radio' name='4' value='' />each()",
		"selectionB":"<input type='radio' name='4' value='' />size()",
		"selectionC":"<input type='radio' name='4' value='' />.length",
		"selectionD":"<input type='radio' name='4' value='' />onclick()"
	},
	"5":{
		"title":"在jquery中想要找到所有元素的同辈元素，下面哪一个是可以实现的()",
		"answer":"C",
		"selectionA":"<input type='radio' name='5' value='' />eq(index)",
		"selectionB":"<input type='radio' name='5' value='' />find(expr)",
		"selectionC":"<input type='radio' name='5' value='' />siblings([expr])",
		"selectionD":"<input type='radio' name='5' value='' />next()"
	},
	"6":{
		"title":"如果需要匹配包含文本的元素，用下面哪种来实现()",
		"answer":"B",
		"selectionA":"<input type='radio' name='6' value='' />text()",
		"selectionB":"<input type='radio' name='6' value='' />contains()",
		"selectionC":"<input type='radio' name='6' value='' />input()",
		"selectionD":"<input type='radio' name='6' value='' />attr(name)"
	},
	"7":{
		"title":"如果想要找到一个表格的指定行数的元素，用下面哪个方法可以快速找到指定元素()",
		"answer":"C",
		"selectionA":"<input type='radio' name='7' value='' />text()",
		"selectionB":"<input type='radio' name='7' value='' />get()",
		"selectionC":"<input type='radio' name='7' value='' />eq()",
		"selectionD":"<input type='radio' name='7' value='' />contents()"
	},
	"8":{
		"title":"下面哪种不属于jquery的筛选()",
		"answer":"B",
		"selectionA":"<input type='radio' name='8' value='' />过滤",
		"selectionB":"<input type='radio' name='8' value='' />自动",
		"selectionC":"<input type='radio' name='8' value='' />查找",
		"selectionD":"<input type='radio' name='8' value='' />串联"
	},
	"9":{
		"title":"如果想被选元素之后插入 HTML 标记或已有的元素，下面哪个是实现该功能的()",
		"answer":"D",
		"selectionA":"<input type='radio' name='9' value='' />append(content)",
		"selectionB":"<input type='radio' name='9' value='' />appendTo(content)",
		"selectionC":"<input type='radio' name='9' value='' />insertAfter(content)",
		"selectionD":"<input type='radio' name='9' value='' />after(content)"
	},
	"10":{
		"title":"在jquey中，如果想要从DOM中删除所有匹配的元素，下面哪一个是正确的()",
		"answer":"C",
		"selectionA":"<input type='radio' name='10' value='' />delete()",
		"selectionB":"<input type='radio' name='10' value='' />empty()",
		"selectionC":"<input type='radio' name='10' value='' />remove()",
		"selectionD":"<input type='radio' name='10' value='' />removeAll()"
	},
	"11":{
		"title":"在jquery中，想要给第一个指定的元素添加样式，下面哪一个是正确的()",
		"answer":"D",
		"selectionA":"<input type='radio' name='11' value='' />first",
		"selectionB":"<input type='radio' name='11' value='' />eq(1)",
		"selectionC":"<input type='radio' name='11' value='' />css(name)",
		"selectionD":"<input type='radio' name='11' value='' />css(name,value)"
	},
	"12":{
		"title":"在jquery中，如果想要获取当前窗口的宽度值，下面哪个是实现该功能的()",
		"answer":"A",
		"selectionA":"<input type='radio' name='12' value='' />width()",
		"selectionB":"<input type='radio' name='12' value='' />width(val)",
		"selectionC":"<input type='radio' name='12' value='' />width",
		"selectionD":"<input type='radio' name='12' value='' />innerWidth()"
	},
	"13":{
		"title":"为每一个指定元素的指定事件(像click) 绑定一个事件处理器函数，下面哪个是用来实现该功能的()",
		"answer":"B",
		"selectionA":"<input type='radio' name='13' value='' />trgger (type)",
		"selectionB":"<input type='radio' name='13' value='' />bind(type)",
		"selectionC":"<input type='radio' name='13' value='' />one(type)",
		"selectionD":"<input type='radio' name='13' value='' />bind"
	},
	"14":{
		"title":"在jquery中想要实现通过远程http get请求载入信息功能的是下面的哪一下事()",
		"answer":"C",
		"selectionA":"<input type='radio' name='14' value='' />$.ajax()",
		"selectionB":"<input type='radio' name='14' value='' />load(url)",
		"selectionC":"<input type='radio' name='14' value='' />$.get(url)",
		"selectionD":"<input type='radio' name='14' value='' />$.getScript(url)"
	},
	"15":{
		"title":"在一个表单中，如果想要给输入框添加一个输入验证，可以用下面的哪个事件实现()",
		"answer":"D",
		"selectionA":"<input type='radio' name='15' value='' />hover(over,out)",
		"selectionB":"<input type='radio' name='15' value='' />keypress(fn)",
		"selectionC":"<input type='radio' name='15' value='' />change()",
		"selectionD":"<input type='radio' name='15' value='' />change(fn)"
	},
	"16":{
		"title":"当一个文本框中的内容被选中时，想要执行指定的方法时，可以使用下面哪个事件来实现()",
		"answer":"C",
		"selectionA":"<input type='radio' name='16' value='' />click(fn)",
		"selectionB":"<input type='radio' name='16' value='' />change(fn)",
		"selectionC":"<input type='radio' name='16' value='' />select(fn)",
		"selectionD":"<input type='radio' name='16' value='' />bind(fn)"
	},
	"17":{
		"title":"以下 jquery 对象方法中，使用了事件委托的是()",
		"answer":"D",
		"selectionA":"<input type='radio' name='17' value='' />bind",
		"selectionB":"<input type='radio' name='17' value='' />mousedown",
		"selectionC":"<input type='radio' name='17' value='' />change",
		"selectionD":"<input type='radio' name='17' value='' />on"
	},
	"18":{
		"title":"下列jQuery事件绑定正确的是()",
		"answer":"A",
		"selectionA":"<input type='radio' name='18' value='' />bind(type,[data],function(eventObject))",
		"selectionB":"<input type='radio' name='18' value='' />$(‘#demo’).click(function() {})",
		"selectionC":"<input type='radio' name='18' value='' />$(‘#demo’).on(‘click’,function() {})",
		"selectionD":"<input type='radio' name='18' value='' />$(‘#demo’).one(‘click’,function() {})"
	},
	"19":{
		"title":"怎么才能隐藏下面的元素？() &lt; input id='id_txt' name='txt' type='text' value=''/&gt;",
		"answer":"C",
		"selectionA":"<input type='radio' name='19' value='' />$(“id_txt”).hide()",
		"selectionB":"<input type='radio' name='19' value='' />$(#id_txt).remove()",
		"selectionC":"<input type='radio' name='19' value='' />$(“#id_txt”).hide()",
		"selectionD":"<input type='radio' name='19' value='' />$(“#id_txt”).remove()"
	},
	"20":{
		"title":"jQuery 的方法get()做什么？()",
		"answer":"A",
		"selectionA":"<input type='radio' name='20' value='' />使用 HTTP GET 请求从服务器加载数据",
		"selectionB":"<input type='radio' name='20' value='' />返回一个对象",
		"selectionC":"<input type='radio' name='20' value='' />返回存在jQuery对象中的DOM元素",
		"selectionD":"<input type='radio' name='20' value='' />触发一个get AJAX请求"
	},
	"21":{
		"title":"JQuery中，属于鼠标事件方法的选项是()",
		"answer":"B",
		"selectionA":"<input type='radio' name='21' value='' />onclick( )",
		"selectionB":"<input type='radio' name='21' value='' />mouseover( )",
		"selectionC":"<input type='radio' name='21' value='' />onmouseout( )",
		"selectionD":"<input type='radio' name='21' value='' />blur( )"
	},
	"22":{
		"title":"在jquery中，选择使用myClass类的css的所有元素()",
		"answer":"A",
		"selectionA":"<input type='radio' name='22' value='' />$('.myClass')",
		"selectionB":"<input type='radio' name='22' value='' />$('#myClass')",
		"selectionC":"<input type='radio' name='22' value='' />${*}",
		"selectionD":"<input type='radio' name='22' value='' />${'body'}"
	},
	"23":{
		"title":"在Jquery中，关于fadeIn()方法正确的是()",
		"answer":"B",
		"selectionA":"<input type='radio' name='23' value='' />可以改变元素的高度",
		"selectionB":"<input type='radio' name='23' value='' />可以逐渐改变被选元素的不透明度，从隐藏到可见(褪色效果)",
		"selectionC":"<input type='radio' name='23' value='' />可以改变元素的宽度",
		"selectionD":"<input type='radio' name='23' value='' />与fadeIn()相对的方法是fadeOn()"
	},
	"24":{
		"title":"下面选项中()能获得焦点",
		"answer":"A",
		"selectionA":"<input type='radio' name='24' value='' />blur()",
		"selectionB":"<input type='radio' name='24' value='' />select()",
		"selectionC":"<input type='radio' name='24' value='' />docus()",
		"selectionD":"<input type='radio' name='24' value='' />onfocus()"
	},
	"25":{
		"title":"在jQuery中被誉为工厂函数的是()",
		"answer":"C",
		"selectionA":"<input type='radio' name='25' value='' />ready()",
		"selectionB":"<input type='radio' name='25' value='' />function()",
		"selectionC":"<input type='radio' name='25' value='' />$()",
		"selectionD":"<input type='radio' name='25' value='' />next()"
	}
}

var panduan = {
	"1":{
		"title":"window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行",
		"right":"<input type='radio' name='1' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='1' value='' /><span>false</span>",
		"answer":"true"
	},
	"2":{
		"title":"on()方法在被选元素及子元素上添加一个或多个事件处理程序",
		"right":"<input type='radio' name='2' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='2' value='' /><span>false</span>",
		"answer":"true"
	},
	"3":{
		"title":"$('this')是使用标签选择器，查找名为this的标签",
		"right":"<input type='radio' name='3' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='3' value='' /><span>false</span>",
		"answer":"true"
	},
	"4":{
		"title":"nextAll() 不能替代$('prev~siblindgs')选择器",
		"right":"<input type='radio' name='4' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='4' value='' /><span>false</span>",
		"answer":"false"
	},
	"5":{
		"title":"在一个网页中一个Id可以用很多次",
		"right":"<input type='radio' name='5' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='5' value='' /><span>false</span>",
		"answer":"false"
	},
	"6":{
		"title":"在jquery中可以用 replaceWith() 和 replaceAll() 替换节点",
		"right":"<input type='radio' name='6' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='6' value='' /><span>false</span>",
		"answer":"true"
	},
	"7":{
		"title":"$('prev~div') 能选择所有的的同辈<div>元素",
		"right":"<input type='radio' name='7' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='7' value='' /><span>false</span>",
		"answer":"false"
	},
	"8":{
		"title":"jQuery中addClass()方法可以来设置和获取样式 ",
		"right":"<input type='radio' name='8' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='8' value='' /><span>false</span>",
		"answer":"true"
	},
	"9":{
		"title":"$.getScript()方法可以加载.js文件，需要对javascript文件进行处理",
		"right":"<input type='radio' name='9' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='9' value='' /><span>false</span>",
		"answer":"false"
	},
	"10":{
		"title":"delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数",
		"right":"<input type='radio' name='10' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='10' value='' /><span>false</span>",
		"answer":"true"
	},
	"11":{
		"title":"jquery的load()方法中data 参数是必须的",
		"right":"<input type='radio' name='11' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='11' value='' /><span>false</span>",
		"answer":"false"
	},
	"12":{
		"title":"nextAll() 方法返回被选元素的所有跟随的同胞元素",
		"right":"<input type='radio' name='12' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='12' value='' /><span>false</span>",
		"answer":"true"
	},
	"13":{
		"title":"parent() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素",
		"right":"<input type='radio' name='13' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='13' value='' /><span>false</span>",
		"answer":"false"
	},
	"14":{
		"title":"toggle() 方法在被选元素上进行 hide() 和 show() 之间的切换",
		"right":"<input type='radio' name='14' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='14' value='' /><span>false</span>",
		"answer":"true"
	},
	"15":{
		"title":"$('div > span').css('color', '#FF0000');的作用是选取div下的所有span元素，将字体颜色设为红色",
		"right":"<input type='radio' name='15' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='15' value='' /><span>false</span>",
		"answer":"false"
	},
	"16":{
		"title":"jQuery是一个javascript库",
		"right":"<input type='radio' name='16' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='16' value='' /><span>false</span>",
		"answer":"true"
	},
	"17":{
		"title":"jQuery.ajaxAsync()方法用于执行异步HTTP请求",
		"right":"<input type='radio' name='17' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='17' value='' /><span>false</span>",
		"answer":"false"
	},
	"18":{
		"title":"通过 jQuery，$('div.intro') 能够选取的元素是class='intro' 的首个 div 元素",
		"right":"<input type='radio' name='18' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='18' value='' /><span>false</span>",
		"answer":"false"
	},
	"19":{
		"title":"jQuery 是 W3C 标准",
		"right":"<input type='radio' name='19' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='19' value='' /><span>false</span>",
		"answer":"false"
	},
	"20":{
		"title":"jQueryget请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体内容发送给Web服务器的，这种传递是对用户不可见的",
		"right":"<input type='radio' name='20' value='' /><span>true</span>",
		"wrong":"<input type='radio' name='20' value='' /><span>false</span>",
		"answer":"true"
	}
}


var tiankong = {
	"1":{
		"title":"jquery访问对象中的size()方法的返回值和jQuery对象的<input class='tiankong' type='text'/>属性一样.",
		"answerA":"length",
		"answerB":"length"
	},
	"2":{
		"title":"jquery中$(this).get(0)的写法和<input class='tiankong' type='text'/>是等价的。",
		"answerA":"$(this)[0]",
		"answerB":"$(this)[0]"
	},
	"3":{
		"title":"在div元素中,包含了一个span元素,通过has选择器获取div元素中的span元素的语法是<input class='tiankong' type='text'/>",
		"answerA":"$('div:has(span)')",
		"answerB":'$("div:has(span)")'
	},
	"4":{
		"title":"<input class='tiankong' type='text'/>方法用于模拟光标悬停事件",
		"answerA":"hover()",
		"answerB":"hover()"
	},
	"5":{
		"title":"jQuery中提供了<input class='tiankong' type='text'/>方法可以停止冒泡",
		"answerA":"stopPropagation()",
		"answerB":"stopPropagation()"
	},
	"6":{
		"title":"可以用<input class='tiankong' type='text'/>,阻止这些默认的行为例如单击超链接后会自动跳转，单击'提交'按钮后表单会提交等",
		"answerA":"event.preventDefault()",
		"answerB":"event.preventDefault()"
	},
	"7":{
		"title":"formData:返回一个<input class='tiankong' type='text'/>，可以通过循环调用来校验",
		"answerA":"数组",
		"answerB":"数组"
	},
	"8":{
		"title":"jQuery的<input class='tiankong' type='text'/>可以给现在元素附加新的元素",
		"answerA":"html()",
		"answerB":"html()"
	},
	"9":{
		"title":"<input class='tiankong' type='text'/>方法用于处理命名冲突",
		"answerA":"conflict()",
		"answerB":"conflict()"
	},
	"10":{
		"title":"在ul元素中,添加了多个li元素,通过jquery选择器获取最后一个li元素的方法是<input class='tiankong' type='text'/>",
		"answerA":"$('li:last')",
		"answerB":'$("li:last")'
	}
}