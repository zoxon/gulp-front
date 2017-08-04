/**
 * Simple accordion plugin
 *
 * @export
 * @class Accordion
 */
export default class Accordion {

	/**
	 * Creates an instance of Accordion.
	 * @param {element} element
	 * @param {object} options
	 * @memberof Accordion
	 */
	constructor(element, options) {
		this.element = element;
		this.name = 'accordion';

		this._defaults = {
			item: 'item',
			trigger: 'trigger',
			open: 'open'
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
		this.itemSelector = `[data-plugin-${this.name}="${this.options.item}"]`;
		this.triggerSelector = `[data-plugin-${this.name}="${this.options.trigger}"]`;
		this.itemActiveMark = `data-plugin-${this.name}-item-${this.options.open}`;

		this.$items = this.element.querySelectorAll(this.itemSelector);
	}

	bindEvents() {
		[].forEach.call(this.$items, $item => {
			const $trigger = $item.querySelector(this.triggerSelector);
			const that = this;

			$trigger.addEventListener('click', event => {
				that.triggerOnClick.call(that, event, $item);
			});
		});
	}

	/**
	 * Handle item trigger click
	 *
	 * @param {event} event
	 * @param {element} $item
	 * @memberof Accordion
	 */
	triggerOnClick(event, $item) {
		event.preventDefault();

		const that = this;

		const isOpen = $item.getAttribute(this.itemActiveMark) === 'true' ? true : false;

		[].forEach.call(that.$items, $item => {
			$item.setAttribute(that.itemActiveMark, false);
		});

		$item.setAttribute(this.itemActiveMark, !isOpen);
	}

}
