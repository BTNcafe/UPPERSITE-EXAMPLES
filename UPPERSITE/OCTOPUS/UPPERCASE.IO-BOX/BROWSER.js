FOR_BOX(function(t){"use strict";t.STORE=CLASS({init:function(a,r,n,i){var u,o,e,O=STORE(t.boxName+"."+i);n.save=u=O.save,n.get=o=O.get,n.remove=e=O.remove}})}),FOR_BOX(function(t){"use strict";t.AJAX=METHOD({run:function(a,r,n){var i="/"+t.boxName+"/"+r.uri,u=r.method,o=r.paramStr,e=r.data;AJAX({uri:i,method:u,paramStr:o,data:e},n)}})}),FOR_BOX(function(t){"use strict";t.AJAX_JSON=METHOD({run:function(a,r,n){t.AJAX(r,function(t){var a=JSON.parse(t);n(CHECK_IS_DATA(a)===!0?UNPACK_DATA(a):a)})}})}),FOR_BOX(function(t){"use strict";t.DELETE=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX({uri:i,method:"DELETE",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.DELETE_JSON=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX_JSON({uri:i,method:"DELETE",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.GET=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX({uri:i,method:"GET",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.GET_JSON=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX_JSON({uri:i,method:"GET",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.POST=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX({uri:i,method:"POST",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.POST_JSON=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX_JSON({uri:i,method:"POST",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.PUT=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX({uri:i,method:"PUT",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.PUT_JSON=METHOD({run:function(a,r,n){var i=r.uri,u=r.paramStr,o=r.data;t.AJAX_JSON({uri:i,method:"PUT",paramStr:u,data:o},n)}})}),FOR_BOX(function(t){"use strict";t.GO=METHOD({run:function(a,r){location.href=t.HREF(r)}})}),FOR_BOX(function(t){"use strict";t.GO_NEW_WIN=METHOD({run:function(a,r){global.open(t.HREF(r))}})}),FOR_BOX(function(t){"use strict";t.HREF=METHOD({run:function(a,r){return HREF((t.boxName===CONFIG.defaultBoxName?"":t.boxName+"/")+r)}})}),FOR_BOX(function(t){"use strict";t.MATCH_VIEW=METHOD({run:function(a,r){var n,i,u=r.uris,o=r.target;EVENT({name:"hashchange"},RAR(function(){var a,r;a=location.hash.substring(1).split("/"),r="#__REFRESING"===location.hash?!0:EACH(u,function(r){var u,e,O=r.split("/"),c={};return e=function(){var r=EACH(a,function(r,n){var i=O[n];if(0===n&&t.boxName!==r&&void 0!==BOX.boxes[r])return u=!1,!1;if("**"===i)return u=!0,!1;if(void 0===i)return!1;if("{"===i.charAt(0)&&"}"===i.charAt(i.length-1))c[i.substring(1,i.length-1)]=r;else if(O[n]!==r&&"*"!==i)return!1;return a.length-1===n&&O.length-1>n&&""!==O[O.length-1]?!1:void 0});void 0===u&&(u=r)},t.boxName===CONFIG.defaultBoxName&&e(),u!==!0&&(O.unshift(t.boxName),e()),u===!0?(DELAY(function(){void 0===n?(n=o(),n.onChangeParams(c),o.lastView=n,i=c):CHECK_ARE_SAME_DATA_SET({data1:i,data2:c})!==!0&&(n.onChangeParams(c),i=c)}),!1):void 0}),r===!0&&void 0!==n&&(n.close(),n=void 0,o.lastView=void 0)}))}})}),FOR_BOX(function(t){"use strict";t.REFRESH=METHOD({run:function(a,r){var n=EVENT({name:"hashchange"},function(){t.GO(r),n.remove()});location.href="#__REFRESING"}})});