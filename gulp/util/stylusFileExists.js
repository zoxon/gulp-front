import stylus from 'stylus';

// https://github.com/stylus/stylus/issues/1872#issuecomment-86553717
module.exports = function() {
  return function(style) {
    style.define('file-exists', function(path) {
      return !!stylus.utils.lookup(path.string, this.paths);
    });
  };
};
