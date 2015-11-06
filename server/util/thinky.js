var thinky = require('thinky')({
		host: "gwazoo.com",
		port: 28015,
		authKey: "test",
		db: "gwazoo"
});
// var thinky = require('thinky')({
// 		host: "localhost",
// 		port: 28015,
// 		authKey: "",
// 		db: "gwazoo"
// });

module.exports = thinky;