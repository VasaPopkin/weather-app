import * as React from 'react';

export class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cityname: '',
			countrycode: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="form-inline">
				<div className="form-group">
					<label htmlFor="cityname">Город</label>
					<input type="text" className="form-control" name="cityname" id="cityname" value={this.state.cityname} placeholder="London" onChange={this.handleChange} />	
				</div>
				<div className="form-group">
					<label htmlFor="countrycode">Код страны</label>
					<input type="text" className="form-control" name="countrycode" id="countrycode" value={this.state.countrycode}
					placeholder="uk" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<button className="btn btn-default" type="submit" disabled={this.props.waiting}>Добавить</button>
				</div>
			</form>
		)
	}

	handleSubmit(event) {
		var self = this;
		event.preventDefault();
		
		this.props.onFormSubmit(this.state, function() {
			self.clearForm();
		});
	}

	clearForm() {
		this.setState({
			cityname: '',
			countrycode: ''
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

};
