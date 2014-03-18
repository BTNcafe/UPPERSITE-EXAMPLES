CommunityExample.MAIN = METHOD({

	run : function(m, params) {'use strict';

		// init article model.
		CommunityExample.ArticleModel();
		CommunityExample.CommentModel();
		CommunityExample.UserModel();
	}
});
