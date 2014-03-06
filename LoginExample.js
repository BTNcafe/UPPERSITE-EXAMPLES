require('./UPPERSITE/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'LoginExample',
		isDevMode : true
	},
	SERVER_CONFIG : {
		dbName : 'LoginExample-test',
		isNotRequiringDBAuth : true
	}
});
