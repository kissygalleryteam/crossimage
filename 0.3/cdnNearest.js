//author: 加里 茅晓锋
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add(function(S,cdnPoints) {

	var customDistance = function(a, b){
		return  Math.min(Math.abs(a.w - b.w) ,Math.abs(a.h - b.h) ); //  Math.pow(a.w - b.w, 2) +  Math.pow(a.h - b.h, 2);
	}

	var manhattanDistance = function(a,b){ //曼哈顿距离
		return Math.abs(a.w - b .w) + Math.abs(a.h - b.h);
	}

	//config.ignoreHeight
	//config.ignoreWidth
	return function(config){
		if(!config || !config.w || !config.h) return;

		var result = {w : 0 , h : 0};
		if(config && ( config.ignoreWidth || config.ignoreHeight) ){
			var expectValue = config.ignoreWidth ? config.h : config.w,
				queryMark       = config.ignoreWidth ? "h" : "w", //需要查询的维度
				cdnCandidates   = config.ignoreWidth ? cdnPoints.ignoreWidth : cdnPoints.ignoreHeight,
				minDistance     = 1000000;
				
			for(var i = 0 ; i < cdnCandidates.length ; i++){
				var currentPoint = cdnCandidates[i],
					cdnValue     = currentPoint[queryMark];

				if(cdnValue >= expectValue && (cdnValue - expectValue) < minDistance ){
					minDistance = cdnValue - expectValue;
					result = currentPoint;
				}
			}

		}else{
			var generalPoints = cdnPoints.general,
			    minDistance = 1000000,
				minManManhattan = 1000000; //最小曼哈顿距离
			for(var i = 0 ; i < generalPoints.length ; i ++){
				var singlePoint = generalPoints[i];

				if(singlePoint.w >= config.w && singlePoint.h >= config.h){
					var d = customDistance(singlePoint,config),
						manhattanD = manhattanDistance(singlePoint,config);

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
		}

		if(result.w && result.h){
			return result;
		}else{
			return null;
		}

	}
},{
	requires:['./cdnPoints']
});