angular.module("TouristHotspots")
.filter("reviewStars", ReviewStars);

/**
 *	@description
 *	显示评价星星用的
 */
function ReviewStars($sce, $log) {
	return function(input) {
		var starsHtmlString = "";

		for (var i = 0; i < input; i++) {
			starsHtmlString += "<span class='glyphicon glyphicon-size glyphicon glyphicon-star'></span>";
		}

		for (var i = input; i < 5; i++) {
			starsHtmlString += "<span class='glyphicon glyphicon-size glyphicon glyphicon-star-empty'></span>";
		}

		return $sce.trustAsHtml(starsHtmlString);
	}
}