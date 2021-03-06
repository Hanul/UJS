/**
 * parse stringified value.
 */
global.PARSE_STR = METHOD({

	run : function(stringifiedValue) {
		'use strict';
		//REQUIRED: stringifiedValue

		var
		// value
		value;

		try {

			value = JSON.parse(stringifiedValue);

			return CHECK_IS_DATA(value) === true ? UNPACK_DATA(value) : value;

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});
