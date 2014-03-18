require('./UPPERSITE/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'NGExample',
		isDevMode : true
	},
	SERVER_CONFIG : {
		dbName : 'NG-test',
		isNotRequiringDBAuth : true
	}
});
