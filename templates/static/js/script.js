// 获取歌曲列表
//222222222222222随机播放
//333333333333333键盘控制
//444444444444444音量的渐变
//555555555555555歌词,作者,封面
//666666666666666手动播放进度
//777777777777777更进一步封面
//888888888888888取消文字上下一曲
//999999999999999上传歌曲/取消歌曲
//歌曲路径
var daytime = 'static/music/daytime/';
var getup = 'static/music/getup/';
var fallasleep = 'static/music/fallasleep/';
var night = 'static/music/night/';
// 歌曲列表
var daytime_list = [];
var getup_list = [];
var fallasleep_list = [];
var night_list = [];

// ajax请求
$.ajax({
	url: 'get_mus',
	type: 'get',
	dataType: 'json',
	async:false,
})
.done(function(data) {
	daytime_list = data[0];
	getup_list = data[0];
	fallasleep_list = data[0];
	night_list = data[0];
	console.log("success");
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

// 当前路径,默认daytime
var current_path = daytime;
// 当前路径歌曲数目
// var current_length;
// 当前歌曲列表
var current_list = daytime_list;
// 当前音量
var current_volume = 0.8;

// 获取对象
var mus = $('#mus');
// 设置初始音量
// mus[0].volume = current_volume;
//当前歌曲下标
var index = -1;
// 当前歌曲数目,默认daytime_list
var current_length = daytime_list.length;
// 播放音乐
set_music(current_path,current_list,current_volume,'next');

//////////
// 设置音乐
// 歌曲路径,歌曲列表,音量,上下曲标志
//////////
function set_music(path,list,vol,flag){
	// 下一曲
	if(flag == 'next'){
		index ++;
		if(index >= list.length)
			index = 0;
		mus.attr('src',path + list[index]);
		console.log('下一曲');
	}
	// 上一曲
	if(flag == 'pre'){
		index --;
		if(index <= -1)
			index = list.length - 1;
		mus.attr('src',path + list[index]);
	}
	// 显示歌曲名
	var mus_name = list[index].split('.')[0];
	$('#mus_name').text(mus_name);
	// 设置音量
	mus[0].volume = vol;
	// 无循环
	if(mus.attr('loop'))
		mus.removeAttr('loop');
}

// 设置音乐/上一曲
// function pre_music(){
// 	index --;
// 	if(index <= -1)
// 		index = current_length - 1;
// 	mus.attr('src',current_path + current_list[index]);

// 	console.log('上一曲');

// 	var mus_name = current_list[index].split('.')[0];
// 	$('#mus_name').text(mus_name);
// 	// 无循环
// 	if(mus.attr('loop'))
// 		mus.removeAttr('loop');
// }


/*console.log(mus[0].paused);
console.log(mus[0].ended);
mus[0].currentTime = 280;*/

/*// 暂停事件
mus.on('pause', function(event) {
	event.preventDefault();
	console.log('暂停');
	console.log(mus[0].duration);
	console.log(mus[0].currentTime);

});

// 播放事件
mus.on('play', function(event) {
	event.preventDefault();
	console.log('播放');
});*/

// 结束自动下一曲事件/如果设置loop="loop",此事件将不会触发
mus.on('ended', function(event) {
	event.preventDefault();
	console.log('播放结束,自动下一曲');
	// 下一曲
	set_music(current_path,current_list,current_volume,'next');
});

// 单击下一曲
$('#next').click(function(event) {
	set_music(current_path,current_list,current_volume,'next');
});
// 单击上一曲
$('#pre').click(function(event) {
	set_music(current_path,current_list,current_volume,'pre');
});

// 定时执行

// 循环等待
var time_task=setInterval(function(){
    var date=new Date();
    var h=date.getHours();
    var m=date.getMinutes();
    var s=date.getSeconds();
    var w=date.getDay();
    // console.log(h + ',' + m + ',' + s + ','+w);
	//执行时间切歌
    time_call(h,m,s,w);
},1000);

function time_call(h,m,s,w){
    // 每晨6:10准备起床音乐
    if(h==6&&m==10&&s==0){
    	// 更改当前路径,歌曲列表
    	current_path = getup;
    	current_list = getup_list;
    	// 重置下标
    	index = -1;
    	current_volume = 0.4;
    	set_music(current_path,current_list,current_volume,'next');
    }
    // 清晨音乐
    if(h==6&&m==30&&s==0){
    	// 更改当前路径,歌曲列表
    	current_path = daytime;
    	current_list = daytime_list;
    	// 重置下标
    	index = -1;
    	current_volume = 0.8;
    	set_music(current_path,current_list,current_volume,'next');
    }
    // 每晚22:10准备洗睡音乐
    if(h==22&&m==10&&s==0){
    	// 更改当前路径,歌曲列表
    	current_path = fallasleep;
    	current_list = fallasleep_list;
    	// 重置下标
    	index = -1;
    	current_volume = 1;
    	set_music(current_path,current_list,current_volume,'next');
    }
    // 每晚11:00睡眠轻音乐
    if( h==23 && m ==0 && s==9 ){
    	// 更改当前路径,歌曲列表
    	current_path = night;
    	current_list = night_list;
    	// 重置下标
    	index = -1;
    	current_volume = 0.2;
    	set_music(current_path,current_list,current_volume,'next');
    }
    // 无人停止播放
    if((h==8&&m==30&&s==0) && (w!=0 && w!=6)){
    	// 停止音乐
		mus[0].pause();
    }
    // 下班时间播放
    if((h==18&&m==30) && (w!=0 && w!=6)){
	// 播放音乐
		mus[0].play();
    }
}