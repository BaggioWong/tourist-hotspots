angular.module("TouristHotspots")
.service("RegistrationService", RegistrationService);

RegistrationService.$inject = ["$log", "$q"];

function RegistrationService($log, $q) {
	/**
	 *	@description
	 *	模拟用户信息数据表
	 */
	var userDatabase = [
		{username: "elton", password: "john", email: "elton.john@touristhotspots.com"},
		{username: "betty", password: "suarez", email: "betty.suarez@touristhotspots.com"},
		{username: "jean", password: "claude", email: "jean.claude@touristhotspots.com"},
		{username: "hinazuki", password: "minamoto", email: "hinazuki.minamoto@touristhotspots.com"},
		{username: "baekmoon", password: "lee", email: "baekmoon.lee@touristhotspots.com"},
		{username: "zhixuan", password: "he", email: "zhixuan.he@touristhotspots.com"},
	];	

	/**
	 *	@description
	 *	模拟查询用户是否存在，返回模拟适合的信息
	 */
	this.registerVerification = function(username, password, email) {
		for (var i = 0; i < userDatabase.length; i++) {
			if (userDatabase[i].username == username)
				return {msg: "User already exists.", code: 101};
			else {
				userDatabase.push({username: username, password: password, email: email});
				return {msg: "Registration successful.", code: 200};
			} 
		}

		return {msg: "Registration unsuccessful.", code: 102};
	}

	/**
	 *	@description
	 *	模拟注册功能	
	 */
	this.register = function(username, password, email) {
		var registerVerification = this.registerVerification;

		return $q(function(resolve, reject) {
			var results = registerVerification(username, password, email);

			if (results.code == 200)
				resolve(results.msg);
			else
				reject(results.msg);
		});
	}
}