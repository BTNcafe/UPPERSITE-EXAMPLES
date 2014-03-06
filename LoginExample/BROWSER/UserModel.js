OVERRIDE(LoginExample.UserModel, function(origin) {

	LoginExample.UserModel = CLASS({

		preset : function() {
			return origin;
		},

		init : function(cls, inner, self) {

			var
			// login valid
			loginValid = VALID(origin.loginValidDatas),

			// room
			room = inner.getRoom();

			self.login = login = function(data, callback) {

				var
				// valid result
				validResult = loginValid.check({
					data : data
				});

				if (validResult.checkHasError() === true) {

					if (callback !== undefined) {
						callback({
							hasError : true,
							errors : validResult.getErrors()
						});
					}

				} else {

					room.post({
						methodName : 'login',
						data : data
					}, function(result) {

						var
						// saved data
						savedData = result.savedData;

						callback(result);
					});
				}
			};
		}
	});
});
