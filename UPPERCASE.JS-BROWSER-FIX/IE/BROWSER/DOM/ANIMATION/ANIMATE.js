OVERRIDE(ANIMATE,function(){"use strict";global.ANIMATE=ANIMATE=METHOD({run:function(t,n){var i=t.node,o=t.keyframes,e=(t.duration,void 0===t.iterationCount?"":t.iterationCount);i.addStyle(o.getFinalStyle()),void 0===n||""!==e&&1!==e||DELAY(function(){n(i)})}})});