require('./UPPERSITE/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'ModelExample',
		isDevMode : true
	},
	SERVER_CONFIG : {
		dbName : 'ModelExample-test',
		isNotRequiringDBAuth : true
	}
});
