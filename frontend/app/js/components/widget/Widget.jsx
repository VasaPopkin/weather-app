import * as React from 'react';
import Time from 'react-time';

export class Widget extends React.Component {

	constructor(props) {
		super(props);
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	handleUpdateClick(event) {
		this.props.onWidgetUpdate(this.props.id);
	}

	handleDeleteClick(event) {
		this.props.onWidgetDelete(this.props.id);	
	}

	render() {
		var data 	= this.props.data;
		var owmDate = new Date(data.openweather_updated);
		return (
			<div className="weather-widget col-md-4">
				<div className="widget-container">
					<div className="controls">
						<i className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}></i>
						<i className="glyphicon glyphicon-refresh" onClick={this.handleUpdateClick}></i>
					</div>
					<div className="header">
						<div className="destination">{data.city}, {data.code}</div>
						<div className="temp">{data.temp}&deg;C</div>
					</div>
					<div className="big-block">
						<div className="weather-icon">
							<img src={data.icon} />
						</div>
						<div className="additional">
							<p>Атмосферное давление - {data.pressure}</p>
							<p>Влажность - {data.humidity}</p>
						</div>
					</div>
					<div className="updates">
						<p>
							<span>API: </span> 
							<span className="update-api"><Time value={data.updatedAt} format="YYYY-MM-DD HH:mm" /></span>
						</p>
						<p>
							<span>OWM: </span>
							<span className="update-owm"><Time value={owmDate} format="YYYY-MM-DD HH:mm" /></span>
						</p>
					</div>
				</div>
			</div>
		)
	}

};