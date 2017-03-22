import * as React from 'react';

export class Notifications extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<span>{this.props.text}</span>
		)
	}

};