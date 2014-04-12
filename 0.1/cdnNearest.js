//author: 加里 茅晓锋
//用kd-tree，从cdn参数集中获取最近的点
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add(function(S,KdTree,cdnPoints) {

	var points = cdnPoints;
	var distance = function(a, b){
	  return Math.pow(a.w - b.w, 2) +  Math.pow(a.h - b.h, 2);
	}

	var tree = new KdTree(points, distance, ["w", "h"]);
	// var nearest = tree.nearest({ w: 500, h: 430 }, 1);

	return tree.nearest;
},{
	requires:['./kdTree','./cdnPoints']
});