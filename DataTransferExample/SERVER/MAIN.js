DataTransferExample.MAIN = METHOD({

	run : function(m, params) {'use strict';

		DataTransferExample.REQUEST('test', function(method, params, paramStr, headers, response, serveErrorPage) {
			console.log('test', method, paramStr);

			response({
				content : 'ok!',
				encoding : 'utf-8'
			});
		});

		DataTransferExample.REQUEST_JSON('json', function(method, params, data, headers, response, serveErrorPage) {
			console.log('json', method, data);

			response({
				content : JSON.stringify({
					msg : 'test!'
				}),
				contentType : 'application/json',
				encoding : 'utf-8'
			});
		});

		DataTransferExample.REQUEST_JSON('rest/{id}', function(method, params, data, headers, response, serveErrorPage) {
			console.log('rest/{id}', method, params);
			console.log('rest/{id}', method, data);

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
