KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('crossimage', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/crossimage/0.1/']});