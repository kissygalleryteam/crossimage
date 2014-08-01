/**
 * @fileoverview
 * @author
 * @module crossimage
 **/
KISSY.add(function (S, Node,Base) {
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



