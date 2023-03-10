// lanyunit-uploader v1.0.0 Copyright (c) 2023 wwy and contributors
'use strict';

var querystring = require('querystring');
var require$$0 = require('crypto');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  const pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

var utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError$1.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError$1.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData$1(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData$1(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData$1(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

function isValidHeaderName(str) {
  return /^[-_a-zA-Z]+$/.test(str.trim());
}

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders$1 {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

utils.freezeMethods(AxiosHeaders$1.prototype);
utils.freezeMethods(AxiosHeaders$1);

var AxiosHeaders$2 = AxiosHeaders$1;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$2.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError$1(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      'Request failed with status code ' + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$2.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv)) {
      requestHeaders.setContentType(false); // Let the browser set it
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$2.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError$1(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$2.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$2.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$2.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$2 ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig$1(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION$1 = "1.3.3";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError$1(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError$1.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios$1 {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig$1(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer !== undefined) {
      validator.assertOptions(paramsSerializer, {
        encode: validators.function,
        serialize: validators.function
      }, true);
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$2.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios$1.prototype[method] = generateHTTPMethod();

  Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$2 = Axios$1;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken$1 {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken$1(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$2 = CancelToken$1;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError$1(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});

var HttpStatusCode$2 = HttpStatusCode$1;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$2(defaultConfig);
  const instance = bind(Axios$2.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios$2.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$2;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$2;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;

// Expose AxiosError class
axios.AxiosError = AxiosError$1;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread$1;

// Expose isAxiosError
axios.isAxiosError = isAxiosError$1;

// Expose mergeConfig
axios.mergeConfig = mergeConfig$1;

axios.AxiosHeaders = AxiosHeaders$2;

axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.HttpStatusCode = HttpStatusCode$2;

axios.default = axios;

// this module should only have a default export
var axios$1 = axios;

// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  mergeConfig
} = axios$1;

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var QiniuErrorName;
(function (QiniuErrorName) {
    // ????????????
    QiniuErrorName["InvalidFile"] = "InvalidFile";
    QiniuErrorName["InvalidToken"] = "InvalidToken";
    QiniuErrorName["InvalidMetadata"] = "InvalidMetadata";
    QiniuErrorName["InvalidChunkSize"] = "InvalidChunkSize";
    QiniuErrorName["InvalidCustomVars"] = "InvalidCustomVars";
    QiniuErrorName["NotAvailableUploadHost"] = "NotAvailableUploadHost";
    // ????????????
    QiniuErrorName["ReadCacheFailed"] = "ReadCacheFailed";
    QiniuErrorName["InvalidCacheData"] = "InvalidCacheData";
    QiniuErrorName["WriteCacheFailed"] = "WriteCacheFailed";
    QiniuErrorName["RemoveCacheFailed"] = "RemoveCacheFailed";
    // ????????????????????????
    QiniuErrorName["GetCanvasContextFailed"] = "GetCanvasContextFailed";
    QiniuErrorName["UnsupportedFileType"] = "UnsupportedFileType";
    // ??????????????????
    QiniuErrorName["FileReaderReadFailed"] = "FileReaderReadFailed";
    QiniuErrorName["NotAvailableXMLHttpRequest"] = "NotAvailableXMLHttpRequest";
    QiniuErrorName["InvalidProgressEventTarget"] = "InvalidProgressEventTarget";
    // ????????????
    QiniuErrorName["RequestError"] = "RequestError";
})(QiniuErrorName || (QiniuErrorName = {}));
var QiniuError = /** @class */ (function () {
    function QiniuError(name, message) {
        this.name = name;
        this.message = message;
        this.stack = new Error().stack;
    }
    return QiniuError;
}());
var QiniuRequestError = /** @class */ (function (_super) {
    __extends$3(QiniuRequestError, _super);
    function QiniuRequestError(code, reqId, message, data) {
        var _this = _super.call(this, QiniuErrorName.RequestError, message) || this;
        _this.code = code;
        _this.reqId = reqId;
        /**
         * @description ??????????????? error ??????????????? QiniuRequestError
         * @deprecated ????????????????????????????????????????????????????????????????????? instanceof ????????????
         */
        _this.isRequestError = true;
        _this.data = data;
        return _this;
    }
    return QiniuRequestError;
}(QiniuError));
/**
 * @description ???????????????????????????????????????host ???????????????????????????????????????????????????
 */
var QiniuNetworkError = /** @class */ (function (_super) {
    __extends$3(QiniuNetworkError, _super);
    function QiniuNetworkError(message, reqId) {
        if (reqId === void 0) { reqId = ''; }
        return _super.call(this, 0, reqId, message) || this;
    }
    return QiniuNetworkError;
}(QiniuRequestError));

var Pool = /** @class */ (function () {
    function Pool(runTask, limit) {
        this.runTask = runTask;
        this.limit = limit;
        this.aborted = false;
        this.queue = [];
        this.processing = [];
    }
    Pool.prototype.enqueue = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queue.push({
                task: task,
                resolve: resolve,
                reject: reject
            });
            _this.check();
        });
    };
    Pool.prototype.run = function (item) {
        var _this = this;
        this.queue = this.queue.filter(function (v) { return v !== item; });
        this.processing.push(item);
        this.runTask(item.task).then(function () {
            _this.processing = _this.processing.filter(function (v) { return v !== item; });
            item.resolve();
            _this.check();
        }, function (err) { return item.reject(err); });
    };
    Pool.prototype.check = function () {
        var _this = this;
        if (this.aborted)
            return;
        var processingNum = this.processing.length;
        var availableNum = this.limit - processingNum;
        this.queue.slice(0, availableNum).forEach(function (item) {
            _this.run(item);
        });
    };
    Pool.prototype.abort = function () {
        this.queue = [];
        this.aborted = true;
    };
    return Pool;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$6 = (undefined && undefined.__assign) || function () {
    __assign$6 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$6.apply(this, arguments);
};
/** ????????????????????????????????? Observable ????????? */
var Subscription = /** @class */ (function () {
    function Subscription() {
        /** ??????????????? Subscription ????????????????????????????????? */
        this.closed = false;
    }
    /** ?????? observer ????????? */
    Subscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    };
    /** ???????????? tear down ?????? Subscription ??? unsubscribe() ???????????? */
    Subscription.prototype.add = function (teardown) {
        this._unsubscribe = teardown;
    };
    return Subscription;
}());
/**
 * ?????? Observer ?????????????????? Subscription ??????Observer ????????? Observable ???????????? API
 * ?????? Observers ??????????????? Subscriber????????????????????? Subscription ?????????????????? unsubscribe
*/
var Subscriber = /** @class */ (function (_super) {
    __extends$2(Subscriber, _super);
    function Subscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (observerOrNext && typeof observerOrNext === 'object') {
            _this.destination = observerOrNext;
        }
        else {
            _this.destination = __assign$6(__assign$6(__assign$6({}, observerOrNext && { next: observerOrNext }), error && { error: error }), complete && { complete: complete });
        }
        return _this;
    }
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped && this.destination.next) {
            this.destination.next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped && this.destination.error) {
            this.isStopped = true;
            this.destination.error(err);
        }
    };
    Subscriber.prototype.complete = function (result) {
        if (!this.isStopped && this.destination.complete) {
            this.isStopped = true;
            this.destination.complete(result);
        }
    };
    return Subscriber;
}(Subscription));
/** ???????????????????????????????????????????????? */
var Observable = /** @class */ (function () {
    function Observable(_subscribe) {
        this._subscribe = _subscribe;
    }
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var sink = new Subscriber(observerOrNext, error, complete);
        sink.add(this._subscribe(sink));
        return sink;
    };
    return Observable;
}());

/* eslint-disable */
// https://github.com/locutusjs/locutus/blob/master/src/php/xml/utf8_encode.js
function utf8Encode(argString) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // +   bugfixed by: Rafal Kukawski
    // +   improved by: kirilloid
    // +   bugfixed by: kirilloid
    // *     example 1: this.utf8Encode('Kevin van Zonneveld')
    // *     returns 1: 'Kevin van Zonneveld'
    if (argString === null || typeof argString === 'undefined') {
        return '';
    }
    var string = argString + ''; // .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    var utftext = '', start, end, stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++;
        }
        else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        }
        else if ((c1 & 0xf800 ^ 0xd800) > 0) {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        else {
            // surrogate pairs
            if ((c1 & 0xfc00 ^ 0xd800) > 0) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xfc00 ^ 0xdc00) > 0) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3ff) << 10) + (c2 & 0x3ff) + 0x10000;
            enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
    return utftext;
}
// https://github.com/locutusjs/locutus/blob/master/src/php/xml/utf8_decode.js
function utf8Decode(strData) {
    // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/utf8_decode/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (https://brett-zamir.me)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: kirilloid
    // bugfixed by: w35l3y (https://www.wesley.eti.br)
    //   example 1: utf8_decode('Kevin van Zonneveld')
    //   returns 1: 'Kevin van Zonneveld'
    var tmpArr = [];
    var i = 0;
    var c1 = 0;
    var seqlen = 0;
    strData += '';
    while (i < strData.length) {
        c1 = strData.charCodeAt(i) & 0xFF;
        seqlen = 0;
        // https://en.wikipedia.org/wiki/UTF-8#Codepage_layout
        if (c1 <= 0xBF) {
            c1 = (c1 & 0x7F);
            seqlen = 1;
        }
        else if (c1 <= 0xDF) {
            c1 = (c1 & 0x1F);
            seqlen = 2;
        }
        else if (c1 <= 0xEF) {
            c1 = (c1 & 0x0F);
            seqlen = 3;
        }
        else {
            c1 = (c1 & 0x07);
            seqlen = 4;
        }
        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F));
        }
        if (seqlen === 4) {
            c1 -= 0x10000;
            tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)));
            tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)));
        }
        else {
            tmpArr.push(String.fromCharCode(c1));
        }
        i += seqlen;
    }
    return tmpArr.join('');
}
function base64Encode(data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: this.utf8Encode
    // *     example 1: this.base64Encode('Kevin van Zonneveld')
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    // if (typeof this.window['atob'] == 'function') {
    //    return atob(data)
    // }
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];
    if (!data) {
        return data;
    }
    data = utf8Encode(data + '');
    do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = (o1 << 16) | (o2 << 8) | o3;
        h1 = (bits >> 18) & 0x3f;
        h2 = (bits >> 12) & 0x3f;
        h3 = (bits >> 6) & 0x3f;
        h4 = bits & 0x3f;
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] =
            b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    enc = tmp_arr.join('');
    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
            break;
        case 2:
            enc = enc.slice(0, -1) + '=';
            break;
    }
    return enc;
}
function base64Decode(data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==')
    // *     returns 1: 'Kevin van Zonneveld'
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    // if (typeof this.window['atob'] == 'function') {
    //    return atob(data)
    // }
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = '', tmp_arr = [];
    if (!data) {
        return data;
    }
    data += '';
    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 === 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        }
        else if (h4 === 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        }
        else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    return utf8Decode(dec);
}
function urlSafeBase64Encode(v) {
    v = base64Encode(v);
    // ?????? https://tools.ietf.org/html/rfc4648#section-5
    return v.replace(/\//g, '_').replace(/\+/g, '-');
}
function urlSafeBase64Decode(v) {
    v = v.replace(/_/g, '/').replace(/-/g, '+');
    return base64Decode(v);
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var sparkMd5 = createCommonjsModule(function (module, exports) {
(function (factory) {
    {
        // Node/CommonJS
        module.exports = factory();
    }
}(function (undefined$1) {

    /*
     * Fastest md5 implementation around (JKM md5).
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;

        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;

        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;

        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b  = (b << 21 | b >>> 11) + c | 0;

        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }

    function md5blk(s) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function md5blk_array(a) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    }

    function md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    }

    function md51_array(a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    }

    function rhex(n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    }

    function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    }

    // In some cases the fast add32 function cannot be used..
    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') ;

    // ---------------------------------------------------

    /**
     * ArrayBuffer slice polyfill.
     *
     * @see https://github.com/ttaubert/node-arraybuffer-slice
     */

    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
        (function () {
            function clamp(val, length) {
                val = (val | 0) || 0;

                if (val < 0) {
                    return Math.max(val + length, 0);
                }

                return Math.min(val, length);
            }

            ArrayBuffer.prototype.slice = function (from, to) {
                var length = this.byteLength,
                    begin = clamp(from, length),
                    end = length,
                    num,
                    target,
                    targetArray,
                    sourceArray;

                if (to !== undefined$1) {
                    end = clamp(to, length);
                }

                if (begin > end) {
                    return new ArrayBuffer(0);
                }

                num = end - begin;
                target = new ArrayBuffer(num);
                targetArray = new Uint8Array(target);

                sourceArray = new Uint8Array(this, begin, num);
                targetArray.set(sourceArray);

                return target;
            };
        })();
    }

    // ---------------------------------------------------

    /**
     * Helpers.
     */

    function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        return str;
    }

    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
           buff = new ArrayBuffer(length),
           arr = new Uint8Array(buff),
           i;

        for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
        }

        return returnUInt8Array ? arr : buff;
    }

    function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
    }

    function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);

        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);

        return returnUInt8Array ? result : result.buffer;
    }

    function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;

        for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex.substr(x, 2), 16));
        }

        return String.fromCharCode.apply(String, bytes);
    }

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */

    function SparkMD5() {
        // call reset to init the instance
        this.reset();
    }

    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // Converts the string to utf8 bytes if necessary
        // Then append as binary
        this.appendBinary(toUtf8(str));

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substring(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = '';
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.prototype.getState = function () {
        return {
            buff: this._buff,
            length: this._length,
            hash: this._hash.slice()
        };
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.setState = function (state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other additional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._hash;
        delete this._buff;
        delete this._length;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
    };

    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} [raw] True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hash = function (str, raw) {
        // Converts the string to utf8 bytes if necessary
        // Then compute it using the binary function
        return SparkMD5.hashBinary(toUtf8(str), raw);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} [raw]     True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }

        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);

        // Convert buffer to a string
        state.buff = arrayBuffer2Utf8Str(state.buff);

        return state;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        // Convert string to buffer
        state.buff = utf8Str2ArrayBuffer(state.buff, true);

        return SparkMD5.prototype.setState.call(this, state);
    };

    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     [raw] True to get the raw string, false to get the hex one
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    return SparkMD5;
}));
});

var __assign$5 = (undefined && undefined.__assign) || function () {
    __assign$5 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$5.apply(this, arguments);
};
var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$6 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MB = Math.pow(1024, 2);
// ????????????
function getChunks(file, blockSize) {
    var chunkByteSize = blockSize * MB; // ???????????????
    // ?????? chunkByteSize ??????????????????????????????????????????
    if (chunkByteSize > file.size) {
        chunkByteSize = file.size;
    }
    else {
        // ???????????? 10000 chunk??????????????? chunkSize ????????????????????? chunk ??????????????????
        while (file.size > chunkByteSize * 10000) {
            chunkByteSize *= 2;
        }
    }
    var chunks = [];
    var count = Math.ceil(file.size / chunkByteSize);
    for (var i = 0; i < count; i++) {
        var chunk = file.slice(chunkByteSize * i, i === count - 1 ? file.size : chunkByteSize * (i + 1));
        chunks.push(chunk);
    }
    return chunks;
}
function isMetaDataValid(params) {
    return Object.keys(params).every(function (key) { return key.indexOf('x-qn-meta-') === 0; });
}
function isCustomVarsValid(params) {
    return Object.keys(params).every(function (key) { return key.indexOf('x:') === 0; });
}
function sum(list) {
    return list.reduce(function (data, loaded) { return data + loaded; }, 0);
}
function setLocalFileInfo(localKey, info, logger) {
    try {
        localStorage.setItem(localKey, JSON.stringify(info));
    }
    catch (err) {
        logger.warn(new QiniuError(QiniuErrorName.WriteCacheFailed, "setLocalFileInfo failed: " + localKey));
    }
}
function createLocalKey(name, key, size) {
    var localKey = key == null ? '_' : "_key_" + key + "_";
    return "qiniu_js_sdk_upload_file_name_" + name + localKey + "size_" + size;
}
function removeLocalFileInfo(localKey, logger) {
    try {
        localStorage.removeItem(localKey);
    }
    catch (err) {
        logger.warn(new QiniuError(QiniuErrorName.RemoveCacheFailed, "removeLocalFileInfo failed. key: " + localKey));
    }
}
function getLocalFileInfo(localKey, logger) {
    var localInfoString = null;
    try {
        localInfoString = localStorage.getItem(localKey);
    }
    catch (_a) {
        logger.warn(new QiniuError(QiniuErrorName.ReadCacheFailed, "getLocalFileInfo failed. key: " + localKey));
    }
    if (localInfoString == null) {
        return null;
    }
    var localInfo = null;
    try {
        localInfo = JSON.parse(localInfoString);
    }
    catch (_b) {
        // ???????????????????????????????????????
        removeLocalFileInfo(localKey, logger);
        logger.warn(new QiniuError(QiniuErrorName.InvalidCacheData, "getLocalFileInfo failed to parse. key: " + localKey));
    }
    return localInfo;
}
function getAuthHeaders(token) {
    var auth = 'UpToken ' + token;
    return { Authorization: auth };
}
function getHeadersForChunkUpload(token) {
    var header = getAuthHeaders(token);
    return __assign$5({ 'content-type': 'application/octet-stream' }, header);
}
function getHeadersForMkFile(token) {
    var header = getAuthHeaders(token);
    return __assign$5({ 'content-type': 'application/json' }, header);
}
function createXHR() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    if (window.ActiveXObject) {
        return new window.ActiveXObject('Microsoft.XMLHTTP');
    }
    throw new QiniuError(QiniuErrorName.NotAvailableXMLHttpRequest, 'the current environment does not support.');
}
function computeMd5(data) {
    return __awaiter$6(this, void 0, void 0, function () {
        var buffer, spark;
        return __generator$6(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readAsArrayBuffer(data)];
                case 1:
                    buffer = _a.sent();
                    spark = new sparkMd5.ArrayBuffer();
                    spark.append(buffer);
                    return [2 /*return*/, spark.end()];
            }
        });
    });
}
function readAsArrayBuffer(data) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        // evt ???????????????????????? https://github.com/Microsoft/TypeScript/issues/4163
        reader.onload = function (evt) {
            if (evt.target) {
                var body = evt.target.result;
                resolve(body);
            }
            else {
                reject(new QiniuError(QiniuErrorName.InvalidProgressEventTarget, 'progress event target is undefined'));
            }
        };
        reader.onerror = function () {
            reject(new QiniuError(QiniuErrorName.FileReaderReadFailed, 'fileReader read failed'));
        };
        reader.readAsArrayBuffer(data);
    });
}
function request(url, options) {
    return new Promise(function (resolve, reject) {
        var xhr = createXHR();
        xhr.open(options.method, url);
        if (options.onCreate) {
            options.onCreate(xhr);
        }
        if (options.headers) {
            var headers_1 = options.headers;
            Object.keys(headers_1).forEach(function (k) {
                xhr.setRequestHeader(k, headers_1[k]);
            });
        }
        xhr.upload.addEventListener('progress', function (evt) {
            if (evt.lengthComputable && options.onProgress) {
                options.onProgress({
                    loaded: evt.loaded,
                    total: evt.total
                });
            }
        });
        xhr.onreadystatechange = function () {
            var responseText = xhr.responseText;
            if (xhr.readyState !== 4) {
                return;
            }
            var reqId = xhr.getResponseHeader('x-reqId') || '';
            if (xhr.status === 0) {
                // ?????? 0 ????????????????????????????????????????????????????????????host ?????????????????????????????????
                reject(new QiniuNetworkError('network error.', reqId));
                return;
            }
            if (xhr.status !== 200) {
                var message = "xhr request failed, code: " + xhr.status;
                if (responseText) {
                    message += " response: " + responseText;
                }
                var data = void 0;
                try {
                    data = JSON.parse(responseText);
                }
                catch (_a) {
                    // ??????????????????????????????????????? json ???????????????????????????
                }
                reject(new QiniuRequestError(xhr.status, reqId, message, data));
                return;
            }
            try {
                resolve({
                    data: JSON.parse(responseText),
                    reqId: reqId
                });
            }
            catch (err) {
                reject(err);
            }
        };
        xhr.send(options.body);
    });
}
function getPortFromUrl(url) {
    if (url && url.match) {
        var groups = url.match(/(^https?)/);
        if (!groups) {
            return '';
        }
        var type = groups[1];
        groups = url.match(/^https?:\/\/([^:^/]*):(\d*)/);
        if (groups) {
            return groups[2];
        }
        if (type === 'http') {
            return '80';
        }
        return '443';
    }
    return '';
}
function getDomainFromUrl(url) {
    if (url && url.match) {
        var groups = url.match(/^https?:\/\/([^:^/]*)/);
        return groups ? groups[1] : '';
    }
    return '';
}
function getPutPolicy(token) {
    if (!token)
        throw new QiniuError(QiniuErrorName.InvalidToken, 'invalid token.');
    var segments = token.split(':');
    if (segments.length === 1)
        throw new QiniuError(QiniuErrorName.InvalidToken, 'invalid token segments.');
    // token ????????????????????????https://github.com/qbox/product/blob/master/kodo/auths/UpToken.md#admin-uptoken-authorization
    var assessKey = segments.length > 3 ? segments[1] : segments[0];
    if (!assessKey)
        throw new QiniuError(QiniuErrorName.InvalidToken, 'missing assess key field.');
    var putPolicy = null;
    try {
        putPolicy = JSON.parse(urlSafeBase64Decode(segments[segments.length - 1]));
    }
    catch (error) {
        throw new QiniuError(QiniuErrorName.InvalidToken, 'token parse failed.');
    }
    if (putPolicy == null) {
        throw new QiniuError(QiniuErrorName.InvalidToken, 'putPolicy is null.');
    }
    if (putPolicy.scope == null) {
        throw new QiniuError(QiniuErrorName.InvalidToken, 'scope field is null.');
    }
    var bucketName = putPolicy.scope.split(':')[0];
    if (!bucketName) {
        throw new QiniuError(QiniuErrorName.InvalidToken, 'resolve bucketName failed.');
    }
    return { assessKey: assessKey, bucketName: bucketName, scope: putPolicy.scope };
}

var _a;
/** ???????????? */
var region = {
    z0: 'z0',
    z1: 'z1',
    z2: 'z2',
    na0: 'na0',
    as0: 'as0',
    cnEast2: 'cn-east-2'
};
/** ????????????????????? host */
var regionUphostMap = (_a = {},
    _a[region.z0] = {
        srcUphost: ['up.qiniup.com'],
        cdnUphost: ['upload.qiniup.com']
    },
    _a[region.z1] = {
        srcUphost: ['up-z1.qiniup.com'],
        cdnUphost: ['upload-z1.qiniup.com']
    },
    _a[region.z2] = {
        srcUphost: ['up-z2.qiniup.com'],
        cdnUphost: ['upload-z2.qiniup.com']
    },
    _a[region.na0] = {
        srcUphost: ['up-na0.qiniup.com'],
        cdnUphost: ['upload-na0.qiniup.com']
    },
    _a[region.as0] = {
        srcUphost: ['up-as0.qiniup.com'],
        cdnUphost: ['upload-as0.qiniup.com']
    },
    _a[region.cnEast2] = {
        srcUphost: ['up-cn-east-2.qiniup.com'],
        cdnUphost: ['upload-cn-east-2.qiniup.com']
    },
    _a);

var __assign$4 = (undefined && undefined.__assign) || function () {
    __assign$4 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$4.apply(this, arguments);
};
var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getUpHosts(accessKey, bucketName, protocol) {
    return __awaiter$5(this, void 0, void 0, function () {
        var params, url;
        return __generator$5(this, function (_a) {
            params = querystring.stringify({ ak: accessKey, bucket: bucketName });
            url = protocol + "://api.qiniu.com/v2/query?" + params;
            return [2 /*return*/, request(url, { method: 'GET' })];
        });
    });
}
/**
 * @param bucket ?????????
 * @param key ???????????????
 * @param uploadInfo ????????????
 */
function getBaseUrl(bucket, key, uploadInfo) {
    var url = uploadInfo.url, id = uploadInfo.id;
    return url + "/buckets/" + bucket + "/objects/" + (key != null ? urlSafeBase64Encode(key) : '~') + "/uploads/" + id;
}
/**
 * @param token ??????????????????
 * @param bucket ????????????
 * @param key ???????????????
 * @param uploadUrl ????????????
 */
function initUploadParts(token, bucket, key, uploadUrl) {
    var url = uploadUrl + "/buckets/" + bucket + "/objects/" + (key != null ? urlSafeBase64Encode(key) : '~') + "/uploads";
    return request(url, {
        method: 'POST',
        headers: getAuthHeaders(token)
    });
}
/**
 * @param token ??????????????????
 * @param index ?????? chunk ?????????
 * @param uploadInfo ????????????
 * @param options ????????????
 */
function uploadChunk(token, key, index, uploadInfo, options) {
    var bucket = getPutPolicy(token).bucketName;
    var url = getBaseUrl(bucket, key, uploadInfo) + ("/" + index);
    var headers = getHeadersForChunkUpload(token);
    if (options.md5)
        headers['Content-MD5'] = options.md5;
    return request(url, __assign$4(__assign$4({}, options), { method: 'PUT', headers: headers }));
}
/**
 * @param token ??????????????????
 * @param key ???????????????
 * @param uploadInfo ????????????
 * @param options ????????????
 */
function uploadComplete(token, key, uploadInfo, options) {
    var bucket = getPutPolicy(token).bucketName;
    var url = getBaseUrl(bucket, key, uploadInfo);
    return request(url, __assign$4(__assign$4({}, options), { method: 'POST', headers: getHeadersForMkFile(token) }));
}
/**
 * @param  {string} url
 * @param  {FormData} data
 * @param  {Partial<utils.RequestOptions>} options
 * @returns Promise
 * @description ????????????
 */
function direct(url, data, options) {
    return request(url, __assign$4({ method: 'POST', body: data }, options));
}

var __assign$3 = (undefined && undefined.__assign) || function () {
    __assign$3 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$3.apply(this, arguments);
};
var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read$3 = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread$3 = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$3(arguments[i]));
    return ar;
};
var DEFAULT_CHUNK_SIZE = 4; // ?????? MB
// code ???????????? https://developer.qiniu.com/kodo/3928/error-responses
var FREEZE_CODE_LIST = [0, 502, 503, 504, 599]; // ?????????????????? host ??? code
var RETRY_CODE_LIST = __spread$3(FREEZE_CODE_LIST, [612]); // ?????????????????? code
var GB = Math.pow(1024, 3);
var Base = /** @class */ (function () {
    function Base(options, handlers, hostPool, logger) {
        this.hostPool = hostPool;
        this.logger = logger;
        this.aborted = false;
        this.retryCount = 0;
        this.xhrList = [];
        this.config = options.config;
        logger.info('config inited.', this.config);
        this.putExtra = __assign$3({ fname: '' }, options.putExtra);
        logger.info('putExtra inited.', this.putExtra);
        this.key = options.key;
        this.file = options.file;
        this.token = options.token;
        this.onData = handlers.onData;
        this.onError = handlers.onError;
        this.onComplete = handlers.onComplete;
        try {
            var putPolicy = getPutPolicy(this.token);
            this.bucketName = putPolicy.bucketName;
            this.assessKey = putPolicy.assessKey;
        }
        catch (error) {
            logger.error('get putPolicy from token failed.', error);
            this.onError(error);
        }
    }
    // ??????????????? upload host
    Base.prototype.checkAndUpdateUploadHost = function () {
        return __awaiter$4(this, void 0, void 0, function () {
            var newHost;
            return __generator$4(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // ??? hostPool ???????????????????????? host ????????? this
                        this.logger.info('get available upload host.');
                        return [4 /*yield*/, this.hostPool.getUp(this.assessKey, this.bucketName, this.config.upprotocol)];
                    case 1:
                        newHost = _a.sent();
                        if (newHost == null) {
                            throw new QiniuError(QiniuErrorName.NotAvailableUploadHost, 'no available upload host.');
                        }
                        if (this.uploadHost != null && this.uploadHost.host !== newHost.host) {
                            this.logger.warn("host switches from " + this.uploadHost.host + " to " + newHost.host + ".");
                        }
                        else {
                            this.logger.info("use host " + newHost.host + ".");
                        }
                        this.uploadHost = newHost;
                        return [2 /*return*/];
                }
            });
        });
    };
    // ???????????????????????? host
    Base.prototype.checkAndUnfreezeHost = function () {
        this.logger.info('check unfreeze host.');
        if (this.uploadHost != null && this.uploadHost.isFrozen()) {
            this.logger.warn(this.uploadHost.host + " will be unfrozen.");
            this.uploadHost.unfreeze();
        }
    };
    // ?????????????????????????????? host
    Base.prototype.checkAndFreezeHost = function (error) {
        this.logger.info('check freeze host.');
        if (error instanceof QiniuRequestError && this.uploadHost != null) {
            if (FREEZE_CODE_LIST.includes(error.code)) {
                this.logger.warn(this.uploadHost.host + " will be temporarily frozen.");
                this.uploadHost.freeze();
            }
        }
    };
    Base.prototype.handleError = function (error) {
        this.logger.error(error.message);
        this.onError(error);
    };
    /**
     * @returns Promise ??????????????????????????????????????????????????????????????? [Subscriber] ?????????
     * @description ???????????????????????????????????? [Subscriber] ?????????
     */
    Base.prototype.putFile = function () {
        return __awaiter$4(this, void 0, void 0, function () {
            var result, err_1, notReachRetryCount, needRetry;
            return __generator$4(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.aborted = false;
                        if (!this.putExtra.fname) {
                            this.logger.info('use file.name as fname.');
                            this.putExtra.fname = this.file.name;
                        }
                        if (this.file.size > 10000 * GB) {
                            this.handleError(new QiniuError(QiniuErrorName.InvalidFile, 'file size exceed maximum value 10000G'));
                            return [2 /*return*/];
                        }
                        if (this.putExtra.customVars) {
                            if (!isCustomVarsValid(this.putExtra.customVars)) {
                                this.handleError(new QiniuError(QiniuErrorName.InvalidCustomVars, 
                                // FIXME: width => with
                                'customVars key should start width x:'));
                                return [2 /*return*/];
                            }
                        }
                        if (this.putExtra.metadata) {
                            if (!isMetaDataValid(this.putExtra.metadata)) {
                                this.handleError(new QiniuError(QiniuErrorName.InvalidMetadata, 'metadata key should start with x-qn-meta-'));
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.uploadAt = new Date().getTime();
                        return [4 /*yield*/, this.checkAndUpdateUploadHost()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.run()];
                    case 3:
                        result = _a.sent();
                        this.onComplete(result.data);
                        this.checkAndUnfreezeHost();
                        this.sendLog(result.reqId, 200);
                        return [2 /*return*/];
                    case 4:
                        err_1 = _a.sent();
                        if (this.aborted) {
                            this.logger.warn('upload is aborted.');
                            this.sendLog('', -2);
                            return [2 /*return*/];
                        }
                        this.clear();
                        this.logger.error(err_1);
                        if (err_1 instanceof QiniuRequestError) {
                            this.sendLog(err_1.reqId, err_1.code);
                            // ???????????????????????? host
                            this.checkAndFreezeHost(err_1);
                            notReachRetryCount = ++this.retryCount <= this.config.retryCount;
                            needRetry = RETRY_CODE_LIST.includes(err_1.code);
                            // ?????????????????????????????????????????????????????????
                            // 1. ?????? needRetry ???????????? retryCount ?????? 0
                            // 2. uploadId ???????????? resume ?????????????????????????????????????????????????????????
                            if (needRetry && notReachRetryCount) {
                                this.logger.warn("error auto retry: " + this.retryCount + "/" + this.config.retryCount + ".");
                                this.putFile();
                                return [2 /*return*/];
                            }
                        }
                        this.onError(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Base.prototype.clear = function () {
        this.xhrList.forEach(function (xhr) {
            xhr.onreadystatechange = null;
            xhr.abort();
        });
        this.xhrList = [];
        this.logger.info('cleanup uploading xhr.');
    };
    Base.prototype.stop = function () {
        this.logger.info('aborted.');
        this.clear();
        this.aborted = true;
    };
    Base.prototype.addXhr = function (xhr) {
        this.xhrList.push(xhr);
    };
    Base.prototype.sendLog = function (reqId, code) {
        var _a, _b;
        this.logger.report({
            code: code,
            reqId: reqId,
            remoteIp: '',
            upType: 'jssdk-h5',
            size: this.file.size,
            time: Math.floor(this.uploadAt / 1000),
            port: getPortFromUrl((_a = this.uploadHost) === null || _a === void 0 ? void 0 : _a.getUrl()),
            host: getDomainFromUrl((_b = this.uploadHost) === null || _b === void 0 ? void 0 : _b.getUrl()),
            bytesSent: this.progress ? this.progress.total.loaded : 0,
            duration: Math.floor((new Date().getTime() - this.uploadAt) / 1000)
        });
    };
    Base.prototype.getProgressInfoItem = function (loaded, size, fromCache) {
        return __assign$3({ size: size,
            loaded: loaded, percent: loaded / size * 100 }, (fromCache == null ? {} : { fromCache: fromCache }));
    };
    return Base;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$2 = (undefined && undefined.__assign) || function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** ?????????????????? */
function isPositiveInteger(n) {
    var re = /^[1-9]\d*$/;
    return re.test(String(n));
}
var Resume = /** @class */ (function (_super) {
    __extends$1(Resume, _super);
    function Resume() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @returns  {Promise<ResponseSuccess<any>>}
     * @description ????????? Base ??? run ???????????????????????????????????????????????????????????????????????????
     */
    Resume.prototype.run = function () {
        return __awaiter$3(this, void 0, void 0, function () {
            var pool, mkFileResponse, localKey, uploadChunks, error_1;
            var _this = this;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('start run Resume.');
                        if (!this.config.chunkSize || !isPositiveInteger(this.config.chunkSize)) {
                            throw new QiniuError(QiniuErrorName.InvalidChunkSize, 'chunkSize must be a positive integer');
                        }
                        if (this.config.chunkSize > 1024) {
                            throw new QiniuError(QiniuErrorName.InvalidChunkSize, 'chunkSize maximum value is 1024');
                        }
                        return [4 /*yield*/, this.initBeforeUploadChunks()];
                    case 1:
                        _a.sent();
                        pool = new Pool(function (chunkInfo) { return __awaiter$3(_this, void 0, void 0, function () {
                            return __generator$3(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this.aborted) {
                                            pool.abort();
                                            throw new Error('pool is aborted');
                                        }
                                        return [4 /*yield*/, this.uploadChunk(chunkInfo)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, this.config.concurrentRequestLimit);
                        mkFileResponse = null;
                        localKey = this.getLocalKey();
                        uploadChunks = this.chunks.map(function (chunk, index) { return pool.enqueue({ chunk: chunk, index: index }); });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, Promise.all(uploadChunks)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.mkFileReq()];
                    case 4:
                        mkFileResponse = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        // uploadId ???????????????????????????????????????????????????????????? uploadId ?????????
                        if (error_1 instanceof QiniuRequestError && (error_1.code === 612 || error_1.code === 400)) {
                            removeLocalFileInfo(localKey, this.logger);
                        }
                        throw error_1;
                    case 6:
                        // ???????????????????????????????????????
                        removeLocalFileInfo(localKey, this.logger);
                        return [2 /*return*/, mkFileResponse];
                }
            });
        });
    };
    Resume.prototype.uploadChunk = function (chunkInfo) {
        return __awaiter$3(this, void 0, void 0, function () {
            var index, chunk, cachedInfo, shouldCheckMD5, reuseSaved, md5, onProgress, requestOptions, response;
            var _this = this;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = chunkInfo.index, chunk = chunkInfo.chunk;
                        cachedInfo = this.cachedUploadedList[index];
                        this.logger.info("upload part " + index + ", cache:", cachedInfo);
                        shouldCheckMD5 = this.config.checkByMD5;
                        reuseSaved = function () {
                            _this.usedCacheList[index] = true;
                            _this.updateChunkProgress(chunk.size, index);
                            _this.uploadedList[index] = cachedInfo;
                            _this.updateLocalCache();
                        };
                        // FIXME: ?????????????????? size
                        if (cachedInfo && !shouldCheckMD5) {
                            reuseSaved();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, computeMd5(chunk)];
                    case 1:
                        md5 = _a.sent();
                        this.logger.info('computed part md5.', md5);
                        if (cachedInfo && md5 === cachedInfo.md5) {
                            reuseSaved();
                            return [2 /*return*/];
                        }
                        // ????????????????????????????????? false
                        this.usedCacheList[index] = false;
                        onProgress = function (data) {
                            _this.updateChunkProgress(data.loaded, index);
                        };
                        requestOptions = {
                            body: chunk,
                            md5: this.config.checkByServer ? md5 : undefined,
                            onProgress: onProgress,
                            onCreate: function (xhr) { return _this.addXhr(xhr); }
                        };
                        this.logger.info("part " + index + " start uploading.");
                        return [4 /*yield*/, uploadChunk(this.token, this.key, chunkInfo.index + 1, this.getUploadInfo(), requestOptions)];
                    case 2:
                        response = _a.sent();
                        this.logger.info("part " + index + " upload completed.");
                        // ??????????????????????????????xhr ??? progress ????????????????????????progress ??? null????????????????????????????????????????????????????????? progress
                        onProgress({
                            loaded: chunk.size,
                            total: chunk.size
                        });
                        this.uploadedList[index] = {
                            etag: response.data.etag,
                            md5: response.data.md5,
                            size: chunk.size
                        };
                        this.updateLocalCache();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resume.prototype.mkFileReq = function () {
        return __awaiter$3(this, void 0, void 0, function () {
            var data, result;
            var _this = this;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign$2(__assign$2(__assign$2({ parts: this.uploadedList.map(function (value, index) { return ({
                                etag: value.etag,
                                // ???????????? index ????????? 1 ??????????????????????????? + 1
                                partNumber: index + 1
                            }); }), fname: this.putExtra.fname }, this.putExtra.mimeType && { mimeType: this.putExtra.mimeType }), this.putExtra.customVars && { customVars: this.putExtra.customVars }), this.putExtra.metadata && { metadata: this.putExtra.metadata });
                        this.logger.info('parts upload completed, make file.', data);
                        return [4 /*yield*/, uploadComplete(this.token, this.key, this.getUploadInfo(), {
                                onCreate: function (xhr) { return _this.addXhr(xhr); },
                                body: JSON.stringify(data)
                            })];
                    case 1:
                        result = _a.sent();
                        this.logger.info('finish Resume Progress.');
                        this.updateMkFileProgress(1);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Resume.prototype.initBeforeUploadChunks = function () {
        return __awaiter$3(this, void 0, void 0, function () {
            var cachedInfo, res, infoMessage;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.uploadedList = [];
                        this.usedCacheList = [];
                        cachedInfo = getLocalFileInfo(this.getLocalKey(), this.logger);
                        if (!!cachedInfo) return [3 /*break*/, 2];
                        this.logger.info('init upload parts from api.');
                        return [4 /*yield*/, initUploadParts(this.token, this.bucketName, this.key, this.uploadHost.getUrl())];
                    case 1:
                        res = _a.sent();
                        this.logger.info("initd upload parts of id: " + res.data.uploadId + ".");
                        this.uploadId = res.data.uploadId;
                        this.cachedUploadedList = [];
                        return [3 /*break*/, 3];
                    case 2:
                        infoMessage = [
                            'resume upload parts from local cache,',
                            "total " + cachedInfo.data.length + " part,",
                            "id is " + cachedInfo.id + "."
                        ];
                        this.logger.info(infoMessage.join(' '));
                        this.cachedUploadedList = cachedInfo.data;
                        this.uploadId = cachedInfo.id;
                        _a.label = 3;
                    case 3:
                        this.chunks = getChunks(this.file, this.config.chunkSize);
                        this.loaded = {
                            mkFileProgress: 0,
                            chunks: this.chunks.map(function (_) { return 0; })
                        };
                        this.notifyResumeProgress();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resume.prototype.getUploadInfo = function () {
        return {
            id: this.uploadId,
            url: this.uploadHost.getUrl()
        };
    };
    Resume.prototype.getLocalKey = function () {
        return createLocalKey(this.file.name, this.key, this.file.size);
    };
    Resume.prototype.updateLocalCache = function () {
        setLocalFileInfo(this.getLocalKey(), {
            id: this.uploadId,
            data: this.uploadedList
        }, this.logger);
    };
    Resume.prototype.updateChunkProgress = function (loaded, index) {
        this.loaded.chunks[index] = loaded;
        this.notifyResumeProgress();
    };
    Resume.prototype.updateMkFileProgress = function (progress) {
        this.loaded.mkFileProgress = progress;
        this.notifyResumeProgress();
    };
    Resume.prototype.notifyResumeProgress = function () {
        var _this = this;
        this.progress = {
            total: this.getProgressInfoItem(sum(this.loaded.chunks) + this.loaded.mkFileProgress, 
            // FIXME: ???????????? fileSize
            this.file.size + 1 // ????????? complete ?????????????????????????????? 100%
            ),
            chunks: this.chunks.map(function (chunk, index) {
                var fromCache = _this.usedCacheList[index];
                return _this.getProgressInfoItem(_this.loaded.chunks[index], chunk.size, fromCache);
            }),
            uploadInfo: {
                id: this.uploadId,
                url: this.uploadHost.getUrl()
            }
        };
        this.onData(this.progress);
    };
    return Resume;
}(Base));

/* eslint-disable no-bitwise */
var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * ?????? class ????????????
 * https://github.com/Stuk/jszip/blob/d4702a70834bd953d4c2d0bc155fad795076631a/lib/crc32.js
 * ??????????????????????????????????????????????????????????????? `>>> 0` ???????????????????????????????????????
 */
var CRC32 = /** @class */ (function () {
    function CRC32() {
        this.crc = -1;
        this.table = this.makeTable();
    }
    CRC32.prototype.makeTable = function () {
        var table = new Array();
        for (var i = 0; i < 256; i++) {
            var t = i;
            for (var j = 0; j < 8; j++) {
                if (t & 1) {
                    // IEEE ??????
                    t = (t >>> 1) ^ 0xEDB88320;
                }
                else {
                    t >>>= 1;
                }
            }
            table[i] = t;
        }
        return table;
    };
    CRC32.prototype.append = function (data) {
        var crc = this.crc;
        for (var offset = 0; offset < data.byteLength; offset++) {
            crc = (crc >>> 8) ^ this.table[(crc ^ data[offset]) & 0xFF];
        }
        this.crc = crc;
    };
    CRC32.prototype.compute = function () {
        return (this.crc ^ -1) >>> 0;
    };
    CRC32.prototype.readAsUint8Array = function (file) {
        return __awaiter$2(this, void 0, void 0, function () {
            var _a;
            return __generator$2(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof file.arrayBuffer === 'function')) return [3 /*break*/, 2];
                        _a = Uint8Array.bind;
                        return [4 /*yield*/, file.arrayBuffer()];
                    case 1: return [2 /*return*/, new (_a.apply(Uint8Array, [void 0, _b.sent()]))()];
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                if (reader.result == null) {
                                    reject();
                                    return;
                                }
                                if (typeof reader.result === 'string') {
                                    reject();
                                    return;
                                }
                                resolve(new Uint8Array(reader.result));
                            };
                            reader.readAsArrayBuffer(file);
                        })];
                }
            });
        });
    };
    CRC32.prototype.file = function (file) {
        return __awaiter$2(this, void 0, void 0, function () {
            var _a, count, index, start, end, chuck;
            return __generator$2(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(file.size <= MB)) return [3 /*break*/, 2];
                        _a = this.append;
                        return [4 /*yield*/, this.readAsUint8Array(file)];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/, this.compute()];
                    case 2:
                        count = Math.ceil(file.size / MB);
                        index = 0;
                        _b.label = 3;
                    case 3:
                        if (!(index < count)) return [3 /*break*/, 6];
                        start = index * MB;
                        end = index === (count - 1) ? file.size : start + MB;
                        return [4 /*yield*/, this.readAsUint8Array(file.slice(start, end))];
                    case 4:
                        chuck = _b.sent();
                        this.append(new Uint8Array(chuck));
                        _b.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, this.compute()];
                }
            });
        });
    };
    CRC32.file = function (file) {
        var crc = new CRC32();
        return crc.file(file);
    };
    return CRC32;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Direct = /** @class */ (function (_super) {
    __extends(Direct, _super);
    function Direct() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Direct.prototype.run = function () {
        return __awaiter$1(this, void 0, void 0, function () {
            var formData, crcSign, customVars_1, result;
            var _this = this;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('start run Direct.');
                        formData = new FormData();
                        formData.append('file', this.file);
                        formData.append('token', this.token);
                        if (this.key != null) {
                            formData.append('key', this.key);
                        }
                        formData.append('fname', this.putExtra.fname);
                        if (!this.config.checkByServer) return [3 /*break*/, 2];
                        return [4 /*yield*/, CRC32.file(this.file)];
                    case 1:
                        crcSign = _a.sent();
                        formData.append('crc32', crcSign.toString());
                        _a.label = 2;
                    case 2:
                        if (this.putExtra.customVars) {
                            this.logger.info('init customVars.');
                            customVars_1 = this.putExtra.customVars;
                            Object.keys(customVars_1).forEach(function (key) { return formData.append(key, customVars_1[key].toString()); });
                            this.logger.info('customVars inited.');
                        }
                        this.logger.info('formData inited.');
                        return [4 /*yield*/, direct(this.uploadHost.getUrl(), formData, {
                                onProgress: function (data) {
                                    _this.updateDirectProgress(data.loaded, data.total);
                                },
                                onCreate: function (xhr) { return _this.addXhr(xhr); }
                            })];
                    case 3:
                        result = _a.sent();
                        this.logger.info('Direct progress finish.');
                        this.finishDirectProgress();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Direct.prototype.updateDirectProgress = function (loaded, total) {
        // ??????????????????????????????????????????100?????????total + 1???????????????????????????
        this.progress = { total: this.getProgressInfoItem(loaded, total + 1) };
        this.onData(this.progress);
    };
    Direct.prototype.finishDirectProgress = function () {
        // ??????????????????????????????xhr ??? progress ????????????????????????progress ??? null????????? fake ???
        if (!this.progress) {
            this.logger.warn('progress is null.');
            this.progress = { total: this.getProgressInfoItem(this.file.size, this.file.size) };
            this.onData(this.progress);
            return;
        }
        var total = this.progress.total;
        this.progress = { total: this.getProgressInfoItem(total.loaded + 1, total.size) };
        this.onData(this.progress);
    };
    return Direct;
}(Base));

/**
 * @param  {string} token ??????????????? token
 * @param  {V3LogInfo} data ?????????????????????
 * @param  {number} retry ??????????????????????????? 3
 * @description v3 ?????????????????????????????????????????? https://github.com/qbox/product/blob/master/kodo/uplog.md#%E7%89%88%E6%9C%AC-3???
 */
function reportV3(token, data, retry) {
    if (retry === void 0) { retry = 3; }
    var xhr = createXHR();
    xhr.open('POST', 'https://uplog.qbox.me/log/3');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', getAuthHeaders(token).Authorization);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status !== 200 && retry > 0) {
            reportV3(token, data, retry - 1);
        }
    };
    // ???????????????https://github.com/qbox/product/blob/master/kodo/uplog.md#%E7%89%88%E6%9C%AC-3
    var stringifyData = [
        data.code || '',
        data.reqId || '',
        data.host || '',
        data.remoteIp || '',
        data.port || '',
        data.duration || '',
        data.time || '',
        data.bytesSent || '',
        data.upType || '',
        data.size || ''
    ].join(',');
    xhr.send(stringifyData);
}

var __read$2 = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread$2 = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$2(arguments[i]));
    return ar;
};
var Logger = /** @class */ (function () {
    function Logger(token, disableReport, level, prefix) {
        if (disableReport === void 0) { disableReport = true; }
        if (level === void 0) { level = 'OFF'; }
        if (prefix === void 0) { prefix = 'UPLOAD'; }
        this.token = token;
        this.disableReport = disableReport;
        this.level = level;
        this.prefix = prefix;
        // ???????????????????????? id
        // ?????????????????????????????????
        this.id = ++Logger.id;
    }
    Logger.prototype.getPrintPrefix = function (level) {
        return "Qiniu-JS-SDK [" + level + "][" + this.prefix + "#" + this.id + "]:";
    };
    /**
     * @param  {V3LogInfo} data ??????????????????
     * @param  {boolean} retry ????????????????????????????????? 3???
     * @description ?????????????????????????????????
     */
    Logger.prototype.report = function (data, retry) {
        if (this.disableReport)
            return;
        try {
            reportV3(this.token, data, retry);
        }
        catch (error) {
            this.warn(error);
        }
    };
    /**
     * @param  {unknown[]} ...args
     * @description ?????? info ????????????????????????
     */
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var allowLevel = ['INFO'];
        if (allowLevel.includes(this.level)) {
            // eslint-disable-next-line no-console
            console.log.apply(console, __spread$2([this.getPrintPrefix('INFO')], args));
        }
    };
    /**
     * @param  {unknown[]} ...args
     * @description ?????? warn ????????????????????????
     */
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var allowLevel = ['INFO', 'WARN'];
        if (allowLevel.includes(this.level)) {
            // eslint-disable-next-line no-console
            console.warn.apply(console, __spread$2([this.getPrintPrefix('WARN')], args));
        }
    };
    /**
     * @param  {unknown[]} ...args
     * @description ?????? error ????????????????????????
     */
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var allowLevel = ['INFO', 'WARN', 'ERROR'];
        if (allowLevel.includes(this.level)) {
            // eslint-disable-next-line no-console
            console.error.apply(console, __spread$2([this.getPrintPrefix('ERROR')], args));
        }
    };
    Logger.id = 0;
    return Logger;
}());

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read$1 = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread$1 = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
    return ar;
};
/**
  * @description ???????????????key ??? host???value ???????????????
  */
var unfreezeTimeMap = new Map();
var Host = /** @class */ (function () {
    function Host(host, protocol) {
        this.host = host;
        this.protocol = protocol;
    }
    /**
     * @description ?????? host ?????????????????????
     */
    Host.prototype.isFrozen = function () {
        var currentTime = new Date().getTime();
        var unfreezeTime = unfreezeTimeMap.get(this.host);
        return unfreezeTime != null && unfreezeTime >= currentTime;
    };
    /**
     * @param  {number} time ?????????????????? 20s
     * @description ????????? host ???????????? host ??????????????????????????????
     */
    Host.prototype.freeze = function (time) {
        if (time === void 0) { time = 20; }
        var unfreezeTime = new Date().getTime() + (time * 1000);
        unfreezeTimeMap.set(this.host, unfreezeTime);
    };
    /**
     * @description ????????? host
     */
    Host.prototype.unfreeze = function () {
        unfreezeTimeMap["delete"](this.host);
    };
    /**
     * @description ???????????? host ????????? url
     */
    Host.prototype.getUrl = function () {
        return this.protocol + "://" + this.host;
    };
    /**
     * @description ??????????????????
     */
    Host.prototype.getUnfreezeTime = function () {
        return unfreezeTimeMap.get(this.host);
    };
    return Host;
}());
var HostPool = /** @class */ (function () {
    /**
     * @param  {string[]} initHosts
     * @description ???????????????????????? initHosts????????? host ???????????????????????? initHosts ?????????????????????
     */
    function HostPool(initHosts) {
        if (initHosts === void 0) { initHosts = []; }
        this.initHosts = initHosts;
        /**
         * @description ????????? host ????????? bucket ??? accessKey ?????? key
         */
        this.cachedHostsMap = new Map();
    }
    /**
     * @param  {string} accessKey
     * @param  {string} bucketName
     * @param  {string[]} hosts
     * @param  {InternalConfig['upprotocol']} protocol
     * @returns  {void}
     * @description ???????????? host
     */
    HostPool.prototype.register = function (accessKey, bucketName, hosts, protocol) {
        this.cachedHostsMap.set(accessKey + "@" + bucketName, hosts.map(function (host) { return new Host(host, protocol); }));
    };
    /**
     * @param  {string} accessKey
     * @param  {string} bucketName
     * @param  {InternalConfig['upprotocol']} protocol
     * @returns  {Promise<void>}
     * @description ??????????????? host ??????????????????????????????????????????????????? host ?????????????????????????????????????????????
     */
    HostPool.prototype.refresh = function (accessKey, bucketName, protocol) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var cachedHostList, response, stashHosts;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        cachedHostList = this.cachedHostsMap.get(accessKey + "@" + bucketName) || [];
                        if (cachedHostList.length > 0)
                            return [2 /*return*/];
                        if (this.initHosts.length > 0) {
                            this.register(accessKey, bucketName, this.initHosts, protocol);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, getUpHosts(accessKey, bucketName, protocol)];
                    case 1:
                        response = _e.sent();
                        if ((response === null || response === void 0 ? void 0 : response.data) != null) {
                            stashHosts = __spread$1((((_b = (_a = response.data.up) === null || _a === void 0 ? void 0 : _a.acc) === null || _b === void 0 ? void 0 : _b.main) || []), (((_d = (_c = response.data.up) === null || _c === void 0 ? void 0 : _c.acc) === null || _d === void 0 ? void 0 : _d.backup) || []));
                            this.register(accessKey, bucketName, stashHosts, protocol);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param  {string} accessKey
     * @param  {string} bucketName
     * @param  {InternalConfig['upprotocol']} protocol
     * @returns  {Promise<Host | null>}
     * @description ??????????????????????????? Host?????????????????????
     */
    HostPool.prototype.getUp = function (accessKey, bucketName, protocol) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedHostList, availableHostList, priorityQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refresh(accessKey, bucketName, protocol)];
                    case 1:
                        _a.sent();
                        cachedHostList = this.cachedHostsMap.get(accessKey + "@" + bucketName) || [];
                        if (cachedHostList.length === 0)
                            return [2 /*return*/, null];
                        availableHostList = cachedHostList.filter(function (host) { return !host.isFrozen(); });
                        if (availableHostList.length > 0)
                            return [2 /*return*/, availableHostList[0]
                                // ??????????????????????????????????????? host
                            ];
                        priorityQueue = cachedHostList
                            .slice().sort(function (hostA, hostB) { return (hostA.getUnfreezeTime() || 0) - (hostB.getUnfreezeTime() || 0); });
                        return [2 /*return*/, priorityQueue[0]];
                }
            });
        });
    };
    return HostPool;
}());

function createUploadManager(options, handlers, hostPool, logger) {
    if (options.config && options.config.forceDirect) {
        logger.info('ues forceDirect mode.');
        return new Direct(options, handlers, hostPool, logger);
    }
    if (options.file.size > 4 * MB) {
        logger.info('file size over 4M, use Resume.');
        return new Resume(options, handlers, hostPool, logger);
    }
    logger.info('file size less or equal than 4M, use Direct.');
    return new Direct(options, handlers, hostPool, logger);
}
/**
 * @param file ????????????
 * @param key ???????????????
 * @param token ????????????
 * @param putExtra ???????????????????????????????????????
 * @param config ?????????????????????
 * @returns ??????????????????????????????????????????
 */
function upload(file, key, token, putExtra, config) {
    // ?????????????????????????????? Logger
    var logger = new Logger(token, config === null || config === void 0 ? void 0 : config.disableStatisticsReport, config === null || config === void 0 ? void 0 : config.debugLogLevel, file.name);
    var options = {
        file: file,
        key: key,
        token: token,
        putExtra: putExtra,
        config: normalizeUploadConfig(config, logger)
    };
    // ?????? host ???
    var hostPool = new HostPool(options.config.uphost);
    return new Observable(function (observer) {
        var manager = createUploadManager(options, {
            onData: function (data) { return observer.next(data); },
            onError: function (err) { return observer.error(err); },
            onComplete: function (res) { return observer.complete(res); }
        }, hostPool, logger);
        manager.putFile();
        return manager.stop.bind(manager);
    });
}

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function normalizeUploadConfig(config, logger) {
    var _a = __assign$1({}, config), upprotocol = _a.upprotocol, uphost = _a.uphost, otherConfig = __rest(_a, ["upprotocol", "uphost"]);
    var normalizeConfig = __assign$1({ uphost: [], retryCount: 3, checkByMD5: false, forceDirect: false, useCdnDomain: true, checkByServer: false, concurrentRequestLimit: 3, chunkSize: DEFAULT_CHUNK_SIZE, upprotocol: 'https', debugLogLevel: 'OFF', disableStatisticsReport: false }, otherConfig);
    // ??????????????? http: https: ?????????
    if (upprotocol) {
        normalizeConfig.upprotocol = upprotocol
            .replace(/:$/, '');
    }
    var hostList = [];
    if (logger && (config === null || config === void 0 ? void 0 : config.uphost) != null && (config === null || config === void 0 ? void 0 : config.region) != null) {
        logger.warn('do not use both the uphost and region config.');
    }
    // ????????????????????? uphost ???????????????????????? host ??????
    if (uphost) {
        if (Array.isArray(uphost)) {
            hostList.push.apply(hostList, __spread(uphost));
        }
        else {
            hostList.push(uphost);
        }
        // ???????????????????????? region??????????????? region ??? host ????????? host ??????
    }
    else if (normalizeConfig === null || normalizeConfig === void 0 ? void 0 : normalizeConfig.region) {
        var hostMap = regionUphostMap[normalizeConfig === null || normalizeConfig === void 0 ? void 0 : normalizeConfig.region];
        if (normalizeConfig.useCdnDomain) {
            hostList.push.apply(hostList, __spread(hostMap.cdnUphost));
        }
        else {
            hostList.push.apply(hostList, __spread(hostMap.srcUphost));
        }
    }
    return __assign$1(__assign$1({}, normalizeConfig), { uphost: hostList.filter(Boolean) });
}

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mimeTypes = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    WEBP: 'image/webp',
    BMP: 'image/bmp'
};
Object.keys(mimeTypes).map(function (type) { return mimeTypes[type]; });
mimeTypes.JPEG;

var cosJsSdkV5 = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(self, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var COS = __webpack_require__(/*! ./src/cos */ "./src/cos.js");

module.exports = COS;

/***/ }),

/***/ "./lib/beacon.min.js":
/*!***************************!*\
  !*** ./lib/beacon.min.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

!function (t, e) {
  "object" == ( _typeof(exports)) && "undefined" != typeof module ? module.exports = e() :  !(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;
}(this, function () {

  var _t = function t(e, n) {
    return _t = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }
    }, _t(e, n);
  };

  var _e = function e() {
    return _e = Object.assign || function (t) {
      for (var e, n = 1, r = arguments.length; n < r; n++) {
        for (var o in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
      }

      return t;
    }, _e.apply(this, arguments);
  };

  function n(t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function s(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }

      function a(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }

      function u(t) {
        var e;
        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {
          t(e);
        })).then(s, a);
      }

      u((r = r.apply(t, e || [])).next());
    });
  }

  function r(t, e) {
    var n,
        r,
        o,
        i,
        s = {
      label: 0,
      sent: function sent() {
        if (1 & o[0]) throw o[1];
        return o[1];
      },
      trys: [],
      ops: []
    };
    return i = {
      next: a(0),
      throw: a(1),
      return: a(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
      return this;
    }), i;

    function a(i) {
      return function (a) {
        return function (i) {
          if (n) throw new TypeError("Generator is already executing.");

          for (; s;) {
            try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return s.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  s.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = s.ops.pop(), s.trys.pop();
                  continue;

                default:
                  if (!(o = s.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                    s = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    s.label = i[1];
                    break;
                  }

                  if (6 === i[0] && s.label < o[1]) {
                    s.label = o[1], o = i;
                    break;
                  }

                  if (o && s.label < o[2]) {
                    s.label = o[2], s.ops.push(i);
                    break;
                  }

                  o[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }

              i = e.call(t, s);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }
          }

          if (5 & i[0]) throw i[1];
          return {
            value: i[0] ? i[1] : void 0,
            done: !0
          };
        }([i, a]);
      };
    }
  }

  var o = "__BEACON_",
      i = "__BEACON_deviceId",
      s = "last_report_time",
      a = "sending_event_ids",
      u = "beacon_config",
      c = "beacon_config_request_time",
      l = function () {
    function t() {
      var t = this;
      this.emit = function (e, n) {
        if (t) {
          var r,
              o = t.__EventsList[e];

          if (null == o ? void 0 : o.length) {
            o = o.slice();

            for (var i = 0; i < o.length; i++) {
              r = o[i];

              try {
                var s = r.callback.apply(t, [n]);
                if (1 === r.type && t.remove(e, r.callback), !1 === s) break;
              } catch (t) {
                throw t;
              }
            }
          }

          return t;
        }
      }, this.__EventsList = {};
    }

    return t.prototype.indexOf = function (t, e) {
      for (var n = 0; n < t.length; n++) {
        if (t[n].callback === e) return n;
      }

      return -1;
    }, t.prototype.on = function (t, e, n) {
      if (void 0 === n && (n = 0), this) {
        var r = this.__EventsList[t];

        if (r || (r = this.__EventsList[t] = []), -1 === this.indexOf(r, e)) {
          var o = {
            name: t,
            type: n || 0,
            callback: e
          };
          return r.push(o), this;
        }

        return this;
      }
    }, t.prototype.one = function (t, e) {
      this.on(t, e, 1);
    }, t.prototype.remove = function (t, e) {
      if (this) {
        var n = this.__EventsList[t];
        if (!n) return null;

        if (!e) {
          try {
            delete this.__EventsList[t];
          } catch (t) {}

          return null;
        }

        if (n.length) {
          var r = this.indexOf(n, e);
          n.splice(r, 1);
        }

        return this;
      }
    }, t;
  }();

  function p(t, e) {
    for (var n = {}, r = 0, o = Object.keys(t); r < o.length; r++) {
      var i = o[r],
          s = t[i];
      if ("string" == typeof s) n[h(i)] = h(s);else {
        if (e) throw new Error("value mast be string  !!!!");
        n[h(String(i))] = h(String(s));
      }
    }

    return n;
  }

  function h(t) {
    if ("string" != typeof t) return t;

    try {
      return t.replace(new RegExp("\\|", "g"), "%7C").replace(new RegExp("\\&", "g"), "%26").replace(new RegExp("\\=", "g"), "%3D").replace(new RegExp("\\+", "g"), "%2B");
    } catch (t) {
      return "";
    }
  }

  function f(t) {
    return String(t.A99) + String(t.A100);
  }

  var d = function d() {};

  var v = function () {
    function t(t) {
      var n = this;
      this.lifeCycle = new l(), this.uploadJobQueue = [], this.additionalParams = {}, this.delayTime = 0, this._normalLogPipeline = function (t) {
        if (!t || !t.reduce || !t.length) throw new TypeError("createPipeline ????????????????????????????????? pipe ?????????");
        return 1 === t.length ? function (e, n) {
          t[0](e, n || d);
        } : t.reduce(function (t, e) {
          return function (n, r) {
            return void 0 === r && (r = d), t(n, function (t) {
              return null == e ? void 0 : e(t, r);
            });
          };
        });
      }([function (t) {
        n.send({
          url: n.strategy.getUploadUrl(),
          data: t,
          method: "post",
          contentType: "application/json;charset=UTF-8"
        }, function () {
          var e = n.config.onReportSuccess;
          "function" == typeof e && e(JSON.stringify(t.events));
        }, function () {
          var e = n.config.onReportFail;
          "function" == typeof e && e(JSON.stringify(t.events));
        });
      }]), function (t, e) {
        if (!t) throw e instanceof Error ? e : new Error(e);
      }(Boolean(t.appkey), "appkey must be initial"), this.config = _e({}, t);
    }

    return t.prototype.onUserAction = function (t, e) {
      this.preReport(t, e, !1);
    }, t.prototype.onDirectUserAction = function (t, e) {
      this.preReport(t, e, !0);
    }, t.prototype.preReport = function (t, e, n) {
      t ? this.strategy.isEventUpOnOff() && (this.strategy.isBlackEvent(t) || this.strategy.isSampleEvent(t) || this.onReport(t, e, n)) : this.errorReport.reportError("602", " no eventCode");
    }, t.prototype.addAdditionalParams = function (t) {
      for (var e = 0, n = Object.keys(t); e < n.length; e++) {
        var r = n[e];
        this.additionalParams[r] = t[r];
      }
    }, t.prototype.setChannelId = function (t) {
      this.commonInfo.channelID = String(t);
    }, t.prototype.setOpenId = function (t) {
      this.commonInfo.openid = String(t);
    }, t.prototype.setUnionid = function (t) {
      this.commonInfo.unid = String(t);
    }, t.prototype.getDeviceId = function () {
      return this.commonInfo.deviceId;
    }, t.prototype.getCommonInfo = function () {
      return this.commonInfo;
    }, t.prototype.removeSendingId = function (t) {
      try {
        var e = JSON.parse(this.storage.getItem(a)),
            n = e.indexOf(t);
        -1 != n && (e.splice(n, 1), this.storage.setItem(a, JSON.stringify(e)));
      } catch (t) {}
    }, t;
  }(),
      g = function () {
    function t(t, e, n, r) {
      this.requestParams = {}, this.network = r, this.requestParams.attaid = "00400014144", this.requestParams.token = "6478159937", this.requestParams.product_id = t.appkey, this.requestParams.platform = n, this.requestParams.uin = e.deviceId, this.requestParams.model = "", this.requestParams.os = n, this.requestParams.app_version = t.appVersion, this.requestParams.sdk_version = e.sdkVersion, this.requestParams.error_stack = "", this.uploadUrl = t.isOversea ? "https://htrace.wetvinfo.com/kv" : "https://h.trace.qq.com/kv";
    }

    return t.prototype.reportError = function (t, e) {
      this.requestParams._dc = Math.random(), this.requestParams.error_msg = e, this.requestParams.error_code = t, this.network.get(this.uploadUrl, {
        params: this.requestParams
      }).catch(function (t) {});
    }, t;
  }(),
      y = function () {
    function t(t, e, n, r, o) {
      this.strategy = {
        isEventUpOnOff: !0,
        httpsUploadUrl: "https://otheve.beacon.qq.com/analytics/v2_upload",
        requestInterval: 30,
        blacklist: [],
        samplelist: []
      }, this.realSample = {}, this.appkey = "", this.needQueryConfig = !0, this.appkey = e.appkey, this.storage = r, this.needQueryConfig = t;

      try {
        var i = JSON.parse(this.storage.getItem(u));
        i && this.processData(i);
      } catch (t) {}

      e.isOversea && (this.strategy.httpsUploadUrl = "https://svibeacon.onezapp.com/analytics/v2_upload"), !e.isOversea && this.needRequestConfig() && this.requestConfig(e.appVersion, n, o);
    }

    return t.prototype.requestConfig = function (t, e, n) {
      var r = this;
      this.storage.setItem(c, Date.now().toString()), n.post("https://oth.str.beacon.qq.com/trpc.beacon.configserver.BeaconConfigService/QueryConfig", {
        platformId: "undefined" == typeof wx ? "3" : "4",
        mainAppKey: this.appkey,
        appVersion: t,
        sdkVersion: e.sdkVersion,
        osVersion: e.userAgent,
        model: "",
        packageName: "",
        params: {
          A3: e.deviceId
        }
      }).then(function (t) {
        if (0 == t.data.ret) try {
          var e = JSON.parse(t.data.beaconConfig);
          e && (r.processData(e), r.storage.setItem(u, t.data.beaconConfig));
        } catch (t) {} else r.processData(null), r.storage.setItem(u, "");
      }).catch(function (t) {});
    }, t.prototype.processData = function (t) {
      var e, n, r, o, i;
      this.strategy.isEventUpOnOff = null !== (e = null == t ? void 0 : t.isEventUpOnOff) && void 0 !== e ? e : this.strategy.isEventUpOnOff, this.strategy.httpsUploadUrl = null !== (n = null == t ? void 0 : t.httpsUploadUrl) && void 0 !== n ? n : this.strategy.httpsUploadUrl, this.strategy.requestInterval = null !== (r = null == t ? void 0 : t.requestInterval) && void 0 !== r ? r : this.strategy.requestInterval, this.strategy.blacklist = null !== (o = null == t ? void 0 : t.blacklist) && void 0 !== o ? o : this.strategy.blacklist, this.strategy.samplelist = null !== (i = null == t ? void 0 : t.samplelist) && void 0 !== i ? i : this.strategy.samplelist;

      for (var s = 0, a = this.strategy.samplelist; s < a.length; s++) {
        var u = a[s].split(",");
        2 == u.length && (this.realSample[u[0]] = u[1]);
      }
    }, t.prototype.needRequestConfig = function () {
      if (!this.needQueryConfig) return !1;
      var t = Number(this.storage.getItem(c));
      return Date.now() - t > 60 * this.strategy.requestInterval * 1e3;
    }, t.prototype.getUploadUrl = function () {
      return this.strategy.httpsUploadUrl + "?appkey=" + this.appkey;
    }, t.prototype.isBlackEvent = function (t) {
      return -1 != this.strategy.blacklist.indexOf(t);
    }, t.prototype.isEventUpOnOff = function () {
      return this.strategy.isEventUpOnOff;
    }, t.prototype.isSampleEvent = function (t) {
      return !!Object.prototype.hasOwnProperty.call(this.realSample, t) && this.realSample[t] < Math.floor(Math.random() * Math.floor(1e4));
    }, t;
  }(),
      m = "session_storage_key",
      w = function () {
    function t(t, e, n) {
      this.getSessionStackDepth = 0, this.beacon = n, this.storage = t, this.duration = e, this.appkey = n.config.appkey;
    }

    return t.prototype.getSession = function () {
      this.getSessionStackDepth += 1;
      var t = this.storage.getItem(m);
      if (!t) return this.createSession();
      var e = "",
          n = 0;

      try {
        var r = JSON.parse(t) || {
          sessionId: void 0,
          sessionStart: void 0
        };
        if (!r.sessionId || !r.sessionStart) return this.createSession();
        var o = Number(this.storage.getItem(s));
        if (Date.now() - o > this.duration) return this.createSession();
        e = r.sessionId, n = r.sessionStart, this.getSessionStackDepth = 0;
      } catch (t) {}

      return {
        sessionId: e,
        sessionStart: n
      };
    }, t.prototype.createSession = function () {
      var t = Date.now(),
          e = {
        sessionId: this.appkey + "_" + t.toString(),
        sessionStart: t
      };
      this.storage.setItem(m, JSON.stringify(e)), this.storage.setItem(s, t.toString());
      var n = "is_new_user",
          r = this.storage.getItem(n);
      return this.getSessionStackDepth <= 1 && this.beacon.onDirectUserAction("rqd_applaunched", {
        A21: r ? "N" : "Y"
      }), this.storage.setItem(n, JSON.stringify(!1)), e;
    }, t;
  }();

  function b() {
    var t = navigator.userAgent,
        e = t.indexOf("compatible") > -1 && t.indexOf("MSIE") > -1,
        n = t.indexOf("Edge") > -1 && !e,
        r = t.indexOf("Trident") > -1 && t.indexOf("rv:11.0") > -1;

    if (e) {
      new RegExp("MSIE (\\d+\\.\\d+);").test(t);
      var o = parseFloat(RegExp.$1);
      return 7 == o ? 7 : 8 == o ? 8 : 9 == o ? 9 : 10 == o ? 10 : 6;
    }

    return n ? -2 : r ? 11 : -1;
  }

  function S(t, e) {
    var n, r;
    return (n = "https://tun-cos-1258344701.file.myqcloud.com/fp.js", void 0 === r && (r = Date.now() + "-" + Math.random()), new Promise(function (t, e) {
      if (document.getElementById(r)) t(void 0);else {
        var o = document.getElementsByTagName("head")[0],
            i = document.createElement("script");
        i.onload = function () {
          return function () {
            i.onload = null, t(void 0);
          };
        }, i.onerror = function (t) {
          i.onerror = null, o.removeChild(i), e(t);
        }, i.src = n, i.id = r, o.appendChild(i);
      }
    })).then(function () {
      new Fingerprint().getQimei36(t, e);
    }).catch(function (t) {}), "";
  }

  var _I = function I() {
    return (_I = Object.assign || function (t) {
      for (var e, n = 1, r = arguments.length; n < r; n++) {
        for (var o in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
      }

      return t;
    }).apply(this, arguments);
  };

  var E,
      k = function () {
    function t(t, e) {
      void 0 === e && (e = {}), this.reportOptions = {}, this.config = t, this.reportOptions = e;
    }

    return t.canUseDB = function () {
      return !!(null === window || void 0 === window ? void 0 : window.indexedDB);
    }, t.prototype.openDB = function () {
      var e = this;
      return new Promise(function (n, r) {
        if (!t.canUseDB()) return r({
          message: "??????????????? indexeddb"
        });
        var o = e.config,
            i = o.name,
            s = o.version,
            a = o.stores,
            u = indexedDB.open(i, s);
        u.onsuccess = function () {
          e.db = u.result, n(), _I({
            result: 1,
            func: "open",
            params: JSON.stringify(e.config)
          }, e.reportOptions);
        }, u.onerror = function (t) {
          var n, o;
          r(t), _I({
            result: 0,
            func: "open",
            params: JSON.stringify(e.config),
            error_msg: null === (o = null === (n = t.target) || void 0 === n ? void 0 : n.error) || void 0 === o ? void 0 : o.message
          }, e.reportOptions);
        }, u.onupgradeneeded = function () {
          e.db = u.result;

          try {
            null == a || a.forEach(function (t) {
              e.createStore(t);
            });
          } catch (t) {
            _I({
              result: 0,
              func: "open",
              params: JSON.stringify(e.config),
              error_msg: t.message
            }, e.reportOptions), r(t);
          }
        };
      });
    }, t.prototype.useStore = function (t) {
      return this.storeName = t, this;
    }, t.prototype.deleteDB = function () {
      var t = this;
      return this.closeDB(), new Promise(function (e, n) {
        var r = indexedDB.deleteDatabase(t.config.name);
        r.onsuccess = function () {
          return e();
        }, r.onerror = n;
      });
    }, t.prototype.closeDB = function () {
      var t;
      null === (t = this.db) || void 0 === t || t.close(), this.db = null;
    }, t.prototype.getStoreCount = function () {
      var t = this;
      return new Promise(function (e, n) {
        var r = t.getStore("readonly").count();
        r.onsuccess = function () {
          return e(r.result);
        }, r.onerror = n;
      });
    }, t.prototype.clearStore = function () {
      var t = this;
      return new Promise(function (e, n) {
        var r = t.getStore("readwrite").clear();
        r.onsuccess = function () {
          return e();
        }, r.onerror = n;
      });
    }, t.prototype.add = function (t, e) {
      var n = this;
      return new Promise(function (r, o) {
        var i = n.getStore("readwrite").add(t, e);
        i.onsuccess = function () {
          r(i.result);
        }, i.onerror = o;
      });
    }, t.prototype.put = function (t, e) {
      var n = this;
      return new Promise(function (r, o) {
        var i = n.getStore("readwrite").put(t, e);
        i.onsuccess = function () {
          r(i.result);
        }, i.onerror = o;
      });
    }, t.prototype.getStoreAllData = function () {
      var t = this;
      return new Promise(function (e, n) {
        var r = t.getStore("readonly").openCursor(),
            o = [];
        r.onsuccess = function () {
          var t;

          if (null === (t = r.result) || void 0 === t ? void 0 : t.value) {
            var n = r.result.value;
            o.push(n), r.result.continue();
          } else e(o);
        }, r.onerror = n;
      });
    }, t.prototype.getDataRangeByIndex = function (t, e, n, r, o) {
      var i = this;
      return new Promise(function (s, a) {
        var u = i.getStore().index(t),
            c = IDBKeyRange.bound(e, n, r, o),
            l = [],
            p = u.openCursor(c);
        p.onsuccess = function () {
          var t;
          (null === (t = null == p ? void 0 : p.result) || void 0 === t ? void 0 : t.value) ? (l.push(null == p ? void 0 : p.result.value), null == p || p.result.continue()) : s(l);
        }, p.onerror = a;
      });
    }, t.prototype.removeDataByIndex = function (t, e, n, r, o) {
      var i = this;
      return new Promise(function (s, a) {
        var u = i.getStore("readwrite").index(t),
            c = IDBKeyRange.bound(e, n, r, o),
            l = u.openCursor(c),
            p = 0;
        l.onsuccess = function (t) {
          var e = t.target.result;
          e ? (p += 1, e.delete(), e.continue()) : s(p);
        }, l.onerror = a;
      });
    }, t.prototype.createStore = function (t) {
      var e = t.name,
          n = t.indexes,
          r = void 0 === n ? [] : n,
          o = t.options;

      if (this.db) {
        this.db.objectStoreNames.contains(e) && this.db.deleteObjectStore(e);
        var i = this.db.createObjectStore(e, o);
        r.forEach(function (t) {
          i.createIndex(t.indexName, t.keyPath, t.options);
        });
      }
    }, t.prototype.getStore = function (t) {
      var e;
      return void 0 === t && (t = "readonly"), null === (e = this.db) || void 0 === e ? void 0 : e.transaction(this.storeName, t).objectStore(this.storeName);
    }, t;
  }(),
      O = "event_table_v3",
      C = "eventId",
      D = function () {
    function t(t) {
      this.isReady = !1, this.taskQueue = Promise.resolve(), this.db = new k({
        name: "Beacon_" + t + "_V3",
        version: 1,
        stores: [{
          name: O,
          options: {
            keyPath: C
          },
          indexes: [{
            indexName: C,
            keyPath: C,
            options: {
              unique: !0
            }
          }]
        }]
      }), this.open();
    }

    return t.prototype.getCount = function () {
      var t = this;
      return this.readyExec(function () {
        return t.db.getStoreCount();
      });
    }, t.prototype.setItem = function (t, e) {
      var n = this;
      return this.readyExec(function () {
        return n.db.add({
          eventId: t,
          value: e
        });
      });
    }, t.prototype.getItem = function (t) {
      return n(this, void 0, void 0, function () {
        var e = this;
        return r(this, function (n) {
          return [2, this.readyExec(function () {
            return e.db.getDataRangeByIndex(C, t, t);
          })];
        });
      });
    }, t.prototype.removeItem = function (t) {
      var e = this;
      return this.readyExec(function () {
        return e.db.removeDataByIndex(C, t, t);
      });
    }, t.prototype.updateItem = function (t, e) {
      var n = this;
      return this.readyExec(function () {
        return n.db.put({
          eventId: t,
          value: e
        });
      });
    }, t.prototype.iterate = function (t) {
      var e = this;
      return this.readyExec(function () {
        return e.db.getStoreAllData().then(function (e) {
          e.forEach(function (e) {
            t(e.value);
          });
        });
      });
    }, t.prototype.open = function () {
      return n(this, void 0, void 0, function () {
        var t = this;
        return r(this, function (e) {
          switch (e.label) {
            case 0:
              return this.taskQueue = this.taskQueue.then(function () {
                return t.db.openDB();
              }), [4, this.taskQueue];

            case 1:
              return e.sent(), this.isReady = !0, this.db.useStore(O), [2];
          }
        });
      });
    }, t.prototype.readyExec = function (t) {
      return this.isReady ? t() : (this.taskQueue = this.taskQueue.then(function () {
        return t();
      }), this.taskQueue);
    }, t;
  }(),
      x = function () {
    function t(t) {
      this.keyObject = {}, this.storage = t;
    }

    return t.prototype.getCount = function () {
      return this.storage.getStoreCount();
    }, t.prototype.removeItem = function (t) {
      this.storage.removeItem(t), delete this.keyObject[t];
    }, t.prototype.setItem = function (t, e) {
      var n = JSON.stringify(e);
      this.storage.setItem(t, n), this.keyObject[t] = e;
    }, t.prototype.iterate = function (t) {
      for (var e = Object.keys(this.keyObject), n = 0; n < e.length; n++) {
        var r = this.storage.getItem(e[n]);
        t(JSON.parse(r));
      }
    }, t;
  }(),
      _ = function () {
    function t(t, e) {
      var n = this;
      this.dbEventCount = 0, b() > 0 || !window.indexedDB || /X5Lite/.test(navigator.userAgent) ? (this.store = new x(e), this.dbEventCount = this.store.getCount()) : (this.store = new D(t), this.getCount().then(function (t) {
        n.dbEventCount = t;
      }).catch(function (t) {}));
    }

    return t.prototype.getCount = function () {
      return n(this, void 0, void 0, function () {
        return r(this, function (t) {
          switch (t.label) {
            case 0:
              return t.trys.push([0, 2,, 3]), [4, this.store.getCount()];

            case 1:
              return [2, t.sent()];

            case 2:
              return t.sent(), [2, Promise.reject()];

            case 3:
              return [2];
          }
        });
      });
    }, t.prototype.insertEvent = function (t, e) {
      return n(this, void 0, void 0, function () {
        var n, o;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              if (this.dbEventCount >= 1e4) return [2, Promise.reject()];
              n = f(t.mapValue), r.label = 1;

            case 1:
              return r.trys.push([1, 3,, 4]), this.dbEventCount++, [4, this.store.setItem(n, t)];

            case 2:
              return [2, r.sent()];

            case 3:
              return o = r.sent(), e && e(o, t), this.dbEventCount--, [2, Promise.reject()];

            case 4:
              return [2];
          }
        });
      });
    }, t.prototype.getEvents = function () {
      return n(this, void 0, void 0, function () {
        var t;
        return r(this, function (e) {
          switch (e.label) {
            case 0:
              t = [], e.label = 1;

            case 1:
              return e.trys.push([1, 3,, 4]), [4, this.store.iterate(function (e) {
                t.push(e);
              })];

            case 2:
              return e.sent(), [2, Promise.all(t)];

            case 3:
              return e.sent(), [2, Promise.all(t)];

            case 4:
              return [2];
          }
        });
      });
    }, t.prototype.removeEvent = function (t) {
      return n(this, void 0, void 0, function () {
        var e;
        return r(this, function (n) {
          switch (n.label) {
            case 0:
              e = f(t.mapValue), n.label = 1;

            case 1:
              return n.trys.push([1, 3,, 4]), this.dbEventCount--, [4, this.store.removeItem(e)];

            case 2:
              return [2, n.sent()];

            case 3:
              return n.sent(), this.dbEventCount++, [2, Promise.reject()];

            case 4:
              return [2];
          }
        });
      });
    }, t;
  }(),
      _P = function P() {
    return (_P = Object.assign || function (t) {
      for (var e, n = 1, r = arguments.length; n < r; n++) {
        for (var o in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
      }

      return t;
    }).apply(this, arguments);
  };

  function T(t) {
    try {
      return decodeURIComponent(t.replace(/\+/g, " "));
    } catch (t) {
      return null;
    }
  }

  function U(t, e) {
    var n = [null, void 0, "", NaN].includes(t);
    if (e.isSkipEmpty && n) return null;
    var r = !e.isSkipEmpty && n ? "" : t;

    try {
      return e.encode ? encodeURIComponent(r) : r;
    } catch (t) {
      return null;
    }
  }

  function N(t, e) {
    void 0 === e && (e = {
      encode: !0,
      isSkipEmpty: !1
    });

    var n = t.url,
        r = t.query,
        o = void 0 === r ? {} : r,
        i = t.hash,
        s = n.split("#"),
        a = s[0],
        u = s[1],
        c = void 0 === u ? "" : u,
        l = a.split("?")[0],
        p = [],
        h = U(i || c, e),
        f = _P(_P({}, function (t) {
      var e = t.split("#"),
          n = e[0],
          r = e[1],
          o = void 0 === r ? "" : r,
          i = n.split("?"),
          s = i[0],
          a = i[1],
          u = void 0 === a ? "" : a,
          c = T(o),
          l = Object.create(null);
      return u.split("&").forEach(function (t) {
        var e = t.split("="),
            n = e[0],
            r = e[1],
            o = void 0 === r ? "" : r,
            i = T(n),
            s = T(o);
        null === i || null === s || "" === i && "" === s || l[i] || (l[i] = s);
      }), {
        url: s,
        query: l,
        hash: c
      };
    }(n).query), o);

    return Object.keys(f).forEach(function (t) {
      var n = U(t, e),
          r = U(f[t], e);
      null !== n && null !== r && p.push(n + "=" + r);
    }), l + (p.length ? "?" + p.join("&") : "") + (h ? "#" + h : "");
  }

  function j(t, e) {
    return new Promise(function (n, r) {
      if (e && document.querySelectorAll("script[data-tag=" + e + "]").length) return n();

      var o = document.createElement("script"),
          i = _P({
        type: "text/javascript",
        charset: "utf-8"
      }, t);

      Object.keys(i).forEach(function (t) {
        return function (t, e, n) {
          if (t) return void 0 === n ? t.getAttribute(e) : t.setAttribute(e, n);
        }(o, t, i[t]);
      }), e && (o.dataset.tag = e), o.onload = function () {
        return n();
      }, o.onreadystatechange = function () {
        var t = o.readyState;
        ["complete", "loaded"].includes(t) && (o.onreadystatechange = null, n());
      }, o.onerror = r, document.body.appendChild(o);
    });
  }

  !function (t) {
    t[t.equal = 0] = "equal", t[t.low = -1] = "low", t[t.high = 1] = "high";
  }(E || (E = {}));

  var _q = function q() {
    return (_q = Object.assign || function (t) {
      for (var e, n = 1, r = arguments.length; n < r; n++) {
        for (var o in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
      }

      return t;
    }).apply(this, arguments);
  };

  function A(t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function s(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }

      function a(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }

      function u(t) {
        var e;
        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {
          t(e);
        })).then(s, a);
      }

      u((r = r.apply(t, e || [])).next());
    });
  }

  function R(t, e) {
    var n,
        r,
        o,
        i,
        s = {
      label: 0,
      sent: function sent() {
        if (1 & o[0]) throw o[1];
        return o[1];
      },
      trys: [],
      ops: []
    };
    return i = {
      next: a(0),
      throw: a(1),
      return: a(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
      return this;
    }), i;

    function a(i) {
      return function (a) {
        return function (i) {
          if (n) throw new TypeError("Generator is already executing.");

          for (; s;) {
            try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return s.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  s.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = s.ops.pop(), s.trys.pop();
                  continue;

                default:
                  if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                    s = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    s.label = i[1];
                    break;
                  }

                  if (6 === i[0] && s.label < o[1]) {
                    s.label = o[1], o = i;
                    break;
                  }

                  if (o && s.label < o[2]) {
                    s.label = o[2], s.ops.push(i);
                    break;
                  }

                  o[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }

              i = e.call(t, s);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }
          }

          if (5 & i[0]) throw i[1];
          return {
            value: i[0] ? i[1] : void 0,
            done: !0
          };
        }([i, a]);
      };
    }
  }

  var B = function () {
    function t() {
      this.interceptors = [];
    }

    return t.prototype.use = function (t, e) {
      return this.interceptors.push({
        resolved: t,
        rejected: e
      }), this.interceptors.length - 1;
    }, t.prototype.traverse = function (t, e) {
      void 0 === e && (e = !1);
      var n = Promise.resolve(t);
      return (e ? Array.prototype.reduceRight : Array.prototype.reduce).call(this.interceptors, function (t, e) {
        if (e) {
          var r = e.resolved,
              o = e.rejected;
          n = n.then(r, o);
        }

        return t;
      }, ""), n;
    }, t.prototype.eject = function (t) {
      this.interceptors[t] && (this.interceptors[t] = null);
    }, t;
  }(),
      J = {
    defaults: {
      timeout: 0,
      method: "GET",
      mode: "cors",
      redirect: "follow",
      credentials: "same-origin"
    },
    headers: {
      common: {
        Accept: "application/json, text/plain, */*"
      },
      POST: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      PUT: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      PATCH: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },
    baseURL: "",
    polyfillUrl: "https://vm.gtimg.cn/comps/script/fetch.min.js",
    interceptors: {
      request: new B(),
      response: new B()
    }
  },
      V = /^([a-z][a-z\d+\-.]*:)?\/\//i,
      Q = Object.prototype.toString;

  function L(t) {
    return A(this, void 0, void 0, function () {
      var e;
      return R(this, function (n) {
        switch (n.label) {
          case 0:
            if (window.fetch) return [2];
            n.label = 1;

          case 1:
            return n.trys.push([1, 3,, 4]), [4, j({
              src: t
            })];

          case 2:
            return n.sent(), [3, 4];

          case 3:
            throw e = n.sent(), new Error("?????? polyfill " + t + " ??????: " + e.message);

          case 4:
            return [2];
        }
      });
    });
  }

  function M(t) {
    return ["Accept", "Content-Type"].forEach(function (e) {
      return n = e, void ((r = t.headers) && Object.keys(r).forEach(function (t) {
        t !== n && t.toUpperCase() === n.toUpperCase() && (r[n] = r[t], delete r[t]);
      }));
      var n, r;
    }), function (t) {
      if ("[object Object]" !== Q.call(t)) return !1;
      var e = Object.getPrototypeOf(t);
      return null === e || e === Object.prototype;
    }(t.body) && (t.body = JSON.stringify(t.body), t.headers && (t.headers["Content-Type"] = "application/json;charset=utf-8")), t;
  }

  function K(t) {
    return A(this, void 0, void 0, function () {
      var e, n, r, o, i, s, a, u, c, l, p, h, f, d, v, g, y;
      return R(this, function (m) {
        switch (m.label) {
          case 0:
            return e = J.baseURL, n = J.defaults, r = J.interceptors, [4, L(J.polyfillUrl)];

          case 1:
            return m.sent(), (o = _q(_q({}, n), t)).headers || (o.headers = function (t) {
              void 0 === t && (t = "GET");
              var e = J.headers[t] || {};
              return _q(_q({}, J.headers.common), e);
            }(o.method)), M(o), [4, r.request.traverse(o, !0)];

          case 2:
            if ((i = m.sent()) instanceof Error) throw i;
            return i.url = function (t, e) {
              return !t || V.test(e) ? e : t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "");
            }(e, i.url), s = i.url, a = i.timeout, u = i.params, c = i.method, l = ["GET", "DELETE", "OPTIONS", "HEAD"].includes(void 0 === c ? "GET" : c) && !!u, p = l ? N({
              url: s,
              query: u
            }) : s, h = [], a && !i.signal && (v = new Promise(function (t) {
              f = setTimeout(function () {
                t(new Error("timeout"));
              }, a);
            }), h.push(v), d = new AbortController(), i.signal = d.signal), h.push(fetch(p, i).catch(function (t) {
              return t;
            })), [4, Promise.race(h)];

          case 3:
            return g = m.sent(), f && clearTimeout(f), [4, r.response.traverse(g)];

          case 4:
            if ((y = m.sent()) instanceof Error) throw null == d || d.abort(), y;
            return [2, y];
        }
      });
    });
  }

  var F = function () {
    function t(t) {
      J.interceptors.request.use(function (n) {
        var r = n.url,
            o = n.method,
            i = n.body,
            s = i;

        if (t.onReportBeforeSend) {
          var a = t.onReportBeforeSend({
            url: r,
            method: o,
            data: i ? JSON.parse(i) : null
          });
          s = (null == a ? void 0 : a.data) ? JSON.stringify(a.data) : null;
        }

        return "GET" != o && s ? _e(_e({}, n), {
          body: s
        }) : n;
      });
    }

    return t.prototype.get = function (t, o) {
      return n(this, void 0, void 0, function () {
        var n, i;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return [4, K(_e({
                url: t
              }, o))];

            case 1:
              return [4, (n = r.sent()).json()];

            case 2:
              return i = r.sent(), [2, Promise.resolve({
                data: i,
                status: n.status,
                statusText: n.statusText,
                headers: n.headers
              })];
          }
        });
      });
    }, t.prototype.post = function (t, o, i) {
      return n(this, void 0, void 0, function () {
        var n, s;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return [4, K(_e({
                url: t,
                body: o,
                method: "POST"
              }, i))];

            case 1:
              return [4, (n = r.sent()).json()];

            case 2:
              return s = r.sent(), [2, Promise.resolve({
                data: s,
                status: n.status,
                statusText: n.statusText,
                headers: n.headers
              })];
          }
        });
      });
    }, t;
  }(),
      G = function () {
    function t(t) {
      this.appkey = t;
    }

    return t.prototype.getItem = function (t) {
      try {
        return window.localStorage.getItem(this.getStoreKey(t));
      } catch (t) {
        return "";
      }
    }, t.prototype.removeItem = function (t) {
      try {
        window.localStorage.removeItem(this.getStoreKey(t));
      } catch (t) {}
    }, t.prototype.setItem = function (t, e) {
      try {
        window.localStorage.setItem(this.getStoreKey(t), e);
      } catch (t) {}
    }, t.prototype.setSessionItem = function (t, e) {
      try {
        window.sessionStorage.setItem(this.getStoreKey(t), e);
      } catch (t) {}
    }, t.prototype.getSessionItem = function (t) {
      try {
        return window.sessionStorage.getItem(this.getStoreKey(t));
      } catch (t) {
        return "";
      }
    }, t.prototype.getStoreKey = function (t) {
      return o + this.appkey + "_" + t;
    }, t.prototype.createDeviceId = function () {
      try {
        var t = window.localStorage.getItem(i);
        return t || (t = function (t) {
          for (var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789", n = "", r = 0; r < t; r++) {
            n += e.charAt(Math.floor(Math.random() * e.length));
          }

          return n;
        }(32), window.localStorage.setItem(i, t)), t;
      } catch (t) {
        return "";
      }
    }, t.prototype.clear = function () {
      try {
        for (var t = window.localStorage.length, e = 0; e < t; e++) {
          var n = window.localStorage.key(e);
          (null == n ? void 0 : n.substr(0, 9)) == o && window.localStorage.removeItem(n);
        }
      } catch (t) {}
    }, t.prototype.getStoreCount = function () {
      var t = 0;

      try {
        t = window.localStorage.length;
      } catch (t) {}

      return t;
    }, t;
  }(),
      z = "logid_start",
      W = "4.5.14-web";

  return function (n) {
    function r(t) {
      var e = n.call(this, t) || this;
      e.qimei36 = "", e.uselessCycleTaskNum = 0, e.underWeakNet = !1, e.pauseSearching = !1, e.send = function (t, n, r) {
        e.storage.setItem(s, Date.now().toString()), e.network.post(e.uploadUrl || e.strategy.getUploadUrl(), t.data).then(function (r) {
          var o;
          100 == (null === (o = null == r ? void 0 : r.data) || void 0 === o ? void 0 : o.result) ? e.delayTime = 1e3 * r.data.delayTime : e.delayTime = 0, n && n(t.data), t.data.events.forEach(function (t) {
            e.store.removeEvent(t).then(function () {
              e.removeSendingId(f(t.mapValue));
            });
          }), e.doCustomCycleTask();
        }).catch(function (n) {
          var o = t.data.events;
          e.errorReport.reportError(n.code ? n.code.toString() : "600", n.message), r && r(t.data);
          var i = JSON.parse(e.storage.getItem(a));
          o.forEach(function (t) {
            i && -1 != i.indexOf(f(t)) && e.store.insertEvent(t, function (t, n) {
              t && e.errorReport.reportError("604", "insertEvent fail!");
            }), e.removeSendingId(f(t));
          }), e.monitorUploadFailed();
        });
      };
      var r,
          o,
          i = b();
      return e.isUnderIE8 = i > 0 && i < 8, e.isUnderIE8 || (e.isUnderIE = i > 0, t.needInitQimei && S(t.appkey, function (t) {
        e.qimei36 = t.q36;
      }), e.network = new F(t), e.storage = new G(t.appkey), e.initCommonInfo(t), e.store = new _(t.appkey, e.storage), e.errorReport = new g(e.config, e.commonInfo, "web", e.network), e.strategy = new y(null == t.needQueryConfig || t.needQueryConfig, e.config, e.commonInfo, e.storage, e.network), e.logidStartTime = e.storage.getItem(z), e.logidStartTime || (e.logidStartTime = Date.now().toString(), e.storage.setItem(z, e.logidStartTime)), r = e.logidStartTime, o = Date.now() - Number.parseFloat(r), Math.floor(o / 864e5) >= 365 && e.storage.clear(), e.initSession(t), e.onDirectUserAction("rqd_js_init", {}), setTimeout(function () {
        return e.lifeCycle.emit("init");
      }, 0), e.initDelayTime = t.delay ? t.delay : 1e3, e.cycleTask(e.initDelayTime)), e;
    }

    return function (e, n) {
      if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

      function r() {
        this.constructor = e;
      }

      _t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
    }(r, n), r.prototype.initSession = function (t) {
      var e = 18e5;
      t.sessionDuration && t.sessionDuration > 3e4 && (e = t.sessionDuration), this.beaconSession = new w(this.storage, e, this);
    }, r.prototype.initCommonInfo = function (t) {
      var e = Number(this.storage.getItem(s));

      try {
        var n = JSON.parse(this.storage.getItem(a));
        (Date.now() - e > 3e4 || !n) && this.storage.setItem(a, JSON.stringify([]));
      } catch (t) {}

      t.uploadUrl && (this.uploadUrl = t.uploadUrl + "?appkey=" + t.appkey);
      var r = [window.screen.width, window.screen.height];
      window.devicePixelRatio && r.push(window.devicePixelRatio), this.commonInfo = {
        deviceId: this.storage.createDeviceId(),
        language: navigator && navigator.language || "zh_CN",
        query: window.location.search,
        userAgent: navigator.userAgent,
        pixel: r.join("*"),
        channelID: t.channelID ? String(t.channelID) : "",
        openid: t.openid ? String(t.openid) : "",
        unid: t.unionid ? String(t.unionid) : "",
        sdkVersion: W
      }, this.config.appVersion = t.versionCode ? String(t.versionCode) : "", this.config.strictMode = t.strictMode;
    }, r.prototype.cycleTask = function (t) {
      var e = this;
      this.intervalID = window.setInterval(function () {
        e.pauseSearching || e.store.getEvents().then(function (t) {
          0 == t.length && (e.pauseSearching = !0);
          var n = [],
              r = JSON.parse(e.storage.getItem(a));
          r || (r = []), t && t.forEach(function (t) {
            var e = f(t.mapValue);
            -1 == r.indexOf(e) && (n.push(t), r.push(e));
          }), 0 != n.length && (e.storage.setItem(a, JSON.stringify(r)), e._normalLogPipeline(e.assembleData(n)));
        }).catch(function (t) {});
      }, t);
    }, r.prototype.onReport = function (t, e, n) {
      var r = this;
      if (this.isUnderIE8) this.errorReport.reportError("601", "UnderIE8");else {
        this.pauseSearching = !1;
        var o = this.generateData(t, e, n);
        if (n && 0 == this.delayTime && !this.underWeakNet) this._normalLogPipeline(this.assembleData(o));else {
          var i = o.shift();
          i && this.store.insertEvent(i, function (t) {
            t && r.errorReport.reportError("604", "insertEvent fail!");
          }).catch(function (t) {
            r._normalLogPipeline(r.assembleData(o));
          });
        }
      }
    }, r.prototype.onSendBeacon = function (t, e) {
      if (this.isUnderIE) this.errorReport.reportError("605", "UnderIE");else {
        this.pauseSearching = !1;
        var n = this.assembleData(this.generateData(t, e, !0));
        "function" == typeof navigator.sendBeacon && navigator.sendBeacon(this.uploadUrl || this.strategy.getUploadUrl(), JSON.stringify(n));
      }
    }, r.prototype.generateData = function (t, n, r) {
      var o = [],
          i = "4.5.14-web_" + (r ? "direct_log_id" : "normal_log_id"),
          s = Number(this.storage.getItem(i));
      return s = s || 1, n = _e(_e({}, n), {
        A99: r ? "Y" : "N",
        A100: s.toString(),
        A72: W,
        A88: this.logidStartTime
      }), s++, this.storage.setItem(i, s.toString()), o.push({
        eventCode: t,
        eventTime: Date.now().toString(),
        mapValue: p(n, this.config.strictMode)
      }), o;
    }, r.prototype.assembleData = function (t) {
      var n = this.beaconSession.getSession();
      return {
        appVersion: this.config.appVersion ? h(this.config.appVersion) : "",
        sdkId: "js",
        sdkVersion: W,
        mainAppKey: this.config.appkey,
        platformId: 3,
        common: p(_e(_e({}, this.additionalParams), {
          A2: this.commonInfo.deviceId,
          A8: this.commonInfo.openid,
          A12: this.commonInfo.language,
          A17: this.commonInfo.pixel,
          A23: this.commonInfo.channelID,
          A50: this.commonInfo.unid,
          A76: n.sessionId,
          A101: this.commonInfo.userAgent,
          A102: window.location.href,
          A104: document.referrer,
          A119: this.commonInfo.query,
          A153: this.qimei36
        }), !1),
        events: t
      };
    }, r.prototype.monitorUploadFailed = function () {
      this.uselessCycleTaskNum++, this.uselessCycleTaskNum >= 5 && (window.clearInterval(this.intervalID), this.cycleTask(6e4), this.underWeakNet = !0);
    }, r.prototype.doCustomCycleTask = function () {
      this.uselessCycleTaskNum >= 5 && (window.clearInterval(this.intervalID), this.cycleTask(this.initDelayTime)), this.uselessCycleTaskNum = 0, this.underWeakNet = !1;
    }, r;
  }(v);
});

/***/ }),

/***/ "./lib/crypto.js":
/*!***********************!*\
  !*** ./lib/crypto.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS = CryptoJS || function (g, l) {
  var e = {},
      d = e.lib = {},
      m = function m() {},
      k = d.Base = {
    extend: function extend(a) {
      m.prototype = this;
      var c = new m();
      a && c.mixIn(a);
      c.hasOwnProperty("init") || (c.init = function () {
        c.$super.init.apply(this, arguments);
      });
      c.init.prototype = c;
      c.$super = this;
      return c;
    },
    create: function create() {
      var a = this.extend();
      a.init.apply(a, arguments);
      return a;
    },
    init: function init() {},
    mixIn: function mixIn(a) {
      for (var c in a) {
        a.hasOwnProperty(c) && (this[c] = a[c]);
      }

      a.hasOwnProperty("toString") && (this.toString = a.toString);
    },
    clone: function clone() {
      return this.init.prototype.extend(this);
    }
  },
      p = d.WordArray = k.extend({
    init: function init(a, c) {
      a = this.words = a || [];
      this.sigBytes = c != l ? c : 4 * a.length;
    },
    toString: function toString(a) {
      return (a || n).stringify(this);
    },
    concat: function concat(a) {
      var c = this.words,
          q = a.words,
          f = this.sigBytes;
      a = a.sigBytes;
      this.clamp();
      if (f % 4) for (var b = 0; b < a; b++) {
        c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4);
      } else if (65535 < q.length) for (b = 0; b < a; b += 4) {
        c[f + b >>> 2] = q[b >>> 2];
      } else c.push.apply(c, q);
      this.sigBytes += a;
      return this;
    },
    clamp: function clamp() {
      var a = this.words,
          c = this.sigBytes;
      a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
      a.length = g.ceil(c / 4);
    },
    clone: function clone() {
      var a = k.clone.call(this);
      a.words = this.words.slice(0);
      return a;
    },
    random: function random(a) {
      for (var c = [], b = 0; b < a; b += 4) {
        c.push(4294967296 * g.random() | 0);
      }

      return new p.init(c, a);
    }
  }),
      b = e.enc = {},
      n = b.Hex = {
    stringify: function stringify(a) {
      var c = a.words;
      a = a.sigBytes;

      for (var b = [], f = 0; f < a; f++) {
        var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255;
        b.push((d >>> 4).toString(16));
        b.push((d & 15).toString(16));
      }

      return b.join("");
    },
    parse: function parse(a) {
      for (var c = a.length, b = [], f = 0; f < c; f += 2) {
        b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << 24 - 4 * (f % 8);
      }

      return new p.init(b, c / 2);
    }
  },
      j = b.Latin1 = {
    stringify: function stringify(a) {
      var c = a.words;
      a = a.sigBytes;

      for (var b = [], f = 0; f < a; f++) {
        b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255));
      }

      return b.join("");
    },
    parse: function parse(a) {
      for (var c = a.length, b = [], f = 0; f < c; f++) {
        b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4);
      }

      return new p.init(b, c);
    }
  },
      h = b.Utf8 = {
    stringify: function stringify(a) {
      try {
        return decodeURIComponent(escape(j.stringify(a)));
      } catch (c) {
        throw Error("Malformed UTF-8 data");
      }
    },
    parse: function parse(a) {
      return j.parse(unescape(encodeURIComponent(a)));
    }
  },
      r = d.BufferedBlockAlgorithm = k.extend({
    reset: function reset() {
      this._data = new p.init();
      this._nDataBytes = 0;
    },
    _append: function _append(a) {
      "string" == typeof a && (a = h.parse(a));

      this._data.concat(a);

      this._nDataBytes += a.sigBytes;
    },
    _process: function _process(a) {
      var c = this._data,
          b = c.words,
          f = c.sigBytes,
          d = this.blockSize,
          e = f / (4 * d),
          e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0);
      a = e * d;
      f = g.min(4 * a, f);

      if (a) {
        for (var k = 0; k < a; k += d) {
          this._doProcessBlock(b, k);
        }

        k = b.splice(0, a);
        c.sigBytes -= f;
      }

      return new p.init(k, f);
    },
    clone: function clone() {
      var a = k.clone.call(this);
      a._data = this._data.clone();
      return a;
    },
    _minBufferSize: 0
  });

  d.Hasher = r.extend({
    cfg: k.extend(),
    init: function init(a) {
      this.cfg = this.cfg.extend(a);
      this.reset();
    },
    reset: function reset() {
      r.reset.call(this);

      this._doReset();
    },
    update: function update(a) {
      this._append(a);

      this._process();

      return this;
    },
    finalize: function finalize(a) {
      a && this._append(a);
      return this._doFinalize();
    },
    blockSize: 16,
    _createHelper: function _createHelper(a) {
      return function (b, d) {
        return new a.init(d).finalize(b);
      };
    },
    _createHmacHelper: function _createHmacHelper(a) {
      return function (b, d) {
        return new s.HMAC.init(a, d).finalize(b);
      };
    }
  });
  var s = e.algo = {};
  return e;
}(Math);

(function () {
  var g = CryptoJS,
      l = g.lib,
      e = l.WordArray,
      d = l.Hasher,
      m = [],
      l = g.algo.SHA1 = d.extend({
    _doReset: function _doReset() {
      this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    },
    _doProcessBlock: function _doProcessBlock(d, e) {
      for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {
        if (16 > a) m[a] = d[e + a] | 0;else {
          var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16];
          m[a] = c << 1 | c >>> 31;
        }
        c = (n << 5 | n >>> 27) + l + m[a];
        c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^ g) - 899497514);
        l = g;
        g = h;
        h = j << 30 | j >>> 2;
        j = n;
        n = c;
      }

      b[0] = b[0] + n | 0;
      b[1] = b[1] + j | 0;
      b[2] = b[2] + h | 0;
      b[3] = b[3] + g | 0;
      b[4] = b[4] + l | 0;
    },
    _doFinalize: function _doFinalize() {
      var d = this._data,
          e = d.words,
          b = 8 * this._nDataBytes,
          g = 8 * d.sigBytes;
      e[g >>> 5] |= 128 << 24 - g % 32;
      e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);
      e[(g + 64 >>> 9 << 4) + 15] = b;
      d.sigBytes = 4 * e.length;

      this._process();

      return this._hash;
    },
    clone: function clone() {
      var e = d.clone.call(this);
      e._hash = this._hash.clone();
      return e;
    }
  });
  g.SHA1 = d._createHelper(l);
  g.HmacSHA1 = d._createHmacHelper(l);
})();

(function () {
  var g = CryptoJS,
      l = g.enc.Utf8;
  g.algo.HMAC = g.lib.Base.extend({
    init: function init(e, d) {
      e = this._hasher = new e.init();
      "string" == typeof d && (d = l.parse(d));
      var g = e.blockSize,
          k = 4 * g;
      d.sigBytes > k && (d = e.finalize(d));
      d.clamp();

      for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; h < g; h++) {
        n[h] ^= 1549556828, j[h] ^= 909522486;
      }

      p.sigBytes = b.sigBytes = k;
      this.reset();
    },
    reset: function reset() {
      var e = this._hasher;
      e.reset();
      e.update(this._iKey);
    },
    update: function update(e) {
      this._hasher.update(e);

      return this;
    },
    finalize: function finalize(e) {
      var d = this._hasher;
      e = d.finalize(e);
      d.reset();
      return d.finalize(this._oKey.clone().concat(e));
    }
  });
})();

(function () {
  // Shortcuts
  var C = CryptoJS;
  var C_lib = C.lib;
  var WordArray = C_lib.WordArray;
  var C_enc = C.enc;
  /**
   * Base64 encoding strategy.
   */

  C_enc.Base64 = {
    /**
     * Converts a word array to a Base64 string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The Base64 string.
     *
     * @static
     *
     * @example
     *
     *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
     */
    stringify: function stringify(wordArray) {
      // Shortcuts
      var words = wordArray.words;
      var sigBytes = wordArray.sigBytes;
      var map = this._map; // Clamp excess bits

      wordArray.clamp(); // Convert

      var base64Chars = [];

      for (var i = 0; i < sigBytes; i += 3) {
        var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
        var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
        var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
        var triplet = byte1 << 16 | byte2 << 8 | byte3;

        for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
          base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
        }
      } // Add padding


      var paddingChar = map.charAt(64);

      if (paddingChar) {
        while (base64Chars.length % 4) {
          base64Chars.push(paddingChar);
        }
      }

      return base64Chars.join('');
    },

    /**
     * Converts a Base64 string to a word array.
     *
     * @param {string} base64Str The Base64 string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
     */
    parse: function parse(base64Str) {
      // Shortcuts
      var base64StrLength = base64Str.length;
      var map = this._map; // Ignore padding

      var paddingChar = map.charAt(64);

      if (paddingChar) {
        var paddingIndex = base64Str.indexOf(paddingChar);

        if (paddingIndex != -1) {
          base64StrLength = paddingIndex;
        }
      } // Convert


      var words = [];
      var nBytes = 0;

      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;
          var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
          words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }

      return WordArray.create(words, nBytes);
    },
    _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  };
})();

if (( _typeof(module)) === 'object') {
  module.exports = CryptoJS;
} else {
  window.CryptoJS = CryptoJS;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)));

/***/ }),

/***/ "./lib/json2xml.js":
/*!*************************!*\
  !*** ./lib/json2xml.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

//copyright Ryan Day 2010 <http://ryanday.org>, Joscha Feth 2013 <http://www.feth.com> [MIT Licensed]
var element_start_char = "a-zA-Z_\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
var element_non_start_char = "-.0-9\xB7\u0300-\u036F\u203F\u2040";
var element_replace = new RegExp("^([^" + element_start_char + "])|^((x|X)(m|M)(l|L))|([^" + element_start_char + element_non_start_char + "])", "g");
var not_safe_in_xml = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;

var objKeys = function objKeys(obj) {
  var l = [];

  if (obj instanceof Object) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        l.push(k);
      }
    }
  }

  return l;
};

var process_to_xml = function process_to_xml(node_data, options) {
  var makeNode = function makeNode(name, content, attributes, level, hasSubNodes) {
    var indent_value = options.indent !== undefined ? options.indent : "\t";
    var indent = options.prettyPrint ? '\n' + new Array(level).join(indent_value) : '';

    if (options.removeIllegalNameCharacters) {
      name = name.replace(element_replace, '_');
    }

    var node = [indent, '<', name, attributes || ''];

    if (content && content.length > 0) {
      node.push('>');
      node.push(content);
      hasSubNodes && node.push(indent);
      node.push('</');
      node.push(name);
      node.push('>');
    } else {
      node.push('/>');
    }

    return node.join('');
  };

  return function fn(node_data, node_descriptor, level) {
    var type = _typeof(node_data);

    if (Array.isArray ? Array.isArray(node_data) : node_data instanceof Array) {
      type = 'array';
    } else if (node_data instanceof Date) {
      type = 'date';
    }

    switch (type) {
      //if value is an array create child nodes from values
      case 'array':
        var ret = [];
        node_data.map(function (v) {
          ret.push(fn(v, 1, level + 1)); //entries that are values of an array are the only ones that can be special node descriptors
        });
        options.prettyPrint && ret.push('\n');
        return ret.join('');

      case 'date':
        // cast dates to ISO 8601 date (soap likes it)
        return node_data.toJSON ? node_data.toJSON() : node_data + '';

      case 'object':
        var nodes = [];

        for (var name in node_data) {
          if (node_data.hasOwnProperty(name)) {
            if (node_data[name] instanceof Array) {
              for (var j = 0; j < node_data[name].length; j++) {
                if (node_data[name].hasOwnProperty(j)) {
                  nodes.push(makeNode(name, fn(node_data[name][j], 0, level + 1), null, level + 1, objKeys(node_data[name][j]).length));
                }
              }
            } else {
              nodes.push(makeNode(name, fn(node_data[name], 0, level + 1), null, level + 1));
            }
          }
        }

        options.prettyPrint && nodes.length > 0 && nodes.push('\n');
        return nodes.join('');

      case 'function':
        return node_data();

      default:
        return options.escape ? esc(node_data) : '' + node_data;
    }
  }(node_data, 0, 0);
};

var xml_header = function xml_header(standalone) {
  var ret = ['<?xml version="1.0" encoding="UTF-8"'];

  if (standalone) {
    ret.push(' standalone="yes"');
  }

  ret.push('?>');
  return ret.join('');
};

function esc(str) {
  return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(not_safe_in_xml, '');
}

module.exports = function (obj, options) {
  if (!options) {
    options = {
      xmlHeader: {
        standalone: true
      },
      prettyPrint: true,
      indent: "  ",
      escape: true
    };
  }

  if (typeof obj == 'string') {
    try {
      obj = JSON.parse(obj.toString());
    } catch (e) {
      return false;
    }
  }

  var xmlheader = '';
  var docType = '';

  if (options) {
    if (_typeof(options) == 'object') {
      // our config is an object
      if (options.xmlHeader) {
        // the user wants an xml header
        xmlheader = xml_header(!!options.xmlHeader.standalone);
      }

      if (typeof options.docType != 'undefined') {
        docType = '<!DOCTYPE ' + options.docType + '>';
      }
    } else {
      // our config is a boolean value, so just add xml header
      xmlheader = xml_header();
    }
  }

  options = options || {};
  var ret = [xmlheader, options.prettyPrint && docType ? '\n' : '', docType, process_to_xml(obj, options)];
  return ret.join('').replace(/\n{2,}/g, '\n').replace(/\s+$/g, '');
};

/***/ }),

/***/ "./lib/md5.js":
/*!********************!*\
  !*** ./lib/md5.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

/* https://github.com/emn178/js-md5 */
(function () {

  var ERROR = 'input is invalid type';
  var WINDOW = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
  var root = WINDOW ? window : {};

  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }

  var WEB_WORKER = !WINDOW && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.versions && process.versions.node;

  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }

  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && ( _typeof(module)) === 'object' && module.exports;
  var AMD =  __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js");
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
  var blocks = [],
      buffer8;

  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return _typeof(obj) === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }
  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */

  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */

  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */

  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */

  /**
   * @method base64
   * @memberof md5
   * @description Output hash as base64 string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} base64 string
   * @example
   * md5.base64('The quick brown fox jumps over the lazy dog');
   */


  var createOutputMethod = function createOutputMethod(outputType) {
    return function (message, isBinStr) {
      return new Md5(true).update(message, isBinStr)[outputType]();
    };
  };
  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */

  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */


  var createMethod = function createMethod() {
    var method = createOutputMethod('hex');

    if (NODE_JS) {
      method = nodeWrap(method);
    }

    method.getCtx = method.create = function () {
      return new Md5();
    };

    method.update = function (message) {
      return method.create().update(message);
    };

    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }

    return method;
  };

  var nodeWrap = function nodeWrap(method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");

    var nodeMethod = function nodeMethod(message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }

      if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };

    return nodeMethod;
  };
  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */


  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }

    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }
  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */


  Md5.prototype.update = function (message, isBinStr) {
    if (this.finalized) {
      return;
    }

    var code,
        index = 0,
        i,
        length = message.length,
        blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (ARRAY_BUFFER) {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);

          if (isBinStr || code < 0x80) {
            buffer8[i++] = code;
          } else if (code < 0x800) {
            buffer8[i++] = 0xc0 | code >> 6;
            buffer8[i++] = 0x80 | code & 0x3f;
          } else if (code < 0xd800 || code >= 0xe000) {
            buffer8[i++] = 0xe0 | code >> 12;
            buffer8[i++] = 0x80 | code >> 6 & 0x3f;
            buffer8[i++] = 0x80 | code & 0x3f;
          } else {
            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
            buffer8[i++] = 0xf0 | code >> 18;
            buffer8[i++] = 0x80 | code >> 12 & 0x3f;
            buffer8[i++] = 0x80 | code >> 6 & 0x3f;
            buffer8[i++] = 0x80 | code & 0x3f;
          }
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);

          if (isBinStr || code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
            blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;

      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }

    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }

    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }

    this.finalized = true;
    var blocks = this.blocks,
        i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];

    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }

      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }

    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a,
        b,
        c,
        d,
        bc,
        da,
        blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };
  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */


  Md5.prototype.hex = function () {
    this.finalize();
    var h0 = this.h0,
        h1 = this.h1,
        h2 = this.h2,
        h3 = this.h3;
    return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
  };
  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */


  Md5.prototype.toString = Md5.prototype.hex;
  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */

  Md5.prototype.digest = function (format) {
    if (format === 'hex') return this.hex();
    this.finalize();
    var h0 = this.h0,
        h1 = this.h1,
        h2 = this.h2,
        h3 = this.h3;
    var res = [h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF, h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF, h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF, h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];
    return res;
  };
  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */


  Md5.prototype.array = Md5.prototype.digest;
  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */

  Md5.prototype.arrayBuffer = function () {
    this.finalize();
    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */


  Md5.prototype.buffer = Md5.prototype.arrayBuffer;
  /**
   * @method base64
   * @memberof Md5
   * @instance
   * @description Output hash as base64 string
   * @returns {String} base64 string
   * @see {@link md5.base64}
   * @example
   * hash.base64();
   */

  Md5.prototype.base64 = function () {
    var v1,
        v2,
        v3,
        base64Str = '',
        bytes = this.array();

    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
    }

    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('??????'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;

    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)));

/***/ }),

/***/ "./lib/request.js":
/*!************************!*\
  !*** ./lib/request.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (_typeof(v)) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

var queryStringify = function queryStringify(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (_typeof(obj) === 'object') {
    return Object.keys(obj).map(function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (Array.isArray(obj[k])) {
        return obj[k].map(function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).filter(Boolean).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var xhrRes = function xhrRes(err, xhr, body) {
  var headers = {};
  xhr.getAllResponseHeaders().trim().split('\n').forEach(function (item) {
    if (item) {
      var index = item.indexOf(':');
      var key = item.substr(0, index).trim().toLowerCase();
      var val = item.substr(index + 1).trim();
      headers[key] = val;
    }
  });
  return {
    error: err,
    statusCode: xhr.status,
    statusMessage: xhr.statusText,
    headers: headers,
    body: body
  };
};

var xhrBody = function xhrBody(xhr, dataType) {
  return !dataType && dataType === 'text' ? xhr.responseText : xhr.response;
};

var request = function request(opt, callback) {
  // method
  var method = (opt.method || 'GET').toUpperCase(); // url???qs

  var url = opt.url;

  if (opt.qs) {
    var qsStr = queryStringify(opt.qs);

    if (qsStr) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + qsStr;
    }
  } // ?????? ajax ??????


  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.responseType = opt.dataType || 'text'; // ?????? xhrFields ??????

  if (opt.xhrFields) {
    for (var xhrField in opt.xhrFields) {
      xhr[xhrField] = opt.xhrFields[xhrField];
    }
  } // ?????? headers


  var headers = opt.headers;

  if (headers) {
    for (var key in headers) {
      if (headers.hasOwnProperty(key) && key.toLowerCase() !== 'content-length' && key.toLowerCase() !== 'user-agent' && key.toLowerCase() !== 'origin' && key.toLowerCase() !== 'host') {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  } // onprogress


  if (opt.onProgress && xhr.upload) xhr.upload.onprogress = opt.onProgress;
  if (opt.onDownloadProgress) xhr.onprogress = opt.onDownloadProgress; // timeout

  if (opt.timeout) xhr.timeout = opt.timeout;

  xhr.ontimeout = function (event) {
    var error = new Error('timeout');
    callback(xhrRes(error, xhr));
  }; // success 2xx/3xx/4xx


  xhr.onload = function () {
    callback(xhrRes(null, xhr, xhrBody(xhr, opt.dataType)));
  }; // error 5xx/0 (??????????????????????????????Https connect-src ?????????????????? statusCode ??? 0)


  xhr.onerror = function (err) {
    var body = xhrBody(xhr, opt.dataType);

    if (body) {
      // 5xx
      callback(xhrRes(null, xhr, body));
    } else {
      // 0
      var error = xhr.statusText;
      if (!error && xhr.status === 0) error = new Error('CORS blocked or network error');
      callback(xhrRes(error, xhr, body));
    }
  }; // send


  xhr.send(opt.body || ''); // ?????? ajax ??????????????????????????? xhr.abort

  return xhr;
};

module.exports = request;

/***/ }),

/***/ "./lib/xml2json.js":
/*!*************************!*\
  !*** ./lib/xml2json.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2015 William Summers, MetaTribal LLC
 * adapted from https://developer.mozilla.org/en-US/docs/JXON
 *
 * Licensed under the MIT License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author William Summers
 * https://github.com/metatribal/xmlToJSON
 */
var DOMParser = __webpack_require__(/*! @xmldom/xmldom */ "./node_modules/@xmldom/xmldom/lib/index.js").DOMParser;

var xmlToJSON = function () {
  this.version = "1.3.5";
  var options = {
    // set up the default options
    mergeCDATA: true,
    // extract cdata and merge with text
    normalize: true,
    // collapse multiple spaces to single space
    stripElemPrefix: true // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property

  };
  var prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  this.grokType = function (sValue) {
    if (/^\s*$/.test(sValue)) {
      return null;
    }

    if (/^(?:true|false)$/i.test(sValue)) {
      return sValue.toLowerCase() === "true";
    }

    if (isFinite(sValue)) {
      return parseFloat(sValue);
    }

    return sValue;
  };

  this.parseString = function (xmlString, opt) {
    if (xmlString) {
      var xml = this.stringToXML(xmlString);

      if (xml.getElementsByTagName('parsererror').length) {
        return null;
      } else {
        return this.parseXML(xml, opt);
      }
    } else {
      return null;
    }
  };

  this.parseXML = function (oXMLParent, opt) {
    // initialize options
    for (var key in opt) {
      options[key] = opt[key];
    }

    var vResult = {},
        nLength = 0,
        sCollectedTxt = ""; // iterate over the children

    var childNum = oXMLParent.childNodes.length;

    if (childNum) {
      for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
        oNode = oXMLParent.childNodes.item(nItem);

        if (oNode.nodeType === 4) {
          if (options.mergeCDATA) {
            sCollectedTxt += oNode.nodeValue;
          }
        }
        /* nodeType is "CDATASection" (4) */
        else if (oNode.nodeType === 3) {
          sCollectedTxt += oNode.nodeValue;
        }
        /* nodeType is "Text" (3) */
        else if (oNode.nodeType === 1) {
          /* nodeType is "Element" (1) */
          if (nLength === 0) {
            vResult = {};
          } // using nodeName to support browser (IE) implementation with no 'localName' property


          if (options.stripElemPrefix) {
            sProp = oNode.nodeName.replace(prefixMatch, '');
          } else {
            sProp = oNode.nodeName;
          }

          vContent = xmlToJSON.parseXML(oNode);

          if (vResult.hasOwnProperty(sProp)) {
            if (vResult[sProp].constructor !== Array) {
              vResult[sProp] = [vResult[sProp]];
            }

            vResult[sProp].push(vContent);
          } else {
            vResult[sProp] = vContent;
            nLength++;
          }
        }
      }
    }

    if (!Object.keys(vResult).length) {
      // vResult = sCollectedTxt.replace(trimMatch, '') || ''; // by carsonxu ?????? getBucket????????? Key ??? " /" ????????????
      vResult = sCollectedTxt || '';
    }

    return vResult;
  }; // Convert xmlDocument to a string
  // Returns null on failure


  this.xmlToString = function (xmlDoc) {
    try {
      var xmlString = xmlDoc.xml ? xmlDoc.xml : new XMLSerializer().serializeToString(xmlDoc);
      return xmlString;
    } catch (err) {
      return null;
    }
  }; // Convert a string to XML Node Structure
  // Returns null on failure


  this.stringToXML = function (xmlString) {
    try {
      var xmlDoc = null;

      if (window.DOMParser) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlString, "text/xml");
        return xmlDoc;
      } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(xmlString);
        return xmlDoc;
      }
    } catch (e) {
      return null;
    }
  };

  return this;
}.call({});

var xml2json = function xml2json(xmlString) {
  return xmlToJSON.parseString(xmlString);
};

module.exports = xml2json;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/conventions.js":
/*!********************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/conventions.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Ponyfill for `Array.prototype.find` which is only available in ES6 runtimes.
 *
 * Works with anything that has a `length` property and index access properties, including NodeList.
 *
 * @template {unknown} T
 * @param {Array<T> | ({length:number, [number]: T})} list
 * @param {function (item: T, index: number, list:Array<T> | ({length:number, [number]: T})):boolean} predicate
 * @param {Partial<Pick<ArrayConstructor['prototype'], 'find'>>?} ac `Array.prototype` by default,
 * 				allows injecting a custom implementation in tests
 * @returns {T | undefined}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @see https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
 */
function find(list, predicate, ac) {
	if (ac === undefined) {
		ac = Array.prototype;
	}
	if (list && typeof ac.find === 'function') {
		return ac.find.call(list, predicate);
	}
	for (var i = 0; i < list.length; i++) {
		if (Object.prototype.hasOwnProperty.call(list, i)) {
			var item = list[i];
			if (predicate.call(undefined, item, i, list)) {
				return item;
			}
		}
	}
}

/**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * @template T
 * @param {T} object the object to freeze
 * @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
 * 				allows to inject custom object constructor for tests
 * @returns {Readonly<T>}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object;
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object
}

/**
 * Since we can not rely on `Object.assign` we provide a simplified version
 * that is sufficient for our needs.
 *
 * @param {Object} target
 * @param {Object | null | undefined} source
 *
 * @returns {Object} target
 * @throws TypeError if target is not an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
 */
function assign(target, source) {
	if (target === null || typeof target !== 'object') {
		throw new TypeError('target is not an object')
	}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target
}

/**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
 * @see DOMParser.prototype.parseFromString
 */
var MIME_TYPE = freeze({
	/**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see DOMParser.SupportedType.isHTML
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
	 */
	HTML: 'text/html',

	/**
	 * Helper method to check a mime type if it indicates an HTML document
	 *
	 * @param {string} [value]
	 * @returns {boolean}
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
	isHTML: function (value) {
		return value === MIME_TYPE.HTML
	},

	/**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_APPLICATION: 'application/xml',

	/**
	 * `text/html`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_TEXT: 'text/xml',

	/**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */
	XML_XHTML_APPLICATION: 'application/xhtml+xml',

	/**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */
	XML_SVG_IMAGE: 'image/svg+xml',
});

/**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */
var NAMESPACE = freeze({
	/**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */
	HTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * Checks if `uri` equals `NAMESPACE.HTML`.
	 *
	 * @param {string} [uri]
	 *
	 * @see NAMESPACE.HTML
	 */
	isHTML: function (uri) {
		return uri === NAMESPACE.HTML
	},

	/**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */
	SVG: 'http://www.w3.org/2000/svg',

	/**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */
	XML: 'http://www.w3.org/XML/1998/namespace',

	/**
	 * The `xmlns:` namespace
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */
	XMLNS: 'http://www.w3.org/2000/xmlns/',
});

exports.assign = assign;
exports.find = find;
exports.freeze = freeze;
exports.MIME_TYPE = MIME_TYPE;
exports.NAMESPACE = NAMESPACE;


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/dom-parser.js":
/*!*******************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/dom-parser.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conventions = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js");
var dom = __webpack_require__(/*! ./dom */ "./node_modules/@xmldom/xmldom/lib/dom.js");
var entities = __webpack_require__(/*! ./entities */ "./node_modules/@xmldom/xmldom/lib/entities.js");
var sax = __webpack_require__(/*! ./sax */ "./node_modules/@xmldom/xmldom/lib/sax.js");

var DOMImplementation = dom.DOMImplementation;

var NAMESPACE = conventions.NAMESPACE;

var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;

/**
 * Normalizes line ending according to https://www.w3.org/TR/xml11/#sec-line-ends:
 *
 * > XML parsed entities are often stored in computer files which,
 * > for editing convenience, are organized into lines.
 * > These lines are typically separated by some combination
 * > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
 * >
 * > To simplify the tasks of applications, the XML processor must behave
 * > as if it normalized all line breaks in external parsed entities (including the document entity)
 * > on input, before parsing, by translating all of the following to a single #xA character:
 * >
 * > 1. the two-character sequence #xD #xA
 * > 2. the two-character sequence #xD #x85
 * > 3. the single character #x85
 * > 4. the single character #x2028
 * > 5. any #xD character that is not immediately followed by #xA or #x85.
 *
 * @param {string} input
 * @returns {string}
 */
function normalizeLineEndings(input) {
	return input
		.replace(/\r[\n\u0085]/g, '\n')
		.replace(/[\r\u0085\u2028]/g, '\n')
}

/**
 * @typedef Locator
 * @property {number} [columnNumber]
 * @property {number} [lineNumber]
 */

/**
 * @typedef DOMParserOptions
 * @property {DOMHandler} [domBuilder]
 * @property {Function} [errorHandler]
 * @property {(string) => string} [normalizeLineEndings] used to replace line endings before parsing
 * 						defaults to `normalizeLineEndings`
 * @property {Locator} [locator]
 * @property {Record<string, string>} [xmlns]
 *
 * @see normalizeLineEndings
 */

/**
 * The DOMParser interface provides the ability to parse XML or HTML source code
 * from a string into a DOM `Document`.
 *
 * _xmldom is different from the spec in that it allows an `options` parameter,
 * to override the default behavior._
 *
 * @param {DOMParserOptions} [options]
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
 */
function DOMParser(options){
	this.options = options ||{locator:{}};
}

DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var isHTML = /\/x?html?$/.test(mimeType);//mimeType.toLowerCase().indexOf('html') > -1;
  	var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
	if(locator){
		domBuilder.setDocumentLocator(locator);
	}

	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(isHTML){
		defaultNSMap[''] = NAMESPACE.HTML;
	}
	defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
	var normalize = options.normalizeLineEndings || normalizeLineEndings;
	if (source && typeof source === 'string') {
		sax.parse(
			normalize(source),
			defaultNSMap,
			entityMap
		);
	} else {
		sax.errorHandler.error('invalid doc source');
	}
	return domBuilder.doc;
};
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {};
	var isCallback = errorImpl instanceof Function;
	locator = locator||{};
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg);}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;

		this.locator && position(this.locator,el);
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr);
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement;
		current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins);
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments);
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode);
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments);
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm);
	    appendElement(this, comm);
	},

	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},

	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt);
	        appendElement(this, dt);
					this.doc.doctype = dt;
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		throw new ParseError(error, this.locator);
	}
};
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else {//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null};
});

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

exports.__DOMHandler = DOMHandler;
exports.normalizeLineEndings = normalizeLineEndings;
exports.DOMParser = DOMParser;


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/dom.js":
/*!************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/dom.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conventions = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js");

var find = conventions.find;
var NAMESPACE = conventions.NAMESPACE;

/**
 * A prerequisite for `[].filter`, to drop elements that are empty
 * @param {string} input
 * @returns {boolean}
 */
function notEmptyString (input) {
	return input !== ''
}
/**
 * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * @param {string} input
 * @returns {string[]} (can be empty)
 */
function splitOnASCIIWhitespace(input) {
	// U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
	return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : []
}

/**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * @param {string} element
 * @returns {Record<string, boolean | undefined>}
 */
function orderedSetReducer (current, element) {
	if (!current.hasOwnProperty(element)) {
		current[element] = true;
	}
	return current;
}

/**
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @param {string} input
 * @returns {string[]}
 */
function toOrderedSet(input) {
	if (!input) return [];
	var list = splitOnASCIIWhitespace(input);
	return Object.keys(list.reduce(orderedSetReducer, {}))
}

/**
 * Uses `list.indexOf` to implement something like `Array.prototype.includes`,
 * which we can not rely on being available.
 *
 * @param {any[]} list
 * @returns {function(any): boolean}
 */
function arrayIncludes (list) {
	return function(element) {
		return list && list.indexOf(element) !== -1;
	}
}

function copy(src,dest){
	for(var p in src){
		if (Object.prototype.hasOwnProperty.call(src, p)) {
			dest[p] = src[p];
		}
	}
}

/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(!(pt instanceof Super)){
		function t(){}		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknown Class:"+Class);
		}
		pt.constructor = Class;
	}
}

// Node Types
var NodeType = {};
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);

/**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else {
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
}DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException);

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
}NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0,
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	},
	/**
	 * @private
	 * @param {function (Node):boolean} predicate
	 * @returns {Node[]}
	 */
	filter: function (predicate) {
		return Array.prototype.filter.call(this, predicate);
	},
	/**
	 * @private
	 * @param {Node} item
	 * @returns {number}
	 */
	indexOf: function (item) {
		return Array.prototype.indexOf.call(this, item);
	},
};

function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
};

_extends(LiveNodeList,NodeList);

/**
 * Objects implementing the NamedNodeMap interface are used
 * to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 */
function NamedNodeMap() {
}
function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else {
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1;
		while(i<lastIndex){
			list[i] = list[++i];
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else {
		throw new DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;


	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};

/**
 * The DOMImplementation interface represents an object providing methods
 * which are not dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * __The individual methods describe the differences compared to the specs.__
 *
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 */
function DOMImplementation() {
}

DOMImplementation.prototype = {
	/**
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
	 * The different implementations fairly diverged in what kind of features were reported.
	 * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated It is deprecated and modern browsers return true in all cases.
	 *
	 * @param {string} feature
	 * @param {string} [version]
	 * @returns {boolean} always true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 */
	hasFeature: function(feature, version) {
			return true;
	},
	/**
	 * Creates an XML Document object of the specified type with its document element.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
	 * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string|null} namespaceURI
	 * @param {string} qualifiedName
	 * @param {DocumentType=null} doctype
	 * @returns {Document}
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocument: function(namespaceURI,  qualifiedName, doctype){
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype || null;
		if (doctype){
			doc.appendChild(doctype);
		}
		if (qualifiedName){
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	/**
	 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
	 *
	 * __This behavior is slightly different from the in the specs__:
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string} qualifiedName
	 * @param {string} [publicId]
	 * @param {string} [systemId]
	 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
	 * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocumentType: function(qualifiedName, publicId, systemId){
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId || '';
		node.systemId = systemId || '';

		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
}
Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises
		_insertBefore(this, newChild,oldChild, assertPreReplacementValidityInDocument);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else {
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
	/**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
	 *
	 * @param {string | null} namespaceURI
	 * @returns {string | null}
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 */
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
						if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
							return n;
						}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(Object.prototype.hasOwnProperty.call(map, prefix)){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
	this.ownerDocument = this;
}

function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value;
	}
}

function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:''];
	}
}

/**
 * Updates `el.childNodes`, updating the indexed items and it's `length`.
 * Passing `newChild` means it will be appended.
 * Otherwise it's assumed that an item has been removed,
 * and `el.firstNode` and it's `.nextSibling` are used
 * to walk the current list of child nodes.
 *
 * @param {Document} doc
 * @param {Node} el
 * @param {Node} [newChild]
 * @private
 */
function _onUpdateChild (doc, el, newChild) {
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if (newChild) {
			cs[cs.length++] = newChild;
		} else {
			var child = el.firstChild;
			var i = 0;
			while (child) {
				cs[i++] = child;
				child = child.nextSibling;
			}
			cs.length = i;
			delete cs[cs.length];
		}
	}
}

/**
 * Removes the connections between `parentNode` and `child`
 * and any existing `child.previousSibling` or `child.nextSibling`.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 *
 * @param {Node} parentNode
 * @param {Node} child
 * @returns {Node} the child that was removed.
 * @private
 */
function _removeChild (parentNode, child) {
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if (previous) {
		previous.nextSibling = next;
	} else {
		parentNode.firstChild = next;
	}
	if (next) {
		next.previousSibling = previous;
	} else {
		parentNode.lastChild = previous;
	}
	child.parentNode = null;
	child.previousSibling = null;
	child.nextSibling = null;
	_onUpdateChild(parentNode.ownerDocument, parentNode);
	return child;
}

/**
 * Returns `true` if `node` can be a parent for insertion.
 * @param {Node} node
 * @returns {boolean}
 */
function hasValidParentNodeType(node) {
	return (
		node &&
		(node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE)
	);
}

/**
 * Returns `true` if `node` can be inserted according to it's `nodeType`.
 * @param {Node} node
 * @returns {boolean}
 */
function hasInsertableNodeType(node) {
	return (
		node &&
		(isElementNode(node) ||
			isTextNode(node) ||
			isDocTypeNode(node) ||
			node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
			node.nodeType === Node.COMMENT_NODE ||
			node.nodeType === Node.PROCESSING_INSTRUCTION_NODE)
	);
}

/**
 * Returns true if `node` is a DOCTYPE node
 * @param {Node} node
 * @returns {boolean}
 */
function isDocTypeNode(node) {
	return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
}

/**
 * Returns true if the node is an element
 * @param {Node} node
 * @returns {boolean}
 */
function isElementNode(node) {
	return node && node.nodeType === Node.ELEMENT_NODE;
}
/**
 * Returns true if `node` is a text node
 * @param {Node} node
 * @returns {boolean}
 */
function isTextNode(node) {
	return node && node.nodeType === Node.TEXT_NODE;
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Document} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function isElementInsertionPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];
	if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Node} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function isElementReplacementPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];

	function hasElementChildThatIsNotChild(node) {
		return isElementNode(node) && node !== child;
	}

	if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * @private
 * Steps 1-5 of the checks before inserting and before replacing a child are the same.
 *
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidity1to5(parent, node, child) {
	// 1. If `parent` is not a Document, DocumentFragment, or Element node, then throw a "HierarchyRequestError" DOMException.
	if (!hasValidParentNodeType(parent)) {
		throw new DOMException(HIERARCHY_REQUEST_ERR, 'Unexpected parent node type ' + parent.nodeType);
	}
	// 2. If `node` is a host-including inclusive ancestor of `parent`, then throw a "HierarchyRequestError" DOMException.
	// not implemented!
	// 3. If `child` is non-null and its parent is not `parent`, then throw a "NotFoundError" DOMException.
	if (child && child.parentNode !== parent) {
		throw new DOMException(NOT_FOUND_ERR, 'child not in parent');
	}
	if (
		// 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
		!hasInsertableNodeType(node) ||
		// 5. If either `node` is a Text node and `parent` is a document,
		// the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
		// || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
		// or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
		(isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE)
	) {
		throw new DOMException(
			HIERARCHY_REQUEST_ERR,
			'Unexpected node type ' + node.nodeType + ' for parent node type ' + parent.nodeType
		);
	}
}

/**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If node has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child,
		// `child` is a doctype, or `child` is non-null and a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child, `child` is a doctype,
		// or `child` is non-null and a doctype is following `child`.
		if (!isElementInsertionPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		// `parent` has a doctype child,
		if (find(parentChildNodes, isDocTypeNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// `child` is non-null and an element is preceding `child`,
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
		// or `child` is null and `parent` has an element child.
		if (!child && parentElementChild) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can not be appended since element is present');
		}
	}
}

/**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreReplacementValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If `node` has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child that is not `child` or a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child that is not `child` or a doctype is following `child`.
		if (!isElementReplacementPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		function hasDoctypeChildThatIsNotChild(node) {
			return isDocTypeNode(node) && node !== child;
		}

		// `parent` has a doctype child that is not `child`,
		if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// or an element is preceding `child`.
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
	}
}

/**
 * @private
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function _insertBefore(parent, node, child, _inDocumentAssertion) {
	// To ensure pre-insertion validity of a node into a parent before a child, run these steps:
	assertPreInsertionValidity1to5(parent, node, child);

	// If parent is a document, and any of the statements below, switched on the interface node implements,
	// are true, then throw a "HierarchyRequestError" DOMException.
	if (parent.nodeType === Node.DOCUMENT_NODE) {
		(_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
	}

	var cp = node.parentNode;
	if(cp){
		cp.removeChild(node);//remove and update
	}
	if(node.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = node.firstChild;
		if (newFirst == null) {
			return node;
		}
		var newLast = node.lastChild;
	}else {
		newFirst = newLast = node;
	}
	var pre = child ? child.previousSibling : parent.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = child;


	if(pre){
		pre.nextSibling = newFirst;
	}else {
		parent.firstChild = newFirst;
	}
	if(child == null){
		parent.lastChild = newLast;
	}else {
		child.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parent;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parent.ownerDocument||parent, parent);
	//console.log(parent.lastChild.nextSibling == null)
	if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
		node.firstChild = node.lastChild = null;
	}
	return node;
}

/**
 * Appends `newChild` to `parentNode`.
 * If `newChild` is already connected to a `parentNode` it is first removed from it.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 * @param {Node} parentNode
 * @param {Node} newChild
 * @returns {Node}
 * @private
 */
function _appendSingleChild (parentNode, newChild) {
	if (newChild.parentNode) {
		newChild.parentNode.removeChild(newChild);
	}
	newChild.parentNode = parentNode;
	newChild.previousSibling = parentNode.lastChild;
	newChild.nextSibling = null;
	if (newChild.previousSibling) {
		newChild.previousSibling.nextSibling = newChild;
	} else {
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
	return newChild;
}

Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	/**
	 * The DocumentType node of the document.
	 *
	 * @readonly
	 * @type DocumentType
	 */
	doctype :  null,
	documentElement :  null,
	_inc : 1,

	insertBefore :  function(newChild, refChild){//raises
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		_insertBefore(this, newChild, refChild);
		newChild.ownerDocument = this;
		if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
			this.documentElement = newChild;
		}

		return newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	replaceChild: function (newChild, oldChild) {
		//raises
		_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
		newChild.ownerDocument = this;
		if (oldChild) {
			this.removeChild(oldChild);
		}
		if (isElementNode(newChild)) {
			this.documentElement = newChild;
		}
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		});
		return rtv;
	},

	/**
	 * The `getElementsByClassName` method of `Document` interface returns an array-like object
	 * of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
	 *
	 *
	 * Warning: This is a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */
	getElementsByClassName: function(classNames) {
		var classNamesSet = toOrderedSet(classNames);
		return new LiveNodeList(this, function(base) {
			var ls = [];
			if (classNamesSet.length > 0) {
				_visitNode(base.documentElement, function(node) {
					if(node !== base && node.nodeType === ELEMENT_NODE) {
						var nodeClassNames = node.getAttribute('class');
						// can be null if the attribute does not exist
						if (nodeClassNames) {
							// before splitting and iterating just compare them for the most common case
							var matches = classNames === nodeClassNames;
							if (!matches) {
								var nodeClassNamesSet = toOrderedSet(nodeClassNames);
								matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
							}
							if(matches) {
								ls.push(node);
							}
						}
					}
				});
			}
			return ls;
		});
	},

	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.localName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
}Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name);
		attr && this.removeAttributeNode(attr);
	},

	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else {
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;

		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
}Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
}CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);

	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
};
_extends(CharacterData,Node);
function Text() {
}Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
};
_extends(Text,CharacterData);
function Comment() {
}Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
};
_extends(Comment,CharacterData);

function CDATASection() {
}CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
};
_extends(CDATASection,CharacterData);


function DocumentType() {
}DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
}Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
}Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
}EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
}DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
};
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9 && this.documentElement || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;

	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			];
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	// According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
	// and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
	// > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
	// in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
	// and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
	// > [...] Furthermore, the attribute value [...] must not be an empty string.
	// so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
	if (!uri) {
		return false;
	}
	if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
		return false;
	}

	var i = visibleNamespaces.length;
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		if (ns.prefix === prefix) {
			return ns.namespace !== uri;
		}
	}
	return true;
}
/**
 * Well-formed constraint: No < in Attribute Values
 * > The replacement text of any entity referred to directly or indirectly
 * > in an attribute value must not contain a <.
 * @see https://www.w3.org/TR/xml11/#CleanAttrVals
 * @see https://www.w3.org/TR/xml11/#NT-AttValue
 *
 * Literal whitespace other than space that appear in attribute values
 * are serialized as their entity references, so they will be preserved.
 * (In contrast to whitespace literals in the input which are normalized to spaces)
 * @see https://www.w3.org/TR/xml11/#AVNormalize
 * @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
 */
function addSerializedAttribute(buf, qualifiedName, value) {
	buf.push(' ', qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
}

function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if (!visibleNamespaces) {
		visibleNamespaces = [];
	}

	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else {
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}

	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;

		isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;

		var prefixedNodeName = nodeName;
		if (!isHTML && !node.prefix && node.namespaceURI) {
			var defaultNS;
			// lookup current default ns from `xmlns` attribute
			for (var ai = 0; ai < attrs.length; ai++) {
				if (attrs.item(ai).name === 'xmlns') {
					defaultNS = attrs.item(ai).value;
					break
				}
			}
			if (!defaultNS) {
				// lookup current default ns in visibleNamespaces
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi];
					if (namespace.prefix === '' && namespace.namespace === node.namespaceURI) {
						defaultNS = namespace.namespace;
						break
					}
				}
			}
			if (defaultNS !== node.namespaceURI) {
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi];
					if (namespace.namespace === node.namespaceURI) {
						if (namespace.prefix) {
							prefixedNodeName = namespace.prefix + ':' + nodeName;
						}
						break
					}
				}
			}
		}

		buf.push('<', prefixedNodeName);

		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}

		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}

		// add namespace for current node
		if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}

		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else {
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					child = child.nextSibling;
				}
			}
			buf.push('</',prefixedNodeName,'>');
		}else {
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return addSerializedAttribute(buf, node.name, node.value);
	case TEXT_NODE:
		/**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 * @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
		 */
		return buf.push(node.data
			.replace(/[<&>]/g,_xmlEncoder)
		);
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC ', pubid);
			if (sysid && sysid!='.') {
				buf.push(' ', sysid);
			}
			buf.push('>');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM ', sysid, '>');
		}else {
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE???
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for (var n in node) {
		if (Object.prototype.hasOwnProperty.call(node, n)) {
			var v = node[n];
			if (typeof v != "object") {
				if (v != node2[n]) {
					node2[n] = v;
				}
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length;
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value;
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});

		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},

			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;

				default:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		});

		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}

		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value;
		};
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DocumentType = DocumentType;
	exports.DOMException = DOMException;
	exports.DOMImplementation = DOMImplementation;
	exports.Element = Element;
	exports.Node = Node;
	exports.NodeList = NodeList;
	exports.XMLSerializer = XMLSerializer;
//}


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/entities.js":
/*!*****************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/entities.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeze = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js").freeze;

/**
 * The entities that are predefined in every XML document.
 *
 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
 */
exports.XML_ENTITIES = freeze({amp:'&', apos:"'", gt:'>', lt:'<', quot:'"'});

/**
 * A map of currently 241 entities that are detected in an HTML document.
 * They contain all entries from `XML_ENTITIES`.
 *
 * @see XML_ENTITIES
 * @see DOMParser.parseFromString
 * @see DOMImplementation.prototype.createHTMLDocument
 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
 */
exports.HTML_ENTITIES = freeze({
       lt: '<',
       gt: '>',
       amp: '&',
       quot: '"',
       apos: "'",
       Agrave: "??",
       Aacute: "??",
       Acirc: "??",
       Atilde: "??",
       Auml: "??",
       Aring: "??",
       AElig: "??",
       Ccedil: "??",
       Egrave: "??",
       Eacute: "??",
       Ecirc: "??",
       Euml: "??",
       Igrave: "??",
       Iacute: "??",
       Icirc: "??",
       Iuml: "??",
       ETH: "??",
       Ntilde: "??",
       Ograve: "??",
       Oacute: "??",
       Ocirc: "??",
       Otilde: "??",
       Ouml: "??",
       Oslash: "??",
       Ugrave: "??",
       Uacute: "??",
       Ucirc: "??",
       Uuml: "??",
       Yacute: "??",
       THORN: "??",
       szlig: "??",
       agrave: "??",
       aacute: "??",
       acirc: "??",
       atilde: "??",
       auml: "??",
       aring: "??",
       aelig: "??",
       ccedil: "??",
       egrave: "??",
       eacute: "??",
       ecirc: "??",
       euml: "??",
       igrave: "??",
       iacute: "??",
       icirc: "??",
       iuml: "??",
       eth: "??",
       ntilde: "??",
       ograve: "??",
       oacute: "??",
       ocirc: "??",
       otilde: "??",
       ouml: "??",
       oslash: "??",
       ugrave: "??",
       uacute: "??",
       ucirc: "??",
       uuml: "??",
       yacute: "??",
       thorn: "??",
       yuml: "??",
       nbsp: "\u00a0",
       iexcl: "??",
       cent: "??",
       pound: "??",
       curren: "??",
       yen: "??",
       brvbar: "??",
       sect: "??",
       uml: "??",
       copy: "??",
       ordf: "??",
       laquo: "??",
       not: "??",
       shy: "????",
       reg: "??",
       macr: "??",
       deg: "??",
       plusmn: "??",
       sup2: "??",
       sup3: "??",
       acute: "??",
       micro: "??",
       para: "??",
       middot: "??",
       cedil: "??",
       sup1: "??",
       ordm: "??",
       raquo: "??",
       frac14: "??",
       frac12: "??",
       frac34: "??",
       iquest: "??",
       times: "??",
       divide: "??",
       forall: "???",
       part: "???",
       exist: "???",
       empty: "???",
       nabla: "???",
       isin: "???",
       notin: "???",
       ni: "???",
       prod: "???",
       sum: "???",
       minus: "???",
       lowast: "???",
       radic: "???",
       prop: "???",
       infin: "???",
       ang: "???",
       and: "???",
       or: "???",
       cap: "???",
       cup: "???",
       'int': "???",
       there4: "???",
       sim: "???",
       cong: "???",
       asymp: "???",
       ne: "???",
       equiv: "???",
       le: "???",
       ge: "???",
       sub: "???",
       sup: "???",
       nsub: "???",
       sube: "???",
       supe: "???",
       oplus: "???",
       otimes: "???",
       perp: "???",
       sdot: "???",
       Alpha: "??",
       Beta: "??",
       Gamma: "??",
       Delta: "??",
       Epsilon: "??",
       Zeta: "??",
       Eta: "??",
       Theta: "??",
       Iota: "??",
       Kappa: "??",
       Lambda: "??",
       Mu: "??",
       Nu: "??",
       Xi: "??",
       Omicron: "??",
       Pi: "??",
       Rho: "??",
       Sigma: "??",
       Tau: "??",
       Upsilon: "??",
       Phi: "??",
       Chi: "??",
       Psi: "??",
       Omega: "??",
       alpha: "??",
       beta: "??",
       gamma: "??",
       delta: "??",
       epsilon: "??",
       zeta: "??",
       eta: "??",
       theta: "??",
       iota: "??",
       kappa: "??",
       lambda: "??",
       mu: "??",
       nu: "??",
       xi: "??",
       omicron: "??",
       pi: "??",
       rho: "??",
       sigmaf: "??",
       sigma: "??",
       tau: "??",
       upsilon: "??",
       phi: "??",
       chi: "??",
       psi: "??",
       omega: "??",
       thetasym: "??",
       upsih: "??",
       piv: "??",
       OElig: "??",
       oelig: "??",
       Scaron: "??",
       scaron: "??",
       Yuml: "??",
       fnof: "??",
       circ: "??",
       tilde: "??",
       ensp: "???",
       emsp: "???",
       thinsp: "???",
       zwnj: "???",
       zwj: "???",
       lrm: "???",
       rlm: "???",
       ndash: "???",
       mdash: "???",
       lsquo: "???",
       rsquo: "???",
       sbquo: "???",
       ldquo: "???",
       rdquo: "???",
       bdquo: "???",
       dagger: "???",
       Dagger: "???",
       bull: "???",
       hellip: "???",
       permil: "???",
       prime: "???",
       Prime: "???",
       lsaquo: "???",
       rsaquo: "???",
       oline: "???",
       euro: "???",
       trade: "???",
       larr: "???",
       uarr: "???",
       rarr: "???",
       darr: "???",
       harr: "???",
       crarr: "???",
       lceil: "???",
       rceil: "???",
       lfloor: "???",
       rfloor: "???",
       loz: "???",
       spades: "???",
       clubs: "???",
       hearts: "???",
       diams: "???"
});

/**
 * @deprecated use `HTML_ENTITIES` instead
 * @see HTML_ENTITIES
 */
exports.entityMap = exports.HTML_ENTITIES;


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(/*! ./dom */ "./node_modules/@xmldom/xmldom/lib/dom.js");
exports.DOMImplementation = dom.DOMImplementation;
exports.XMLSerializer = dom.XMLSerializer;
exports.DOMParser = __webpack_require__(/*! ./dom-parser */ "./node_modules/@xmldom/xmldom/lib/dom-parser.js").DOMParser;


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/sax.js":
/*!************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/sax.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NAMESPACE = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js").NAMESPACE;

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;//\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
function ParseError(message, locator) {
	this.message = message;
	this.locator = locator;
	if(Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
}
ParseError.prototype = new Error();
ParseError.prototype.name = ParseError.name;

function XMLReader(){

}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {});
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
};
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if (Object.hasOwnProperty.call(entityMap, k)) {
			return entityMap[k];
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else {
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end;
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g;
	var locator = domBuilder.locator;

	var parseStack = [{currentNSMap:defaultNSMapCopy}];
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, '');
				var config = parseStack.pop();
				if(end<0){

	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase();
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for (var prefix in localNSMap) {
							if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
								domBuilder.endPrefixMapping(prefix);
							}
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName ); // No known test case
					}
		        }else {
		        	parseStack.push(config);
		        }

				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;


				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					domBuilder.locator = locator2;
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el);
					}
					domBuilder.locator = locator;
				}else {
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el);
					}
				}

				if (NAMESPACE.isHTML(el.uri) && !el.closed) {
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder);
				} else {
					end++;
				}
			}
		}catch(e){
			if (e instanceof ParseError) {
				throw e;
			}
			errorHandler.error('element parse error: '+e);
			end = -1;
		}
		if(end>start){
			start = end;
		}else {
			//TODO: ???????????????sax??????????????????????????????
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){

	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (el.attributeNames.hasOwnProperty(qname)) {
			errorHandler.fatalError('Attribute ' + qname + ' redefined');
		}
		el.addValue(
			qname,
			// @see https://www.w3.org/TR/xml/#AVNormalize
			// since the xmldom sax parser does not "interpret" DTD the following is not implemented:
			// - recursive replacement of (DTD) entity references
			// - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
			value.replace(/[\t\n\r]/g, ' ').replace(/&#?\w+;/g, entityReplacer),
			startIndex
		);
	}
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else {
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName'); // No known test case
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="');
					attrName = source.slice(start,p);
				}
				start = p+1;
				p = source.indexOf(c,start);
				if(p>0){
					value = source.slice(start, p);
					addAttribute(attrName, value, start-1);
					s = S_ATTR_END;
				}else {
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start, p);
				addAttribute(attrName, value, start);
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END;
			}else {
				//fatalError: no equal before
				throw new Error('attribute value must after "="'); // No known test case
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')") // No known test case
			}
			break;
		case ''://end document
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1);
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!');
					addAttribute(attrName, value, start);
				}else {
					if(!NAMESPACE.isHTML(currentNSMap['']) || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!');
					}
					addAttribute(value, value, start);
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p);
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start, p);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					addAttribute(attrName, value, start);
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else {//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					el.tagName;
					if (!NAMESPACE.isHTML(currentNSMap['']) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!');
					}
					addAttribute(attrName, attrName, start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!');
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName;
		}else {
			localName = qName;
			prefix = null;
			nsPrefix = qName === 'xmlns' && '';
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {};
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={});
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = NAMESPACE.XMLNS;
			domBuilder.startPrefixMapping(nsPrefix, value);
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = NAMESPACE.XML;
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || ''];

				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else {
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for (prefix in localNSMap) {
				if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
					domBuilder.endPrefixMapping(prefix);
				}
			}
		}
	}else {
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}

		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>');
		if(pos<elStartEnd){//????????????
			pos = source.lastIndexOf('</'+tagName);
		}
		closeMap[tagName] =pos;
	}
	return pos<elStartEnd;
	//}
}

function _copy (source, target) {
	for (var n in source) {
		if (Object.prototype.hasOwnProperty.call(source, n)) {
			target[n] = source[n];
		}
	}
}

function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2);
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else {
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else {
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA();
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = false;
			var sysid = false;
			if(len>3){
				if(/^public$/i.test(matchs[2][0])){
					pubid = matchs[3][0];
					sysid = len>4 && matchs[4][0];
				}else if(/^system$/i.test(matchs[2][0])){
					sysid = matchs[3][0];
				}
			}
			var lastMatch = matchs[len-1];
			domBuilder.startDTD(name, pubid, sysid);
			domBuilder.endDTD();

			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else {//error
			return -1;
		}
	}
	return -1;
}

function ElementAttributes(){
	this.attributeNames = {};
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName;
	},
	addValue:function(qName, value, offset) {
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this.attributeNames[qName] = this.length;
		this[this.length++] = {qName:qName,value:value,offset:offset};
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
};



function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;
exports.ParseError = ParseError;


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ());
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] };

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}));

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, types, scripts, repository, keywords, author, license, bugs, homepage, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"cos-js-sdk-v5\",\"version\":\"1.4.15\",\"description\":\"JavaScript SDK for [?????????????????????](https://cloud.tencent.com/product/cos)\",\"main\":\"dist/cos-js-sdk-v5.js\",\"types\":\"index.d.ts\",\"scripts\":{\"server\":\"node server/sts.js\",\"dev\":\"cross-env NODE_ENV=development webpack -w --mode=development\",\"build\":\"cross-env NODE_ENV=production webpack --mode=production\",\"cos-auth.min.js\":\"uglifyjs ./demo/common/cos-auth.js -o ./demo/common/cos-auth.min.js -c -m\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/tencentyun/cos-js-sdk-v5.git\"},\"keywords\":[],\"author\":\"carsonxu\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/tencentyun/cos-js-sdk-v5/issues\"},\"homepage\":\"https://github.com/tencentyun/cos-js-sdk-v5#readme\",\"dependencies\":{\"@xmldom/xmldom\":\"^0.8.6\"},\"devDependencies\":{\"@babel/core\":\"7.17.9\",\"@babel/plugin-transform-runtime\":\"7.18.10\",\"@babel/preset-env\":\"7.16.11\",\"babel-loader\":\"8.2.5\",\"body-parser\":\"^1.18.3\",\"cross-env\":\"^5.2.0\",\"express\":\"^4.16.4\",\"qcloud-cos-sts\":\"^3.0.2\",\"request\":\"^2.87.0\",\"terser-webpack-plugin\":\"4.2.3\",\"webpack\":\"4.46.0\",\"webpack-cli\":\"4.10.0\"}}");

/***/ }),

/***/ "./src/advance.js":
/*!************************!*\
  !*** ./src/advance.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var session = __webpack_require__(/*! ./session */ "./src/session.js");

var Async = __webpack_require__(/*! ./async */ "./src/async.js");

var EventProxy = __webpack_require__(/*! ./event */ "./src/event.js").EventProxy;

var util = __webpack_require__(/*! ./util */ "./src/util.js");

var Tracker = __webpack_require__(/*! ./tracker */ "./src/tracker.js"); // ?????????????????????????????????????????????????????????


function sliceUploadFile(params, callback) {
  var self = this;
  var ep = new EventProxy();
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var Body = params.Body;
  var ChunkSize = params.ChunkSize || params.SliceSize || self.options.ChunkSize;
  var AsyncLimit = params.AsyncLimit;
  var StorageClass = params.StorageClass;
  var ServerSideEncryption = params.ServerSideEncryption;
  var FileSize;
  var onProgress;
  var onHashProgress = params.onHashProgress;
  var tracker = params.tracker;
  tracker && tracker.setParams({
    chunkSize: ChunkSize
  }); // ??????????????????????????????????????????

  ep.on('error', function (err) {
    if (!self._isRunningTask(TaskId)) return;
    err.UploadId = params.UploadData.UploadId || '';
    return callback(err);
  }); // ??????????????????????????? uploadSliceComplete ??????

  ep.on('upload_complete', function (UploadCompleteData) {
    var _UploadCompleteData = util.extend({
      UploadId: params.UploadData.UploadId || ''
    }, UploadCompleteData);

    callback(null, _UploadCompleteData);
  }); // ??????????????????????????? uploadSliceComplete ??????

  ep.on('upload_slice_complete', function (UploadData) {
    var metaHeaders = {};
    util.each(params.Headers, function (val, k) {
      var shortKey = k.toLowerCase();
      if (shortKey.indexOf('x-cos-meta-') === 0 || shortKey === 'pic-operations') metaHeaders[k] = val;
    });
    uploadSliceComplete.call(self, {
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      UploadId: UploadData.UploadId,
      SliceList: UploadData.SliceList,
      Headers: metaHeaders,
      tracker: tracker
    }, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      session.removeUsing(UploadData.UploadId);

      if (err) {
        onProgress(null, true);
        return ep.emit('error', err);
      }

      session.removeUploadId.call(self, UploadData.UploadId);
      onProgress({
        loaded: FileSize,
        total: FileSize
      }, true);
      ep.emit('upload_complete', data);
    });
  }); // ?????? UploadId ?????????????????????????????????

  ep.on('get_upload_data_finish', function (UploadData) {
    // ?????? UploadId ??????
    var uuid = session.getFileId(Body, params.ChunkSize, Bucket, Key);
    uuid && session.saveUploadId.call(self, uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // ?????? UploadId

    session.setUsing(UploadData.UploadId); // ?????? UploadId ???????????????
    // ?????? UploadId

    onProgress(null, true); // ?????????????????? uploading

    uploadSliceList.call(self, {
      TaskId: TaskId,
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      Body: Body,
      FileSize: FileSize,
      SliceSize: ChunkSize,
      AsyncLimit: AsyncLimit,
      ServerSideEncryption: ServerSideEncryption,
      UploadData: UploadData,
      Headers: params.Headers,
      onProgress: onProgress,
      tracker: tracker
    }, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;

      if (err) {
        onProgress(null, true);
        return ep.emit('error', err);
      }

      ep.emit('upload_slice_complete', data);
    });
  }); // ?????????????????? UploadId??????????????????????????? ETag??????????????????????????????????????????????????????

  ep.on('get_file_size_finish', function () {
    onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

    if (params.UploadData.UploadId) {
      ep.emit('get_upload_data_finish', params.UploadData);
    } else {
      var _params = util.extend({
        TaskId: TaskId,
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Headers: params.Headers,
        StorageClass: StorageClass,
        Body: Body,
        FileSize: FileSize,
        SliceSize: ChunkSize,
        onHashProgress: onHashProgress,
        tracker: tracker
      }, params);

      getUploadIdAndPartList.call(self, _params, function (err, UploadData) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) return ep.emit('error', err);
        params.UploadData.UploadId = UploadData.UploadId;
        params.UploadData.PartList = UploadData.PartList;
        ep.emit('get_upload_data_finish', params.UploadData);
      });
    }
  }); // ????????????????????????

  FileSize = params.ContentLength;
  delete params.ContentLength;
  !params.Headers && (params.Headers = {});
  util.each(params.Headers, function (item, key) {
    if (key.toLowerCase() === 'content-length') {
      delete params.Headers[key];
    }
  }); // ??????????????????

  (function () {
    var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
    var AutoChunkSize = 1024 * 1024;

    for (var i = 0; i < SIZE.length; i++) {
      AutoChunkSize = SIZE[i] * 1024 * 1024;
      if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
    }

    params.ChunkSize = params.SliceSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
  })(); // ????????????


  if (FileSize === 0) {
    params.Body = '';
    params.ContentLength = 0;
    params.SkipTask = true;
    self.putObject(params, callback);
  } else {
    ep.emit('get_file_size_finish');
  }
} // ????????????????????? UploadId


function getUploadIdAndPartList(params, callback) {
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var StorageClass = params.StorageClass;
  var self = this; // ?????? ETag

  var ETagMap = {};
  var FileSize = params.FileSize;
  var SliceSize = params.SliceSize;
  var SliceCount = Math.ceil(FileSize / SliceSize);
  var FinishSize = 0;
  var onHashProgress = util.throttleOnProgress.call(self, FileSize, params.onHashProgress);

  var getChunkETag = function getChunkETag(PartNumber, callback) {
    var start = SliceSize * (PartNumber - 1);
    var end = Math.min(start + SliceSize, FileSize);
    var ChunkSize = end - start;

    if (ETagMap[PartNumber]) {
      callback(null, {
        PartNumber: PartNumber,
        ETag: ETagMap[PartNumber],
        Size: ChunkSize
      });
    } else {
      util.fileSlice(params.Body, start, end, false, function (chunkItem) {
        util.getFileMd5(chunkItem, function (err, md5) {
          if (err) return callback(util.error(err));
          var ETag = '"' + md5 + '"';
          ETagMap[PartNumber] = ETag;
          FinishSize += ChunkSize;
          onHashProgress({
            loaded: FinishSize,
            total: FileSize
          });
          callback(null, {
            PartNumber: PartNumber,
            ETag: ETag,
            Size: ChunkSize
          });
        });
      });
    }
  }; // ?????????????????? md5 ??????????????? UploadId ????????????


  var isAvailableUploadList = function isAvailableUploadList(PartList, callback) {
    var PartCount = PartList.length; // ???????????????????????????

    if (PartCount === 0) {
      return callback(null, true);
    } // ??????????????????


    if (PartCount > SliceCount) {
      return callback(null, false);
    } // ??????????????????


    if (PartCount > 1) {
      var PartSliceSize = Math.max(PartList[0].Size, PartList[1].Size);

      if (PartSliceSize !== SliceSize) {
        return callback(null, false);
      }
    } // ??????????????????????????? ETag ????????????


    var next = function next(index) {
      if (index < PartCount) {
        var Part = PartList[index];
        getChunkETag(Part.PartNumber, function (err, chunk) {
          if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {
            next(index + 1);
          } else {
            callback(null, false);
          }
        });
      } else {
        callback(null, true);
      }
    };

    next(0);
  };

  var ep = new EventProxy();
  ep.on('error', function (errData) {
    if (!self._isRunningTask(TaskId)) return;
    return callback(errData);
  }); // ?????? UploadId

  ep.on('upload_id_available', function (UploadData) {
    // ????????? map
    var map = {};
    var list = [];
    util.each(UploadData.PartList, function (item) {
      map[item.PartNumber] = item;
    });

    for (var PartNumber = 1; PartNumber <= SliceCount; PartNumber++) {
      var item = map[PartNumber];

      if (item) {
        item.PartNumber = PartNumber;
        item.Uploaded = true;
      } else {
        item = {
          PartNumber: PartNumber,
          ETag: null,
          Uploaded: false
        };
      }

      list.push(item);
    }

    UploadData.PartList = list;
    callback(null, UploadData);
  }); // ????????? UploadId, ??????????????? UploadId

  ep.on('no_available_upload_id', function () {
    if (!self._isRunningTask(TaskId)) return;

    var _params = util.extend({
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      Query: util.clone(params.Query),
      StorageClass: StorageClass,
      Body: params.Body,
      calledBySdk: 'sliceUploadFile',
      tracker: params.tracker
    }, params);

    var headers = util.clone(params.Headers);
    delete headers['x-cos-mime-limit'];
    _params.Headers = headers;
    self.multipartInit(_params, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      if (err) return ep.emit('error', err);
      var UploadId = data.UploadId;

      if (!UploadId) {
        return callback(util.error(new Error('no such upload id')));
      }

      ep.emit('upload_id_available', {
        UploadId: UploadId,
        PartList: []
      });
    });
  }); // ??????????????? UploadId???????????????????????? UploadId

  ep.on('has_and_check_upload_id', function (UploadIdList) {
    // ???????????????????????????????????? UploadId
    UploadIdList = UploadIdList.reverse();
    Async.eachLimit(UploadIdList, 1, function (UploadId, asyncCallback) {
      if (!self._isRunningTask(TaskId)) return; // ???????????????????????????

      if (session.using[UploadId]) {
        asyncCallback(); // ??????????????? UploadId

        return;
      } // ?????? UploadId ????????????


      wholeMultipartListPart.call(self, {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadId,
        tracker: params.tracker
      }, function (err, PartListData) {
        if (!self._isRunningTask(TaskId)) return;

        if (err) {
          session.removeUsing(UploadId);
          return ep.emit('error', err);
        }

        var PartList = PartListData.PartList;
        PartList.forEach(function (item) {
          item.PartNumber *= 1;
          item.Size *= 1;
          item.ETag = item.ETag || '';
        });
        isAvailableUploadList(PartList, function (err, isAvailable) {
          if (!self._isRunningTask(TaskId)) return;
          if (err) return ep.emit('error', err);

          if (isAvailable) {
            asyncCallback({
              UploadId: UploadId,
              PartList: PartList
            }); // ????????????
          } else {
            asyncCallback(); // ??????????????? UploadId
          }
        });
      });
    }, function (AvailableUploadData) {
      if (!self._isRunningTask(TaskId)) return;
      onHashProgress(null, true);

      if (AvailableUploadData && AvailableUploadData.UploadId) {
        ep.emit('upload_id_available', AvailableUploadData);
      } else {
        ep.emit('no_available_upload_id');
      }
    });
  }); // ??????????????????????????? UploadId

  ep.on('seek_local_avail_upload_id', function (RemoteUploadIdList) {
    // ????????????????????? UploadId
    var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key);
    var LocalUploadIdList = session.getUploadIdList.call(self, uuid);

    if (!uuid || !LocalUploadIdList) {
      ep.emit('has_and_check_upload_id', RemoteUploadIdList);
      return;
    }

    var next = function next(index) {
      // ??????????????????????????? UploadId?????????????????????????????????
      if (index >= LocalUploadIdList.length) {
        ep.emit('has_and_check_upload_id', RemoteUploadIdList);
        return;
      }

      var UploadId = LocalUploadIdList[index]; // ?????????????????? UploadId ???????????????????????????

      if (!util.isInArray(RemoteUploadIdList, UploadId)) {
        session.removeUploadId.call(self, UploadId);
        next(index + 1);
        return;
      } // ???????????????????????????


      if (session.using[UploadId]) {
        next(index + 1);
        return;
      } // ?????? UploadId ??????????????????


      wholeMultipartListPart.call(self, {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadId,
        tracker: params.tracker
      }, function (err, PartListData) {
        if (!self._isRunningTask(TaskId)) return;

        if (err) {
          // ?????? UploadId ?????????????????????????????????
          session.removeUploadId.call(self, UploadId);
          next(index + 1);
        } else {
          // ???????????? UploadId
          ep.emit('upload_id_available', {
            UploadId: UploadId,
            PartList: PartListData.PartList
          });
        }
      });
    };

    next(0);
  }); // ???????????? UploadId ??????

  ep.on('get_remote_upload_id_list', function () {
    // ????????????????????? UploadId ????????????????????????????????????????????????????????????
    wholeMultipartList.call(self, {
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      tracker: params.tracker
    }, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      if (err) return ep.emit('error', err); // ???????????? UploadId ??????

      var RemoteUploadIdList = util.filter(data.UploadList, function (item) {
        return item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase());
      }).reverse().map(function (item) {
        return item.UploadId || item.UploadID;
      });

      if (RemoteUploadIdList.length) {
        ep.emit('seek_local_avail_upload_id', RemoteUploadIdList);
      } else {
        // ???????????? UploadId?????????????????? UploadId
        var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key),
            LocalUploadIdList;

        if (uuid && (LocalUploadIdList = session.getUploadIdList.call(self, uuid))) {
          util.each(LocalUploadIdList, function (UploadId) {
            session.removeUploadId.call(self, UploadId);
          });
        }

        ep.emit('no_available_upload_id');
      }
    });
  }); // ??????????????? UploadId

  ep.emit('get_remote_upload_id_list');
} // ??????????????????????????????????????? (???????????? Bucket, Region, Prefix)


function wholeMultipartList(params, callback) {
  var self = this;
  var UploadList = [];
  var sendParams = {
    Bucket: params.Bucket,
    Region: params.Region,
    Prefix: params.Key,
    calledBySdk: params.calledBySdk || 'sliceUploadFile',
    tracker: params.tracker
  };

  var next = function next() {
    self.multipartList(sendParams, function (err, data) {
      if (err) return callback(err);
      UploadList.push.apply(UploadList, data.Upload || []);

      if (data.IsTruncated === 'true') {
        // ???????????????
        sendParams.KeyMarker = data.NextKeyMarker;
        sendParams.UploadIdMarker = data.NextUploadIdMarker;
        next();
      } else {
        callback(null, {
          UploadList: UploadList
        });
      }
    });
  };

  next();
} // ???????????????????????????????????????


function wholeMultipartListPart(params, callback) {
  var self = this;
  var PartList = [];
  var sendParams = {
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    UploadId: params.UploadId,
    calledBySdk: 'sliceUploadFile',
    tracker: params.tracker
  };

  var next = function next() {
    self.multipartListPart(sendParams, function (err, data) {
      if (err) return callback(err);
      PartList.push.apply(PartList, data.Part || []);

      if (data.IsTruncated === 'true') {
        // ???????????????
        sendParams.PartNumberMarker = data.NextPartNumberMarker;
        next();
      } else {
        callback(null, {
          PartList: PartList
        });
      }
    });
  };

  next();
} // ???????????????????????????

/*
 UploadId (??????????????????)
 AsyncLimit (?????????)???
 SliceList (?????????????????????)???
 FilePath (?????????????????????)???
 SliceSize (??????????????????)
 FileSize (????????????)
 onProgress (?????????????????????????????????)
 */


function uploadSliceList(params, cb) {
  var self = this;
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var UploadData = params.UploadData;
  var FileSize = params.FileSize;
  var SliceSize = params.SliceSize;
  var ChunkParallel = Math.min(params.AsyncLimit || self.options.ChunkParallelLimit || 1, 256);
  var Body = params.Body;
  var SliceCount = Math.ceil(FileSize / SliceSize);
  var FinishSize = 0;
  var ServerSideEncryption = params.ServerSideEncryption;
  var Headers = params.Headers;
  var needUploadSlices = util.filter(UploadData.PartList, function (SliceItem) {
    if (SliceItem['Uploaded']) {
      FinishSize += SliceItem['PartNumber'] >= SliceCount ? FileSize % SliceSize || SliceSize : SliceSize;
    }

    return !SliceItem['Uploaded'];
  });
  var _onProgress2 = params.onProgress;
  Async.eachLimit(needUploadSlices, ChunkParallel, function (SliceItem, asyncCallback) {
    if (!self._isRunningTask(TaskId)) return;
    var PartNumber = SliceItem['PartNumber'];
    var currentSize = Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;
    var preAddSize = 0;
    uploadSliceItem.call(self, {
      TaskId: TaskId,
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      SliceSize: SliceSize,
      FileSize: FileSize,
      PartNumber: PartNumber,
      ServerSideEncryption: ServerSideEncryption,
      Body: Body,
      UploadData: UploadData,
      Headers: Headers,
      onProgress: function onProgress(data) {
        FinishSize += data.loaded - preAddSize;
        preAddSize = data.loaded;

        _onProgress2({
          loaded: FinishSize,
          total: FileSize
        });
      },
      tracker: params.tracker
    }, function (err, data) {
      if (!self._isRunningTask(TaskId)) return;
      if (!err && !data.ETag) err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.( ??????ETag???????????????CORS ExposeHeader???????????????ETag?????????????????????https://cloud.tencent.com/document/product/436/13318 )';

      if (err) {
        FinishSize -= preAddSize;
      } else {
        FinishSize += currentSize - preAddSize;
        SliceItem.ETag = data.ETag;
      }

      _onProgress2({
        loaded: FinishSize,
        total: FileSize
      });

      asyncCallback(err || null, data);
    });
  }, function (err) {
    if (!self._isRunningTask(TaskId)) return;
    if (err) return cb(err);
    cb(null, {
      UploadId: UploadData.UploadId,
      SliceList: UploadData.PartList
    });
  });
} // ??????????????????


function uploadSliceItem(params, callback) {
  var self = this;
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var FileSize = params.FileSize;
  var FileBody = params.Body;
  var PartNumber = params.PartNumber * 1;
  var SliceSize = params.SliceSize;
  var ServerSideEncryption = params.ServerSideEncryption;
  var UploadData = params.UploadData;
  var Headers = params.Headers || {};
  var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;
  var start = SliceSize * (PartNumber - 1);
  var ContentLength = SliceSize;
  var end = start + SliceSize;

  if (end > FileSize) {
    end = FileSize;
    ContentLength = end - start;
  }

  var headersWhiteList = ['x-cos-traffic-limit', 'x-cos-mime-limit'];
  var headers = {};
  util.each(Headers, function (v, k) {
    if (headersWhiteList.indexOf(k) > -1) {
      headers[k] = v;
    }
  });
  var PartItem = UploadData.PartList[PartNumber - 1];
  Async.retry(ChunkRetryTimes, function (tryCallback) {
    if (!self._isRunningTask(TaskId)) return;
    util.fileSlice(FileBody, start, end, true, function (Body) {
      self.multipartUpload({
        TaskId: TaskId,
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        ContentLength: ContentLength,
        PartNumber: PartNumber,
        UploadId: UploadData.UploadId,
        ServerSideEncryption: ServerSideEncryption,
        Body: Body,
        Headers: headers,
        onProgress: params.onProgress,
        calledBySdk: 'sliceUploadFile',
        tracker: params.tracker
      }, function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        if (err) return tryCallback(err);
        PartItem.Uploaded = true;
        return tryCallback(null, data);
      });
    });
  }, function (err, data) {
    if (!self._isRunningTask(TaskId)) return;
    return callback(err, data);
  });
} // ??????????????????


function uploadSliceComplete(params, callback) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var UploadId = params.UploadId;
  var SliceList = params.SliceList;
  var self = this;
  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
  var Headers = params.Headers;
  var Parts = SliceList.map(function (item) {
    return {
      PartNumber: item.PartNumber,
      ETag: item.ETag
    };
  }); // ?????????????????????????????????

  Async.retry(ChunkRetryTimes, function (tryCallback) {
    self.multipartComplete({
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      UploadId: UploadId,
      Parts: Parts,
      Headers: Headers,
      calledBySdk: 'sliceUploadFile',
      tracker: params.tracker
    }, tryCallback);
  }, function (err, data) {
    callback(err, data);
  });
} // ????????????????????????

/*
 AsyncLimit (??????????????????????????????)???
 UploadId (??????????????????????????? Level ??? task ????????????)
 Level (????????????????????????????????????task : ??????????????????????????????file ??? ?????????????????????????????????????????????????????? ???????????????Bucket ?????????????????????)
 */


function abortUploadTask(params, callback) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var UploadId = params.UploadId;
  var Level = params.Level || 'task';
  var AsyncLimit = params.AsyncLimit;
  var self = this;
  var ep = new EventProxy();
  ep.on('error', function (errData) {
    return callback(errData);
  }); // ??????????????????????????????????????????

  ep.on('get_abort_array', function (AbortArray) {
    abortUploadTaskArray.call(self, {
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      Headers: params.Headers,
      AsyncLimit: AsyncLimit,
      AbortArray: AbortArray
    }, callback);
  });

  if (Level === 'bucket') {
    // Bucket ????????????????????????????????? Bucket ????????????????????????
    wholeMultipartList.call(self, {
      Bucket: Bucket,
      Region: Region,
      calledBySdk: 'abortUploadTask'
    }, function (err, data) {
      if (err) return callback(err);
      ep.emit('get_abort_array', data.UploadList || []);
    });
  } else if (Level === 'file') {
    // ??????????????????????????????????????????????????????????????????
    if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));
    wholeMultipartList.call(self, {
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      calledBySdk: 'abortUploadTask'
    }, function (err, data) {
      if (err) return callback(err);
      ep.emit('get_abort_array', data.UploadList || []);
    });
  } else if (Level === 'task') {
    // ???????????????????????????????????????????????? UploadId ???????????????
    if (!UploadId) return callback(util.error(new Error('abort_upload_task_no_id')));
    if (!Key) return callback(util.error(new Error('abort_upload_task_no_key')));
    ep.emit('get_abort_array', [{
      Key: Key,
      UploadId: UploadId
    }]);
  } else {
    return callback(util.error(new Error('abort_unknown_level')));
  }
} // ??????????????????????????????


function abortUploadTaskArray(params, callback) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var AbortArray = params.AbortArray;
  var AsyncLimit = params.AsyncLimit || 1;
  var self = this;
  var index = 0;
  var resultList = new Array(AbortArray.length);
  Async.eachLimit(AbortArray, AsyncLimit, function (AbortItem, nextItem) {
    var eachIndex = index;

    if (Key && Key !== AbortItem.Key) {
      resultList[eachIndex] = {
        error: {
          KeyNotMatch: true
        }
      };
      nextItem(null);
      return;
    }

    var UploadId = AbortItem.UploadId || AbortItem.UploadID;
    self.multipartAbort({
      Bucket: Bucket,
      Region: Region,
      Key: AbortItem.Key,
      Headers: params.Headers,
      UploadId: UploadId
    }, function (err) {
      var task = {
        Bucket: Bucket,
        Region: Region,
        Key: AbortItem.Key,
        UploadId: UploadId
      };
      resultList[eachIndex] = {
        error: err,
        task: task
      };
      nextItem(null);
    });
    index++;
  }, function (err) {
    if (err) return callback(err);
    var successList = [];
    var errorList = [];

    for (var i = 0, len = resultList.length; i < len; i++) {
      var item = resultList[i];

      if (item['task']) {
        if (item['error']) {
          errorList.push(item['task']);
        } else {
          successList.push(item['task']);
        }
      }
    }

    return callback(null, {
      successList: successList,
      errorList: errorList
    });
  });
} // ????????????


function uploadFile(params, callback) {
  var self = this; // ???????????????????????????????????????

  var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;
  var taskList = [];
  var Body = params.Body;
  var FileSize = Body.size || Body.length || 0;
  var fileInfo = {
    TaskId: ''
  }; // ????????????

  if (self.options.EnableTracker) {
    var accelerate = self.options.UseAccelerate || typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.');
    params.tracker = new Tracker({
      bucket: params.Bucket,
      region: params.Region,
      apiName: 'uploadFile',
      fileKey: params.Key,
      fileSize: FileSize,
      accelerate: accelerate,
      deepTracker: self.options.DeepTracker,
      customId: self.options.CustomId,
      delay: self.options.TrackerDelay
    });
  } // ?????? option????????????????????????


  util.each(params, function (v, k) {
    if (_typeof(v) !== 'object' && typeof v !== 'function') {
      fileInfo[k] = v;
    }
  }); // ???????????? TaskReady

  var _onTaskReady = params.onTaskReady;

  var onTaskReady = function onTaskReady(tid) {
    fileInfo.TaskId = tid;
    _onTaskReady && _onTaskReady(tid);
  };

  params.onTaskReady = onTaskReady; // ??????????????????,????????????????????????????????????????????????????????????

  var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject'; // ??????????????????

  var _onFileFinish = params.onFileFinish;

  var onFileFinish = function onFileFinish(err, data) {
    // ??????????????????????????????
    params.tracker && params.tracker.formatResult(err, data);
    _onFileFinish && _onFileFinish(err, data, fileInfo);
    callback && callback(err, data);
  };

  taskList.push({
    api: api,
    params: params,
    callback: onFileFinish
  });

  self._addTasks(taskList);
} // ??????????????????


function uploadFiles(params, callback) {
  var self = this; // ???????????????????????????????????????

  var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize; // ??????????????????

  var TotalSize = 0;
  var TotalFinish = 0;
  var onTotalProgress = util.throttleOnProgress.call(self, TotalFinish, params.onProgress); // ??????????????????

  var unFinishCount = params.files.length;
  var _onTotalFileFinish = params.onFileFinish;
  var resultList = Array(unFinishCount);

  var onTotalFileFinish = function onTotalFileFinish(err, data, options) {
    onTotalProgress(null, true);
    _onTotalFileFinish && _onTotalFileFinish(err, data, options);
    resultList[options.Index] = {
      options: options,
      error: err,
      data: data
    };

    if (--unFinishCount <= 0 && callback) {
      callback(null, {
        files: resultList
      });
    }
  }; // ????????????????????????


  var taskList = [];
  util.each(params.files, function (fileParams, index) {
    (function () {
      // ?????? nodejs ??????
      var Body = fileParams.Body;
      var FileSize = Body.size || Body.length || 0;
      var fileInfo = {
        Index: index,
        TaskId: ''
      }; // ?????????????????????

      TotalSize += FileSize; // ????????????????????????

      if (self.options.EnableTracker) {
        var accelerate = self.options.UseAccelerate || typeof self.options.Domain === 'string' && self.options.Domain.includes('accelerate.');
        fileParams.tracker = new Tracker({
          bucket: fileParams.Bucket,
          region: fileParams.Region,
          apiName: 'uploadFiles',
          fileKey: fileParams.Key,
          fileSize: FileSize,
          accelerate: accelerate,
          deepTracker: self.options.DeepTracker,
          customId: self.options.CustomId,
          delay: self.options.TrackerDelay
        });
      } // ?????? option????????????????????????


      util.each(fileParams, function (v, k) {
        if (_typeof(v) !== 'object' && typeof v !== 'function') {
          fileInfo[k] = v;
        }
      }); // ?????????????????? TaskReady

      var _onTaskReady = fileParams.onTaskReady;

      var onTaskReady = function onTaskReady(tid) {
        fileInfo.TaskId = tid;
        _onTaskReady && _onTaskReady(tid);
      };

      fileParams.onTaskReady = onTaskReady; // ????????????????????????

      var PreAddSize = 0;
      var _onProgress = fileParams.onProgress;

      var onProgress = function onProgress(info) {
        TotalFinish = TotalFinish - PreAddSize + info.loaded;
        PreAddSize = info.loaded;
        _onProgress && _onProgress(info);
        onTotalProgress({
          loaded: TotalFinish,
          total: TotalSize
        });
      };

      fileParams.onProgress = onProgress; // ??????????????????

      var api = FileSize > SliceSize ? 'sliceUploadFile' : 'putObject'; // ????????????????????????

      var _onFileFinish = fileParams.onFileFinish;

      var onFileFinish = function onFileFinish(err, data) {
        // ??????????????????????????????
        fileParams.tracker && fileParams.tracker.formatResult(err, data);
        _onFileFinish && _onFileFinish(err, data);
        onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);
      };

      taskList.push({
        api: api,
        params: fileParams,
        callback: onFileFinish
      });
    })();
  });

  self._addTasks(taskList);
} // ??????????????????


function sliceCopyFile(params, callback) {
  var ep = new EventProxy();
  var self = this;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var CopySource = params.CopySource;
  var m = util.getSourceParams.call(this, CopySource);

  if (!m) {
    callback(util.error(new Error('CopySource format error')));
    return;
  }

  var SourceBucket = m.Bucket;
  var SourceRegion = m.Region;
  var SourceKey = decodeURIComponent(m.Key);
  var CopySliceSize = params.CopySliceSize === undefined ? self.options.CopySliceSize : params.CopySliceSize;
  CopySliceSize = Math.max(0, CopySliceSize);
  var ChunkSize = params.CopyChunkSize || this.options.CopyChunkSize;
  var ChunkParallel = this.options.CopyChunkParallelLimit;
  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
  var ChunkCount = 0;
  var FinishSize = 0;
  var FileSize;
  var onProgress;
  var SourceResHeaders = {};
  var SourceHeaders = {};
  var TargetHeader = {}; // ??????????????????????????? multipartComplete ??????

  ep.on('copy_slice_complete', function (UploadData) {
    var metaHeaders = {};
    util.each(params.Headers, function (val, k) {
      if (k.toLowerCase().indexOf('x-cos-meta-') === 0) metaHeaders[k] = val;
    });
    var Parts = util.map(UploadData.PartList, function (item) {
      return {
        PartNumber: item.PartNumber,
        ETag: item.ETag
      };
    }); // ?????????????????????????????????

    Async.retry(ChunkRetryTimes, function (tryCallback) {
      self.multipartComplete({
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadData.UploadId,
        Parts: Parts,
        calledBySdk: 'sliceCopyFile'
      }, tryCallback);
    }, function (err, data) {
      session.removeUsing(UploadData.UploadId); // ?????? UploadId ??????????????????????????????????????????????????????????????????????????? UploadId ????????????

      if (err) {
        onProgress(null, true);
        return callback(err);
      }

      session.removeUploadId(UploadData.UploadId);
      onProgress({
        loaded: FileSize,
        total: FileSize
      }, true);
      callback(null, data);
    });
  });
  ep.on('get_copy_data_finish', function (UploadData) {
    // ?????? UploadId ??????
    var uuid = session.getCopyFileId(CopySource, SourceResHeaders, ChunkSize, Bucket, Key);
    uuid && session.saveUploadId(uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // ?????? UploadId

    session.setUsing(UploadData.UploadId); // ?????? UploadId ???????????????

    var needCopySlices = util.filter(UploadData.PartList, function (SliceItem) {
      if (SliceItem['Uploaded']) {
        FinishSize += SliceItem['PartNumber'] >= ChunkCount ? FileSize % ChunkSize || ChunkSize : ChunkSize;
      }

      return !SliceItem['Uploaded'];
    });
    Async.eachLimit(needCopySlices, ChunkParallel, function (SliceItem, asyncCallback) {
      var PartNumber = SliceItem.PartNumber;
      var CopySourceRange = SliceItem.CopySourceRange;
      var currentSize = SliceItem.end - SliceItem.start;
      Async.retry(ChunkRetryTimes, function (tryCallback) {
        copySliceItem.call(self, {
          Bucket: Bucket,
          Region: Region,
          Key: Key,
          CopySource: CopySource,
          UploadId: UploadData.UploadId,
          PartNumber: PartNumber,
          CopySourceRange: CopySourceRange
        }, tryCallback);
      }, function (err, data) {
        if (err) return asyncCallback(err);
        FinishSize += currentSize;
        onProgress({
          loaded: FinishSize,
          total: FileSize
        });
        SliceItem.ETag = data.ETag;
        asyncCallback(err || null, data);
      });
    }, function (err) {
      if (err) {
        session.removeUsing(UploadData.UploadId); // ?????? UploadId ??????????????????????????????????????????????????????????????????????????? UploadId ????????????

        onProgress(null, true);
        return callback(err);
      }

      ep.emit('copy_slice_complete', UploadData);
    });
  });
  ep.on('get_chunk_size_finish', function () {
    var createNewUploadId = function createNewUploadId() {
      self.multipartInit({
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        Headers: TargetHeader
      }, function (err, data) {
        if (err) return callback(err);
        params.UploadId = data.UploadId;
        ep.emit('get_copy_data_finish', {
          UploadId: params.UploadId,
          PartList: params.PartList
        });
      });
    }; // ????????????????????? UploadId


    var uuid = session.getCopyFileId(CopySource, SourceResHeaders, ChunkSize, Bucket, Key);
    var LocalUploadIdList = session.getUploadIdList(uuid);
    if (!uuid || !LocalUploadIdList) return createNewUploadId();

    var next = function next(index) {
      // ??????????????????????????? UploadId?????????????????????????????????
      if (index >= LocalUploadIdList.length) return createNewUploadId();
      var UploadId = LocalUploadIdList[index]; // ??????????????????????????????

      if (session.using[UploadId]) return next(index + 1); // ?????? UploadId ??????????????????

      wholeMultipartListPart.call(self, {
        Bucket: Bucket,
        Region: Region,
        Key: Key,
        UploadId: UploadId
      }, function (err, PartListData) {
        if (err) {
          // ?????? UploadId ?????????????????????????????????
          session.removeUploadId(UploadId);
          next(index + 1);
        } else {
          // ?????????????????? UploadId ???????????????????????????
          if (session.using[UploadId]) return next(index + 1); // ???????????? UploadId

          var finishETagMap = {};
          var offset = 0;
          util.each(PartListData.PartList, function (PartItem) {
            var size = parseInt(PartItem.Size);
            var end = offset + size - 1;
            finishETagMap[PartItem.PartNumber + '|' + offset + '|' + end] = PartItem.ETag;
            offset += size;
          });
          util.each(params.PartList, function (PartItem) {
            var ETag = finishETagMap[PartItem.PartNumber + '|' + PartItem.start + '|' + PartItem.end];

            if (ETag) {
              PartItem.ETag = ETag;
              PartItem.Uploaded = true;
            }
          });
          ep.emit('get_copy_data_finish', {
            UploadId: UploadId,
            PartList: params.PartList
          });
        }
      });
    };

    next(0);
  });
  ep.on('get_file_size_finish', function () {
    // ??????????????????
    (function () {
      var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
      var AutoChunkSize = 1024 * 1024;

      for (var i = 0; i < SIZE.length; i++) {
        AutoChunkSize = SIZE[i] * 1024 * 1024;
        if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
      }

      params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
      ChunkCount = Math.ceil(FileSize / ChunkSize);
      var list = [];

      for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {
        var start = (partNumber - 1) * ChunkSize;
        var end = partNumber * ChunkSize < FileSize ? partNumber * ChunkSize - 1 : FileSize - 1;
        var item = {
          PartNumber: partNumber,
          start: start,
          end: end,
          CopySourceRange: "bytes=" + start + "-" + end
        };
        list.push(item);
      }

      params.PartList = list;
    })();

    if (params.Headers['x-cos-metadata-directive'] === 'Replaced') {
      TargetHeader = params.Headers;
    } else {
      TargetHeader = SourceHeaders;
    }

    TargetHeader['x-cos-storage-class'] = params.Headers['x-cos-storage-class'] || SourceHeaders['x-cos-storage-class'];
    TargetHeader = util.clearKey(TargetHeader);
    /**
     * ?????????????????????????????????????????????????????????????????? Copy
     */

    if (SourceHeaders['x-cos-storage-class'] === 'ARCHIVE' || SourceHeaders['x-cos-storage-class'] === 'DEEP_ARCHIVE') {
      var restoreHeader = SourceHeaders['x-cos-restore'];

      if (!restoreHeader || restoreHeader === 'ongoing-request="true"') {
        callback(util.error(new Error('Unrestored archive object is not allowed to be copied')));
        return;
      }
    }
    /**
     * ???????????????????????????????????? multipartInit ??????
     * ???????????????????????? putObjectCopy ????????????
     */


    delete TargetHeader['x-cos-copy-source'];
    delete TargetHeader['x-cos-metadata-directive'];
    delete TargetHeader['x-cos-copy-source-If-Modified-Since'];
    delete TargetHeader['x-cos-copy-source-If-Unmodified-Since'];
    delete TargetHeader['x-cos-copy-source-If-Match'];
    delete TargetHeader['x-cos-copy-source-If-None-Match'];
    ep.emit('get_chunk_size_finish');
  }); // ????????????????????????????????????

  self.headObject({
    Bucket: SourceBucket,
    Region: SourceRegion,
    Key: SourceKey
  }, function (err, data) {
    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        callback(util.error(err, {
          ErrorStatus: SourceKey + ' Not Exist'
        }));
      } else {
        callback(err);
      }

      return;
    }

    FileSize = params.FileSize = data.headers['content-length'];

    if (FileSize === undefined || !FileSize) {
      callback(util.error(new Error('get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.??? ??????Content-Length???????????????CORS ExposeHeader???????????????Content-Length?????????????????????https://cloud.tencent.com/document/product/436/13318 ???')));
      return;
    }

    onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress); // ????????????

    if (FileSize <= CopySliceSize) {
      if (!params.Headers['x-cos-metadata-directive']) {
        params.Headers['x-cos-metadata-directive'] = 'Copy';
      }

      self.putObjectCopy(params, function (err, data) {
        if (err) {
          onProgress(null, true);
          return callback(err);
        }

        onProgress({
          loaded: FileSize,
          total: FileSize
        }, true);
        callback(err, data);
      });
    } else {
      var resHeaders = data.headers;
      SourceResHeaders = resHeaders;
      SourceHeaders = {
        'Cache-Control': resHeaders['cache-control'],
        'Content-Disposition': resHeaders['content-disposition'],
        'Content-Encoding': resHeaders['content-encoding'],
        'Content-Type': resHeaders['content-type'],
        'Expires': resHeaders['expires'],
        'x-cos-storage-class': resHeaders['x-cos-storage-class']
      };
      util.each(resHeaders, function (v, k) {
        var metaPrefix = 'x-cos-meta-';

        if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {
          SourceHeaders[k] = v;
        }
      });
      ep.emit('get_file_size_finish');
    }
  });
} // ??????????????????


function copySliceItem(params, callback) {
  var TaskId = params.TaskId;
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var CopySource = params.CopySource;
  var UploadId = params.UploadId;
  var PartNumber = params.PartNumber * 1;
  var CopySourceRange = params.CopySourceRange;
  var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
  var self = this;
  Async.retry(ChunkRetryTimes, function (tryCallback) {
    self.uploadPartCopy({
      TaskId: TaskId,
      Bucket: Bucket,
      Region: Region,
      Key: Key,
      CopySource: CopySource,
      UploadId: UploadId,
      PartNumber: PartNumber,
      CopySourceRange: CopySourceRange
    }, function (err, data) {
      tryCallback(err || null, data);
    });
  }, function (err, data) {
    return callback(err, data);
  });
}

var API_MAP = {
  sliceUploadFile: sliceUploadFile,
  abortUploadTask: abortUploadTask,
  uploadFile: uploadFile,
  uploadFiles: uploadFiles,
  sliceCopyFile: sliceCopyFile
};

module.exports.init = function (COS, task) {
  task.transferToTaskMethod(API_MAP, 'sliceUploadFile');
  util.each(API_MAP, function (fn, apiName) {
    COS.prototype[apiName] = util.apiWrapper(apiName, fn);
  });
};

/***/ }),

/***/ "./src/async.js":
/*!**********************!*\
  !*** ./src/async.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var eachLimit = function eachLimit(arr, limit, iterator, callback) {
  callback = callback || function () {};

  if (!arr.length || limit <= 0) {
    return callback();
  }

  var completed = 0;
  var started = 0;
  var running = 0;

  (function replenish() {
    if (completed >= arr.length) {
      return callback();
    }

    while (running < limit && started < arr.length) {
      started += 1;
      running += 1;
      iterator(arr[started - 1], function (err) {
        if (err) {
          callback(err);

          callback = function callback() {};
        } else {
          completed += 1;
          running -= 1;

          if (completed >= arr.length) {
            callback();
          } else {
            replenish();
          }
        }
      });
    }
  })();
};

var retry = function retry(times, iterator, callback) {
  var next = function next(index) {
    iterator(function (err, data) {
      if (err && index < times) {
        next(index + 1);
      } else {
        callback(err, data);
      }
    });
  };

  if (times < 1) {
    callback();
  } else {
    next(1);
  }
};

var async = {
  eachLimit: eachLimit,
  retry: retry
};
module.exports = async;

/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var REQUEST = __webpack_require__(/*! ../lib/request */ "./lib/request.js");

var util = __webpack_require__(/*! ./util */ "./src/util.js"); // Bucket ??????

/**
 * ??????????????? bucket ??????
 * @param  {Object}  params         ?????????????????????????????????????????????
 * ???????????????
 * @param  {Function}  callback     ?????????????????????
 */


function getService(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  var protocol = this.options.Protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
  var domain = this.options.ServiceDomain;
  var appId = params.AppId || this.options.appId;
  var region = params.Region;

  if (domain) {
    domain = domain.replace(/\{\{AppId\}\}/ig, appId || '').replace(/\{\{Region\}\}/ig, region || '').replace(/\{\{.*?\}\}/ig, '');

    if (!/^[a-zA-Z]+:\/\//.test(domain)) {
      domain = protocol + '//' + domain;
    }

    if (domain.slice(-1) === '/') {
      domain = domain.slice(0, -1);
    }
  } else if (region) {
    domain = protocol + '//cos.' + region + '.myqcloud.com';
  } else {
    domain = protocol + '//service.cos.myqcloud.com';
  }

  var SignHost = '';
  var standardHost = region ? 'cos.' + region + '.myqcloud.com' : 'service.cos.myqcloud.com';
  var urlHost = domain.replace(/^https?:\/\/([^/]+)(\/.*)?$/, '$1');
  if (standardHost === urlHost) SignHost = standardHost;
  submitRequest.call(this, {
    Action: 'name/cos:GetService',
    url: domain,
    method: 'GET',
    headers: params.Headers,
    SignHost: SignHost
  }, function (err, data) {
    if (err) return callback(err);
    var buckets = data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Buckets && data.ListAllMyBucketsResult.Buckets.Bucket || [];
    buckets = util.isArray(buckets) ? buckets : [buckets];
    var owner = data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Owner || {};
    callback(null, {
      Buckets: buckets,
      Owner: owner,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket???????????????????????????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 *     @param  {String}  params.ACL                 ?????????????????????????????????????????????private???public-read???????????????private????????????
 *     @param  {String}  params.GrantRead           ???????????????????????????????????????x-cos-grant-read: uin=" ",uin=" "????????????
 *     @param  {String}  params.GrantWrite          ???????????????????????????????????????x-cos-grant-write: uin=" ",uin=" "????????????
 *     @param  {String}  params.GrantFullControl    ???????????????????????????????????????x-cos-grant-full-control: uin=" ",uin=" "????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ???????????????
 *     @return  {String}  data.Location             ????????????
 */


function putBucket(params, callback) {
  var self = this;
  var xml = '';

  if (params['BucketAZConfig']) {
    var CreateBucketConfiguration = {
      BucketAZConfig: params.BucketAZConfig
    };
    xml = util.json2xml({
      CreateBucketConfiguration: CreateBucketConfiguration
    });
  }

  submitRequest.call(this, {
    Action: 'name/cos:PutBucket',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    body: xml
  }, function (err, data) {
    if (err) return callback(err);
    var url = getUrl({
      protocol: self.options.Protocol,
      domain: self.options.Domain,
      bucket: params.Bucket,
      region: params.Region,
      isLocation: true
    });
    callback(null, {
      Location: url,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????????????????????Bucket????????????????????????
 * @param  {Object}  params                     ?????????????????????
 *     @param  {String}  params.Bucket          Bucket???????????????
 *     @param  {String}  params.Region          ?????????????????????
 * @param  {Function}  callback                 ?????????????????????
 * @return  {Object}  err                       ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                      ???????????????
 *     @return  {Boolean}  data.BucketExist     Bucket????????????
 *     @return  {Boolean}  data.BucketAuth      ????????? Bucket ???????????????
 */


function headBucket(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:HeadBucket',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    method: 'HEAD'
  }, callback);
}
/**
 * ?????? Bucket ?????? object ??????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 *     @param  {String}  params.Prefix              ??????????????????????????????????????????????????????????????????
 *     @param  {String}  params.Delimiter           ????????????????????????????????????Prefix?????????Prefix???delimiter?????????????????????????????????????????????
 *     @param  {String}  params.Marker              ?????????UTF-8???????????????????????????????????????????????????marker??????????????????
 *     @param  {String}  params.MaxKeys             ??????????????????????????????????????????1000????????????
 *     @param  {String}  params.EncodingType        ??????????????????????????????????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ???????????????
 *     @return  {Object}  data.ListBucketResult     ????????? object ????????????
 */


function getBucket(params, callback) {
  var reqParams = {};
  reqParams['prefix'] = params['Prefix'] || '';
  reqParams['delimiter'] = params['Delimiter'];
  reqParams['marker'] = params['Marker'];
  reqParams['max-keys'] = params['MaxKeys'];
  reqParams['encoding-type'] = params['EncodingType'];
  submitRequest.call(this, {
    Action: 'name/cos:GetBucket',
    ResourceKey: reqParams['prefix'],
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    qs: reqParams
  }, function (err, data) {
    if (err) return callback(err);
    var ListBucketResult = data.ListBucketResult || {};
    var Contents = ListBucketResult.Contents || [];
    var CommonPrefixes = ListBucketResult.CommonPrefixes || [];
    Contents = util.isArray(Contents) ? Contents : [Contents];
    CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];
    var result = util.clone(ListBucketResult);
    util.extend(result, {
      Contents: Contents,
      CommonPrefixes: CommonPrefixes,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ?????? Bucket
 * @param  {Object}  params                 ?????????????????????
 *     @param  {String}  params.Bucket      Bucket???????????????
 *     @param  {String}  params.Region      ?????????????????????
 * @param  {Function}  callback             ?????????????????????
 * @return  {Object}  err                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  ???????????????
 *     @return  {String}  data.Location     ????????????
 */


function deleteBucket(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucket',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    method: 'DELETE'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 *     @param  {String}  params.ACL                 ?????????????????????????????????????????????private???public-read???????????????private????????????
 *     @param  {String}  params.GrantRead           ???????????????????????????????????????x-cos-grant-read: uin=" ",uin=" "????????????
 *     @param  {String}  params.GrantWrite          ???????????????????????????????????????x-cos-grant-write: uin=" ",uin=" "????????????
 *     @param  {String}  params.GrantFullControl    ???????????????????????????????????????x-cos-grant-full-control: uin=" ",uin=" "????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ???????????????
 */


function putBucketAcl(params, callback) {
  var headers = params.Headers;
  var xml = '';

  if (params['AccessControlPolicy']) {
    var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
    var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
    Grants = util.isArray(Grants) ? Grants : [Grants];
    delete AccessControlPolicy.Grant;
    delete AccessControlPolicy.Grants;
    AccessControlPolicy.AccessControlList = {
      Grant: Grants
    };
    xml = util.json2xml({
      AccessControlPolicy: AccessControlPolicy
    });
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  } // Grant Header ??????


  util.each(headers, function (val, key) {
    if (key.indexOf('x-cos-grant-') === 0) {
      headers[key] = uniqGrant(headers[key]);
    }
  });
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketACL',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: headers,
    action: 'acl',
    body: xml
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ???????????????
 *     @return  {Object}  data.AccessControlPolicy  ??????????????????
 */


function getBucketAcl(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketACL',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'acl'
  }, function (err, data) {
    if (err) return callback(err);
    var AccessControlPolicy = data.AccessControlPolicy || {};
    var Owner = AccessControlPolicy.Owner || {};
    var Grant = AccessControlPolicy.AccessControlList.Grant || [];
    Grant = util.isArray(Grant) ? Grant : [Grant];
    var result = decodeAcl(AccessControlPolicy);

    if (data.headers && data.headers['x-cos-acl']) {
      result.ACL = data.headers['x-cos-acl'];
    }

    result = util.extend(result, {
      Owner: Owner,
      Grants: Grant,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params                             ?????????????????????
 *     @param  {String}  params.Bucket                  Bucket???????????????
 *     @param  {String}  params.Region                  ?????????????????????
 *     @param  {Object}  params.CORSConfiguration       ??????????????????????????????
 * @param  {Array}  params.CORSConfiguration.CORSRules  ?????????????????????
 * @param  {Function}  callback                         ?????????????????????
 * @return  {Object}  err                               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              ???????????????
 */


function putBucketCors(params, callback) {
  var CORSConfiguration = params['CORSConfiguration'] || {};
  var CORSRules = CORSConfiguration['CORSRules'] || params['CORSRules'] || [];
  CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);
  util.each(CORSRules, function (rule) {
    util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
      var sKey = key + 's';
      var val = rule[sKey] || rule[key] || [];
      delete rule[sKey];
      rule[key] = util.isArray(val) ? val : [val];
    });
  });
  var Conf = {
    CORSRule: CORSRules
  };
  if (params.ResponseVary) Conf.ResponseVary = params.ResponseVary;
  var xml = util.json2xml({
    CORSConfiguration: Conf
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketCORS',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'cors',
    headers: headers
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ???????????????
 *     @return  {Object}  data.CORSRules            Bucket???????????????
 */


function getBucketCors(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketCORS',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'cors'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchCORSConfiguration') {
        var result = {
          CORSRules: [],
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var CORSConfiguration = data.CORSConfiguration || {};
    var CORSRules = CORSConfiguration.CORSRules || CORSConfiguration.CORSRule || [];
    CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);
    var ResponseVary = CORSConfiguration.ResponseVary;
    util.each(CORSRules, function (rule) {
      util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key) {
        var sKey = key + 's';
        var val = rule[sKey] || rule[key] || [];
        delete rule[key];
        rule[sKey] = util.isArray(val) ? val : [val];
      });
    });
    callback(null, {
      CORSRules: CORSRules,
      ResponseVary: ResponseVary,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params                 ?????????????????????
 *     @param  {String}  params.Bucket      Bucket???????????????
 *     @param  {String}  params.Region      ?????????????????????
 * @param  {Function}  callback             ?????????????????????
 * @return  {Object}  err                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  ???????????????
 */


function deleteBucketCors(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketCORS',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'cors'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode || err.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????????????????????????? LocationConstraint
 */


function getBucketLocation(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketLocation',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'location'
  }, callback);
}

function putBucketPolicy(params, callback) {
  var Policy = params['Policy'];

  try {
    if (typeof Policy === 'string') Policy = JSON.parse(Policy);
  } catch (e) {}

  if (!Policy || typeof Policy === 'string') return callback(util.error(new Error('Policy format error')));
  var PolicyStr = JSON.stringify(Policy);
  if (!Policy.version) Policy.version = '2.0';
  var headers = params.Headers;
  headers['Content-Type'] = 'application/json';
  headers['Content-MD5'] = util.binaryBase64(util.md5(PolicyStr));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketPolicy',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    action: 'policy',
    body: PolicyStr,
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketPolicy(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketPolicy',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'policy',
    rawBody: true
  }, function (err, data) {
    if (err) {
      if (err.statusCode && err.statusCode === 403) {
        return callback(util.error(err, {
          ErrorStatus: 'Access Denied'
        }));
      }

      if (err.statusCode && err.statusCode === 405) {
        return callback(util.error(err, {
          ErrorStatus: 'Method Not Allowed'
        }));
      }

      if (err.statusCode && err.statusCode === 404) {
        return callback(util.error(err, {
          ErrorStatus: 'Policy Not Found'
        }));
      }

      return callback(err);
    }

    var Policy = {};

    try {
      Policy = JSON.parse(data.body);
    } catch (e) {}

    callback(null, {
      Policy: Policy,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params                 ?????????????????????
 *     @param  {String}  params.Bucket      Bucket???????????????
 *     @param  {String}  params.Region      ?????????????????????
 * @param  {Function}  callback             ?????????????????????
 * @return  {Object}  err                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  ???????????????
 */


function deleteBucketPolicy(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketPolicy',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'policy'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode || err.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 *     @param  {Array}   params.TagSet  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function putBucketTagging(params, callback) {
  var Tagging = params['Tagging'] || {};
  var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
  Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
  var xml = util.json2xml({
    Tagging: {
      TagSet: {
        Tag: Tags
      }
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketTagging',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'tagging',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ???????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketTagging(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketTagging',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'tagging'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
        var result = {
          Tags: [],
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var Tags = [];

    try {
      Tags = data.Tagging.TagSet.Tag || [];
    } catch (e) {}

    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
    callback(null, {
      Tags: Tags,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??? ????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ???????????????
 */


function deleteBucketTagging(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketTagging',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'tagging'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function putBucketLifecycle(params, callback) {
  var LifecycleConfiguration = params['LifecycleConfiguration'] || {};
  var Rules = LifecycleConfiguration.Rules || params.Rules || [];
  Rules = util.clone(Rules);
  var xml = util.json2xml({
    LifecycleConfiguration: {
      Rule: Rules
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketLifecycle',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'lifecycle',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function getBucketLifecycle(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketLifecycle',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'lifecycle'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchLifecycleConfiguration') {
        var result = {
          Rules: [],
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var Rules = [];

    try {
      Rules = data.LifecycleConfiguration.Rule || [];
    } catch (e) {}

    Rules = util.clone(util.isArray(Rules) ? Rules : [Rules]);
    callback(null, {
      Rules: Rules,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function deleteBucketLifecycle(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketLifecycle',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'lifecycle'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function putBucketVersioning(params, callback) {
  if (!params['VersioningConfiguration']) {
    callback(util.error(new Error('missing param VersioningConfiguration')));
    return;
  }

  var VersioningConfiguration = params['VersioningConfiguration'] || {};
  var xml = util.json2xml({
    VersioningConfiguration: VersioningConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketVersioning',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'versioning',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function getBucketVersioning(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketVersioning',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'versioning'
  }, function (err, data) {
    if (!err) {
      !data.VersioningConfiguration && (data.VersioningConfiguration = {});
    }

    callback(err, data);
  });
}

function putBucketReplication(params, callback) {
  var ReplicationConfiguration = util.clone(params.ReplicationConfiguration);
  var xml = util.json2xml({
    ReplicationConfiguration: ReplicationConfiguration
  });
  xml = xml.replace(/<(\/?)Rules>/ig, '<$1Rule>');
  xml = xml.replace(/<(\/?)Tags>/ig, '<$1Tag>');
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketReplication',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'replication',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function getBucketReplication(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketReplication',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'replication'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'ReplicationConfigurationnotFoundError')) {
        var result = {
          ReplicationConfiguration: {
            Rules: []
          },
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    !data.ReplicationConfiguration && (data.ReplicationConfiguration = {});

    if (data.ReplicationConfiguration.Rule) {
      data.ReplicationConfiguration.Rules = util.makeArray(data.ReplicationConfiguration.Rule);
      delete data.ReplicationConfiguration.Rule;
    }

    callback(err, data);
  });
}

function deleteBucketReplication(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketReplication',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'replication'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ????????????????????????
 * @param  {Object}  params                                                 ?????????????????????
 *     @param  {String}  params.Bucket                                      Bucket???????????????
 *     @param  {String}  params.Region                                      ?????????????????????
 *     @param  {Object}  params.WebsiteConfiguration                        ?????????????????????
 *         @param  {Object}   WebsiteConfiguration.IndexDocument            ?????????????????????
 *         @param  {Object}   WebsiteConfiguration.ErrorDocument            ????????????????????????
 *         @param  {Object}   WebsiteConfiguration.RedirectAllRequestsTo    ?????????????????????????????????
 *         @param  {Array}   params.RoutingRules                            ???????????????????????????
 * @param  {Function}  callback                                             ?????????????????????
 * @return  {Object}  err                                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  ????????????
 */


function putBucketWebsite(params, callback) {
  if (!params['WebsiteConfiguration']) {
    callback(util.error(new Error('missing param WebsiteConfiguration')));
    return;
  }

  var WebsiteConfiguration = util.clone(params['WebsiteConfiguration'] || {});
  var RoutingRules = WebsiteConfiguration['RoutingRules'] || WebsiteConfiguration['RoutingRule'] || [];
  RoutingRules = util.isArray(RoutingRules) ? RoutingRules : [RoutingRules];
  delete WebsiteConfiguration.RoutingRule;
  delete WebsiteConfiguration.RoutingRules;
  if (RoutingRules.length) WebsiteConfiguration.RoutingRules = {
    RoutingRule: RoutingRules
  };
  var xml = util.json2xml({
    WebsiteConfiguration: WebsiteConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketWebsite',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'website',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ???????????????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketWebsite(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketWebsite',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    action: 'website'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error.Code === 'NoSuchWebsiteConfiguration') {
        var result = {
          WebsiteConfiguration: {},
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var WebsiteConfiguration = data.WebsiteConfiguration || {};

    if (WebsiteConfiguration['RoutingRules']) {
      var RoutingRules = util.clone(WebsiteConfiguration['RoutingRules'].RoutingRule || []);
      RoutingRules = util.makeArray(RoutingRules);
      WebsiteConfiguration.RoutingRules = RoutingRules;
    }

    callback(null, {
      WebsiteConfiguration: WebsiteConfiguration,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function deleteBucketWebsite(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketWebsite',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'website'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ????????????????????????????????????
 * @param  {Object}  params                                                 ?????????????????????
 *     @param  {String}  params.Bucket                                      Bucket???????????????
 *     @param  {String}  params.Region                                      ?????????????????????
 *     @param  {Object}  params.RefererConfiguration                        ?????????????????????
 *         @param  {String}   RefererConfiguration.Status                   ????????????????????????????????????Enabled???Disabled
 *         @param  {String}   RefererConfiguration.RefererType              ??????????????????????????????Black-List???White-List?????????
 *         @param  {Array}   RefererConfiguration.DomianList.Domain         ?????????????????????
 *         @param  {String}   RefererConfiguration.EmptyReferConfiguration  ????????????
 * @param  {Function}  callback                                             ?????????????????????
 * @return  {Object}  err                                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  ????????????
 */


function putBucketReferer(params, callback) {
  if (!params['RefererConfiguration']) {
    callback(util.error(new Error('missing param RefererConfiguration')));
    return;
  }

  var RefererConfiguration = util.clone(params['RefererConfiguration'] || {});
  var DomainList = RefererConfiguration['DomainList'] || {};
  var Domains = DomainList['Domains'] || DomainList['Domain'] || [];
  Domains = util.isArray(Domains) ? Domains : [Domains];
  if (Domains.length) RefererConfiguration.DomainList = {
    Domain: Domains
  };
  var xml = util.json2xml({
    RefererConfiguration: RefererConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketReferer',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'referer',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ????????????????????????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketReferer(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketReferer',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    action: 'referer'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error.Code === 'NoSuchRefererConfiguration') {
        var result = {
          WebsiteConfiguration: {},
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var RefererConfiguration = data.RefererConfiguration || {};

    if (RefererConfiguration['DomainList']) {
      var Domains = util.makeArray(RefererConfiguration['DomainList'].Domain || []);
      RefererConfiguration.DomainList = {
        Domains: Domains
      };
    }

    callback(null, {
      RefererConfiguration: RefererConfiguration,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ???????????????
 * @param  {Object}  params                                                 ?????????????????????
 *     @param  {String}  params.Bucket                                      Bucket???????????????
 *     @param  {String}  params.Region                                      ?????????????????????
 * @param  {Function}  callback                                             ?????????????????????
 * @return  {Object}  err                                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  ????????????
 */


function putBucketDomain(params, callback) {
  var DomainConfiguration = params['DomainConfiguration'] || {};
  var DomainRule = DomainConfiguration.DomainRule || params.DomainRule || [];
  DomainRule = util.clone(DomainRule);
  var xml = util.json2xml({
    DomainConfiguration: {
      DomainRule: DomainRule
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketDomain',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'domain',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ??????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketDomain(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketDomain',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'domain'
  }, function (err, data) {
    if (err) return callback(err);
    var DomainRule = [];

    try {
      DomainRule = data.DomainConfiguration.DomainRule || [];
    } catch (e) {}

    DomainRule = util.clone(util.isArray(DomainRule) ? DomainRule : [DomainRule]);
    callback(null, {
      DomainRule: DomainRule,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ???????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function deleteBucketDomain(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketDomain',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'domain'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????
 * @param  {Object}  params                                                 ?????????????????????
 *     @param  {String}  params.Bucket                                      Bucket???????????????
 *     @param  {String}  params.Region                                      ?????????????????????
 * @param  {Function}  callback                                             ?????????????????????
 * @return  {Object}  err                                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  ????????????
 */


function putBucketOrigin(params, callback) {
  var OriginConfiguration = params['OriginConfiguration'] || {};
  var OriginRule = OriginConfiguration.OriginRule || params.OriginRule || [];
  OriginRule = util.clone(OriginRule);
  var xml = util.json2xml({
    OriginConfiguration: {
      OriginRule: OriginRule
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketOrigin',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'origin',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketOrigin(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketOrigin',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'origin'
  }, function (err, data) {
    if (err) return callback(err);
    var OriginRule = [];

    try {
      OriginRule = data.OriginConfiguration.OriginRule || [];
    } catch (e) {}

    OriginRule = util.clone(util.isArray(OriginRule) ? OriginRule : [OriginRule]);
    callback(null, {
      OriginRule: OriginRule,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function deleteBucketOrigin(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketOrigin',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'origin'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ???????????????
 * @param  {Object}  params                                                 ?????????????????????
 *     @param  {String}  params.Bucket                                      Bucket???????????????
 *     @param  {String}  params.Region                                      ?????????????????????
 *     @param  {(Object|String)}  params.BucketLoggingStatus                         ????????????????????????????????????????????????????????????????????????????????????????????????
 * @param  {Function}  callback                                             ?????????????????????
 * @return  {Object}  err                                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  ????????????
 */


function putBucketLogging(params, callback) {
  var xml = util.json2xml({
    BucketLoggingStatus: params['BucketLoggingStatus'] || ''
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketLogging',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'logging',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ???????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketLogging(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketLogging',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'logging'
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, {
      BucketLoggingStatus: data.BucketLoggingStatus,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ??????/?????? Bucket ???????????????
 * @param  {Object}  params                                                 ?????????????????????
 *     @param  {String}  params.Bucket                                      Bucket???????????????
 *     @param  {String}  params.Region                                      ?????????????????????
 *     @param  {String}  params.Id                                          ??????????????????????????????
 *     @param  {Object}  params.InventoryConfiguration                      ????????????????????????????????????
 * @param  {Function}  callback                                             ?????????????????????
 * @return  {Object}  err                                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  ????????????
 */


function putBucketInventory(params, callback) {
  var InventoryConfiguration = util.clone(params['InventoryConfiguration']);

  if (InventoryConfiguration.OptionalFields) {
    var Field = InventoryConfiguration.OptionalFields || [];
    InventoryConfiguration.OptionalFields = {
      Field: Field
    };
  }

  if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {
    var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;

    if (Object.keys(Encryption).indexOf('SSECOS') > -1) {
      Encryption['SSE-COS'] = Encryption['SSECOS'];
      delete Encryption['SSECOS'];
    }
  }

  var xml = util.json2xml({
    InventoryConfiguration: InventoryConfiguration
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketInventory',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'inventory',
    qs: {
      id: params['Id']
    },
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 *     @param  {String}  params.Id      ??????????????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function getBucketInventory(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketInventory',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'inventory',
    qs: {
      id: params['Id']
    }
  }, function (err, data) {
    if (err) return callback(err);
    var InventoryConfiguration = data['InventoryConfiguration'];

    if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {
      var Field = InventoryConfiguration.OptionalFields.Field;

      if (!util.isArray(Field)) {
        Field = [Field];
      }

      InventoryConfiguration.OptionalFields = Field;
    }

    if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {
      var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;

      if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {
        Encryption['SSECOS'] = Encryption['SSE-COS'];
        delete Encryption['SSE-COS'];
      }
    }

    callback(null, {
      InventoryConfiguration: InventoryConfiguration,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Bucket ?????????????????????
 * @param  {Object}  params                             ?????????????????????
 *     @param  {String}  params.Bucket                  Bucket???????????????
 *     @param  {String}  params.Region                  ?????????????????????
 *     @param  {String}  params.ContinuationToken       ??? COS ???????????? IsTruncated ??? true?????? NextContinuationToken ???????????????????????????????????????????????????????????? continuation-token ???????????????????????????????????????????????????????????????
 * @param  {Function}  callback                         ?????????????????????
 * @return  {Object}  err                               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              ????????????
 */


function listBucketInventory(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:ListBucketInventory',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'inventory',
    qs: {
      'continuation-token': params['ContinuationToken']
    }
  }, function (err, data) {
    if (err) return callback(err);
    var ListInventoryConfigurationResult = data['ListInventoryConfigurationResult'];
    var InventoryConfigurations = ListInventoryConfigurationResult.InventoryConfiguration || [];
    InventoryConfigurations = util.isArray(InventoryConfigurations) ? InventoryConfigurations : [InventoryConfigurations];
    delete ListInventoryConfigurationResult['InventoryConfiguration'];
    util.each(InventoryConfigurations, function (InventoryConfiguration) {
      if (InventoryConfiguration && InventoryConfiguration.OptionalFields && InventoryConfiguration.OptionalFields.Field) {
        var Field = InventoryConfiguration.OptionalFields.Field;

        if (!util.isArray(Field)) {
          Field = [Field];
        }

        InventoryConfiguration.OptionalFields = Field;
      }

      if (InventoryConfiguration.Destination && InventoryConfiguration.Destination.COSBucketDestination && InventoryConfiguration.Destination.COSBucketDestination.Encryption) {
        var Encryption = InventoryConfiguration.Destination.COSBucketDestination.Encryption;

        if (Object.keys(Encryption).indexOf('SSE-COS') > -1) {
          Encryption['SSECOS'] = Encryption['SSE-COS'];
          delete Encryption['SSE-COS'];
        }
      }
    });
    ListInventoryConfigurationResult.InventoryConfigurations = InventoryConfigurations;
    util.extend(ListInventoryConfigurationResult, {
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, ListInventoryConfigurationResult);
  });
}
/**
 * ?????? Bucket ???????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 *     @param  {String}  params.Id      ??????????????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ????????????
 */


function deleteBucketInventory(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketInventory',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'inventory',
    qs: {
      id: params['Id']
    }
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/* ???????????? */


function putBucketAccelerate(params, callback) {
  if (!params['AccelerateConfiguration']) {
    callback(util.error(new Error('missing param AccelerateConfiguration')));
    return;
  }

  var configuration = {
    AccelerateConfiguration: params.AccelerateConfiguration || {}
  };
  var xml = util.json2xml(configuration);
  var headers = {};
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketAccelerate',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'accelerate',
    headers: headers
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function getBucketAccelerate(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketAccelerate',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    action: 'accelerate'
  }, function (err, data) {
    if (!err) {
      !data.AccelerateConfiguration && (data.AccelerateConfiguration = {});
    }

    callback(err, data);
  });
}

function putBucketEncryption(params, callback) {
  var conf = params.ServerSideEncryptionConfiguration || {};
  var Rules = conf.Rule || conf.Rules || [];
  var xml = util.json2xml({
    ServerSideEncryptionConfiguration: {
      Rule: Rules
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutBucketEncryption',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'encryption',
    headers: headers
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}

function getBucketEncryption(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketEncryption',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'encryption'
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.code === 'NoSuchEncryptionConfiguration') {
        var result = {
          EncryptionConfiguration: {
            Rules: []
          },
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var Rules = util.makeArray(data.EncryptionConfiguration && data.EncryptionConfiguration.Rule || []);
    data.EncryptionConfiguration = {
      Rules: Rules
    };
    callback(err, data);
  });
}

function deleteBucketEncryption(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteBucketReplication',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'encryption'
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
} // Object ??????

/**
 * ????????????Object???????????????Head????????????Get???????????????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 *     @param  {String}  params.Key                 ?????????????????????
 *     @param  {String}  params.IfModifiedSince     ???Object?????????????????????????????????????????????Object????????????????????????304????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ????????? object ?????????????????????????????? IfModifiedSince ????????????????????????????????????????????????NotModified ????????? true
 *     @return  {Boolean}  data.NotModified         ????????? IfModifiedSince ??????????????????????????? object????????? true
 */


function headObject(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:HeadObject',
    method: 'HEAD',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    VersionId: params.VersionId,
    headers: params.Headers
  }, function (err, data) {
    if (err) {
      var statusCode = err.statusCode;

      if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
        return callback(null, {
          NotModified: true,
          statusCode: statusCode
        });
      }

      return callback(err);
    }

    data.ETag = util.attr(data.headers, 'etag', '');
    callback(null, data);
  });
}

function listObjectVersions(params, callback) {
  var reqParams = {};
  reqParams['prefix'] = params['Prefix'] || '';
  reqParams['delimiter'] = params['Delimiter'];
  reqParams['key-marker'] = params['KeyMarker'];
  reqParams['version-id-marker'] = params['VersionIdMarker'];
  reqParams['max-keys'] = params['MaxKeys'];
  reqParams['encoding-type'] = params['EncodingType'];
  submitRequest.call(this, {
    Action: 'name/cos:GetBucketObjectVersions',
    ResourceKey: reqParams['prefix'],
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    qs: reqParams,
    action: 'versions'
  }, function (err, data) {
    if (err) return callback(err);
    var ListVersionsResult = data.ListVersionsResult || {};
    var DeleteMarkers = ListVersionsResult.DeleteMarker || [];
    DeleteMarkers = util.isArray(DeleteMarkers) ? DeleteMarkers : [DeleteMarkers];
    var Versions = ListVersionsResult.Version || [];
    Versions = util.isArray(Versions) ? Versions : [Versions];
    var result = util.clone(ListVersionsResult);
    delete result.DeleteMarker;
    delete result.Version;
    util.extend(result, {
      DeleteMarkers: DeleteMarkers,
      Versions: Versions,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ?????? object
 * @param  {Object}  params                                 ?????????????????????
 *     @param  {String}  params.Bucket                      Bucket???????????????
 *     @param  {String}  params.Region                      ?????????????????????
 *     @param  {String}  params.Key                         ?????????????????????
 *     @param  {WriteStream}  params.Output                 ???????????????????????????
 *     @param  {String}  params.IfModifiedSince             ???Object?????????????????????????????????????????????Object????????????????????????304????????????
 *     @param  {String}  params.IfUnmodifiedSince           ?????????????????????????????????????????????????????????????????????????????????????????? 412 (precondition failed)????????????
 *     @param  {String}  params.IfMatch                     ??? ETag ????????????????????????????????????????????????????????? 412 (precondition failed)????????????
 *     @param  {String}  params.IfNoneMatch                 ??? ETag ????????????????????????????????????????????????????????????304 (not modified)????????????
 *     @param  {String}  params.ResponseContentType         ???????????????????????? Content-Type ??????????????????
 *     @param  {String}  params.ResponseContentLanguage     ???????????????????????? Content-Language ??????????????????
 *     @param  {String}  params.ResponseExpires             ???????????????????????? Content-Expires ??????????????????
 *     @param  {String}  params.ResponseCacheControl        ???????????????????????? Cache-Control ??????????????????
 *     @param  {String}  params.ResponseContentDisposition  ???????????????????????? Content-Disposition ??????????????????
 *     @param  {String}  params.ResponseContentEncoding     ???????????????????????? Content-Encoding ??????????????????
 * @param  {Function}  callback                             ?????????????????????
 * @param  {Object}  err                                    ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @param  {Object}  data                                   ???????????? object ??????????????? body ??? headers
 */


function getObject(params, callback) {
  var reqParams = params.Query || {};
  var reqParamsStr = params.QueryString || '';
  var onProgress = util.throttleOnProgress.call(this, 0, params.onProgress);
  var tracker = params.tracker;
  tracker && tracker.setParams({
    signStartTime: new Date().getTime()
  });
  reqParams['response-content-type'] = params['ResponseContentType'];
  reqParams['response-content-language'] = params['ResponseContentLanguage'];
  reqParams['response-expires'] = params['ResponseExpires'];
  reqParams['response-cache-control'] = params['ResponseCacheControl'];
  reqParams['response-content-disposition'] = params['ResponseContentDisposition'];
  reqParams['response-content-encoding'] = params['ResponseContentEncoding']; // ??????????????????????????? output

  submitRequest.call(this, {
    Action: 'name/cos:GetObject',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    VersionId: params.VersionId,
    DataType: params.DataType,
    headers: params.Headers,
    qs: reqParams,
    qsStr: reqParamsStr,
    rawBody: true,
    onDownloadProgress: onProgress,
    tracker: tracker
  }, function (err, data) {
    onProgress(null, true);

    if (err) {
      var statusCode = err.statusCode;

      if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
        return callback(null, {
          NotModified: true
        });
      }

      return callback(err);
    }

    callback(null, {
      Body: data.body,
      ETag: util.attr(data.headers, 'etag', ''),
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? object
 * @param  {Object} params                                          ?????????????????????
 *     @param  {String}  params.Bucket                              Bucket???????????????
 *     @param  {String}  params.Region                              ?????????????????????
 *     @param  {String}  params.Key                                 ?????????????????????
 *     @param  {File || Blob || String}  params.Body                ???????????????????????????????????????
 *     @param  {String}  params.CacheControl                        RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentDisposition                  RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentEncoding                     RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentLength                       RFC 2616 ???????????? HTTP ???????????????????????????????????????
 *     @param  {String}  params.ContentType                         RFC 2616 ???????????????????????????MIME??????????????? Object ???????????????????????????
 *     @param  {String}  params.Expect                              ????????? Expect: 100-continue ????????????????????????????????????????????????????????????????????????
 *     @param  {String}  params.Expires                             RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ACL                                 ????????????????????????????????????????????????private | public-read????????????
 *     @param  {String}  params.GrantRead                           ???????????????????????????????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.GrantReadAcp                        ??????????????????????????????????????????????????????ACL????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.GrantWriteAcp                       ??????????????????????????????????????????????????????ACL????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.GrantFullControl                    ?????????????????????????????????????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.StorageClass                        ??????????????????????????????????????????STANDARD???STANDARD_IA???ARCHIVE???????????????STANDARD????????????
 *     @param  {String}  params.x-cos-meta-*                        ???????????????????????????????????????????????????????????????????????????????????????2KB????????????
 *     @param  {String}  params.ContentSha1                         RFC 3174 ???????????? 160-bit ?????? SHA-1 ????????????????????????
 *     @param  {String}  params.ServerSideEncryption                ????????????????????????????????????????????????????????????????????? x-cos-server-side-encryption: "AES256"????????????
 *     @param  {Function}  params.onProgress                        ????????????????????????
 * @param  {Function}  callback                                     ?????????????????????
 * @return  {Object}  err                                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                          ???????????? object ??????
 *     @return  {String}  data.ETag                                 ???????????????????????? ETag ???
 */


function putObject(params, callback) {
  var self = this;
  var FileSize = params.ContentLength;
  var onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress); // ???????????? Cache-Control???Content-Type??????????????????????????????????????????????????? Object ?????????

  var headers = params.Headers;
  if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
  if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';
  var needCalcMd5 = params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5 || self.options.UploadCheckContentMd5;
  var tracker = params.tracker;
  needCalcMd5 && tracker && tracker.setParams({
    md5StartTime: new Date().getTime()
  });
  util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
    if (md5) {
      tracker && tracker.setParams({
        md5EndTime: new Date().getTime()
      });
      if (self.options.UploadCheckContentMd5) headers['Content-MD5'] = util.binaryBase64(md5);
      if (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5) headers['x-cos-meta-md5'] = md5;
    }

    if (params.ContentLength !== undefined) headers['Content-Length'] = params.ContentLength;
    onProgress(null, true); // ?????????????????? uploading

    submitRequest.call(self, {
      Action: 'name/cos:PutObject',
      TaskId: params.TaskId,
      method: 'PUT',
      Bucket: params.Bucket,
      Region: params.Region,
      Key: params.Key,
      headers: params.Headers,
      qs: params.Query,
      body: params.Body,
      onProgress: onProgress,
      tracker: tracker
    }, function (err, data) {
      if (err) {
        onProgress(null, true);
        return callback(err);
      }

      onProgress({
        loaded: FileSize,
        total: FileSize
      }, true);
      var url = getUrl({
        ForcePathStyle: self.options.ForcePathStyle,
        protocol: self.options.Protocol,
        domain: self.options.Domain,
        bucket: params.Bucket,
        region: !self.options.UseAccelerate ? params.Region : 'accelerate',
        object: params.Key
      });
      url = url.substr(url.indexOf('://') + 3);
      data.Location = url;
      data.ETag = util.attr(data.headers, 'etag', '');
      callback(null, data);
    });
  }, params.onHashProgress);
}
/**
 * ?????? object
 * @param  {Object}  params                     ?????????????????????
 *     @param  {String}  params.Bucket          Bucket???????????????
 *     @param  {String}  params.Region          ?????????????????????
 *     @param  {String}  params.Key             object???????????????
 * @param  {Function}  callback                 ?????????????????????
 * @param  {Object}  err                        ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @param  {Object}  data                       ???????????????????????????????????????
 */


function deleteObject(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteObject',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    VersionId: params.VersionId,
    action: params.Recursive ? 'recursive' : ''
  }, function (err, data) {
    if (err) {
      var statusCode = err.statusCode;

      if (statusCode && statusCode === 404) {
        return callback(null, {
          BucketNotFound: true,
          statusCode: statusCode
        });
      } else {
        return callback(err);
      }
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? object ??? ????????????
 * @param  {Object}  params                         ?????????????????????
 *     @param  {String}  params.Bucket              Bucket???????????????
 *     @param  {String}  params.Region              ?????????????????????
 *     @param  {String}  params.Key                 object???????????????
 * @param  {Function}  callback                     ?????????????????????
 * @return  {Object}  err                           ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          ???????????????
 *     @return  {Object}  data.AccessControlPolicy  ????????????
 */


function getObjectAcl(params, callback) {
  var reqParams = {};

  if (params.VersionId) {
    reqParams.versionId = params.VersionId;
  }

  submitRequest.call(this, {
    Action: 'name/cos:GetObjectACL',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    qs: reqParams,
    action: 'acl'
  }, function (err, data) {
    if (err) return callback(err);
    var AccessControlPolicy = data.AccessControlPolicy || {};
    var Owner = AccessControlPolicy.Owner || {};
    var Grant = AccessControlPolicy.AccessControlList && AccessControlPolicy.AccessControlList.Grant || [];
    Grant = util.isArray(Grant) ? Grant : [Grant];
    var result = decodeAcl(AccessControlPolicy);
    delete result.GrantWrite;

    if (data.headers && data.headers['x-cos-acl']) {
      result.ACL = data.headers['x-cos-acl'];
    }

    result = util.extend(result, {
      Owner: Owner,
      Grants: Grant,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ?????? object ??? ????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 *     @param  {String}  params.Key     object???????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ???????????????
 */


function putObjectAcl(params, callback) {
  var headers = params.Headers;
  var xml = '';

  if (params['AccessControlPolicy']) {
    var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
    var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
    Grants = util.isArray(Grants) ? Grants : [Grants];
    delete AccessControlPolicy.Grant;
    delete AccessControlPolicy.Grants;
    AccessControlPolicy.AccessControlList = {
      Grant: Grants
    };
    xml = util.json2xml({
      AccessControlPolicy: AccessControlPolicy
    });
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  } // Grant Header ??????


  util.each(headers, function (val, key) {
    if (key.indexOf('x-cos-grant-') === 0) {
      headers[key] = uniqGrant(headers[key]);
    }
  });
  submitRequest.call(this, {
    Action: 'name/cos:PutObjectACL',
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    action: 'acl',
    headers: headers,
    body: xml
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * Options Object?????????????????????????????????????????????????????? OPTIONS ????????????????????????????????????????????????????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 *     @param  {String}  params.Key     object???????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              ???????????????
 */


function optionsObject(params, callback) {
  var headers = params.Headers;
  headers['Origin'] = params['Origin'];
  headers['Access-Control-Request-Method'] = params['AccessControlRequestMethod'];
  headers['Access-Control-Request-Headers'] = params['AccessControlRequestHeaders'];
  submitRequest.call(this, {
    Action: 'name/cos:OptionsObject',
    method: 'OPTIONS',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: headers
  }, function (err, data) {
    if (err) {
      if (err.statusCode && err.statusCode === 403) {
        return callback(null, {
          OptionsForbidden: true,
          statusCode: err.statusCode
        });
      }

      return callback(err);
    }

    var headers = data.headers || {};
    callback(null, {
      AccessControlAllowOrigin: headers['access-control-allow-origin'],
      AccessControlAllowMethods: headers['access-control-allow-methods'],
      AccessControlAllowHeaders: headers['access-control-allow-headers'],
      AccessControlExposeHeaders: headers['access-control-expose-headers'],
      AccessControlMaxAge: headers['access-control-max-age'],
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * @param  {Object}                                     ????????????
 *     @param  {String}  Bucket                         Bucket ??????
 *     @param  {String}  Region                         ????????????
 *     @param  {String}  Key                            ????????????
 *     @param  {String}  CopySource                     ?????????URL???????????????????????????versionid???????????????????????????
 *     @param  {String}  ACL                            ????????????????????????????????????????????????private???public-read????????????private???
 *     @param  {String}  GrantRead                      ??????????????????????????????????????? x-cos-grant-read: uin=" ",uin=" "????????????????????????????????????uin="RootAcountID/SubAccountID"????????????????????????????????????uin="RootAcountID"???
 *     @param  {String}  GrantWrite                     ??????????????????????????????????????? x-cos-grant-write: uin=" ",uin=" "????????????????????????????????????uin="RootAcountID/SubAccountID"????????????????????????????????????uin="RootAcountID"???
 *     @param  {String}  GrantFullControl               ??????????????????????????????????????? x-cos-grant-full-control: uin=" ",uin=" "????????????????????????????????????uin="RootAcountID/SubAccountID"????????????????????????????????????uin="RootAcountID"???
 *     @param  {String}  MetadataDirective              ????????????????????????????????????Copy, Replaced????????????Copy??????????????????Copy?????????Header?????????????????????????????????????????????????????????Replaced??????Header?????????????????????????????????????????????????????????????????????????????????????????????????????????Replaced
 *     @param  {String}  CopySourceIfModifiedSince      ???Object????????????????????????????????????????????????????????????412?????????x-cos-copy-source-If-None-Match?????????????????????????????????????????????????????????
 *     @param  {String}  CopySourceIfUnmodifiedSince    ???Object???????????????????????????????????????????????????????????????412?????????x-cos-copy-source-If-Match?????????????????????????????????????????????????????????
 *     @param  {String}  CopySourceIfMatch              ???Object???ETag???????????????????????????????????????????????????412?????????x-cos-copy-source-If-Unmodified-Since?????????????????????????????????????????????????????????
 *     @param  {String}  CopySourceIfNoneMatch          ???Object???ETag??????????????????????????????????????????????????????412?????????x-cos-copy-source-If-Modified-Since?????????????????????????????????????????????????????????
 *     @param  {String}  StorageClass                   ??????????????????????????????????????????????????????Standard, Standard_IA???Archive???????????????Standard
 *     @param  {String}  CacheControl                   ???????????????????????????????????????/????????????????????????????????????
 *     @param  {String}  ContentDisposition             MIME ??????????????????MIME ???????????? MIME ???????????????????????????????????????
 *     @param  {String}  ContentEncoding                HTTP ???????????????????????????????????????????????????????????????????????????????????????
 *     @param  {String}  ContentLength                  ????????????????????????????????????????????????????????????
 *     @param  {String}  ContentType                    RFC 2616 ???????????? HTTP ?????????????????????MIME????????????text/plain
 *     @param  {String}  Expect                         ?????????????????????????????????
 *     @param  {String}  Expires                        ??????????????????????????????
 *     @param  {String}  params.ServerSideEncryption   ????????????????????????????????????????????????????????????????????? x-cos-server-side-encryption: "AES256"????????????
 *     @param  {String}  ContentLanguage                ??????????????????
 *     @param  {String}  x-cos-meta-*                   ???????????????????????????????????????????????? Object ??????????????????????????????2K???
 */


function putObjectCopy(params, callback) {
  // ???????????? Cache-Control
  var self = this;
  var headers = params.Headers;
  if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
  var CopySource = params.CopySource || '';
  var m = util.getSourceParams.call(this, CopySource);

  if (!m) {
    callback(util.error(new Error('CopySource format error')));
    return;
  }

  var SourceBucket = m.Bucket;
  var SourceRegion = m.Region;
  var SourceKey = decodeURIComponent(m.Key);
  submitRequest.call(this, {
    Scope: [{
      action: 'name/cos:GetObject',
      bucket: SourceBucket,
      region: SourceRegion,
      prefix: SourceKey
    }, {
      action: 'name/cos:PutObject',
      bucket: params.Bucket,
      region: params.Region,
      prefix: params.Key
    }],
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    VersionId: params.VersionId,
    headers: params.Headers
  }, function (err, data) {
    if (err) return callback(err);
    var result = util.clone(data.CopyObjectResult || {});
    var url = getUrl({
      ForcePathStyle: self.options.ForcePathStyle,
      protocol: self.options.Protocol,
      domain: self.options.Domain,
      bucket: params.Bucket,
      region: params.Region,
      object: params.Key,
      isLocation: true
    });
    util.extend(result, {
      Location: url,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}

function uploadPartCopy(params, callback) {
  var CopySource = params.CopySource || '';
  var m = util.getSourceParams.call(this, CopySource);

  if (!m) {
    callback(util.error(new Error('CopySource format error')));
    return;
  }

  var SourceBucket = m.Bucket;
  var SourceRegion = m.Region;
  var SourceKey = decodeURIComponent(m.Key);
  submitRequest.call(this, {
    Scope: [{
      action: 'name/cos:GetObject',
      bucket: SourceBucket,
      region: SourceRegion,
      prefix: SourceKey
    }, {
      action: 'name/cos:PutObject',
      bucket: params.Bucket,
      region: params.Region,
      prefix: params.Key
    }],
    method: 'PUT',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    VersionId: params.VersionId,
    qs: {
      partNumber: params['PartNumber'],
      uploadId: params['UploadId']
    },
    headers: params.Headers
  }, function (err, data) {
    if (err) return callback(err);
    var result = util.clone(data.CopyPartResult || {});
    util.extend(result, {
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}

function deleteMultipleObject(params, callback) {
  var Objects = params.Objects || [];
  var Quiet = params.Quiet;
  Objects = util.isArray(Objects) ? Objects : [Objects];
  var xml = util.json2xml({
    Delete: {
      Object: Objects,
      Quiet: Quiet || false
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  var Scope = util.map(Objects, function (v) {
    return {
      action: 'name/cos:DeleteObject',
      bucket: params.Bucket,
      region: params.Region,
      prefix: v.Key
    };
  });
  submitRequest.call(this, {
    Scope: Scope,
    method: 'POST',
    Bucket: params.Bucket,
    Region: params.Region,
    body: xml,
    action: 'delete',
    headers: headers
  }, function (err, data) {
    if (err) return callback(err);
    var DeleteResult = data.DeleteResult || {};
    var Deleted = DeleteResult.Deleted || [];
    var Errors = DeleteResult.Error || [];
    Deleted = util.isArray(Deleted) ? Deleted : [Deleted];
    Errors = util.isArray(Errors) ? Errors : [Errors];
    var result = util.clone(DeleteResult);
    util.extend(result, {
      Error: Errors,
      Deleted: Deleted,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}

function restoreObject(params, callback) {
  var headers = params.Headers;

  if (!params['RestoreRequest']) {
    callback(util.error(new Error('missing param RestoreRequest')));
    return;
  }

  var RestoreRequest = params.RestoreRequest || {};
  var xml = util.json2xml({
    RestoreRequest: RestoreRequest
  });
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:RestoreObject',
    method: 'POST',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    VersionId: params.VersionId,
    body: xml,
    action: 'restore',
    headers: headers
  }, callback);
}
/**
 * ?????? Object ?????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Object???????????????
 *     @param  {String}  params.Region  ?????????????????????
 *     @param  {Array}   params.TagSet  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data              ????????????
 */


function putObjectTagging(params, callback) {
  var Tagging = params['Tagging'] || {};
  var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
  Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
  var xml = util.json2xml({
    Tagging: {
      TagSet: {
        Tag: Tags
      }
    }
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:PutObjectTagging',
    method: 'PUT',
    Bucket: params.Bucket,
    Key: params.Key,
    Region: params.Region,
    body: xml,
    action: 'tagging',
    headers: headers,
    VersionId: params.VersionId
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Object ???????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Bucket???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data              ????????????
 */


function getObjectTagging(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:GetObjectTagging',
    method: 'GET',
    Key: params.Key,
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    action: 'tagging',
    VersionId: params.VersionId
  }, function (err, data) {
    if (err) {
      if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
        var result = {
          Tags: [],
          statusCode: err.statusCode
        };
        err.headers && (result.headers = err.headers);
        callback(null, result);
      } else {
        callback(err);
      }

      return;
    }

    var Tags = [];

    try {
      Tags = data.Tagging.TagSet.Tag || [];
    } catch (e) {}

    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
    callback(null, {
      Tags: Tags,
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? Object ??? ????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Bucket  Object???????????????
 *     @param  {String}  params.Region  ?????????????????????
 * @param  {Function}  callback         ?????????????????????
 * @return  {Object}  err               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data              ???????????????
 */


function deleteObjectTagging(params, callback) {
  submitRequest.call(this, {
    Action: 'name/cos:DeleteObjectTagging',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    action: 'tagging',
    VersionId: params.VersionId
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ?????? SQL ????????????????????????CSV ???????????? JSON ????????????????????????
 * @param  {Object}  params                   ?????????????????????
 *     @param  {String}  params.Bucket        Object???????????????
 *     @param  {String}  params.Region        ?????????????????????
 *     @param  {Object}  params.SelectRequest ?????????????????????
 * @param  {Function}  callback               ?????????????????????
 * @return  {Object}  err                     ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/42998
 * @return  {Object}  data                    ???????????????
 */


function selectObjectContent(params, callback) {
  var SelectType = params['SelectType'];
  if (!SelectType) return callback(util.error(new Error('missing param SelectType')));
  var SelectRequest = params['SelectRequest'] || {};
  var xml = util.json2xml({
    SelectRequest: SelectRequest
  });
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:GetObject',
    method: 'POST',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    action: 'select',
    qs: {
      'select-type': params['SelectType']
    },
    VersionId: params.VersionId,
    body: xml,
    DataType: 'arraybuffer',
    rawBody: true
  }, function (err, data) {
    if (err && err.statusCode === 204) {
      return callback(null, {
        statusCode: err.statusCode
      });
    } else if (err) {
      return callback(err);
    }

    var result = util.parseSelectPayload(data.body);
    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers,
      Body: result.body,
      Payload: result.payload
    });
  });
} // ????????????

/**
 * ?????????????????????
 * @param  {Object}  params                                     ?????????????????????
 *     @param  {String}  params.Bucket                          Bucket???????????????
 *     @param  {String}  params.Region                          ?????????????????????
 *     @param  {String}  params.Key                             object???????????????
 *     @param  {String}  params.UploadId                        object???????????????
 *     @param  {String}  params.CacheControl                    RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentDisposition              RFC 2616 ???????????????????????????????????? Object ???????????????    ????????????
 *     @param  {String}  params.ContentEncoding                 RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentType                     RFC 2616 ???????????????????????????MIME??????????????? Object ???????????????????????????
 *     @param  {String}  params.Expires                         RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ACL                             ?????????????????????????????????????????????
 *     @param  {String}  params.GrantRead                       ?????????????????????????????? ????????????
 *     @param  {String}  params.GrantWrite                      ?????????????????????????????? ????????????
 *     @param  {String}  params.GrantFullControl                ?????????????????????????????? ????????????
 *     @param  {String}  params.StorageClass                    ??????Object??????????????????????????????Standard???Standard_IA???Archive????????????
 *     @param  {String}  params.ServerSideEncryption           ????????????????????????????????????????????????????????????????????? x-cos-server-side-encryption: "AES256"????????????
 * @param  {Function}  callback                                 ?????????????????????
 * @return  {Object}  err                                       ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                      ???????????????
 */


function multipartInit(params, callback) {
  var self = this; // ???????????? Cache-Control

  var headers = params.Headers;
  var tracker = params.tracker; // ???????????? Cache-Control???Content-Type

  if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
  if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';
  var needCalcMd5 = params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5);
  needCalcMd5 && tracker && tracker.setParams({
    md5StartTime: new Date().getTime()
  });
  util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
    if (md5) params.Headers['x-cos-meta-md5'] = md5;
    needCalcMd5 && tracker && tracker.setParams({
      md5EndTime: new Date().getTime()
    });
    submitRequest.call(self, {
      Action: 'name/cos:InitiateMultipartUpload',
      method: 'POST',
      Bucket: params.Bucket,
      Region: params.Region,
      Key: params.Key,
      action: 'uploads',
      headers: params.Headers,
      qs: params.Query,
      tracker: tracker
    }, function (err, data) {
      if (err) {
        tracker && tracker.parent && tracker.parent.setParams({
          errorNode: 'multipartInit'
        });
        return callback(err);
      }

      data = util.clone(data || {});

      if (data && data.InitiateMultipartUploadResult) {
        return callback(null, util.extend(data.InitiateMultipartUploadResult, {
          statusCode: data.statusCode,
          headers: data.headers
        }));
      }

      callback(null, data);
    });
  }, params.onHashProgress);
}
/**
 * ????????????
 * @param  {Object}  params                                 ?????????????????????
 *     @param  {String}  params.Bucket                      Bucket???????????????
 *     @param  {String}  params.Region                      ?????????????????????
 *     @param  {String}  params.Key                         object???????????????
 *     @param  {File || Blob || String}  params.Body        ??????????????????????????????
 *     @param  {String} params.ContentLength                RFC 2616 ???????????? HTTP ??????????????????????????????????????????
 *     @param  {String} params.Expect                       ????????? Expect: 100-continue ????????????????????????????????????????????????????????????????????????
 *     @param  {String} params.ServerSideEncryption         ????????????????????????????????????????????????????????????????????? x-cos-server-side-encryption: "AES256"????????????
 *     @param  {String} params.ContentSha1                  RFC 3174 ???????????? 160-bit ?????? SHA-1 ???????????????????????????
 * @param  {Function}  callback                             ?????????????????????
 *     @return  {Object}  err                               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}  data                              ???????????????
 *     @return  {Object}  data.ETag                         ????????????????????? sha1 ???
 */


function multipartUpload(params, callback) {
  var self = this;
  util.getFileSize('multipartUpload', params, function () {
    var tracker = params.tracker;
    var needCalcMd5 = self.options.UploadCheckContentMd5;
    needCalcMd5 && tracker && tracker.setParams({
      md5StartTime: new Date().getTime()
    });
    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
      if (md5) params.Headers['Content-MD5'] = util.binaryBase64(md5);
      needCalcMd5 && tracker && tracker.setParams({
        md5EndTime: new Date().getTime()
      });
      tracker && tracker.setParams({
        partNumber: params.PartNumber
      });
      submitRequest.call(self, {
        Action: 'name/cos:UploadPart',
        TaskId: params.TaskId,
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        qs: {
          partNumber: params['PartNumber'],
          uploadId: params['UploadId']
        },
        headers: params.Headers,
        onProgress: params.onProgress,
        body: params.Body || null,
        tracker: tracker
      }, function (err, data) {
        if (err) {
          tracker && tracker.parent && tracker.parent.setParams({
            errorNode: 'multipartUpload'
          });
          return callback(err);
        }

        callback(null, {
          ETag: util.attr(data.headers, 'etag', ''),
          statusCode: data.statusCode,
          headers: data.headers
        });
      });
    });
  });
}
/**
 * ??????????????????
 * @param  {Object}  params                             ?????????????????????
 *     @param  {String}  params.Bucket                  Bucket???????????????
 *     @param  {String}  params.Region                  ?????????????????????
 *     @param  {String}  params.Key                     object???????????????
 *     @param  {Array}   params.Parts                   ???????????????????????????
 *     @param  {String}  params.Parts[i].PartNumber     ??????????????????
 *     @param  {String}  params.Parts[i].ETag           ????????? sha1 ?????????
 * @param  {Function}  callback                         ?????????????????????
 * @return  {Object}  err                               ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              ???????????????
 *     @return  {Object}  data.CompleteMultipartUpload  ?????????????????????????????????????????????Location, Bucket, Key ??? ETag
 */


function multipartComplete(params, callback) {
  var self = this;
  var UploadId = params.UploadId;
  var Parts = params['Parts'];
  var tracker = params.tracker;

  for (var i = 0, len = Parts.length; i < len; i++) {
    if (Parts[i]['ETag'] && Parts[i]['ETag'].indexOf('"') === 0) {
      continue;
    }

    Parts[i]['ETag'] = '"' + Parts[i]['ETag'] + '"';
  }

  var xml = util.json2xml({
    CompleteMultipartUpload: {
      Part: Parts
    }
  }); // CSP/ceph CompleteMultipartUpload ?????? body ??????????????? 1MB??????????????? 10000 ?????????xml ?????????????????????853KB

  xml = xml.replace(/\n\s*/g, '');
  var headers = params.Headers;
  headers['Content-Type'] = 'application/xml';
  headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
  submitRequest.call(this, {
    Action: 'name/cos:CompleteMultipartUpload',
    method: 'POST',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    qs: {
      uploadId: UploadId
    },
    body: xml,
    headers: headers,
    tracker: tracker
  }, function (err, data) {
    if (err) {
      tracker && tracker.parent && tracker.parent.setParams({
        errorNode: 'multipartComplete'
      });
      return callback(err);
    }

    var url = getUrl({
      ForcePathStyle: self.options.ForcePathStyle,
      protocol: self.options.Protocol,
      domain: self.options.Domain,
      bucket: params.Bucket,
      region: params.Region,
      object: params.Key,
      isLocation: true
    });
    var res = data.CompleteMultipartUploadResult || {};

    if (res.ProcessResults) {
      if (res && res.ProcessResults) {
        res.UploadResult = {
          OriginalInfo: {
            Key: res.Key,
            Location: url,
            ETag: res.ETag,
            ImageInfo: res.ImageInfo
          },
          ProcessResults: res.ProcessResults
        };
        delete res.ImageInfo;
        delete res.ProcessResults;
      }
    }

    var result = util.extend(res, {
      Location: url,
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ??????????????????????????????
 * @param  {Object}  params                                 ?????????????????????
 *     @param  {String}  params.Bucket                      Bucket???????????????
 *     @param  {String}  params.Region                      ?????????????????????
 *     @param  {String}  params.Delimiter                   ????????????????????????????????????Prefix?????????Prefix???delimiter?????????????????????????????????????????????Common Prefix?????????????????????Common Prefix???????????????Prefix???????????????????????????????????????
 *     @param  {String}  params.EncodingType                ??????????????????????????????????????????
 *     @param  {String}  params.Prefix                      ??????????????????????????????????????????????????????????????????
 *     @param  {String}  params.MaxUploads                  ??????????????????????????????????????????1000????????????
 *     @param  {String}  params.KeyMarker                   ???upload-id-marker???????????? </Br>???upload-id-marker??????????????????ObjectName??????????????????key-marker????????????????????? </Br>???upload-id-marker???????????????ObjectName??????????????????key-marker?????????????????????ObjectName??????????????????key-marker??????UploadId??????upload-id-marker?????????????????????????????????
 *     @param  {String}  params.UploadIdMarker              ???key-marker???????????? </Br>???key-marker??????????????????upload-id-marker???????????? </Br>???key-marker???????????????ObjectName??????????????????key-marker?????????????????????ObjectName??????????????????key-marker??????UploadId??????upload-id-marker?????????????????????????????????
 * @param  {Function}  callback                             ?????????????????????
 * @return  {Object}  err                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                  ???????????????
 *     @return  {Object}  data.ListMultipartUploadsResult   ????????????????????????
 */


function multipartList(params, callback) {
  var reqParams = {};
  reqParams['delimiter'] = params['Delimiter'];
  reqParams['encoding-type'] = params['EncodingType'];
  reqParams['prefix'] = params['Prefix'] || '';
  reqParams['max-uploads'] = params['MaxUploads'];
  reqParams['key-marker'] = params['KeyMarker'];
  reqParams['upload-id-marker'] = params['UploadIdMarker'];
  reqParams = util.clearKey(reqParams);
  var tracker = params.tracker;
  tracker && tracker.setParams({
    signStartTime: new Date().getTime()
  });
  submitRequest.call(this, {
    Action: 'name/cos:ListMultipartUploads',
    ResourceKey: reqParams['prefix'],
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    headers: params.Headers,
    qs: reqParams,
    action: 'uploads',
    tracker: tracker
  }, function (err, data) {
    if (err) {
      tracker && tracker.parent && tracker.parent.setParams({
        errorNode: 'multipartList'
      });
      return callback(err);
    }

    if (data && data.ListMultipartUploadsResult) {
      var Upload = data.ListMultipartUploadsResult.Upload || [];
      Upload = util.isArray(Upload) ? Upload : [Upload];
      data.ListMultipartUploadsResult.Upload = Upload;
    }

    var result = util.clone(data.ListMultipartUploadsResult || {});
    util.extend(result, {
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ???????????????????????????
 * @param  {Object}  params                                 ?????????????????????
 *     @param  {String}  params.Bucket                      Bucket???????????????
 *     @param  {String}  params.Region                      ?????????????????????
 *     @param  {String}  params.Key                         object???????????????
 *     @param  {String}  params.UploadId                    ???????????????????????????ID?????????
 *     @param  {String}  params.EncodingType                ??????????????????????????????????????????
 *     @param  {String}  params.MaxParts                    ??????????????????????????????????????????1000????????????
 *     @param  {String}  params.PartNumberMarker            ?????????UTF-8???????????????????????????????????????????????????marker??????????????????
 * @param  {Function}  callback                             ?????????????????????
 * @return  {Object}  err                                   ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                  ???????????????
 *     @return  {Object}  data.ListMultipartUploadsResult   ????????????
 */


function multipartListPart(params, callback) {
  var reqParams = {};
  var tracker = params.tracker;
  reqParams['uploadId'] = params['UploadId'];
  reqParams['encoding-type'] = params['EncodingType'];
  reqParams['max-parts'] = params['MaxParts'];
  reqParams['part-number-marker'] = params['PartNumberMarker'];
  submitRequest.call(this, {
    Action: 'name/cos:ListParts',
    method: 'GET',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    qs: reqParams
  }, function (err, data) {
    if (err) {
      tracker && tracker.parent && tracker.parent.setParams({
        errorNode: 'multipartListPart'
      });
      return callback(err);
    }

    var ListPartsResult = data.ListPartsResult || {};
    var Part = ListPartsResult.Part || [];
    Part = util.isArray(Part) ? Part : [Part];
    ListPartsResult.Part = Part;
    var result = util.clone(ListPartsResult);
    util.extend(result, {
      statusCode: data.statusCode,
      headers: data.headers
    });
    callback(null, result);
  });
}
/**
 * ??????????????????
 * @param  {Object}  params                 ?????????????????????
 *     @param  {String}  params.Bucket      Bucket???????????????
 *     @param  {String}  params.Region      ?????????????????????
 *     @param  {String}  params.Key         object???????????????
 *     @param  {String}  params.UploadId    ???????????????????????????ID?????????
 * @param  {Function}  callback             ?????????????????????
 *     @return  {Object}    err             ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            ???????????????
 */


function multipartAbort(params, callback) {
  var reqParams = {};
  reqParams['uploadId'] = params['UploadId'];
  submitRequest.call(this, {
    Action: 'name/cos:AbortMultipartUpload',
    method: 'DELETE',
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    headers: params.Headers,
    qs: reqParams
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, {
      statusCode: data.statusCode,
      headers: data.headers
    });
  });
}
/**
 * ??????????????????
 * @param  {Object}  params                 ?????????????????????
 *     @param  {String}  params.Bucket      Bucket???????????????
 *     @param  {String}  params.Region      ?????????????????????
 *     @param  {String}  params.Key         object???????????????
 *     @param  {String}  params.UploadId    ???????????????????????????ID?????????
 * @param  {Function}  callback             ?????????????????????
 *     @return  {Object}    err             ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            ???????????????
 */


function request(params, callback) {
  submitRequest.call(this, {
    method: params.Method,
    Bucket: params.Bucket,
    Region: params.Region,
    Key: params.Key,
    action: params.Action,
    headers: params.Headers,
    qs: params.Query,
    body: params.Body,
    Url: params.Url,
    rawBody: params.RawBody,
    DataType: params.DataType
  }, function (err, data) {
    if (err) return callback(err);

    if (data && data.body) {
      data.Body = data.body;
      delete data.body;
    }

    callback(err, data);
  });
}
/**
 * ????????????
 * @param  {Object}  params                                         ?????????????????????
 *     @param  {String}  params.Bucket                              Bucket???????????????
 *     @param  {String}  params.Region                              ?????????????????????
 *     @param  {String}  params.Key                                 object???????????????
 *     @param  {File || Blob || String}  params.Body                ??????????????????????????????
 *     @param  {Number}  params.Position                            ???????????????????????????????????????????????????
 *     @param  {String}  params.CacheControl                        RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentDisposition                  RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentEncoding                     RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ContentLength                       RFC 2616 ???????????? HTTP ???????????????????????????????????????
 *     @param  {String}  params.ContentType                         RFC 2616 ???????????????????????????MIME??????????????? Object ???????????????????????????
 *     @param  {String}  params.Expect                              ????????? Expect: 100-continue ????????????????????????????????????????????????????????????????????????
 *     @param  {String}  params.Expires                             RFC 2616 ???????????????????????????????????? Object ???????????????????????????
 *     @param  {String}  params.ACL                                 ????????????????????????????????????????????????private | public-read????????????
 *     @param  {String}  params.GrantRead                           ???????????????????????????????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.GrantReadAcp                        ??????????????????????????????????????????????????????ACL????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.GrantWriteAcp                       ??????????????????????????????????????????????????????ACL????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.GrantFullControl                    ?????????????????????????????????????????????????????????id="[OwnerUin]"???????????????????????????,???????????????????????????????????????
 *     @param  {String}  params.StorageClass                        ??????????????????????????????????????????STANDARD???STANDARD_IA???ARCHIVE???????????????STANDARD????????????
 *     @param  {String}  params.x-cos-meta-*                        ???????????????????????????????????????????????????????????????????????????????????????2KB????????????
 *     @param  {String}  params.ContentSha1                         RFC 3174 ???????????? 160-bit ?????? SHA-1 ????????????????????????
 *     @param  {String}  params.ServerSideEncryption                ????????????????????????????????????????????????????????????????????? x-cos-server-side-encryption: "AES256"????????????
 * @param  {Function}  callback                                     ?????????????????????
 *     @return  {Object}    err                                     ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data                                    ???????????????
 */


function appendObject(params, callback) {
  // ???????????? Cache-Control???Content-Type??????????????????????????????????????????????????? Object ?????????
  var headers = params.Headers;
  if (!headers['Cache-Control'] && !headers['cache-control']) headers['Cache-Control'] = '';
  if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = params.Body && params.Body.type || '';
  submitRequest.call(this, {
    Action: 'name/cos:AppendObject',
    method: 'POST',
    Bucket: params.Bucket,
    Region: params.Region,
    action: 'append',
    Key: params.Key,
    body: params.Body,
    qs: {
      position: params.Position
    },
    headers: params.Headers
  }, function (err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
}
/**
 * ????????????
 * @param  {Object}  params             ?????????????????????
 *     @param  {String}  params.Method  ?????????????????????
 *     @param  {String}  params.Key     object???????????????
 *     @param  {String}  params.Expires ????????????????????????????????????
 * @return  {String}  data              ?????????????????????
 */


function getAuth(params) {
  var self = this;
  return util.getAuth({
    SecretId: params.SecretId || this.options.SecretId || '',
    SecretKey: params.SecretKey || this.options.SecretKey || '',
    Bucket: params.Bucket,
    Region: params.Region,
    Method: params.Method,
    Key: params.Key,
    Query: params.Query,
    Headers: params.Headers,
    Expires: params.Expires,
    UseRawKey: self.options.UseRawKey,
    SystemClockOffset: self.options.SystemClockOffset
  });
}
/**
 * ????????????????????????
 * @param  {Object}  params                 ?????????????????????
 *     @param  {String}  params.Bucket      Bucket???????????????
 *     @param  {String}  params.Region      ?????????????????????
 *     @param  {String}  params.Key         object???????????????
 *     @param  {String}  params.Method      ????????????????????????
 *     @param  {String}  params.Expires     ???????????????????????????????????????
 * @param  {Function}  callback             ?????????????????????
 *     @return  {Object}    err             ?????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            ???????????????
 */


function getObjectUrl(params, callback) {
  var self = this;
  var useAccelerate = params.UseAccelerate === undefined ? self.options.UseAccelerate : params.UseAccelerate;
  var url = getUrl({
    ForcePathStyle: self.options.ForcePathStyle,
    protocol: params.Protocol || self.options.Protocol,
    domain: params.Domain || self.options.Domain,
    bucket: params.Bucket,
    region: useAccelerate ? 'accelerate' : params.Region,
    object: params.Key
  });
  var queryParamsStr = '';

  if (params.Query) {
    queryParamsStr += util.obj2str(params.Query);
  }

  if (params.QueryString) {
    queryParamsStr += (queryParamsStr ? '&' : '') + params.QueryString;
  }

  var syncUrl = url;

  if (params.Sign !== undefined && !params.Sign) {
    queryParamsStr && (syncUrl += '?' + queryParamsStr);
    callback(null, {
      Url: syncUrl
    });
    return syncUrl;
  } // ???????????? Host?????????????????????


  var SignHost = getSignHost.call(this, {
    Bucket: params.Bucket,
    Region: params.Region,
    UseAccelerate: params.UseAccelerate,
    Url: url
  });
  var AuthData = getAuthorizationAsync.call(this, {
    Action: (params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject',
    Bucket: params.Bucket || '',
    Region: params.Region || '',
    Method: params.Method || 'get',
    Key: params.Key,
    Expires: params.Expires,
    Headers: params.Headers,
    Query: params.Query,
    SignHost: SignHost,
    ForceSignHost: params.ForceSignHost === false ? false : self.options.ForceSignHost // getObjectUrl????????????ForceSignHost

  }, function (err, AuthData) {
    if (!callback) return;

    if (err) {
      callback(err);
      return;
    } // ????????????url qUrlParamList?????????encode??????


    var replaceUrlParamList = function replaceUrlParamList(url) {
      var urlParams = url.match(/q-url-param-list.*?(?=&)/g)[0];
      var encodedParams = 'q-url-param-list=' + encodeURIComponent(urlParams.replace(/q-url-param-list=/, '')).toLowerCase();
      var reg = new RegExp(urlParams, 'g');
      var replacedUrl = url.replace(reg, encodedParams);
      return replacedUrl;
    };

    var signUrl = url;
    signUrl += '?' + (AuthData.Authorization.indexOf('q-signature') > -1 ? replaceUrlParamList(AuthData.Authorization) : 'sign=' + encodeURIComponent(AuthData.Authorization));
    AuthData.SecurityToken && (signUrl += '&x-cos-security-token=' + AuthData.SecurityToken);
    AuthData.ClientIP && (signUrl += '&clientIP=' + AuthData.ClientIP);
    AuthData.ClientUA && (signUrl += '&clientUA=' + AuthData.ClientUA);
    AuthData.Token && (signUrl += '&token=' + AuthData.Token);
    queryParamsStr && (signUrl += '&' + queryParamsStr);
    setTimeout(function () {
      callback(null, {
        Url: signUrl
      });
    });
  });

  if (AuthData) {
    syncUrl += '?' + AuthData.Authorization + (AuthData.SecurityToken ? '&x-cos-security-token=' + AuthData.SecurityToken : '');
    queryParamsStr && (syncUrl += '&' + queryParamsStr);
  } else {
    queryParamsStr && (syncUrl += '?' + queryParamsStr);
  }

  return syncUrl;
}
/**
 * ????????????
 */


function decodeAcl(AccessControlPolicy) {
  var result = {
    GrantFullControl: [],
    GrantWrite: [],
    GrantRead: [],
    GrantReadAcp: [],
    GrantWriteAcp: [],
    ACL: ''
  };
  var GrantMap = {
    'FULL_CONTROL': 'GrantFullControl',
    'WRITE': 'GrantWrite',
    'READ': 'GrantRead',
    'READ_ACP': 'GrantReadAcp',
    'WRITE_ACP': 'GrantWriteAcp'
  };
  var AccessControlList = AccessControlPolicy && AccessControlPolicy.AccessControlList || {};
  var Grant = AccessControlList.Grant;

  if (Grant) {
    Grant = util.isArray(Grant) ? Grant : [Grant];
  }

  var PublicAcl = {
    READ: 0,
    WRITE: 0,
    FULL_CONTROL: 0
  };
  Grant && Grant.length && util.each(Grant, function (item) {
    if (item.Grantee.ID === 'qcs::cam::anyone:anyone' || item.Grantee.URI === 'http://cam.qcloud.com/groups/global/AllUsers') {
      PublicAcl[item.Permission] = 1;
    } else if (item.Grantee.ID !== AccessControlPolicy.Owner.ID) {
      result[GrantMap[item.Permission]].push('id="' + item.Grantee.ID + '"');
    }
  });

  if (PublicAcl.FULL_CONTROL || PublicAcl.WRITE && PublicAcl.READ) {
    result.ACL = 'public-read-write';
  } else if (PublicAcl.READ) {
    result.ACL = 'public-read';
  } else {
    result.ACL = 'private';
  }

  util.each(GrantMap, function (item) {
    result[item] = uniqGrant(result[item].join(','));
  });
  return result;
} // Grant ??????


function uniqGrant(str) {
  var arr = str.split(',');
  var exist = {};
  var i, item;

  for (i = 0; i < arr.length;) {
    item = arr[i].trim();

    if (exist[item]) {
      arr.splice(i, 1);
    } else {
      exist[item] = true;
      arr[i] = item;
      i++;
    }
  }

  return arr.join(',');
} // ???????????? url


function getUrl(params) {
  var region = params.region || '';
  var longBucket = params.bucket || '';
  var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));
  var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);
  var domain = params.domain;
  var object = params.object;

  if (typeof domain === 'function') {
    domain = domain({
      Bucket: longBucket,
      Region: region
    });
  } // ?????????????????????http???https


  if (['http', 'https'].includes(params.protocol)) {
    params.protocol = params.protocol + ':';
  }

  var protocol = params.protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');

  if (!domain) {
    if (['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(region) > -1) {
      domain = '{Region}.myqcloud.com';
    } else {
      domain = 'cos.{Region}.myqcloud.com';
    }

    if (!params.ForcePathStyle) {
      domain = '{Bucket}.' + domain;
    }
  }

  domain = domain.replace(/\{\{AppId\}\}/ig, appId).replace(/\{\{Bucket\}\}/ig, shortBucket).replace(/\{\{Region\}\}/ig, region).replace(/\{\{.*?\}\}/ig, '');
  domain = domain.replace(/\{AppId\}/ig, appId).replace(/\{BucketName\}/ig, shortBucket).replace(/\{Bucket\}/ig, longBucket).replace(/\{Region\}/ig, region).replace(/\{.*?\}/ig, '');

  if (!/^[a-zA-Z]+:\/\//.test(domain)) {
    domain = protocol + '//' + domain;
  } // ???????????????????????????


  if (domain.slice(-1) === '/') {
    domain = domain.slice(0, -1);
  }

  var url = domain;

  if (params.ForcePathStyle) {
    url += '/' + longBucket;
  }

  url += '/';

  if (object) {
    url += util.camSafeUrlEncode(object).replace(/%2F/g, '/');
  }

  if (params.isLocation) {
    url = url.replace(/^https?:\/\//, '');
  }

  return url;
}

var getSignHost = function getSignHost(opt) {
  if (!opt.Bucket || !opt.Region) return '';
  var useAccelerate = opt.UseAccelerate === undefined ? this.options.UseAccelerate : opt.UseAccelerate;
  var url = opt.Url || getUrl({
    ForcePathStyle: this.options.ForcePathStyle,
    protocol: this.options.Protocol,
    domain: this.options.Domain,
    bucket: opt.Bucket,
    region: useAccelerate ? 'accelerate' : opt.Region
  });
  var urlHost = url.replace(/^https?:\/\/([^/]+)(\/.*)?$/, '$1');
  var standardHostReg = new RegExp('^([a-z\\d-]+-\\d+\\.)?(cos|cosv6|ci|pic)\\.([a-z\\d-]+)\\.myqcloud\\.com$');
  if (standardHostReg.test(urlHost)) return urlHost;
  return '';
}; // ??????????????????


function getAuthorizationAsync(params, callback) {
  var headers = util.clone(params.Headers);
  var headerHost = '';
  util.each(headers, function (v, k) {
    (v === '' || ['content-type', 'cache-control', 'expires'].indexOf(k.toLowerCase()) > -1) && delete headers[k];
    if (k.toLowerCase() === 'host') headerHost = v;
  }); // ForceSignHost????????????false????????????host??????

  var forceSignHost = params.ForceSignHost === false ? false : true; // Host ??????????????????

  if (!headerHost && params.SignHost && forceSignHost) headers.Host = params.SignHost; // ???????????????????????????????????? callback ??????

  var cbDone = false;

  var cb = function cb(err, AuthData) {
    if (cbDone) return;
    cbDone = true;

    if (AuthData && AuthData.XCosSecurityToken && !AuthData.SecurityToken) {
      AuthData = util.clone(AuthData);
      AuthData.SecurityToken = AuthData.XCosSecurityToken;
      delete AuthData.XCosSecurityToken;
    }

    callback && callback(err, AuthData);
  };

  var self = this;
  var Bucket = params.Bucket || '';
  var Region = params.Region || ''; // PathName

  var KeyName = params.Key || '';

  if (self.options.ForcePathStyle && Bucket) {
    KeyName = Bucket + '/' + KeyName;
  }

  var Pathname = '/' + KeyName; // Action???ResourceKey

  var StsData = {};
  var Scope = params.Scope;

  if (!Scope) {
    var Action = params.Action || '';
    var ResourceKey = params.ResourceKey || params.Key || '';
    Scope = params.Scope || [{
      action: Action,
      bucket: Bucket,
      region: Region,
      prefix: ResourceKey
    }];
  }

  var ScopeKey = util.md5(JSON.stringify(Scope)); // STS

  self._StsCache = self._StsCache || [];

  (function () {
    var i, AuthData;

    for (i = self._StsCache.length - 1; i >= 0; i--) {
      AuthData = self._StsCache[i];
      var compareTime = Math.round(util.getSkewTime(self.options.SystemClockOffset) / 1000) + 30;

      if (AuthData.StartTime && compareTime < AuthData.StartTime || compareTime >= AuthData.ExpiredTime) {
        self._StsCache.splice(i, 1);

        continue;
      }

      if (!AuthData.ScopeLimit || AuthData.ScopeLimit && AuthData.ScopeKey === ScopeKey) {
        StsData = AuthData;
        break;
      }
    }
  })();

  var calcAuthByTmpKey = function calcAuthByTmpKey() {
    var KeyTime = '';
    if (StsData.StartTime && params.Expires) KeyTime = StsData.StartTime + ';' + (StsData.StartTime + params.Expires * 1);else if (StsData.StartTime && StsData.ExpiredTime) KeyTime = StsData.StartTime + ';' + StsData.ExpiredTime;
    var Authorization = util.getAuth({
      SecretId: StsData.TmpSecretId,
      SecretKey: StsData.TmpSecretKey,
      Method: params.Method,
      Pathname: Pathname,
      Query: params.Query,
      Headers: headers,
      Expires: params.Expires,
      UseRawKey: self.options.UseRawKey,
      SystemClockOffset: self.options.SystemClockOffset,
      KeyTime: KeyTime,
      ForceSignHost: forceSignHost
    });
    var AuthData = {
      Authorization: Authorization,
      SecurityToken: StsData.SecurityToken || StsData.XCosSecurityToken || '',
      Token: StsData.Token || '',
      ClientIP: StsData.ClientIP || '',
      ClientUA: StsData.ClientUA || ''
    };
    cb(null, AuthData);
  };

  var checkAuthError = function checkAuthError(AuthData) {
    if (AuthData.Authorization) {
      // ??????????????????
      var formatAllow = false;
      var auth = AuthData.Authorization;

      if (auth) {
        if (auth.indexOf(' ') > -1) {
          formatAllow = false;
        } else if (auth.indexOf('q-sign-algorithm=') > -1 && auth.indexOf('q-ak=') > -1 && auth.indexOf('q-sign-time=') > -1 && auth.indexOf('q-key-time=') > -1 && auth.indexOf('q-url-param-list=') > -1) {
          formatAllow = true;
        } else {
          try {
            auth = atob(auth);

            if (auth.indexOf('a=') > -1 && auth.indexOf('k=') > -1 && auth.indexOf('t=') > -1 && auth.indexOf('r=') > -1 && auth.indexOf('b=') > -1) {
              formatAllow = true;
            }
          } catch (e) {}
        }
      }

      if (!formatAllow) return util.error(new Error('getAuthorization callback params format error'));
    } else {
      if (!AuthData.TmpSecretId) return util.error(new Error('getAuthorization callback params missing "TmpSecretId"'));
      if (!AuthData.TmpSecretKey) return util.error(new Error('getAuthorization callback params missing "TmpSecretKey"'));
      if (!AuthData.SecurityToken && !AuthData.XCosSecurityToken) return util.error(new Error('getAuthorization callback params missing "SecurityToken"'));
      if (!AuthData.ExpiredTime) return util.error(new Error('getAuthorization callback params missing "ExpiredTime"'));
      if (AuthData.ExpiredTime && AuthData.ExpiredTime.toString().length !== 10) return util.error(new Error('getAuthorization callback params "ExpiredTime" should be 10 digits'));
      if (AuthData.StartTime && AuthData.StartTime.toString().length !== 10) return util.error(new Error('getAuthorization callback params "StartTime" should be 10 StartTime'));
    }

    return false;
  }; // ??????????????????????????????


  if (StsData.ExpiredTime && StsData.ExpiredTime - util.getSkewTime(self.options.SystemClockOffset) / 1000 > 60) {
    // ???????????????????????????????????????????????????60???????????????????????????
    calcAuthByTmpKey();
  } else if (self.options.getAuthorization) {
    // ???????????????????????????????????????
    self.options.getAuthorization.call(self, {
      Bucket: Bucket,
      Region: Region,
      Method: params.Method,
      Key: KeyName,
      Pathname: Pathname,
      Query: params.Query,
      Headers: headers,
      Scope: Scope,
      SystemClockOffset: self.options.SystemClockOffset,
      ForceSignHost: forceSignHost
    }, function (AuthData) {
      if (typeof AuthData === 'string') AuthData = {
        Authorization: AuthData
      };
      var AuthError = checkAuthError(AuthData);
      if (AuthError) return cb(AuthError);

      if (AuthData.Authorization) {
        cb(null, AuthData);
      } else {
        StsData = AuthData || {};
        StsData.Scope = Scope;
        StsData.ScopeKey = ScopeKey;

        self._StsCache.push(StsData);

        calcAuthByTmpKey();
      }
    });
  } else if (self.options.getSTS) {
    // ????????????????????????
    self.options.getSTS.call(self, {
      Bucket: Bucket,
      Region: Region
    }, function (data) {
      StsData = data || {};
      StsData.Scope = Scope;
      StsData.ScopeKey = ScopeKey;
      if (!StsData.TmpSecretId) StsData.TmpSecretId = StsData.SecretId;
      if (!StsData.TmpSecretKey) StsData.TmpSecretKey = StsData.SecretKey;
      var AuthError = checkAuthError(StsData);
      if (AuthError) return cb(AuthError);

      self._StsCache.push(StsData);

      calcAuthByTmpKey();
    });
  } else {
    // ????????????????????????
    return function () {
      var Authorization = util.getAuth({
        SecretId: params.SecretId || self.options.SecretId,
        SecretKey: params.SecretKey || self.options.SecretKey,
        Method: params.Method,
        Pathname: Pathname,
        Query: params.Query,
        Headers: headers,
        Expires: params.Expires,
        UseRawKey: self.options.UseRawKey,
        SystemClockOffset: self.options.SystemClockOffset,
        ForceSignHost: forceSignHost
      });
      var AuthData = {
        Authorization: Authorization,
        SecurityToken: self.options.SecurityToken || self.options.XCosSecurityToken
      };
      cb(null, AuthData);
      return AuthData;
    }();
  }

  return '';
} // ??????????????????


function allowRetry(err) {
  var allowRetry = false;
  var isTimeError = false;
  var serverDate = err.headers && (err.headers.date || err.headers.Date) || err.error && err.error.ServerTime;

  try {
    var errorCode = err.error.Code;
    var errorMessage = err.error.Message;

    if (errorCode === 'RequestTimeTooSkewed' || errorCode === 'AccessDenied' && errorMessage === 'Request has expired') {
      isTimeError = true;
    }
  } catch (e) {}

  if (err) {
    if (isTimeError && serverDate) {
      var serverTime = Date.parse(serverDate);

      if (this.options.CorrectClockSkew && Math.abs(util.getSkewTime(this.options.SystemClockOffset) - serverTime) >= 30000) {
        console.error('error: Local time is too skewed.');
        this.options.SystemClockOffset = serverTime - Date.now();
        allowRetry = true;
      }
    } else if (Math.floor(err.statusCode / 100) === 5) {
      allowRetry = true;
    }
  }

  return allowRetry;
} // ???????????????????????????


function submitRequest(params, callback) {
  var self = this; // ?????? headers

  !params.headers && (params.headers = {}); // ?????? query

  !params.qs && (params.qs = {});
  params.VersionId && (params.qs.versionId = params.VersionId);
  params.qs = util.clearKey(params.qs); // ?????? undefined ??? null ??????

  params.headers && (params.headers = util.clearKey(params.headers));
  params.qs && (params.qs = util.clearKey(params.qs));
  var Query = util.clone(params.qs);
  params.action && (Query[params.action] = '');
  var paramsUrl = params.url || params.Url;
  var SignHost = params.SignHost || getSignHost.call(this, {
    Bucket: params.Bucket,
    Region: params.Region,
    Url: paramsUrl
  });
  var tracker = params.tracker;

  var next = function next(tryTimes) {
    var oldClockOffset = self.options.SystemClockOffset;
    tracker && tracker.setParams({
      signStartTime: new Date().getTime(),
      retryTimes: tryTimes - 1
    });
    getAuthorizationAsync.call(self, {
      Bucket: params.Bucket || '',
      Region: params.Region || '',
      Method: params.method,
      Key: params.Key,
      Query: Query,
      Headers: params.headers,
      SignHost: SignHost,
      Action: params.Action,
      ResourceKey: params.ResourceKey,
      Scope: params.Scope,
      ForceSignHost: self.options.ForceSignHost
    }, function (err, AuthData) {
      if (err) {
        callback(err);
        return;
      }

      tracker && tracker.setParams({
        signEndTime: new Date().getTime(),
        httpStartTime: new Date().getTime()
      });
      params.AuthData = AuthData;

      _submitRequest.call(self, params, function (err, data) {
        tracker && tracker.setParams({
          httpEndTime: new Date().getTime()
        });

        if (err && tryTimes < 2 && (oldClockOffset !== self.options.SystemClockOffset || allowRetry.call(self, err))) {
          if (params.headers) {
            delete params.headers.Authorization;
            delete params.headers['token'];
            delete params.headers['clientIP'];
            delete params.headers['clientUA'];
            params.headers['x-cos-security-token'] && delete params.headers['x-cos-security-token'];
            params.headers['x-ci-security-token'] && delete params.headers['x-ci-security-token'];
          }

          next(tryTimes + 1);
        } else {
          callback(err, data);
        }
      });
    });
  };

  next(1);
} // ????????????


function _submitRequest(params, callback) {
  var self = this;
  var TaskId = params.TaskId;
  if (TaskId && !self._isRunningTask(TaskId)) return;
  var bucket = params.Bucket;
  var region = params.Region;
  var object = params.Key;
  var method = params.method || 'GET';
  var url = params.Url || params.url;
  var body = params.body;
  var rawBody = params.rawBody; // url

  if (self.options.UseAccelerate) {
    region = 'accelerate';
  }

  url = url || getUrl({
    ForcePathStyle: self.options.ForcePathStyle,
    protocol: self.options.Protocol,
    domain: self.options.Domain,
    bucket: bucket,
    region: region,
    object: object
  });

  if (params.action) {
    // ??????????????????????????????qq??????url?????????????????????/upload????????????/upload=(null)?????????????????????????????????????????????
    url = url + '?' + (util.isIOS_QQ ? "".concat(params.action, "=") : params.action);
  }

  if (params.qsStr) {
    if (url.indexOf('?') > -1) {
      url = url + '&' + params.qsStr;
    } else {
      url = url + '?' + params.qsStr;
    }
  }

  var opt = {
    method: method,
    url: url,
    headers: params.headers,
    qs: params.qs,
    body: body
  }; // ??????ci??????

  var token = 'x-cos-security-token';

  if (util.isCIHost(url)) {
    token = 'x-ci-security-token';
  } // ????????????


  opt.headers.Authorization = params.AuthData.Authorization;
  params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);
  params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);
  params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);
  params.AuthData.SecurityToken && (opt.headers[token] = params.AuthData.SecurityToken); // ?????? undefined ??? null ??????

  opt.headers && (opt.headers = util.clearKey(opt.headers));
  opt = util.clearKey(opt); // progress

  if (params.onProgress && typeof params.onProgress === 'function') {
    var contentLength = body && (body.size || body.length) || 0;

    opt.onProgress = function (e) {
      if (TaskId && !self._isRunningTask(TaskId)) return;
      var loaded = e ? e.loaded : 0;
      params.onProgress({
        loaded: loaded,
        total: contentLength
      });
    };
  }

  if (params.onDownloadProgress) {
    opt.onDownloadProgress = params.onDownloadProgress;
  }

  if (params.DataType) {
    opt.dataType = params.DataType;
  }

  if (this.options.Timeout) {
    opt.timeout = this.options.Timeout;
  }

  self.options.ForcePathStyle && (opt.pathStyle = self.options.ForcePathStyle);
  self.emit('before-send', opt);
  var useAccelerate = opt.url.includes('accelerate.');
  var queryString = opt.qs ? Object.keys(opt.qs).map(function (key) {
    return "".concat(key, "=").concat(opt.qs[key]);
  }).join('&') : '';
  var fullUrl = queryString ? opt.url + '?' + queryString : opt.url;
  params.tracker && params.tracker.setParams({
    reqUrl: fullUrl,
    accelerate: useAccelerate ? 'Y' : 'N'
  }); // ????????????????????????tracker??????url??????

  params.tracker && params.tracker.parent && params.tracker.parent.setParams({
    reqUrl: fullUrl,
    accelerate: useAccelerate ? 'Y' : 'N'
  });
  var sender = (self.options.Request || REQUEST)(opt, function (r) {
    if (r && r.error === 'abort') return;
    var receive = {
      options: opt,
      error: r && r.error,
      statusCode: r && r.statusCode || 0,
      statusMessage: r && r.statusMessage || '',
      headers: r && r.headers || {},
      body: r && r.body
    }; // ??????????????????????????????????????? error???statusCode???statusMessage???body

    self.emit('after-receive', receive);
    var err = receive.error;
    var body = receive.body; // ?????????????????? ????????? ??? headers

    var response = {
      statusCode: receive.statusCode,
      statusMessage: receive.statusMessage,
      headers: receive.headers
    };
    var hasReturned;

    var cb = function cb(err, data) {
      TaskId && self.off('inner-kill-task', killTask);
      if (hasReturned) return;
      hasReturned = true;
      var attrs = {};
      response && response.statusCode && (attrs.statusCode = response.statusCode);
      response && response.headers && (attrs.headers = response.headers);

      if (err) {
        err = util.extend(err || {}, attrs);
        callback(err, null);
      } else {
        data = util.extend(data || {}, attrs);
        callback(null, data);
      }

      sender = null;
    }; // ?????????????????????????????????


    if (err) return cb(util.error(err)); // ????????????????????? 200

    var statusCode = response.statusCode;
    var statusSuccess = Math.floor(statusCode / 100) === 2; // 200 202 204 206
    // ?????? body ???????????????body ??????????????????

    if (rawBody && statusSuccess) return cb(null, {
      body: body
    }); // ?????? xml body

    var json;

    try {
      json = body && body.indexOf('<') > -1 && body.indexOf('>') > -1 && util.xml2json(body) || {};
    } catch (e) {
      json = {};
    } // ???????????????


    var xmlError = json && json.Error;

    if (statusSuccess) {
      // ???????????????????????? 2xx ??????body ????????? Error
      cb(null, json);
    } else if (xmlError) {
      // ??????????????? xml body????????? Error ??????
      cb(util.error(new Error(xmlError.Message), {
        code: xmlError.Code,
        error: xmlError
      }));
    } else if (statusCode) {
      // ?????????????????????
      cb(util.error(new Error(response.statusMessage), {
        code: '' + statusCode
      }));
    } else if (statusCode) {
      // ??????????????????????????????????????????
      cb(util.error(new Error('statusCode error')));
    }
  }); // kill task

  var killTask = function killTask(data) {
    if (data.TaskId === TaskId) {
      sender && sender.abort && sender.abort();
      self.off('inner-kill-task', killTask);
    }
  };

  TaskId && self.on('inner-kill-task', killTask);
}

var API_MAP = {
  // Bucket ????????????
  getService: getService,
  // Bucket
  putBucket: putBucket,
  headBucket: headBucket,
  // Bucket
  getBucket: getBucket,
  deleteBucket: deleteBucket,
  putBucketAcl: putBucketAcl,
  // BucketACL
  getBucketAcl: getBucketAcl,
  putBucketCors: putBucketCors,
  // BucketCors
  getBucketCors: getBucketCors,
  deleteBucketCors: deleteBucketCors,
  getBucketLocation: getBucketLocation,
  // BucketLocation
  getBucketPolicy: getBucketPolicy,
  // BucketPolicy
  putBucketPolicy: putBucketPolicy,
  deleteBucketPolicy: deleteBucketPolicy,
  putBucketTagging: putBucketTagging,
  // BucketTagging
  getBucketTagging: getBucketTagging,
  deleteBucketTagging: deleteBucketTagging,
  putBucketLifecycle: putBucketLifecycle,
  // BucketLifecycle
  getBucketLifecycle: getBucketLifecycle,
  deleteBucketLifecycle: deleteBucketLifecycle,
  putBucketVersioning: putBucketVersioning,
  // BucketVersioning
  getBucketVersioning: getBucketVersioning,
  putBucketReplication: putBucketReplication,
  // BucketReplication
  getBucketReplication: getBucketReplication,
  deleteBucketReplication: deleteBucketReplication,
  putBucketWebsite: putBucketWebsite,
  // BucketWebsite
  getBucketWebsite: getBucketWebsite,
  deleteBucketWebsite: deleteBucketWebsite,
  putBucketReferer: putBucketReferer,
  // BucketReferer
  getBucketReferer: getBucketReferer,
  putBucketDomain: putBucketDomain,
  // BucketDomain
  getBucketDomain: getBucketDomain,
  deleteBucketDomain: deleteBucketDomain,
  putBucketOrigin: putBucketOrigin,
  // BucketOrigin
  getBucketOrigin: getBucketOrigin,
  deleteBucketOrigin: deleteBucketOrigin,
  putBucketLogging: putBucketLogging,
  // BucketLogging
  getBucketLogging: getBucketLogging,
  putBucketInventory: putBucketInventory,
  // BucketInventory
  getBucketInventory: getBucketInventory,
  listBucketInventory: listBucketInventory,
  deleteBucketInventory: deleteBucketInventory,
  putBucketAccelerate: putBucketAccelerate,
  getBucketAccelerate: getBucketAccelerate,
  putBucketEncryption: putBucketEncryption,
  getBucketEncryption: getBucketEncryption,
  deleteBucketEncryption: deleteBucketEncryption,
  // Object ????????????
  getObject: getObject,
  headObject: headObject,
  listObjectVersions: listObjectVersions,
  putObject: putObject,
  deleteObject: deleteObject,
  getObjectAcl: getObjectAcl,
  putObjectAcl: putObjectAcl,
  optionsObject: optionsObject,
  putObjectCopy: putObjectCopy,
  deleteMultipleObject: deleteMultipleObject,
  restoreObject: restoreObject,
  putObjectTagging: putObjectTagging,
  getObjectTagging: getObjectTagging,
  deleteObjectTagging: deleteObjectTagging,
  selectObjectContent: selectObjectContent,
  appendObject: appendObject,
  // ????????????????????????
  uploadPartCopy: uploadPartCopy,
  multipartInit: multipartInit,
  multipartUpload: multipartUpload,
  multipartComplete: multipartComplete,
  multipartList: multipartList,
  multipartListPart: multipartListPart,
  multipartAbort: multipartAbort,
  // ????????????
  request: request,
  getObjectUrl: getObjectUrl,
  getAuth: getAuth
};

function warnOldApi(apiName, fn, proto) {
  util.each(['Cors', 'Acl'], function (suffix) {
    if (apiName.slice(-suffix.length) === suffix) {
      var oldName = apiName.slice(0, -suffix.length) + suffix.toUpperCase();
      var apiFn = util.apiWrapper(apiName, fn);
      var warned = false;

      proto[oldName] = function () {
        !warned && console.warn('warning: cos.' + oldName + ' has been deprecated. Please Use cos.' + apiName + ' instead.');
        warned = true;
        apiFn.apply(this, arguments);
      };
    }
  });
}

module.exports.init = function (COS, task) {
  task.transferToTaskMethod(API_MAP, 'putObject');
  util.each(API_MAP, function (fn, apiName) {
    COS.prototype[apiName] = util.apiWrapper(apiName, fn);
    warnOldApi(apiName, fn, COS.prototype);
  });
};

/***/ }),

/***/ "./src/cos.js":
/*!********************!*\
  !*** ./src/cos.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var util = __webpack_require__(/*! ./util */ "./src/util.js");

var event = __webpack_require__(/*! ./event */ "./src/event.js");

var task = __webpack_require__(/*! ./task */ "./src/task.js");

var base = __webpack_require__(/*! ./base */ "./src/base.js");

var advance = __webpack_require__(/*! ./advance */ "./src/advance.js");

var pkg = __webpack_require__(/*! ../package.json */ "./package.json");

var defaultOptions = {
  AppId: '',
  // AppId ???????????????????????? Bucket ?????????????????????test-1250000000
  SecretId: '',
  SecretKey: '',
  SecurityToken: '',
  // ?????????????????????????????????????????? Token
  ChunkRetryTimes: 2,
  FileParallelLimit: 3,
  ChunkParallelLimit: 3,
  ChunkSize: 1024 * 1024,
  SliceSize: 1024 * 1024,
  CopyChunkParallelLimit: 20,
  CopyChunkSize: 1024 * 1024 * 10,
  CopySliceSize: 1024 * 1024 * 10,
  MaxPartNumber: 10000,
  ProgressInterval: 1000,
  Domain: '',
  ServiceDomain: '',
  Protocol: '',
  CompatibilityMode: false,
  ForcePathStyle: false,
  UseRawKey: false,
  Timeout: 0,
  // ???????????????0 ???????????????????????????
  CorrectClockSkew: true,
  SystemClockOffset: 0,
  // ???????????????ms
  UploadCheckContentMd5: false,
  UploadQueueSize: 10000,
  UploadAddMetaMd5: false,
  UploadIdCacheLimit: 50,
  UseAccelerate: false,
  ForceSignHost: true,
  // ?????????host????????????????????????????????????????????????????????????????????????true
  EnableTracker: false,
  // ??????????????????
  DeepTracker: false,
  // ???????????????????????????????????????????????????
  TrackerDelay: 5000,
  // ?????????????????????????????????0??????????????????
  CustomId: '' // ???????????????id

}; // ??????????????????

var COS = function COS(options) {
  this.options = util.extend(util.clone(defaultOptions), options || {});
  this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit);
  this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit);
  this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes);
  this.options.ChunkSize = Math.max(1024 * 1024, this.options.ChunkSize);
  this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit);
  this.options.CopyChunkSize = Math.max(1024 * 1024, this.options.CopyChunkSize);
  this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize);
  this.options.MaxPartNumber = Math.max(1024, Math.min(10000, this.options.MaxPartNumber));
  this.options.Timeout = Math.max(0, this.options.Timeout);

  if (this.options.AppId) {
    console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
  }

  if (this.options.SecretId && this.options.SecretId.indexOf(' ') > -1) {
    console.error('error: SecretId????????????????????????');
    console.error('error: SecretId format is incorrect. Please check');
  }

  if (this.options.SecretKey && this.options.SecretKey.indexOf(' ') > -1) {
    console.error('error: SecretKey????????????????????????');
    console.error('error: SecretKey format is incorrect. Please check');
  }

  if (util.isNode()) {
    console.warn('warning: cos-js-sdk-v5 ????????? nodejs ???????????????????????? cos-nodejs-sdk-v5?????????????????? https://cloud.tencent.com/document/product/436/8629');
    console.warn('warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629');
  }

  event.init(this);
  task.init(this);
};

base.init(COS, task);
advance.init(COS, task);
COS.util = {
  md5: util.md5,
  xml2json: util.xml2json,
  json2xml: util.json2xml
};
COS.getAuthorization = util.getAuth;
COS.version = pkg.version;
module.exports = COS;

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var initEvent = function initEvent(cos) {
  var listeners = {};

  var getList = function getList(action) {
    !listeners[action] && (listeners[action] = []);
    return listeners[action];
  };

  cos.on = function (action, callback) {
    if (action === 'task-list-update') {
      console.warn('warning: Event "' + action + '" has been deprecated. Please use "list-update" instead.');
    }

    getList(action).push(callback);
  };

  cos.off = function (action, callback) {
    var list = getList(action);

    for (var i = list.length - 1; i >= 0; i--) {
      callback === list[i] && list.splice(i, 1);
    }
  };

  cos.emit = function (action, data) {
    var list = getList(action).map(function (cb) {
      return cb;
    });

    for (var i = 0; i < list.length; i++) {
      list[i](data);
    }
  };
};

var EventProxy = function EventProxy() {
  initEvent(this);
};

module.exports.init = initEvent;
module.exports.EventProxy = EventProxy;

/***/ }),

/***/ "./src/session.js":
/*!************************!*\
  !*** ./src/session.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "./src/util.js"); // ?????????????????????????????? UploadId


var cacheKey = 'cos_sdk_upload_cache';
var expires = 30 * 24 * 3600;
var cache;
var timer;

var getCache = function getCache() {
  try {
    var val = JSON.parse(localStorage.getItem(cacheKey));
  } catch (e) {}

  if (!val) val = [];
  cache = val;
};

var setCache = function setCache() {
  try {
    if (cache.length) localStorage.setItem(cacheKey, JSON.stringify(cache));else localStorage.removeItem(cacheKey);
  } catch (e) {}
};

var init = function init() {
  if (cache) return;
  getCache.call(this); // ????????????????????????

  var changed = false;
  var now = Math.round(Date.now() / 1000);

  for (var i = cache.length - 1; i >= 0; i--) {
    var mtime = cache[i][2];

    if (!mtime || mtime + expires < now) {
      cache.splice(i, 1);
      changed = true;
    }
  }

  changed && setCache();
}; // ?????????????????????


var save = function save() {
  if (timer) return;
  timer = setTimeout(function () {
    setCache();
    timer = null;
  }, 400);
};

var mod = {
  using: {},
  // ?????? UploadId ????????????
  setUsing: function setUsing(uuid) {
    mod.using[uuid] = true;
  },
  // ?????? UploadId ??????????????????
  removeUsing: function removeUsing(uuid) {
    delete mod.using[uuid];
  },
  // ??????????????????????????????
  getFileId: function getFileId(file, ChunkSize, Bucket, Key) {
    if (file.name && file.size && file.lastModifiedDate && ChunkSize) {
      return util.md5([file.name, file.size, file.lastModifiedDate, ChunkSize, Bucket, Key].join('::'));
    } else {
      return null;
    }
  },
  // ??????????????????????????????
  getCopyFileId: function getCopyFileId(copySource, sourceHeaders, ChunkSize, Bucket, Key) {
    var size = sourceHeaders['content-length'];
    var etag = sourceHeaders.etag || '';
    var lastModified = sourceHeaders['last-modified'];

    if (copySource && ChunkSize) {
      return util.md5([copySource, size, etag, lastModified, ChunkSize, Bucket, Key].join('::'));
    } else {
      return null;
    }
  },
  // ????????????????????? UploadId ??????
  getUploadIdList: function getUploadIdList(uuid) {
    if (!uuid) return null;
    init.call(this);
    var list = [];

    for (var i = 0; i < cache.length; i++) {
      if (cache[i][0] === uuid) list.push(cache[i][1]);
    }

    return list.length ? list : null;
  },
  // ?????? UploadId
  saveUploadId: function saveUploadId(uuid, UploadId, limit) {
    init.call(this);
    if (!uuid) return; // ??????????????? UploadId???js ???????????? FilePath ????????????????????????

    for (var i = cache.length - 1; i >= 0; i--) {
      var item = cache[i];

      if (item[0] === uuid && item[1] === UploadId) {
        cache.splice(i, 1);
      }
    }

    cache.unshift([uuid, UploadId, Math.round(Date.now() / 1000)]);
    if (cache.length > limit) cache.splice(limit);
    save();
  },
  // UploadId ?????????????????????
  removeUploadId: function removeUploadId(UploadId) {
    init.call(this);
    delete mod.using[UploadId];

    for (var i = cache.length - 1; i >= 0; i--) {
      if (cache[i][1] === UploadId) cache.splice(i, 1);
    }

    save();
  }
};
module.exports = mod;

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var session = __webpack_require__(/*! ./session */ "./src/session.js");

var util = __webpack_require__(/*! ./util */ "./src/util.js");

var originApiMap = {};

var transferToTaskMethod = function transferToTaskMethod(apiMap, apiName) {
  originApiMap[apiName] = apiMap[apiName];

  apiMap[apiName] = function (params, callback) {
    if (params.SkipTask) {
      originApiMap[apiName].call(this, params, callback);
    } else {
      this._addTask(apiName, params, callback);
    }
  };
};

var initTask = function initTask(cos) {
  var queue = [];
  var tasks = {};
  var uploadingFileCount = 0;
  var nextUploadIndex = 0; // ?????????????????????????????????

  var formatTask = function formatTask(task) {
    var t = {
      id: task.id,
      Bucket: task.Bucket,
      Region: task.Region,
      Key: task.Key,
      FilePath: task.FilePath,
      state: task.state,
      loaded: task.loaded,
      size: task.size,
      speed: task.speed,
      percent: task.percent,
      hashPercent: task.hashPercent,
      error: task.error
    };
    if (task.FilePath) t.FilePath = task.FilePath;
    if (task._custom) t._custom = task._custom; // ???????????????

    return t;
  };

  var emitListUpdate = function () {
    var timer;

    var emit = function emit() {
      timer = 0;
      cos.emit('task-list-update', {
        list: util.map(queue, formatTask)
      });
      cos.emit('list-update', {
        list: util.map(queue, formatTask)
      });
    };

    return function () {
      if (!timer) timer = setTimeout(emit);
    };
  }();

  var clearQueue = function clearQueue() {
    if (queue.length <= cos.options.UploadQueueSize) return;

    for (var i = 0; i < nextUploadIndex && // ????????????????????? index ?????????
    i < queue.length && // ?????????????????????
    queue.length > cos.options.UploadQueueSize // ?????????????????????????????????
    ;) {
      var isActive = queue[i].state === 'waiting' || queue[i].state === 'checking' || queue[i].state === 'uploading';

      if (!queue[i] || !isActive) {
        tasks[queue[i].id] && delete tasks[queue[i].id];
        queue.splice(i, 1);
        nextUploadIndex--;
      } else {
        i++;
      }
    }

    emitListUpdate();
  };

  var startNextTask = function startNextTask() {
    // ????????????????????????????????????
    if (uploadingFileCount >= cos.options.FileParallelLimit) return; // ???????????????????????????

    while (queue[nextUploadIndex] && queue[nextUploadIndex].state !== 'waiting') {
      nextUploadIndex++;
    } // ???????????????????????????


    if (nextUploadIndex >= queue.length) return; // ???????????????????????????

    var task = queue[nextUploadIndex];
    nextUploadIndex++;
    uploadingFileCount++;
    task.state = 'checking';
    task.params.onTaskStart && task.params.onTaskStart(formatTask(task));
    !task.params.UploadData && (task.params.UploadData = {});
    var apiParams = util.formatParams(task.api, task.params);
    originApiMap[task.api].call(cos, apiParams, function (err, data) {
      if (!cos._isRunningTask(task.id)) return;

      if (task.state === 'checking' || task.state === 'uploading') {
        task.state = err ? 'error' : 'success';
        err && (task.error = err);
        uploadingFileCount--;
        emitListUpdate();
        startNextTask();
        task.callback && task.callback(err, data);

        if (task.state === 'success') {
          if (task.params) {
            delete task.params.UploadData;
            delete task.params.Body;
            delete task.params;
          }

          delete task.callback;
        }
      }

      clearQueue();
    });
    emitListUpdate(); // ???????????????????????????

    setTimeout(startNextTask);
  };

  var killTask = function killTask(id, switchToState) {
    var task = tasks[id];
    if (!task) return;
    var waiting = task && task.state === 'waiting';
    var running = task && (task.state === 'checking' || task.state === 'uploading');

    if (switchToState === 'canceled' && task.state !== 'canceled' || switchToState === 'paused' && waiting || switchToState === 'paused' && running) {
      if (switchToState === 'paused' && task.params.Body && typeof task.params.Body.pipe === 'function') {
        console.error('stream not support pause');
        return;
      }

      task.state = switchToState;
      cos.emit('inner-kill-task', {
        TaskId: id,
        toState: switchToState
      });

      try {
        var UploadId = task && task.params && task.params.UploadData.UploadId;
      } catch (e) {}

      if (switchToState === 'canceled' && UploadId) session.removeUsing(UploadId);
      emitListUpdate();

      if (running) {
        uploadingFileCount--;
        startNextTask();
      }

      if (switchToState === 'canceled') {
        if (task.params) {
          delete task.params.UploadData;
          delete task.params.Body;
          delete task.params;
        }

        delete task.callback;
      }
    }

    clearQueue();
  };

  cos._addTasks = function (taskList) {
    util.each(taskList, function (task) {
      cos._addTask(task.api, task.params, task.callback, true);
    });
    emitListUpdate();
  };

  var isTaskReadyWarning = true;

  cos._addTask = function (api, params, callback, ignoreAddEvent) {
    // ??????????????????
    params = util.formatParams(api, params); // ?????? id

    var id = util.uuid();
    params.TaskId = id;
    params.onTaskReady && params.onTaskReady(id);

    if (params.TaskReady) {
      params.TaskReady(id);
      isTaskReadyWarning && console.warn('warning: Param "TaskReady" has been deprecated. Please use "onTaskReady" instead.');
      isTaskReadyWarning = false;
    }

    var task = {
      // env
      params: params,
      callback: callback,
      api: api,
      index: queue.length,
      // task
      id: id,
      Bucket: params.Bucket,
      Region: params.Region,
      Key: params.Key,
      FilePath: params.FilePath || '',
      state: 'waiting',
      loaded: 0,
      size: 0,
      speed: 0,
      percent: 0,
      hashPercent: 0,
      error: null,
      _custom: params._custom
    };
    var onHashProgress = params.onHashProgress;

    params.onHashProgress = function (info) {
      if (!cos._isRunningTask(task.id)) return;
      task.hashPercent = info.percent;
      onHashProgress && onHashProgress(info);
      emitListUpdate();
    };

    var onProgress = params.onProgress;

    params.onProgress = function (info) {
      if (!cos._isRunningTask(task.id)) return;
      task.state === 'checking' && (task.state = 'uploading');
      task.loaded = info.loaded;
      task.speed = info.speed;
      task.percent = info.percent;
      onProgress && onProgress(info);
      emitListUpdate();
    }; // ???????????? filesize


    util.getFileSize(api, params, function (err, size) {
      // ??????????????????
      if (err) return callback(util.error(err)); // ??????????????????????????????????????????
      // ?????????????????????????????????????????????

      tasks[id] = task;
      queue.push(task);
      task.size = size;
      !ignoreAddEvent && emitListUpdate();
      startNextTask();
      clearQueue();
    });
    return id;
  };

  cos._isRunningTask = function (id) {
    var task = tasks[id];
    return !!(task && (task.state === 'checking' || task.state === 'uploading'));
  };

  cos.getTaskList = function () {
    return util.map(queue, formatTask);
  };

  cos.cancelTask = function (id) {
    killTask(id, 'canceled');
  };

  cos.pauseTask = function (id) {
    killTask(id, 'paused');
  };

  cos.restartTask = function (id) {
    var task = tasks[id];

    if (task && (task.state === 'paused' || task.state === 'error')) {
      task.state = 'waiting';
      emitListUpdate();
      nextUploadIndex = Math.min(nextUploadIndex, task.index);
      startNextTask();
    }
  };

  cos.isUploadRunning = function () {
    return uploadingFileCount || nextUploadIndex < queue.length;
  };
};

module.exports.transferToTaskMethod = transferToTaskMethod;
module.exports.init = initTask;

/***/ }),

/***/ "./src/tracker.js":
/*!************************!*\
  !*** ./src/tracker.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");

var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var pkg = __webpack_require__(/*! ../package.json */ "./package.json");

var beacon = null;

var getBeacon = function getBeacon(delay) {
  if (!beacon) {
    // ????????????????????????????????????????????????????????????????????????????????????webworker???????????????sdk???window??????????????????
    var BeaconAction = __webpack_require__(/*! ../lib/beacon.min */ "./lib/beacon.min.js");

    beacon = new BeaconAction({
      appkey: "0AND0VEVB24UBGDU",
      versionCode: pkg.version,
      channelID: 'js_sdk',
      //??????,??????
      openid: 'openid',
      // ??????id, ??????
      unionid: 'unid',
      //??????unionid , ??????idfv,??????
      strictMode: false,
      //??????????????????, ???????????????????????????????????????, ?????????????????????!!!
      delay: delay,
      // ??????????????????????????????(????????????), ??????1000(1???),??????
      sessionDuration: 60 * 1000 // session?????????????????????, ??????????????????30??????(?????????)????????????????????????????????? session,???????????????session????????????????????????(rqd_applaunched),????????????(ms),?????????30???,??????

    });
  }

  return beacon;
};

var utils = {
  // ??????uid ??????????????????????????????uid
  getUid: function getUid() {
    var S4 = function S4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };

    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  },
  // ??????????????????
  getNetType: function getNetType() {
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object') {
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return (connection === null || connection === void 0 ? void 0 : connection.type) || (connection === null || connection === void 0 ? void 0 : connection.effectiveType) || 'unknown';
    }

    return 'unknown';
  },
  // ??????pc?????????????????????
  getOsType: function getOsType() {
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
      return 'unknown os';
    }

    var agent = navigator.userAgent.toLowerCase();
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);

    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
      return 'win32';
    }

    if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
      return 'win64';
    }

    if (isMac) {
      return 'mac';
    }

    return 'unknown os';
  },
  isMobile: function isMobile() {
    var exp = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.userAgent.match(exp)) {
      return true; // ?????????
    }

    return false; // PC???
  },
  isAndroid: function isAndroid() {
    var exp = /(Android|Adr|Linux)/i;

    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.userAgent.match(exp)) {
      return true;
    }

    return false;
  },
  isIOS: function isIOS() {
    var exp = /(iPhone|iPod|iPad|iOS)/i;

    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.userAgent.match(exp)) {
      return true;
    }

    return false;
  },
  isOtherMobile: function isOtherMobile() {
    return isMobile && !isAndroid && !isIOS;
  },
  // ?????????????????????
  getDeviceName: function getDeviceName() {
    if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
      return 'unknown device';
    }

    var explorer = navigator.userAgent.toLowerCase(); // ???????????????????????????

    if (explorer.includes('app/tencent_wemeet')) {
      return 'tencent_wemeet';
    } // ???????????????


    if (explorer.indexOf('maxthon') >= 0) {
      var match = explorer.match(/maxthon\/([\d.]+)/);
      var ver = match && match[1] || '';
      return "\u50B2\u6E38\u6D4F\u89C8\u5668 ".concat(ver).trim();
    } // QQ?????????


    if (explorer.indexOf('qqbrowser') >= 0) {
      var _match = explorer.match(/qqbrowser\/([\d.]+)/);

      var _ver = _match && _match[1] || '';

      return "QQ\u6D4F\u89C8\u5668 ".concat(_ver).trim();
    } // ???????????????


    if (explorer.indexOf('se 2.x') >= 0) {
      return '???????????????';
    } // ???????????????


    if (explorer.indexOf('wxwork') >= 0) {
      return '?????????????????????';
    } // ie


    if (explorer.indexOf('msie') >= 0) {
      var _match2 = explorer.match(/msie ([\d.]+)/);

      var _ver2 = _match2 && _match2[1] || '';

      return "IE ".concat(_ver2).trim();
    } // firefox


    if (explorer.indexOf('firefox') >= 0) {
      var _match3 = explorer.match(/firefox\/([\d.]+)/);

      var _ver3 = _match3 && _match3[1] || '';

      return "Firefox ".concat(_ver3).trim();
    } // Chrome


    if (explorer.indexOf('chrome') >= 0) {
      var _match4 = explorer.match(/chrome\/([\d.]+)/);

      var _ver4 = _match4 && _match4[1] || '';

      return "Chrome ".concat(_ver4).trim();
    } // Opera


    if (explorer.indexOf('opera') >= 0) {
      var _match5 = explorer.match(/opera.([\d.]+)/);

      var _ver5 = _match5 && _match5[1] || '';

      return "Opera ".concat(_ver5).trim();
    } // Safari


    if (explorer.indexOf('safari') >= 0) {
      var _match6 = explorer.match(/version\/([\d.]+)/);

      var _ver6 = _match6 && _match6[1] || '';

      return "Safari ".concat(_ver6).trim();
    }

    if (explorer.indexOf('edge') >= 0) {
      var _match7 = explorer.match(/edge\/([\d.]+)/);

      var _ver7 = _match7 && _match7[1] || '';

      return "edge ".concat(_ver7).trim();
    }

    return explorer.substr(0, 200);
  }
};
var constant = {
  isMobile: utils.isMobile(),
  isBrowser: !utils.isMobile(),
  mobileOsType: utils.isAndroid() ? 'android' : utils.isIOS ? 'ios' : 'other_mobile',
  pcOsType: utils.getOsType()
}; // ??????????????????????????????

var deviceInfo = {
  // ????????????
  deviceType: constant.isMobile ? 'mobile' : constant.isBrowser ? 'browser' : 'unknown',
  devicePlatform: constant.isMobile ? constant.mobileOsType : constant.pcOsType,
  deviceName: utils.getDeviceName() //???????????????

}; // ????????????????????????

var sliceUploadMethods = ['multipartInit', 'multipartUpload', 'multipartComplete', 'multipartList', 'multipartListPart', 'multipartAbort'];
var uploadApi = ['putObject', 'postObject', 'appendObject', 'sliceUploadFile', 'uploadFile', 'uploadFiles'].concat(sliceUploadMethods);
var downloadApi = ['getObject'];

function getEventCode(apiName) {
  if (uploadApi.includes(apiName)) {
    return 'cos_upload';
  }

  if (downloadApi.includes(apiName)) {
    return 'cos_download';
  }

  return 'base_service';
} // ??????????????????????????????


function camel2underline(key) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function formatParams(params) {
  var formattedParams = {};
  var allReporterKeys = ['tracePlatform', 'cossdkVersion', 'region', 'networkType', 'host', 'accelerate', 'requestPath', 'size', 'httpMd5', 'httpSign', 'httpFull', 'name', 'result', 'tookTime', 'errorNode', 'errorCode', 'errorMessage', 'errorRequestId', 'errorStatusCode', 'errorServiceName', 'errorType', 'traceId', 'bucket', 'appid', 'partNumber', 'retryTimes', 'reqUrl', 'customId', 'fullError', 'deviceType', 'devicePlatform', 'deviceName'];
  var successKeys = ['tracePlatform', 'cossdkVersion', 'region', 'bucket', 'appid', 'networkType', 'host', 'accelerate', 'requestPath', 'partNumber', 'size', 'name', 'result', 'tookTime', 'errorRequestId', 'retryTimes', 'reqUrl', 'customId', 'deviceType', 'devicePlatform', 'deviceName']; // ???????????????????????????

  var reporterKeys = params.result === 'Success' ? successKeys : allReporterKeys;

  for (var key in params) {
    if (!reporterKeys.includes(key)) continue;
    var formattedKey = camel2underline(key);
    formattedParams[formattedKey] = params[key];
  }

  return formattedParams;
} // ???????????????


var Tracker = /*#__PURE__*/function () {

  function Tracker(opt) {
    _classCallCheck(this, Tracker);

    var parent = opt.parent,
        traceId = opt.traceId,
        bucket = opt.bucket,
        region = opt.region,
        apiName = opt.apiName,
        fileKey = opt.fileKey,
        fileSize = opt.fileSize,
        accelerate = opt.accelerate,
        customId = opt.customId,
        delay = opt.delay,
        deepTracker = opt.deepTracker;
    var appid = bucket && bucket.substr(bucket.lastIndexOf('-') + 1) || '';
    this.parent = parent;
    this.deepTracker = deepTracker;
    this.delay = delay; // ?????????????????????

    this.params = {
      // ????????????
      cossdkVersion: pkg.version,
      region: region,
      networkType: '',
      host: '',
      accelerate: accelerate ? 'Y' : 'N',
      requestPath: fileKey || '',
      size: fileSize || -1,
      httpMd5: 0,
      // MD5??????
      httpSign: 0,
      // ??????????????????
      httpFull: 0,
      // http????????????
      name: apiName || '',
      result: '',
      // sdk api????????????Success???Fail
      tookTime: 0,
      // ?????????
      errorNode: '',
      errorCode: '',
      errorMessage: '',
      errorRequestId: '',
      errorStatusCode: 0,
      errorServiceName: '',
      // js????????????
      tracePlatform: 'cos-js-sdk-v5',
      // ????????????=js
      traceId: traceId || utils.getUid(),
      // ????????????????????????
      bucket: bucket,
      appid: appid,
      partNumber: 0,
      // ??????????????????
      retryTimes: 0,
      // sdk???????????????????????????
      reqUrl: '',
      // ??????url
      customId: customId || '',
      // ??????id
      deviceType: deviceInfo.deviceType,
      // ???????????? ?????????????????????web?????????
      devicePlatform: deviceInfo.devicePlatform,
      deviceName: deviceInfo.deviceName,
      md5StartTime: 0,
      // md5??????????????????
      md5EndTime: 0,
      // md5??????????????????
      signStartTime: 0,
      // ????????????????????????
      signEndTime: 0,
      // ????????????????????????
      httpStartTime: 0,
      // ??????????????????????????????
      httpEndTime: 0,
      // ????????????????????????
      startTime: new Date().getTime(),
      // sdk api??????????????????????????????????????????
      endTime: 0 //  sdk api??????????????????????????????????????????

    };
    this.beacon = getBeacon(delay);
  } // ?????????sdk??????


  _createClass(Tracker, [{
    key: "formatResult",
    value: function formatResult(err, data) {
      var _err$error, _err$error2, _err$error3, _err$error4, _err$error5, _err$error6;

      var now = new Date().getTime();
      var tookTime = now - this.params.startTime;
      var networkType = utils.getNetType();
      var errorCode = err ? (err === null || err === void 0 ? void 0 : err.code) || (err === null || err === void 0 ? void 0 : (_err$error = err.error) === null || _err$error === void 0 ? void 0 : _err$error.code) || (err === null || err === void 0 ? void 0 : (_err$error2 = err.error) === null || _err$error2 === void 0 ? void 0 : _err$error2.Code) : '';
      var errorMessage = err ? (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : (_err$error3 = err.error) === null || _err$error3 === void 0 ? void 0 : _err$error3.message) || (err === null || err === void 0 ? void 0 : (_err$error4 = err.error) === null || _err$error4 === void 0 ? void 0 : _err$error4.Message) : '';
      var errorServiceName = err ? (err === null || err === void 0 ? void 0 : err.resource) || (err === null || err === void 0 ? void 0 : (_err$error5 = err.error) === null || _err$error5 === void 0 ? void 0 : _err$error5.resource) || (err === null || err === void 0 ? void 0 : (_err$error6 = err.error) === null || _err$error6 === void 0 ? void 0 : _err$error6.Resource) : '';
      var errorStatusCode = err ? err === null || err === void 0 ? void 0 : err.statusCode : data.statusCode;
      var requestId = err ? (err === null || err === void 0 ? void 0 : err.headers) && (err === null || err === void 0 ? void 0 : err.headers['x-cos-request-id']) : (data === null || data === void 0 ? void 0 : data.headers) && (data === null || data === void 0 ? void 0 : data.headers['x-cos-request-id']);
      var errorType = err ? requestId ? 'Server' : 'Client' : '';
      Object.assign(this.params, {
        tookTime: tookTime,
        networkType: networkType,
        httpMd5: this.params.md5EndTime - this.params.md5StartTime,
        httpSign: this.params.signEndTime - this.params.signStartTime,
        httpFull: this.params.httpEndTime - this.params.httpStartTime,
        result: err ? 'Fail' : 'Success',
        errorType: errorType,
        errorCode: errorCode,
        errorStatusCode: errorStatusCode,
        errorMessage: errorMessage,
        errorServiceName: errorServiceName,
        errorRequestId: requestId
      });

      if (err && (!errorCode || !errorMessage)) {
        // ????????????err???????????? ??????????????????err?????????????????????
        this.params.fullError = err ? JSON.stringify(err) : '';
      }

      if (this.params.name === 'getObject') {
        this.params.size = data ? data.headers && data.headers['content-length'] : -1;
      }

      if (this.params.reqUrl) {
        try {
          var execRes = /^http(s)?:\/\/(.*?)\//.exec(this.params.reqUrl);
          this.params.host = execRes[2];
        } catch (e) {
          this.params.host = this.params.reqUrl;
        }
      }

      this.sendEvents();
    } // ???????????????????????????

  }, {
    key: "setParams",
    value: function setParams(params) {
      Object.assign(this.params, params);
    } // ????????????????????????

  }, {
    key: "sendEvents",
    value: function sendEvents() {
      // DeepTracker?????????????????????????????????????????????
      if (sliceUploadMethods.includes(this.params.name) && !this.deepTracker) {
        return;
      }

      var eventCode = getEventCode(this.params.name);
      var formattedParams = formatParams(this.params); // ????????????

      if (!this.beacon) {
        this.beacon = getBeacon(this.delay || 5000);
      }

      if (this.delay === 0) {
        // ????????????
        this.beacon && this.beacon.onDirectUserAction(eventCode, formattedParams);
      } else {
        // ???????????????
        this.beacon && this.beacon.onUserAction(eventCode, formattedParams);
      }
    } // ??????????????????????????????????????????????????????????????????????????????????????????????????????

  }, {
    key: "generateSubTracker",
    value: function generateSubTracker(subParams) {
      Object.assign(subParams, {
        parent: this,
        deepTracker: this.deepTracker,
        traceId: this.params.traceId,
        bucket: this.params.bucket,
        region: this.params.region,
        fileKey: this.params.requestPath,
        customId: this.params.customId,
        delay: this.delay
      });
      return new Tracker(subParams);
    }
  }]);

  return Tracker;
}();

module.exports = Tracker;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var md5 = __webpack_require__(/*! ../lib/md5 */ "./lib/md5.js");

var CryptoJS = __webpack_require__(/*! ../lib/crypto */ "./lib/crypto.js");

var xml2json = __webpack_require__(/*! ../lib/xml2json */ "./lib/xml2json.js");

var json2xml = __webpack_require__(/*! ../lib/json2xml */ "./lib/json2xml.js");

var Tracker = __webpack_require__(/*! ./tracker */ "./src/tracker.js");

function camSafeUrlEncode(str) {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

function getObjectKeys(obj, forKey) {
  var list = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      list.push(forKey ? camSafeUrlEncode(key).toLowerCase() : key);
    }
  }

  return list.sort(function (a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a === b ? 0 : a > b ? 1 : -1;
  });
}
/**
 * obj??????string
 * @param  {Object}  obj                ???????????????????????????
 * @param  {Boolean} lowerCaseKey       key???????????????????????????false????????????
 * @return {String}  data               ???????????????
 */

var obj2str = function obj2str(obj, lowerCaseKey) {
  var i, key, val;
  var list = [];
  var keyList = getObjectKeys(obj);

  for (i = 0; i < keyList.length; i++) {
    key = keyList[i];
    val = obj[key] === undefined || obj[key] === null ? '' : '' + obj[key];
    key = lowerCaseKey ? camSafeUrlEncode(key).toLowerCase() : camSafeUrlEncode(key);
    val = camSafeUrlEncode(val) || '';
    list.push(key + '=' + val);
  }

  return list.join('&');
}; // ?????????????????????headers


var signHeaders = ['cache-control', 'content-disposition', 'content-encoding', 'content-length', 'content-md5', 'expect', 'expires', 'host', 'if-match', 'if-modified-since', 'if-none-match', 'if-unmodified-since', 'origin', 'range', 'transfer-encoding'];

var getSignHeaderObj = function getSignHeaderObj(headers) {
  var signHeaderObj = {};

  for (var i in headers) {
    var key = i.toLowerCase();

    if (key.indexOf('x-cos-') > -1 || signHeaders.indexOf(key) > -1) {
      signHeaderObj[i] = headers[i];
    }
  }

  return signHeaderObj;
}; //????????????key??????????????????


var getAuth = function getAuth(opt) {
  opt = opt || {};
  var SecretId = opt.SecretId;
  var SecretKey = opt.SecretKey;
  var KeyTime = opt.KeyTime;
  var method = (opt.method || opt.Method || 'get').toLowerCase();
  var queryParams = clone(opt.Query || opt.params || {});
  var headers = getSignHeaderObj(clone(opt.Headers || opt.headers || {}));
  var Key = opt.Key || '';
  var pathname;

  if (opt.UseRawKey) {
    pathname = opt.Pathname || opt.pathname || '/' + Key;
  } else {
    pathname = opt.Pathname || opt.pathname || Key;
    pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);
  } // ForceSignHost????????????false????????????host??????


  var forceSignHost = opt.ForceSignHost === false ? false : true; // ????????????????????????????????????????????????????????????????????? Host ?????????????????????????????????

  if (!headers.Host && !headers.host && opt.Bucket && opt.Region && forceSignHost) headers.Host = opt.Bucket + '.cos.' + opt.Region + '.myqcloud.com';
  if (!SecretId) throw new Error('missing param SecretId');
  if (!SecretKey) throw new Error('missing param SecretKey'); // ????????????????????????

  var now = Math.round(getSkewTime(opt.SystemClockOffset) / 1000) - 1;
  var exp = now;
  var Expires = opt.Expires || opt.expires;

  if (Expires === undefined) {
    exp += 900; // ??????????????????????????? + 900s
  } else {
    exp += Expires * 1 || 0;
  } // ???????????? Authorization ????????????


  var qSignAlgorithm = 'sha1';
  var qAk = SecretId;
  var qSignTime = KeyTime || now + ';' + exp;
  var qKeyTime = KeyTime || now + ';' + exp;
  var qHeaderList = getObjectKeys(headers, true).join(';').toLowerCase();
  var qUrlParamList = getObjectKeys(queryParams, true).join(';').toLowerCase(); // ???????????????????????????https://www.qcloud.com/document/product/436/7778
  // ?????????????????? SignKey

  var signKey = CryptoJS.HmacSHA1(qKeyTime, SecretKey).toString(); // ?????????????????? FormatString

  var formatString = [method, pathname, util.obj2str(queryParams, true), util.obj2str(headers, true), ''].join('\n'); // ?????????????????? StringToSign

  var stringToSign = ['sha1', qSignTime, CryptoJS.SHA1(formatString).toString(), ''].join('\n'); // ?????????????????? Signature

  var qSignature = CryptoJS.HmacSHA1(stringToSign, signKey).toString(); // ?????????????????? Authorization

  var authorization = ['q-sign-algorithm=' + qSignAlgorithm, 'q-ak=' + qAk, 'q-sign-time=' + qSignTime, 'q-key-time=' + qKeyTime, 'q-header-list=' + qHeaderList, 'q-url-param-list=' + qUrlParamList, 'q-signature=' + qSignature].join('&');
  return authorization;
};

var readIntBE = function readIntBE(chunk, size, offset) {
  var bytes = size / 8;
  var buf = chunk.slice(offset, offset + bytes);
  new Uint8Array(buf).reverse();
  return new {
    8: Uint8Array,
    16: Uint16Array,
    32: Uint32Array
  }[size](buf)[0];
};

var buf2str = function buf2str(chunk, start, end, isUtf8) {
  var buf = chunk.slice(start, end);
  var str = '';
  new Uint8Array(buf).forEach(function (charCode) {
    str += String.fromCharCode(charCode);
  });
  if (isUtf8) str = decodeURIComponent(escape(str));
  return str;
};

var parseSelectPayload = function parseSelectPayload(chunk) {
  var header = {};
  var body = buf2str(chunk);
  var result = {
    records: []
  };

  while (chunk.byteLength) {
    var totalLength = readIntBE(chunk, 32, 0);
    var headerLength = readIntBE(chunk, 32, 4);
    var payloadRestLength = totalLength - headerLength - 16;
    var offset = 0;
    var content;
    chunk = chunk.slice(12); // ?????? Message ??? header ??????

    while (offset < headerLength) {
      var headerNameLength = readIntBE(chunk, 8, offset);
      var headerName = buf2str(chunk, offset + 1, offset + 1 + headerNameLength);
      var headerValueLength = readIntBE(chunk, 16, offset + headerNameLength + 2);
      var headerValue = buf2str(chunk, offset + headerNameLength + 4, offset + headerNameLength + 4 + headerValueLength);
      header[headerName] = headerValue;
      offset += headerNameLength + 4 + headerValueLength;
    }

    if (header[':event-type'] === 'Records') {
      content = buf2str(chunk, offset, offset + payloadRestLength, true);
      result.records.push(content);
    } else if (header[':event-type'] === 'Stats') {
      content = buf2str(chunk, offset, offset + payloadRestLength, true);
      result.stats = util.xml2json(content).Stats;
    } else if (header[':event-type'] === 'error') {
      var errCode = header[':error-code'];
      var errMessage = header[':error-message'];
      var err = new Error(errMessage);
      err.message = errMessage;
      err.name = err.code = errCode;
      result.error = err;
    } else if (['Progress', 'Continuation', 'End'].includes(header[':event-type'])) ;

    chunk = chunk.slice(offset + payloadRestLength + 4);
  }

  return {
    payload: result.records.join(''),
    body: body
  };
};

var getSourceParams = function getSourceParams(source) {
  var parser = this.options.CopySourceParser;
  if (parser) return parser(source);
  var m = source.match(/^([^.]+-\d+)\.cos(v6|-cdc|-cdz|-internal)?\.([^.]+)\.((myqcloud\.com)|(tencentcos\.cn))\/(.+)$/);
  if (!m) return null;
  return {
    Bucket: m[1],
    Region: m[3],
    Key: m[7]
  };
};

var noop = function noop() {}; // ???????????????????????? undefined ??? null ?????????


var clearKey = function clearKey(obj) {
  var retObj = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
      retObj[key] = obj[key];
    }
  }

  return retObj;
};

var readAsBinaryString = function readAsBinaryString(blob, callback) {
  var readFun;
  var fr = new FileReader();

  if (FileReader.prototype.readAsBinaryString) {
    readFun = FileReader.prototype.readAsBinaryString;

    fr.onload = function () {
      callback(this.result);
    };
  } else if (FileReader.prototype.readAsArrayBuffer) {
    // ??? ie11 ?????? readAsBinaryString ??????
    readFun = function readFun(fileData) {
      var binary = "";
      var reader = new FileReader();

      reader.onload = function (e) {
        var bytes = new Uint8Array(reader.result);
        var length = bytes.byteLength;

        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        callback(binary);
      };

      reader.readAsArrayBuffer(fileData);
    };
  } else {
    console.error('FileReader not support readAsBinaryString');
  }

  readFun.call(fr, blob);
};

var fileSliceNeedCopy = function () {
  var compareVersion = function compareVersion(a, b) {
    a = a.split('.');
    b = b.split('.');

    for (var i = 0; i < b.length; i++) {
      if (a[i] !== b[i]) {
        return parseInt(a[i]) > parseInt(b[i]) ? 1 : -1;
      }
    }

    return 0;
  };

  var check = function check(ua) {
    if (!ua) return false;
    var ChromeVersion = (ua.match(/Chrome\/([.\d]+)/) || [])[1];
    var QBCoreVersion = (ua.match(/QBCore\/([.\d]+)/) || [])[1];
    var QQBrowserVersion = (ua.match(/QQBrowser\/([.\d]+)/) || [])[1];
    var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0 && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0 && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;
    return need;
  };

  return check(typeof navigator !== 'undefined' && navigator.userAgent);
}(); // ??????????????????


var fileSlice = function fileSlice(file, start, end, isUseToUpload, callback) {
  var blob;

  if (file.slice) {
    blob = file.slice(start, end);
  } else if (file.mozSlice) {
    blob = file.mozSlice(start, end);
  } else if (file.webkitSlice) {
    blob = file.webkitSlice(start, end);
  }

  if (isUseToUpload && fileSliceNeedCopy) {
    var reader = new FileReader();

    reader.onload = function (e) {
      blob = null;
      callback(new Blob([reader.result]));
    };

    reader.readAsArrayBuffer(blob);
  } else {
    callback(blob);
  }
}; // ????????????????????? MD5


var getBodyMd5 = function getBodyMd5(UploadCheckContentMd5, Body, callback, onProgress) {
  callback = callback || noop;

  if (UploadCheckContentMd5) {
    if (typeof Body === 'string') {
      callback(util.md5(Body, true));
    } else if (Blob && Body instanceof Blob) {
      util.getFileMd5(Body, function (err, md5) {
        callback(md5);
      }, onProgress);
    } else {
      callback();
    }
  } else {
    callback();
  }
}; // ???????????? md5 ???


var md5ChunkSize = 1024 * 1024;

var getFileMd5 = function getFileMd5(blob, callback, onProgress) {
  var size = blob.size;
  var loaded = 0;
  var md5ctx = md5.getCtx();

  var next = function next(start) {
    if (start >= size) {
      var hash = md5ctx.digest('hex');
      callback(null, hash);
      return;
    }

    var end = Math.min(size, start + md5ChunkSize);
    util.fileSlice(blob, start, end, false, function (chunk) {
      readAsBinaryString(chunk, function (content) {
        chunk = null;
        md5ctx = md5ctx.update(content, true);
        loaded += content.length;
        content = null;
        if (onProgress) onProgress({
          loaded: loaded,
          total: size,
          percent: Math.round(loaded / size * 10000) / 10000
        });
        next(start + md5ChunkSize);
      });
    });
  };

  next(0);
};

function clone(obj) {
  return map(obj, function (v) {
    return _typeof(v) === 'object' && v !== null ? clone(v) : v;
  });
}

function attr(obj, name, defaultValue) {
  return obj && name in obj ? obj[name] : defaultValue;
}

function extend(target, source) {
  each(source, function (val, key) {
    target[key] = source[key];
  });
  return target;
}

function isArray(arr) {
  return arr instanceof Array;
}

function isInArray(arr, item) {
  var flag = false;

  for (var i = 0; i < arr.length; i++) {
    if (item === arr[i]) {
      flag = true;
      break;
    }
  }

  return flag;
}

function makeArray(arr) {
  return isArray(arr) ? arr : [arr];
}

function each(obj, fn) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn(obj[i], i);
    }
  }
}

function map(obj, fn) {
  var o = isArray(obj) ? [] : {};

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = fn(obj[i], i);
    }
  }

  return o;
}

function filter(obj, fn) {
  var iaArr = isArray(obj);
  var o = iaArr ? [] : {};

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (fn(obj[i], i)) {
        if (iaArr) {
          o.push(obj[i]);
        } else {
          o[i] = obj[i];
        }
      }
    }
  }

  return o;
}

var binaryBase64 = function binaryBase64(str) {
  var i,
      len,
      char,
      res = '';

  for (i = 0, len = str.length / 2; i < len; i++) {
    char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
    res += String.fromCharCode(char);
  }

  return btoa(res);
};

var uuid = function uuid() {
  var S4 = function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

var hasMissingParams = function hasMissingParams(apiName, params) {
  var Bucket = params.Bucket;
  var Region = params.Region;
  var Key = params.Key;
  var Domain = this.options.Domain;
  var checkBucket = !Domain || typeof Domain === 'string' && Domain.indexOf('{Bucket}') > -1;
  var checkRegion = !Domain || typeof Domain === 'string' && Domain.indexOf('{Region}') > -1;

  if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {
    if (checkBucket && !Bucket) return 'Bucket';
    if (checkRegion && !Region) return 'Region';
  } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {
    if (checkBucket && !Bucket) return 'Bucket';
    if (checkRegion && !Region) return 'Region';
    if (!Key) return 'Key';
  }

  return false;
};

var formatParams = function formatParams(apiName, params) {
  // ??????????????????
  params = extend({}, params); // ???????????? Headers

  if (apiName !== 'getAuth' && apiName !== 'getV4Auth' && apiName !== 'getObjectUrl') {
    var Headers = params.Headers || {};

    if (params && _typeof(params) === 'object') {
      (function () {
        for (var key in params) {
          if (params.hasOwnProperty(key) && key.indexOf('x-cos-') > -1) {
            Headers[key] = params[key];
          }
        }
      })();

      var headerMap = {
        // params headers
        'x-cos-mfa': 'MFA',
        'Content-MD5': 'ContentMD5',
        'Content-Length': 'ContentLength',
        'Content-Type': 'ContentType',
        'Expect': 'Expect',
        'Expires': 'Expires',
        'Cache-Control': 'CacheControl',
        'Content-Disposition': 'ContentDisposition',
        'Content-Encoding': 'ContentEncoding',
        'Range': 'Range',
        'If-Modified-Since': 'IfModifiedSince',
        'If-Unmodified-Since': 'IfUnmodifiedSince',
        'If-Match': 'IfMatch',
        'If-None-Match': 'IfNoneMatch',
        'x-cos-copy-source': 'CopySource',
        'x-cos-copy-source-Range': 'CopySourceRange',
        'x-cos-metadata-directive': 'MetadataDirective',
        'x-cos-copy-source-If-Modified-Since': 'CopySourceIfModifiedSince',
        'x-cos-copy-source-If-Unmodified-Since': 'CopySourceIfUnmodifiedSince',
        'x-cos-copy-source-If-Match': 'CopySourceIfMatch',
        'x-cos-copy-source-If-None-Match': 'CopySourceIfNoneMatch',
        'x-cos-acl': 'ACL',
        'x-cos-grant-read': 'GrantRead',
        'x-cos-grant-write': 'GrantWrite',
        'x-cos-grant-full-control': 'GrantFullControl',
        'x-cos-grant-read-acp': 'GrantReadAcp',
        'x-cos-grant-write-acp': 'GrantWriteAcp',
        'x-cos-storage-class': 'StorageClass',
        'x-cos-traffic-limit': 'TrafficLimit',
        'x-cos-mime-limit': 'MimeLimit',
        // SSE-C
        'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',
        'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',
        'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',
        // SSE-COS???SSE-KMS
        'x-cos-server-side-encryption': 'ServerSideEncryption',
        'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',
        'x-cos-server-side-encryption-context': 'SSEContext',
        // ?????????????????????
        'Pic-Operations': 'PicOperations'
      };
      util.each(headerMap, function (paramKey, headerKey) {
        if (params[paramKey] !== undefined) {
          Headers[headerKey] = params[paramKey];
        }
      });
      params.Headers = clearKey(Headers);
    }
  }

  return params;
};

var apiWrapper = function apiWrapper(apiName, apiFn) {
  return function (params, callback) {
    var self = this; // ????????????

    if (typeof params === 'function') {
      callback = params;
      params = {};
    } // ??????????????????


    params = formatParams(apiName, params); // tracker??????

    var tracker;

    if (self.options.EnableTracker) {
      if (params.calledBySdk === 'sliceUploadFile') {
        // ??????????????????????????????sliceUploadFile????????????
        tracker = params.tracker && params.tracker.generateSubTracker({
          apiName: apiName
        });
      } else if (['uploadFile', 'uploadFiles'].includes(apiName)) {
        // uploadFile???uploadFiles???????????????????????????????????????
        tracker = null;
      } else {
        var fileSize = -1;

        if (params.Body) {
          fileSize = typeof params.Body === 'string' ? params.Body.length : params.Body.size || params.Body.byteLength || -1;
        }

        tracker = new Tracker({
          bucket: params.Bucket,
          region: params.Region,
          apiName: apiName,
          fileKey: params.Key,
          fileSize: fileSize,
          deepTracker: self.options.DeepTracker,
          customId: self.options.CustomId,
          delay: self.options.TrackerDelay
        });
      }
    }

    params.tracker = tracker; // ??????????????????

    var formatResult = function formatResult(result) {
      if (result && result.headers) {
        result.headers['x-cos-request-id'] && (result.RequestId = result.headers['x-cos-request-id']);
        result.headers['x-ci-request-id'] && (result.RequestId = result.headers['x-ci-request-id']);
        result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
        result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
      }

      return result;
    };

    var _callback = function _callback(err, data) {
      // ??????????????????????????????
      tracker && tracker.formatResult(err, data);
      callback && callback(formatResult(err), formatResult(data));
    };

    var checkParams = function checkParams() {
      if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
        // ????????????????????????
        var missingResult = hasMissingParams.call(self, apiName, params);

        if (missingResult) {
          return 'missing param ' + missingResult;
        } // ?????? region ??????


        if (params.Region) {
          if (self.options.CompatibilityMode) {
            if (!/^([a-z\d-.]+)$/.test(params.Region)) {
              return 'Region format error.';
            }
          } else {
            if (params.Region.indexOf('cos.') > -1) {
              return 'param Region should not be start with "cos."';
            } else if (!/^([a-z\d-]+)$/.test(params.Region)) {
              return 'Region format error.';
            }
          } // ?????? region ??????


          if (!self.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default' && params.Region !== 'accelerate') {
            console.warn('warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');
          }
        } // ???????????? AppId ??? Bucket


        if (params.Bucket) {
          if (!/^([a-z\d-]+)-(\d+)$/.test(params.Bucket)) {
            if (params.AppId) {
              params.Bucket = params.Bucket + '-' + params.AppId;
            } else if (self.options.AppId) {
              params.Bucket = params.Bucket + '-' + self.options.AppId;
            } else {
              return 'Bucket should format as "test-1250000000".';
            }
          }

          if (params.AppId) {
            console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).');
            delete params.AppId;
          }
        } // ?????? Key ??? / ?????????????????????????????? /


        if (!self.options.UseRawKey && params.Key && params.Key.substr(0, 1) === '/') {
          params.Key = params.Key.substr(1);
        }
      }
    };

    var errMsg = checkParams();
    var isSync = ['getAuth', 'getObjectUrl'].includes(apiName);

    if (typeof Promise === 'function' && !isSync && !callback) {
      return new Promise(function (resolve, reject) {
        callback = function callback(err, data) {
          err ? reject(err) : resolve(data);
        };

        if (errMsg) return _callback(util.error(new Error(errMsg)));
        apiFn.call(self, params, _callback);
      });
    } else {
      if (errMsg) return _callback(util.error(new Error(errMsg)));
      var res = apiFn.call(self, params, _callback);
      if (isSync) return res;
    }
  };
};

var throttleOnProgress = function throttleOnProgress(total, onProgress) {
  var self = this;
  var size0 = 0;
  var size1 = 0;
  var time0 = Date.now();
  var time1;
  var timer;

  function update() {
    timer = 0;

    if (onProgress && typeof onProgress === 'function') {
      time1 = Date.now();
      var speed = Math.max(0, Math.round((size1 - size0) / ((time1 - time0) / 1000) * 100) / 100) || 0;
      var percent;

      if (size1 === 0 && total === 0) {
        percent = 1;
      } else {
        percent = Math.floor(size1 / total * 100) / 100 || 0;
      }

      time0 = time1;
      size0 = size1;

      try {
        onProgress({
          loaded: size1,
          total: total,
          speed: speed,
          percent: percent
        });
      } catch (e) {}
    }
  }

  return function (info, immediately) {
    if (info) {
      size1 = info.loaded;
      total = info.total;
    }

    if (immediately) {
      clearTimeout(timer);
      update();
    } else {
      if (timer) return;
      timer = setTimeout(update, self.options.ProgressInterval);
    }
  };
};

var getFileSize = function getFileSize(api, params, callback) {
  var size;

  if (typeof params.Body === 'string') {
    params.Body = new Blob([params.Body], {
      type: 'text/plain'
    });
  } else if (params.Body instanceof ArrayBuffer) {
    params.Body = new Blob([params.Body]);
  }

  if (params.Body && (params.Body instanceof Blob || params.Body.toString() === '[object File]' || params.Body.toString() === '[object Blob]')) {
    size = params.Body.size;
  } else {
    callback(util.error(new Error('params body format error, Only allow File|Blob|String.')));
    return;
  }

  params.ContentLength = size;
  callback(null, size);
}; // ????????????????????????


var getSkewTime = function getSkewTime(offset) {
  return Date.now() + (offset || 0);
};

var error = function error(err, opt) {
  var sourceErr = err;
  err.message = err.message || null;

  if (typeof opt === 'string') {
    err.error = opt;
    err.message = opt;
  } else if (_typeof(opt) === 'object' && opt !== null) {
    extend(err, opt);
    if (opt.code || opt.name) err.code = opt.code || opt.name;
    if (opt.message) err.message = opt.message;
    if (opt.stack) err.stack = opt.stack;
  }

  if (typeof Object.defineProperty === 'function') {
    Object.defineProperty(err, 'name', {
      writable: true,
      enumerable: false
    });
    Object.defineProperty(err, 'message', {
      enumerable: true
    });
  }

  err.name = opt && opt.name || err.name || err.code || 'Error';
  if (!err.code) err.code = err.name;
  if (!err.error) err.error = clone(sourceErr); // ????????????????????????

  return err;
};

var isWebWorker = function isWebWorker() {
  // ???????????? worker ????????? constructor name ????????? worker ????????? FileReaderSync ?????? ???????????? https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
  return (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && (globalThis.constructor.name === 'DedicatedWorkerGlobalScope' || globalThis.FileReaderSync);
};

var isNode = function isNode() {
  // ????????? web worker ????????? webpack ?????? process ?????????????????????
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && "function" === 'function' && !isWebWorker();
};

var isCIHost = function isCIHost(url) {
  return /^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(url);
}; //???????????????ios


var isIOS = function () {
  if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
    return false;
  }

  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios??????

  return isIOS;
}(); // ?????????qq???????????????


var isQQ = function () {
  if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) !== 'object') {
    return false;
  }

  return /\sQQ/i.test(navigator.userAgent);
}();

var util = {
  noop: noop,
  formatParams: formatParams,
  apiWrapper: apiWrapper,
  xml2json: xml2json,
  json2xml: json2xml,
  md5: md5,
  clearKey: clearKey,
  fileSlice: fileSlice,
  getBodyMd5: getBodyMd5,
  getFileMd5: getFileMd5,
  binaryBase64: binaryBase64,
  extend: extend,
  isArray: isArray,
  isInArray: isInArray,
  makeArray: makeArray,
  each: each,
  map: map,
  filter: filter,
  clone: clone,
  attr: attr,
  uuid: uuid,
  camSafeUrlEncode: camSafeUrlEncode,
  throttleOnProgress: throttleOnProgress,
  getFileSize: getFileSize,
  getSkewTime: getSkewTime,
  error: error,
  obj2str: obj2str,
  getAuth: getAuth,
  parseSelectPayload: parseSelectPayload,
  getSourceParams: getSourceParams,
  isBrowser: true,
  isNode: isNode,
  isCIHost: isCIHost,
  isIOS_QQ: isIOS && isQQ
};
module.exports = util;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")));

/***/ })

/******/ });
});
});

var COS = /*@__PURE__*/getDefaultExportFromCjs(cosJsSdkV5);

var lib = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e(function(){try{return require$$0__default["default"]}catch(t){}}());}(self,(function(t){return (()=>{var e={249:function(t,e,r){var n;t.exports=(n=n||function(t,e){var n;if("undefined"!=typeof window&&window.crypto&&(n=window.crypto),!n&&"undefined"!=typeof window&&window.msCrypto&&(n=window.msCrypto),!n&&void 0!==r.g&&r.g.crypto&&(n=r.g.crypto),!n)try{n=r(417);}catch(t){}var i=function(){if(n){if("function"==typeof n.getRandomValues)try{return n.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof n.randomBytes)try{return n.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},o=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),s={},a=s.lib={},u=a.Base={extend:function(t){var e=o(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments);}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString);},clone:function(){return this.init.prototype.extend(this)}},c=a.WordArray=u.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=r!=e?r:4*t.length;},toString:function(t){return (t||l).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,i=t.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var s=r[o>>>2]>>>24-o%4*8&255;e[n+o>>>2]|=s<<24-(n+o)%4*8;}else for(o=0;o<i;o+=4)e[n+o>>>2]=r[o>>>2];return this.sigBytes+=i,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4);},clone:function(){var t=u.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(i());return new c.init(e,t)}}),f=s.enc={},l=f.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16));}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new c.init(r,e/2)}},h=f.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o));}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new c.init(r,e)}},p=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},d=a.BufferedBlockAlgorithm=u.extend({reset:function(){this._data=new c.init,this._nDataBytes=0;},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes;},_process:function(e){var r,n=this._data,i=n.words,o=n.sigBytes,s=this.blockSize,a=o/(4*s),u=(a=e?t.ceil(a):t.max((0|a)-this._minBufferSize,0))*s,f=t.min(4*u,o);if(u){for(var l=0;l<u;l+=s)this._doProcessBlock(i,l);r=i.splice(0,u),n.sigBytes-=f;}return new c.init(r,f)},clone:function(){var t=u.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),y=(a.Hasher=d.extend({cfg:u.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset();},reset:function(){d.reset.call(this),this._doReset();},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new y.HMAC.init(t,r).finalize(e)}}}),s.algo={});return s}(Math),n);},269:function(t,e,r){var n;t.exports=(n=r(249),function(){var t=n,e=t.lib.WordArray;function r(t,r,n){for(var i=[],o=0,s=0;s<r;s++)if(s%4){var a=n[t.charCodeAt(s-1)]<<s%4*2|n[t.charCodeAt(s)]>>>6-s%4*2;i[o>>>2]|=a<<24-o%4*8,o++;}return e.create(i,o)}t.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var i=[],o=0;o<r;o+=3)for(var s=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,a=0;a<4&&o+.75*a<r;a++)i.push(n.charAt(s>>>6*(3-a)&63));var u=n.charAt(64);if(u)for(;i.length%4;)i.push(u);return i.join("")},parse:function(t){var e=t.length,n=this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var o=0;o<n.length;o++)i[n.charCodeAt(o)]=o;}var s=n.charAt(64);if(s){var a=t.indexOf(s);-1!==a&&(e=a);}return r(t,e,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};}(),n.enc.Base64);},433:function(t,e,r){var n;t.exports=(n=r(249),function(){if("function"==typeof ArrayBuffer){var t=n.lib.WordArray,e=t.init;(t.init=function(t){if(t instanceof ArrayBuffer&&(t=new Uint8Array(t)),(t instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),t instanceof Uint8Array){for(var r=t.byteLength,n=[],i=0;i<r;i++)n[i>>>2]|=t[i]<<24-i%4*8;e.call(this,n,r);}else e.apply(this,arguments);}).prototype=t;}}(),n.lib.WordArray);},783:function(t,e,r){var n,i,o,s,a,u,c,f;t.exports=(f=r(249),i=(n=f).lib,o=i.WordArray,s=i.Hasher,a=n.algo,u=[],c=a.SHA1=s.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878,3285377520]);},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],s=r[3],a=r[4],c=0;c<80;c++){if(c<16)u[c]=0|t[e+c];else {var f=u[c-3]^u[c-8]^u[c-14]^u[c-16];u[c]=f<<1|f>>>31;}var l=(n<<5|n>>>27)+a+u[c];l+=c<20?1518500249+(i&o|~i&s):c<40?1859775393+(i^o^s):c<60?(i&o|i&s|o&s)-1894007588:(i^o^s)-899497514,a=s,s=o,o=i<<30|i>>>2,i=n,n=l;}r[0]=r[0]+n|0,r[1]=r[1]+i|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+a|0;},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,n=8*t.sigBytes;return e[n>>>5]|=128<<24-n%32,e[14+(n+64>>>9<<4)]=Math.floor(r/4294967296),e[15+(n+64>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=s.clone.call(this);return t._hash=this._hash.clone(),t}}),n.SHA1=s._createHelper(c),n.HmacSHA1=s._createHmacHelper(c),f.SHA1);},223:t=>{t.exports=Math.log2||function(t){return Math.log(t)*Math.LOG2E};},219:t=>{function e(t,e,r,n){this.resolve=t,this.fn=e,this.self=r||null,this.args=n;}function r(){this._s1=[],this._s2=[];}t.exports=function(n){var i;function o(t,n){var o=new r;function s(r,n,s){if(t){t--;var u=new i((function(t){t(r.apply(n,s));}));return u.then(a,a),u}return new i((function(t){o.push(new e(t,r,n,s));}))}function a(){if(t++,!o.isEmpty()){var e=o.shift();e.resolve(s(e.fn,e.self,e.args));}}if("function"==typeof t){var u=n;n=t,t=u;}if("number"!=typeof t)throw new TypeError("Expected throat size to be a number but got "+typeof t);if(void 0!==n&&"function"!=typeof n)throw new TypeError("Expected throat fn to be a function but got "+typeof n);return "function"==typeof n?function(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);return s(n,this,t)}:function(t){if("function"!=typeof t)throw new TypeError("Expected throat fn to be a function but got "+typeof t);for(var e=[],r=1;r<arguments.length;r++)e.push(arguments[r]);return s(t,this,e)}}if(1===arguments.length&&"function"==typeof n)return i=n,o;if("function"!=typeof(i=t.exports.Promise))throw new Error("You must provide a Promise polyfill for this library to work in older environments");return o(arguments[0],arguments[1])},t.exports.default=t.exports,"function"==typeof Promise&&(t.exports.Promise=Promise),r.prototype.push=function(t){this._s1.push(t);},r.prototype.shift=function(){var t=this._s2;if(0===t.length){var e=this._s1;if(0===e.length)return;this._s1=t,t=this._s2=e.reverse();}return t.pop()},r.prototype.isEmpty=function(){return !this._s1.length&&!this._s2.length};},22:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){this.file=t,this.hash="";}return t.prototype.set=function(t){this.hash=t;},t.prototype.get=function(){return Promise.resolve(this.hash)},t.prototype.getSync=function(){return this.hash},t}();e.default=r;},483:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,r){this.file=t,this.startByte=e,this.endByte=r;}return Object.defineProperty(t.prototype,"size",{get:function(){return this.endByte-this.startByte},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"index",{get:function(){return this.startByte/this.file.blockSize},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"blob",{get:function(){return this.file.slice(this.startByte,this.endByte)},enumerable:!1,configurable:!0}),t}();e.default=r;},221:function(t,e,r){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(r(483)),o=r(135),s=/\.([^.]+)$/,a=1,u=function(){function t(t){var e=t.file,r=t.blockSize,n=void 0===r?4194304:r,i=t.batch,u=void 0===i?o.guid():i;if(!e)throw new Error("QZFile: no file provided!");this.file=e,this.blockSize=n,this.batch=u,this.size=e.size,this.name=e.name||"unknown_"+a++,this.lastModified=e.lastModified||(new Date).getTime();var c=s.exec(e.name)?RegExp.$1.toLowerCase():"";!c&&e.type&&(c=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(e.type)?RegExp.$1.toLowerCase():"")&&(this.name+="."+c),this.ext=c,!e.type&&this.ext&&~"jpg,jpeg,png,gif,bmp".indexOf(this.ext)?this.type="image/"+("jpg"===this.ext?"jpeg":this.ext):this.type=e.type||"application/octet-stream";}return t.prototype.slice=function(t,e){var r=this.file;return r.slice.call(r,t,e)},t.prototype.getBlocks=function(){if(this.blocks)return this.blocks;for(var t=0,e=[];t<this.size;){var r=t+this.blockSize;r>this.size&&(r=this.size),e.push(new i.default(this,t,r)),t+=this.blockSize;}return this.blocks=e,e},t.prototype.getBlockByIndex=function(t){return this.getBlocks()[t]},t}();e.default=u;},644:function(t,e,r){var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}});}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r];}),i=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e});}:function(t,e){t.default=e;}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&n(e,t,r);return i(e,t),e},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.utils=e.Worker=e.Normal=e.File=e.Block=e.Base=void 0;var a=o(r(135)),u=r(22);Object.defineProperty(e,"Base",{enumerable:!0,get:function(){return s(u).default}});var c=r(483);Object.defineProperty(e,"Block",{enumerable:!0,get:function(){return s(c).default}});var f=r(221);Object.defineProperty(e,"File",{enumerable:!0,get:function(){return s(f).default}});var l=r(880);Object.defineProperty(e,"Normal",{enumerable:!0,get:function(){return s(l).default}});var h=r(818);Object.defineProperty(e,"Worker",{enumerable:!0,get:function(){return s(h).default}}),e.utils=a;},880:function(t,e,r){var n,i=this&&this.__extends||(n=function(t,e){return (n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);})(t,e)},function(t,e){function r(){this.constructor=t;}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r);}),o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=r(269),a=r(433),u=r(783),c=o(r(223)),f=o(r(219)),l=function(t){function e(e,r){void 0===r&&(r=1);var n=t.call(this,e)||this;return n.concurrency=r,n}return i(e,t),e.prototype.loadNext=function(t){return new Promise((function(e,r){var n=new FileReader;n.onload=function(){if(n.result){var t=a.create(n.result),i=u(t);e(i);}else r(new Error("Read file error!"));},n.onloadend=function(){n.onloadend=n.onload=n.onerror=null;},n.onerror=function(){r(new Error("Read file error!"));},n.readAsArrayBuffer(t.blob);}))},e.prototype.get=function(){var t=this;return this.hash?Promise.resolve(this.hash):Promise.all(this.file.getBlocks().map(f.default(Promise).apply(this,[this.concurrency,function(e){return t.loadNext(e)}]))).then((function(e){var r=c.default(t.file.blockSize),n=null;1===e.length?n=e[0]:(r|=128,n=e.reduce((function(t,e){return t.concat(e)})),n=u(n));var i=new ArrayBuffer(1);return new DataView(i).setUint8(0,r),n=(n=a.create(i).concat(n)).toString(s).replace(/\//g,"_").replace(/\+/g,"-"),t.hash=n,n}))},e}(o(r(22)).default);e.default=l;},135:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.guid=void 0,e.guid=function(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return ("x"===t?e:3&e|8).toString(16)}))};},818:function(t,e,r){var n,i=this&&this.__extends||(n=function(t,e){return (n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);})(t,e)},function(t,e){function r(){this.constructor=t;}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r);}),o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=r(269),a=r(433),u=r(783),c=o(r(223)),f=o(r(22)),l=r(135),h=function(t){function e(e,r){var n=t.call(this,e)||this;return n.workers=r,n.channel=l.guid(),n}return i(e,t),e.prototype.get=function(){var t=this;return this.hash?Promise.resolve(this.hash):(this.workers.removeMessagesByChannel(this.channel),this.workers.removeAllListeners(this.channel),new Promise((function(e,r){var n=t.file.getBlocks(),i=n.length,o=[],f=0;t.workers.on(t.channel,(function(n,l){if(n&&r(new Error(l)),o[l.index]=l.data,++f===i){o=o.map((function(t){return s.parse(t)}));var h=c.default(t.file.blockSize),p=null;1===f?p=o[0]:(h|=128,p=o.reduce((function(t,e){return t.concat(e)})),p=u(p));var d=new ArrayBuffer(1);new DataView(d).setUint8(0,h),p=(p=a.create(d).concat(p)).toString(s).replace(/\//g,"_").replace(/\+/g,"-"),t.hash=p,t.workers.removeAllListeners(t.channel),e(p);}})),n.forEach((function(e){t.workers.send({channel:t.channel,payload:{blob:e.blob,index:e.index}});}));})))},e}(f.default);e.default=h;},417:e=>{if(void 0===t){var r=new Error("Cannot find module 'crypto'");throw r.code="MODULE_NOT_FOUND",r}e.exports=t;}},r={};function n(t){if(r[t])return r[t].exports;var i=r[t]={exports:{}};return e[t].call(i.exports,i,i.exports,n),i.exports}return n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n(644)})()}));
});

class uploader {
    constructor({ type, onSuccess = () => {}, onFail = () => {}, onGetConfig, onProgress = () => {} }) {
        this.type = type;
        this.onSuccess = onSuccess;
        this.onFail = onFail;
        this.onGetConfig = onGetConfig;
        this.onProgress = onProgress;
    }

    getConfig() {
        return new Promise((resolve, reject) => {
            this.onGetConfig(
                (config) => {
                    this.setConfig.call(this, config);
                    resolve();
                },
                {
                    type: this.type,
                }
            );
        });
    }

    setConfig({ driver, config }) {
        this.driver = driver;
        this.config = config;
        switch (driver) {
            case "aliyun":
                this.setAliyun(config);
                break;
            case "qiniu":
                this.setQiniu(config);
                break;
            case "tencent":
                this.setTencent(config);
                break;
            case "local":
                this.setLocal(config);
                break;
            default:
                this.onFail(new Error("???????????????driver"));
                break;
        }
    }

    setTencent(config) {
        const tempKeys = config.tempKeys;
        const credentials = tempKeys.credentials;
        this.uploader = new COS({
            getAuthorization: (options, callback) => {
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    SecurityToken: credentials.sessionToken,
                    StartTime: tempKeys.startTime, // ??????????????????????????????1580000000
                    ExpiredTime: tempKeys.expiredTime, // ??????????????????????????????1580000000
                });
            },
        });
    }

    setAliyun(config) {
        const data = new FormData();

        if (Object.keys(config["callback-var"]).length) {
            for (const [key, value] of Object.entries(config["callback-var"])) {
                if (typeof value === "string") {
                    data.append(key, value);
                }
            }
        }

        data.append("OSSAccessKeyId", config.accessid);
        data.append("policy", config.policy);
        data.append("signature", config.signature);
        data.append("callback", config.callback);
        data.append("success_action_status", "200");
        data.append("x-oss-forbid-overwrite", "true");

        this.uploader = axios$1.create({
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "multipart/form-data",
            },
            data,
            onUploadProgress: (res) => {
                this.onProgress({
                    loaded: res.loaded,
                    total: res.total,
                    percent: res.progress * 100,
                });
            },
        });
    }

    setQiniu(config) {
        this.uploader = {};
    }

    setLocal(config) {
        const data = new FormData();

        data.append("auth", config.auth);
        data.append("file", this.file);

        this.uploader = axios$1.create({
            method: "POST",
            headers: {
                "Content-type": "multipart/form-data",
            },
            data,
            onUploadProgress: (res) => {
                this.onProgress({
                    loaded: res.loaded,
                    total: res.total,
                    percent: res.progress * 100,
                });
            },
        });
    }

    checkMimeType(fileMime, allowMime) {
        if (allowMime === "*") {
            return true;
        }

        if (Array.isArray(allowMime)) {
            let res = false;
            for (const v of allowMime) {
                if (this.checkMimeTypeByString(fileMime, v)) {
                    res = true;
                    break;
                }
            }
            return res;
        }

        return this.checkMimeTypeByString(fileMime, allowMime);
    }

    checkMimeTypeByString(fileMime, allowMime) {
        if (allowMime.includes("/*") !== false && fileMime.indexOf(allowMime.replace(/\/\*$/, "/") === 0)) {
            return true;
        }
        if (allowMime === fileMime) {
            return true;
        }
        return false;
    }

    async getKey(file) {
        const qfile = new lib.File({
            file: file,
            blockSize: 4 * 1024 * 1024,
            batch: lib.utils.guid(),
        });

        try {
            return await new lib.Normal(qfile, 25).get();
        } catch (error) {
            return file.name;
        }
    }

    async send(file) {
        console.log(file);
        this.file = file;

        if ((this.config && this.config.expire_time && Math.round(new Date().getTime() / 1000 - 28800) > this.config.expire_time) || !this.config) {
            await this.getConfig(file);
        }

        if (this.uploader == undefined) {
            return;
        }

        const config = this.config;

        if (!this.checkMimeType(file.type, config.mime_types)) {
            return this.onFail(new Error("??????????????????"));
        }

        if (file.size > config.max_size) {
            return this.onFail(new Error("????????????????????????????????????"));
        }

        switch (this.driver) {
            case "aliyun":
                var data = this.uploader.defaults.data;
                var key = await this.getKey(file);
                data.append("key", config.dir + key);
                data.append("file", file);
                this.uploader
                    .request({
                        url: config.host,
                        data,
                    })
                    .then((res) => {
                        this.onSuccess(res.data);
                    })
                    .catch(async (err) => {
                        if (err instanceof AxiosError) {
                            if (err.response.data.includes("Invalid according to Policy: Policy expired.")) {
                                this.config = null;
                                return this.send(file);
                            }
                            if (err.response.data.includes("<Code>FileAlreadyExists</Code>")) {
                                return this.onSuccess({
                                    url: config.host + config.dir + key,
                                });
                            }
                            if (err.response.data.includes(`Invalid according to Policy: Policy Condition failed: ["in", "$content-type"`)) {
                                return this.onFail(new Error("??????????????????"));
                            }
                            if (err.response.data.includes(`<Code>EntityTooLarge</Code>`)) {
                                return this.onFail(new Error("????????????????????????????????????"));
                            }
                        }
                        this.onFail(new Error("????????????"));
                    });
                break;
            case "qiniu":
                this.uploader = upload(file, null, config.token);
                this.uploader.subscribe({
                    next: ({ total }) => {
                        this.onProgress({
                            loaded: total.loaded,
                            total: total.size,
                            percent: total.percent,
                        });
                    },
                    error: (err) => {
                        if (err instanceof QiniuRequestError) {
                            if (err.code === 403) {
                                if (err.data.err.includes("limited mimeType")) {
                                    return this.onFail(new Error("??????????????????"));
                                }
                                if (err.data.err.includes("key doesn't match with scope")) {
                                    return this.onFail(new Error("????????????"));
                                }
                            }
                            if (err.code === 413) {
                                return this.onFail(new Error("????????????????????????????????????"));
                            }
                        }
                        this.onFail(new Error("????????????"));
                    },
                    complete: (res) => {
                        this.onSuccess(res);
                    },
                });
                break;
            case "tencent":
                var key = await this.getKey(file);
                this.uploader.putObject(
                    {
                        Bucket: config.bucket /* ?????????: */,
                        Region: config.region /* ???????????????????????????????????? */,
                        Key: config.path + key /* ??????????????????  ?????????????????????????????? */,
                        StorageClass: "STANDARD", // ?????????
                        Body: file, // ??????????????????
                        onProgress: (progressData) => {
                            this.onProgress({
                                loaded: progressData.loaded,
                                total: progressData.total,
                                percent: progressData.percent * 100,
                            });
                        },
                    },
                    async (err, data) => {
                        if (data) {
                            if (data.statusCode === 200) {
                                try {
                                    const res = await axios$1
                                        .post(config.callback_url, {
                                            etag: data.ETag,
                                            sessionToken: config.tempKeys.credentials.sessionToken,
                                            auth: config.auth,
                                            localtion: data.Location,
                                            mimetype: file.type,
                                            size: file.size,
                                        })
                                        .catch((err) => {
                                            if (err instanceof AxiosError) {
                                                return this.onFail(new Error(err.response.data?.msg));
                                            }
                                        });
                                    return this.onSuccess(res.data);
                                } catch (error) {
                                    this.onFail(err);
                                }
                            }
                            this.onFail(new Error("????????????"));
                        } else {
                            this.onFail(new Error("????????????"));
                        }
                    }
                );
                break;
            case "local":
                this.uploader.defaults.data.append("key", config.prefix + (await this.getKey(file)));
                this.uploader
                    .request({
                        url: config.host,
                        data: this.uploader.defaults.data,
                    })
                    .then((res) => {
                        this.onSuccess(res.data);
                    })
                    .catch((err) => {
                        if (err instanceof AxiosError) {
                            return this.onFail(new Error(err.response.data?.msg));
                        }
                        this.onFail(err);
                    });
                break;
        }
    }
}

module.exports = uploader;
//# sourceMappingURL=uploader.cjs.map
