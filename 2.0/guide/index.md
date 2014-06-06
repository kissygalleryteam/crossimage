## CrossImage

CrossImage是一个天猫前端与核心系统部合作出品的插件。
它结合cdn的缩放参数和屏幕情况，自动加载最适合的图片，节省流程，提高用户体验，同时也降低了开发成本。

* 版本：1.1 <strong style="color:#A8AD42;">此版本已经开发完成，不会再有覆盖式发布，请安心使用 ^_^</strong>
* 作者：加里（茅晓锋）
* demo：[http://gallery.kissyui.com/crossimage/1.1/demo/index.html](http://gallery.kissyui.com/crossimage/1.1/demo/index.html)
* 备用demo：[http://ottomao.github.io/crossimage/1.1/demo/](http://ottomao.github.io/crossimage/1.1/demo/) gallery常会挂掉，你懂的
* Change Log:
  * **[升级用户请关注]修改了crossimage-ignore相关属性的名称**
  * **[升级用户请关注]adjustImage的参数API做了修改**
  * 新增对Wx10000这种只处理一条边长的图片进行支持
  * 为组件增加单元测试 


## 完整文档
* [见内网](http://gitlab.alibaba-inc.com/cross/crossimage/blob/master/README.md)


## 调整图片URL

### smartAdjustImgUrl 【荐】
  * 根据需要显示的图片宽高，自动结合屏幕参数等信息，处理URL

    ```javascript
     Crossimage.smartAdjustImgUrl(srcUrl,showW,showH,{
       quality:50,         //选填，支持的图片压缩参数：95,90,75,50,30
       ignoreHeight:true,  //选填，是否忽略高度，只处理宽度，类似lazyload中的crossimage-widthOnly
       ignoreWidth:false   //选填，是否忽略宽度
     }]);
    ```

### adjustImgUrl
  * 根据需要下载的图片宽高和自定义Q参数，处理URL。注意，此方法不涉及ppi和图像尺寸的自动适配，仅作为CDN参数拼装用。

  ```javascript
   Crossimage.adjustImgUrl(srcUrl,finalW,finalH,{
     quality:50,           //此方法中，quality必填，其余选填
     ignoreHeight:true,
     ignoreWidth:false 
   }]);
  ```

###  Sample:
  * 更多sample，详见[demo](http://gallery.kissyui.com/crossimage/1.1/demo/index.html)

  ```javascript
   S.use('gallery/crossimage/1.1/', function (S, Crossimage) {

     var srcUrl = "http://gi2.md.alicdn.com/bao/uploadedi4/1804033223/T2nFegXFVaXXXXXXXX_!!1804033223.jpg",
         finalUrl;
         
     finalUrl = Crossimage.smartAdjustImgUrl(srcUrl,120,120);
   });
  ```

## 作为DataLazyload插件使用
### Step 1. img标签的规范

   * 针对需要lazy-load的图片，必须申明```width```和```heigth```属性
   
   ```html
   <img data-ks-lazyload="http://gi1.md.alicdn.com/bao/uploadedi4/761178460/T21k.JXqdaXXXXXXXX_!!761178460.jpg" width="150" height="150" />      
   ```

   * 如只需处理宽度或者高度，另一条边等比缩放，即类似 300x10000.jpg 这样的形式，可以声明 ```crossimage-widthOnly``` 或 ```crossimage-heightOnly```属性

   ```html
   <img crossimage-widthOnly data-ks-lazyload="http://gi2.md.alicdn.com/bao/uploadedi4/1804033223/T2nFegXFVaXXXXXXXX_!!1804033223.jpg" width="150"alt="测试图片"/>
   <img crossimage-heightOnly data-ks-lazyload="http://gi2.md.alicdn.com/bao/uploadedi4/1804033223/T2nFegXFVaXXXXXXXX_!!1804033223.jpg" height="150" alt="测试图片"/>
   ```

   * 如需跳过某些图片的自动适配，可以申明```crossimage-ignore```属性，组件将不处理这张图片
   ```html
   <img crossimage-ignore data-ks-lazyload="http://gi2.md.alicdn.com/bao/uploadedi4/1804033223/T2nFegXFVaXXXXXXXX_!!1804033223.jpg" width="150" height="150" alt="测试图片"/>
   ```

### Step 2. 引入DataLazyload和crossImage，把crossImage配置为DataLazyload的onStart参数
   * Sample

   ```javascript
   S.use('gallery/datalazyload/1.0.1/,gallery/crossimage/1.1/', function (S,DataLazyload, Crossimage) {

      //方法A 使用默认配置
      var conf = {};
      conf.onStart = new Crossimage.DatalazyPlugin();
      new DataLazyload("#containerA",conf);

      //方法B 附带配置参数
      var conf = {};
      conf.onStart = new Crossimage.DatalazyPlugin({
          quality:75,
          userPPI:2,
          debug:false
      });
      new DataLazyload("#containerB",conf);
   });
    
   ```

   * 配置说明
     * 默认质量参数为90，即```_q90.jpg```
     * 默认PPI为```window.devicePixelRatio || 1```，可以通过设置```userPPI```覆盖
     * webp检测会自动开启，无法关闭。如果你认为webp的引入影响了业务运作，可以联系作者讨论。
     * 开启debug参数可以打印一些调试信息

   * 无论原src带了何种参数后缀，都会被忽略并重新处理
   * 这里的api和0.1版稍有不同，请升级用户关注
   * 其他问题：请联系作者 xiaofeng.mxf@taobao.com

 <script>
 var _hmt = _hmt || [];
 (function() {
   var hm = document.createElement("script");
   hm.src = "//hm.baidu.com/hm.js?e058a9aa67ba94a08182c3719a474d68";
   var s = document.getElementsByTagName("script")[0]; 
   s.parentNode.insertBefore(hm, s);
 })();
 </script>
