global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(n,o){"use strict";var t,i,E,r,e,C,_,u,c,a=n.host,d=n.port,O=require("net"),S={},v=0,R="";CHECK_IS_DATA(o)!==!0?t=o:(t=o.success,i=o.error),c=function(n,o,t){var i=S[n];void 0!==i&&EACH(i,function(n){n(o,function(n){void 0!==u&&void 0!==t&&u({methodName:"__CALLBACK_"+t,data:n})})})},E=O.connect({host:a,port:d},function(){r=!0,t(C=function(n,o){var t=S[n];void 0===t&&(t=S[n]=[]),t.push(o)},_=function(n,o){var t=S[n];void 0!==t&&(void 0!==o?REMOVE({array:t,value:o}):delete S[n])},u=function(n,o){var t="__CALLBACK_"+v;n.sendKey=v,v+=1,E.write(STRINGIFY(n)+"\n"),void 0!==o&&C(t,function(n){o(n),_(t)})},function(){e=!0,E.end()})}),E.on("data",function(n){var o,t,i;for(R+=n.toString();-1!==(t=R.indexOf("\n"));)o=R.substring(0,t),i=PARSE_STR(o),void 0!==i&&c(i.methodName,i.data,i.sendKey),R=R.substring(t+1)}),E.on("close",function(){e!==!0&&c("__DISCONNECTED")}),E.on("error",function(n){var o=n.toString();r!==!0?(console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+o)),void 0!==i&&i(o)):c("__ERROR",o)})}});