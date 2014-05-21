//离线对CDN尺寸列表进行排序、归类，写入cdnPoints.js

/**
 * CDN支持的尺寸格式: http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
 * 线上配置 :http://img01.taobaocdn.com/L1/8/381/imgsrc_config.lua
 **/

var cdnAllPoints = [{w:80,h:40},{w:60,h:30},{w:81,h:65},{w:110,h:90},{w:24,h:24},{w:30,h:30},{w:40,h:40},{w:60,h:60},{w:70,h:70},{w:80,h:80},{w:100,h:100},{w:110,h:110},{w:120,h:120},{w:160,h:160},{w:170,h:170},{w:210,h:210},{w:250,h:250},{w:310,h:310},{w:430,h:430},{w:670,h:670},{w:620,h:10000},{w:150,h:200},{w:120,h:160},{w:75,h:100},{w:160,h:90},{w:96,h:54},{w:120,h:90},{w:80,h:60},{w:128,h:128},{w:90,h:90},{w:32,h:32},{w:64,h:64},{w:100,h:150},{w:90,h:135},{w:60,h:90},{w:450,h:10000},{w:170,h:10000},{w:350,h:1000},{w:210,h:1000},{w:220,h:10000},{w:10000,h:220},{w:400,h:400},{w:115,h:100},{w:790,h:10000},{w:480,h:420},{w:460,h:460},{w:480,h:480},{w:180,h:230},{w:790,h:420},{w:300,h:1000},{w:500,h:1000},{w:70,h:1000},{w:80,h:1000},{w:100,h:1000},{w:640,h:480},{w:200,h:200},{w:10000,h:340},{w:10000,h:170},{w:290,h:10000},{w:580,h:10000},{w:420,h:280},{w:660,h:440},{w:290,h:290},{w:10000,h:500},{w:90,h:60},{w:170,h:120},{w:210,h:140},{w:490,h:330},{w:220,h:330},{w:280,h:410},{w:110,h:10000},{w:16,h:16},{w:570,h:570},{w:150,h:10000},{w:48,h:48},{w:72,h:72},{w:570,h:10000},{w:145,h:145},{w:240,h:10000},{w:20,h:20},{w:36,h:36},{w:230,h:230},{w:240,h:240},{w:130,h:130},{w:270,h:180},{w:180,h:180},{w:350,h:350},{w:230,h:87},{w:400,h:152},{w:264,h:100},{w:90,h:45},{w:88,h:88},{w:125,h:125},{w:234,h:234},{w:270,h:270},{w:300,h:300},{w:315,h:315},{w:320,h:320},{w:336,h:336},{w:360,h:360},{w:468,h:468},{w:490,h:490},{w:540,h:540},{w:560,h:560},{w:580,h:580},{w:600,h:600},{w:640,h:640},{w:720,h:720},{w:728,h:728},{w:760,h:760},{w:960,h:960},{w:970,h:970},{w:220,h:220},{w:190,h:190},{w:485,h:175},{w:500,h:450},{w:250,h:225},{w:560,h:840},{w:190,h:43},{w:320,h:480},{w:560,h:370},{w:180,h:180},{w:50,h:50},{w:160,h:240},{w:160,h:180},{w:140,h:100}];
var fileTpl = ""+
	'/* 不要手动修改这份文件！用cdnSort_node.js来生成 */\n'+
	'KISSY.add(function(){\n'+
	'	var result = __PONITSHERE ;\n'+
	'	return result;\n'+
	'});';

var result = {
		general:[],
		ignoreHeight:[], //只关心宽度，高度为10000的点
		ignoreWidth:[]   //只关心高度，宽度为10000的点
	},
	fs = require("fs");

//归类
for(var i = 0 ; i < cdnAllPoints.length ; i++){
	var item = cdnAllPoints[i];
	if(item.h == 10000){
		result.ignoreHeight.push(item);
	}else if(item.w == 10000){
		result.ignoreWidth.push(item);
	}else{
		result.general.push(item);
	}
}

//排序，按w从大到小
result.general.sort(pointCompare);
result.ignoreHeight.sort(pointCompare);
result.ignoreWidth.sort(pointCompare);

var resultStr = fileTpl.replace( /__PONITSHERE/,JSON.stringify(result) );
fs.writeFileSync("./cdnPoints.js",resultStr);

function pointCompare(a,b){
	if(a.w != b.w){
		return (b.w - a.w);
	}else{
		return (b.h - a.h);
	}
}