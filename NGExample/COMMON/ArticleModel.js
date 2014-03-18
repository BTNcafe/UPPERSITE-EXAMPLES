NG.ArticleModel = CLASS({

	statics : function(cls) {'use strict';

		// 데이터 셋 검증
		cls.ValidDataSet = {
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
		return NG.MODEL;
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
