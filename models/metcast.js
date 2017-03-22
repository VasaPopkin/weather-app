'use strict';
module.exports = function(sequelize, DataTypes) {
	var Metcast = sequelize.define('Metcast', {
		city: DataTypes.STRING,
		code: DataTypes.STRING,
		temp: DataTypes.FLOAT,
		pressure: DataTypes.INTEGER,
		humidity: DataTypes.INTEGER,
		icon: DataTypes.STRING,
		openweather_updated: DataTypes.DATE
	}, {
		indexes: [
			{
				unique: true,
				fields: ['city', 'code']
			}
		],
		classMethods: {
			associate: function(models) {
				// associations can be defined here
			}
		}
	});
	return Metcast;
};