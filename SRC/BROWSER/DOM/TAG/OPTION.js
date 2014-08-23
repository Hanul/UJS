/**
 * Option class
 */
global.OPTION = OPTION = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'option'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.value

		var
		// get value.
		getValue,

		// set value.
		setValue;

		self.getValue = getValue = function() {
			return self.getEl().value;
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			self.getEl().value = value;
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value

		var
		// value
		value;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		if (value === undefined) {
			self.setValue('');
		} else {
			self.setValue(value);
		}
	}
});
