import hide from '../_utils/animations/hide';

export default class Alert {
	constructor(element, options) {
		this.element = element;
		this.name = 'alert';

		this._defaults = {
			close: 'close'
		};

		this.options = {
			...options,
			...this._defaults
		};

		this.init();
	}

	init() {
		this.buildCache();
		this.bindEvents();
	}

	buildCache() {
		this.closeSelector = `[data-plugin-${this.name}="${this.options.close}"]`;
		this.$close = this.element.querySelector(this.closeSelector);
	}

	bindEvents() {
		this.$close.addEventListener('click', event => this.onClick.call(this, event));
	}

	onClick(event) {
		event.preventDefault();
		hide(this.element);
	}
}
