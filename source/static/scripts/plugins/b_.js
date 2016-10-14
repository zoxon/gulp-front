;(function ( $, window, document, undefined ) {
	'use strict';

	/**
	 *
	 * @param {object} [options]
	 * @param {string} [options.tailSpace='']
	 * @param {string} [options.elementSeparator='__']
	 * @param {string} [options.modSeparator='_']
	 * @param {string} [options.modValueSeparator='_']
	 * @param {string} [options.classSeparator=' ']
	 * @param {string} [options.isFullModifier=true]
	 *
	 * @constructor
	 */
	function BemFormatter(options) {
		// Case call BemFormatter() without new
		if (!(this instanceof  BemFormatter)) {
			return createBemFormatter(options);
		}

		options = options || {};
		this.tailSpace = options.tailSpace || '';
		this.elementSeparator = options.elementSeparator || '__';
		this.modSeparator = options.modSeparator || '_';
		this.modValueSeparator = options.modValueSeparator || '_';
		this.classSeparator = options.classSeparator || ' ';
		this.isFullModifier = typeof options.isFullModifier === 'undefined' ? true : options.isFullModifier;
	}

	BemFormatter.prototype = {
		/**
		 *
		 * @param {string} base
		 * @param {string} modifierKey
		 * @param {*} modifierValue
		 * @returns {string}
		 * @private
		 */
		_stringifyModifier: function (base, modifierKey, modifierValue) {
			var result = '';

			// Ignore false or undefined values
			if (modifierValue === false || typeof modifierValue === 'undefined') {
				return result;
			}

			// Makes block__elem_{modifierKey}
			result += this.classSeparator + base + this.modSeparator + modifierKey;

			// If modifier value is just true skip `modifierValue`
			if (modifierValue !== true) {
				// Makes block__elem_{modifierKey}_{modifierValue}
				result += this.modValueSeparator + String(modifierValue);
			}

			return result;
		},

		/**
		 *
		 * @param {string} base
		 * @param {object} modifiers
		 * @returns {string}
		 * @private
		 */
		_stringifyModifiers: function (base, modifiers) {
			var result = '';

			if (!this.isFullModifier) {
				base = '';
			}

			for (var modifierKey in modifiers) {
				if (!modifiers.hasOwnProperty(modifierKey)) {
					continue;
				}

				result += this._stringifyModifier(base, modifierKey, modifiers[modifierKey]);
			}

			return result;
		},

		/**
		 *
		 * @param {string} block
		 * @param {string} [element]
		 * @param {object} [modifiers]
		 */
		stringify: function (block, element, modifiers) {
			var className = String(block);

			// case b_(block, modifiers)
			if (element && typeof element === 'object' && typeof modifiers === 'undefined') {
				modifiers = element;
				element = null;
			}

			if (element) {
				className += this.elementSeparator + String(element);
			}

			if (modifiers) {
				className += this._stringifyModifiers(className, modifiers);
			}

			return className + this.tailSpace;
		}
	};

	/**
	 * Return partially applied b_
	 *
	 * @param {string} block
	 * @param {string} [element]
	 * @param {object} [modifiers]
	 * @returns {Function} partially applied b_
	 *
	 * @example
	 *
	 * ```jsx
	 * var B = require('b_');
	 * var b = B.with('b-button');
	 * var e = B.with('b-button', 'elem');
	 *
	 * function render() {
		 *   return (
		 *     <div className={b()}>
		 *       <span className={b('icon', {type: 'add'})}></span>
		 *       <span className={b('text')}></span>
		 *     </div>
		 *     <div className={b({size: 'small'})}>
		 *       <span className={b('icon', {type: 'add'})}></span>
		 *       <span className={b('text')}></span>
		 *     </div>
		 *   );
		 * }
	 * ```
	 */
	function withMixin(block, element, modifiers) {
		return this.bind.apply(this, [null].concat(Array.prototype.slice.call(arguments)));
	}

	/**
	 * @param {object} [options]
	 * @returns {function}
	 *
	 * @private
	 */
	function createBemFormatter(options) {
		var bemFormatter = new BemFormatter(options);

		var b = bemFormatter.stringify.bind(bemFormatter);
		b['with'] = b.lock = withMixin;

		return b;
	}

	/**
	 *
	 * @type {function(this:BemFormatter)}
	 *
	 * @example
	 *
	 * var v = require('b_');
	 *
	 * b('block'); // 'block'
	 * b('block', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block block_mod1 block_mod3_mod3'
	 * b('block', 'elem'); // 'block__elem'
	 * b('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block__elem block__elem_mod1 block__elem_mod3_mod3'
	 */
	var b = createBemFormatter();

	/**
	 *
	 * @type {BemFormatter}
	 *
	 * @example
	 *
	 * var b = new (require('b_').B)({
	 *   tailSpace: ' ',
	 *   elementSeparator: '-',
	 *   modSeparator: '--',
	 *   modValueSeparator: '-',
	 *   classSeparator: ' '
	 * });
	 *
	 * b.stringify('block'); // 'block '
	 * b.stringify('block', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block block--mod1 block--mod3-mod3 '
	 * b.stringify('block', 'elem'); // 'block-elem '
	 * b.stringify('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block-elem block-elem--mod1 block-elem--mod3-mod3'
	 */
	b.B = BemFormatter;

	return b;

	window.b_ = b;

})( jQuery, window, document );
