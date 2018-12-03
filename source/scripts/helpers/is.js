export const isObject = value => Object(value) === value;

export const isArray =
  Array.isArray || (value => toString.call(value) === "[object Array]");

export const isBoolean = value =>
  value === true ||
  value === false ||
  toString.call(value) === "[object Boolean]";

export const isString = value => toString.call(value) === "[object String]";

export const isChar = value => isString(value) && value.length === 1;

export const isDate = value => toString.call(value) === "[object Date]";

export const isDomNode = object => isObject(object) && object.nodeType > 0;

export const isError = value => toString.call(value) === "[object Error]";

export const isFunction = value =>
  toString.call(value) === "[object Function]" || typeof value === "function";

export const isJson = value => toString.call(value) === "[object Object]";

// eslint-disable-next-line no-self-compare
export const isNotANumber = value => Number.isNaN || value !== value;

export const isNull = value => value === null;

export const isNumber = value =>
  !isNotANumber(value) && toString.call(value) === "[object Number]";

export const isArguments = value =>
  toString.call(value) === "[object Arguments]" ||
  (value != null && typeof value === "object" && "callee" in value);

export const isUndefined = value => typeof value === "undefined";

export const isWindow = value =>
  value != null && typeof value === "object" && "setInterval" in value;

export const isEmpty = value => {
  if (isObject(value)) {
    const { length } = Object.getOwnPropertyNames(value);

    if (
      length === 0 ||
      (length === 1 && isArray(value)) ||
      (length === 2 && isArguments(value))
    ) {
      return true;
    }
    return false;
  }
  return value === "";
};
