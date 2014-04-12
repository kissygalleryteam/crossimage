/*
combined files : 

gallery/crossimage/0.1/kdTree
gallery/crossimage/0.1/cdnPoints
gallery/crossimage/0.1/cdnNearest
gallery/crossimage/0.1/webp
gallery/crossimage/0.1/index

*/
/* 摘自github，用来支持KdTree */

/**
 * k-d Tree JavaScript - V 1.0
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

KISSY.add('gallery/crossimage/0.1/kdTree',function(){

  function Node(obj, dimension, parent) {
    this.obj = obj;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.dimension = dimension;
  }

  function kdTree(points, metric, dimensions) {

    var self = this;
    
    function buildTree(points, depth, parent) {
      var dim = depth % dimensions.length,
        median,
        node;

      if (points.length === 0) {
        return null;
      }
      if (points.length === 1) {
        return new Node(points[0], dim, parent);
      }

      points.sort(function (a, b) {
        return a[dimensions[dim]] - b[dimensions[dim]];
      });

      median = Math.floor(points.length / 2);
      node = new Node(points[median], dim, parent);
      node.left = buildTree(points.slice(0, median), depth + 1, node);
      node.right = buildTree(points.slice(median + 1), depth + 1, node);

      return node;
    }

    // Reloads a serialied tree
    function loadTree (data) {
      // Just need to restore the `parent` parameter
      self.root = data;

      function restoreParent (root) {
        if (root.left) {
          root.left.parent = root;
          restoreParent(root.left);
        }

        if (root.right) {
          root.right.parent = root;
          restoreParent(root.right);
        }
      }

      restoreParent(self.root);
    }
    
    // If points is not an array, assume we're loading a pre-built tree
    if (!Array.isArray(points)) loadTree(points, metric, dimensions);
    else this.root = buildTree(points, 0, null);

    // Convert to a JSON serializable structure; this just requires removing 
    // the `parent` property
    this.toJSON = function (src) {
      if (!src) src = this.root;
      var dest = new Node(src.obj, src.dimension, null);
      if (src.left) dest.left = self.toJSON(src.left);
      if (src.right) dest.right = self.toJSON(src.right);
      return dest;
    };

    this.insert = function (point) {
      function innerSearch(node, parent) {

        if (node === null) {
          return parent;
        }

        var dimension = dimensions[node.dimension];
        if (point[dimension] < node.obj[dimension]) {
          return innerSearch(node.left, node);
        } else {
          return innerSearch(node.right, node);
        }
      }

      var insertPosition = innerSearch(this.root, null),
        newNode,
        dimension;

      if (insertPosition === null) {
        this.root = new Node(point, 0, null);
        return;
      }

      newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
      dimension = dimensions[insertPosition.dimension];

      if (point[dimension] < insertPosition.obj[dimension]) {
        insertPosition.left = newNode;
      } else {
        insertPosition.right = newNode;
      }
    };

    this.remove = function (point) {
      var node;

      function nodeSearch(node) {
        if (node === null) {
          return null;
        }

        if (node.obj === point) {
          return node;
        }

        var dimension = dimensions[node.dimension];

        if (point[dimension] < node.obj[dimension]) {
          return nodeSearch(node.left, node);
        } else {
          return nodeSearch(node.right, node);
        }
      }

      function removeNode(node) {
        var nextNode,
          nextObj,
          pDimension;

        function findMax(node, dim) {
          var dimension,
            own,
            left,
            right,
            max;

          if (node === null) {
            return null;
          }

          dimension = dimensions[dim];
          if (node.dimension === dim) {
            if (node.right !== null) {
              return findMax(node.right, dim);
            }
            return node;
          }

          own = node.obj[dimension];
          left = findMax(node.left, dim);
          right = findMax(node.right, dim);
          max = node;

          if (left !== null && left.obj[dimension] > own) {
            max = left;
          }

          if (right !== null && right.obj[dimension] > max.obj[dimension]) {
            max = right;
          }
          return max;
        }

        function findMin(node, dim) {
          var dimension,
            own,
            left,
            right,
            min;

          if (node === null) {
            return null;
          }

          dimension = dimensions[dim];

          if (node.dimension === dim) {
            if (node.left !== null) {
              return findMin(node.left, dim);
            }
            return node;
          }

          own = node.obj[dimension];
          left = findMin(node.left, dim);
          right = findMin(node.right, dim);
          min = node;

          if (left !== null && left.obj[dimension] < own) {
            min = left;
          }
          if (right !== null && right.obj[dimension] < min.obj[dimension]) {
            min = right;
          }
          return min;
        }

        if (node.left === null && node.right === null) {
          if (node.parent === null) {
            self.root = null;
            return;
          }

          pDimension = dimensions[node.parent.dimension];

          if (node.obj[pDimension] < node.parent.obj[pDimension]) {
            node.parent.left = null;
          } else {
            node.parent.right = null;
          }
          return;
        }

        if (node.left !== null) {
          nextNode = findMax(node.left, node.dimension);
        } else {
          nextNode = findMin(node.right, node.dimension);
        }

        nextObj = nextNode.obj;
        removeNode(nextNode);
        node.obj = nextObj;

      }

      node = nodeSearch(self.root);

      if (node === null) { return; }

      removeNode(node);
    };

    this.nearest = function (point, maxNodes, maxDistance) {
      var i,
        result,
        bestNodes;

      bestNodes = new BinaryHeap(
        function (e) { return -e[1]; }
      );

      function nearestSearch(node) {
        var bestChild,
          dimension = dimensions[node.dimension],
          ownDistance = metric(point, node.obj),
          linearPoint = {},
          linearDistance,
          otherChild,
          i;

        function saveNode(node, distance) {
          bestNodes.push([node, distance]);
          if (bestNodes.size() > maxNodes) {
            bestNodes.pop();
          }
        }

        for (i = 0; i < dimensions.length; i += 1) {
          if (i === node.dimension) {
            linearPoint[dimensions[i]] = point[dimensions[i]];
          } else {
            linearPoint[dimensions[i]] = node.obj[dimensions[i]];
          }
        }

        linearDistance = metric(linearPoint, node.obj);

        if (node.right === null && node.left === null) {
          if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
            saveNode(node, ownDistance);
          }
          return;
        }

        if (node.right === null) {
          bestChild = node.left;
        } else if (node.left === null) {
          bestChild = node.right;
        } else {
          if (point[dimension] < node.obj[dimension]) {
            bestChild = node.left;
          } else {
            bestChild = node.right;
          }
        }

        nearestSearch(bestChild);

        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }

        if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
          if (bestChild === node.left) {
            otherChild = node.right;
          } else {
            otherChild = node.left;
          }
          if (otherChild !== null) {
            nearestSearch(otherChild);
          }
        }
      }

      if (maxDistance) {
        for (i = 0; i < maxNodes; i += 1) {
          bestNodes.push([null, maxDistance]);
        }
      }

      nearestSearch(self.root);

      result = [];

      for (i = 0; i < maxNodes; i += 1) {
        if (bestNodes.content[i][0]) {
          result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
        }
      }
      return result;
    };

    this.balanceFactor = function () {
      function height(node) {
        if (node === null) {
          return 0;
        }
        return Math.max(height(node.left), height(node.right)) + 1;
      }

      function count(node) {
        if (node === null) {
          return 0;
        }
        return count(node.left) + count(node.right) + 1;
      }

      return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
    };
  }

  // Binary heap implementation from:
  // http://eloquentjavascript.net/appendix2.html

  function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },

    pop: function() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },

    peek: function() {
      return this.content[0];
    },

    remove: function(node) {
      var len = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < len; i++) {
        if (this.content[i] == node) {
          // When it is found, the process seen in 'pop' is repeated
          // to fill up the hole.
          var end = this.content.pop();
          if (i != len - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node))
              this.bubbleUp(i);
            else
              this.sinkDown(i);
          }
          return;
        }
      }
      throw new Error("Node not found.");
    },

    size: function() {
      return this.content.length;
    },

    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n];
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
            parent = this.content[parentN];
        // Swap the elements if the parent is greater.
        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
          this.content[parentN] = element;
          this.content[n] = parent;
          // Update 'n' to continue at the new position.
          n = parentN;
        }
        // Found a parent that is less, no need to move it further.
        else {
          break;
        }
      }
    },

    sinkDown: function(n) {
      // Look up the target element and its score.
      var length = this.content.length,
          element = this.content[n],
          elemScore = this.scoreFunction(element);

      while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
              child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
              child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score)){
            swap = child2N;
          }
        }

        // If the element needs to be moved, swap it, and continue.
        if (swap != null) {
          this.content[n] = this.content[swap];
          this.content[swap] = element;
          n = swap;
        }
        // Otherwise, we are done.
        else {
          break;
        }
      }
    }
  };

  return kdTree;
},{
  attach: false,
  requires: []
});

/* CDN支持的尺寸格式*/
KISSY.add('gallery/crossimage/0.1/cdnPoints',function(){
	return [{w:16,h:16},{w:20,h:20},{w:24,h:24},{w:30,h:30},{w:32,h:32},{w:36,h:36},{w:40,h:40},{w:48,h:48},{w:50,h:50},{w:60,h:30},{w:60,h:60},{w:60,h:90},{w:64,h:64},{w:70,h:70},{w:70,h:1000},{w:72,h:72},{w:75,h:100},{w:80,h:40},{w:80,h:60},{w:81,h:65},{w:80,h:80},{w:80,h:1000},{w:88,h:88},{w:90,h:45},{w:90,h:60},{w:90,h:90},{w:90,h:135},{w:96,h:54},{w:100,h:50},{w:100,h:100},{w:100,h:150},{w:100,h:1000},{w:110,h:90},{w:110,h:110},{w:110,h:10000},{w:115,h:100},{w:120,h:60},{w:120,h:90},{w:120,h:120},{w:120,h:160},{w:125,h:125},{w:128,h:128},{w:130,h:130},{w:140,h:70},{w:140,h:100},{w:145,h:145},{w:150,h:150},{w:150,h:200},{w:150,h:10000},{w:160,h:80},{w:160,h:90},{w:160,h:160},{w:160,h:180},{w:160,h:240},{w:165,h:5000},{w:170,h:170},{w:170,h:10000},{w:170,h:120},{w:180,h:90},{w:180,h:180},{w:180,h:230},{w:190,h:43},{w:190,h:190},{w:200,h:100},{w:200,h:200},{w:210,h:140},{w:210,h:210},{w:210,h:1000},{w:220,h:220},{w:220,h:330},{w:220,h:5000},{w:220,h:10000},{w:240,h:5000},{w:230,h:87},{w:230,h:230},{w:234,h:234},{w:240,h:240},{w:240,h:10000},{w:250,h:225},{w:250,h:250},{w:264,h:100},{w:270,h:180},{w:270,h:270},{w:280,h:410},{w:290,h:290},{w:290,h:10000},{w:300,h:1000},{w:310,h:310},{w:300,h:300},{w:315,h:315},{w:320,h:320},{w:320,h:480},{w:336,h:336},{w:350,h:350},{w:350,h:1000},{w:360,h:360},{w:400,h:152},{w:400,h:400},{w:420,h:280},{w:430,h:430},{w:450,h:10000},{w:460,h:460},{w:468,h:468},{w:480,h:420},{w:480,h:480},{w:485,h:175},{w:490,h:330},{w:490,h:490},{w:500,h:450},{w:500,h:1000},{w:540,h:540},{w:560,h:370},{w:560,h:560},{w:560,h:840},{w:570,h:570},{w:570,h:10000},{w:580,h:580},{w:580,h:10000},{w:600,h:600},{w:620,h:10000},{w:640,h:480},{w:640,h:640},{w:660,h:440},{w:670,h:670},{w:720,h:720},{w:728,h:728},{w:760,h:760},{w:790,h:420},{w:790,h:10000},{w:960,h:960},{w:970,h:970},{w:10000,h:220},{w:10000,h:340},{w:10000,h:170},{w:10000,h:500}];
});



