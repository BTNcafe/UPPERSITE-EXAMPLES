OVERRIDE(STORE,function(e){global.STORE=STORE=CLASS({preset:function(){return e},init:function(e,t,n){var o,i,r,s=t.genFullKey;n.save=o=function(e){var t,n=e.key,o=e.value,i=e.isToSession;i===!0?t=0:(t=new Date,t.setDate(t.getDate()+356)),document.cookie=s(n)+"="+encodeURIComponent(JSON.stringify(o))+"; path=/; expires="+t.toGMTString()+";"},n.get=i=function(e){var t,n,o,i,r=document.cookie;return e=s(e)+"=",n=r.indexOf(e),r&&n>=0&&(o=r.substring(n,r.length),i=o.indexOf(";"),t=i>0?o.substring(e.length,i):o.substring(e.length)),void 0===t?void 0:JSON.parse(decodeURIComponent(t))},n.remove=r=function(e){var t;t=new Date,t.setDate(t.getDate()-1),document.cookie=s(e)+"=; path=/; expires="+t.toGMTString()+";"}}})});