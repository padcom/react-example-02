module.exports = function(source) {
  this.cacheable();
  source += [
    "/* ClassNames Loader START */",
    "exports.locals = (function(styles) {",
    "  var classNames = require('classnames/bind');",
    "  var result = classNames.bind(exports.locals);",
    "  for(var className in styles) result[className] = styles[className];",
    "  return result;",
    "})(exports.locals);",
    "/* ClassNames Loader END */",
  ].join("\n");
  return source;
}
