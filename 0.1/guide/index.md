## CrossImage

CrossImage是一个天猫前端与核心系统部合作出品的插件。
它结合cdn的缩放参数和屏幕情况，自动加载最适合的图片，节省流程，提高用户体验，同时也降低了开发成本。

* 版本：0.2 <strong style="color:#A8AD42;">此版本已经开发完成，不会再有覆盖式发布，请安心使用 ^_^</strong>
* 下一版本计划：支持620x10000这种图片形式
* 作者：加里（茅晓锋）
* demo：[http://gallery.kissyui.com/crossimage/0.2/demo/index.html](http://gallery.kissyui.com/crossimage/0.2/demo/index.html)


## 相关背景

   * 我大阿里CDN提供了图片的压缩和裁剪功能，如在图片最后加上 ```_200x200.jpg``` 可以把压缩图片到200x200，加上 ```_q90.jpg``` 按90%的质量进行jpg有损压缩。对应的参数表见[内网TFS百科](http://baike.corp.taobao.com/index.php/CS_RD/tfs/http_server#.E5.B0.BA.E5.AF.B8.E7.94.B3.E8.AF.B7.E6.B5.81.E7.A8.8B)
   * 为了防止运营填写不合规的图片，很多同学会有意在HTML模板里为图片拼上 ```_50x50q90.jpg``` 这样的后缀。但CDN尺寸参数众多，哪个才是最佳？
   * ipad / Retina Macbook / 各种移动端 ，屏幕PPI不一致。高清化的场景下，需要图片自动适配？
   * 想尝试高性价比的[webp图片](https://developers.google.com/speed/webp/)，还要担心兼容性？能不能根据浏览器环境全自动？
   * 这时候，天猫前端与核心系统部合作出品```cross image```组件。它力求能在跨终端的场景下完成图片适配，并降低前端同学的开发成本。
   
## 功能和原理

   * 插件内置了所有CDN支持的参数列表，会将用户的期望尺寸、屏幕参数、CDN参数进行匹配，找到最合适的尺寸后缀

   * [DataLazyload](gallery.kissyui.com/datalazyload/1.0.1/guide/index.html)插件功能
     * 在DataLazyload ```onStart```事件中安插函数，在图片加载前干预url
     * 【尺寸适配】根据图片的宽高和CDN支持的参数列表，添加最合适的图片后缀
     * 【PPI调整】根据屏幕PPI值，自动调整图片尺寸和q参数。
     * 【Webp】自动探测浏览器的webp兼容性，兼容的情况下将自动引入webp图片，节省流量
     * 【url容错】针对运营同学复制url引发的后缀重复定义（如 _q90.jpg_q90.jpg），会自动容错。

   * 如果图片url是HTML同步输出在页面上，不是通过lazyload引入，怎么处理？
     * JS组件不适合这种场景
     * 我们正在着手处理，不久以后就会有通用方案面世。敬请期待！

## DataLazyload插件API
   * 针对需要lazy-load的图片，必须申明```width```和```heigth```属性
   
   ```
   <img data-ks-lazyload="http://gi1.md.alicdn.com/bao/uploadedi4/761178460/T21k.JXqdaXXXXXXXX_!!761178460.jpg" width="150" height="150" />      
   ```
   * 如果需要crossImage跳过某些图片的自动适配，申明```ignore-crossimage```属性
   
   ```
   <img ignore-crossimage data-ks-lazyload="http://gi1.md.alicdn.com/bao/uploadedi4/761178460/T21k.JXqdaXXXXXXXX_!!761178460.jpg" width="150" height="150" alt="这张图片不会被crossImage干预"/>      
   ```

   * 引入DataLazyload和crossImage，把crossImage配置为DataLazyload的onStart参数
   
    
   ```
   S.use('gallery/datalazyload/1.0.1/,gallery/crossimage/0.2/', function (S,DataLazyload, Crossimage) {

      //方法一 使用默认配置
      var conf = {};
      conf.onStart = new Crossimage.DatalazyPlugin(); //这个api和0.1版不一致
      new DataLazyload("#containerA",conf);

      //方法二 附带配置参数
      var conf = {};
      conf.onStart = new Crossimage.DatalazyPlugin({
          quality:75,
          userPPI:2,
          debug:true //开启debug,会输出相关信息
      });
      new DataLazyload("#containerB",conf);
   });
    
   ```

   * 配置说明
     * 默认质量参数为90，即```_q90.jpg```
     * 默认PPI为```window.devicePixelRatio || 1```，可以通过设置```userPPI```覆盖
     * webp检测会自动开启，无法关闭。如果你认为webp的引入影响了业务，可以联系作者。
     * 开启debug参数可以打印一些调试信息

   * 无论原src带了何种参数后缀，都会被忽略并重新处理
   * 其他问题：请联系作者 xiaofeng.mxf@taobao.com

## 自行处理图片URL
   ```
    Crossimage.adjustImgUrl(srcUrl,expectW,exptectH[,quality])

   ```

   ```
    S.use('gallery/crossimage/0.2/', function (S, Crossimage) {

        //处理规则和dataLazyload的插件一致
        var srcUrl = "http://gi2.md.alicdn.com/bao/uploadedi4/1804033223/T2nFegXFVaXXXXXXXX_!!1804033223.jpg",
            finalUrl;

        finalUrl = Crossimage.adjustImgUrl(srcUrl,800,800);
        console.log("my new url : " + finalUrl)
    });
   ```
 
## 图片流量测试数据

### 测试用原图
  
* 17.4M，60张，平均290k
* 图片类型大都是商品图片
* 目标显示尺寸300x300，高清屏下载600x600

### 测试结果
* 不加q参数，300x300
  * jpg 3.8M
  * webp 2.3M

* q90,300x300 
  * jpg 1.8M - <strong style="color:red">普通屏幕+jpg默认方案</strong>
  * webp 1.3M - <strong style="color:red">普通屏幕+webp默认方案</strong>

* q50,600x600
  * jpg 2.6M - <strong style="color:red">高清屏+jpg默认方案</strong>
  * webp 1.7M

* q75,600x600
  * jpg 3.7M
  * webp 2.3M - <strong style="color:red">高清屏+webp默认方案</strong>

* q90,600x600
  * jpg 5.5M
  * webp 3.5M


## “最合适的尺寸”是如何计算的？
 * 期望值(称为expect_x , expect_y) = img标签上申明的尺寸（width 和 height) * ppi
 * 将CDN支持的缩放参数列表称为CDN_x , CDN_y
 * 期望值与CDN参数的最相似匹配原则
   * 从CDN参数列表中，找出宽度、高度均大于等于期望值的参数，形成候选集
   * 对于上述候选集中的元素，逐一与期望尺寸进行距离计算。考虑到CDN的等比压缩特性，距离函数定义为 min( CDN_x - expect_x , CDN_y - expect_y )
   * 距离值最小的CDN参数即为最合适的匹配值
   * 如果有多个尺寸的距离值均为最小，取[曼哈顿距离](http://zh.wikipedia.org/zh/%E6%9B%BC%E5%93%88%E9%A0%93%E8%B7%9D%E9%9B%A2)最小的点即可
 * 若无法匹配，则不对尺寸进行处理（只进行webp/质量参数压缩等操作）


<script>
 console.log("aa");
</script>

