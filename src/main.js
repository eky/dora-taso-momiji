import DoraTasoManager from './DoraTasoManager.js';
import style from './style.js';

// Bookmarkletにする必要あるからできるだけ（可読性がいい前提で）短いコードで書くモミ
const _dialog = document.createElement('dialog');
document.body.appendChild(_dialog);
_dialog.textContent = '作業中モミ';
_dialog.showModal();

setTimeout(() => {
	const _dtmStyle = document.createElement('style');
	_dtmStyle.textContent = style;
	document.body.appendChild(_dtmStyle);

	// 手持ちどらたそズ
	const doraTasoManager = new DoraTasoManager();

	// wikiのテーブルにそれっぽいセルを取ってくるどら
	const doras = document.querySelectorAll(`${
		new Array(10).fill(0).map((value, index) => index).map(
			number => `#wikibody a[title^="図鑑/${number}"]`
		).join(',')
	}`);

	Array.from(doras).map(dora => {
		const id = dora.title.match(/[0-9]+/)[0] || null;

		const parentElement = dora.parentElement;
		if (parentElement) {
			parentElement.innerHTML = `
				<label class="_dtm">
					<input
						class="_dtm-input"
						type="checkbox"
						value="${id}"
						${doraTasoManager.has(Number(id)) ? 'checked' : ''} />
					<div class="_dtm-content">
						${parentElement.innerHTML}
					</div>
				</label>
			`;

			setTimeout(() => {
				// 押し間違い防止どら
				parentElement.querySelector('._dtm-content a').removeAttribute('href');
				parentElement.querySelector('._dtm-input').addEventListener('input', event => {
					const thisDora = event.target;
					doraTasoManager[
						thisDora.checked ? 'add' : 'remove'
					](Number(thisDora.value));
				}, false);
			}, 0);
		}
	});

	setTimeout(() => { _dialog.close(); }, 1000);
}, 0);
