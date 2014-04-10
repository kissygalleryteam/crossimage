/*
combined files : 

gallery/crossimage/0.1/index
gallery/crossimage/0.1/mini

*/
/**
 * @fileoverview 
 * @author 加里（茅晓锋）<xiaofeng.mxf@taobao.com>
 * @module crossimage
 **/
KISSY.add('gallery/crossimage/0.1/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Crossimage
     * @constructor
     * @extends Base
     */
    function Crossimage(comConfig) {
        var self = this;
        //调用父类构造函数
        Crossimage.superclass.constructor.call(self, comConfig);
    }
    S.extend(Crossimage, Base, /** @lends Crossimage.prototype*/{

    }, {ATTRS : /** @lends Crossimage*/{

    }});
    return Crossimage;
}, {requires:['node', 'base']});




/**
 * @fileoverview 
 * @author 加里（茅晓锋）<xiaofeng.mxf@taobao.com>
 * @module crossimage
 **/
KISSY.add('gallery/crossimage/0.1/mini',function(S, Component) {

  return Component;

}, {
  requires: ["./index"]
});
