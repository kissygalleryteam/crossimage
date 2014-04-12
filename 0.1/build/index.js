/*
combined files : 

gallery/crossimage/0.1/cdnpair
gallery/crossimage/0.1/webp
gallery/crossimage/0.1/index

*/
//author: 加里 茅晓锋
//整理cdn参数集
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add('gallery/crossimage/0.1/cdnpair',function() {

	var cdnRawList = ["16x16","20x20","24x24","30x30","32x32","36x36","40x40","48x48","50x50","60x30","60x60","60x90","64x64","70x70","70x1000","72x72","75x100","80x40","80x60","81x65","80x80","80x1000","88x88","90x45","90x60","90x90","90x135","96x54","100x50","100x100","100x150","100x1000","110x90","110x110","110x10000","115x100","120x60","120x90","120x120","120x160","125x125","128x128","130x130","140x70","140x100","145x145","150x150","150x200","150x10000","160x80","160x90","160x160","160x180","160x240","165x5000","170x170","170x10000","170x120","180x90","180x180","180x230","190x43","190x190","200x100","200x200","210x140","210x210","210x1000","220x220","220x330","220x5000","220x10000","240x5000","230x87","230x230","234x234","240x240","240x10000","250x225","250x250","264x100","270x180","270x270","280x410","290x290","290x10000","300x1000","310x310","300x300","315x315","320x320","320x480","336x336","350x350","350x1000","360x360","400x152","400x400","420x280","430x430","440x440","450x10000","460x460","468x468","480x420","480x480","485x175","490x330","490x490","500x450","500x1000","540x540","560x370","560x560","560x840","570x570","570x10000","580x580","580x10000","600x600","620x10000","640x480","640x640","660x440","670x670","720x720","728x728","760x760","790x420","790x10000","960x960","970x970","10000x220","10000x340","10000x170","10000x500"];
	var CDNPair    = []; // [{w:16, h:16},{w:32,h:32}]
	(function(){
	    for(var i = 0 ; i <cdnRawList.length ; i++){
	        var item = cdnRawList[i];
	        var pair = item.split("x");
	        CDNPair.push({
	            w:pair[0],
	            h:pair[1]
	        });
	    }
	})();

	return CDNPair;

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
KISSY.add('gallery/crossimage/0.1/index',function (S,CDNPair,WebpSupport) {

    //根据CDN的变量，计算数据对
    function getSizePair(expectW,expectH){
        //计算距离值的平方
        function distance2D(x1,y1,x2,y2){
            return (x1 - x2)*(x1 - x2) + (y1 - y2) * (y1 -y2);
        }

        var resultPair,
            minDistance = 1000000;
        for(var i = 0 ; i < CDNPair.length ; i++){
            var cdnCandidate = CDNPair[i],
                distance;

            distance = distance2D(cdnCandidate.w , cdnCandidate.h , expectW ,expectH);
            if(distance < minDistance){
                minDistance = distance;
                resultPair = cdnCandidate;
            }
        }
        return resultPair;
    }

    function crossimage(config){
        var _self = this,
            defaultConfig = {
                quality : 90,
                WEBPSUFFIX : "",
                userPPI : 1
            };

        _self.config = S.merge(defaultConfig,config);

        WebpSupport.isSupport(function(isSupport){
            _self.config.WEBPSUFFIX = isSupport ? "_.webp" : "";
        });

        function adjustImage(obj){
            if(!obj.elem || !obj.elem.width || !obj.elem.height || !obj.src || !/http/.test(obj.src)) return;

            try{
                var imgEle = obj.elem,
                    expectW = imgEle.width * _self.config.userPPI,
                    expectH = imgEle.height * _self.config.userPPI,
                    currentSrc = obj.src,
                    rawSrc,
                    finalSrc,
                    cdnW,
                    cdnH;

                //把不带参数的原始src找出来
                var rawSrcPath = currentSrc.match(/[^_]+/g);
                if(!rawSrcPath) return; 
                rawSrc = rawSrcPath[0];

                //寻找最匹配的宽高
                var targetPair = getSizePair(expectW,expectH);
                cdnW = targetPair.w;
                cdnH = targetPair.h;

                finalSrc = rawSrc + "_@Wx@Hq@Q.jpg@WEBP".replace(/@W/i,cdnW).replace(/@H/i,cdnH).replace(/@Q/,_self.config.quality).replace(/@WEBP/,_self.config.WEBPSUFFIX);
                obj.src = finalSrc;
            }catch(e){}
        }

        return adjustImage;
    }

    return crossimage;

}, {requires:['./cdnpair', './webp']});







