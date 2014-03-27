// run: nodemon DataTransferExample.js

require('./UPPERSITE/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'DataTransferExample',
		isDevMode : true
	},
	SERVER_CONFIG : {
		isNotUsingDB : true
	}
});
