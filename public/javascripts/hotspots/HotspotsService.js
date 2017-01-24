angular.module("TouristHotspots")
.service("HotspotsService", HotspotsService);

HotspotsService.$inject = ["$log", "$q"];

function HotspotsService($log, $q) {
	/** 
	 *	@mock
	 *	模拟景点数据
	 */
	var hotspots = [
		//	national yellowstone park
		{
			id: 19283,
			name: "National Yellowstone Park",
			// review: 5, 
			rating: 5,
			favourites: 20, 
			trailed: 5,
			wishlist: 7, 
			recommendationScore: 6,

			//	copy maison bonaparte for now
			averageRating: 3.2, 	
			roundedRating: 3,		
			raters: 2819,
			ratings: {				
				oneStar: 4.8,
				twoStar: 27.6,
				threeStar: 28.9,
				fourStar: 18.3,
				fiveStar: 20.4
			},
			basicInformation: {
				summary: "Le musée de la Maison Bonaparte est un musée créé dans la maison où Napoléon Bonaparte est né à Ajaccio, et où il a passé son enfance.",
				address: "Wyoming 82190",
				openingHours: "10:30–12:30, 13:15–16:30",
				telephone: "+33 4 95 21 43 89"	
			}, 
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
			reviews: [
				{
					id: 1920, 
					title: "A faire si on a le temps !",
					rating: "3",
					review: "Les affiches informatives disposées dans les pièces sont plaisantes à lire et bien réalisées. La maison est intéressante à visiter. Mais si vous n'êtes pas un féru d'histoire ou un amateur d'architecture/construction, passez votre chemin ! Concernant la construction, il est intéressant de voir comment les pièces étaient disposées, les différents étages, les cloisons en bois d'antan... Notez bien que si vous êtes sur Ajaccio le premier dimanche du mois, la visite est gratuite !",
					date: "2016-07-18"
				},
				{
					id: 2839, 
					title: "Déçu sur la maison de Napoléon",
					rating: "3",
					review: "Ce petit musée n'apprend pas grand chose sur Napoléon, en gros sa naissance dans une des pieces mais il n'y a pas vécu sauf les neuf années de sa petite enfance. Les audio guides sont pratique et permette de ne pas rater grand chose, mais comme le musée est presque vide ça va très vite. Le tarif 7€ la visite et 2€ pour les audio guides. On peux éviter cette visite qui a peu d'intérêt historique. Le personnel est peu gracieux ni courtois.",
					date: "2016-03-18"
				}
			],
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
		},
		//	maison bonaparte
		{
			id: 18239,
			name: "Le musée de la Maison Bonaparte Ajaccio",
			// review: 4,
			rating: 4,
			favourites: 12, 
			trailed: 212,
			wishlist: 29, 
			recommendationScore: 8,

			averageRating: 3.2, 	
			roundedRating: 3,		
			raters: 2819,
			ratings: {				
				oneStar: 4.8,
				twoStar: 27.6,
				threeStar: 28.9,
				fourStar: 18.3,
				fiveStar: 20.4
			},
			basicInformation: {
				summary: "Le musée de la Maison Bonaparte est un musée créé dans la maison où Napoléon Bonaparte est né à Ajaccio, et où il a passé son enfance.",
				address: "1 Rue Saint-Charles, 20000 Ajaccio, France",
				openingHours: "10:30–12:30, 13:15–16:30",
				telephone: "+33 4 95 21 43 89"	
			}, 
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
			reviews: [
				{
					id: 1920, 
					title: "A faire si on a le temps !",
					rating: "3",
					review: "Les affiches informatives disposées dans les pièces sont plaisantes à lire et bien réalisées. La maison est intéressante à visiter. Mais si vous n'êtes pas un féru d'histoire ou un amateur d'architecture/construction, passez votre chemin ! Concernant la construction, il est intéressant de voir comment les pièces étaient disposées, les différents étages, les cloisons en bois d'antan... Notez bien que si vous êtes sur Ajaccio le premier dimanche du mois, la visite est gratuite !",
					date: "2016-07-18"
				},
				{
					id: 2839, 
					title: "Déçu sur la maison de Napoléon",
					rating: "3",
					review: "Ce petit musée n'apprend pas grand chose sur Napoléon, en gros sa naissance dans une des pieces mais il n'y a pas vécu sauf les neuf années de sa petite enfance. Les audio guides sont pratique et permette de ne pas rater grand chose, mais comme le musée est presque vide ça va très vite. Le tarif 7€ la visite et 2€ pour les audio guides. On peux éviter cette visite qui a peu d'intérêt historique. Le personnel est peu gracieux ni courtois.",
					date: "2016-03-18"
				}
			],
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],

		},
		//	great wall of china
		{
			id: 29103,
			name: "Great Wall Of China",
			// review: 4,
			rating: 5,
			favourites: 20, 
			trailed: 13,
			wishlist: 407, 
			recommendationScore: 9,

			//	copy maison bonaparte for now
			averageRating: 3.2, 	
			roundedRating: 3,		
			raters: 2819,
			ratings: {				
				oneStar: 4.8,
				twoStar: 27.6,
				threeStar: 28.9,
				fourStar: 18.3,
				fiveStar: 20.4
			},
			basicInformation: {
				summary: "Le musée de la Maison Bonaparte est un musée créé dans la maison où Napoléon Bonaparte est né à Ajaccio, et où il a passé son enfance.",
				address: "Huairou, China, 101405",
				openingHours: "10:30–12:30, 13:15–16:30",
				telephone: "+33 4 95 21 43 89"	
			}, 
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
			reviews: [
				{
					id: 1920, 
					title: "A faire si on a le temps !",
					rating: "3",
					review: "Les affiches informatives disposées dans les pièces sont plaisantes à lire et bien réalisées. La maison est intéressante à visiter. Mais si vous n'êtes pas un féru d'histoire ou un amateur d'architecture/construction, passez votre chemin ! Concernant la construction, il est intéressant de voir comment les pièces étaient disposées, les différents étages, les cloisons en bois d'antan... Notez bien que si vous êtes sur Ajaccio le premier dimanche du mois, la visite est gratuite !",
					date: "2016-07-18"
				},
				{
					id: 2839, 
					title: "Déçu sur la maison de Napoléon",
					rating: "3",
					review: "Ce petit musée n'apprend pas grand chose sur Napoléon, en gros sa naissance dans une des pieces mais il n'y a pas vécu sauf les neuf années de sa petite enfance. Les audio guides sont pratique et permette de ne pas rater grand chose, mais comme le musée est presque vide ça va très vite. Le tarif 7€ la visite et 2€ pour les audio guides. On peux éviter cette visite qui a peu d'intérêt historique. Le personnel est peu gracieux ni courtois.",
					date: "2016-03-18"
				}
			],
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
		},
		//	shanghai international finance center
		{
			id: 21029,
			name: "Shanghai International Finance Center",
			// review: 3,
			rating: 3,
			favourites: 235, 
			trailed: 65,
			wishlist: 79, 
			recommendationScore: 7,

			//	copy maison bonaparte for now
			averageRating: 3.2, 	
			roundedRating: 3,		
			raters: 2819,
			ratings: {				
				oneStar: 4.8,
				twoStar: 27.6,
				threeStar: 28.9,
				fourStar: 18.3,
				fiveStar: 20.4
			},
			basicInformation: {
				summary: "Le musée de la Maison Bonaparte est un musée créé dans la maison où Napoléon Bonaparte est né à Ajaccio, et où il a passé son enfance.",
				address: "8号 Century Ave, LuJiaZui, Pudong Xinqu, China, 200120",
				openingHours: "10:30–12:30, 13:15–16:30",
				telephone: "+33 4 95 21 43 89"	
			}, 
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
			reviews: [
				{
					id: 1920, 
					title: "A faire si on a le temps !",
					rating: "3",
					review: "Les affiches informatives disposées dans les pièces sont plaisantes à lire et bien réalisées. La maison est intéressante à visiter. Mais si vous n'êtes pas un féru d'histoire ou un amateur d'architecture/construction, passez votre chemin ! Concernant la construction, il est intéressant de voir comment les pièces étaient disposées, les différents étages, les cloisons en bois d'antan... Notez bien que si vous êtes sur Ajaccio le premier dimanche du mois, la visite est gratuite !",
					date: "2016-07-18"
				},
				{
					id: 2839, 
					title: "Déçu sur la maison de Napoléon",
					rating: "3",
					review: "Ce petit musée n'apprend pas grand chose sur Napoléon, en gros sa naissance dans une des pieces mais il n'y a pas vécu sauf les neuf années de sa petite enfance. Les audio guides sont pratique et permette de ne pas rater grand chose, mais comme le musée est presque vide ça va très vite. Le tarif 7€ la visite et 2€ pour les audio guides. On peux éviter cette visite qui a peu d'intérêt historique. Le personnel est peu gracieux ni courtois.",
					date: "2016-03-18"
				}
			],
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
		},
		//	the bund
		{
			id: 38192,
			name: "The Bund",
			// review: 5,
			rating: 5,
			favourites: 292, 
			trailed: 129,
			wishlist: 423, 
			recommendationScore: 7,

			//	copy maison bonaparte for now
			averageRating: 3.2, 	
			roundedRating: 3,		
			raters: 2819,
			ratings: {				
				oneStar: 4.8,
				twoStar: 27.6,
				threeStar: 28.9,
				fourStar: 18.3,
				fiveStar: 20.4
			},
			basicInformation: {
				summary: "Le musée de la Maison Bonaparte est un musée créé dans la maison où Napoléon Bonaparte est né à Ajaccio, et où il a passé son enfance.",
				address: "Zhongshan East 1st Rd, WaiTan, Huangpu Qu, Shanghai Shi, China, 200002",
				openingHours: "10:30–12:30, 13:15–16:30",
				telephone: "+33 4 95 21 43 89"	
			}, 
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
			reviews: [
				{
					id: 1920, 
					title: "A faire si on a le temps !",
					rating: "3",
					review: "Les affiches informatives disposées dans les pièces sont plaisantes à lire et bien réalisées. La maison est intéressante à visiter. Mais si vous n'êtes pas un féru d'histoire ou un amateur d'architecture/construction, passez votre chemin ! Concernant la construction, il est intéressant de voir comment les pièces étaient disposées, les différents étages, les cloisons en bois d'antan... Notez bien que si vous êtes sur Ajaccio le premier dimanche du mois, la visite est gratuite !",
					date: "2016-07-18"
				},
				{
					id: 2839, 
					title: "Déçu sur la maison de Napoléon",
					rating: "3",
					review: "Ce petit musée n'apprend pas grand chose sur Napoléon, en gros sa naissance dans une des pieces mais il n'y a pas vécu sauf les neuf années de sa petite enfance. Les audio guides sont pratique et permette de ne pas rater grand chose, mais comme le musée est presque vide ça va très vite. Le tarif 7€ la visite et 2€ pour les audio guides. On peux éviter cette visite qui a peu d'intérêt historique. Le personnel est peu gracieux ni courtois.",
					date: "2016-03-18"
				}
			],
			photos: [
				{url:"/images/maison-bonaparte.jpg", type: "jpg"},
				{url:"/images/maison-napoleon.jpg", type: "jpg"},
				{url:"/images/maison.jpeg", type: "jpg"},
				{url:"/images/maison_bonaparte_michal_osmenda.jpg", type: "jpg"},
				{url:"/images/maison_bonaparte.mp4", type: "mp4"}
			],
		}
	];

	/**
	 *	@description
	 *	获取景点相关数据	
	 */
	this.getHotspotMeta = function(hotspotId, userId) {
		/**
		 *	@mock
		 */	
		var hotspotMeta = {
			favourited: true,
			trailed: false,
			addedToWishlist: true
		}

		return $q(function(resolve, reject) {
			if (true)
				resolve(hotspotMeta);
			else
				reject("Error fetching data for user.");
		})
	}

	/**
	 *	@description
	 *	获取但以景点	
	 */
	this.getHotspot = function(hotspotId) {
		return $q(function(resolve, reject) {
			if (true) {
				angular.forEach(hotspots, function(hotspot, index) {
					if (hotspot.id == hotspotId)
						resolve(hotspots[index]);
				});	
				reject("Hotspot id invalid");
			}
			else
				reject("Error fetching hotspots");
		});
	}

	/**
	 *	@description
	 *	获取所有景点	
	 */
	this.getAll = function() {
		return $q(function(resolve, reject) {
			if (true) 
				resolve(hotspots);
			else
				reject("Error fetching hotspots");
		});
	}

	/**
	 *	@description
	 *	搜索经典名字返回含有关键词的景点	
	 */
	this.searchHotspots = function(keyword) {
		var resultArray = [];
		var counter = 0;

		for (var i = 0; i < hotspots.length; i++) {
			if (hotspots[i].name.indexOf(keyword) !== -1)
				resultArray[counter++] = hotspots[i];
		}

		return $q(function(resolve, reject) {
			if (true) 
				resolve(resultArray);
			else
				reject("Error searching hotspots");
		});
	}
}