/**
 * @fileoverview 
 * @author 加里（茅晓锋）<xiaofeng.mxf@taobao.com>
 * @module crossimage
 **/
KISSY.add(function (S,cdnNearest,WebpSupport) {

    var WEBPSUFFIX = "";
    WebpSupport.isSupport(function(isSupport){
        WEBPSUFFIX = isSupport ? "_.webp" : "";
    });

    function crossimage(config){
        var _self = this,
            defaultConfig = {
                quality : window.devicePixelRatio > 1 ? 75 : 90,  //dpr > 1时，默认载入q75
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

// Q参数
// 220    ["q90"] = 0.9,                                                                                 
// 221    ["Q90"] = 90,                                                                                  
// 222    ["q75"] = 0.75,                                                                                
// 223    ["Q75"] = 75,                                                                                  
// 224    ["q50"] = 0.5,                                                                                 
// 225    ["Q50"] = 50,                                                                                  
// 226    ["q30"] = 0.3,                                                                                 
// 227    ["Q30"] = 30 






