// 获取歌曲列表
var mus_list;
$.ajax({
	url: 'get_mus',
	type: 'get',
	dataType: 'json',
	async:false,
})
.done(function(data) {
	mus_list = data;
	console.log("success");
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

console.log(mus_list[0][0]);
// 设置音乐
// $('#mus').attr('src',mus_list[0][0]);