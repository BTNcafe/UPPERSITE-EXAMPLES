OVERRIDE(CommunityExample.UserModel, function(origin) {

	CommunityExample.UserModel = CLASS({

		preset : function() {
			return origin;
		},

		init : function(cls, inner, self, params) {

			var
			// login valid
			loginValid = VALID(origin.loginValidDataSet),

			// db
			db = inner.getDB(),

			// room
			room = CommunityExample.ROOM('User'),

			// before create room.
			beforeCreateRoom;

			inner.beforeCreateRoom = beforeCreateRoom = function(params, funcs) {

				var
				// data
				data = params.data,

				// proc
				proc = funcs.proc,

				// ret
				ret = funcs.ret,

				// username
				username = data.username,

				// password
				password = data.password;

				db.checkIsExists({
					username : username
				}, function(errorMsg, isExists) {

					if (errorMsg !== undefined) {

						ret({
							hasError : true,
							errorMsg : errorMsg
						});

					} else {

						if (isExists === true) {

							ret({
								hasError : true,
								errors : {
									username : {
										type : 'existed'
									}
								}
							});

						} else if (isExists === false) {

							data.loginCount = 0;

							data.password = SHA1({
								key : username,
								password : password
							});

							proc();
						}
					}
				});

				return false;
			};

			room.on('login', function(socketId, data, params, ip, headers, ret) {

				var
				// valid result
				validResult = loginValid.check({
					data : data
				}),

				// username
				username = data.username,

				// password
				password = data.password;

				if (validResult.checkHasError() === true) {

					ret({
						hasError : true,
						errors : validResult.getErrors()
					});

				} else {

					password = SHA1({
						key : username,
						password : password
					});

					db.findData({
						username : username,
						password : password
					}, function(errorMsg, savedData) {

						var
						// key
						key;

						if (errorMsg !== undefined) {

							ret({
								hasError : true,
								errorMsg : errorMsg
							});

						} else if (savedData === undefined) {

							ret({
								hasError : true,
								errors : {
									username : {
										type : 'login'
									}
								}
							});

						} else {

							savedData.lastLoginTime = new Date();
							savedData.loginCount += 1;

							db.updateDataSafely(savedData, function(errorMsg, savedData) {

								if (errorMsg === undefined) {

									if (inner.afterUpdate !== undefined) {
										inner.afterUpdate(savedData);
									}

									CommunityExample.ROOMS('User/' + savedData.id).broadcast({
										methodName : 'update',
										data : savedData
									});

									// 보안상 삭제
									delete savedData.password;

									ret({
										hasError : false,
										savedData : savedData
									});
								}
							});
						}
					});
				}
			});
		}
	});
});
