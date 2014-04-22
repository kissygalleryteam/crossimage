/*
combined files : 

gallery/crossimage/0.2/cdnPoints
gallery/crossimage/0.2/cdnNearest
gallery/crossimage/0.2/webp
gallery/crossimage/0.2/index

*/
/* CDN支持的尺寸格式*/
/* Ref :http://img01.taobaocdn.com/L1/8/381/imgsrc_config.lua */
KISSY.add('gallery/crossimage/0.2/cdnPoints',function(){
	return {
		general:[{w:80,h:40},{w:60,h:30},{w:81,h:65},{w:110,h:90},{w:24,h:24},{w:30,h:30},{w:40,h:40},{w:60,h:60},{w:70,h:70},{w:80,h:80},{w:100,h:100},{w:110,h:110},{w:120,h:120},{w:160,h:160},{w:170,h:170},{w:210,h:210},{w:250,h:250},{w:310,h:310},{w:430,h:430},{w:670,h:670},{w:620,h:10000},{w:150,h:200},{w:120,h:160},{w:75,h:100},{w:160,h:90},{w:96,h:54},{w:120,h:90},{w:80,h:60},{w:128,h:128},{w:90,h:90},{w:32,h:32},{w:64,h:64},{w:100,h:150},{w:90,h:135},{w:60,h:90},{w:450,h:10000},{w:170,h:10000},{w:350,h:1000},{w:210,h:1000},{w:220,h:10000},{w:10000,h:220},{w:400,h:400},{w:115,h:100},{w:790,h:10000},{w:480,h:420},{w:460,h:460},{w:480,h:480},{w:180,h:230},{w:790,h:420},{w:300,h:1000},{w:500,h:1000},{w:70,h:1000},{w:80,h:1000},{w:100,h:1000},{w:640,h:480},{w:200,h:200},{w:10000,h:340},{w:10000,h:170},{w:290,h:10000},{w:580,h:10000},{w:420,h:280},{w:660,h:440},{w:290,h:290},{w:10000,h:500},{w:90,h:60},{w:170,h:120},{w:210,h:140},{w:490,h:330},{w:220,h:330},{w:280,h:410},{w:110,h:10000},{w:16,h:16},{w:570,h:570},{w:150,h:10000},{w:48,h:48},{w:72,h:72},{w:570,h:10000},{w:145,h:145},{w:240,h:10000},{w:20,h:20},{w:36,h:36},{w:230,h:230},{w:240,h:240},{w:130,h:130},{w:270,h:180},{w:180,h:180},{w:350,h:350},{w:230,h:87},{w:400,h:152},{w:264,h:100},{w:90,h:45},{w:88,h:88},{w:125,h:125},{w:234,h:234},{w:270,h:270},{w:300,h:300},{w:315,h:315},{w:320,h:320},{w:336,h:336},{w:360,h:360},{w:468,h:468},{w:490,h:490},{w:540,h:540},{w:560,h:560},{w:580,h:580},{w:600,h:600},{w:640,h:640},{w:720,h:720},{w:728,h:728},{w:760,h:760},{w:960,h:960},{w:970,h:970},{w:220,h:220},{w:190,h:190},{w:485,h:175},{w:500,h:450},{w:250,h:225},{w:560,h:840},{w:190,h:43},{w:320,h:480},{w:560,h:370},{w:180,h:180},{w:50,h:50},{w:160,h:240},{w:160,h:180},{w:140,h:100}],
		widthOnly:[], //只关心宽度，高度为10000的点
		heightOnly:[] //只关心高度，宽度为10000的点
	}
});
//author: 加里 茅晓锋
//用kd-tree，从cdn参数集中获取最近的点 - 废弃
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add('gallery/crossimage/0.2/cdnNearest',function(S,cdnPoints) {

	var points = cdnPoints.general;

	var customDistance = function(a, b){
		return  Math.min(Math.abs(a.w - b.w) ,Math.abs(a.h - b.h) ); //  Math.pow(a.w - b.w, 2) +  Math.pow(a.h - b.h, 2);
	}

	var manhattanDistance = function(a,b){ //曼哈顿距离
		return Math.abs(a.w - b .w) + Math.abs(a.h - b.h);
	}

	return function(expect){
		if(!expect || !expect.w || !expect.h) return;

		var result = {w : 0 , h : 0},
			minDistance = 1000000,
			minManManhattan = 1000000; //最小曼哈顿距离
		for(var i = 0 ; i < points.length ; i ++){
			var singlePoint = points[i];

			if(singlePoint.w >= expect.w && singlePoint.h >= expect.h){
				var d = customDistance(singlePoint,expect),
					manhattanD = manhattanDistance(singlePoint,expect);

				if(d <= minDistance){ //最小距离
					minDistance = d;
					minManManhattan = manhattanD;
					result = singlePoint;

				}else if(d == minDistance){ //已经是最小距离时，比较曼哈顿距离
					if(manhattanD < minManManhattan){
						minManManhattan = manhattanD;
						result = singlePoint;
					}
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
//https://developers.google.com/speed/webp/faq
KISSY.add('gallery/crossimage/0.2/webp',function(S) {

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

// TODO:
// 1. 只关心宽或高的情况
// 2. cdn尺寸查找性能
// 未指定大小
// 可视化


KISSY.add('gallery/crossimage/0.2/index',function (S,cdnNearest,WebpSupport) {

    //webp后缀，不设开关
    var WEBPSUFFIX          = "",
        DEFAULT_QUALITY         = 90,
        DEFAULT_HD_JPG_QUALITY  = 50,
        DEFAULT_HD_WEBP_QUALITY = 75;
    
    WebpSupport.isSupport(function(isSupport){
        WEBPSUFFIX = isSupport ? "_.webp" : "";
    });

    //处理质量参数的相关策略，异步
    function getQuality(userQuality,callback){
        var resultQuality;
        if(userQuality){ //用户指定了质量参数
            resultQuality = userQuality;
            callback && callback(resultQuality);

        }else{
            resultQuality = DEFAULT_QUALITY;
            if(window.devicePixelRatio > 1){
                WebpSupport.isSupport(function(isSupport){
                    resultQuality = isSupport ? DEFAULT_HD_WEBP_QUALITY : DEFAULT_HD_JPG_QUALITY;
                    callback && callback(resultQuality);
                });                
            }else{
                callback && callback(resultQuality);
            }         
        }
    }


    function adjustImgUrl(srcUrl,expectW,expectH,quality){
        if(!srcUrl || !expectW || !expectH) return srcUrl;
        if(!quality){
            quality = DEFAULT_QUALITY;
            getQuality(null,function(q){
                quality = q;
            });
        }

        /*
        把不带参数的原始src找出来
        原始图片形式可能包括：
        http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_q75.jpg
        http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_180x180q75.jpg_180x180q75.jpg_180x180q75.jpg
        http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png
        http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_.webp
        */
        var rawSrc = srcUrl.replace(/_\d+x\d+(q\d+)?\.jpg/g,"").replace(/_q\d+\.jpg/g,"").replace(/_\.webp/,""),
            finalSrc,
            cdnW,
            cdnH;

        //寻找最匹配的宽高
        var targetPair = cdnNearest({w:expectW, h : expectH});

        if(!targetPair || !targetPair.w || !targetPair.h){ //没找到合适的cdn尺寸,只处理压缩参数
            finalSrc = rawSrc + "_q@Q.jpg@WEBP".replace(/@Q/ , quality).replace(/@WEBP/,WEBPSUFFIX);

        }else{
            cdnW = targetPair.w;
            cdnH = targetPair.h;
            finalSrc = rawSrc + "_@Wx@Hq@Q.jpg@WEBP".replace(/@W/i,cdnW).replace(/@H/i,cdnH).replace(/@Q/,quality).replace(/@WEBP/,WEBPSUFFIX);
        }

        return finalSrc;
    }


    function datalazyPlugin(config){
        var _self = this,
            defaultConfig = {
                quality : DEFAULT_QUALITY, //默认载入q90
                userPPI : window.devicePixelRatio || 1
            };

        _self.config = S.merge(defaultConfig,config);

        if(!(config && config.quality)){
            getQuality(function(q){
                _self.config.quality = q;
            });
        }

        function dealLazyObj(obj){
            if(!obj.elem || !obj.elem.width || !obj.elem.height || !obj.src || !/http/.test(obj.src) || obj.elem.getAttribute("ignore-crossimage") !== null ) return;

            try{
                var imgEle = obj.elem,
                    expectW = imgEle.width * _self.config.userPPI,
                    expectH = imgEle.height * _self.config.userPPI,
                    currentSrc = obj.src,
                    finalSrc;

                finalSrc = adjustImgUrl(currentSrc,expectW,expectH,_self.config.quality);
                obj.src = finalSrc;

                if(_self.config && _self.config.debug && console){
                    console.log("ppi : " + _self.config.userPPI);
                    console.log("webp : " + WEBPSUFFIX);
                    console.log("src: __xx__y expect : __ax__b".replace(/__a/,expectW).replace(/__b/,expectH).replace(/__x/,imgEle.width).replace(/__y/,imgEle.height));
                    console.log("target: " + finalSrc);
                    console.log("===========");
                }

            }catch(e){}
        }
        return dealLazyObj;
    }

    return {
        DatalazyPlugin : datalazyPlugin, //是个类
        adjustImgUrl   : adjustImgUrl
    }

}, {requires:['./cdnNearest', './webp']});







