/* @required jQuery */

(function(root, factory) {
  if(typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if(typeof module === 'object' && module.exports) {
    factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }
}(this, function($, undefined) {

  /**
   * Base BEM class.
   * @constructor
   */
  function BEM(config) {
    this.setConfig(config);
  };

  /**
   * Set the config for the plugin
   * @param {Object} config - defaults in br
   * @param {String} [config.elemPrefix] - Element prefix (default: '__')
   * @param {String} [config.modPrefix] - Modifier prefix (default: '_')
   * @param {String} [config.modDlmtr] - Modifier delimiter (default: '_')
   * @param {String} [config.namePattern] -
   *   Pattern to match valid block names (default: '[a-zA-Z0-9-]+')
   */
  BEM.prototype.setConfig = function(config) {
    this.config = $.extend({}, {
      namePattern: '[a-zA-Z0-9-]+',
      elemPrefix: '__',
      modPrefix: '_',
      modDlmtr: '_'
    }, config);

    this.blockClassRe = this.buildBlockClassRe();
    this.elemClassRe = this.buildElemClassRe();
    this.modClassRe = this.buildModClassRe();
  };

  /**
   * Get parent block of element.
   * @public
   *
   * @param {Object} $this
   * @return {Object}
   */
  BEM.prototype.getBlock = function($this) {
    var blockClass = this.getBlockClass($this)
      , block = $this.closest('.' + blockClass);

    block.selector = blockClass;
    return block;
  };

  /**
   * Switch block context.
   * @public
   *
   * @param {Object} $this
   * @param {String} block
   * @param {String} [elem]
   * @return {Object}
   */
  BEM.prototype.switchBlock = function($this, block, elem) {
    var elem = elem || null;

    elem
      ? $this.selector = this.buildSelector({ block: block, elem: elem })
      : $this.selector = this.buildSelector({ block: block });

    return $this;
  };

  /**
   * Find element in block.
   * @public
   *
   * @param  {Object}  $this    DOM element
   * @param  {String}  elemKey  Element name
   * @return {Object}
   */
  BEM.prototype.findElem = function($this, elemKey) {
    var blockClass = this.getBlockClass($this)
      , elemSelector = '.' + this.buildElemClass(blockClass, elemKey)
      , elem = $this.is(elemSelector) ? $this : $this.find(elemSelector);

    return elem;
  };

  /**
   * Get value of modifier.
   * @public
   *
   * @param {Object} $this
   * @param {String} modKey
   * @return {String}
   */
  BEM.prototype.getMod = function($this, modKey) {
    var mods = this.extractMods($this.first());

    if (mods[modKey] != undefined) return mods[modKey];
    return null;
  };

  /**
   * Check modifier of element.
   * @public
   *
   * @param {Object} $this
   * @param {String} modKey
   * @param {String} [modVal]
   * @return {Boolean}
   */
  BEM.prototype.hasMod = function($this, modKey, modVal) {
    var mods = this.extractMods($this.first());

    if (modVal) {
      if (mods[modKey] == modVal) return true;
    }
    else {
      if (mods[modKey]) return true;
    }

    return false;
  };

  /**
   * Set modifier on element.
   * @public
   *
   * @param {Object} $this
   * @param {String} modKey
   * @param {String} [modVal]
   * @param {Object}
   */
  BEM.prototype.setMod = function($this, modKey, modVal) {
    var self = this
      , selector = $this.selector;

    $this.each(function() {
      var current = $(this);
      current.selector = selector;

      var mods = self.extractMods(current)
        , baseName = self.getBaseClass(current);

      if (mods[modKey] != undefined) {
        var oldModName = self.buildModClass(baseName, modKey, mods[modKey]);
        current.removeClass(oldModName);
      }

      if (modVal !== false) {
        var newModName = self.buildModClass(baseName, modKey, modVal);
      }

      current
        .addClass(newModName)
        .trigger('setmod', [modKey, modVal]);
    });

    return $this;
  };

  /**
   * Delete modifier on element.
   * @public
   *
   * @param {Object} $this
   * @param {String} modKey
   * @param {String} [modVal]
   * @param {Object}
   */
  BEM.prototype.delMod = function($this, modKey, modVal) {
    var self = this
      , selector = $this.selector;

    $this.each(function() {
      var current = $(this);
      current.selector = selector;

      var mods = self.extractMods(current)
        , baseName = self.getBaseClass(current);

      if (modVal) {
        if (mods[modKey] == modVal) {
          var modName = self.buildModClass(baseName, modKey, mods[modKey]);
        }
      }
      else {
        var modName = self.buildModClass(baseName, modKey, mods[modKey]);
      }

      current
        .removeClass(modName)
        .trigger('delmod', [modKey, modVal]);
    });

    return $this;
  };

  /**
   * Filtering elements by modifier.
   * @public
   *
   * @param {Object} $this
   * @param {String} modKey
   * @param {String} [modVal]
   * @param {Boolean} [inverse]
   * @return {Object}
   */
  BEM.prototype.byMod = function($this, modKey, modVal, inverse) {
    var self = this
      , modVal = modVal || null
      , inverse = inverse || false
      , selector = $this.selector
      , result = $();

    $this.each(function() {
      var current = $(this);
      current.selector = selector;

      var mods = self.extractMods(current)
        , baseName = self.getBaseClass(current);

      if (modVal) {
        if (mods[modKey] == modVal) {
          var modName = self.buildModClass(baseName, modKey, mods[modKey]);
        }
      }
      else {
        if (mods[modKey] != undefined) {
          var modName = self.buildModClass(baseName, modKey, mods[modKey]);
        }
      }

      result = result.add(inverse
        ? current.not('.' + modName)
        : current.filter('.' + modName));
    });

    result.selector = selector;
    return result;
  };

  /**
   * Get block names from element.
   * @protected
   *
   * @param {Object|String} $this
   * @return {Object}
   */
  BEM.prototype.extractBlocks = function($this) {
    var self = this, result = []
      , selectors = this.getClasses($this);

    $.each(selectors, function(i, sel) {
      var type = self.getClassType(sel);

      if (type == 'block') {
        result.push(sel);
      }
      else if (type == 'elem') {
        var elem = sel.split(self.config.elemPrefix);
        result.push(elem[0]);
      }
    });

    return result;
  };

  /**
   * Get element names from element.
   * @protected
   *
   * @param {Object} $this
   * @return {Object}
   */
  BEM.prototype.extractElems = function($this) {
    var self = this, result = [];

    $.each(self.getClasses($this), function(i, className) {
      if (self.getClassType(className) == 'elem') {
        var elemName = className.split(self.config.elemPrefix);
        result.push(elemName[1]);
      }
    });

    return result;
  };

  /**
   * Get modifiers from element.
   * @protected
   *
   * @param {Object} $this
   * @return {Object}
   */
  BEM.prototype.extractMods = function($this) {
    var self = this, result = {};

    $this.each(function() {
      var $this = $(this);

      $.each(self.getClasses($this), function(i, className) {
        if (self.getClassType(className) == 'mod') {
          var re = self.buildModClassRe().exec(className);
          var modName = re[1].split(self.config.modDlmtr);

          if (modName[1] !== undefined && modName[1] !== false) {
            var modVal = modName[1];
          } else {
            var modVal = true;
          }

          result[ modName[0] ] = modVal;
        }
      });
    });

    return result;
  };

  /**
   * Get classes names from element.
   * @protected
   *
   * @param {Object} $this
   * @return {Object}
   */
  BEM.prototype.getClasses = function($this) {
    var classes, result = [];

    if (typeof $this == 'object') {

      if ($this.selector.indexOf('.') === 0) {
        classes = $this.selector.split('.');
      }
      else if ($this.attr('class') != undefined) {
        classes = $this.attr('class').split(' ');
      }
      else {
        return null;
      }

    }
    else {
      classes = $this.split('.');
    }

    $.each(classes, function(i, className) {
      if (className != '') result.push($.trim(className));
    });

    return result;
  };

  /**
   * Build regexp for blocks.
   * @protected
   *
   * @return {RegExp}
   */
  BEM.prototype.buildBlockClassRe = function() {
    return new RegExp(
      '^(' + this.config.namePattern + ')$'
    );
  };

  /**
   * Build regexp for elements.
   * @protected
   *
   * @return {RegExp}
   */
  BEM.prototype.buildElemClassRe = function() {
    return new RegExp(
      '^' + this.config.namePattern + this.config.elemPrefix + '(' + this.config.namePattern + ')$'
    );
  };

  /**
   * Build regexp for modifiers.
   * @protected
   *
   * @return {RegExp}
   */
  BEM.prototype.buildModClassRe = function() {
    return new RegExp(
      '^(?:' + this.config.namePattern + '|' + this.config.namePattern + this.config.elemPrefix + this.config.namePattern + ')' + this.config.modPrefix + '(' + this.config.namePattern + '((' + this.config.modDlmtr + this.config.namePattern + ')$|$))'
    );
  };

  /**
   * Build class name for block.
   * @protected
   *
   * @param {String} blockName
   * @return {String}
   */
  BEM.prototype.buildBlockClass = function(blockName) {
    return blockName;
  };

  /**
   * Build class name for element.
   * @protected
   *
   * @param {String} blockName
   * @param {String} elemKey
   * @return {String}
   */
  BEM.prototype.buildElemClass = function(blockName, elemKey) {
    return blockName + this.config.elemPrefix + elemKey;
  };

  /**
   * Build class name for modifier.
   * @protected
   *
   * @param {String} blockName
   * @param {String} modKey
   * @param {String} modVal
   * @return {String}
   */
  BEM.prototype.buildModClass = function(baseClass, modKey, modVal) {
    if (modVal !== undefined && modVal !== true) {
      return baseClass + this.config.modPrefix + modKey + this.config.modDlmtr + modVal;
    } else {
      return baseClass + this.config.modPrefix + modKey;
    }
  };

  /**
   * Build selector from object or string.
   * @private
   *
   * @param {String|Object}
   * @param {String}
   * @return {String}
   */
  BEM.prototype.buildSelector = function(selector, prefix) {
    if (prefix !== '') {
      var prefix = prefix || '.';
    }

    if (typeof selector == 'object') {
      if (selector.block != undefined) {
        var buildSelector = this.buildBlockClass(selector.block);

        if (selector.elem != undefined) {
          buildSelector = this.buildElemClass(buildSelector, selector.elem);
        }

        if (selector.mod != undefined) {
          var mod = selector.mod.split(':');
          buildSelector = this.buildModClass(buildSelector, mod[0], mod[1]);
        }
      }
    }

    return buildSelector != undefined
      ? prefix + buildSelector
      : prefix + selector;
  };

  /**
   * Build class name for block.
   * @protected
   *
   * @param {Object|String} $this
   * @param {Number} [index]
   * @return {String}
   */
  BEM.prototype.getBlockClass = function($this, index) {
    var blockClasses = this.extractBlocks($this);
    var index = index || 0;

    return index <= blockClasses.length - 1
      ? blockClasses[index]
      : null;
  };

  /**
   * Get base class from element.
   * @protected
   *
   * @param {Object} $this
   * @return {String}
   */
  BEM.prototype.getBaseClass = function($this) {
    var self = this, baseClass = null;
    var selectors = this.getClasses($this);

    $.each(selectors, function(i, sel) {
      var classType = self.getClassType(sel);

      if (classType && classType != 'mod') {
        baseClass = sel;
      }
    });

    return baseClass;
  };

  /**
   * Get class type.
   * @protected
   *
   * @param {String} className
   * @return {String}
   */
  BEM.prototype.getClassType = function(className) {
    if (this.modClassRe.test(className)) {
      return 'mod';
    }
    else if (this.elemClassRe.test(className)) {
      return 'elem';
    }
    else if (this.blockClassRe.test(className)) {
      return 'block';
    }
    return null;
  };

  /**
   * Create BEM instance.
   */
  $.BEM = new BEM();

  /**
   * Extend jQuery object.
   */
  $.fn.extend({
    block: function() {
      return $.BEM.getBlock(this);
    },

    elem: function(ctx, elemKey) {
      if (!elemKey) {
        elemKey = ctx;
        ctx = null;
      }

      return $.BEM.findElem(ctx || this, elemKey);
    },

    ctx: function(block, elem) {
      return $.BEM.switchBlock(this, block, elem);
    },

    mod: function(modKey, modVal) {
      if (typeof modVal == 'undefined') {
        modVal = null;
      }

      if (modVal === false) {
        return $.BEM.delMod(this, modKey);
      }

      return (modVal != null)
        ? $.BEM.setMod(this, modKey, modVal)
        : $.BEM.getMod(this, modKey);
    },

    setMod: function(modKey, modVal) {
      return $.BEM.setMod(this, modKey, modVal);
    },

    delMod: function(modKey, modVal) {
      return $.BEM.delMod(this, modKey, modVal);
    },

    hasMod: function(modKey, modVal) {
      return $.BEM.hasMod(this, modKey, modVal);
    },

    byMod: function(modKey, modVal) {
      return $.BEM.byMod(this, modKey, modVal);
    },

    byNotMod: function(modKey, modVal) {
      return $.BEM.byMod(this, modKey, modVal, 'inverse');
    },

    /**
     * Toggle blocks's or elem's modifier `modKey` between `modVal1` and `modVal2`
     * @param {String} modKey
     * @param {String} modVal1
     * @param {String} modVal2
     * @return {*}
     */
    toggleMod: function (modKey, modVal1, modVal2) {
      if (this.hasMod(modKey, modVal1)) {
        return this
            .delMod(modKey, modVal1)
            .setMod(modKey, modVal2);
      } else {
        return this
            .delMod(modKey, modVal2)
            .setMod(modKey, modVal1);
      }
    }
  });

}));
