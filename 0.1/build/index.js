/*
combined files : 

gallery/crossimage/0.1/cdnPoints
gallery/crossimage/0.1/cdnNearest
gallery/crossimage/0.1/webp
gallery/crossimage/0.1/index

*/
/* CDN支持的尺寸格式*/
KISSY.add('gallery/crossimage/0.1/cdnPoints',function(){
	return [{w:16,h:16},{w:20,h:20},{w:24,h:24},{w:30,h:30},{w:32,h:32},{w:36,h:36},{w:40,h:40},{w:48,h:48},{w:50,h:50},{w:60,h:30},{w:60,h:60},{w:60,h:90},{w:64,h:64},{w:70,h:70},{w:70,h:1000},{w:72,h:72},{w:75,h:100},{w:80,h:40},{w:80,h:60},{w:81,h:65},{w:80,h:80},{w:80,h:1000},{w:88,h:88},{w:90,h:45},{w:90,h:60},{w:90,h:90},{w:90,h:135},{w:96,h:54},{w:100,h:50},{w:100,h:100},{w:100,h:150},{w:100,h:1000},{w:110,h:90},{w:110,h:110},{w:110,h:10000},{w:115,h:100},{w:120,h:60},{w:120,h:90},{w:120,h:120},{w:120,h:160},{w:125,h:125},{w:128,h:128},{w:130,h:130},{w:140,h:70},{w:140,h:100},{w:145,h:145},{w:150,h:150},{w:150,h:200},{w:150,h:10000},{w:160,h:80},{w:160,h:90},{w:160,h:160},{w:160,h:180},{w:160,h:240},{w:165,h:5000},{w:170,h:170},{w:170,h:10000},{w:170,h:120},{w:180,h:90},{w:180,h:180},{w:180,h:230},{w:190,h:43},{w:190,h:190},{w:200,h:100},{w:200,h:200},{w:210,h:140},{w:210,h:210},{w:210,h:1000},{w:220,h:220},{w:220,h:330},{w:220,h:5000},{w:220,h:10000},{w:240,h:5000},{w:230,h:87},{w:230,h:230},{w:234,h:234},{w:240,h:240},{w:240,h:10000},{w:250,h:225},{w:250,h:250},{w:264,h:100},{w:270,h:180},{w:270,h:270},{w:280,h:410},{w:290,h:290},{w:290,h:10000},{w:300,h:1000},{w:310,h:310},{w:300,h:300},{w:315,h:315},{w:320,h:320},{w:320,h:480},{w:336,h:336},{w:350,h:350},{w:350,h:1000},{w:360,h:360},{w:400,h:152},{w:400,h:400},{w:420,h:280},{w:430,h:430},{w:450,h:10000},{w:460,h:460},{w:468,h:468},{w:480,h:420},{w:480,h:480},{w:485,h:175},{w:490,h:330},{w:490,h:490},{w:500,h:450},{w:500,h:1000},{w:540,h:540},{w:560,h:370},{w:560,h:560},{w:560,h:840},{w:570,h:570},{w:570,h:10000},{w:580,h:580},{w:580,h:10000},{w:600,h:600},{w:620,h:10000},{w:640,h:480},{w:640,h:640},{w:660,h:440},{w:670,h:670},{w:720,h:720},{w:728,h:728},{w:760,h:760},{w:790,h:420},{w:790,h:10000},{w:960,h:960},{w:970,h:970},{w:10000,h:220},{w:10000,h:340},{w:10000,h:170},{w:10000,h:500}];
});



// 处理源数据，可以考虑挪到nodeJS中离线处理
// var cdnRawList = ["16x16","20x20","24x24","30x30","32x32","36x36","40x40","48x48","50x50","60x30","60x60","60x90","64x64","70x70","70x1000","72x72","75x100","80x40","80x60","81x65","80x80","80x1000","88x88","90x45","90x60","90x90","90x135","96x54","100x50","100x100","100x150","100x1000","110x90","110x110","110x10000","115x100","120x60","120x90","120x120","120x160","125x125","128x128","130x130","140x70","140x100","145x145","150x150","150x200","150x10000","160x80","160x90","160x160","160x180","160x240","165x5000","170x170","170x10000","170x120","180x90","180x180","180x230","190x43","190x190","200x100","200x200","210x140","210x210","210x1000","220x220","220x330","220x5000","220x10000","240x5000","230x87","230x230","234x234","240x240","240x10000","250x225","250x250","264x100","270x180","270x270","280x410","290x290","290x10000","300x1000","310x310","300x300","315x315","320x320","320x480","336x336","350x350","350x1000","360x360","400x152","400x400","420x280","430x430","440x440","450x10000","460x460","468x468","480x420","480x480","485x175","490x330","490x490","500x450","500x1000","540x540","560x370","560x560","560x840","570x570","570x10000","580x580","580x10000","600x600","620x10000","640x480","640x640","660x440","670x670","720x720","728x728","760x760","790x420","790x10000","960x960","970x970","10000x220","10000x340","10000x170","10000x500"];
// var CDNPair    = []; 
// (function(){
//     for(var i = 0 ; i <cdnRawList.length ; i++){
//         var item = cdnRawList[i];
//         var pair = item.split("x");
//         CDNPair.push({
//             w:pair[0],
//             h:pair[1]
//         });
//     }
// })();
// console.log(JSON.stringify(CDNPair));
//author: 加里 茅晓锋
//用kd-tree，从cdn参数集中获取最近的点 - 废弃
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add('gallery/crossimage/0.1/cdnNearest',function(S,cdnPoints) {

	var points = cdnPoints;

	var distance = function(a, b){
		return  Math.min(Math.abs(a.w - b.w) ,Math.abs(a.h - b.h) ); //  Math.pow(a.w - b.w, 2) +  Math.pow(a.h - b.h, 2);
	}

	return function(expect){
		if(!expect || !expect.w || !expect.h) return;

		var result = {w : 0 , h : 0},
			minDistance = 1000000;
		for(var i = 0 ; i < points.length ; i ++){
			var singlePoint = points[i];

			if(singlePoint.w >= expect.w && singlePoint.h >= expect.h){
				var d = distance(singlePoint,expect);
				if(d < minDistance){
					minDistance = d;
					result = singlePoint;
				}
			}else{
				continue; //不在右上角
			}
		}

		return result;

	}


	// var tree = new KdTree(points, distance, ["w", "h"]);
	// var nearest = tree.nearest({ w: 500, h: 430 }, 1);
	// return tree.nearest;
},{
	requires:['./cdnPoints']
});
//Originallly from:  yunqian@taobao.com https://github.com/sorrycc/webp-support/blob/master/lib/webp.js
//KISSY adapted From : https://github.com/kissygalleryteam/datalazyload/blob/master/1.0.1/plugin/webp.js

