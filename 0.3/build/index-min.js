/*!build time : 2014-05-09 11:05:51 AM*/
KISSY.add("gallery/crossimage/0.3/cdnPoints",function(){for(var a={general:[],ignoreHeight:[],ignoreWidth:[]},b=[{w:80,h:40},{w:60,h:30},{w:81,h:65},{w:110,h:90},{w:24,h:24},{w:30,h:30},{w:40,h:40},{w:60,h:60},{w:70,h:70},{w:80,h:80},{w:100,h:100},{w:110,h:110},{w:120,h:120},{w:160,h:160},{w:170,h:170},{w:210,h:210},{w:250,h:250},{w:310,h:310},{w:430,h:430},{w:670,h:670},{w:620,h:1e4},{w:150,h:200},{w:120,h:160},{w:75,h:100},{w:160,h:90},{w:96,h:54},{w:120,h:90},{w:80,h:60},{w:128,h:128},{w:90,h:90},{w:32,h:32},{w:64,h:64},{w:100,h:150},{w:90,h:135},{w:60,h:90},{w:450,h:1e4},{w:170,h:1e4},{w:350,h:1e3},{w:210,h:1e3},{w:220,h:1e4},{w:1e4,h:220},{w:400,h:400},{w:115,h:100},{w:790,h:1e4},{w:480,h:420},{w:460,h:460},{w:480,h:480},{w:180,h:230},{w:790,h:420},{w:300,h:1e3},{w:500,h:1e3},{w:70,h:1e3},{w:80,h:1e3},{w:100,h:1e3},{w:640,h:480},{w:200,h:200},{w:1e4,h:340},{w:1e4,h:170},{w:290,h:1e4},{w:580,h:1e4},{w:420,h:280},{w:660,h:440},{w:290,h:290},{w:1e4,h:500},{w:90,h:60},{w:170,h:120},{w:210,h:140},{w:490,h:330},{w:220,h:330},{w:280,h:410},{w:110,h:1e4},{w:16,h:16},{w:570,h:570},{w:150,h:1e4},{w:48,h:48},{w:72,h:72},{w:570,h:1e4},{w:145,h:145},{w:240,h:1e4},{w:20,h:20},{w:36,h:36},{w:230,h:230},{w:240,h:240},{w:130,h:130},{w:270,h:180},{w:180,h:180},{w:350,h:350},{w:230,h:87},{w:400,h:152},{w:264,h:100},{w:90,h:45},{w:88,h:88},{w:125,h:125},{w:234,h:234},{w:270,h:270},{w:300,h:300},{w:315,h:315},{w:320,h:320},{w:336,h:336},{w:360,h:360},{w:468,h:468},{w:490,h:490},{w:540,h:540},{w:560,h:560},{w:580,h:580},{w:600,h:600},{w:640,h:640},{w:720,h:720},{w:728,h:728},{w:760,h:760},{w:960,h:960},{w:970,h:970},{w:220,h:220},{w:190,h:190},{w:485,h:175},{w:500,h:450},{w:250,h:225},{w:560,h:840},{w:190,h:43},{w:320,h:480},{w:560,h:370},{w:180,h:180},{w:50,h:50},{w:160,h:240},{w:160,h:180},{w:140,h:100}],c=0;c<b.length;c++){var d=b[c];1e4==d.h?a.ignoreHeight.push(d):1e4==d.w?a.ignoreWidth.push(d):a.general.push(d)}return a}),KISSY.add("gallery/crossimage/0.3/cdnNearest",function(a,b){var c=function(a,b){return Math.min(Math.abs(a.w-b.w),Math.abs(a.h-b.h))},d=function(a,b){return Math.abs(a.w-b.w)+Math.abs(a.h-b.h)};return function(a){if(a&&(a.w||a.h)){var e={w:0,h:0};if(a&&(a.ignoreWidth||a.ignoreHeight))for(var f=a.ignoreWidth?a.h:a.w,g=a.ignoreWidth?"h":"w",h=a.ignoreWidth?b.ignoreWidth:b.ignoreHeight,i=1e6,j=0;j<h.length;j++){var k=h[j],l=k[g];l>=f&&i>l-f&&(i=l-f,e=k)}else for(var m=b.general,i=1e6,n=1e6,j=0;j<m.length;j++){var o=m[j];if(o.w>=a.w&&o.h>=a.h){var p=c(o,a),q=d(o,a);i>=p?(i=p,n=q,e=o):p==i&&n>q&&(n=q,e=o)}}return e.w&&e.h?e:null}}},{requires:["./cdnPoints"]}),KISSY.add("gallery/crossimage/0.3/webp",function(){return function(){function a(a){if(!window.chrome&&!window.opera)return void a(!1);var c=window.localStorage&&window.localStorage.getItem("webpsupport");return null!==c?void a("true"===c):void b(function(b){window.localStorage&&window.localStorage.setItem("webpsupport",b),a(b)})}function b(a){var b=new Image;b.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",b.onload=b.onerror=function(){a(b.width>0&&b.height>0)}}this.WebP||(this.WebP={},WebP.isSupport=function(b){return b?void 0===WebP._isSupport?void a(function(a){b(WebP._isSupport=a)}):void b(WebP._isSupport):void 0})}(),window.WebP},{attach:!1,requires:[]}),KISSY.add("gallery/crossimage/0.3/index",function(a,b,c){function d(a,b){var d;a?(d=a,b&&b(d)):(d=h,window.devicePixelRatio>1?c.isSupport(function(a){d=a?j:i,b&&b(d)}):b&&b(d))}function e(a,c,e,f){if(!a||!c&&!e)return a;var i;f&&f.quality?i=f.quality:(i=h,d(null,function(a){i=a}));var j,k,l,m=a.replace(/_\d+x\d+(q\d+)?\.jpg/g,"").replace(/_q\d+\.jpg/g,"").replace(/_\.webp/,""),n=f&&f.ignoreWidth,o=f&&f.ignoreHeight,p=b({w:c,h:e,ignoreWidth:n,ignoreHeight:o});return p&&p.w&&p.h?(k=p.w,l=p.h,j=m+"_@Wx@Hq@Q.jpg@WEBP".replace(/@W/i,k).replace(/@H/i,l).replace(/@Q/,i).replace(/@WEBP/,g)):j=m+"_q@Q.jpg@WEBP".replace(/@Q/,i).replace(/@WEBP/,g),j}function f(b){function c(a){if(a.elem&&a.src&&/http/.test(a.src)&&!a.elem.hasAttribute("crossimage-ignore")){if(a.elem.hasAttribute("crossimage-widthOnly")){if(!a.elem.hasAttribute("width"))return}else if(a.elem.hasAttribute("crossimage-heightOnly")){if(!a.elem.hasAttribute("height"))return}else if(!a.elem.hasAttribute("height")||!a.elem.hasAttribute("width"))return;try{var b,c=a.elem,d=c.getAttribute("width")*f.config.userPPI,g=c.getAttribute("height")*f.config.userPPI,h=a.src;b=e(h,d,g,{quality:f.config.quality,ignoreWidth:a.elem.hasAttribute("crossimage-heightOnly"),ignoreHeight:a.elem.hasAttribute("crossimage-widthOnly")}),a.src=b,f.config&&f.config.debug&&console}catch(i){}}}var f=this,g={quality:h,userPPI:window.devicePixelRatio||1};return f.config=a.merge(g,b),b&&b.quality||d(void 0,function(a){f.config.quality=a}),c}var g="",h=90,i=50,j=75;return c.isSupport(function(a){g=a?"_.webp":""}),{DatalazyPlugin:f,adjustImgUrl:e}},{requires:["./cdnNearest","./webp"]});