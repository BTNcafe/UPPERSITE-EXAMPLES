DataTransferExample.MAIN = METHOD({

	run : function(m, params) {'use strict';

		DataTransferExample.REQUEST('test', function(paramStr, params, ip, headers, response, serveErrorPage) {
			console.log(paramStr);

			response({
				content : 'ok!',
				encoding : 'utf-8'
			});
		});

		DataTransferExample.REQUEST_JSON('json', function(data, params, ip, headers, response, serveErrorPage) {
			console.log(data);

			response({
				content : JSON.stringify({
					msg : 'test!'
				}),
				contentType : 'application/json',
				encoding : 'utf-8'
			});
		});
		
		DataTransferExample.REQUEST_JSON('rest/{id}', function(data, params, ip, headers, response, serveErrorPage) {
			console.log(data);
			console.log(params);

			response({
				content : JSON.stringify({
					msg : 'test!'
				}),
				contentType : 'application/json',
				encoding : 'utf-8'
			});
		});
	}
});
