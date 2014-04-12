//Originallly from:  yunqian@taobao.com https://github.com/sorrycc/webp-support/blob/master/lib/webp.js
//KISSY adapted From : https://github.com/kissygalleryteam/datalazyload/blob/master/1.0.1/plugin/webp.js

//为了保证对alpha类webp的完整兼容，这里修改了测试图片
//Ref : https://developers.google.com/speed/webp/faq#which_web_browsers_natively_support_webp
KISSY.add(function(S) {

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
 