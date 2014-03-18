NGExample.CRUDExample = CLASS({

	preset : function() {'use strict';
		return NG.VIEW;
	},

	init : function(cls, inner, self, params) {'use strict';

		var
		// close.
		close;

		// 새로운 게시물을 작성할 경우 실행되는 함수.
		$('form').submit(function() {

			var
			// 아티클 모델에 들어갈 데이터를 선언.
			data = {};

			$.each($(this).serializeArray(), function(i, o) {
				data[o.name] = o.value;
			});
			// 아티클 모델에 데이터를 삽입함.
			articleModel.create(data, function(result) {

				if (result.hasError === false) {
					alert('Success.');
				} else {
					alert(JSON.stringify(result.errors));
				}
			});

			return false;
		});

		//OVERRIDE: self.close
		self.close = close = function() {
		};
	}
});
