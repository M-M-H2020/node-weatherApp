const path = require('path')

const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')
const rootPath = require('../utils/rootPath');

const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000

const publicDir = path.join(rootPath, '/public');
const viewsPath = path.join(rootPath,'/templates/views')

const partialPath = path.join(rootPath,'/templates/partials')


app.use(express.static(publicDir));

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name:'Sunskull'
    })
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Sunskull',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Sunskull',
		helpText:'This is the help text.'
	});
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
		return res.send({
			error:'Please provide an address'
		})
	}
	
	geocode(req.query.address, (error, data) => {
		
		if (error) {
			return res.send({
				error
			})
		}
		const validUnits = ['m','s','f']
		const unit = req.query.unit || 'm'
		const isValid= validUnits.some((u) => {
			return u === unit
		})
		if(!isValid){
			return res.send({
				error:'Please use a valid unit (k,s,m)'
			})
		}
		const weatherInfo = forecast(data,unit)
		weatherInfo.then((data) => {
			res.send({
				forecastData:data.forecastData,
				location:data.location,
				address:req.query.address
			})
		}).catch((error) => {
			res.send({error})
		})
	});
})



app.use('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'sunskull',
        errorMessage:'Help article not found.'
    })
})

app.use((req,res) => {
    res.render('404', {
			title: '404',
			name: 'Sunskull',
			errorMessage: 'page not found.',
		});
})

app.listen(3000,() => {
    console.log(`Server is running at port ${port}`);
})


