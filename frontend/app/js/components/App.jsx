import React from 'react';

import { Form } from './form/Form.jsx';
import { Widgets } from './widget/Widgets.jsx';
import { Notifications } from './notifications/Notifications.jsx';

const MAX_BLOCKS_CNT = 5

export class App extends React.Component {

	constructor(props) {

		super(props);

		var self = this;

		this.deleteWidget = this.deleteWidget.bind(this);
		this.updateWidget = this.updateWidget.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		

		this.state = {
			blocks: [],
			notification: '',
			waiting: false
		}

	}

	componentDidMount() {
		this.getStateFromStorage();
  	}

	render() {
		return (
			<div className="app">
				<div className="container text-center form-container panel">
					<div className="form-block">
						<Form onFormSubmit={this.handleFormSubmit} waiting={this.state.waiting} />
					</div>
				</div>
				<div className="container text-center notifications-container panel">
					<Notifications text={this.state.notification} />
				</div>
				<div className="container text-center widgets-container">
					<div className="widgets-block">
						<Widgets widgets={this.state.blocks} handleWidgetDelete={this.deleteWidget} handleWidgetUpdate={this.updateWidget} />
					</div>
				</div>
			</div>
		)
	}

	handleFormSubmit(formState, cb) {

		var self = this;
		
		self.setState({waiting: true});

		$.get('/api/metcast/city/' + formState.cityname, {
			code: formState.countrycode
		}, function(data) {
			self.addToBlocks(data);
		})
			.done(cb)
			.fail(function() {
				self.notify('Ошибка при запросе');
			})
			.always(function() {
				self.setState({waiting: false});
			})
	}

	updateWidget(key) {
		var self = this;
		var block = this.state.blocks[key];

		$.get('/api/metcast/city/' + block.city, {
			code: block.code
		}, function(data) {
			self.updateBlock(key, data, self.saveStateToStorage);
		})
	}

	deleteWidget(key) {

		var newBlocks = this.state.blocks.filter(function(block, index) {
			return index !== key;
		});

		this.setState({blocks: newBlocks}, this.saveStateToStorage);
	}

	updateBlock(key, data, cb) {

		var blocks = this.state.blocks.slice();

		for (var i = 0; i < blocks.length; i++) {
			if (i === key) {
				blocks[i] = data;
				break;
			}
		}

		this.setState({blocks: blocks}, cb);

	}

	addToBlocks(data) {

		var newBlocks;

		if (this.state.blocks.length === MAX_BLOCKS_CNT) {
			return this.notify('Нельзя больше.');
		}

		if (this.blockExists(data)) {
			return this.notify('Такой блок уже есть.');
		}

		newBlocks = this.state.blocks.slice();
		newBlocks.push(data);

		this.setState({blocks: newBlocks}, this.saveStateToStorage);
		this.notify(null);
	}

	blockExists(data) {

		var blocks = this.state.blocks;
		var exists = false;

		for (var i = 0; i < blocks.length; i++) {
			if (data.city === blocks[i].city && data.code === blocks[i].code) {
				exists = true;
				break;
			}
		}
		return exists;
	}

	notify(text) {
		this.setState({ notification: text })
	}

	saveStateToStorage() {
		var serialized;

		try {
			serialized = JSON.stringify(this.state.blocks);
		} catch(e) {
			localStorage.removeItem('blocks');
			return notify('Ошибка сохранения.');
		}

		localStorage.setItem('blocks', serialized);
	}

	getStateFromStorage() {
		var blocks = localStorage.getItem('blocks');

		if (!blocks) return this.setState({blocks: []});

		try {
			blocks = JSON.parse(blocks);
		} catch(e) {
			localStorage.removeItem('blocks');
			return notify('Ошибка получения данных из хранилища.');
		}

		this.setState({blocks: blocks});
	}
};