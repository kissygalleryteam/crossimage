/**
 * @fileoverview 
 * @author 加里（茅晓锋）<xiaofeng.mxf@taobao.com>
 * @module crossimage
 **/
KISSY.add(function (S,CDNPair,WebpSupport) {

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






