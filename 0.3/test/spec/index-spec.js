KISSY.add(function (S, Node,CrossImage) {
    var $ = Node.all,
	    adjustImgUrl = CrossImage.adjustImgUrl;
    describe('crossimage', function () {
        it('url adjust',function(){
        	var srcUrl = [
			    "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_q75.jpg",
			    "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_180x180q75.jpg_180x180q75.jpg_180x180q75.jpg",
			    "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png",
			    "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_.webp"
		    ],
		    expectUrlA = "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_490x330q50.jpg",
		    expectUrlB = "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_450x10000q50.jpg",
		    expectUrlC = "http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_10000x170q50.jpg";

		    var successCount = 0;
        	for(var i = 0 ; i < srcUrl.length ; i++){
        		var url = srcUrl[i],
        			resultA,
        			resultB,
        			resultC;

    			resultA = adjustImgUrl(url,321,320,{ //正常适配
    				quality:50
    			}).replace(/_\.webp$/,"");

    			resultB = adjustImgUrl(url,321,null,{ //只适配宽度
    				quality:50,
    				ignoreHeight:true
    			}).replace(/_\.webp$/,"");

    			resultC = adjustImgUrl(url,null,123,{ //只适配高度
    				quality:50,
    				ignoreWidth:true
    			}).replace(/_\.webp$/,"");

    			if(resultA == expectUrlA && resultB == expectUrlB && resultC == expectUrlC ){
	    			++successCount;
    			}else{
    				console.log(expectUrlA + " -> " + resultA);
    				console.log(expectUrlB + " -> " + resultB);
    				console.log(expectUrlC + " -> " + resultC);
    				console.log("failed :" + url);
    			}
        	}

            expect(successCount).toBe(srcUrl.length);
        })
    });

    /*
    把不带参数的原始src找出来
    原始图片形式可能包括：
    */

},{requires:['node','gallery/crossimage/0.3/']});