/*
 * remove folder.
 */
global.REMOVE_FOLDER = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs');

	return {

		run : function(pathOrParams, callbackOrHandlers) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path
			//OPTIONAL: pathOrParams.isSync
			//REQUIRED: callbackOrHandlers
			//REQUIRED: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error

			var
			// path
			path,

			// is sync
			isSync,

			// callback.
			callback,

			// not eixsts handler.
			notExistsHandler,

			// error handler.
			errorHandler;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				notExistsHandler = callbackOrHandlers.notExists;
				errorHandler = callbackOrHandlers.error;
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_IS_EXISTS_FILE(path, function(isExists) {

					if (isExists === true) {
						
						NEXT([
						function(next) {
							
							FIND_FILE_NAMES(path, function(fileNames) {
								
								PARALLEL(fileNames, [
								function(fileName, done) {
									REMOVE_FILE(path + '/' + fileName, done);
								},
								
								function() {
									next();
								}]);
							});
						},
						
						function(next) {
							return function() {
								
								FIND_FOLDER_NAMES(path, function(folderNames) {
									
									PARALLEL(folderNames, [
									function(folderName, done) {
										REMOVE_FOLDER(path + '/' + folderName, done);
									},
									
									function() {
										next();
									}]);
								});
							};
						},
						
						function(next) {
							return function() {
								
								fs.rmdir(path, function(error) {
		
									var
									// error msg
									errorMsg;
		
									if (error !== TO_DELETE) {
		
										errorMsg = error.toString();
		
										if (errorHandler !== undefined) {
											errorHandler(errorMsg);
										} else {
											SHOW_ERROR('[UJS-REMOVE_FOLDER] ERROR: ' + errorMsg);
										}
		
									} else {
		
										if (callback !== undefined) {
											callback();
										}
									}
								});
							};
						}]);

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							console.log(CONSOLE_YELLOW('[UJS-REMOVE_FOLDER] NOT EXISTS! <' + path + '>'));
						}
					}
				});
			}

			// when sync mode
			else {

				RUN(function() {

					var
					// error msg
					errorMsg;

					try {

						if (CHECK_IS_EXISTS_FILE({
							path : path,
							isSync : true
						}) === true) {
							
							FIND_FILE_NAMES({
								path : path,
								isSync : true
							}, EACH(function(fileName) {
								
								REMOVE_FILE({
									path : path + '/' + fileName,
									isSync : true
								});
							}));
							
							FIND_FOLDER_NAMES({
								path : path,
								isSync : true
							}, EACH(function(folderName) {
								
								REMOVE_FOLDER({
									path : path + '/' + folderName,
									isSync : true
								});
							}));
							
							fs.rmdirSync(path);

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								console.log(CONSOLE_YELLOW('[UJS-REMOVE_FOLDER] NOT EXISTS! <' + path + '>'));
							}

							// do not run callback.
							return;
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('[UJS-REMOVE_FOLDER] ERROR: ' + errorMsg);
							}
						}
					}

					if (callback !== undefined) {
						callback();
					}
				});
			}
		}
	};
});