// 处理源数据，可以考虑挪到nodeJS中离线处理
// var cdnRawList = ["16x16","20x20","24x24","30x30","32x32","36x36","40x40","48x48","50x50","60x30","60x60","60x90","64x64","70x70","70x1000","72x72","75x100","80x40","80x60","81x65","80x80","80x1000","88x88","90x45","90x60","90x90","90x135","96x54","100x50","100x100","100x150","100x1000","110x90","110x110","110x10000","115x100","120x60","120x90","120x120","120x160","125x125","128x128","130x130","140x70","140x100","145x145","150x150","150x200","150x10000","160x80","160x90","160x160","160x180","160x240","165x5000","170x170","170x10000","170x120","180x90","180x180","180x230","190x43","190x190","200x100","200x200","210x140","210x210","210x1000","220x220","220x330","220x5000","220x10000","240x5000","230x87","230x230","234x234","240x240","240x10000","250x225","250x250","264x100","270x180","270x270","280x410","290x290","290x10000","300x1000","310x310","300x300","315x315","320x320","320x480","336x336","350x350","350x1000","360x360","400x152","400x400","420x280","430x430","440x440","450x10000","460x460","468x468","480x420","480x480","485x175","490x330","490x490","500x450","500x1000","540x540","560x370","560x560","560x840","570x570","570x10000","580x580","580x10000","600x600","620x10000","640x480","640x640","660x440","670x670","720x720","728x728","760x760","790x420","790x10000","960x960","970x970","10000x220","10000x340","10000x170","10000x500"];
// var CDNPair    = []; 
// (function(){
//     for(var i = 0 ; i <cdnRawList.length ; i++){
//         var item = cdnRawList[i];
//         var pair = item.split("x");
//         CDNPair.push({
//             w:pair[0],
//             h:pair[1]
//         });
//     }
// })();
// console.log(JSON.stringify(CDNPair));
//author: 加里 茅晓锋
//用kd-tree，从cdn参数集中获取最近的点
//Ref:http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B
KISSY.add('gallery/crossimage/0.1/cdnNearest',function(S,KdTree,cdnPoints) {

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
KISSY.add('gallery/crossimage/0.1/index',function (S,cdnNearest,WebpSupport) {

    var WEBPSUFFIX = "";
    WebpSupport.isSupport(function(isSupport){
        WEBPSUFFIX = isSupport ? "_.webp" : "";
    });

    function crossimage(config){
        var _self = this,
            defaultConfig = {
                quality : 90,
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
                var targetPair = cdnNearest({w:expectW, h : expectH} , 2);
                if(!targetPair || !targetPair[0]) return; //没找到合适的cdn尺寸
                cdnW = targetPair[0][0].w;
                cdnH = targetPair[0][0].h;

                finalSrc = rawSrc + "_@Wx@Hq@Q.jpg@WEBP".replace(/@W/i,cdnW).replace(/@H/i,cdnH).replace(/@Q/,_self.config.quality).replace(/@WEBP/,WEBPSUFFIX);
                obj.src = finalSrc;
            }catch(e){}
        }
        return adjustImage;
    }

    return crossimage;

}, {requires:['./cdnNearest', './webp']});







