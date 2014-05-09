/**
 * @fileoverview 
 * @author 加里（茅晓锋）<xiaofeng.mxf@taobao.com>
 * @module crossimage
 **/

/**
 * CDN支持的尺寸格式: http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
 * 线上配置 :http://img01.taobaocdn.com/L1/8/381/imgsrc_config.lua
 **/

// TODO:
// cdn尺寸查找性能
// 未指定大小的情况
// 可视化

KISSY.add(function (S,cdnNearest,WebpSupport) {

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

    //config.quality
    function adjustImgUrl(srcUrl,expectW,expectH,config){
        if(!srcUrl || (!expectW && !expectH) ) return srcUrl;
        var quality;
        if(!config || !config.quality){
            quality = DEFAULT_QUALITY;
            getQuality(null,function(q){
                quality = q;
            });
        }else{
            quality = config.quality;
        }

        var rawSrc = srcUrl.replace(/_\d+x\d+(q\d+)?\.jpg/g,"").replace(/_q\d+\.jpg/g,"").replace(/_\.webp/,""),
            finalSrc,
            cdnW,
            cdnH,
            ignoreWidth  = (config && config.ignoreWidth),
            ignoreHeight = (config && config.ignoreHeight);

        //寻找最匹配的宽高
        var targetPair = cdnNearest({
            w : expectW, 
            h : expectH,
            ignoreWidth  : ignoreWidth,
            ignoreHeight : ignoreHeight
        });

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
            getQuality(undefined, function(q){
                _self.config.quality = q;
            });
        }

        function dealLazyObj(obj){
            if(!obj.elem || !obj.src || !/http/.test(obj.src) || obj.elem.hasAttribute("crossimage-ignore") ) return;
            if(obj.elem.hasAttribute("crossimage-widthOnly")){ //widthOnly模式，但未指定宽度
                if(!obj.elem.hasAttribute("width")) return;
            }else if(obj.elem.hasAttribute("crossimage-heightOnly")){
                if(!obj.elem.hasAttribute("height")) return;
            }else{
                if(!obj.elem.hasAttribute("height") || !obj.elem.hasAttribute("width")) {
                    return;
                }
            }

            try{
                var imgEle = obj.elem,
                    expectW = imgEle.getAttribute("width")* _self.config.userPPI,
                    expectH = imgEle.getAttribute("height") * _self.config.userPPI,
                    currentSrc = obj.src,
                    finalSrc;

                    console.log(expectH);

                finalSrc = adjustImgUrl(currentSrc,expectW,expectH,{
                    quality: _self.config.quality,
                    ignoreWidth:obj.elem.hasAttribute("crossimage-heightOnly"),
                    ignoreHeight:obj.elem.hasAttribute("crossimage-widthOnly")
                });
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