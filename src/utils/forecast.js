const axios = require('axios');

module.exports = ({latitude,longitude,location} = {}, unit) => {
	const unitName = unit === 'm' ? 'C' : unit === 'f' ? 'F' : 'K';
	const weatherUrl = `http://api.weatherstack.com/current?access_key=e28739bf8a649978a2341354fdb4761c&query=${latitude},${longitude}&units=${unit}#`;
	return axios
		.get(weatherUrl)
		.then((response) => {
			const { data } = response;
			return data;
		})
		.then((data) => {
			if (data.error) {
				return console.log('You messed up!!');
			}

			const { current } = data;
			let icon = current.weather_icons[0]
			
			const forecastData = `${current.weather_descriptions[0]}.\nIt is currently ${current.temperature} ${unitName} out. It feels like ${current.feelslike} ${unitName} out.`;
			return {
				forecastData,
				location:location,
				icon
			}
		})
		.catch((err) => {
			console.log('Unable to connect to weather services\n',err);
		});
};
