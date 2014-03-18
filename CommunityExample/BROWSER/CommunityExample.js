CommunityExample.BoardExample = CLASS({

	preset : function() {'use strict';
		return NG.VIEW;
	},

	init : function(cls, inner, self, params) {'use strict';

		var
		// 페이지에서 사용될 아티클 모델 선언
		articleModel = CommunityExample.ArticleModel();

		articleModel.findDataSetWatching({
			sort : {
				createTime : -1
			}
		}, function(result, updateHandler, removeHandler, closeWatching) {

			var
			// array
			articleModelArray = [];

			if (result.hasError === false) {// 모델에서 데이터 얻는 과정 에러 체

				EACH(result.savedDataSet, function(data) {

					var
					// 모델에서 뷸러들인 시간데이터를 달력형식에 맞게 변환
					cal = CALENDAR(data.createTime);

					articleModelArray.push({
						id : data.id,
						title : data.title,
						content : data.content,
						writer : data.writer,
						date : cal.getYear() + '년 ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ',
						count : data.count
					});
				});

				self.apply(function() {
					self.articleModel = articleModelArray;
				});

				// 업데이트 핸들러
				updateHandler(data.id, function(savedData) {
					self.apply(function() {
						self.articleModel = articleModelArray;
					});
				});
			}
		});

		// 새글쓰기 버튼
		$('#writeArticle').bind('click', function() {
			$('#newArticle').modal('show');
		});

		// 내용 보기
		self.showContents = function(item, $event) {
			//console.log(item);

			// 모달 띄우기
			$('#showContent').modal('show');

			// 내용 입력해주기
			self.apply(function() {
				self.content = item.content;
				self.title = item.title;
			});

			// 조회수 올리기
			item.count = item.count + 1;
			// 이상한 오류나는 부분 어디서 해쉬키가 들어왔지?
			item.$$hashKey = null;
			console.log(item);
			articleModel.update(item, function(result) {
				console.log(result);
			});

		};

		// 아티클 모달의 저장버튼
		$('#formNewArticle').submit(function(event) {

			var
			// 아티클에 들어갈 데이터 모델 선언
			data = {};

			$.each($(this).serializeArray(), function(i, o) {
				data[o.name] = o.value;
			});
			// 글 저장자 저장
			data.writer = $('#writer').val();
			data.count = 0;

			// 아티클 모델에 데이터를 삽입함.
			articleModel.create(data, function(result) {
				if (result.hasError === false) {
					alert('Success.');
					// 모달 창 닫기
					self.apply(function() {
						self.articleModel = articleModelArray;
					});
				} else {
					alert(JSON.stringify(result.errors));
				}
			});
		});
	}
});

CommunityExample.LoginExample = CLASS({

	preset : function() {'use strict';
		return NG.VIEW;
	},

	init : function(cls, inner, self, params) {'use strict';

		var
		// user model
		userModel = LoginExample.UserModel();

		$('#newUserBtn').bind('click', function() {
			$('#newUser').modal('show');
		});

		$('#join').submit(function() {

			var
			// data
			data = {};

			$.each($(this).serializeArray(), function(i, o) {
				data[o.name] = o.value;
			});

			userModel.create(data, function(result) {

				if (result.hasError === false) {
					alert('Success, Try to Login');
				} else {
					alert(JSON.stringify(result.errors));
				}
			});
			// userModel.create

			return false;
		});
		// join submit

		// 로그인
		$('#login').submit(function() {

			var
			// data
			data = {};

			$.each($(this).serializeArray(), function(i, o) {
				data[o.name] = o.value;
			});

			userModel.login(data, function(result) {
				console.log(data);

				if (result.hasError === false) {
					self.apply(function() {
						self.signedUserData = data.username;
					});
					console.log(self);
					alert('Success!');
				} else {
					alert(JSON.stringify(result.errors));
				}
			});
			// usermodel login

			return false;
		});
		// login submit

		// 로그아웃
		$('#logout').submit(function() {
			self.apply(function() {
				console.log(self.signedUserData);
				self.signedUserData = null;
			});
		});
	}
});

