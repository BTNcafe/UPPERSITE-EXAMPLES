CRUDExample.CommentModel = CLASS({

	statics : function(cls) {'use strict';

		// valid data set
		cls.validDataSet = {
			articleId : {
				notEmpty : true,
				id : true
			},
			content : {
				notEmpty : true,
				size : {
					max : 10000
				}
			}
		};
	},

	preset : function() {'use strict';
		return CRUDExample.MODEL;
	},

	params : function(cls) {'use strict';

		return {
			name : 'Comment',
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
