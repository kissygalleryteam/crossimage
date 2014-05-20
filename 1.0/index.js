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
// 未指定大小的情况
// 解析HTML string中的dom节点
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

    //兼容IE6，7，8
    function hasAttribute(el,name){
        if(el.hasAttribute){
            return el.hasAttribute(name);
        }else{
            return (typeof el.getAttribute(name) == "string");
        }
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
            if(obj.type!="img" || !obj.elem || !obj.src || !/http/.test(obj.src) || hasAttribute(obj.elem,"crossimage-ignore") ) return;

            if(hasAttribute(obj.elem,"crossimage-widthOnly")){ //widthOnly模式，但未指定宽度
                if(!obj.elem.width) return;
            }else if(hasAttribute(obj.elem,"crossimage-heightOnly")){
                if(!obj.elem.height) return;
            }else{
                if(!obj.elem.height || !obj.elem.width) {
                    return;
                }
            }

            try{
                var imgEle = obj.elem,
                    expectW = imgEle.width * _self.config.userPPI,
                    expectH = imgEle.height * _self.config.userPPI,
                    currentSrc = obj.src,
                    finalSrc;

                finalSrc = adjustImgUrl(currentSrc,expectW,expectH,{
                    quality: _self.config.quality,
                    ignoreWidth: hasAttribute(obj.elem,"crossimage-heightOnly"),
                    ignoreHeight:hasAttribute(obj.elem,"crossimage-widthOnly")
                });
                obj.src = finalSrc;

                if(_self.config && _self.config.debug && window.console){
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