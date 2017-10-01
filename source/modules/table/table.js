(function( $, window, document, undefined ) {
  'use strict';

  var pluginName = 'table';

  var defaults = {
    initedClassName: 'table_responsive',
    cellAttributeName: 'data-th',
    cellInnerClassName: 'table__content'
  };

  // Create the plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this._name = pluginName;
    this._defaults = defaults;
    this.options = $.extend( {}, this._defaults, options );

    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    // Initialization logic
    init: function() {
      this.buildCache();
      this.bindEvents();
      this.updateCells();
      this.setInited();
    },

    // Remove plugin instance completely
    destroy: function() {
      this.unbindEvents();
      this.$element.removeData();
    },

    // Cache DOM nodes for performance
    buildCache: function() {
      this.$element = $(this.element);
      this.headingsSelector = this.findHeadings();
      this.$cells = this.$element.find('td');
    },

    // Bind events that trigger methods
    bindEvents: function() {
      var plugin = this;

      plugin.$element.on('click' + '.' + plugin._name, function() {
        plugin.someOtherFunction.call(plugin);
      });
    },

    // Unbind events that trigger methods
    unbindEvents: function() {
      this.$element.off('.' + this._name);
    },

    // Create custom methods
    findHeadings: function() {
      if (this.$element.find('thead tr th').length) {
        return 'thead th';
      }
      if (this.$element.find('tfoot tr th').length) {
        return 'tfoot th';
      }
      else if (this.$element.find('tbody tr th').length) {
        return 'tbody tr th';
      }
      else if (this.$element.find('th').length) {
        return 'tr:first th';
      }
      else if (this.$element.find('thead tr td').length) {
        return 'thead td';
      }
      else if (this.$element.find('tfoot tr td').length) {
        return 'tfoot td';
      }
      else {
        return 'tr:first td';
      }
    },

    getHeadings: function() {
      var headings = [];

      $.each(this.$element.find(this.headingsSelector), function() {
        var $heading = $(this);
        var colspan = parseInt($heading.attr('colspan'), 10) || 1;
        var row = $heading.closest('tr').index();

        if (!headings[row]) {
          headings[row] = [];
        }

        for (var i = 0; i < colspan; i++) {
          headings[row].push($heading);
        }
      });

      return headings;
    },

    updateCells: function() {
      var self = this;
      var $headings = this.getHeadings();

      this.$cells.each(function() {
        var $cell = $(this);

        var cellIndex = $cell.index();
        var headingText = '';

        for (var j = 0; j < $headings.length; j++) {
          if (j != 0) {
            headingText += ': ';
          }

          var $heading = $headings[j][cellIndex];
          headingText += $heading.text();
        }

        $cell.attr(self.options.cellAttributeName, headingText);

        self.wrappCellContent($cell);
      });
    },

    wrappCellContent: function($cell) {
      if (!$cell.children().hasClass(this.options.cellInnerClassName)) {
        $cell.wrapInner('<span class="' + this.options.cellInnerClassName + '" />');
      }
    },

    setInited: function() {
      this.$element.addClass(this.options.initedClassName);
    },

    // Universal calback call
    callback: function(name) {

      // Cache onComplete option
      var cb = this.options[ name ];

      if ( typeof cb === 'function' ) {
        cb.call(this.element);
      }
    }

  });

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' +
          pluginName, new Plugin( this, options ) );
      }
    } );
  };

})( jQuery, window, document );


$('.table').table();
