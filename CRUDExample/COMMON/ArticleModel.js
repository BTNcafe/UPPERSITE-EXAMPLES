CRUDExample.ArticleModel = CLASS({

	statics : function(cls) {'use strict';

		// valid data set
		cls.validDataSet = {
			title : {
				notEmpty : true,
				size : {
					max : 255
				}
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
			name : 'Article',
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
