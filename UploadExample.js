// run: nodemon UploadExample.js

require('./UPPERSITE/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'UploadExample',
		isDevMode : true
	},
	SERVER_CONFIG : {
		dbName : 'UploadExample-test',
		isNotRequiringDBAuth : true
	}
});
