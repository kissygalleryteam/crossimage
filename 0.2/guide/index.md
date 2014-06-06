## CrossImage

CrossImage是一个天猫前端与核心系统部合作出品的插件。
它结合cdn的缩放参数和屏幕情况，自动加载最适合的图片，节省流程，提高用户体验，同时也降低了开发成本。

* 版本：0.2 <strong style="color:#A8AD42;">此版本已经开发完成，不会再有覆盖式发布，请安心使用 ^_^</strong>
* 下一版本计划：支持620x10000这种图片形式
* 作者：加里（茅晓锋）
* demo：[http://gallery.kissyui.com/crossimage/0.2/demo/index.html](http://gallery.kissyui.com/crossimage/0.2/demo/index.html)

## 完整文档

* [见内网](http://gitlab.alibaba-inc.com/cross/crossimage/blob/master/README.md)



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
 
