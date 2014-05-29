global.CONNS=CONNS=OBJECT({init:function(e,o,r){"use strict";var t,a,i,n=e.socketPack,d=[];r.addDisconnectListener=t=function(e){d.push(e)},n.on("connection",function(e){var o={};e.addListener("disconnect",function(){EACH(d,function(o){o(e.id)})}),e.emit("__CONNECTED",e.id),e.addListener("__ENTER_ROOM",function(r){void 0===o[r]?(e.join(r),o[r]=1):o[r]+=1}),e.addListener("__EXIT_ROOM",function(r){o[r]-=1,0===o[r]&&(e.leave(r),delete o[r])})}),r.emitToAllSockets=a=function(e){var o=e.fullURI,r=e.listenerName,t=e.data;CONNS.type.socketPack["in"](o).emit(r,t)},r.emitToAllWorkers=i=function(o){a(o),e.broadcastToAllWorkers({methodName:"emitToAllSockets",data:o})}}}),FOR_BOX(function(e){"use strict";OVERRIDE(e.MODEL,function(){e.MODEL=CLASS({init:function(o,r,t,a){var i,n,d,c,s,v,f,u,m,E,O,R,h,S,D,p,C,N,b,g,M,l,_,A=a.name,T=void 0===a.propertyNamesForNewEvent?[]:a.propertyNamesForNewEvent,k=a.config,U=e.DB(A),I=e.ROOM(A),x=e.ROOM(A+"/{id}");void 0!==k&&(i=k.create,n=k.getData,d=k.update,c=k.remove,s=k.findData,v=k.findDataSet,f=k.countDataSet,u=k.checkIsExists,void 0!==i&&(m=i.valid),void 0!==d&&(E=d.valid)),r.getCreateValid=O=function(){return m},r.getUpdateValid=R=function(){return E},i!==!1&&I.on("create",function(o,t,a,i){var n,d=void 0===m?void 0:m.check({data:t});void 0!==d&&d.checkHasError()===!0?i({hasError:!0,errors:d.getErrors()}):(n=function(){U.create(t,function(o,t){void 0!==o?i({hasError:!0,errorMsg:o}):(void 0!==r.afterCreate&&r.afterCreate(t),void 0!==r.afterCreateRoom&&r.afterCreateRoom({room:I,savedData:t,headers:a}),e.ROOMS(A+"/create").broadcast({methodName:"create",data:t}),EACH(T,function(o){var r=t[o];e.ROOMS(A+"/"+o+"/"+r+"/create").broadcast({methodName:"create",data:t})}),i({hasError:!1,savedData:t}))})},void 0===r.beforeCreateRoom?void 0!==r.beforeCreate?r.beforeCreate(t,{ret:i,proc:n})!==!1&&n():n():r.beforeCreateRoom({room:I,data:t,headers:a},{ret:i,proc:n}))}),d!==!1&&x.on("update",function(o,t,a,i){var n,d=o.id,c=void 0===E?void 0:E.check({data:t,isExceptUndefined:!0});t.id=d,void 0!==E&&c.checkHasError()===!0?i({hasError:!0,errors:c.getErrors()}):(n=function(){U.update(t,function(o,t){void 0!==o?i({hasError:!0,errorMsg:o}):(void 0!==t&&(void 0!==r.afterUpdate&&r.afterUpdate(t),void 0!==r.afterUpdateRoom&&r.afterUpdateRoom({room:x,savedData:t,headers:a}),e.ROOMS(A+"/"+d).broadcast({methodName:"update",data:t})),i({hasError:!1,savedData:t}))})},void 0===r.beforeUpdateRoom?void 0!==r.beforeUpdate?r.beforeUpdate(t,{ret:i,proc:n})!==!1&&n():n():r.beforeUpdateRoom({room:x,data:t,headers:a},{ret:i,proc:n})!==!1&&n())}),c!==!1&&x.on("remove",function(o,t,a,i){var n;n=function(){U.remove(t,function(o,n){void 0!==o?i({hasError:!0,errorMsg:o}):(void 0!==n&&(void 0!==r.afterRemove&&r.afterRemove(n),void 0!==r.afterRemoveRoom&&r.afterRemoveRoom({room:x,savedData:n,headers:a}),e.ROOMS(A+"/"+t).broadcast({methodName:"remove",data:n}),EACH(T,function(o){var r=n[o];e.ROOMS(A+"/"+o+"/"+r+"/remove").broadcast({methodName:"remove",data:n})})),i({hasError:!1,savedData:n}))})},void 0===r.beforeRemoveRoom?void 0!==r.beforeRemove?r.beforeRemove(t,{ret:i,proc:n})!==!1&&n():n():r.beforeRemoveRoom({room:roomForRemove,id:t,headers:a},{ret:i,proc:n})!==!1&&n()}),r.getDB=h=function(){return U},r.getRoom=S=function(){return I},i!==!1&&(t.create=D=function(o,t){var a,i=void 0===m?void 0:m.check({data:o});void 0!==i&&i.checkHasError()===!0?void 0!==t&&t({hasError:!0,errors:i.getErrors()}):(a=function(){U.create(o,function(o,a){void 0!==o?void 0!==t&&t({hasError:!0,errorMsg:o}):(void 0!==r.afterCreate&&r.afterCreate(a),e.ROOMS(A+"/create").broadcast({methodName:"create",data:a}),EACH(T,function(o){var r=a[o];e.ROOMS(A+"/"+o+"/"+r+"/create").broadcast({methodName:"create",data:a})}),void 0!==t&&t({hasError:!1,savedData:a}))})},void 0!==r.beforeCreate?r.beforeCreate(o,{ret:t,proc:a})!==!1&&a():a())}),n!==!1&&(t.getData=p=function(e,o){U.get(e,function(e,t){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0===r.getData||r.getData(t,o)!==!1)&&void 0!==o&&o({hasError:!1,savedData:t})})}),d!==!1&&(t.update=C=function(o,t){var a,i=void 0===E?void 0:E.check({data:o,isExceptUndefined:!0});void 0!==i&&i.checkHasError()===!0?void 0!==t&&t({hasError:!0,errors:i.getErrors()}):(a=function(){U.update(o,function(a,i){void 0!==a?void 0!==t&&t({hasError:!0,errorMsg:a}):(void 0!==i&&(void 0!==r.afterUpdate&&r.afterUpdate(i),e.ROOMS(A+"/"+o.id).broadcast({methodName:"update",data:i})),void 0!==t&&t({hasError:!1,savedData:i}))})},void 0!==r.beforeUpdate?r.beforeUpdate(o,{ret:t,proc:a})!==!1&&a():a())}),c!==!1&&(t.remove=N=function(o,t){var a;a=function(){U.remove(o,function(o,a){void 0!==o?void 0!==t&&t({hasError:!0,errorMsg:o}):(void 0!==a&&(void 0!==r.afterRemove&&r.afterRemove(a),e.ROOMS(A+"/"+a.id).broadcast({methodName:"remove",data:a}),EACH(T,function(o){var r=a[o];e.ROOMS(A+"/"+o+"/"+r+"/remove").broadcast({methodName:"remove",data:a})})),void 0!==t&&t({hasError:!1,savedData:a}))})},void 0!==r.beforeRemove?r.beforeRemove(o,{ret:t,proc:a})!==!1&&a():a()}),s!==!1&&(t.findData=b=function(e,o){void 0!==e&&void 0===o&&(o=e,e=void 0),U.get({filter:e},function(e,t){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0===r.findData||r.findData(t,o)!==!1)&&void 0!==o&&o({hasError:!1,savedData:t})})}),v!==!1&&(t.findDataSet=g=function(e,o){void 0!==e&&void 0===o&&(o=e,e=void 0),U.find(e,function(e,t){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0===r.findDataSet||r.findDataSet(t,o)!==!1)&&void 0!==o&&o({hasError:!1,savedDataSet:t})})}),f!==!1&&(t.countDataSet=M=function(e,o){void 0!==e&&void 0===o&&(o=e,e=void 0),U.count(e,function(e,t){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0===r.countDataSet||r.countDataSet(t,o)!==!1)&&void 0!==o&&o({hasError:!1,count:t})})}),u!==!1&&(t.checkIsExists=l=function(e,o){void 0!==e&&void 0===o&&(o=e,e=void 0),U.checkIsExists(e,function(e,t){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0===r.checkIsExists||r.checkIsExists(t,o)!==!1)&&void 0!==o&&o({hasError:!1,isExists:t})})}),n!==!1&&I.on("getData",function(e,o,r,t){p(o,t)}),s!==!1&&I.on("findData",function(e,o,r,t){b(o,t)}),v!==!1&&I.on("findDataSet",function(e,o,r,t){delete e.isFindAll,g(o,t)}),f!==!1&&I.on("countDataSet",function(e,o,r,t){M(o,t)}),u!==!1&&I.on("checkIsExists",function(e,o,r,t){l(o,t)}),r.getName=_=function(){return A}}})})}),FOR_BOX(function(e){"use strict";e.MODULE=METHOD({run:function(o,r){var t=__dirname+"/../..";return require(t+"/"+e.boxName+"/SERVER/node_modules/"+r)}})}),FOR_BOX(function(e){"use strict";e.REQUEST=METHOD({statics:function(e){e.funcs={},e.checkURI=function(o,r){var t=o.uri,a=o.paramStr,i=(o.ip,o.headers),n=o.method,d=r.response,c=r.serveErrorPage;return EACH(e.funcs,function(e,o){var r,s="",v=o,f={};return r=function(e){var o,r;return-1!==v.indexOf("{")&&-1!==v.indexOf("}")&&(r=v.substring(0,v.indexOf("{")),s+"/"===r)?(o=v.substring(v.indexOf("{")+1,v.indexOf("}")),v=r+e+v.substring(v.indexOf("}")+1),{name:o,value:e}):void 0},EACH(t.split("/"),function(e,o){var t=r(e);return void 0!==t&&(f[t.name]=t.value),0===o?s=e:s+="/"+e,s===v?!1:void 0}),t===v?(e(n,f,a,i,d,c),!1):void 0})===!1}},run:function(e,o,r){e.funcs[o]=r}})}),FOR_BOX(function(e){"use strict";e.REQUEST_JSON=METHOD({run:function(o,r,t){e.REQUEST.funcs[r]=function(e,o,r,a,i,n){var d,c=require("querystring");try{d=UNPACK_DATA(JSON.parse(c.parse(r).data))}catch(s){return void n()}return t(e,o,d,a,i,n)}}})}),FOR_BOX(function(e){"use strict";e.ROOM=CLASS({init:function(o,r,t,a){var i,n;t.on=i=function(o,r){e.REQUEST_JSON("__FOR_ROOM/"+a+"/"+o,function(e,o,t,a,i){a.socketId=t.socketId,r(o,t.data,a,function(e){i({content:JSON.stringify(CHECK_IS_DATA(e)===!0?PACK_DATA(e):e),contentType:"application/json",encoding:"utf-8"})})})},t.addDisconnectListener=n=function(e){CONNS.addDisconnectListener(e)}}})}),FOR_BOX(function(e){"use strict";e.ROOMS=CLASS({init:function(o,r,t,a){var i,n=e.boxName+"/"+a;t.broadcast=i=function(e){var o=e.methodName,r=CHECK_IS_DATA(e.data)===!0?PACK_DATA(e.data):e.data,t=n+"/"+o;CONNS.emitToAllWorkers({ns:n,listenerName:t,data:r})}}})}),global.SERVER_CONFIG=SERVER_CONFIG={dbName:"UPPERSITE-testdb",dbUsername:"test",dbPassword:"test",maxDataCount:1e3},global.TIME_SYNC=TIME_SYNC=OBJECT({init:function(){"use strict";var e=UPPERSITE.ROOM("timeSync");e.on("sync",function(e,o,r,t){var a=new Date,i=o.now;t({diff:i-a})})}});