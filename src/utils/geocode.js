const axios = require('axios');
module.exports = (address, cb) => {
	const location = encodeURI(address);
	const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic3VubnktMjAyMCIsImEiOiJja2RxNG4xN3AwOGVsMnJxczNuaHVwMG95In0.aasoZI9XYudsnQjiUZiAcA&limit=1`;

	axios
		.get(geocodeUrl)
		.then((response) => {
			const { data } = response;
			return data;
		})
		.then((data) => {
			if (data.message || data.features.length === 0) {
				return cb('Location not found!!!', undefined);
			}

			cb(undefined, {
				latitude: data.features[0].geometry.coordinates[1],
				longitude: data.features[0].geometry.coordinates[0],
				location: data.features[0].place_name,
			});
		})
		.catch((err) => {
			cb('Unable to connect', undefined);
		});
};
