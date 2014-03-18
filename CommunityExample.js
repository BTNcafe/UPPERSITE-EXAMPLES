require('./UPPERSITE/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'CommunityExample',
		isDevMode : true
	},
	SERVER_CONFIG : {
		dbName : 'CommunityExample-test',
		isNotRequiringDBAuth : true
	}
});
