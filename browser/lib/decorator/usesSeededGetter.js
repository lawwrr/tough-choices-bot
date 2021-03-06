import {randomNumber,randomArray, makeSeed} from '../../lib/random.js';

export default function(Target) {

	return class usesSeededGetter extends Target {

		attachRandomSeed(seed=makeSeed()) {
			this._seed = seed;
		}

		buildGetter(Getter,options={},extraContext={}) {
			return new Getter({
				...this.context,
				...extraContext,
				_seed: this._seed
			},
			options
			);
		}

		randomArray(arr) {
			return randomArray(arr, this._seed);
		}

		randomNumber(key) {
			return randomNumber(key, this._seed);
		}

	};

}
