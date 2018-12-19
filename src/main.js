import DoraTasoManager from './DoraTasoManager.js';
import style from './style.js';

// Bookmarkletにする必要あるからできるだけ（可読性がいい前提で）短いコードで書くモミ
const _dialog = document.createElement('dialog');
_dialog.innerHTML = '<p>作業中モミ</p>';
_dialog.classList.add('_dtm-dialog');
document.body.appendChild(_dialog);
_dialog.showModal();

const _dtmStyle = document.createElement('style');
_dtmStyle.textContent = style;
document.body.appendChild(_dtmStyle);

// 手持ちどらたそズ
const doraTasoManager = new DoraTasoManager();

const implementSelector = dora => {
	const id = dora.title.match(/[0-9]+/)[0] || null;

	const parentElement = dora.parentElement;
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

	// 押し間違い防止どら
	parentElement.querySelector('._dtm-content a').removeAttribute('href');
	parentElement.querySelector('._dtm-input').addEventListener('input', event => {
		const thisDora = event.target;
		doraTasoManager[
			thisDora.checked ? 'add' : 'remove'
		](Number(thisDora.value));
	}, false);
};

setTimeout(async () => {
	// wikiのテーブルにそれっぽいセルを取ってくるどら
	const doras = document.querySelectorAll(`${
		new Array(10).fill(0).map((value, index) => index).map(
			number => `#wikibody a[title^="図鑑/${number}"]`
		).join(',')
	}`);

	// 希石は除外するどら
	const filteredDoras = Array.from(doras).filter(
		dora => dora.parentElement && !dora.textContent.includes('希石')
	);

	// レンダリングブロッキングを軽減するっぽいナニか
	await new Promise(resolve => {
		setTimeout(() => {
			filteredDoras.map(dora => implementSelector(dora));
			resolve();
		}, 0);
	});

	_dialog.close();
}, 500);
