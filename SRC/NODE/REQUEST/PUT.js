/**
 * HTTP PUT request.
 */
global.PUT = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.isSecure
		//OPTIONAL: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//OPTIONAL: params.headers
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([params, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});
