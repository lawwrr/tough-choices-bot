import abstractGetter from './abstract/abstract.js';

export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'consequence';
	}

	async reduce(list) {
		return await this.expandKeywordHelper(
			this.randomArray(list)
		);
	}

}
