angular.module("TouristHotspots")
.service("UserService", UserService);

function UserService() {
	var mockAvatar = "/images/avatars/alan.png";

	this.getAvatar = function(userId) {return mockAvatar;}

	this.setAvatar = function(userId, avatar) {
		/**
		 *	@mock
		 *	前端不能实现，因为HTML的File api不允许获取文件的路径
		 */
		mockAvatar = avatar;
	}
}