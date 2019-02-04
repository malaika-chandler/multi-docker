import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
	// Initialize some default state
	state = {
		seenIndexes: [],
		values: {},
		index: ''
	};

	// The moment this component is rendered on screen,
	// attempt to fetch data from backend API
	componentDidMount() {
		this.fetchValues();
		this.fetchIndexes();
	}

	async fetchValues() {
		const values = await axios.get('/api/values/current');
		// Then set state on component
		this.setState({ values: values.data });
	}

	async fetchIndexes() {
		const seenIndexes = await axios.get('/api/values/all');

		this.setState({ seenIndexes: seenIndexes.data });
	}

	// Want this to be a bound function
	handleSubmit = async (event) => {
		event.preventDefault();

		// Post submitted index to backend API
		await axios.post('/api/values', {
			index: this.state.index
		});

		// Clear form index after submission
		this.setState({ index: ''})
	};

	renderSeenIndexes() {
		// Only want to return the number value in the array
		return this.state.seenIndexes
			.map(({ number }) => number)
			.join(', ');
	}

	renderValues() {
		const entries = [];
		for (let key in this.state.values) {
			entries.push(
				<div key={key}>
					For index {key}, I calculated {this.state.values[key]}
				</div>
			);
		}

		return entries;
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Enter your index:</label>
					<input
						value={this.state.index} // Controlled input
						onChange={event => this.setState({ index: event.target.value})}
					/>
					<button>Submit</button>
				</form>

				<h3>Indexes I have seen</h3>
				{this.renderSeenIndexes()}

				<h3>Calculated values:</h3>
				{this.renderValues()}
			</div>
		);
	}
}

export default Fib;
