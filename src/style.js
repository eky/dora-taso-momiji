const style = `
	._dtm {
		position: relative;
		cursor: pointer;
	}

	._dtm-input {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		width: 20px;
		height: 20px;
	}

	._dtm-content {
		display: block;
		padding-left: 30px;
		background: #f7dada;
		transition: all .3s ease-in-out;
	}

	._dtm-content a {
		color: black;
	}

	._dtm-input:checked + ._dtm-content {
		background: LightGreen;
	}

	@keyframes momiji {
		from { transform: scaleX(.8) }
		to { transform: scaleX(1.2) }
	}

	._dtm-dialog {
		position: fixed;
		animation: momiji .8s infinite alternate;
	}
`;

export default style;
