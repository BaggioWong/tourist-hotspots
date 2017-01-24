angular.module("TouristHotspots")
.config(TouristHotspotsConfig);

TouristHotspotsConfig.$inject = ["uiGmapGoogleMapApiProvider"];

function TouristHotspotsConfig(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyABK8ljExlpBO_y16BQA0InKOCwbYFuCws',
		// v: '3.20', //defaults to latest 3.X anyhow
		libraries: 'places'
	});
}