//为了保证对alpha类webp的完整兼容，这里修改了测试图片
//Ref : https://developers.google.com/speed/webp/faq#which_web_browsers_natively_support_webp
KISSY.add('gallery/crossimage/0.1/webp',function(S) {

	(function() {

	  if (this.WebP) return;
	  this.WebP = {};
	     function isSupportStorage(cb) {
	        if ((!window.chrome && !window.opera)){
	            cb(false);
	            return;
	        }
	        var val=window.localStorage && window.localStorage.getItem("webpsupport");
	        if(val!==null)
	        {
	            cb(val === "true");
	            return;
	        }
	         isSupportTest(function(isSupport){
	            window.localStorage && window.localStorage.setItem("webpsupport", isSupport);
	            cb(isSupport);
	        });
	    }
	    function isSupportTest(cb) {
	        var img = new Image();
	        img.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==";
	        img.onload = img.onerror = function() {
	            cb(img.width > 0 && img.height > 0);
	        };
	    }
	    WebP.isSupport = function(cb) {
	        if (!cb) return;
	        if(WebP._isSupport===undefined){
	            isSupportStorage(function(isSupport){
	                cb(WebP._isSupport=isSupport);
	            });
	            return;
	        }
	        cb(WebP._isSupport);
	    }
	})();
	return window.WebP;

}, {
  attach: false,
  requires: []
});
 
/**
 * @fileoverview 
 * @author 加里（茅晓锋）<xiaofeng.mxf@taobao.com>
 * @module crossimage
 **/
KISSY.add('gallery/crossimage/0.1/index',function (S,cdnNearest,WebpSupport) {

    var WEBPSUFFIX = "";
    WebpSupport.isSupport(function(isSupport){
        WEBPSUFFIX = isSupport ? "_.webp" : "";
    });

    function crossimage(config){
        var _self = this,
            defaultConfig = {
                quality : 90,
                userPPI : window.devicePixelRatio || 1
            };

        _self.config = S.merge(defaultConfig,config);

        function adjustImage(obj){
            if(!obj.elem || !obj.elem.width || !obj.elem.height || !obj.src || !/http/.test(obj.src) || obj.elem.getAttribute("ignore-crossimage") !== null ) return;

            try{
                var imgEle = obj.elem,
                    expectW = imgEle.width * _self.config.userPPI,
                    expectH = imgEle.height * _self.config.userPPI,
                    currentSrc = obj.src,
                    rawSrc,
                    finalSrc,
                    cdnW,
                    cdnH;

                /*
                把不带参数的原始src找出来
                原始图片形式可能包括：
                http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_q75.jpg
                http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_180x180q75.jpg_180x180q75.jpg_180x180q75.jpg
                http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png
                http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_.webp
                */
                var rawSrc = currentSrc.replace(/_\d+x\d+(q\d+)?\.jpg/g,"").replace(/_q\d+\.jpg/g,"").replace(/_\.webp/,"");

                //寻找最匹配的宽高
                var targetPair = cdnNearest({w:expectW, h : expectH});

                if(!targetPair || !targetPair.w || !targetPair.h){ //没找到合适的cdn尺寸,只处理压缩参数
                    finalSrc = rawSrc + "_q@Q.jpg@WEBP".replace(/@Q/,_self.config.quality).replace(/@WEBP/,WEBPSUFFIX);

                }else{
                    cdnW = targetPair.w;
                    cdnH = targetPair.h;
                    finalSrc = rawSrc + "_@Wx@Hq@Q.jpg@WEBP".replace(/@W/i,cdnW).replace(/@H/i,cdnH).replace(/@Q/,_self.config.quality).replace(/@WEBP/,WEBPSUFFIX);
                }
                obj.src = finalSrc;


                if(_self.config && _self.config.debug && console){
                    console.log("ppi : " + _self.config.userPPI);
                    console.log("webp : " + WEBPSUFFIX);
                    console.log("src: __xx__y expect : __ax__b , target : __cx__d".replace(/__x/,imgEle.width).replace(/__y/,imgEle.height).replace(/__a/,expectW).replace(/__b/,expectH).replace(/__c/,cdnW).replace(/__d/,cdnH));
                    console.log("===========");
                }

            }catch(e){}
        }
        return adjustImage;
    }

    return crossimage;

}, {requires:['./cdnNearest', './webp']});







