angular.module("TouristHotspots")
.service("HistoryService", HistoryService);

function HistoryService() {
	/**
	 *	@description
	 *	模拟历史数据	
	 */
	this.history = [
		{keyword: "Great"},
		{keyword: "National"},
		{keyword: "Orange"},
		{keyword: "China"},
		{keyword: "Korea"}
	];

	/**
	 *	@param 	{Object} keyword 这不是字符串而是Object！
	 *	@description
	 *	模拟保存历史
	 */
	this.save = function(keyword) {
		this.history.push(keyword);	
	};

	/**
	 *	@description
	 *	模拟获取所有历史
	 */
	this.get = function() {
		return this.history;
	}
}