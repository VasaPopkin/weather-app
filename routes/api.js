var express = require('express');
var request = require('request');
var models = require('../models');
var moment = require('moment');
var weatherAPI = require('../config/openweather.json');

var router = express.Router();

router.get('/', function(req, res, next) {
	res.status(403).end();
})

/* GET weather forecast. */
router.get('/metcast/city/:cityname', function(req, res, next) {

	var fromDB;
	var city = req.params.cityname;
	var code = req.query.code;
	code = code ? code.toUpperCase() : null;

	var where = {
		city: city,
		code: code
	}
	
	models.Metcast
		.findOne({ where: where })
		.then(function(row) {
			var now, diff;

			if (row != null){
				now = moment();
				diff = now.diff(moment(row.updatedAt), 'hours');
				if (diff < 1) {
					fromDB = true;
					return row;
				}
			} 
			
			return loadMetcastFromAPI(city, code);

		})
		.then(function(response) {
			if (fromDB) return response;

			var fields = composeFields(response);
			where.city = fields.city;
			where.code = fields.code;

			return models.Metcast.upsert(fields)
		})
		.then(function(response) {
			if (typeof response === 'boolean') {
				return models.Metcast.findOne({ where: where });
			}
			return response;
		})
		.then(function(response) {
			if (response.icon) {
				response.icon = weatherAPI.icons_path + response.icon + '.png';
			}
			return response;
		})
		.then(function(response) {
			return res.json(response);
		})
		.catch(function(err) {
			console.error(err)
			res.status(500).end();
		})

});

function loadMetcastFromAPI(city, code) {

	var qs = city + (code ? (',' + code) : '');

	return new Promise(function(resolve, reject) {
		
		request({
			uri : weatherAPI.uri,
			qs  : {
				appid: weatherAPI.key,
				q 	 : qs
			},
			json: true
		}, function(err, r, body) {
			if (err) return reject(err);
			resolve(body);
		})

	});

}

function composeFields(response) {
	return {
		city: response.name,
		code: response.sys.country,
		temp: parseInt(response.main.temp) - 273,
		pressure: response.main.pressure,
		humidity: response.main.humidity,
		icon: response.weather[0].icon,
		openweather_updated: moment(response.dt * 1000).format()
	}
}

module.exports = router;