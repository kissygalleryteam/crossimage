KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('crossimage', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

    /*
    把不带参数的原始src找出来
    原始图片形式可能包括：
    http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_q75.jpg
    http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_180x180q75.jpg_180x180q75.jpg_180x180q75.jpg
    http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png
    http://gtms03.alicdn.com/tps/i3/T1z58XFQpdXXas_LZH-1190-380.png_.webp
    */

},{requires:['node','gallery/crossimage/0.1/']});