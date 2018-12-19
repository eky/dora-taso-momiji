class DoraTasoManager {
	constructor() {
		this.doraTasos = this.decompress(location.hash.substring(1));
	}

	add(id) {
		if (!this.doraTasos.includes(id)) {
			this.doraTasos.push(id);
			this.updateLocationHash();
		}
	}

	remove(id) {
		const indexOfDora = this.doraTasos.indexOf(id);
		if (indexOfDora !== -1) {
			this.doraTasos.splice(indexOfDora, 1);
			this.updateLocationHash();
		}
	}

	has(id) {
		return this.doraTasos.includes(id);
	}

	updateLocationHash() {
		const selectedDoraTaso = this.compress(this.doraTasos);
		location.hash = selectedDoraTaso;
	}

	// URL hash使ってシェアしてるけどChromeは32000字くらいが上限なので、何千もあるどらたそのIDを適当に圧縮するどらね
	// radix 36のtoStringとparseIntのコンボで簡易圧縮でいいんじゃね、多分これが一番早いと思います
	compress(list) {
		return list.map(
			number => Number(number).toString(36)
		);
	}

	decompress(string) {
		return string.split(',').reduce((result, base36) => {
			const decimal = parseInt(base36, 36);
			if (!isNaN(decimal)) {
				result.push(decimal);
			}
			return result;
		}, []);
	}
}

export default DoraTasoManager;
