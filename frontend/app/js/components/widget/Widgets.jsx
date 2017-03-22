import * as React from 'react';

import { Widget } from './Widget.jsx';

export class Widgets extends React.Component {

	constructor(props) {
		var self;
		super(props);
		self = this;
		//this.handleWidgetDelete = this.handleWidgetDelete.bind(this);
	}

	render() {
		var widgets = this.props.widgets.map((widget, index) => 
			<Widget key={index} data={widget} id={index} 
				onWidgetUpdate={this.props.handleWidgetUpdate}
				onWidgetDelete={this.props.handleWidgetDelete} />
		);
		return (
			<div className="weather-list">
				{widgets}
			</div>
		)
	}

	handleWidgetUpdate(key) {
		console.log(`Update ${key}`);
	}


	handleNewInput() {
		console.log('it workds')
	}

};