function init(selector, Plugin, options = {}) {
	const elements = document.querySelectorAll(selector);

	Array.prototype.forEach.call(elements, element => {
		return new Plugin(element, options);
	});
}

export default init;
