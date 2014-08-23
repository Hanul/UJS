/**
 * Input class
 */
global.INPUT = INPUT = CLASS(function(cls) {
	'use strict';

	var
	// focusing input ids
	focusingInputIds = [],

	// get focusing input ids.
	getFocusingInputIds;

	cls.getFocusingInputIds = getFocusingInputIds = function(id) {
		return focusingInputIds;
	};

	return {

		preset : function() {
			return DOM;
		},

		params : function() {
			return {
				tag : 'input'
			};
		},

		init : function(inner, self, params) {
			//OPTIONAL: params
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.isMultiple

			var
			// name
			name,

			// type
			type,

			// placeholder
			placeholder,

			// is multiple
			isMultiple,

			// get name.
			getName,

			// get value.
			getValue,

			// set value.
			setValue,

			// select.
			select,

			// focus.
			focus,

			// blur.
			blur,

			// toggle check.
			toggleCheck,

			// check is checked.
			checkIsChecked;

			// init params.
			if (params !== undefined) {
				name = params.name;
				type = params.type;
				placeholder = params.placeholder;
				isMultiple = params.isMultiple;
			}

			if (type !== undefined) {
				inner.setAttr({
					name : 'type',
					value : type
				});
			}

			if (type !== 'submit' && type !== 'reset') {

				if (name !== undefined) {
					inner.setAttr({
						name : 'name',
						value : name
					});
				}

				if (placeholder !== undefined) {
					inner.setAttr({
						name : 'placeholder',
						value : placeholder
					});
				}

				if (isMultiple === true) {
					inner.setAttr({
						name : 'multiple',
						value : isMultiple
					});
				}

				self.getName = getName = function() {
					return name;
				};

				self.getValue = getValue = function() {
					if (type === 'checkbox') {
						return self.getEl().checked;
					}
					return self.getEl().value;
				};

				self.select = select = function() {
					if (type === 'file') {
						self.getEl().click();
					} else {
						self.getEl().select();
					}
				};

				self.focus = focus = function() {
					self.getEl().focus();
				};

				self.blur = blur = function() {
					self.getEl().blur();
				};

				if (type === 'checkbox') {

					self.toggleCheck = toggleCheck = function(e) {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = true;
						}

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

						return self.getEl().checked;
					};

					self.checkIsChecked = checkIsChecked = function() {
						return self.getEl().checked;
					};

					EVENT({
						node : self,
						name : 'keyup'
					}, function(e) {
						if (e !== undefined && e.getKeyCode() === 32) {
							DELAY(function() {
								EVENT.fireAll({
									node : self,
									name : 'change'
								});
							});
						}
					});
				}
			}

			self.setValue = setValue = function(value) {
				//REQUIRED: value

				if (type === 'checkbox') {

					if (value === true) {

						if (self.getEl().checked !== true) {

							self.getEl().checked = true;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {

							self.getEl().checked = false;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {

						self.getEl().value = value;

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

					} else {
						self.getEl().value = value;
					}
				}
			};

			EVENT({
				node : self,
				name : 'focus'
			}, function() {
				getFocusingInputIds().push(self.id);
			});

			EVENT({
				node : self,
				name : 'blur'
			}, function() {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});

			self.on('remove', function() {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});
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

			if (value !== undefined) {

				if (type === 'checkbox') {

					if (value === true) {

						if (self.getEl().checked !== true) {
							self.getEl().checked = true;
						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {
						self.getEl().value = value;
					} else {
						self.getEl().value = value;
					}
				}
			}
		}
	};
});
