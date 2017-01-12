// notification
(function() {
	'use strict';

	var defaults = {
		class: '',
		click: function() {},
		content: '',
		duration: 5000,
		fadeIn: 400,
		fadeOut: 600,
		limit: false,
		queue: false,
		slideUp: 200,
		horizontal: 'right',
		vertical: 'top',
		afterShow: function() {},
		afterClose: function() {}
	};


	function Notification(board, options) {

		this.board = board;
		this._defaults = defaults;
		this.options = options;

		this.init();
	}

	$.extend(Notification.prototype, {

		init: function() {
			var plugin = this;
			this.$notification = this.createNotification();
			this.$notificationClose = this.$notification.children('.notification__close');

			this.bindEvents();

			if (this.options.duration) {

				// hide timer
				setTimeout(function() {
					if (plugin.$notification.hasClass('hover')) {

						// hovering, do not hide now
						plugin.$notification.addClass('pending');
					}
					else {
						plugin.hide.call(plugin);
					}
				}, this.options.duration);
			}
		},

		// Bind events that trigger methods
		bindEvents: function() {
			var plugin = this;

			this.$notification.on('click', function() {
				plugin.options.click.call(plugin);
			});

			// helper classes to avoid hide when hover
			this.$notification.on('mouseenter', function() {
				plugin.mouseenterItemHandler.call(plugin);
			});

			this.$notification.on('mouseleave', function() {
				plugin.mouseleaveItemHandler.call(plugin);
			});

			// close button bind
			this.$notificationClose.on('click', function() {
				plugin.hide.call(plugin);
			});

		},

		// build notification template
		createNotification: function() {
			var itemTemplate =
				'<div class="notification-board__item notification ' + this.options.class + '" style="display:none">' +
					'<button type="button" class="button notification__close"></button>' +
					'<div class="notification__content">' + this.options.content + '</div>' +
				'</div>';

			return $(itemTemplate);
		},

		hide: function() {
			var plugin = this;
			this.$notification.addClass('hiding');
			this.$notification.animate({ opacity: .01 }, this.options.fadeOut, function() {
				var queued = queue.shift();
				if (queued) {
					$.createNotification(queued);
				}
			});
			this.$notification.slideUp(this.options.slideUp, function() {
				$(this).remove();
				plugin.callback('afterClose');
			});
		},

		// show in board
		show: function() {
			this.$notification[ this.options.vertical === 'top' ? 'appendTo' : 'prependTo' ](this.board);
			this.$notification.fadeIn(this.options.fadeIn, this.callback('afterShow'));
		},

		mouseenterItemHandler: function() {
			this.$notification.addClass('hover');
			if (this.$notification.hasClass('hiding')) {

				// recover
				this.$notification.stop(true);

				// reset slideUp, could not find a better way to achieve this
				this.$notification.attr('style', 'opacity: ' + this.$notification.css('opacity'));
				this.$notification.animate({ opacity: 1 }, this.options.fadeIn);
				this.$notification.removeClass('hiding');
				this.$notification.addClass('pending');
			}
		},

		mouseleaveItemHandler: function() {
			if (this.$notification.hasClass('pending')) {

				// hide was pending
				this.hide();
			}
			this.$notification.removeClass('hover');
		},

		// Universal calback call
		callback: function(name) {

			var cb = this.options[ name ];

			if ( typeof cb === 'function' ) {
				cb.call(this.element);
			}
		}
	});

	var queue = [];

	$.notification = function(options) {
		var options = $.extend( {}, defaults, options );

		// get notification container (aka board)
		var boardClasses = [ 'notification-board' ];
		boardClasses.push( boardClasses[ 0 ] + '_horizontal_' + options.horizontal);
		boardClasses.push( boardClasses[ 0 ] + '_vertical_' + options.vertical);

		var board = $('.' + boardClasses.join('.'));

		if (!board.length) {
			board = $('<div class="' + boardClasses.join(' ') + '" />');
			board.appendTo('body');
		}
		if (options.limit && board.children('.notification:not(.hiding)').length >= options.limit) {

			// limit reached
			if (options.queue) {
				queue.push(options);
			}
			return;
		}

		// create new notification and show
		var notification = new Notification(board, options);

		notification.show(board);
		return notification;
	};


})();


$(function() {
	var content = 'Lorem ipsum dolor sit amet, consectetur.<br>Test html <a href="#">elements</a>';

	$('.js-notification-info').click(function(event) {
		event.preventDefault();

		$.notification({
			content: content
		});
	});

	$('.js-notification-notice').click(function(event) {
		event.preventDefault();

		$.notification({
			content: content,
			class: 'notification_type_notice'
		});
	});

	$('.js-notification-success').click(function(event) {
		event.preventDefault();

		$.notification({
			content: content,
			class: 'notification_type_success'
		});
	});

	$('.js-notification-error').click(function(event) {
		event.preventDefault();

		$.notification({
			content: content,
			class: 'notification_type_error'
		});
	});

	$('.js-notification-warning').click(function(event) {
		event.preventDefault();

		$.notification({
			content: content,
			class: 'notification_type_warning'
		});
	});

});
