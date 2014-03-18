CommunityExample.UserModel = CLASS({

	statics : function(cls) {'use strict';

		// valid data set
		cls.validDataSet = {
			username : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				},
				username : true
			},
			password : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				}
			},
			loginCount : {
				integer : true
			},
			lastLoginTime : {
				date : true
			}
		};

		// login valid data set
		cls.loginValidDataSet = {
			username : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				},
				username : true
			},
			password : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				}
			}
		};
	},

	preset : function() {'use strict';
		return CommunityExample.MODEL;
	},

	params : function(cls) {'use strict';

		return {
			name : 'User',
			config : {
				create : {
					valid : VALID(cls.validDataSet)
				},
				update : {
					valid : VALID(cls.validDataSet)
				}
			}
		};
	}
});
