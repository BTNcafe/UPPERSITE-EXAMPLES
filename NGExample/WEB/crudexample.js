var
// 페이지에서 사용할 아티클 모델 선언
articleModel = NG.ArticleModel();
console.log(articleModel);
var
// 페이지에서 사용할 댓글 모델 선언
commentModel = NG.CommentModel();
var
// 댓글 모달을 닫을 경우 실행할 함수
commentModalClose = function() {
	$('#commentContents').html('');
};
var
// 수정 모달을 닫을 경우 실행할 함수
modifyModalClose = function() {
	$('#contents').html('');
};
// 아티클 모델에서 데이터를 읽어들이고 감시함
articleModel.findDataSetWatching({
	sort : {
		createTime : -1
	}
}, function(result, updateHandler, removeHandler, closeWatching) {

	if (result.hasError === false) {// 모델에서 데이터를 얻는 과정에서 발생하는 에러 체크

		EACH(result.savedDataSet, function(data) {

			var
			// 모델에서 뷸러들인 시간데이터를 달력형식에 맞게 변환
			cal = CALENDAR(data.createTime);
			// 테이블에 모델에서 가져온 데이터를 채워넣음.
			$('tbody').append('<tr id=' + data.id + '>');
			$('#' + data.id).append('<td class=title>' + data.title + '</td>');
			$('#' + data.id).append('<td class=content>' + data.content + '</td>');
			$('#' + data.id).append('<td class=time>' + cal.getYear() + '년 ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ' + '</td>');
			$('#' + data.id).append('<td class=modify><button class="btn btn-primary btn-small" data-toggle="modal" data-target="#modifyModal" type=submit>수정 </button></td>');
			$('#' + data.id + '> .modify > button').bind("click", function() {
				modifyContents(data);
				// 컨텐츠 수정버튼을 클릭할 경우 데이터 아이디를 모달에 넘겨줌.
				$('#contentUpdate').bind("click", function() {
					contentsUpdate(data.id);
				});
			});
			$('#' + data.id).append('<td class=delete><button class="btn btn-primary btn-small" type=submit onClick="javascript:deleteContents(\'' + data.id + '\')">삭제 </button></td>');
			$('#' + data.id).append('<td class=comment_contents> <input type=text id=' + data.id + 'comment /></td>');
			$('#' + data.id).append('<td class=comment><button class="btn btn-primary btn-small" type=submit onClick="javascript:addComment(\'' + data.id + '\')">댓글달기</button></td>');
			$('#' + data.id).append('<td class=comment_view> <button class="btn btn-primary btn-small" data-toggle="modal" data-target="#commentModal" value="댓글보기" onClick="javascript:commentView(\'' + data.id + '\');">댓글보기</button</td></tr>');

			updateHandler(data.id, function(savedData) {
				$('#' + data.id + ' .title').text(savedData.title);
			});
		});
	}
});

var
// 댓글을 추가 할 때 실행되는 함수
addComment = function(id) {
	var
	// 댓글 아티클에 들어갈 데이터 모델 정의.
	data = {};
	data.content = $('#' + id + 'comment').val();
	data.articleId = id;
	// 댓글 모델 안에 데이터를 삽입함.
	commentModel.create(data, function(result) {
		// 삽입한 결과가 성공적인지 체크.
		if (result.hasError === false) {
			alert('Success.');
		} else {
			alert(JSON.stringify(result.errors));
		}
	});
	return false;
};

articleModel.onNew(function(savedData) {

	var
	// cal
	cal = CALENDAR(savedData.createTime);

	$('tbody > tr:first').before('<tr id=' + savedData.id + '>');
	$('#' + savedData.id).append('<td class=title>' + savedData.title + '</td>');
	$('#' + savedData.id).append('<td class=content>' + savedData.content + '</td>');
	$('#' + savedData.id).append('<td class=time>' + cal.getYear() + '년 ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ' + '</td>');
	$('#' + savedData.id).append('<td class=modify><button class="btn btn-primary btn-small" data-toggle="modal" data-target="#modifyModal" type=submit onClick="javascript:modifyContents()">수정 </button></td>');
	$('#' + savedData.id).append('<td class=delete><button class="btn btn-primary btn-small" type=submit onClick="javascript:deleteContents()">삭제 </button></td>');
	$('#' + savedData.id).append('<td class=comment_contents> <input type=text id=' + savedData.id + 'comment /></td>');
	$('#' + savedData.id).append('<td class=comment><button class="btn btn-primary btn-small" type=submit onClick="javascript:addComment(\'' + savedData.id + '\')">댓글달기</button></td>');
	$('#' + savedData.id).append('<td class=comment_view> <button class="btn btn-primary btn-small" data-toggle="modal" data-target="#myModal" value="댓글보기" onClick="javascript:commentView(\'' + savedData.id + '\');">댓글보기</button</td></tr>');
});
// onNew function

var
// 댓글 보기 버튼을 눌렀을 경우 실행할 함수 정의.
commentView = function(id) {
	commentModel.findDataSet({
		// 해당 댓글은 아티클 모델에 맞게 아이디를 필터링 해줌.
		filter : {
			articleId : id
		},
		sort : {
			createdTime : -1
		}
	}, function(result) {
		// 아티클 에서 데이터 찾기의 오류를 체
		if (result.hasError === false) {
			var
			// 댓글의 내용을 담을 변수 선언.
			commentContents;
			EACH(result.savedDataSet, function(data) {
				var
				// 모델에서 받아온 시간 정보를 년월일에 맞게 바꿔줄 클래스 초기화.
				cal = CALENDAR(data.createTime);
				// 댓글 모달안에 각 데이터를 채워넣음.
				$('#commentContents').append('<li>작성내용 : ' + data.content + ' // 작성일자 : ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ' + cal.getHour() + '시' + '</li>');
			});
		}
	});
};

var
// 게시판에서 수정 버튼을 클릭 했을 경우 모달 폼을 채워줌.
modifyContents = function(data) {
	$('#contents').append('<li>제목 : <input id=titleUpdate type=text value=' + data.title + '></li>');
	$('#contents').append('<li>내용 : <input id=contentsUpdate type=text value=' + data.content + '></li>');
};

var
// 게시판에서 글을 삭제하기 위해서 실행되는 함수.
deleteContents = function(id) {
	console.log('delete contents : ' + id);
	// 아티클 모델에서 특정 id를 삭제함.
	articleModel.remove(id, function(result) {
		// 모델이 수행한 결과가 에러인지 체크.
		if (result.hasError === false) {
			// 성공할 경우 전체게시글에서 제거.
			$("#" + id).remove();
		} else {
			// 실패할 경우 콘솔에 에러 메시지를 출력.
			console.log(result.errorMsg);
		}
	});
};

var
// 수정모달 폼에서 동작할 행위들을 정의함.
contentsUpdate = function(id) {
	var
	// 아티클 모델에 업데이트 될 데이터 정의.
	data = {
		id : id
	};
	data.title = $('#titleUpdate').val();
	data.content = $('#contentsUpdate').val();
	console.log('contents Update : ' + data.title + '//' + data.content);
	// 아티클 모델에 입력된 데이터로 수정을 가함.
	articleModel.update(data, function(result) {
		console.log(result);
	});
};
