NG.MAIN = METHOD({

	run : function(m, param) {'use strict';

		// 아티클 모델 초기화
		NG.ArticleModel();
		// 댓글 모델 초기
		NG.CommentModel();
	}
});
