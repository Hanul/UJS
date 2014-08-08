/**
 * check is exists value in data or array.
 */
global.CHECK_IS_IN = CHECK_IS_IN = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.data
		//OPTIONAL: params.array
		//REQUIRED: params.value

		var
		// data
		data = params.data,

		// array
		array = params.array,

		// value
		value = params.value;

		if (data !== undefined) {
			return EACH(data, function(_value, name) {
				if (_value === value) {
					return false;
				}
			}) !== true;
		}

		if (array !== undefined) {
			return EACH(data, function(_value, key) {
				if (_value === value) {
					return false;
				}
			}) !== true;
		}
	}
});
