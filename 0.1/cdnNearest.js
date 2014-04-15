//author: 加里 茅晓锋
//用kd-tree，从cdn参数集中获取最近的点 - 废弃
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add(function(S,cdnPoints) {

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