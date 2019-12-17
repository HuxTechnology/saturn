const https = require('https');
const EJSON = require('ejson');
const keys = require('./keys');

module.exports = {
	fetchRemoteConfig: (url, callback) => {
		https.get(url, res => {
			let incomingData = '';
			res.on('data', d => incomingData += d);
			res.on('end', () => callback(EJSON.parse(incomingData)));
		});
	},
	reportError: (mailgunInstance, subject, html) => {
		mailgunInstance.messages().send({
			from: keys.mailgun.fromAddress,
			to: keys.mailgun.toAddress,
			subject: `[Error] ${subject}`,
			html,
		}, mailgunError => {
			if(mailgunError) return console.log("Error sending email", mailgunError);
		});
	},
}