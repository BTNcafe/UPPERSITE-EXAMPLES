CommunityExample.ArticleModel = CLASS({

	statics : function(cls) {'use strict';
		// 데이터 셋 검증
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
			},
			writer : {
				notEmpty : true,
				size : {
					max : 255
				}
			}
		};
	},

	preset : function() {'use strict';
		return CommunityExample.MODEL;
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
