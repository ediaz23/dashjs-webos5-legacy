/******/ var __webpack_modules__ = ({

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isPossiblePrototype = __webpack_require__(/*! ../internals/is-possible-prototype */ "./node_modules/core-js/internals/is-possible-prototype.js");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-basic-detection.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-basic-detection.js ***!
  \************************************************************************/
/***/ (function(module) {


// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-byte-length.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-byte-length.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "./node_modules/core-js/internals/function-uncurry-this-accessor.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var ArrayBuffer = globalThis.ArrayBuffer;
var TypeError = globalThis.TypeError;

// Includes
// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
module.exports = ArrayBuffer && uncurryThisAccessor(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
  if (classof(O) !== 'ArrayBuffer') throw new TypeError('ArrayBuffer expected');
  return O.byteLength;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-is-detached.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-is-detached.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js");
var arrayBufferByteLength = __webpack_require__(/*! ../internals/array-buffer-byte-length */ "./node_modules/core-js/internals/array-buffer-byte-length.js");

var ArrayBuffer = globalThis.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer && ArrayBuffer.prototype;
var slice = ArrayBufferPrototype && uncurryThis(ArrayBufferPrototype.slice);

module.exports = function (O) {
  if (arrayBufferByteLength(O) !== 0) return false;
  if (!slice) return false;
  try {
    slice(O, 0, 0);
    return false;
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-not-detached.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-not-detached.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isDetached = __webpack_require__(/*! ../internals/array-buffer-is-detached */ "./node_modules/core-js/internals/array-buffer-is-detached.js");

var $TypeError = TypeError;

module.exports = function (it) {
  if (isDetached(it)) throw new $TypeError('ArrayBuffer is detached');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-transfer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-transfer.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "./node_modules/core-js/internals/function-uncurry-this-accessor.js");
var toIndex = __webpack_require__(/*! ../internals/to-index */ "./node_modules/core-js/internals/to-index.js");
var notDetached = __webpack_require__(/*! ../internals/array-buffer-not-detached */ "./node_modules/core-js/internals/array-buffer-not-detached.js");
var arrayBufferByteLength = __webpack_require__(/*! ../internals/array-buffer-byte-length */ "./node_modules/core-js/internals/array-buffer-byte-length.js");
var detachTransferable = __webpack_require__(/*! ../internals/detach-transferable */ "./node_modules/core-js/internals/detach-transferable.js");
var PROPER_STRUCTURED_CLONE_TRANSFER = __webpack_require__(/*! ../internals/structured-clone-proper-transfer */ "./node_modules/core-js/internals/structured-clone-proper-transfer.js");

var structuredClone = globalThis.structuredClone;
var ArrayBuffer = globalThis.ArrayBuffer;
var DataView = globalThis.DataView;
var min = Math.min;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataViewPrototype = DataView.prototype;
var slice = uncurryThis(ArrayBufferPrototype.slice);
var isResizable = uncurryThisAccessor(ArrayBufferPrototype, 'resizable', 'get');
var maxByteLength = uncurryThisAccessor(ArrayBufferPrototype, 'maxByteLength', 'get');
var getInt8 = uncurryThis(DataViewPrototype.getInt8);
var setInt8 = uncurryThis(DataViewPrototype.setInt8);

module.exports = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
  var byteLength = arrayBufferByteLength(arrayBuffer);
  var newByteLength = newLength === undefined ? byteLength : toIndex(newLength);
  var fixedLength = !isResizable || !isResizable(arrayBuffer);
  var newBuffer;
  notDetached(arrayBuffer);
  if (PROPER_STRUCTURED_CLONE_TRANSFER) {
    arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
    if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
  }
  if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
    newBuffer = slice(arrayBuffer, 0, newByteLength);
  } else {
    var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
    newBuffer = new ArrayBuffer(newByteLength, options);
    var a = new DataView(arrayBuffer);
    var b = new DataView(newBuffer);
    var copyLength = min(newByteLength, byteLength);
    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
  }
  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
  return newBuffer;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-view-core.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-view-core.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-basic-detection */ "./node_modules/core-js/internals/array-buffer-basic-detection.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "./node_modules/core-js/internals/define-built-in-accessor.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = globalThis.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = globalThis.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = globalThis.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(globalThis.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw new TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw new TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = globalThis[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = globalThis[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = globalThis[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = globalThis[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = globalThis[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw new TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (globalThis[NAME]) {
    createNonEnumerableProperty(globalThis[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-from-constructor-and-list.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-from-constructor-and-list.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

module.exports = function (Constructor, list, $length) {
  var index = 0;
  var length = arguments.length > 2 ? $length : lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration-from-last.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration-from-last.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE === 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var index = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

module.exports = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-set-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/array-set-length.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-slice.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/array-slice.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "./node_modules/core-js/internals/array-sort.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-sort.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js/internals/array-slice.js");

var floor = Math.floor;

var sort = function (array, comparefn) {
  var length = array.length;

  if (length < 8) {
    // insertion sort
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
  } else {
    // merge sort
    var middle = floor(length / 2);
    var left = sort(arraySlice(array, 0, middle), comparefn);
    var right = sort(arraySlice(array, middle), comparefn);
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    }
  }

  return array;
};

module.exports = sort;


/***/ }),

/***/ "./node_modules/core-js/internals/array-to-reversed.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/array-to-reversed.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
module.exports = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-with.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-with.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var $RangeError = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
module.exports = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw new $RangeError('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module) {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in-accessor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in-accessor.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "./node_modules/core-js/internals/make-built-in.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "./node_modules/core-js/internals/make-built-in.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-global-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/define-global-property.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/delete-property-or-throw.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/delete-property-or-throw.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/detach-transferable.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/detach-transferable.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var getBuiltInNodeModule = __webpack_require__(/*! ../internals/get-built-in-node-module */ "./node_modules/core-js/internals/get-built-in-node-module.js");
var PROPER_STRUCTURED_CLONE_TRANSFER = __webpack_require__(/*! ../internals/structured-clone-proper-transfer */ "./node_modules/core-js/internals/structured-clone-proper-transfer.js");

var structuredClone = globalThis.structuredClone;
var $ArrayBuffer = globalThis.ArrayBuffer;
var $MessageChannel = globalThis.MessageChannel;
var detach = false;
var WorkerThreads, channel, buffer, $detach;

if (PROPER_STRUCTURED_CLONE_TRANSFER) {
  detach = function (transferable) {
    structuredClone(transferable, { transfer: [transferable] });
  };
} else if ($ArrayBuffer) try {
  if (!$MessageChannel) {
    WorkerThreads = getBuiltInNodeModule('worker_threads');
    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
  }

  if ($MessageChannel) {
    channel = new $MessageChannel();
    buffer = new $ArrayBuffer(2);

    $detach = function (transferable) {
      channel.port1.postMessage(null, [transferable]);
    };

    if (buffer.byteLength === 2) {
      $detach(buffer);
      if (buffer.byteLength === 0) detach = $detach;
    }
  }
} catch (error) { /* empty */ }

module.exports = detach;


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/does-not-exceed-safe-integer.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/does-not-exceed-safe-integer.js ***!
  \************************************************************************/
/***/ (function(module) {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ (function(module) {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/environment-ff-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-ff-version.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var userAgent = __webpack_require__(/*! ../internals/environment-user-agent */ "./node_modules/core-js/internals/environment-user-agent.js");

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ "./node_modules/core-js/internals/environment-is-ie-or-edge.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-is-ie-or-edge.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var UA = __webpack_require__(/*! ../internals/environment-user-agent */ "./node_modules/core-js/internals/environment-user-agent.js");

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ "./node_modules/core-js/internals/environment-is-node.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-is-node.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var ENVIRONMENT = __webpack_require__(/*! ../internals/environment */ "./node_modules/core-js/internals/environment.js");

module.exports = ENVIRONMENT === 'NODE';


/***/ }),

/***/ "./node_modules/core-js/internals/environment-user-agent.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-user-agent.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ "./node_modules/core-js/internals/environment-v8-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-v8-version.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var userAgent = __webpack_require__(/*! ../internals/environment-user-agent */ "./node_modules/core-js/internals/environment-user-agent.js");

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "./node_modules/core-js/internals/environment-webkit-version.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-webkit-version.js ***!
  \**********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var userAgent = __webpack_require__(/*! ../internals/environment-user-agent */ "./node_modules/core-js/internals/environment-user-agent.js");

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ "./node_modules/core-js/internals/environment.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/environment.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* global Bun, Deno -- detection */
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var userAgent = __webpack_require__(/*! ../internals/environment-user-agent */ "./node_modules/core-js/internals/environment-user-agent.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var userAgentStartsWith = function (string) {
  return userAgent.slice(0, string.length) === string;
};

module.exports = (function () {
  if (userAgentStartsWith('Bun/')) return 'BUN';
  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
  if (userAgentStartsWith('Deno/')) return 'DENO';
  if (userAgentStartsWith('Node.js/')) return 'NODE';
  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
  if (classof(globalThis.process) === 'process') return 'NODE';
  if (globalThis.window && globalThis.document) return 'BROWSER';
  return 'REST';
})();


/***/ }),

/***/ "./node_modules/core-js/internals/error-stack-clear.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/error-stack-clear.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ "./node_modules/core-js/internals/error-stack-install.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/error-stack-install.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var clearErrorStack = __webpack_require__(/*! ../internals/error-stack-clear */ "./node_modules/core-js/internals/error-stack-clear.js");
var ERROR_STACK_INSTALLABLE = __webpack_require__(/*! ../internals/error-stack-installable */ "./node_modules/core-js/internals/error-stack-installable.js");

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/error-stack-installable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/error-stack-installable.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ (function(module) {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-apply.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/function-apply.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-native.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-native.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this-accessor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this-clause.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in-node-module.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in-node-module.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var IS_NODE = __webpack_require__(/*! ../internals/environment-is-node */ "./node_modules/core-js/internals/environment-is-node.js");

module.exports = function (name) {
  if (IS_NODE) {
    try {
      return globalThis.process.getBuiltinModule(name);
    } catch (error) { /* empty */ }
    try {
      // eslint-disable-next-line no-new-func -- safe
      return Function('return require("' + name + '")')();
    } catch (error) { /* empty */ }
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "./node_modules/core-js/internals/global-this.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/global-this.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/install-error-cause.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/install-error-cause.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ "./node_modules/core-js/internals/weak-map-basic-detection.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-big-int-array.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/is-big-int-array.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

module.exports = function (it) {
  var klass = classof(it);
  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ (function(module) {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-null-or-undefined.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/is-null-or-undefined.js ***!
  \****************************************************************/
/***/ (function(module) {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-possible-prototype.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/is-possible-prototype.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ (function(module) {


module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/make-built-in.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/make-built-in.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").CONFIGURABLE);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ "./node_modules/core-js/internals/math-trunc.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/math-trunc.js ***!
  \******************************************************/
/***/ (function(module) {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "./node_modules/core-js/internals/normalize-string-argument.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/normalize-string-argument.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "./node_modules/core-js/internals/function-uncurry-this-accessor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/proxy-accessor.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/proxy-accessor.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.39.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.39.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ "./node_modules/core-js/internals/structured-clone-proper-transfer.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/structured-clone-proper-transfer.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var V8 = __webpack_require__(/*! ../internals/environment-v8-version */ "./node_modules/core-js/internals/environment-v8-version.js");
var ENVIRONMENT = __webpack_require__(/*! ../internals/environment */ "./node_modules/core-js/internals/environment.js");

var structuredClone = globalThis.structuredClone;

module.exports = !!structuredClone && !fails(function () {
  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if ((ENVIRONMENT === 'DENO' && V8 > 92) || (ENVIRONMENT === 'NODE' && V8 > 94) || (ENVIRONMENT === 'BROWSER' && V8 > 97)) return false;
  var buffer = new ArrayBuffer(8);
  var clone = structuredClone(buffer, { transfer: [buffer] });
  return buffer.byteLength !== 0 || clone.byteLength !== 8;
});


/***/ }),

/***/ "./node_modules/core-js/internals/symbol-constructor-detection.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/environment-v8-version */ "./node_modules/core-js/internals/environment-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-big-int.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-big-int.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
module.exports = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw new $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-index.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/to-index.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var $RangeError = RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw new $RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var trunc = __webpack_require__(/*! ../internals/math-trunc */ "./node_modules/core-js/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-offset.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-offset.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPositiveInteger = __webpack_require__(/*! ../internals/to-positive-integer */ "./node_modules/core-js/internals/to-positive-integer.js");

var $RangeError = RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw new $RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-positive-integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/to-positive-integer.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var $RangeError = RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw new $RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ (function(module) {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ "./node_modules/core-js/internals/weak-map-basic-detection.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/internals/wrap-error-constructor-with-cause.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/internals/wrap-error-constructor-with-cause.js ***!
  \*****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var proxyAccessor = __webpack_require__(/*! ../internals/proxy-accessor */ "./node_modules/core-js/internals/proxy-accessor.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");
var normalizeStringArgument = __webpack_require__(/*! ../internals/normalize-string-argument */ "./node_modules/core-js/internals/normalize-string-argument.js");
var installErrorCause = __webpack_require__(/*! ../internals/install-error-cause */ "./node_modules/core-js/internals/install-error-cause.js");
var installErrorStack = __webpack_require__(/*! ../internals/error-stack-install */ "./node_modules/core-js/internals/error-stack-install.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array-buffer.detached.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array-buffer.detached.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "./node_modules/core-js/internals/define-built-in-accessor.js");
var isDetached = __webpack_require__(/*! ../internals/array-buffer-is-detached */ "./node_modules/core-js/internals/array-buffer-is-detached.js");

var ArrayBufferPrototype = ArrayBuffer.prototype;

// `ArrayBuffer.prototype.detached` getter
// https://tc39.es/ecma262/#sec-get-arraybuffer.prototype.detached
if (DESCRIPTORS && !('detached' in ArrayBufferPrototype)) {
  defineBuiltInAccessor(ArrayBufferPrototype, 'detached', {
    configurable: true,
    get: function detached() {
      return isDetached(this);
    }
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $transfer = __webpack_require__(/*! ../internals/array-buffer-transfer */ "./node_modules/core-js/internals/array-buffer-transfer.js");

// `ArrayBuffer.prototype.transferToFixedLength` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
if ($transfer) $({ target: 'ArrayBuffer', proto: true }, {
  transferToFixedLength: function transferToFixedLength() {
    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array-buffer.transfer.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array-buffer.transfer.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $transfer = __webpack_require__(/*! ../internals/array-buffer-transfer */ "./node_modules/core-js/internals/array-buffer-transfer.js");

// `ArrayBuffer.prototype.transfer` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
if ($transfer) $({ target: 'ArrayBuffer', proto: true }, {
  transfer: function transfer() {
    return $transfer(this, arguments.length ? arguments[0] : undefined, true);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.push.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.push.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var setArrayLength = __webpack_require__(/*! ../internals/array-set-length */ "./node_modules/core-js/internals/array-set-length.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "./node_modules/core-js/internals/does-not-exceed-safe-integer.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.unshift.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.unshift.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var setArrayLength = __webpack_require__(/*! ../internals/array-set-length */ "./node_modules/core-js/internals/array-set-length.js");
var deletePropertyOrThrow = __webpack_require__(/*! ../internals/delete-property-or-throw */ "./node_modules/core-js/internals/delete-property-or-throw.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "./node_modules/core-js/internals/does-not-exceed-safe-integer.js");

// IE8-
var INCORRECT_RESULT = [].unshift(0) !== 1;

// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_RESULT || !properErrorOnNonWritableLength();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O) O[to] = O[k];
        else deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    } return setArrayLength(O, len + argCount);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.error.cause.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.error.cause.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var wrapErrorConstructorWithCause = __webpack_require__(/*! ../internals/wrap-error-constructor-with-cause */ "./node_modules/core-js/internals/wrap-error-constructor-with-cause.js");

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.flags.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.flags.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "./node_modules/core-js/internals/define-built-in-accessor.js");
var regExpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp = globalThis.RegExp;
var RegExpPrototype = RegExp.prototype;

var FORCED = DESCRIPTORS && fails(function () {
  var INDICES_SUPPORT = true;
  try {
    RegExp('.', 'd');
  } catch (error) {
    INDICES_SUPPORT = false;
  }

  var O = {};
  // modern V8 bug
  var calls = '';
  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

  var addGetter = function (key, chr) {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(O, key, { get: function () {
      calls += chr;
      return true;
    } });
  };

  var pairs = {
    dotAll: 's',
    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    sticky: 'y'
  };

  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

  for (var key in pairs) addGetter(key, pairs[key]);

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var result = Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call(O);

  return result !== expected || calls !== expected;
});

// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED) defineBuiltInAccessor(RegExpPrototype, 'flags', {
  configurable: true,
  get: regExpFlags
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.at.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.at.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.find-last-index.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.find-last-index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var $findLastIndex = (__webpack_require__(/*! ../internals/array-iteration-from-last */ "./node_modules/core-js/internals/array-iteration-from-last.js").findLastIndex);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
exportTypedArrayMethod('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.find-last.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.find-last.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var $findLast = (__webpack_require__(/*! ../internals/array-iteration-from-last */ "./node_modules/core-js/internals/array-iteration-from-last.js").findLast);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
exportTypedArrayMethod('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.set.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.set.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toOffset = __webpack_require__(/*! ../internals/to-offset */ "./node_modules/core-js/internals/to-offset.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var RangeError = globalThis.RangeError;
var Int8Array = globalThis.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw new RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.sort.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.sort.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var internalSort = __webpack_require__(/*! ../internals/array-sort */ "./node_modules/core-js/internals/array-sort.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var FF = __webpack_require__(/*! ../internals/environment-ff-version */ "./node_modules/core-js/internals/environment-ff-version.js");
var IE_OR_EDGE = __webpack_require__(/*! ../internals/environment-is-ie-or-edge */ "./node_modules/core-js/internals/environment-is-ie-or-edge.js");
var V8 = __webpack_require__(/*! ../internals/environment-v8-version */ "./node_modules/core-js/internals/environment-v8-version.js");
var WEBKIT = __webpack_require__(/*! ../internals/environment-webkit-version */ "./node_modules/core-js/internals/environment-webkit-version.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = globalThis.Uint16Array;
var nativeSort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails(function () {
  nativeSort(new Uint16Array(2), null);
}) && fails(function () {
  nativeSort(new Uint16Array(2), {});
}));

var STABLE_SORT = !!nativeSort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  nativeSort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return nativeSort(this, comparefn);

  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.to-reversed.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.to-reversed.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var arrayToReversed = __webpack_require__(/*! ../internals/array-to-reversed */ "./node_modules/core-js/internals/array-to-reversed.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
exportTypedArrayMethod('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray(this), getTypedArrayConstructor(this));
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.to-sorted.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.to-sorted.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var arrayFromConstructorAndList = __webpack_require__(/*! ../internals/array-from-constructor-and-list */ "./node_modules/core-js/internals/array-from-constructor-and-list.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
exportTypedArrayMethod('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor(O), O);
  return sort(A, compareFn);
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.with.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.with.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var arrayWith = __webpack_require__(/*! ../internals/array-with */ "./node_modules/core-js/internals/array-with.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var isBigIntArray = __webpack_require__(/*! ../internals/is-big-int-array */ "./node_modules/core-js/internals/is-big-int-array.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");
var toBigInt = __webpack_require__(/*! ../internals/to-big-int */ "./node_modules/core-js/internals/to-big-int.js");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER = !!function () {
  try {
    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
exportTypedArrayMethod('with', { 'with': function (index, value) {
  var O = aTypedArray(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER);


/***/ }),

/***/ "./externals/BigInteger.js":
/*!*********************************!*\
  !*** ./externals/BigInteger.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_unshift_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.unshift.js */ "./node_modules/core-js/modules/es.array.unshift.js");



var bigInt = function (undefined) {
  'use strict';

  var BASE = 1e7,
    LOG_BASE = 7,
    MAX_INT = 9007199254740992,
    MAX_INT_ARR = smallToArray(MAX_INT),
    DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
  var supportsNativeBigInt = typeof BigInt === 'function';
  function Integer(v, radix, alphabet, caseSensitive) {
    if (typeof v === 'undefined') return Integer[0];
    if (typeof radix !== 'undefined') return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
    return parseValue(v);
  }
  function BigInteger(value, sign) {
    this.value = value;
    this.sign = sign;
    this.isSmall = false;
  }
  BigInteger.prototype = Object.create(Integer.prototype);
  function SmallInteger(value) {
    this.value = value;
    this.sign = value < 0;
    this.isSmall = true;
  }
  SmallInteger.prototype = Object.create(Integer.prototype);
  function NativeBigInt(value) {
    this.value = value;
  }
  NativeBigInt.prototype = Object.create(Integer.prototype);
  function isPrecise(n) {
    return -MAX_INT < n && n < MAX_INT;
  }
  function smallToArray(n) {
    if (n < 1e7) return [n];
    if (n < 1e14) return [n % 1e7, Math.floor(n / 1e7)];
    return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
  }
  function arrayToSmall(arr) {
    trim(arr);
    var length = arr.length;
    if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
      switch (length) {
        case 0:
          return 0;
        case 1:
          return arr[0];
        case 2:
          return arr[0] + arr[1] * BASE;
        default:
          return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
      }
    }
    return arr;
  }
  function trim(v) {
    var i = v.length;
    while (v[--i] === 0);
    v.length = i + 1;
  }
  function createArray(length) {
    var x = new Array(length);
    var i = -1;
    while (++i < length) {
      x[i] = 0;
    }
    return x;
  }
  function truncate(n) {
    if (n > 0) return Math.floor(n);
    return Math.ceil(n);
  }
  function add(a, b) {
    var l_a = a.length,
      l_b = b.length,
      r = new Array(l_a),
      carry = 0,
      base = BASE,
      sum,
      i;
    for (i = 0; i < l_b; i++) {
      sum = a[i] + b[i] + carry;
      carry = sum >= base ? 1 : 0;
      r[i] = sum - carry * base;
    }
    while (i < l_a) {
      sum = a[i] + carry;
      carry = sum === base ? 1 : 0;
      r[i++] = sum - carry * base;
    }
    if (carry > 0) r.push(carry);
    return r;
  }
  function addAny(a, b) {
    if (a.length >= b.length) return add(a, b);
    return add(b, a);
  }
  function addSmall(a, carry) {
    var l = a.length,
      r = new Array(l),
      base = BASE,
      sum,
      i;
    for (i = 0; i < l; i++) {
      sum = a[i] - base + carry;
      carry = Math.floor(sum / base);
      r[i] = sum - carry * base;
      carry += 1;
    }
    while (carry > 0) {
      r[i++] = carry % base;
      carry = Math.floor(carry / base);
    }
    return r;
  }
  BigInteger.prototype.add = function (v) {
    var n = parseValue(v);
    if (this.sign !== n.sign) {
      return this.subtract(n.negate());
    }
    var a = this.value,
      b = n.value;
    if (n.isSmall) {
      return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
    }
    return new BigInteger(addAny(a, b), this.sign);
  };
  BigInteger.prototype.plus = BigInteger.prototype.add;
  SmallInteger.prototype.add = function (v) {
    var n = parseValue(v);
    var a = this.value;
    if (a < 0 !== n.sign) {
      return this.subtract(n.negate());
    }
    var b = n.value;
    if (n.isSmall) {
      if (isPrecise(a + b)) return new SmallInteger(a + b);
      b = smallToArray(Math.abs(b));
    }
    return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
  };
  SmallInteger.prototype.plus = SmallInteger.prototype.add;
  NativeBigInt.prototype.add = function (v) {
    return new NativeBigInt(this.value + parseValue(v).value);
  };
  NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
  function subtract(a, b) {
    var a_l = a.length,
      b_l = b.length,
      r = new Array(a_l),
      borrow = 0,
      base = BASE,
      i,
      difference;
    for (i = 0; i < b_l; i++) {
      difference = a[i] - borrow - b[i];
      if (difference < 0) {
        difference += base;
        borrow = 1;
      } else borrow = 0;
      r[i] = difference;
    }
    for (i = b_l; i < a_l; i++) {
      difference = a[i] - borrow;
      if (difference < 0) difference += base;else {
        r[i++] = difference;
        break;
      }
      r[i] = difference;
    }
    for (; i < a_l; i++) {
      r[i] = a[i];
    }
    trim(r);
    return r;
  }
  function subtractAny(a, b, sign) {
    var value;
    if (compareAbs(a, b) >= 0) {
      value = subtract(a, b);
    } else {
      value = subtract(b, a);
      sign = !sign;
    }
    value = arrayToSmall(value);
    if (typeof value === 'number') {
      if (sign) value = -value;
      return new SmallInteger(value);
    }
    return new BigInteger(value, sign);
  }
  function subtractSmall(a, b, sign) {
    var l = a.length,
      r = new Array(l),
      carry = -b,
      base = BASE,
      i,
      difference;
    for (i = 0; i < l; i++) {
      difference = a[i] + carry;
      carry = Math.floor(difference / base);
      difference %= base;
      r[i] = difference < 0 ? difference + base : difference;
    }
    r = arrayToSmall(r);
    if (typeof r === 'number') {
      if (sign) r = -r;
      return new SmallInteger(r);
    }
    return new BigInteger(r, sign);
  }
  BigInteger.prototype.subtract = function (v) {
    var n = parseValue(v);
    if (this.sign !== n.sign) {
      return this.add(n.negate());
    }
    var a = this.value,
      b = n.value;
    if (n.isSmall) return subtractSmall(a, Math.abs(b), this.sign);
    return subtractAny(a, b, this.sign);
  };
  BigInteger.prototype.minus = BigInteger.prototype.subtract;
  SmallInteger.prototype.subtract = function (v) {
    var n = parseValue(v);
    var a = this.value;
    if (a < 0 !== n.sign) {
      return this.add(n.negate());
    }
    var b = n.value;
    if (n.isSmall) {
      return new SmallInteger(a - b);
    }
    return subtractSmall(b, Math.abs(a), a >= 0);
  };
  SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
  NativeBigInt.prototype.subtract = function (v) {
    return new NativeBigInt(this.value - parseValue(v).value);
  };
  NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
  BigInteger.prototype.negate = function () {
    return new BigInteger(this.value, !this.sign);
  };
  SmallInteger.prototype.negate = function () {
    var sign = this.sign;
    var small = new SmallInteger(-this.value);
    small.sign = !sign;
    return small;
  };
  NativeBigInt.prototype.negate = function () {
    return new NativeBigInt(-this.value);
  };
  BigInteger.prototype.abs = function () {
    return new BigInteger(this.value, false);
  };
  SmallInteger.prototype.abs = function () {
    return new SmallInteger(Math.abs(this.value));
  };
  NativeBigInt.prototype.abs = function () {
    return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
  };
  function multiplyLong(a, b) {
    var a_l = a.length,
      b_l = b.length,
      l = a_l + b_l,
      r = createArray(l),
      base = BASE,
      product,
      carry,
      i,
      a_i,
      b_j;
    for (i = 0; i < a_l; ++i) {
      a_i = a[i];
      for (var j = 0; j < b_l; ++j) {
        b_j = b[j];
        product = a_i * b_j + r[i + j];
        carry = Math.floor(product / base);
        r[i + j] = product - carry * base;
        r[i + j + 1] += carry;
      }
    }
    trim(r);
    return r;
  }
  function multiplySmall(a, b) {
    var l = a.length,
      r = new Array(l),
      base = BASE,
      carry = 0,
      product,
      i;
    for (i = 0; i < l; i++) {
      product = a[i] * b + carry;
      carry = Math.floor(product / base);
      r[i] = product - carry * base;
    }
    while (carry > 0) {
      r[i++] = carry % base;
      carry = Math.floor(carry / base);
    }
    return r;
  }
  function shiftLeft(x, n) {
    var r = [];
    while (n-- > 0) r.push(0);
    return r.concat(x);
  }
  function multiplyKaratsuba(x, y) {
    var n = Math.max(x.length, y.length);
    if (n <= 30) return multiplyLong(x, y);
    n = Math.ceil(n / 2);
    var b = x.slice(n),
      a = x.slice(0, n),
      d = y.slice(n),
      c = y.slice(0, n);
    var ac = multiplyKaratsuba(a, c),
      bd = multiplyKaratsuba(b, d),
      abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
    var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
    trim(product);
    return product;
  }
  function useKaratsuba(l1, l2) {
    return -.012 * l1 - .012 * l2 + 15e-6 * l1 * l2 > 0;
  }
  BigInteger.prototype.multiply = function (v) {
    var n = parseValue(v),
      a = this.value,
      b = n.value,
      sign = this.sign !== n.sign,
      abs;
    if (n.isSmall) {
      if (b === 0) return Integer[0];
      if (b === 1) return this;
      if (b === -1) return this.negate();
      abs = Math.abs(b);
      if (abs < BASE) {
        return new BigInteger(multiplySmall(a, abs), sign);
      }
      b = smallToArray(abs);
    }
    if (useKaratsuba(a.length, b.length)) return new BigInteger(multiplyKaratsuba(a, b), sign);
    return new BigInteger(multiplyLong(a, b), sign);
  };
  BigInteger.prototype.times = BigInteger.prototype.multiply;
  function multiplySmallAndArray(a, b, sign) {
    if (a < BASE) {
      return new BigInteger(multiplySmall(b, a), sign);
    }
    return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
  }
  SmallInteger.prototype._multiplyBySmall = function (a) {
    if (isPrecise(a.value * this.value)) {
      return new SmallInteger(a.value * this.value);
    }
    return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
  };
  BigInteger.prototype._multiplyBySmall = function (a) {
    if (a.value === 0) return Integer[0];
    if (a.value === 1) return this;
    if (a.value === -1) return this.negate();
    return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
  };
  SmallInteger.prototype.multiply = function (v) {
    return parseValue(v)._multiplyBySmall(this);
  };
  SmallInteger.prototype.times = SmallInteger.prototype.multiply;
  NativeBigInt.prototype.multiply = function (v) {
    return new NativeBigInt(this.value * parseValue(v).value);
  };
  NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
  function square(a) {
    var l = a.length,
      r = createArray(l + l),
      base = BASE,
      product,
      carry,
      i,
      a_i,
      a_j;
    for (i = 0; i < l; i++) {
      a_i = a[i];
      carry = 0 - a_i * a_i;
      for (var j = i; j < l; j++) {
        a_j = a[j];
        product = 2 * (a_i * a_j) + r[i + j] + carry;
        carry = Math.floor(product / base);
        r[i + j] = product - carry * base;
      }
      r[i + l] = carry;
    }
    trim(r);
    return r;
  }
  BigInteger.prototype.square = function () {
    return new BigInteger(square(this.value), false);
  };
  SmallInteger.prototype.square = function () {
    var value = this.value * this.value;
    if (isPrecise(value)) return new SmallInteger(value);
    return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
  };
  NativeBigInt.prototype.square = function (v) {
    return new NativeBigInt(this.value * this.value);
  };
  function divMod1(a, b) {
    var a_l = a.length,
      b_l = b.length,
      base = BASE,
      result = createArray(b.length),
      divisorMostSignificantDigit = b[b_l - 1],
      lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
      remainder = multiplySmall(a, lambda),
      divisor = multiplySmall(b, lambda),
      quotientDigit,
      shift,
      carry,
      borrow,
      i,
      l,
      q;
    if (remainder.length <= a_l) remainder.push(0);
    divisor.push(0);
    divisorMostSignificantDigit = divisor[b_l - 1];
    for (shift = a_l - b_l; shift >= 0; shift--) {
      quotientDigit = base - 1;
      if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
        quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
      }
      carry = 0;
      borrow = 0;
      l = divisor.length;
      for (i = 0; i < l; i++) {
        carry += quotientDigit * divisor[i];
        q = Math.floor(carry / base);
        borrow += remainder[shift + i] - (carry - q * base);
        carry = q;
        if (borrow < 0) {
          remainder[shift + i] = borrow + base;
          borrow = -1;
        } else {
          remainder[shift + i] = borrow;
          borrow = 0;
        }
      }
      while (borrow !== 0) {
        quotientDigit -= 1;
        carry = 0;
        for (i = 0; i < l; i++) {
          carry += remainder[shift + i] - base + divisor[i];
          if (carry < 0) {
            remainder[shift + i] = carry + base;
            carry = 0;
          } else {
            remainder[shift + i] = carry;
            carry = 1;
          }
        }
        borrow += carry;
      }
      result[shift] = quotientDigit;
    }
    remainder = divModSmall(remainder, lambda)[0];
    return [arrayToSmall(result), arrayToSmall(remainder)];
  }
  function divMod2(a, b) {
    var a_l = a.length,
      b_l = b.length,
      result = [],
      part = [],
      base = BASE,
      guess,
      xlen,
      highx,
      highy,
      check;
    while (a_l) {
      part.unshift(a[--a_l]);
      trim(part);
      if (compareAbs(part, b) < 0) {
        result.push(0);
        continue;
      }
      xlen = part.length;
      highx = part[xlen - 1] * base + part[xlen - 2];
      highy = b[b_l - 1] * base + b[b_l - 2];
      if (xlen > b_l) {
        highx = (highx + 1) * base;
      }
      guess = Math.ceil(highx / highy);
      do {
        check = multiplySmall(b, guess);
        if (compareAbs(check, part) <= 0) break;
        guess--;
      } while (guess);
      result.push(guess);
      part = subtract(part, check);
    }
    result.reverse();
    return [arrayToSmall(result), arrayToSmall(part)];
  }
  function divModSmall(value, lambda) {
    var length = value.length,
      quotient = createArray(length),
      base = BASE,
      i,
      q,
      remainder,
      divisor;
    remainder = 0;
    for (i = length - 1; i >= 0; --i) {
      divisor = remainder * base + value[i];
      q = truncate(divisor / lambda);
      remainder = divisor - q * lambda;
      quotient[i] = q | 0;
    }
    return [quotient, remainder | 0];
  }
  function divModAny(self, v) {
    var value,
      n = parseValue(v);
    if (supportsNativeBigInt) {
      return [new NativeBigInt(self.value / n.value), new NativeBigInt(self.value % n.value)];
    }
    var a = self.value,
      b = n.value;
    var quotient;
    if (b === 0) throw new Error('Cannot divide by zero');
    if (self.isSmall) {
      if (n.isSmall) {
        return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
      }
      return [Integer[0], self];
    }
    if (n.isSmall) {
      if (b === 1) return [self, Integer[0]];
      if (b == -1) return [self.negate(), Integer[0]];
      var abs = Math.abs(b);
      if (abs < BASE) {
        value = divModSmall(a, abs);
        quotient = arrayToSmall(value[0]);
        var remainder = value[1];
        if (self.sign) remainder = -remainder;
        if (typeof quotient === 'number') {
          if (self.sign !== n.sign) quotient = -quotient;
          return [new SmallInteger(quotient), new SmallInteger(remainder)];
        }
        return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
      }
      b = smallToArray(abs);
    }
    var comparison = compareAbs(a, b);
    if (comparison === -1) return [Integer[0], self];
    if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];
    if (a.length + b.length <= 200) value = divMod1(a, b);else value = divMod2(a, b);
    quotient = value[0];
    var qSign = self.sign !== n.sign,
      mod = value[1],
      mSign = self.sign;
    if (typeof quotient === 'number') {
      if (qSign) quotient = -quotient;
      quotient = new SmallInteger(quotient);
    } else quotient = new BigInteger(quotient, qSign);
    if (typeof mod === 'number') {
      if (mSign) mod = -mod;
      mod = new SmallInteger(mod);
    } else mod = new BigInteger(mod, mSign);
    return [quotient, mod];
  }
  BigInteger.prototype.divmod = function (v) {
    var result = divModAny(this, v);
    return {
      quotient: result[0],
      remainder: result[1]
    };
  };
  NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger.prototype.divmod;
  BigInteger.prototype.divide = function (v) {
    return divModAny(this, v)[0];
  };
  NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function (v) {
    return new NativeBigInt(this.value / parseValue(v).value);
  };
  SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;
  BigInteger.prototype.mod = function (v) {
    return divModAny(this, v)[1];
  };
  NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function (v) {
    return new NativeBigInt(this.value % parseValue(v).value);
  };
  SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;
  BigInteger.prototype.pow = function (v) {
    var n = parseValue(v),
      a = this.value,
      b = n.value,
      value,
      x,
      y;
    if (b === 0) return Integer[1];
    if (a === 0) return Integer[0];
    if (a === 1) return Integer[1];
    if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
    if (n.sign) {
      return Integer[0];
    }
    if (!n.isSmall) throw new Error('The exponent ' + n.toString() + ' is too large.');
    if (this.isSmall) {
      if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate(value));
    }
    x = this;
    y = Integer[1];
    while (true) {
      if (b & 1 === 1) {
        y = y.times(x);
        --b;
      }
      if (b === 0) break;
      b /= 2;
      x = x.square();
    }
    return y;
  };
  SmallInteger.prototype.pow = BigInteger.prototype.pow;
  NativeBigInt.prototype.pow = function (v) {
    var n = parseValue(v);
    var a = this.value,
      b = n.value;
    var _0 = BigInt(0),
      _1 = BigInt(1),
      _2 = BigInt(2);
    if (b === _0) return Integer[1];
    if (a === _0) return Integer[0];
    if (a === _1) return Integer[1];
    if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
    if (n.isNegative()) return new NativeBigInt(_0);
    var x = this;
    var y = Integer[1];
    while (true) {
      if ((b & _1) === _1) {
        y = y.times(x);
        --b;
      }
      if (b === _0) break;
      b /= _2;
      x = x.square();
    }
    return y;
  };
  BigInteger.prototype.modPow = function (exp, mod) {
    exp = parseValue(exp);
    mod = parseValue(mod);
    if (mod.isZero()) throw new Error('Cannot take modPow with modulus 0');
    var r = Integer[1],
      base = this.mod(mod);
    while (exp.isPositive()) {
      if (base.isZero()) return Integer[0];
      if (exp.isOdd()) r = r.multiply(base).mod(mod);
      exp = exp.divide(2);
      base = base.square().mod(mod);
    }
    return r;
  };
  NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger.prototype.modPow;
  function compareAbs(a, b) {
    if (a.length !== b.length) {
      return a.length > b.length ? 1 : -1;
    }
    for (var i = a.length - 1; i >= 0; i--) {
      if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
    }
    return 0;
  }
  BigInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
      a = this.value,
      b = n.value;
    if (n.isSmall) return 1;
    return compareAbs(a, b);
  };
  SmallInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
      a = Math.abs(this.value),
      b = n.value;
    if (n.isSmall) {
      b = Math.abs(b);
      return a === b ? 0 : a > b ? 1 : -1;
    }
    return -1;
  };
  NativeBigInt.prototype.compareAbs = function (v) {
    var a = this.value;
    var b = parseValue(v).value;
    a = a >= 0 ? a : -a;
    b = b >= 0 ? b : -b;
    return a === b ? 0 : a > b ? 1 : -1;
  };
  BigInteger.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }
    if (v === -Infinity) {
      return 1;
    }
    var n = parseValue(v),
      a = this.value,
      b = n.value;
    if (this.sign !== n.sign) {
      return n.sign ? 1 : -1;
    }
    if (n.isSmall) {
      return this.sign ? -1 : 1;
    }
    return compareAbs(a, b) * (this.sign ? -1 : 1);
  };
  BigInteger.prototype.compareTo = BigInteger.prototype.compare;
  SmallInteger.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }
    if (v === -Infinity) {
      return 1;
    }
    var n = parseValue(v),
      a = this.value,
      b = n.value;
    if (n.isSmall) {
      return a == b ? 0 : a > b ? 1 : -1;
    }
    if (a < 0 !== n.sign) {
      return a < 0 ? -1 : 1;
    }
    return a < 0 ? 1 : -1;
  };
  SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
  NativeBigInt.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }
    if (v === -Infinity) {
      return 1;
    }
    var a = this.value;
    var b = parseValue(v).value;
    return a === b ? 0 : a > b ? 1 : -1;
  };
  NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
  BigInteger.prototype.equals = function (v) {
    return this.compare(v) === 0;
  };
  NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;
  BigInteger.prototype.notEquals = function (v) {
    return this.compare(v) !== 0;
  };
  NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;
  BigInteger.prototype.greater = function (v) {
    return this.compare(v) > 0;
  };
  NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;
  BigInteger.prototype.lesser = function (v) {
    return this.compare(v) < 0;
  };
  NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;
  BigInteger.prototype.greaterOrEquals = function (v) {
    return this.compare(v) >= 0;
  };
  NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;
  BigInteger.prototype.lesserOrEquals = function (v) {
    return this.compare(v) <= 0;
  };
  NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;
  BigInteger.prototype.isEven = function () {
    return (this.value[0] & 1) === 0;
  };
  SmallInteger.prototype.isEven = function () {
    return (this.value & 1) === 0;
  };
  NativeBigInt.prototype.isEven = function () {
    return (this.value & BigInt(1)) === BigInt(0);
  };
  BigInteger.prototype.isOdd = function () {
    return (this.value[0] & 1) === 1;
  };
  SmallInteger.prototype.isOdd = function () {
    return (this.value & 1) === 1;
  };
  NativeBigInt.prototype.isOdd = function () {
    return (this.value & BigInt(1)) === BigInt(1);
  };
  BigInteger.prototype.isPositive = function () {
    return !this.sign;
  };
  SmallInteger.prototype.isPositive = function () {
    return this.value > 0;
  };
  NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
  BigInteger.prototype.isNegative = function () {
    return this.sign;
  };
  SmallInteger.prototype.isNegative = function () {
    return this.value < 0;
  };
  NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
  BigInteger.prototype.isUnit = function () {
    return false;
  };
  SmallInteger.prototype.isUnit = function () {
    return Math.abs(this.value) === 1;
  };
  NativeBigInt.prototype.isUnit = function () {
    return this.abs().value === BigInt(1);
  };
  BigInteger.prototype.isZero = function () {
    return false;
  };
  SmallInteger.prototype.isZero = function () {
    return this.value === 0;
  };
  NativeBigInt.prototype.isZero = function () {
    return this.value === BigInt(0);
  };
  BigInteger.prototype.isDivisibleBy = function (v) {
    var n = parseValue(v);
    if (n.isZero()) return false;
    if (n.isUnit()) return true;
    if (n.compareAbs(2) === 0) return this.isEven();
    return this.mod(n).isZero();
  };
  NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;
  function isBasicPrime(v) {
    var n = v.abs();
    if (n.isUnit()) return false;
    if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
    if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
    if (n.lesser(49)) return true;
  }
  function millerRabinTest(n, a) {
    var nPrev = n.prev(),
      b = nPrev,
      r = 0,
      d,
      t,
      i,
      x;
    while (b.isEven()) b = b.divide(2), r++;
    next: for (i = 0; i < a.length; i++) {
      if (n.lesser(a[i])) continue;
      x = bigInt(a[i]).modPow(b, n);
      if (x.isUnit() || x.equals(nPrev)) continue;
      for (d = r - 1; d != 0; d--) {
        x = x.square().mod(n);
        if (x.isUnit()) return false;
        if (x.equals(nPrev)) continue next;
      }
      return false;
    }
    return true;
  }
  BigInteger.prototype.isPrime = function (strict) {
    var isPrime = isBasicPrime(this);
    if (isPrime !== undefined) return isPrime;
    var n = this.abs();
    var bits = n.bitLength();
    if (bits <= 64) return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
    var logN = Math.log(2) * bits.toJSNumber();
    var t = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
    for (var a = [], i = 0; i < t; i++) {
      a.push(bigInt(i + 2));
    }
    return millerRabinTest(n, a);
  };
  NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;
  BigInteger.prototype.isProbablePrime = function (iterations) {
    var isPrime = isBasicPrime(this);
    if (isPrime !== undefined) return isPrime;
    var n = this.abs();
    var t = iterations === undefined ? 5 : iterations;
    for (var a = [], i = 0; i < t; i++) {
      a.push(bigInt.randBetween(2, n.minus(2)));
    }
    return millerRabinTest(n, a);
  };
  NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;
  BigInteger.prototype.modInv = function (n) {
    var t = bigInt.zero,
      newT = bigInt.one,
      r = parseValue(n),
      newR = this.abs(),
      q,
      lastT,
      lastR;
    while (!newR.isZero()) {
      q = r.divide(newR);
      lastT = t;
      lastR = r;
      t = newT;
      r = newR;
      newT = lastT.subtract(q.multiply(newT));
      newR = lastR.subtract(q.multiply(newR));
    }
    if (!r.isUnit()) throw new Error(this.toString() + ' and ' + n.toString() + ' are not co-prime');
    if (t.compare(0) === -1) {
      t = t.add(n);
    }
    if (this.isNegative()) {
      return t.negate();
    }
    return t;
  };
  NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger.prototype.modInv;
  BigInteger.prototype.next = function () {
    var value = this.value;
    if (this.sign) {
      return subtractSmall(value, 1, this.sign);
    }
    return new BigInteger(addSmall(value, 1), this.sign);
  };
  SmallInteger.prototype.next = function () {
    var value = this.value;
    if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
    return new BigInteger(MAX_INT_ARR, false);
  };
  NativeBigInt.prototype.next = function () {
    return new NativeBigInt(this.value + BigInt(1));
  };
  BigInteger.prototype.prev = function () {
    var value = this.value;
    if (this.sign) {
      return new BigInteger(addSmall(value, 1), true);
    }
    return subtractSmall(value, 1, this.sign);
  };
  SmallInteger.prototype.prev = function () {
    var value = this.value;
    if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
    return new BigInteger(MAX_INT_ARR, true);
  };
  NativeBigInt.prototype.prev = function () {
    return new NativeBigInt(this.value - BigInt(1));
  };
  var powersOfTwo = [1];
  while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
  var powers2Length = powersOfTwo.length,
    highestPower2 = powersOfTwo[powers2Length - 1];
  function shift_isSmall(n) {
    return Math.abs(n) <= BASE;
  }
  BigInteger.prototype.shiftLeft = function (v) {
    var n = parseValue(v).toJSNumber();
    if (!shift_isSmall(n)) {
      throw new Error(String(n) + ' is too large for shifting.');
    }
    if (n < 0) return this.shiftRight(-n);
    var result = this;
    if (result.isZero()) return result;
    while (n >= powers2Length) {
      result = result.multiply(highestPower2);
      n -= powers2Length - 1;
    }
    return result.multiply(powersOfTwo[n]);
  };
  NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;
  BigInteger.prototype.shiftRight = function (v) {
    var remQuo;
    var n = parseValue(v).toJSNumber();
    if (!shift_isSmall(n)) {
      throw new Error(String(n) + ' is too large for shifting.');
    }
    if (n < 0) return this.shiftLeft(-n);
    var result = this;
    while (n >= powers2Length) {
      if (result.isZero() || result.isNegative() && result.isUnit()) return result;
      remQuo = divModAny(result, highestPower2);
      result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
      n -= powers2Length - 1;
    }
    remQuo = divModAny(result, powersOfTwo[n]);
    return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
  };
  NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;
  function bitwise(x, y, fn) {
    y = parseValue(y);
    var xSign = x.isNegative(),
      ySign = y.isNegative();
    var xRem = xSign ? x.not() : x,
      yRem = ySign ? y.not() : y;
    var xDigit = 0,
      yDigit = 0;
    var xDivMod = null,
      yDivMod = null;
    var result = [];
    while (!xRem.isZero() || !yRem.isZero()) {
      xDivMod = divModAny(xRem, highestPower2);
      xDigit = xDivMod[1].toJSNumber();
      if (xSign) {
        xDigit = highestPower2 - 1 - xDigit;
      }
      yDivMod = divModAny(yRem, highestPower2);
      yDigit = yDivMod[1].toJSNumber();
      if (ySign) {
        yDigit = highestPower2 - 1 - yDigit;
      }
      xRem = xDivMod[0];
      yRem = yDivMod[0];
      result.push(fn(xDigit, yDigit));
    }
    var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0);
    for (var i = result.length - 1; i >= 0; i -= 1) {
      sum = sum.multiply(highestPower2).add(bigInt(result[i]));
    }
    return sum;
  }
  BigInteger.prototype.not = function () {
    return this.negate().prev();
  };
  NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger.prototype.not;
  BigInteger.prototype.and = function (n) {
    return bitwise(this, n, function (a, b) {
      return a & b;
    });
  };
  NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger.prototype.and;
  BigInteger.prototype.or = function (n) {
    return bitwise(this, n, function (a, b) {
      return a | b;
    });
  };
  NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger.prototype.or;
  BigInteger.prototype.xor = function (n) {
    return bitwise(this, n, function (a, b) {
      return a ^ b;
    });
  };
  NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger.prototype.xor;
  var LOBMASK_I = 1 << 30,
    LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
  function roughLOB(n) {
    var v = n.value,
      x = typeof v === 'number' ? v | LOBMASK_I : typeof v === 'bigint' ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;
    return x & -x;
  }
  function integerLogarithm(value, base) {
    if (base.compareTo(value) <= 0) {
      var tmp = integerLogarithm(value, base.square(base));
      var p = tmp.p;
      var e = tmp.e;
      var t = p.multiply(base);
      return t.compareTo(value) <= 0 ? {
        p: t,
        e: e * 2 + 1
      } : {
        p: p,
        e: e * 2
      };
    }
    return {
      p: bigInt(1),
      e: 0
    };
  }
  BigInteger.prototype.bitLength = function () {
    var n = this;
    if (n.compareTo(bigInt(0)) < 0) {
      n = n.negate().subtract(bigInt(1));
    }
    if (n.compareTo(bigInt(0)) === 0) {
      return bigInt(0);
    }
    return bigInt(integerLogarithm(n, bigInt(2)).e).add(bigInt(1));
  };
  NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger.prototype.bitLength;
  function max(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    return a.greater(b) ? a : b;
  }
  function min(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    return a.lesser(b) ? a : b;
  }
  function gcd(a, b) {
    a = parseValue(a).abs();
    b = parseValue(b).abs();
    if (a.equals(b)) return a;
    if (a.isZero()) return b;
    if (b.isZero()) return a;
    var c = Integer[1],
      d,
      t;
    while (a.isEven() && b.isEven()) {
      d = min(roughLOB(a), roughLOB(b));
      a = a.divide(d);
      b = b.divide(d);
      c = c.multiply(d);
    }
    while (a.isEven()) {
      a = a.divide(roughLOB(a));
    }
    do {
      while (b.isEven()) {
        b = b.divide(roughLOB(b));
      }
      if (a.greater(b)) {
        t = b;
        b = a;
        a = t;
      }
      b = b.subtract(a);
    } while (!b.isZero());
    return c.isUnit() ? a : a.multiply(c);
  }
  function lcm(a, b) {
    a = parseValue(a).abs();
    b = parseValue(b).abs();
    return a.divide(gcd(a, b)).multiply(b);
  }
  function randBetween(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    var low = min(a, b),
      high = max(a, b);
    var range = high.subtract(low).add(1);
    if (range.isSmall) return low.add(Math.floor(Math.random() * range));
    var digits = toBase(range, BASE).value;
    var result = [],
      restricted = true;
    for (var i = 0; i < digits.length; i++) {
      var top = restricted ? digits[i] : BASE;
      var digit = truncate(Math.random() * top);
      result.push(digit);
      if (digit < top) restricted = false;
    }
    return low.add(Integer.fromArray(result, BASE, false));
  }
  var parseBase = function (text, base, alphabet, caseSensitive) {
    alphabet = alphabet || DEFAULT_ALPHABET;
    text = String(text);
    if (!caseSensitive) {
      text = text.toLowerCase();
      alphabet = alphabet.toLowerCase();
    }
    var length = text.length;
    var i;
    var absBase = Math.abs(base);
    var alphabetValues = {};
    for (i = 0; i < alphabet.length; i++) {
      alphabetValues[alphabet[i]] = i;
    }
    for (i = 0; i < length; i++) {
      var c = text[i];
      if (c === '-') continue;
      if (c in alphabetValues) {
        if (alphabetValues[c] >= absBase) {
          if (c === '1' && absBase === 1) continue;
          throw new Error(c + ' is not a valid digit in base ' + base + '.');
        }
      }
    }
    base = parseValue(base);
    var digits = [];
    var isNegative = text[0] === '-';
    for (i = isNegative ? 1 : 0; i < text.length; i++) {
      var c = text[i];
      if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));else if (c === '<') {
        var start = i;
        do {
          i++;
        } while (text[i] !== '>' && i < text.length);
        digits.push(parseValue(text.slice(start + 1, i)));
      } else throw new Error(c + ' is not a valid character');
    }
    return parseBaseFromArray(digits, base, isNegative);
  };
  function parseBaseFromArray(digits, base, isNegative) {
    var val = Integer[0],
      pow = Integer[1],
      i;
    for (i = digits.length - 1; i >= 0; i--) {
      val = val.add(digits[i].times(pow));
      pow = pow.times(base);
    }
    return isNegative ? val.negate() : val;
  }
  function stringify(digit, alphabet) {
    alphabet = alphabet || DEFAULT_ALPHABET;
    if (digit < alphabet.length) {
      return alphabet[digit];
    }
    return '<' + digit + '>';
  }
  function toBase(n, base) {
    base = bigInt(base);
    if (base.isZero()) {
      if (n.isZero()) return {
        value: [0],
        isNegative: false
      };
      throw new Error('Cannot convert nonzero numbers to base 0.');
    }
    if (base.equals(-1)) {
      if (n.isZero()) return {
        value: [0],
        isNegative: false
      };
      if (n.isNegative()) return {
        value: [].concat.apply([], Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
        isNegative: false
      };
      var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
      arr.unshift([1]);
      return {
        value: [].concat.apply([], arr),
        isNegative: false
      };
    }
    var neg = false;
    if (n.isNegative() && base.isPositive()) {
      neg = true;
      n = n.abs();
    }
    if (base.isUnit()) {
      if (n.isZero()) return {
        value: [0],
        isNegative: false
      };
      return {
        value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1),
        isNegative: neg
      };
    }
    var out = [];
    var left = n,
      divmod;
    while (left.isNegative() || left.compareAbs(base) >= 0) {
      divmod = left.divmod(base);
      left = divmod.quotient;
      var digit = divmod.remainder;
      if (digit.isNegative()) {
        digit = base.minus(digit).abs();
        left = left.next();
      }
      out.push(digit.toJSNumber());
    }
    out.push(left.toJSNumber());
    return {
      value: out.reverse(),
      isNegative: neg
    };
  }
  function toBaseString(n, base, alphabet) {
    var arr = toBase(n, base);
    return (arr.isNegative ? '-' : '') + arr.value.map(function (x) {
      return stringify(x, alphabet);
    }).join('');
  }
  BigInteger.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };
  SmallInteger.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };
  NativeBigInt.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };
  BigInteger.prototype.toString = function (radix, alphabet) {
    if (radix === undefined) radix = 10;
    if (radix !== 10) return toBaseString(this, radix, alphabet);
    var v = this.value,
      l = v.length,
      str = String(v[--l]),
      zeros = '0000000',
      digit;
    while (--l >= 0) {
      digit = String(v[l]);
      str += zeros.slice(digit.length) + digit;
    }
    var sign = this.sign ? '-' : '';
    return sign + str;
  };
  SmallInteger.prototype.toString = function (radix, alphabet) {
    if (radix === undefined) radix = 10;
    if (radix != 10) return toBaseString(this, radix, alphabet);
    return String(this.value);
  };
  NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
  NativeBigInt.prototype.toJSON = BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function () {
    return this.toString();
  };
  BigInteger.prototype.valueOf = function () {
    return parseInt(this.toString(), 10);
  };
  BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;
  SmallInteger.prototype.valueOf = function () {
    return this.value;
  };
  SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
  NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function () {
    return parseInt(this.toString(), 10);
  };
  function parseStringValue(v) {
    if (isPrecise(+v)) {
      var x = +v;
      if (x === truncate(x)) return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
      throw new Error('Invalid integer: ' + v);
    }
    var sign = v[0] === '-';
    if (sign) v = v.slice(1);
    var split = v.split(/e/i);
    if (split.length > 2) throw new Error('Invalid integer: ' + split.join('e'));
    if (split.length === 2) {
      var exp = split[1];
      if (exp[0] === '+') exp = exp.slice(1);
      exp = +exp;
      if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error('Invalid integer: ' + exp + ' is not a valid exponent.');
      var text = split[0];
      var decimalPlace = text.indexOf('.');
      if (decimalPlace >= 0) {
        exp -= text.length - decimalPlace - 1;
        text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
      }
      if (exp < 0) throw new Error('Cannot include negative exponent part for integers');
      text += new Array(exp + 1).join('0');
      v = text;
    }
    var isValid = /^([0-9][0-9]*)$/.test(v);
    if (!isValid) throw new Error('Invalid integer: ' + v);
    if (supportsNativeBigInt) {
      return new NativeBigInt(BigInt(sign ? '-' + v : v));
    }
    var r = [],
      max = v.length,
      l = LOG_BASE,
      min = max - l;
    while (max > 0) {
      r.push(+v.slice(min, max));
      min -= l;
      if (min < 0) min = 0;
      max -= l;
    }
    trim(r);
    return new BigInteger(r, sign);
  }
  function parseNumberValue(v) {
    if (supportsNativeBigInt) {
      return new NativeBigInt(BigInt(v));
    }
    if (isPrecise(v)) {
      if (v !== truncate(v)) throw new Error(v + ' is not an integer.');
      return new SmallInteger(v);
    }
    return parseStringValue(v.toString());
  }
  function parseValue(v) {
    if (typeof v === 'number') {
      return parseNumberValue(v);
    }
    if (typeof v === 'string') {
      return parseStringValue(v);
    }
    if (typeof v === 'bigint') {
      return new NativeBigInt(v);
    }
    return v;
  }
  for (var i = 0; i < 1e3; i++) {
    Integer[i] = parseValue(i);
    if (i > 0) Integer[-i] = parseValue(-i);
  }
  Integer.one = Integer[1];
  Integer.zero = Integer[0];
  Integer.minusOne = Integer[-1];
  Integer.max = max;
  Integer.min = min;
  Integer.gcd = gcd;
  Integer.lcm = lcm;
  Integer.isInstance = function (x) {
    return x instanceof BigInteger || x instanceof SmallInteger || x instanceof NativeBigInt;
  };
  Integer.randBetween = randBetween;
  Integer.fromArray = function (digits, base, isNegative) {
    return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
  };
  return Integer;
}();
if (typeof define === 'function' && define.amd) {
  define('big-integer', [], function () {
    return bigInt;
  });
}
/* harmony default export */ __webpack_exports__["default"] = (bigInt);

/***/ }),

/***/ "./src/core/EventBus.js":
/*!******************************!*\
  !*** ./src/core/EventBus.js ***!
  \******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../streaming/MediaPlayerEvents.js */ "./src/streaming/MediaPlayerEvents.js");


/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


const EVENT_PRIORITY_LOW = 0;
const EVENT_PRIORITY_HIGH = 5000;
function EventBus() {
  let handlers = {};
  function _commonOn(type, listener, scope, options = {}, executeOnlyOnce = false) {
    if (!type) {
      throw new Error('event type cannot be null or undefined');
    }
    if (!listener || typeof listener !== 'function') {
      throw new Error('listener must be a function: ' + listener);
    }
    let priority = options.priority || EVENT_PRIORITY_LOW;
    if (getHandlerIdx(type, listener, scope) >= 0) {
      return;
    }
    handlers[type] = handlers[type] || [];
    const handler = {
      callback: listener,
      scope,
      priority,
      executeOnlyOnce
    };
    if (scope && scope.getStreamId) {
      handler.streamId = scope.getStreamId();
    }
    if (scope && scope.getType) {
      handler.mediaType = scope.getType();
    }
    if (options && options.mode) {
      handler.mode = options.mode;
    }
    const inserted = handlers[type].some((item, idx) => {
      if (item && priority > item.priority) {
        handlers[type].splice(idx, 0, handler);
        return true;
      }
    });
    if (!inserted) {
      handlers[type].push(handler);
    }
  }
  function on(type, listener, scope, options = {}) {
    _commonOn(type, listener, scope, options);
  }
  function once(type, listener, scope, options = {}) {
    _commonOn(type, listener, scope, options, true);
  }
  function off(type, listener, scope) {
    if (!type || !listener || !handlers[type]) {
      return;
    }
    const idx = getHandlerIdx(type, listener, scope);
    if (idx < 0) {
      return;
    }
    handlers[type][idx] = null;
  }
  function trigger(type, payload = {}, filters = {}) {
    if (!type || !handlers[type]) {
      return;
    }
    payload = payload || {};
    if (payload.hasOwnProperty('type')) {
      throw new Error('\'type\' is a reserved word for event dispatching');
    }
    payload.type = type;
    if (filters.streamId) {
      payload.streamId = filters.streamId;
    }
    if (filters.mediaType) {
      payload.mediaType = filters.mediaType;
    }
    const handlersToRemove = [];
    handlers[type].filter(handler => {
      if (!handler) {
        return false;
      }
      if (filters.streamId && handler.streamId && handler.streamId !== filters.streamId) {
        return false;
      }
      if (filters.mediaType && handler.mediaType && handler.mediaType !== filters.mediaType) {
        return false;
      }
      // This is used for dispatching DASH events. By default we use the onStart mode. Consequently we filter everything that has a non matching mode and the onReceive events for handlers that did not specify a mode.
      if (filters.mode && handler.mode && handler.mode !== filters.mode || !handler.mode && filters.mode && filters.mode === _streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_MODE_ON_RECEIVE) {
        return false;
      }
      return true;
    }).forEach(handler => {
      handler && handler.callback.call(handler.scope, payload);
      if (handler.executeOnlyOnce) {
        handlersToRemove.push(handler);
      }
    });
    handlersToRemove.forEach(handler => {
      off(type, handler.callback, handler.scope);
    });
  }
  function getHandlerIdx(type, listener, scope) {
    let idx = -1;
    if (!handlers[type]) {
      return idx;
    }
    handlers[type].some((item, index) => {
      if (item && item.callback === listener && (!scope || scope === item.scope)) {
        idx = index;
        return true;
      }
    });
    return idx;
  }
  function reset() {
    handlers = {};
  }
  const instance = {
    on,
    once,
    off,
    trigger,
    reset
  };
  return instance;
}
EventBus.__dashjs_factory_name = 'EventBus';
const factory = _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(EventBus);
factory.EVENT_PRIORITY_LOW = EVENT_PRIORITY_LOW;
factory.EVENT_PRIORITY_HIGH = EVENT_PRIORITY_HIGH;
_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].updateSingletonFactory(EventBus.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/FactoryMaker.js":
/*!**********************************!*\
  !*** ./src/core/FactoryMaker.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @module FactoryMaker
 * @ignore
 */
const FactoryMaker = function () {
  let instance;
  let singletonContexts = [];
  const singletonFactories = {};
  const classFactories = {};
  function extend(name, childInstance, override, context) {
    if (!context[name] && childInstance) {
      context[name] = {
        instance: childInstance,
        override: override
      };
    }
  }

  /**
   * Use this method from your extended object.  this.factory is injected into your object.
   * this.factory.getSingletonInstance(this.context, 'VideoModel')
   * will return the video model for use in the extended object.
   *
   * @param {Object} context - injected into extended object as this.context
   * @param {string} className - string name found in all dash.js objects
   * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
   * @returns {*} Context aware instance of specified singleton name.
   * @memberof module:FactoryMaker
   * @instance
   */
  function getSingletonInstance(context, className) {
    for (const i in singletonContexts) {
      const obj = singletonContexts[i];
      if (obj.context === context && obj.name === className) {
        return obj.instance;
      }
    }
    return null;
  }

  /**
   * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
   *
   * @param {Object} context
   * @param {string} className
   * @param {Object} instance
   * @memberof module:FactoryMaker
   * @instance
   */
  function setSingletonInstance(context, className, instance) {
    for (const i in singletonContexts) {
      const obj = singletonContexts[i];
      if (obj.context === context && obj.name === className) {
        singletonContexts[i].instance = instance;
        return;
      }
    }
    singletonContexts.push({
      name: className,
      context: context,
      instance: instance
    });
  }

  /**
   * Use this method to remove all singleton instances associated with a particular context.
   *
   * @param {Object} context
   * @memberof module:FactoryMaker
   * @instance
   */
  function deleteSingletonInstances(context) {
    singletonContexts = singletonContexts.filter(x => x.context !== context);
  }

  /*------------------------------------------------------------------------------------------*/

  // Factories storage Management

  /*------------------------------------------------------------------------------------------*/

  function getFactoryByName(name, factoriesArray) {
    return factoriesArray[name];
  }
  function updateFactory(name, factory, factoriesArray) {
    if (name in factoriesArray) {
      factoriesArray[name] = factory;
    }
  }

  /*------------------------------------------------------------------------------------------*/

  // Class Factories Management

  /*------------------------------------------------------------------------------------------*/

  function updateClassFactory(name, factory) {
    updateFactory(name, factory, classFactories);
  }
  function getClassFactoryByName(name) {
    return getFactoryByName(name, classFactories);
  }
  function getClassFactory(classConstructor) {
    let factory = getFactoryByName(classConstructor.__dashjs_factory_name, classFactories);
    if (!factory) {
      factory = function (context) {
        if (context === undefined) {
          context = {};
        }
        return {
          create: function () {
            return merge(classConstructor, context, arguments);
          }
        };
      };
      classFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }
    return factory;
  }

  /*------------------------------------------------------------------------------------------*/

  // Singleton Factory MAangement

  /*------------------------------------------------------------------------------------------*/

  function updateSingletonFactory(name, factory) {
    updateFactory(name, factory, singletonFactories);
  }
  function getSingletonFactoryByName(name) {
    return getFactoryByName(name, singletonFactories);
  }
  function getSingletonFactory(classConstructor) {
    let factory = getFactoryByName(classConstructor.__dashjs_factory_name, singletonFactories);
    if (!factory) {
      factory = function (context) {
        let instance;
        if (context === undefined) {
          context = {};
        }
        return {
          getInstance: function () {
            // If we don't have an instance yet check for one on the context
            if (!instance) {
              instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
            }
            // If there's no instance on the context then create one
            if (!instance) {
              instance = merge(classConstructor, context, arguments);
              singletonContexts.push({
                name: classConstructor.__dashjs_factory_name,
                context: context,
                instance: instance
              });
            }
            return instance;
          }
        };
      };
      singletonFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }
    return factory;
  }
  function merge(classConstructor, context, args) {
    let classInstance;
    const className = classConstructor.__dashjs_factory_name;
    const extensionObject = context[className];
    if (extensionObject) {
      let extension = extensionObject.instance;
      if (extensionObject.override) {
        //Override public methods in parent but keep parent.

        classInstance = classConstructor.apply({
          context
        }, args);
        extension = extension.apply({
          context,
          factory: instance,
          parent: classInstance
        }, args);
        for (const prop in extension) {
          if (classInstance.hasOwnProperty(prop)) {
            classInstance[prop] = extension[prop];
          }
        }
      } else {
        //replace parent object completely with new object. Same as dijon.

        return extension.apply({
          context,
          factory: instance
        }, args);
      }
    } else {
      // Create new instance of the class
      classInstance = classConstructor.apply({
        context
      }, args);
    }

    // Add getClassName function to class instance prototype (used by Debug)
    classInstance.getClassName = function () {
      return className;
    };
    return classInstance;
  }
  instance = {
    deleteSingletonInstances,
    extend,
    getClassFactory,
    getClassFactoryByName,
    getSingletonFactory,
    getSingletonFactoryByName,
    getSingletonInstance,
    setSingletonInstance,
    updateClassFactory,
    updateSingletonFactory
  };
  return instance;
}();
/* harmony default export */ __webpack_exports__["default"] = (FactoryMaker);

/***/ }),

/***/ "./src/core/errors/ErrorsBase.js":
/*!***************************************!*\
  !*** ./src/core/errors/ErrorsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class ErrorsBase {
  extend(errors, config) {
    if (!errors) {
      return;
    }
    let override = config ? config.override : false;
    let publicOnly = config ? config.publicOnly : false;
    for (const err in errors) {
      if (!errors.hasOwnProperty(err) || this[err] && !override) {
        continue;
      }
      if (publicOnly && errors[err].indexOf('public_') === -1) {
        continue;
      }
      this[err] = errors[err];
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (ErrorsBase);

/***/ }),

/***/ "./src/core/events/EventsBase.js":
/*!***************************************!*\
  !*** ./src/core/events/EventsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class EventsBase {
  extend(events, config) {
    if (!events) {
      return;
    }
    let override = config ? config.override : false;
    let publicOnly = config ? config.publicOnly : false;
    for (const evt in events) {
      if (!events.hasOwnProperty(evt) || this[evt] && !override) {
        continue;
      }
      if (publicOnly && events[evt].indexOf('public_') === -1) {
        continue;
      }
      this[evt] = events[evt];
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (EventsBase);

/***/ }),

/***/ "./src/mss/MssFragmentInfoController.js":
/*!**********************************************!*\
  !*** ./src/mss/MssFragmentInfoController.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../streaming/vo/FragmentRequest.js */ "./src/streaming/vo/FragmentRequest.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function MssFragmentInfoController(config) {
  config = config || {};
  let instance, logger, fragmentModel, started, type, loadFragmentTimeout, startTime, startFragmentTime, index;
  const streamProcessor = config.streamProcessor;
  const baseURLController = config.baseURLController;
  const debug = config.debug;
  const controllerType = 'MssFragmentInfoController';
  function setup() {
    logger = debug.getLogger(instance);
  }
  function initialize() {
    type = streamProcessor.getType();
    fragmentModel = streamProcessor.getFragmentModel();
    started = false;
    startTime = null;
    startFragmentTime = null;
  }
  function start() {
    if (started) {
      return;
    }
    logger.debug('Start');
    started = true;
    index = 0;
    loadNextFragmentInfo();
  }
  function stop() {
    if (!started) {
      return;
    }
    logger.debug('Stop');
    clearTimeout(loadFragmentTimeout);
    started = false;
    startTime = null;
    startFragmentTime = null;
  }
  function reset() {
    stop();
  }
  function loadNextFragmentInfo() {
    if (!started) {
      return;
    }

    // Get last segment from SegmentTimeline
    const representation = getCurrentRepresentation();
    const manifest = representation.adaptation.period.mpd.manifest;
    const adaptation = manifest.Period[representation.adaptation.period.index].AdaptationSet[representation.adaptation.index];
    const segments = adaptation.SegmentTemplate.SegmentTimeline.S;
    const segment = segments[segments.length - 1];

    // logger.debug('Last fragment time: ' + (segment.t / adaptation.SegmentTemplate.timescale));

    // Generate segment request
    const request = getRequestForSegment(adaptation, representation, segment);

    // Send segment request
    requestFragment.call(this, request);
  }
  function getRequestForSegment(adaptation, representation, segment) {
    let timescale = adaptation.SegmentTemplate.timescale;
    let request = new _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    request.mediaType = type;
    request.type = _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_1__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE;
    // request.range = segment.mediaRange;
    request.startTime = segment.t / timescale;
    request.duration = segment.d / timescale;
    request.timescale = timescale;
    // request.availabilityStartTime = segment.availabilityStartTime;
    // request.availabilityEndTime = segment.availabilityEndTime;
    // request.wallStartTime = segment.wallStartTime;
    request.bandwidth = representation.bandwidth;
    request.index = index++;
    request.adaptationIndex = representation.adaptation.index;
    request.representation = representation;
    request.url = baseURLController.resolve(representation.path).url + adaptation.SegmentTemplate.media;
    request.url = request.url.replace('$Bandwidth$', representation.bandwidth);
    request.url = request.url.replace('$Time$', segment.tManifest ? segment.tManifest : segment.t);
    request.url = request.url.replace('/Fragments(', '/FragmentInfo(');
    return request;
  }
  function getCurrentRepresentation() {
    const representationController = streamProcessor.getRepresentationController();
    const representation = representationController.getCurrentRepresentation();
    return representation;
  }
  function requestFragment(request) {
    // logger.debug('Load FragmentInfo for time: ' + request.startTime);
    if (streamProcessor.getFragmentModel().isFragmentLoadedOrPending(request)) {
      // We may have reached end of timeline in case of start-over streams
      logger.debug('End of timeline');
      stop();
      return;
    }
    fragmentModel.executeRequest(request);
  }
  function fragmentInfoLoaded(e) {
    if (!started) {
      return;
    }
    const request = e.request;
    if (!e.response) {
      logger.error('Load error', request.url);
      return;
    }
    let deltaFragmentTime, deltaTime, delay;

    // logger.debug('FragmentInfo loaded: ', request.url);

    if (startTime === null) {
      startTime = new Date().getTime();
    }
    if (!startFragmentTime) {
      startFragmentTime = request.startTime;
    }

    // Determine delay before requesting next FragmentInfo
    deltaTime = (new Date().getTime() - startTime) / 1000;
    deltaFragmentTime = request.startTime + request.duration - startFragmentTime;
    delay = Math.max(0, deltaFragmentTime - deltaTime);

    // Set timeout for requesting next FragmentInfo
    clearTimeout(loadFragmentTimeout);
    loadFragmentTimeout = setTimeout(function () {
      loadFragmentTimeout = null;
      loadNextFragmentInfo();
    }, delay * 1000);
  }
  function getType() {
    return type;
  }
  instance = {
    initialize: initialize,
    controllerType: controllerType,
    start: start,
    fragmentInfoLoaded: fragmentInfoLoaded,
    getType: getType,
    reset: reset
  };
  setup();
  return instance;
}
MssFragmentInfoController.__dashjs_factory_name = 'MssFragmentInfoController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getClassFactory(MssFragmentInfoController));

/***/ }),

/***/ "./src/mss/MssFragmentMoofProcessor.js":
/*!*********************************************!*\
  !*** ./src/mss/MssFragmentMoofProcessor.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.flags.js */ "./node_modules/core-js/modules/es.regexp.flags.js");
/* harmony import */ var _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../streaming/vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors/MssErrors.js */ "./src/mss/errors/MssErrors.js");
/* harmony import */ var _streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../streaming/MediaPlayerEvents.js */ "./src/streaming/MediaPlayerEvents.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");



/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





/**
 * @module MssFragmentMoofProcessor
 * @ignore
 * @param {Object} config object
 */
function MssFragmentMoofProcessor(config) {
  config = config || {};
  let instance, type, logger;
  const dashMetrics = config.dashMetrics;
  const playbackController = config.playbackController;
  const errorHandler = config.errHandler;
  const eventBus = config.eventBus;
  const ISOBoxer = config.ISOBoxer;
  const debug = config.debug;
  function setup() {
    logger = debug.getLogger(instance);
    type = '';
  }
  function processTfrf(request, tfrf, tfdt, streamProcessor) {
    const representationController = streamProcessor.getRepresentationController();
    const representation = representationController.getCurrentRepresentation();
    const manifest = representation.adaptation.period.mpd.manifest;
    const adaptation = manifest.Period[representation.adaptation.period.index].AdaptationSet[representation.adaptation.index];
    const timescale = adaptation.SegmentTemplate.timescale;
    type = streamProcessor.getType();

    // Process tfrf only for live streams or start-over static streams (timeShiftBufferDepth > 0)
    if (manifest.type !== 'dynamic' && !manifest.timeShiftBufferDepth) {
      return;
    }
    if (!tfrf) {
      errorHandler.error(new _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_4__["default"].MSS_NO_TFRF_CODE, _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_4__["default"].MSS_NO_TFRF_MESSAGE));
      return;
    }

    // Get adaptation's segment timeline (always a SegmentTimeline in Smooth Streaming use case)
    const segments = adaptation.SegmentTemplate.SegmentTimeline.S;
    const entries = tfrf.entry;
    let entry, segmentTime, range;
    let segment = null;
    let t = 0;
    let endTime;
    let availabilityStartTime = null;
    if (entries.length === 0) {
      return;
    }

    // Consider only first tfrf entry (to avoid pre-condition failure on fragment info requests)
    entry = entries[0];

    // In case of start-over streams, check if we have reached end of original manifest duration (set in timeShiftBufferDepth)
    // => then do not update anymore timeline
    if (manifest.type === 'static') {
      // Get first segment time
      segmentTime = segments[0].tManifest ? parseFloat(segments[0].tManifest) : segments[0].t;
      if (entry.fragment_absolute_time > segmentTime + manifest.timeShiftBufferDepth * timescale) {
        return;
      }
    }

    // logger.debug('entry - t = ', (entry.fragment_absolute_time / timescale));

    // Get last segment time
    segmentTime = segments[segments.length - 1].tManifest ? parseFloat(segments[segments.length - 1].tManifest) : segments[segments.length - 1].t;
    // logger.debug('Last segment - t = ', (segmentTime / timescale));

    // Check if we have to append new segment to timeline
    if (entry.fragment_absolute_time <= segmentTime) {
      // Update DVR window range => set range end to end time of current segment
      range = {
        start: segments[0].t / timescale,
        end: tfdt.baseMediaDecodeTime / timescale + request.duration
      };
      updateDVR(request.mediaType, range, streamProcessor.getStreamInfo().manifestInfo);
      return;
    }

    // logger.debug('Add new segment - t = ', (entry.fragment_absolute_time / timescale));
    segment = {};
    segment.t = entry.fragment_absolute_time;
    segment.d = entry.fragment_duration;
    // If timestamps starts at 0 relative to 1st segment (dynamic to static) then update segment time
    if (segments[0].tManifest) {
      segment.t -= parseFloat(segments[0].tManifest) - segments[0].t;
      segment.tManifest = entry.fragment_absolute_time;
    }

    // Patch previous segment duration
    let lastSegment = segments[segments.length - 1];
    if (lastSegment.t + lastSegment.d !== segment.t) {
      logger.debug('Patch segment duration - t = ', lastSegment.t + ', d = ' + lastSegment.d + ' => ' + (segment.t - lastSegment.t));
      lastSegment.d = segment.t - lastSegment.t;
    }
    segments.push(segment);

    // In case of static start-over streams, update content duration
    if (manifest.type === 'static') {
      if (type === 'video') {
        segment = segments[segments.length - 1];
        endTime = (segment.t + segment.d) / timescale;
        if (endTime > representation.adaptation.period.duration) {
          eventBus.trigger(_streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_5__["default"].MANIFEST_VALIDITY_CHANGED, {
            sender: this,
            newDuration: endTime
          });
        }
      }
      return;
    } else {
      // In case of live streams, update segment timeline according to DVR window
      if (manifest.timeShiftBufferDepth && manifest.timeShiftBufferDepth > 0) {
        // Get timestamp of the last segment
        segment = segments[segments.length - 1];
        t = segment.t;

        // Determine the segments' availability start time
        availabilityStartTime = (t - manifest.timeShiftBufferDepth * timescale) / timescale;

        // Remove segments prior to availability start time
        segment = segments[0];
        endTime = (segment.t + segment.d) / timescale;
        while (endTime < availabilityStartTime) {
          // Check if not currently playing the segment to be removed
          if (!playbackController.isPaused() && playbackController.getTime() < endTime) {
            break;
          }
          // logger.debug('Remove segment  - t = ' + (segment.t / timescale));
          segments.splice(0, 1);
          segment = segments[0];
          endTime = (segment.t + segment.d) / timescale;
        }
      }

      // Update DVR window range => set range end to end time of current segment
      range = {
        start: segments[0].t / timescale,
        end: tfdt.baseMediaDecodeTime / timescale + request.duration
      };
      updateDVR(type, range, streamProcessor.getStreamInfo().manifestInfo);
    }
  }
  function updateDVR(type, range, manifestInfo) {
    if (type !== 'video' && type !== 'audio') {
      return;
    }
    const dvrInfos = dashMetrics.getCurrentDVRInfo(type);
    if (!dvrInfos || range.end > dvrInfos.range.end) {
      logger.debug('Update DVR range: [' + range.start + ' - ' + range.end + ']');
      dashMetrics.addDVRInfo(type, playbackController.getTime(), manifestInfo, range);
      playbackController.updateCurrentTime(type);
    }
  }

  // This function returns the offset of the 1st byte of a child box within a container box
  function getBoxOffset(parent, type) {
    let offset = 8;
    let i = 0;
    for (i = 0; i < parent.boxes.length; i++) {
      if (parent.boxes[i].type === type) {
        return offset;
      }
      offset += parent.boxes[i].size;
    }
    return offset;
  }
  function convertFragment(e, streamProcessor) {
    let i;

    // e.request contains request description object
    // e.response contains fragment bytes
    const isoFile = ISOBoxer.parseBuffer(e.response);
    // Update track_Id in tfhd box
    const tfhd = isoFile.fetch('tfhd');
    tfhd.track_ID = e.request.representation.mediaInfo.index + 1;

    // Add tfdt box
    let tfdt = isoFile.fetch('tfdt');
    const traf = isoFile.fetch('traf');
    if (tfdt === null) {
      tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
      tfdt.version = 1;
      tfdt.flags = 0;
      tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
    }
    const trun = isoFile.fetch('trun');

    // Process tfxd boxes
    // This box provide absolute timestamp but we take the segment start time for tfdt
    let tfxd = isoFile.fetch('tfxd');
    if (tfxd) {
      tfxd._parent.boxes.splice(tfxd._parent.boxes.indexOf(tfxd), 1);
      tfxd = null;
    }
    let tfrf = isoFile.fetch('tfrf');
    processTfrf(e.request, tfrf, tfdt, streamProcessor);
    if (tfrf) {
      tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
      tfrf = null;
    }

    // If protected content in PIFF1.1 format (sepiff box = Sample Encryption PIFF)
    // => convert sepiff box it into a senc box
    // => create saio and saiz boxes (if not already present)
    const sepiff = isoFile.fetch('sepiff');
    if (sepiff !== null) {
      sepiff.type = 'senc';
      sepiff.usertype = undefined;
      let saio = isoFile.fetch('saio');
      if (saio === null) {
        // Create Sample Auxiliary Information Offsets Box box (saio)
        saio = ISOBoxer.createFullBox('saio', traf);
        saio.version = 0;
        saio.flags = 0;
        saio.entry_count = 1;
        saio.offset = [0];
        const saiz = ISOBoxer.createFullBox('saiz', traf);
        saiz.version = 0;
        saiz.flags = 0;
        saiz.sample_count = sepiff.sample_count;
        saiz.default_sample_info_size = 0;
        saiz.sample_info_size = [];
        if (sepiff.flags & 0x02) {
          // Sub-sample encryption => set sample_info_size for each sample
          for (i = 0; i < sepiff.sample_count; i += 1) {
            // 10 = 8 (InitializationVector field size) + 2 (subsample_count field size)
            // 6 = 2 (BytesOfClearData field size) + 4 (BytesOfEncryptedData field size)
            saiz.sample_info_size[i] = 10 + 6 * sepiff.entry[i].NumberOfEntries;
          }
        } else {
          // No sub-sample encryption => set default sample_info_size = InitializationVector field size (8)
          saiz.default_sample_info_size = 8;
        }
      }
    }
    tfhd.flags &= 0xFFFFFE; // set tfhd.base-data-offset-present to false
    tfhd.flags |= 0x020000; // set tfhd.default-base-is-moof to true
    trun.flags |= 0x000001; // set trun.data-offset-present to true

    // Update trun.data_offset field that corresponds to first data byte (inside mdat box)
    const moof = isoFile.fetch('moof');
    let length = moof.getLength();
    trun.data_offset = length + 8;

    // Update saio box offset field according to new senc box offset
    let saio = isoFile.fetch('saio');
    if (saio !== null) {
      let trafPosInMoof = getBoxOffset(moof, 'traf');
      let sencPosInTraf = getBoxOffset(traf, 'senc');
      // Set offset from begin fragment to the first IV field in senc box
      saio.offset[0] = trafPosInMoof + sencPosInTraf + 16; // 16 = box header (12) + sample_count field size (4)
    }

    // Write transformed/processed fragment into request reponse data
    e.response = isoFile.write();
  }
  function updateSegmentList(e, streamProcessor) {
    // e.request contains request description object
    // e.response contains fragment bytes
    if (!e.response) {
      throw new Error('e.response parameter is missing');
    }
    const isoFile = ISOBoxer.parseBuffer(e.response);
    // Update track_Id in tfhd box
    const tfhd = isoFile.fetch('tfhd');
    tfhd.track_ID = e.request.representation.mediaInfo.index + 1;

    // Add tfdt box
    let tfdt = isoFile.fetch('tfdt');
    let traf = isoFile.fetch('traf');
    if (tfdt === null) {
      tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
      tfdt.version = 1;
      tfdt.flags = 0;
      tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
    }
    let tfrf = isoFile.fetch('tfrf');
    processTfrf(e.request, tfrf, tfdt, streamProcessor);
    if (tfrf) {
      tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
      tfrf = null;
    }
  }
  function getType() {
    return type;
  }
  instance = {
    convertFragment,
    updateSegmentList,
    getType
  };
  setup();
  return instance;
}
MssFragmentMoofProcessor.__dashjs_factory_name = 'MssFragmentMoofProcessor';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_6__["default"].getClassFactory(MssFragmentMoofProcessor));

/***/ }),

/***/ "./src/mss/MssFragmentMoovProcessor.js":
/*!*********************************************!*\
  !*** ./src/mss/MssFragmentMoovProcessor.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array-buffer.detached.js */ "./node_modules/core-js/modules/es.array-buffer.detached.js");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array-buffer.transfer.js */ "./node_modules/core-js/modules/es.array-buffer.transfer.js");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array-buffer.transfer-to-fixed-length.js */ "./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js");
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.flags.js */ "./node_modules/core-js/modules/es.regexp.flags.js");
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.typed-array.at.js */ "./node_modules/core-js/modules/es.typed-array.at.js");
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.typed-array.find-last.js */ "./node_modules/core-js/modules/es.typed-array.find-last.js");
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.typed-array.find-last-index.js */ "./node_modules/core-js/modules/es.typed-array.find-last-index.js");
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.typed-array.set.js */ "./node_modules/core-js/modules/es.typed-array.set.js");
/* harmony import */ var core_js_modules_es_typed_array_sort_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.typed-array.sort.js */ "./node_modules/core-js/modules/es.typed-array.sort.js");
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-reversed.js */ "./node_modules/core-js/modules/es.typed-array.to-reversed.js");
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-sorted.js */ "./node_modules/core-js/modules/es.typed-array.to-sorted.js");
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.typed-array.with.js */ "./node_modules/core-js/modules/es.typed-array.with.js");
/* harmony import */ var _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./errors/MssErrors.js */ "./src/mss/errors/MssErrors.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");













/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @module MssFragmentMoovProcessor
 * @ignore
 * @param {Object} config object
 */
function MssFragmentMoovProcessor(config) {
  config = config || {};
  const NALUTYPE_SPS = 7;
  const NALUTYPE_PPS = 8;
  const constants = config.constants;
  const ISOBoxer = config.ISOBoxer;
  let protectionController = config.protectionController;
  let instance, period, adaptationSet, representation, contentProtection, timescale, trackId;
  function createFtypBox(isoFile) {
    let ftyp = ISOBoxer.createBox('ftyp', isoFile);
    ftyp.major_brand = 'iso6';
    ftyp.minor_version = 1; // is an informative integer for the minor version of the major brand
    ftyp.compatible_brands = []; //is a list, to the end of the box, of brands isom, iso6 and msdh
    ftyp.compatible_brands[0] = 'isom'; // => decimal ASCII value for isom
    ftyp.compatible_brands[1] = 'iso6'; // => decimal ASCII value for iso6
    ftyp.compatible_brands[2] = 'msdh'; // => decimal ASCII value for msdh

    return ftyp;
  }
  function createMoovBox(isoFile) {
    // moov box
    let moov = ISOBoxer.createBox('moov', isoFile);

    // moov/mvhd
    createMvhdBox(moov);

    // moov/trak
    let trak = ISOBoxer.createBox('trak', moov);

    // moov/trak/tkhd
    createTkhdBox(trak);

    // moov/trak/mdia
    let mdia = ISOBoxer.createBox('mdia', trak);

    // moov/trak/mdia/mdhd
    createMdhdBox(mdia);

    // moov/trak/mdia/hdlr
    createHdlrBox(mdia);

    // moov/trak/mdia/minf
    let minf = ISOBoxer.createBox('minf', mdia);
    switch (adaptationSet.type) {
      case constants.VIDEO:
        // moov/trak/mdia/minf/vmhd
        createVmhdBox(minf);
        break;
      case constants.AUDIO:
        // moov/trak/mdia/minf/smhd
        createSmhdBox(minf);
        break;
      default:
        break;
    }

    // moov/trak/mdia/minf/dinf
    let dinf = ISOBoxer.createBox('dinf', minf);

    // moov/trak/mdia/minf/dinf/dref
    createDrefBox(dinf);

    // moov/trak/mdia/minf/stbl
    let stbl = ISOBoxer.createBox('stbl', minf);

    // Create empty stts, stsc, stco and stsz boxes
    // Use data field as for codem-isoboxer unknown boxes for setting fields value

    // moov/trak/mdia/minf/stbl/stts
    let stts = ISOBoxer.createFullBox('stts', stbl);
    stts._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

    // moov/trak/mdia/minf/stbl/stsc
    let stsc = ISOBoxer.createFullBox('stsc', stbl);
    stsc._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

    // moov/trak/mdia/minf/stbl/stco
    let stco = ISOBoxer.createFullBox('stco', stbl);
    stco._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

    // moov/trak/mdia/minf/stbl/stsz
    let stsz = ISOBoxer.createFullBox('stsz', stbl);
    stsz._data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, sample_size = 0, sample_count = 0

    // moov/trak/mdia/minf/stbl/stsd
    createStsdBox(stbl);

    // moov/mvex
    let mvex = ISOBoxer.createBox('mvex', moov);

    // moov/mvex/trex
    createTrexBox(mvex);
    if (contentProtection && protectionController) {
      let supportedKS = protectionController.getSupportedKeySystemMetadataFromContentProtection(contentProtection);
      createProtectionSystemSpecificHeaderBox(moov, supportedKS);
    }
  }
  function createMvhdBox(moov) {
    let mvhd = ISOBoxer.createFullBox('mvhd', moov);
    mvhd.version = 1; // version = 1  in order to have 64bits duration value

    mvhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    mvhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    mvhd.timescale = timescale; // the time-scale for the entire presentation => 10000000 for MSS
    mvhd.duration = period.duration === Infinity ? 0xFFFFFFFFFFFFFFFF : Math.round(period.duration * timescale); // the length of the presentation (in the indicated timescale) =>  take duration of period
    mvhd.rate = 1.0; // 16.16 number, '1.0' = normal playback
    mvhd.volume = 1.0; // 8.8 number, '1.0' = full volume
    mvhd.reserved1 = 0;
    mvhd.reserved2 = [0x0, 0x0];
    mvhd.matrix = [1, 0, 0,
    // provides a transformation matrix for the video;
    0, 1, 0,
    // (u,v,w) are restricted here to (0,0,1)
    0, 0, 16384];
    mvhd.pre_defined = [0, 0, 0, 0, 0, 0];
    mvhd.next_track_ID = trackId + 1; // indicates a value to use for the track ID of the next track to be added to this presentation

    return mvhd;
  }
  function createTkhdBox(trak) {
    let tkhd = ISOBoxer.createFullBox('tkhd', trak);
    tkhd.version = 1; // version = 1  in order to have 64bits duration value
    tkhd.flags = 0x1 |
    // Track_enabled (0x000001): Indicates that the track is enabled
    0x2 |
    // Track_in_movie (0x000002):  Indicates that the track is used in the presentation
    0x4; // Track_in_preview (0x000004):  Indicates that the track is used when previewing the presentation

    tkhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    tkhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    tkhd.track_ID = trackId; // uniquely identifies this track over the entire life-time of this presentation
    tkhd.reserved1 = 0;
    tkhd.duration = period.duration === Infinity ? 0xFFFFFFFFFFFFFFFF : Math.round(period.duration * timescale); // the duration of this track (in the timescale indicated in the Movie Header Box) =>  take duration of period
    tkhd.reserved2 = [0x0, 0x0];
    tkhd.layer = 0; // specifies the front-to-back ordering of video tracks; tracks with lower numbers are closer to the viewer => 0 since only one video track
    tkhd.alternate_group = 0; // specifies a group or collection of tracks => ignore
    tkhd.volume = 1.0; // '1.0' = full volume
    tkhd.reserved3 = 0;
    tkhd.matrix = [1, 0, 0,
    // provides a transformation matrix for the video;
    0, 1, 0,
    // (u,v,w) are restricted here to (0,0,1)
    0, 0, 16384];
    tkhd.width = representation.width; // visual presentation width
    tkhd.height = representation.height; // visual presentation height

    return tkhd;
  }
  function createMdhdBox(mdia) {
    let mdhd = ISOBoxer.createFullBox('mdhd', mdia);
    mdhd.version = 1; // version = 1  in order to have 64bits duration value

    mdhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    mdhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    mdhd.timescale = timescale; // the time-scale for the entire presentation
    mdhd.duration = period.duration === Infinity ? 0xFFFFFFFFFFFFFFFF : Math.round(period.duration * timescale); // the duration of this media (in the scale of the timescale). If the duration cannot be determined then duration is set to all 1s.
    mdhd.language = adaptationSet.lang || 'und'; // declares the language code for this media
    mdhd.pre_defined = 0;
    return mdhd;
  }
  function createHdlrBox(mdia) {
    let hdlr = ISOBoxer.createFullBox('hdlr', mdia);
    hdlr.pre_defined = 0;
    switch (adaptationSet.type) {
      case constants.VIDEO:
        hdlr.handler_type = 'vide';
        break;
      case constants.AUDIO:
        hdlr.handler_type = 'soun';
        break;
      default:
        hdlr.handler_type = 'meta';
        break;
    }
    hdlr.name = representation.id;
    hdlr.reserved = [0, 0, 0];
    return hdlr;
  }
  function createVmhdBox(minf) {
    let vmhd = ISOBoxer.createFullBox('vmhd', minf);
    vmhd.flags = 1;
    vmhd.graphicsmode = 0; // specifies a composition mode for this video track, from the following enumerated set, which may be extended by derived specifications: copy = 0 copy over the existing image
    vmhd.opcolor = [0, 0, 0]; // is a set of 3 colour values (red, green, blue) available for use by graphics modes

    return vmhd;
  }
  function createSmhdBox(minf) {
    let smhd = ISOBoxer.createFullBox('smhd', minf);
    smhd.flags = 1;
    smhd.balance = 0; // is a fixed-point 8.8 number that places mono audio tracks in a stereo space; 0 is centre (the normal value); full left is -1.0 and full right is 1.0.
    smhd.reserved = 0;
    return smhd;
  }
  function createDrefBox(dinf) {
    let dref = ISOBoxer.createFullBox('dref', dinf);
    dref.entry_count = 1;
    dref.entries = [];
    let url = ISOBoxer.createFullBox('url ', dref, false);
    url.location = '';
    url.flags = 1;
    dref.entries.push(url);
    return dref;
  }
  function createStsdBox(stbl) {
    let stsd = ISOBoxer.createFullBox('stsd', stbl);
    stsd.entries = [];
    switch (adaptationSet.type) {
      case constants.VIDEO:
      case constants.AUDIO:
        stsd.entries.push(createSampleEntry(stsd));
        break;
      default:
        break;
    }
    stsd.entry_count = stsd.entries.length; // is an integer that counts the actual entries
    return stsd;
  }
  function createSampleEntry(stsd) {
    let codec = representation.codecs.substring(0, representation.codecs.indexOf('.'));
    switch (codec) {
      case 'avc1':
        return createAVCVisualSampleEntry(stsd, codec);
      case 'mp4a':
        return createMP4AudioSampleEntry(stsd, codec);
      default:
        throw {
          code: _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_13__["default"].MSS_UNSUPPORTED_CODEC_CODE,
          message: _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_13__["default"].MSS_UNSUPPORTED_CODEC_MESSAGE,
          data: {
            codec: codec
          }
        };
    }
  }
  function createAVCVisualSampleEntry(stsd, codec) {
    let avc1;
    if (contentProtection) {
      avc1 = ISOBoxer.createBox('encv', stsd, false);
    } else {
      avc1 = ISOBoxer.createBox('avc1', stsd, false);
    }

    // SampleEntry fields
    avc1.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    avc1.data_reference_index = 1;

    // VisualSampleEntry fields
    avc1.pre_defined1 = 0;
    avc1.reserved2 = 0;
    avc1.pre_defined2 = [0, 0, 0];
    avc1.height = representation.height;
    avc1.width = representation.width;
    avc1.horizresolution = 72; // 72 dpi
    avc1.vertresolution = 72; // 72 dpi
    avc1.reserved3 = 0;
    avc1.frame_count = 1; // 1 compressed video frame per sample
    avc1.compressorname = [0x0A, 0x41, 0x56, 0x43, 0x20, 0x43, 0x6F, 0x64,
    // = 'AVC Coding';
    0x69, 0x6E, 0x67, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    avc1.depth = 0x0018; // 0x0018 – images are in colour with no alpha.
    avc1.pre_defined3 = 65535;
    avc1.config = createAVC1ConfigurationRecord();
    if (contentProtection) {
      // Create and add Protection Scheme Info Box
      let sinf = ISOBoxer.createBox('sinf', avc1);

      // Create and add Original Format Box => indicate codec type of the encrypted content
      createOriginalFormatBox(sinf, codec);

      // Create and add Scheme Type box
      createSchemeTypeBox(sinf);

      // Create and add Scheme Information Box
      createSchemeInformationBox(sinf);
    }
    return avc1;
  }
  function createAVC1ConfigurationRecord() {
    let avcC = null;
    let avcCLength = 15; // length = 15 by default (0 SPS and 0 PPS)

    // First get all SPS and PPS from codecPrivateData
    let sps = [];
    let pps = [];
    let AVCProfileIndication = 0;
    let AVCLevelIndication = 0;
    let profile_compatibility = 0;
    let nalus = representation.codecPrivateData.split('00000001').slice(1);
    let naluBytes, naluType;
    for (let i = 0; i < nalus.length; i++) {
      naluBytes = hexStringtoBuffer(nalus[i]);
      naluType = naluBytes[0] & 0x1F;
      switch (naluType) {
        case NALUTYPE_SPS:
          sps.push(naluBytes);
          avcCLength += naluBytes.length + 2; // 2 = sequenceParameterSetLength field length
          break;
        case NALUTYPE_PPS:
          pps.push(naluBytes);
          avcCLength += naluBytes.length + 2; // 2 = pictureParameterSetLength field length
          break;
        default:
          break;
      }
    }

    // Get profile and level from SPS
    if (sps.length > 0) {
      AVCProfileIndication = sps[0][1];
      profile_compatibility = sps[0][2];
      AVCLevelIndication = sps[0][3];
    }

    // Generate avcC buffer
    avcC = new Uint8Array(avcCLength);
    let i = 0;
    // length
    avcC[i++] = (avcCLength & 0xFF000000) >> 24;
    avcC[i++] = (avcCLength & 0x00FF0000) >> 16;
    avcC[i++] = (avcCLength & 0x0000FF00) >> 8;
    avcC[i++] = avcCLength & 0x000000FF;
    avcC.set([0x61, 0x76, 0x63, 0x43], i); // type = 'avcC'
    i += 4;
    avcC[i++] = 1; // configurationVersion = 1
    avcC[i++] = AVCProfileIndication;
    avcC[i++] = profile_compatibility;
    avcC[i++] = AVCLevelIndication;
    avcC[i++] = 0xFF; // '11111' + lengthSizeMinusOne = 3
    avcC[i++] = 0xE0 | sps.length; // '111' + numOfSequenceParameterSets
    for (let n = 0; n < sps.length; n++) {
      avcC[i++] = (sps[n].length & 0xFF00) >> 8;
      avcC[i++] = sps[n].length & 0x00FF;
      avcC.set(sps[n], i);
      i += sps[n].length;
    }
    avcC[i++] = pps.length; // numOfPictureParameterSets
    for (let n = 0; n < pps.length; n++) {
      avcC[i++] = (pps[n].length & 0xFF00) >> 8;
      avcC[i++] = pps[n].length & 0x00FF;
      avcC.set(pps[n], i);
      i += pps[n].length;
    }
    return avcC;
  }
  function createMP4AudioSampleEntry(stsd, codec) {
    let mp4a;
    if (contentProtection) {
      mp4a = ISOBoxer.createBox('enca', stsd, false);
    } else {
      mp4a = ISOBoxer.createBox('mp4a', stsd, false);
    }

    // SampleEntry fields
    mp4a.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    mp4a.data_reference_index = 1;

    // AudioSampleEntry fields
    mp4a.reserved2 = [0x0, 0x0];
    mp4a.channelcount = representation.audioChannels;
    mp4a.samplesize = 16;
    mp4a.pre_defined = 0;
    mp4a.reserved_3 = 0;
    mp4a.samplerate = representation.audioSamplingRate << 16;
    mp4a.esds = createMPEG4AACESDescriptor();
    if (contentProtection) {
      // Create and add Protection Scheme Info Box
      let sinf = ISOBoxer.createBox('sinf', mp4a);

      // Create and add Original Format Box => indicate codec type of the encrypted content
      createOriginalFormatBox(sinf, codec);

      // Create and add Scheme Type box
      createSchemeTypeBox(sinf);

      // Create and add Scheme Information Box
      createSchemeInformationBox(sinf);
    }
    return mp4a;
  }
  function createMPEG4AACESDescriptor() {
    // AudioSpecificConfig (see ISO/IEC 14496-3, subpart 1) => corresponds to hex bytes contained in 'codecPrivateData' field
    let audioSpecificConfig = hexStringtoBuffer(representation.codecPrivateData);

    // ESDS length = esds box header length (= 12) +
    //               ES_Descriptor header length (= 5) +
    //               DecoderConfigDescriptor header length (= 15) +
    //               decoderSpecificInfo header length (= 2) +
    //               AudioSpecificConfig length (= codecPrivateData length)
    let esdsLength = 34 + audioSpecificConfig.length;
    let esds = new Uint8Array(esdsLength);
    let i = 0;
    // esds box
    esds[i++] = (esdsLength & 0xFF000000) >> 24; // esds box length
    esds[i++] = (esdsLength & 0x00FF0000) >> 16; // ''
    esds[i++] = (esdsLength & 0x0000FF00) >> 8; // ''
    esds[i++] = esdsLength & 0x000000FF; // ''
    esds.set([0x65, 0x73, 0x64, 0x73], i); // type = 'esds'
    i += 4;
    esds.set([0, 0, 0, 0], i); // version = 0, flags = 0
    i += 4;
    // ES_Descriptor (see ISO/IEC 14496-1 (Systems))
    esds[i++] = 0x03; // tag = 0x03 (ES_DescrTag)
    esds[i++] = 20 + audioSpecificConfig.length; // size
    esds[i++] = (trackId & 0xFF00) >> 8; // ES_ID = track_id
    esds[i++] = trackId & 0x00FF; // ''
    esds[i++] = 0; // flags and streamPriority

    // DecoderConfigDescriptor (see ISO/IEC 14496-1 (Systems))
    esds[i++] = 0x04; // tag = 0x04 (DecoderConfigDescrTag)
    esds[i++] = 15 + audioSpecificConfig.length; // size
    esds[i++] = 0x40; // objectTypeIndication = 0x40 (MPEG-4 AAC)
    esds[i] = 0x05 << 2; // streamType = 0x05 (Audiostream)
    esds[i] |= 0 << 1; // upStream = 0
    esds[i++] |= 1; // reserved = 1
    esds[i++] = 0xFF; // buffersizeDB = undefined
    esds[i++] = 0xFF; // ''
    esds[i++] = 0xFF; // ''
    esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // maxBitrate
    esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
    esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
    esds[i++] = representation.bandwidth & 0x000000FF; // ''
    esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // avgbitrate
    esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
    esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
    esds[i++] = representation.bandwidth & 0x000000FF; // ''

    // DecoderSpecificInfo (see ISO/IEC 14496-1 (Systems))
    esds[i++] = 0x05; // tag = 0x05 (DecSpecificInfoTag)
    esds[i++] = audioSpecificConfig.length; // size
    esds.set(audioSpecificConfig, i); // AudioSpecificConfig bytes

    return esds;
  }
  function createOriginalFormatBox(sinf, codec) {
    let frma = ISOBoxer.createBox('frma', sinf);
    frma.data_format = stringToCharCode(codec);
  }
  function createSchemeTypeBox(sinf) {
    let schm = ISOBoxer.createFullBox('schm', sinf);
    schm.flags = 0;
    schm.version = 0;
    schm.scheme_type = 0x63656E63; // 'cenc' => common encryption
    schm.scheme_version = 0x00010000; // version set to 0x00010000 (Major version 1, Minor version 0)
  }
  function createSchemeInformationBox(sinf) {
    let schi = ISOBoxer.createBox('schi', sinf);

    // Create and add Track Encryption Box
    createTrackEncryptionBox(schi);
  }
  function createProtectionSystemSpecificHeaderBox(moov, keySystems) {
    let pssh_bytes, pssh, i, parsedBuffer;
    for (i = 0; i < keySystems.length; i += 1) {
      pssh_bytes = keySystems[i].initData;
      if (pssh_bytes) {
        parsedBuffer = ISOBoxer.parseBuffer(pssh_bytes);
        pssh = parsedBuffer.fetch('pssh');
        if (pssh) {
          ISOBoxer.Utils.appendBox(moov, pssh);
        }
      }
    }
  }
  function createTrackEncryptionBox(schi) {
    let tenc = ISOBoxer.createFullBox('tenc', schi);
    tenc.flags = 0;
    tenc.version = 0;
    tenc.default_IsEncrypted = 0x1;
    tenc.default_IV_size = 8;
    tenc.default_KID = contentProtection && contentProtection.length > 0 && contentProtection[0]['cenc:default_KID'] ? contentProtection[0]['cenc:default_KID'] : [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
  }
  function createTrexBox(moov) {
    let trex = ISOBoxer.createFullBox('trex', moov);
    trex.track_ID = trackId;
    trex.default_sample_description_index = 1;
    trex.default_sample_duration = 0;
    trex.default_sample_size = 0;
    trex.default_sample_flags = 0;
    return trex;
  }
  function hexStringtoBuffer(str) {
    let buf = new Uint8Array(str.length / 2);
    let i;
    for (i = 0; i < str.length / 2; i += 1) {
      buf[i] = parseInt('' + str[i * 2] + str[i * 2 + 1], 16);
    }
    return buf;
  }
  function stringToCharCode(str) {
    let code = 0;
    let i;
    for (i = 0; i < str.length; i += 1) {
      code |= str.charCodeAt(i) << (str.length - i - 1) * 8;
    }
    return code;
  }
  function generateMoov(rep) {
    if (!rep || !rep.adaptation) {
      return;
    }
    let isoFile, arrayBuffer;
    representation = rep;
    adaptationSet = representation.adaptation;
    period = adaptationSet.period;
    trackId = adaptationSet.index + 1;
    contentProtection = period.mpd.manifest.Period[period.index].AdaptationSet[adaptationSet.index].ContentProtection;
    timescale = period.mpd.manifest.Period[period.index].AdaptationSet[adaptationSet.index].SegmentTemplate.timescale;
    isoFile = ISOBoxer.createFile();
    createFtypBox(isoFile);
    createMoovBox(isoFile);
    arrayBuffer = isoFile.write();
    return arrayBuffer;
  }
  instance = {
    generateMoov: generateMoov
  };
  return instance;
}
MssFragmentMoovProcessor.__dashjs_factory_name = 'MssFragmentMoovProcessor';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_14__["default"].getClassFactory(MssFragmentMoovProcessor));

/***/ }),

/***/ "./src/mss/MssFragmentProcessor.js":
/*!*****************************************!*\
  !*** ./src/mss/MssFragmentProcessor.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.flags.js */ "./node_modules/core-js/modules/es.regexp.flags.js");
/* harmony import */ var _MssFragmentMoofProcessor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MssFragmentMoofProcessor.js */ "./src/mss/MssFragmentMoofProcessor.js");
/* harmony import */ var _MssFragmentMoovProcessor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MssFragmentMoovProcessor.js */ "./src/mss/MssFragmentMoovProcessor.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");


/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */






// Add specific box processors not provided by codem-isoboxer library

function arrayEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(function (element, index) {
    return element === arr2[index];
  });
}
function saioProcessor() {
  this._procFullBox();
  if (this.flags & 1) {
    this._procField('aux_info_type', 'uint', 32);
    this._procField('aux_info_type_parameter', 'uint', 32);
  }
  this._procField('entry_count', 'uint', 32);
  this._procFieldArray('offset', this.entry_count, 'uint', this.version === 1 ? 64 : 32);
}
function saizProcessor() {
  this._procFullBox();
  if (this.flags & 1) {
    this._procField('aux_info_type', 'uint', 32);
    this._procField('aux_info_type_parameter', 'uint', 32);
  }
  this._procField('default_sample_info_size', 'uint', 8);
  this._procField('sample_count', 'uint', 32);
  if (this.default_sample_info_size === 0) {
    this._procFieldArray('sample_info_size', this.sample_count, 'uint', 8);
  }
}
function sencProcessor() {
  this._procFullBox();
  this._procField('sample_count', 'uint', 32);
  if (this.flags & 1) {
    this._procField('IV_size', 'uint', 8);
  }
  this._procEntries('entry', this.sample_count, function (entry) {
    this._procEntryField(entry, 'InitializationVector', 'data', 8);
    if (this.flags & 2) {
      this._procEntryField(entry, 'NumberOfEntries', 'uint', 16);
      this._procSubEntries(entry, 'clearAndCryptedData', entry.NumberOfEntries, function (clearAndCryptedData) {
        this._procEntryField(clearAndCryptedData, 'BytesOfClearData', 'uint', 16);
        this._procEntryField(clearAndCryptedData, 'BytesOfEncryptedData', 'uint', 32);
      });
    }
  });
}
function uuidProcessor() {
  let tfxdUserType = [0x6D, 0x1D, 0x9B, 0x05, 0x42, 0xD5, 0x44, 0xE6, 0x80, 0xE2, 0x14, 0x1D, 0xAF, 0xF7, 0x57, 0xB2];
  let tfrfUserType = [0xD4, 0x80, 0x7E, 0xF2, 0xCA, 0x39, 0x46, 0x95, 0x8E, 0x54, 0x26, 0xCB, 0x9E, 0x46, 0xA7, 0x9F];
  let sepiffUserType = [0xA2, 0x39, 0x4F, 0x52, 0x5A, 0x9B, 0x4f, 0x14, 0xA2, 0x44, 0x6C, 0x42, 0x7C, 0x64, 0x8D, 0xF4];
  if (arrayEqual(this.usertype, tfxdUserType)) {
    this._procFullBox();
    if (this._parsing) {
      this.type = 'tfxd';
    }
    this._procField('fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
    this._procField('fragment_duration', 'uint', this.version === 1 ? 64 : 32);
  }
  if (arrayEqual(this.usertype, tfrfUserType)) {
    this._procFullBox();
    if (this._parsing) {
      this.type = 'tfrf';
    }
    this._procField('fragment_count', 'uint', 8);
    this._procEntries('entry', this.fragment_count, function (entry) {
      this._procEntryField(entry, 'fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
      this._procEntryField(entry, 'fragment_duration', 'uint', this.version === 1 ? 64 : 32);
    });
  }
  if (arrayEqual(this.usertype, sepiffUserType)) {
    if (this._parsing) {
      this.type = 'sepiff';
    }
    sencProcessor.call(this);
  }
}
function MssFragmentProcessor(config) {
  config = config || {};
  const context = this.context;
  const dashMetrics = config.dashMetrics;
  const playbackController = config.playbackController;
  const eventBus = config.eventBus;
  const protectionController = config.protectionController;
  const ISOBoxer = config.ISOBoxer;
  const debug = config.debug;
  let mssFragmentMoovProcessor, mssFragmentMoofProcessor, instance;
  function setup() {
    ISOBoxer.addBoxProcessor('uuid', uuidProcessor);
    ISOBoxer.addBoxProcessor('saio', saioProcessor);
    ISOBoxer.addBoxProcessor('saiz', saizProcessor);
    ISOBoxer.addBoxProcessor('senc', sencProcessor);
    mssFragmentMoovProcessor = (0,_MssFragmentMoovProcessor_js__WEBPACK_IMPORTED_MODULE_3__["default"])(context).create({
      protectionController: protectionController,
      constants: config.constants,
      ISOBoxer: ISOBoxer
    });
    mssFragmentMoofProcessor = (0,_MssFragmentMoofProcessor_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create({
      dashMetrics: dashMetrics,
      playbackController: playbackController,
      ISOBoxer: ISOBoxer,
      eventBus: eventBus,
      debug: debug,
      errHandler: config.errHandler
    });
  }
  function generateMoov(rep) {
    return mssFragmentMoovProcessor.generateMoov(rep);
  }
  function processFragment(e, streamProcessor) {
    if (!e || !e.request || !e.response) {
      throw new Error('e parameter is missing or malformed');
    }
    if (e.request.type === 'MediaSegment') {
      // MediaSegment => convert to Smooth Streaming moof format
      mssFragmentMoofProcessor.convertFragment(e, streamProcessor);
    } else if (e.request.type === _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE) {
      // FragmentInfo (live) => update segments list
      mssFragmentMoofProcessor.updateSegmentList(e, streamProcessor);

      // Stop event propagation (FragmentInfo must not be added to buffer)
      e.sender = null;
    }
  }
  instance = {
    generateMoov,
    processFragment
  };
  setup();
  return instance;
}
MssFragmentProcessor.__dashjs_factory_name = 'MssFragmentProcessor';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_5__["default"].getClassFactory(MssFragmentProcessor));

/***/ }),

/***/ "./src/mss/MssHandler.js":
/*!*******************************!*\
  !*** ./src/mss/MssHandler.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var _streaming_vo_DataChunk_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../streaming/vo/DataChunk.js */ "./src/streaming/vo/DataChunk.js");
/* harmony import */ var _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../streaming/vo/FragmentRequest.js */ "./src/streaming/vo/FragmentRequest.js");
/* harmony import */ var _MssFragmentInfoController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MssFragmentInfoController.js */ "./src/mss/MssFragmentInfoController.js");
/* harmony import */ var _MssFragmentProcessor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MssFragmentProcessor.js */ "./src/mss/MssFragmentProcessor.js");
/* harmony import */ var _parser_MssParser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parser/MssParser.js */ "./src/mss/parser/MssParser.js");
/* harmony import */ var _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors/MssErrors.js */ "./src/mss/errors/MssErrors.js");
/* harmony import */ var _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../streaming/vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_EventBus_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/EventBus.js */ "./src/core/EventBus.js");

/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */











function MssHandler(config) {
  config = config || {};
  const context = this.context;
  const eventBus = config.eventBus;
  const events = config.events;
  const constants = config.constants;
  const initSegmentType = config.initSegmentType;
  const playbackController = config.playbackController;
  const streamController = config.streamController;
  let mssParser, mssFragmentProcessor, fragmentInfoControllers, instance;
  function setup() {
    fragmentInfoControllers = [];
  }
  function createMssFragmentProcessor() {
    mssFragmentProcessor = (0,_MssFragmentProcessor_js__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create(config);
  }
  function getStreamProcessor(type) {
    return streamController.getActiveStreamProcessors().filter(processor => {
      return processor.getType() === type;
    })[0];
  }
  function getFragmentInfoController(type) {
    return fragmentInfoControllers.filter(controller => {
      return controller.getType() === type;
    })[0];
  }
  function createDataChunk(request, streamId, endFragment) {
    const chunk = new _streaming_vo_DataChunk_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    chunk.streamId = streamId;
    chunk.segmentType = request.type;
    chunk.start = request.startTime;
    chunk.duration = request.duration;
    chunk.end = chunk.start + chunk.duration;
    chunk.index = request.index;
    chunk.bandwidth = request.bandwidth;
    chunk.representation = request.representation;
    chunk.endFragment = endFragment;
    return chunk;
  }
  function startFragmentInfoControllers() {
    // Create MssFragmentInfoControllers for each StreamProcessor of active stream (only for audio, video or text)
    let processors = streamController.getActiveStreamProcessors();
    processors.forEach(function (processor) {
      if (processor.getType() === constants.VIDEO || processor.getType() === constants.AUDIO || processor.getType() === constants.TEXT) {
        let fragmentInfoController = getFragmentInfoController(processor.getType());
        if (!fragmentInfoController) {
          fragmentInfoController = (0,_MssFragmentInfoController_js__WEBPACK_IMPORTED_MODULE_3__["default"])(context).create({
            streamProcessor: processor,
            baseURLController: config.baseURLController,
            debug: config.debug
          });
          fragmentInfoController.initialize();
          fragmentInfoControllers.push(fragmentInfoController);
        }
        fragmentInfoController.start();
      }
    });
  }
  function stopFragmentInfoControllers() {
    fragmentInfoControllers.forEach(c => {
      c.reset();
    });
    fragmentInfoControllers = [];
  }
  function onInitFragmentNeeded(e) {
    let streamProcessor = getStreamProcessor(e.mediaType);
    if (!streamProcessor) {
      return;
    }

    // Create init segment request
    let representationController = streamProcessor.getRepresentationController();
    let representation = representationController.getCurrentRepresentation();
    let mediaInfo = streamProcessor.getMediaInfo();
    let request = new _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    request.mediaType = representation.adaptation.type;
    request.type = initSegmentType;
    request.range = representation.range;
    request.bandwidth = representation.bandwidth;
    request.representation = representation;
    const chunk = createDataChunk(request, mediaInfo.streamInfo.id, e.type !== events.FRAGMENT_LOADING_PROGRESS);
    try {
      // Generate init segment (moov)
      chunk.bytes = mssFragmentProcessor.generateMoov(representation);

      // Notify init segment has been loaded
      eventBus.trigger(events.INIT_FRAGMENT_LOADED, {
        chunk: chunk
      }, {
        streamId: mediaInfo.streamInfo.id,
        mediaType: representation.adaptation.type
      });
    } catch (e) {
      config.errHandler.error(new _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_7__["default"](e.code, e.message, e.data));
    }

    // Change the sender value to stop event to be propagated
    e.sender = null;
  }
  function onSegmentMediaLoaded(e) {
    if (e.error) {
      return;
    }
    let streamProcessor = getStreamProcessor(e.request.mediaType);
    if (!streamProcessor) {
      return;
    }

    // Process moof to transcode it from MSS to DASH (or to update segment timeline for SegmentInfo fragments)
    mssFragmentProcessor.processFragment(e, streamProcessor);
    if (e.request.type === _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_8__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE) {
      // If FragmentInfo loaded, then notify corresponding MssFragmentInfoController
      let fragmentInfoController = getFragmentInfoController(e.request.mediaType);
      if (fragmentInfoController) {
        fragmentInfoController.fragmentInfoLoaded(e);
      }
    }

    // Start MssFragmentInfoControllers in case of start-over streams
    let manifestInfo = e.request.representation.mediaInfo.streamInfo.manifestInfo;
    if (!manifestInfo.isDynamic && manifestInfo.dvrWindowSize !== Infinity) {
      startFragmentInfoControllers();
    }
  }
  function onPlaybackPaused() {
    if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {
      startFragmentInfoControllers();
    }
  }
  function onPlaybackSeeking() {
    if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {
      startFragmentInfoControllers();
    }
  }
  function onTTMLPreProcess(ttmlSubtitles) {
    if (!ttmlSubtitles || !ttmlSubtitles.data) {
      return;
    }
    ttmlSubtitles.data = ttmlSubtitles.data.replace(/http:\/\/www.w3.org\/2006\/10\/ttaf1/gi, 'http://www.w3.org/ns/ttml');
  }
  function registerEvents() {
    eventBus.on(events.INIT_FRAGMENT_NEEDED, onInitFragmentNeeded, instance, {
      priority: _core_EventBus_js__WEBPACK_IMPORTED_MODULE_10__["default"].EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.PLAYBACK_PAUSED, onPlaybackPaused, instance, {
      priority: _core_EventBus_js__WEBPACK_IMPORTED_MODULE_10__["default"].EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.PLAYBACK_SEEKING, onPlaybackSeeking, instance, {
      priority: _core_EventBus_js__WEBPACK_IMPORTED_MODULE_10__["default"].EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, instance, {
      priority: _core_EventBus_js__WEBPACK_IMPORTED_MODULE_10__["default"].EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.TTML_TO_PARSE, onTTMLPreProcess, instance);
  }
  function reset() {
    if (mssParser) {
      mssParser.reset();
      mssParser = undefined;
    }
    eventBus.off(events.INIT_FRAGMENT_NEEDED, onInitFragmentNeeded, this);
    eventBus.off(events.PLAYBACK_PAUSED, onPlaybackPaused, this);
    eventBus.off(events.PLAYBACK_SEEKING, onPlaybackSeeking, this);
    eventBus.off(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, this);
    eventBus.off(events.TTML_TO_PARSE, onTTMLPreProcess, this);

    // Reset FragmentInfoControllers
    stopFragmentInfoControllers();
  }
  function createMssParser() {
    mssParser = (0,_parser_MssParser_js__WEBPACK_IMPORTED_MODULE_5__["default"])(context).create(config);
    return mssParser;
  }
  instance = {
    reset,
    createMssParser,
    createMssFragmentProcessor,
    registerEvents
  };
  setup();
  return instance;
}
MssHandler.__dashjs_factory_name = 'MssHandler';
const factory = _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_9__["default"].getClassFactory(MssHandler);
factory.errors = _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"];
_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_9__["default"].updateClassFactory(MssHandler.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/mss/errors/MssErrors.js":
/*!*************************************!*\
  !*** ./src/mss/errors/MssErrors.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_errors_ErrorsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/errors/ErrorsBase.js */ "./src/core/errors/ErrorsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @class
 *
 */
class MssErrors extends _core_errors_ErrorsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    /**
     * Error code returned when no tfrf box is detected in MSS live stream
     */
    this.MSS_NO_TFRF_CODE = 200;

    /**
     * Error code returned when one of the codecs defined in the manifest is not supported
     */
    this.MSS_UNSUPPORTED_CODEC_CODE = 201;
    this.MSS_NO_TFRF_MESSAGE = 'Missing tfrf in live media segment';
    this.MSS_UNSUPPORTED_CODEC_MESSAGE = 'Unsupported codec';
  }
}
let mssErrors = new MssErrors();
/* harmony default export */ __webpack_exports__["default"] = (mssErrors);

/***/ }),

/***/ "./src/mss/parser/MssParser.js":
/*!*************************************!*\
  !*** ./src/mss/parser/MssParser.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array-buffer.detached.js */ "./node_modules/core-js/modules/es.array-buffer.detached.js");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array-buffer.transfer.js */ "./node_modules/core-js/modules/es.array-buffer.transfer.js");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array-buffer.transfer-to-fixed-length.js */ "./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js");
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.typed-array.at.js */ "./node_modules/core-js/modules/es.typed-array.at.js");
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.typed-array.find-last.js */ "./node_modules/core-js/modules/es.typed-array.find-last.js");
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.typed-array.find-last-index.js */ "./node_modules/core-js/modules/es.typed-array.find-last-index.js");
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.typed-array.set.js */ "./node_modules/core-js/modules/es.typed-array.set.js");
/* harmony import */ var core_js_modules_es_typed_array_sort_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.typed-array.sort.js */ "./node_modules/core-js/modules/es.typed-array.sort.js");
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-reversed.js */ "./node_modules/core-js/modules/es.typed-array.to-reversed.js");
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-sorted.js */ "./node_modules/core-js/modules/es.typed-array.to-sorted.js");
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.typed-array.with.js */ "./node_modules/core-js/modules/es.typed-array.with.js");
/* harmony import */ var _externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../externals/BigInteger.js */ "./externals/BigInteger.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../streaming/constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");













/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module MssParser
 * @ignore
 * @param {Object} config object
 */




function MssParser(config) {
  config = config || {};
  const BASE64 = config.BASE64;
  const debug = config.debug;
  const constants = config.constants;
  const manifestModel = config.manifestModel;
  const settings = config.settings;
  const DEFAULT_TIME_SCALE = 10000000.0;
  const SUPPORTED_CODECS = ['AAC', 'AACL', 'AACH', 'AACP', 'AVC1', 'H264', 'TTML', 'DFXP'];
  // MPEG-DASH Role and accessibility mapping for text tracks according to ETSI TS 103 285 v1.1.1 (section 7.1.2)
  const ROLE = {
    'CAPT': 'main',
    'SUBT': 'alternate',
    'DESC': 'main'
  };
  const ACCESSIBILITY = {
    'DESC': '2'
  };
  const samplingFrequencyIndex = {
    96000: 0x0,
    88200: 0x1,
    64000: 0x2,
    48000: 0x3,
    44100: 0x4,
    32000: 0x5,
    24000: 0x6,
    22050: 0x7,
    16000: 0x8,
    12000: 0x9,
    11025: 0xA,
    8000: 0xB,
    7350: 0xC
  };
  const mimeTypeMap = {
    'video': 'video/mp4',
    'audio': 'audio/mp4',
    'text': 'application/mp4'
  };
  let instance, logger, initialBufferSettings;
  function setup() {
    logger = debug.getLogger(instance);
  }
  function getAttributeAsBoolean(node, attrName) {
    const value = node.getAttribute(attrName);
    if (!value) {
      return false;
    }
    return value.toLowerCase() === 'true';
  }
  function mapPeriod(smoothStreamingMedia, timescale) {
    const period = {};
    let streams, adaptation;

    // For each StreamIndex node, create an AdaptationSet element
    period.AdaptationSet = [];
    streams = smoothStreamingMedia.getElementsByTagName('StreamIndex');
    for (let i = 0; i < streams.length; i++) {
      adaptation = mapAdaptationSet(streams[i], timescale);
      if (adaptation !== null) {
        period.AdaptationSet.push(adaptation);
      }
    }
    return period;
  }
  function mapAdaptationSet(streamIndex, timescale) {
    const adaptationSet = {};
    const representations = [];
    let segmentTemplate;
    let qualityLevels, representation, i, index;
    const name = streamIndex.getAttribute('Name');
    const type = streamIndex.getAttribute('Type');
    const lang = streamIndex.getAttribute('Language');
    const fallBackId = lang ? type + '_' + lang : type;
    adaptationSet.id = name || fallBackId;
    adaptationSet.contentType = type;
    adaptationSet.lang = lang || 'und';
    adaptationSet.mimeType = mimeTypeMap[type];
    adaptationSet.subType = streamIndex.getAttribute('Subtype');
    adaptationSet.maxWidth = streamIndex.getAttribute('MaxWidth');
    adaptationSet.maxHeight = streamIndex.getAttribute('MaxHeight');

    // Map text tracks subTypes to MPEG-DASH AdaptationSet role and accessibility (see ETSI TS 103 285 v1.1.1, section 7.1.2)
    if (adaptationSet.subType) {
      if (ROLE[adaptationSet.subType]) {
        adaptationSet.Role = [{
          schemeIdUri: 'urn:mpeg:dash:role:2011',
          value: ROLE[adaptationSet.subType]
        }];
      }
      if (ACCESSIBILITY[adaptationSet.subType]) {
        adaptationSet.Accessibility = [{
          schemeIdUri: 'urn:tva:metadata:cs:AudioPurposeCS:2007',
          value: ACCESSIBILITY[adaptationSet.subType]
        }];
      }
    }

    // Create a SegmentTemplate with a SegmentTimeline
    segmentTemplate = mapSegmentTemplate(streamIndex, timescale);
    qualityLevels = streamIndex.getElementsByTagName('QualityLevel');
    // For each QualityLevel node, create a Representation element
    for (i = 0; i < qualityLevels.length; i++) {
      // Propagate BaseURL and mimeType
      qualityLevels[i].BaseURL = adaptationSet.BaseURL;
      qualityLevels[i].mimeType = adaptationSet.mimeType;

      // Set quality level id
      index = qualityLevels[i].getAttribute('Index');
      qualityLevels[i].Id = adaptationSet.id + (index !== null ? '_' + index : '');

      // Map Representation to QualityLevel
      representation = mapRepresentation(qualityLevels[i], streamIndex);
      if (representation !== null) {
        // Copy SegmentTemplate into Representation
        representation.SegmentTemplate = segmentTemplate;
        representations.push(representation);
      }
    }
    if (representations.length === 0) {
      return null;
    }
    adaptationSet.Representation = representations;

    // Set SegmentTemplate
    adaptationSet.SegmentTemplate = segmentTemplate;
    return adaptationSet;
  }
  function mapRepresentation(qualityLevel, streamIndex) {
    const representation = {};
    const type = streamIndex.getAttribute('Type');
    let fourCCValue = null;
    let width = null;
    let height = null;
    representation.id = qualityLevel.Id;
    representation.bandwidth = parseInt(qualityLevel.getAttribute('Bitrate'), 10);
    representation.mimeType = qualityLevel.mimeType;
    width = parseInt(qualityLevel.getAttribute('MaxWidth'), 10);
    height = parseInt(qualityLevel.getAttribute('MaxHeight'), 10);
    if (!isNaN(width)) {
      representation.width = width;
    }
    if (!isNaN(height)) {
      representation.height = height;
    }
    fourCCValue = qualityLevel.getAttribute('FourCC');

    // If FourCC not defined at QualityLevel level, then get it from StreamIndex level
    if (fourCCValue === null || fourCCValue === '') {
      fourCCValue = streamIndex.getAttribute('FourCC');
    }

    // If still not defined (optionnal for audio stream, see https://msdn.microsoft.com/en-us/library/ff728116%28v=vs.95%29.aspx),
    // then we consider the stream is an audio AAC stream
    if (fourCCValue === null || fourCCValue === '') {
      if (type === constants.AUDIO) {
        fourCCValue = 'AAC';
      } else if (type === constants.VIDEO) {
        logger.debug('FourCC is not defined whereas it is required for a QualityLevel element for a StreamIndex of type "video"');
        return null;
      }
    }

    // Check if codec is supported
    if (SUPPORTED_CODECS.indexOf(fourCCValue.toUpperCase()) === -1) {
      // Do not send warning
      logger.warn('Codec not supported: ' + fourCCValue);
      return null;
    }

    // Get codecs value according to FourCC field
    if (fourCCValue === 'H264' || fourCCValue === 'AVC1') {
      representation.codecs = getH264Codec(qualityLevel);
    } else if (fourCCValue.indexOf('AAC') >= 0) {
      representation.codecs = getAACCodec(qualityLevel, fourCCValue);
      representation.audioSamplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
      representation.audioChannels = parseInt(qualityLevel.getAttribute('Channels'), 10);
    } else if (fourCCValue.indexOf('TTML') || fourCCValue.indexOf('DFXP')) {
      representation.codecs = constants.STPP;
    }
    representation.codecPrivateData = '' + qualityLevel.getAttribute('CodecPrivateData');
    representation.BaseURL = qualityLevel.BaseURL;
    return representation;
  }
  function getH264Codec(qualityLevel) {
    let codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
    let nalHeader, avcoti;

    // Extract from the CodecPrivateData field the hexadecimal representation of the following
    // three bytes in the sequence parameter set NAL unit.
    // => Find the SPS nal header
    nalHeader = /00000001[0-9]7/.exec(codecPrivateData);
    // => Find the 6 characters after the SPS nalHeader (if it exists)
    avcoti = nalHeader && nalHeader[0] ? codecPrivateData.substr(codecPrivateData.indexOf(nalHeader[0]) + 10, 6) : undefined;
    return 'avc1.' + avcoti;
  }
  function getAACCodec(qualityLevel, fourCCValue) {
    const samplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
    let codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
    let objectType = 0;
    let codecPrivateDataHex, arr16, indexFreq, extensionSamplingFrequencyIndex;

    //chrome problem, in implicit AAC HE definition, so when AACH is detected in FourCC
    //set objectType to 5 => strange, it should be 2
    if (fourCCValue === 'AACH') {
      objectType = 0x05;
    }
    //if codecPrivateData is empty, build it :
    if (codecPrivateData === undefined || codecPrivateData === '') {
      objectType = 0x02; //AAC Main Low Complexity => object Type = 2
      indexFreq = samplingFrequencyIndex[samplingRate];
      if (fourCCValue === 'AACH') {
        // 4 bytes :     XXXXX         XXXX          XXXX             XXXX                  XXXXX      XXX   XXXXXXX
        //           ' ObjectType' 'Freq Index' 'Channels value'   'Extens Sampl Freq'  'ObjectType'  'GAS' 'alignment = 0'
        objectType = 0x05; // High Efficiency AAC Profile = object Type = 5 SBR
        codecPrivateData = new Uint8Array(4);
        extensionSamplingFrequencyIndex = samplingFrequencyIndex[samplingRate * 2]; // in HE AAC Extension Sampling frequence
        // equals to SamplingRate*2
        //Freq Index is present for 3 bits in the first byte, last bit is in the second
        codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
        codecPrivateData[1] = indexFreq << 7 | qualityLevel.Channels << 3 | extensionSamplingFrequencyIndex >> 1;
        codecPrivateData[2] = extensionSamplingFrequencyIndex << 7 | 0x02 << 2; // origin object type equals to 2 => AAC Main Low Complexity
        codecPrivateData[3] = 0x0; //alignment bits

        arr16 = new Uint16Array(2);
        arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
        arr16[1] = (codecPrivateData[2] << 8) + codecPrivateData[3];
        //convert decimal to hex value
        codecPrivateDataHex = arr16[0].toString(16);
        codecPrivateDataHex = arr16[0].toString(16) + arr16[1].toString(16);
      } else {
        // 2 bytes :     XXXXX         XXXX          XXXX              XXX
        //           ' ObjectType' 'Freq Index' 'Channels value'   'GAS = 000'
        codecPrivateData = new Uint8Array(2);
        //Freq Index is present for 3 bits in the first byte, last bit is in the second
        codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
        codecPrivateData[1] = indexFreq << 7 | parseInt(qualityLevel.getAttribute('Channels'), 10) << 3;
        // put the 2 bytes in an 16 bits array
        arr16 = new Uint16Array(1);
        arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
        //convert decimal to hex value
        codecPrivateDataHex = arr16[0].toString(16);
      }
      codecPrivateData = '' + codecPrivateDataHex;
      codecPrivateData = codecPrivateData.toUpperCase();
      qualityLevel.setAttribute('CodecPrivateData', codecPrivateData);
    } else if (objectType === 0) {
      objectType = (parseInt(codecPrivateData.substr(0, 2), 16) & 0xF8) >> 3;
    }
    return 'mp4a.40.' + objectType;
  }
  function mapSegmentTemplate(streamIndex, timescale) {
    const segmentTemplate = {};
    let mediaUrl, streamIndexTimeScale, url;
    url = streamIndex.getAttribute('Url');
    mediaUrl = url ? url.replace('{bitrate}', '$Bandwidth$') : null;
    mediaUrl = mediaUrl ? mediaUrl.replace('{start time}', '$Time$') : null;
    streamIndexTimeScale = streamIndex.getAttribute('TimeScale');
    streamIndexTimeScale = streamIndexTimeScale ? parseFloat(streamIndexTimeScale) : timescale;
    segmentTemplate.media = mediaUrl;
    segmentTemplate.timescale = streamIndexTimeScale;
    segmentTemplate.SegmentTimeline = mapSegmentTimeline(streamIndex, segmentTemplate.timescale);

    // Patch: set availabilityTimeOffset to Infinity since segments are available as long as they are present in timeline
    segmentTemplate.availabilityTimeOffset = 'INF';
    return segmentTemplate;
  }
  function mapSegmentTimeline(streamIndex, timescale) {
    const segmentTimeline = {};
    const chunks = streamIndex.getElementsByTagName('c');
    const segments = [];
    let segment, prevSegment, tManifest, i, j, r;
    let duration = 0;
    for (i = 0; i < chunks.length; i++) {
      segment = {};

      // Get time 't' attribute value
      tManifest = chunks[i].getAttribute('t');

      // => segment.tManifest = original timestamp value as a string (for constructing the fragment request url, see DashHandler)
      // => segment.t = number value of timestamp (maybe rounded value, but only for 0.1 microsecond)
      if (tManifest && (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(tManifest).greater((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(Number.MAX_SAFE_INTEGER))) {
        segment.tManifest = tManifest;
      }
      segment.t = parseFloat(tManifest);

      // Get duration 'd' attribute value
      segment.d = parseFloat(chunks[i].getAttribute('d'));

      // If 't' not defined for first segment then t=0
      if (i === 0 && !segment.t) {
        segment.t = 0;
      }
      if (i > 0) {
        prevSegment = segments[segments.length - 1];
        // Update previous segment duration if not defined
        if (!prevSegment.d) {
          if (prevSegment.tManifest) {
            prevSegment.d = (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(tManifest).subtract((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prevSegment.tManifest)).toJSNumber();
          } else {
            prevSegment.d = segment.t - prevSegment.t;
          }
          duration += prevSegment.d;
        }
        // Set segment absolute timestamp if not set in manifest
        if (!segment.t) {
          if (prevSegment.tManifest) {
            segment.tManifest = (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prevSegment.tManifest).add((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prevSegment.d)).toString();
            segment.t = parseFloat(segment.tManifest);
          } else {
            segment.t = prevSegment.t + prevSegment.d;
          }
        }
      }
      if (segment.d) {
        duration += segment.d;
      }

      // Create new segment
      segments.push(segment);

      // Support for 'r' attribute (i.e. "repeat" as in MPEG-DASH)
      r = parseFloat(chunks[i].getAttribute('r'));
      if (r) {
        for (j = 0; j < r - 1; j++) {
          prevSegment = segments[segments.length - 1];
          segment = {};
          segment.t = prevSegment.t + prevSegment.d;
          segment.d = prevSegment.d;
          if (prevSegment.tManifest) {
            segment.tManifest = (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prevSegment.tManifest).add((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prevSegment.d)).toString();
          }
          duration += segment.d;
          segments.push(segment);
        }
      }
    }
    segmentTimeline.S = segments;
    segmentTimeline.duration = duration / timescale;
    return segmentTimeline;
  }
  function getKIDFromProtectionHeader(protectionHeader) {
    let prHeader, wrmHeader, xmlReader, KID;

    // Get PlayReady header as byte array (base64 decoded)
    prHeader = BASE64.decodeArray(protectionHeader.firstChild.data);

    // Get Right Management header (WRMHEADER) from PlayReady header
    wrmHeader = getWRMHeaderFromPRHeader(prHeader);
    if (wrmHeader) {
      // Convert from multi-byte to unicode
      wrmHeader = new Uint16Array(wrmHeader.buffer);

      // Convert to string
      wrmHeader = String.fromCharCode.apply(null, wrmHeader);

      // Parse <WRMHeader> to get KID field value
      xmlReader = new DOMParser().parseFromString(wrmHeader, 'application/xml');
      KID = xmlReader.querySelector('KID').textContent;

      // Get KID (base64 decoded) as byte array
      KID = BASE64.decodeArray(KID);

      // Convert UUID from little-endian to big-endian
      convertUuidEndianness(KID);
    }
    return KID;
  }
  function getWRMHeaderFromPRHeader(prHeader) {
    let length, recordCount, recordType, recordLength, recordValue;
    let i = 0;

    // Parse PlayReady header

    // Length - 32 bits (LE format)
    length = (prHeader[i + 3] << 24) + (prHeader[i + 2] << 16) + (prHeader[i + 1] << 8) + prHeader[i]; // eslint-disable-line
    i += 4;

    // Record count - 16 bits (LE format)
    recordCount = (prHeader[i + 1] << 8) + prHeader[i]; // eslint-disable-line
    i += 2;

    // Parse records
    while (i < prHeader.length) {
      // Record type - 16 bits (LE format)
      recordType = (prHeader[i + 1] << 8) + prHeader[i];
      i += 2;

      // Check if Rights Management header (record type = 0x01)
      if (recordType === 0x01) {
        // Record length - 16 bits (LE format)
        recordLength = (prHeader[i + 1] << 8) + prHeader[i];
        i += 2;

        // Record value => contains <WRMHEADER>
        recordValue = new Uint8Array(recordLength);
        recordValue.set(prHeader.subarray(i, i + recordLength));
        return recordValue;
      }
    }
    return null;
  }
  function convertUuidEndianness(uuid) {
    swapBytes(uuid, 0, 3);
    swapBytes(uuid, 1, 2);
    swapBytes(uuid, 4, 5);
    swapBytes(uuid, 6, 7);
  }
  function swapBytes(bytes, pos1, pos2) {
    const temp = bytes[pos1];
    bytes[pos1] = bytes[pos2];
    bytes[pos2] = temp;
  }
  function createPRContentProtection(protectionHeader) {
    let pro = {
      __text: protectionHeader.firstChild.data,
      __prefix: 'mspr'
    };
    return {
      schemeIdUri: 'urn:uuid:' + _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_15__["default"].PLAYREADY_UUID,
      value: _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_15__["default"].PLAYREADY_KEYSTEM_STRING,
      pro: pro
    };
  }
  function createWidevineContentProtection(KID) {
    let widevineCP = {
      schemeIdUri: 'urn:uuid:' + _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_15__["default"].WIDEVINE_UUID,
      value: _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_15__["default"].WIDEVINE_KEYSTEM_STRING
    };
    if (!KID) {
      return widevineCP;
    }
    // Create Widevine CENC header (Protocol Buffer) with KID value
    const wvCencHeader = new Uint8Array(2 + KID.length);
    wvCencHeader[0] = 0x12;
    wvCencHeader[1] = 0x10;
    wvCencHeader.set(KID, 2);

    // Create a pssh box
    const length = 12 /* box length, type, version and flags */ + 16 /* SystemID */ + 4 /* data length */ + wvCencHeader.length;
    let pssh = new Uint8Array(length);
    let i = 0;

    // Set box length value
    pssh[i++] = (length & 0xFF000000) >> 24;
    pssh[i++] = (length & 0x00FF0000) >> 16;
    pssh[i++] = (length & 0x0000FF00) >> 8;
    pssh[i++] = length & 0x000000FF;

    // Set type ('pssh'), version (0) and flags (0)
    pssh.set([0x70, 0x73, 0x73, 0x68, 0x00, 0x00, 0x00, 0x00], i);
    i += 8;

    // Set SystemID ('edef8ba9-79d6-4ace-a3c8-27dcd51d21ed')
    pssh.set([0xed, 0xef, 0x8b, 0xa9, 0x79, 0xd6, 0x4a, 0xce, 0xa3, 0xc8, 0x27, 0xdc, 0xd5, 0x1d, 0x21, 0xed], i);
    i += 16;

    // Set data length value
    pssh[i++] = (wvCencHeader.length & 0xFF000000) >> 24;
    pssh[i++] = (wvCencHeader.length & 0x00FF0000) >> 16;
    pssh[i++] = (wvCencHeader.length & 0x0000FF00) >> 8;
    pssh[i++] = wvCencHeader.length & 0x000000FF;

    // Copy Widevine CENC header
    pssh.set(wvCencHeader, i);

    // Convert to BASE64 string
    pssh = String.fromCharCode.apply(null, pssh);
    pssh = BASE64.encodeASCII(pssh);
    widevineCP.pssh = {
      __text: pssh
    };
    return widevineCP;
  }
  function processManifest(xmlDoc) {
    const manifest = {};
    const contentProtections = [];
    const smoothStreamingMedia = xmlDoc.getElementsByTagName('SmoothStreamingMedia')[0];
    const protection = xmlDoc.getElementsByTagName('Protection')[0];
    let protectionHeader = null;
    let period, adaptations, contentProtection, KID, timestampOffset, startTime, segments, timescale, segmentDuration, i, j;

    // Set manifest node properties
    manifest.protocol = 'MSS';
    manifest.profiles = 'urn:mpeg:dash:profile:isoff-live:2011';
    manifest.type = getAttributeAsBoolean(smoothStreamingMedia, 'IsLive') ? 'dynamic' : 'static';
    timescale = smoothStreamingMedia.getAttribute('TimeScale');
    manifest.timescale = timescale ? parseFloat(timescale) : DEFAULT_TIME_SCALE;
    let dvrWindowLength = parseFloat(smoothStreamingMedia.getAttribute('DVRWindowLength'));
    // If the DVRWindowLength field is omitted for a live presentation or set to 0, the DVR window is effectively infinite
    if (manifest.type === 'dynamic' && (dvrWindowLength === 0 || isNaN(dvrWindowLength))) {
      dvrWindowLength = Infinity;
    }
    // Star-over
    if (dvrWindowLength === 0 && getAttributeAsBoolean(smoothStreamingMedia, 'CanSeek')) {
      dvrWindowLength = Infinity;
    }
    if (dvrWindowLength > 0) {
      manifest.timeShiftBufferDepth = dvrWindowLength / manifest.timescale;
    }
    let duration = parseFloat(smoothStreamingMedia.getAttribute('Duration'));
    manifest.mediaPresentationDuration = duration === 0 ? Infinity : duration / manifest.timescale;
    // By default, set minBufferTime to 2 sec. (but set below according to video segment duration)
    manifest.minBufferTime = 2;
    manifest.ttmlTimeIsRelative = true;

    // Live manifest with Duration = start-over
    if (manifest.type === 'dynamic' && duration > 0) {
      manifest.type = 'static';
      // We set timeShiftBufferDepth to initial duration, to be used by MssFragmentController to update segment timeline
      manifest.timeShiftBufferDepth = duration / manifest.timescale;
      // Duration will be set according to current segment timeline duration (see below)
    }
    if (manifest.type === 'dynamic') {
      manifest.refreshManifestOnSwitchTrack = true; // Refresh manifest when switching tracks
      manifest.doNotUpdateDVRWindowOnBufferUpdated = true; // DVRWindow is update by MssFragmentMoofPocessor based on tfrf boxes
      manifest.ignorePostponeTimePeriod = true; // Never update manifest
      manifest.availabilityStartTime = new Date(null); // Returns 1970
    }

    // Map period node to manifest root node
    period = mapPeriod(smoothStreamingMedia, manifest.timescale);
    manifest.Period = [period];

    // Initialize period start time
    period.start = 0;

    // Uncomment to test live to static manifests
    // if (manifest.type !== 'static') {
    //     manifest.type = 'static';
    //     manifest.mediaPresentationDuration = manifest.timeShiftBufferDepth;
    //     manifest.timeShiftBufferDepth = null;
    // }

    // ContentProtection node
    if (protection !== undefined) {
      protectionHeader = xmlDoc.getElementsByTagName('ProtectionHeader')[0];

      // Some packagers put newlines into the ProtectionHeader base64 string, which is not good
      // because this cannot be correctly parsed. Let's just filter out any newlines found in there.
      protectionHeader.firstChild.data = protectionHeader.firstChild.data.replace(/\n|\r/g, '');

      // Get KID (in CENC format) from protection header
      KID = getKIDFromProtectionHeader(protectionHeader);

      // Create ContentProtection for PlayReady
      contentProtection = createPRContentProtection(protectionHeader);
      contentProtection['cenc:default_KID'] = KID;
      contentProtections.push(contentProtection);

      // Create ContentProtection for Widevine (as a CENC protection)
      contentProtection = createWidevineContentProtection(KID);
      contentProtection['cenc:default_KID'] = KID;
      contentProtections.push(contentProtection);
      manifest.ContentProtection = contentProtections;
    }
    adaptations = period.AdaptationSet;
    for (i = 0; i < adaptations.length; i += 1) {
      adaptations[i].SegmentTemplate.initialization = '$Bandwidth$';
      // Propagate content protection information into each adaptation
      if (manifest.ContentProtection !== undefined) {
        adaptations[i].ContentProtection = manifest.ContentProtection;
        adaptations[i].ContentProtection = manifest.ContentProtection;
      }
      if (adaptations[i].contentType === 'video') {
        // Get video segment duration
        segmentDuration = adaptations[i].SegmentTemplate.SegmentTimeline.S[0].d / adaptations[i].SegmentTemplate.timescale;
        // Set minBufferTime to one segment duration
        manifest.minBufferTime = segmentDuration;
        if (manifest.type === 'dynamic') {
          // Match timeShiftBufferDepth to video segment timeline duration
          if (manifest.timeShiftBufferDepth > 0 && manifest.timeShiftBufferDepth !== Infinity && manifest.timeShiftBufferDepth > adaptations[i].SegmentTemplate.SegmentTimeline.duration) {
            manifest.timeShiftBufferDepth = adaptations[i].SegmentTemplate.SegmentTimeline.duration;
          }
        }
      }
    }

    // Cap minBufferTime to timeShiftBufferDepth
    manifest.minBufferTime = Math.min(manifest.minBufferTime, manifest.timeShiftBufferDepth ? manifest.timeShiftBufferDepth : Infinity);

    // In case of live streams:
    // 1- configure player buffering properties according to target live delay
    // 2- adapt live delay and then buffers length in case timeShiftBufferDepth is too small compared to target live delay (see PlaybackController.computeLiveDelay())
    // 3- Set retry attempts and intervals for FragmentInfo requests
    if (manifest.type === 'dynamic') {
      let targetLiveDelay = settings.get().streaming.delay.liveDelay;
      if (!targetLiveDelay) {
        const liveDelayFragmentCount = settings.get().streaming.delay.liveDelayFragmentCount !== null && !isNaN(settings.get().streaming.delay.liveDelayFragmentCount) ? settings.get().streaming.delay.liveDelayFragmentCount : 4;
        targetLiveDelay = segmentDuration * liveDelayFragmentCount;
      }
      let targetDelayCapping = Math.max(manifest.timeShiftBufferDepth - 10 /*END_OF_PLAYLIST_PADDING*/, manifest.timeShiftBufferDepth / 2);
      let liveDelay = Math.min(targetDelayCapping, targetLiveDelay);
      // Consider a margin of more than one segment in order to avoid Precondition Failed errors (412), for example if audio and video are not correctly synchronized
      let bufferTime = liveDelay - segmentDuration * 1.5;

      // Store initial buffer settings
      initialBufferSettings = {
        'streaming': {
          'buffer': {
            'bufferTimeDefault': settings.get().streaming.buffer.bufferTimeDefault,
            'bufferTimeAtTopQuality': settings.get().streaming.buffer.bufferTimeAtTopQuality,
            'bufferTimeAtTopQualityLongForm': settings.get().streaming.buffer.bufferTimeAtTopQualityLongForm
          },
          'timeShiftBuffer': {
            calcFromSegmentTimeline: settings.get().streaming.timeShiftBuffer.calcFromSegmentTimeline
          },
          'delay': {
            'liveDelay': settings.get().streaming.delay.liveDelay
          }
        }
      };
      settings.update({
        'streaming': {
          'buffer': {
            'bufferTimeDefault': bufferTime,
            'bufferTimeAtTopQuality': bufferTime,
            'bufferTimeAtTopQualityLongForm': bufferTime
          },
          'timeShiftBuffer': {
            calcFromSegmentTimeline: true
          },
          'delay': {
            'liveDelay': liveDelay
          }
        }
      });
    }

    // Delete Content Protection under root manifest node
    delete manifest.ContentProtection;

    // In case of VOD streams, check if start time is greater than 0
    // Then determine timestamp offset according to higher audio/video start time
    // (use case = live stream delinearization)
    if (manifest.type === 'static') {
      // In case of start-over stream and manifest reloading (due to track switch)
      // we consider previous timestampOffset to keep timelines synchronized
      var prevManifest = manifestModel.getValue();
      if (prevManifest && prevManifest.timestampOffset) {
        timestampOffset = prevManifest.timestampOffset;
      } else {
        for (i = 0; i < adaptations.length; i++) {
          if (adaptations[i].contentType === constants.AUDIO || adaptations[i].contentType === constants.VIDEO) {
            segments = adaptations[i].SegmentTemplate.SegmentTimeline.S;
            startTime = segments[0].t;
            if (timestampOffset === undefined) {
              timestampOffset = startTime;
            }
            timestampOffset = Math.min(timestampOffset, startTime);
            // Correct content duration according to minimum adaptation's segment timeline duration
            // in order to force <video> element sending 'ended' event
            manifest.mediaPresentationDuration = Math.min(manifest.mediaPresentationDuration, adaptations[i].SegmentTemplate.SegmentTimeline.duration);
          }
        }
      }
      if (timestampOffset > 0) {
        // Patch segment templates timestamps and determine period start time (since audio/video should not be aligned to 0)
        manifest.timestampOffset = timestampOffset;
        for (i = 0; i < adaptations.length; i++) {
          segments = adaptations[i].SegmentTemplate.SegmentTimeline.S;
          for (j = 0; j < segments.length; j++) {
            if (!segments[j].tManifest) {
              segments[j].tManifest = segments[j].t.toString();
            }
            segments[j].t -= timestampOffset;
          }
          if (adaptations[i].contentType === constants.AUDIO || adaptations[i].contentType === constants.VIDEO) {
            period.start = Math.max(segments[0].t, period.start);
            adaptations[i].SegmentTemplate.presentationTimeOffset = period.start;
          }
        }
        period.start /= manifest.timescale;
      }
    }

    // Floor the duration to get around precision differences between segments timestamps and MSE buffer timestamps
    // and then avoid 'ended' event not being raised
    manifest.mediaPresentationDuration = Math.floor(manifest.mediaPresentationDuration * 1000) / 1000;
    period.duration = manifest.mediaPresentationDuration;
    return manifest;
  }
  function parseDOM(data) {
    let xmlDoc = null;
    if (window.DOMParser) {
      const parser = new window.DOMParser();
      xmlDoc = parser.parseFromString(data, 'text/xml');
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('parsing the manifest failed');
      }
    }
    return xmlDoc;
  }
  function getIron() {
    return null;
  }
  function internalParse(data) {
    let xmlDoc = null;
    let manifest = null;
    const startTime = window.performance.now();

    // Parse the MSS XML manifest
    xmlDoc = parseDOM(data);
    const xmlParseTime = window.performance.now();
    if (xmlDoc === null) {
      return null;
    }

    // Convert MSS manifest into DASH manifest
    manifest = processManifest(xmlDoc, new Date());
    const mss2dashTime = window.performance.now();
    logger.info('Parsing complete: (xmlParsing: ' + (xmlParseTime - startTime).toPrecision(3) + 'ms, mss2dash: ' + (mss2dashTime - xmlParseTime).toPrecision(3) + 'ms, total: ' + ((mss2dashTime - startTime) / 1000).toPrecision(3) + 's)');
    return manifest;
  }
  function reset() {
    // Restore initial buffer settings
    if (initialBufferSettings) {
      settings.update(initialBufferSettings);
    }
  }
  instance = {
    parse: internalParse,
    getIron: getIron,
    reset: reset
  };
  setup();
  return instance;
}
MssParser.__dashjs_factory_name = 'MssParser';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_14__["default"].getClassFactory(MssParser));

/***/ }),

/***/ "./src/streaming/MediaPlayerEvents.js":
/*!********************************************!*\
  !*** ./src/streaming/MediaPlayerEvents.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/events/EventsBase.js */ "./src/core/events/EventsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @class
 * @implements EventsBase
 */
class MediaPlayerEvents extends _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @description Public facing external events to be used when developing a player that implements dash.js.
   */
  constructor() {
    super();
    /**
     * Triggered when playback will not start yet
     * as the MPD's availabilityStartTime is in the future.
     * Check delay property in payload to determine time before playback will start.
     * @event MediaPlayerEvents#AST_IN_FUTURE
     */
    this.AST_IN_FUTURE = 'astInFuture';

    /**
     * Triggered when the BaseURLs have been updated.
     * @event MediaPlayerEvents#BASE_URLS_UPDATED
     */
    this.BASE_URLS_UPDATED = 'baseUrlsUpdated';

    /**
     * Triggered when the video element's buffer state changes to stalled.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_EMPTY
     */
    this.BUFFER_EMPTY = 'bufferStalled';

    /**
     * Triggered when the video element's buffer state changes to loaded.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_LOADED
     */
    this.BUFFER_LOADED = 'bufferLoaded';

    /**
     * Triggered when the video element's buffer state changes, either stalled or loaded. Check payload for state.
     * @event MediaPlayerEvents#BUFFER_LEVEL_STATE_CHANGED
     */
    this.BUFFER_LEVEL_STATE_CHANGED = 'bufferStateChanged';

    /**
     * Triggered when the buffer level of a media type has been updated
     * @event MediaPlayerEvents#BUFFER_LEVEL_UPDATED
     */
    this.BUFFER_LEVEL_UPDATED = 'bufferLevelUpdated';

    /**
     * Triggered when a font signalled by a DVB Font Download has been added to the document FontFaceSet interface.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_ADDED
     */
    this.DVB_FONT_DOWNLOAD_ADDED = 'dvbFontDownloadAdded';

    /**
     * Triggered when a font signalled by a DVB Font Download has successfully downloaded and the FontFace can be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_COMPLETE
     */
    this.DVB_FONT_DOWNLOAD_COMPLETE = 'dvbFontDownloadComplete';

    /**
     * Triggered when a font signalled by a DVB Font Download could not be successfully downloaded, so the FontFace will not be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_FAILED
     */
    this.DVB_FONT_DOWNLOAD_FAILED = 'dvbFontDownloadFailed';

    /**
     * Triggered when a dynamic stream changed to static (transition phase between Live and On-Demand).
     * @event MediaPlayerEvents#DYNAMIC_TO_STATIC
     */
    this.DYNAMIC_TO_STATIC = 'dynamicToStatic';

    /**
     * Triggered when there is an error from the element or MSE source buffer.
     * @event MediaPlayerEvents#ERROR
     */
    this.ERROR = 'error';
    /**
     * Triggered when a fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_COMPLETED
     */
    this.FRAGMENT_LOADING_COMPLETED = 'fragmentLoadingCompleted';

    /**
     * Triggered when a partial fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_PROGRESS
     */
    this.FRAGMENT_LOADING_PROGRESS = 'fragmentLoadingProgress';
    /**
     * Triggered when a fragment download has started.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_STARTED
     */
    this.FRAGMENT_LOADING_STARTED = 'fragmentLoadingStarted';

    /**
     * Triggered when a fragment download is abandoned due to detection of slow download base on the ABR abandon rule..
     * @event MediaPlayerEvents#FRAGMENT_LOADING_ABANDONED
     */
    this.FRAGMENT_LOADING_ABANDONED = 'fragmentLoadingAbandoned';

    /**
     * Triggered when {@link module:Debug} logger methods are called.
     * @event MediaPlayerEvents#LOG
     */
    this.LOG = 'log';

    /**
     * Triggered when the manifest load is started
     * @event MediaPlayerEvents#MANIFEST_LOADING_STARTED
     */
    this.MANIFEST_LOADING_STARTED = 'manifestLoadingStarted';

    /**
     * Triggered when the manifest loading is finished, providing the request object information
     * @event MediaPlayerEvents#MANIFEST_LOADING_FINISHED
     */
    this.MANIFEST_LOADING_FINISHED = 'manifestLoadingFinished';

    /**
     * Triggered when the manifest load is complete, providing the payload
     * @event MediaPlayerEvents#MANIFEST_LOADED
     */
    this.MANIFEST_LOADED = 'manifestLoaded';

    /**
     * Triggered anytime there is a change to the overall metrics.
     * @event MediaPlayerEvents#METRICS_CHANGED
     */
    this.METRICS_CHANGED = 'metricsChanged';

    /**
     * Triggered when an individual metric is added, updated or cleared.
     * @event MediaPlayerEvents#METRIC_CHANGED
     */
    this.METRIC_CHANGED = 'metricChanged';

    /**
     * Triggered every time a new metric is added.
     * @event MediaPlayerEvents#METRIC_ADDED
     */
    this.METRIC_ADDED = 'metricAdded';

    /**
     * Triggered every time a metric is updated.
     * @event MediaPlayerEvents#METRIC_UPDATED
     */
    this.METRIC_UPDATED = 'metricUpdated';

    /**
     * Triggered when a new stream (period) starts.
     * @event MediaPlayerEvents#PERIOD_SWITCH_STARTED
     */
    this.PERIOD_SWITCH_STARTED = 'periodSwitchStarted';

    /**
     * Triggered at the stream end of a period.
     * @event MediaPlayerEvents#PERIOD_SWITCH_COMPLETED
     */
    this.PERIOD_SWITCH_COMPLETED = 'periodSwitchCompleted';

    /**
     * Triggered when an ABR up /down switch is initiated; either by user in manual mode or auto mode via ABR rules.
     * @event MediaPlayerEvents#QUALITY_CHANGE_REQUESTED
     */
    this.QUALITY_CHANGE_REQUESTED = 'qualityChangeRequested';

    /**
     * Triggered when the new ABR quality is being rendered on-screen.
     * @event MediaPlayerEvents#QUALITY_CHANGE_RENDERED
     */
    this.QUALITY_CHANGE_RENDERED = 'qualityChangeRendered';

    /**
     * Triggered when the new track is being selected
     * @event MediaPlayerEvents#NEW_TRACK_SELECTED
     */
    this.NEW_TRACK_SELECTED = 'newTrackSelected';

    /**
     * Triggered when the new track is being rendered.
     * @event MediaPlayerEvents#TRACK_CHANGE_RENDERED
     */
    this.TRACK_CHANGE_RENDERED = 'trackChangeRendered';

    /**
     * Triggered when a stream (period) is being loaded
     * @event MediaPlayerEvents#STREAM_INITIALIZING
     */
    this.STREAM_INITIALIZING = 'streamInitializing';

    /**
     * Triggered when a stream (period) is loaded
     * @event MediaPlayerEvents#STREAM_UPDATED
     */
    this.STREAM_UPDATED = 'streamUpdated';

    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_ACTIVATED
     */
    this.STREAM_ACTIVATED = 'streamActivated';

    /**
     * Triggered when a stream (period) is deactivated
     * @event MediaPlayerEvents#STREAM_DEACTIVATED
     */
    this.STREAM_DEACTIVATED = 'streamDeactivated';

    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_INITIALIZED
     */
    this.STREAM_INITIALIZED = 'streamInitialized';

    /**
     * Triggered when the player has been reset.
     * @event MediaPlayerEvents#STREAM_TEARDOWN_COMPLETE
     */
    this.STREAM_TEARDOWN_COMPLETE = 'streamTeardownComplete';

    /**
     * Triggered once all text tracks detected in the MPD are added to the video element.
     * @event MediaPlayerEvents#TEXT_TRACKS_ADDED
     */
    this.TEXT_TRACKS_ADDED = 'allTextTracksAdded';

    /**
     * Triggered when a text track is added to the video element's TextTrackList
     * @event MediaPlayerEvents#TEXT_TRACK_ADDED
     */
    this.TEXT_TRACK_ADDED = 'textTrackAdded';

    /**
     * Triggered when a text track should be shown
     * @event MediaPlayerEvents#CUE_ENTER
     */
    this.CUE_ENTER = 'cueEnter';

    /**
     * Triggered when a text track should be hidden
     * @event MediaPlayerEvents#CUE_ENTER
     */
    this.CUE_EXIT = 'cueExit';

    /**
     * Triggered when a throughput measurement based on the last segment request has been stored
     * @event MediaPlayerEvents#THROUGHPUT_MEASUREMENT_STORED
     */
    this.THROUGHPUT_MEASUREMENT_STORED = 'throughputMeasurementStored';

    /**
     * Triggered when a ttml chunk is parsed.
     * @event MediaPlayerEvents#TTML_PARSED
     */
    this.TTML_PARSED = 'ttmlParsed';

    /**
     * Triggered when a ttml chunk has to be parsed.
     * @event MediaPlayerEvents#TTML_TO_PARSE
     */
    this.TTML_TO_PARSE = 'ttmlToParse';

    /**
     * Triggered when a caption is rendered.
     * @event MediaPlayerEvents#CAPTION_RENDERED
     */
    this.CAPTION_RENDERED = 'captionRendered';

    /**
     * Triggered when the caption container is resized.
     * @event MediaPlayerEvents#CAPTION_CONTAINER_RESIZE
     */
    this.CAPTION_CONTAINER_RESIZE = 'captionContainerResize';

    /**
     * Sent when enough data is available that the media can be played,
     * at least for a couple of frames.  This corresponds to the
     * HAVE_ENOUGH_DATA readyState.
     * @event MediaPlayerEvents#CAN_PLAY
     */
    this.CAN_PLAY = 'canPlay';

    /**
     * This corresponds to the CAN_PLAY_THROUGH readyState.
     * @event MediaPlayerEvents#CAN_PLAY_THROUGH
     */
    this.CAN_PLAY_THROUGH = 'canPlayThrough';

    /**
     * Sent when playback completes.
     * @event MediaPlayerEvents#PLAYBACK_ENDED
     */
    this.PLAYBACK_ENDED = 'playbackEnded';

    /**
     * Sent when an error occurs.  The element's error
     * attribute contains more information.
     * @event MediaPlayerEvents#PLAYBACK_ERROR
     */
    this.PLAYBACK_ERROR = 'playbackError';

    /**
     * This event is fired once the playback has been initialized by MediaPlayer.js.
     * After that event methods such as setTextTrack() can be used.
     * @event MediaPlayerEvents#PLAYBACK_INITIALIZED
     */
    this.PLAYBACK_INITIALIZED = 'playbackInitialized';

    /**
     * Sent when playback is not allowed (for example if user gesture is needed).
     * @event MediaPlayerEvents#PLAYBACK_NOT_ALLOWED
     */
    this.PLAYBACK_NOT_ALLOWED = 'playbackNotAllowed';

    /**
     * The media's metadata has finished loading; all attributes now
     * contain as much useful information as they're going to.
     * @event MediaPlayerEvents#PLAYBACK_METADATA_LOADED
     */
    this.PLAYBACK_METADATA_LOADED = 'playbackMetaDataLoaded';

    /**
     * The event is fired when the frame at the current playback position of the media has finished loading;
     * often the first frame
     * @event MediaPlayerEvents#PLAYBACK_LOADED_DATA
     */
    this.PLAYBACK_LOADED_DATA = 'playbackLoadedData';

    /**
     * Sent when playback is paused.
     * @event MediaPlayerEvents#PLAYBACK_PAUSED
     */
    this.PLAYBACK_PAUSED = 'playbackPaused';

    /**
     * Sent when the media begins to play (either for the first time, after having been paused,
     * or after ending and then restarting).
     *
     * @event MediaPlayerEvents#PLAYBACK_PLAYING
     */
    this.PLAYBACK_PLAYING = 'playbackPlaying';

    /**
     * Sent periodically to inform interested parties of progress downloading
     * the media. Information about the current amount of the media that has
     * been downloaded is available in the media element's buffered attribute.
     * @event MediaPlayerEvents#PLAYBACK_PROGRESS
     */
    this.PLAYBACK_PROGRESS = 'playbackProgress';

    /**
     * Sent when the playback speed changes.
     * @event MediaPlayerEvents#PLAYBACK_RATE_CHANGED
     */
    this.PLAYBACK_RATE_CHANGED = 'playbackRateChanged';

    /**
     * Sent when a seek operation completes.
     * @event MediaPlayerEvents#PLAYBACK_SEEKED
     */
    this.PLAYBACK_SEEKED = 'playbackSeeked';

    /**
     * Sent when a seek operation begins.
     * @event MediaPlayerEvents#PLAYBACK_SEEKING
     */
    this.PLAYBACK_SEEKING = 'playbackSeeking';

    /**
     * Sent when the video element reports stalled
     * @event MediaPlayerEvents#PLAYBACK_STALLED
     */
    this.PLAYBACK_STALLED = 'playbackStalled';

    /**
     * Sent when playback of the media starts after having been paused;
     * that is, when playback is resumed after a prior pause event.
     *
     * @event MediaPlayerEvents#PLAYBACK_STARTED
     */
    this.PLAYBACK_STARTED = 'playbackStarted';

    /**
     * The time indicated by the element's currentTime attribute has changed.
     * @event MediaPlayerEvents#PLAYBACK_TIME_UPDATED
     */
    this.PLAYBACK_TIME_UPDATED = 'playbackTimeUpdated';

    /**
     * Sent when the video element reports that the volume has changed
     * @event MediaPlayerEvents#PLAYBACK_VOLUME_CHANGED
     */
    this.PLAYBACK_VOLUME_CHANGED = 'playbackVolumeChanged';

    /**
     * Sent when the media playback has stopped because of a temporary lack of data.
     *
     * @event MediaPlayerEvents#PLAYBACK_WAITING
     */
    this.PLAYBACK_WAITING = 'playbackWaiting';

    /**
     * Manifest validity changed - As a result of an MPD validity expiration event.
     * @event MediaPlayerEvents#MANIFEST_VALIDITY_CHANGED
     */
    this.MANIFEST_VALIDITY_CHANGED = 'manifestValidityChanged';

    /**
     * Dash events are triggered at their respective start points on the timeline.
     * @event MediaPlayerEvents#EVENT_MODE_ON_START
     */
    this.EVENT_MODE_ON_START = 'eventModeOnStart';

    /**
     * Dash events are triggered as soon as they were parsed.
     * @event MediaPlayerEvents#EVENT_MODE_ON_RECEIVE
     */
    this.EVENT_MODE_ON_RECEIVE = 'eventModeOnReceive';

    /**
     * Event that is dispatched whenever the player encounters a potential conformance validation that might lead to unexpected/not optimal behavior
     * @event MediaPlayerEvents#CONFORMANCE_VIOLATION
     */
    this.CONFORMANCE_VIOLATION = 'conformanceViolation';

    /**
     * Event that is dispatched whenever the player switches to a different representation
     * @event MediaPlayerEvents#REPRESENTATION_SWITCH
     */
    this.REPRESENTATION_SWITCH = 'representationSwitch';

    /**
     * Event that is dispatched whenever an adaptation set is removed due to all representations not being supported.
     * @event MediaPlayerEvents#ADAPTATION_SET_REMOVED_NO_CAPABILITIES
     */
    this.ADAPTATION_SET_REMOVED_NO_CAPABILITIES = 'adaptationSetRemovedNoCapabilities';

    /**
     * Triggered when a content steering request has completed.
     * @event MediaPlayerEvents#CONTENT_STEERING_REQUEST_COMPLETED
     */
    this.CONTENT_STEERING_REQUEST_COMPLETED = 'contentSteeringRequestCompleted';

    /**
     * Triggered when an inband prft (ProducerReferenceTime) boxes has been received.
     * @event MediaPlayerEvents#INBAND_PRFT
     */
    this.INBAND_PRFT = 'inbandPrft';

    /**
     * The streaming attribute of the Managed Media Source is true
     * @type {string}
     */
    this.MANAGED_MEDIA_SOURCE_START_STREAMING = 'managedMediaSourceStartStreaming';

    /**
     * The streaming attribute of the Managed Media Source is false
     * @type {string}
     */
    this.MANAGED_MEDIA_SOURCE_END_STREAMING = 'managedMediaSourceEndStreaming';
  }
}
let mediaPlayerEvents = new MediaPlayerEvents();
/* harmony default export */ __webpack_exports__["default"] = (mediaPlayerEvents);

/***/ }),

/***/ "./src/streaming/constants/ProtectionConstants.js":
/*!********************************************************!*\
  !*** ./src/streaming/constants/ProtectionConstants.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR
 *  PROFITS, OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Protection Constants declaration
 * @ignore
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  CLEARKEY_KEYSTEM_STRING: 'org.w3.clearkey',
  WIDEVINE_KEYSTEM_STRING: 'com.widevine.alpha',
  PLAYREADY_KEYSTEM_STRING: 'com.microsoft.playready',
  PLAYREADY_RECOMMENDATION_KEYSTEM_STRING: 'com.microsoft.playready.recommendation',
  WIDEVINE_UUID: 'edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
  PLAYREADY_UUID: '9a04f079-9840-4286-ab92-e65be0885f95',
  CLEARKEY_UUID: 'e2719d58-a985-b3c9-781a-b030af78d30e',
  W3C_CLEARKEY_UUID: '1077efec-c0b2-4d02-ace3-3c1e52e2fb4b',
  INITIALIZATION_DATA_TYPE_CENC: 'cenc',
  INITIALIZATION_DATA_TYPE_KEYIDS: 'keyids',
  INITIALIZATION_DATA_TYPE_WEBM: 'webm',
  ENCRYPTION_SCHEME_CENC: 'cenc',
  ENCRYPTION_SCHEME_CBCS: 'cbcs',
  MEDIA_KEY_MESSAGE_TYPES: {
    LICENSE_REQUEST: 'license-request',
    LICENSE_RENEWAL: 'license-renewal',
    LICENSE_RELEASE: 'license-release',
    INDIVIDUALIZATION_REQUEST: 'individualization-request'
  },
  ROBUSTNESS_STRINGS: {
    WIDEVINE: {
      SW_SECURE_CRYPTO: 'SW_SECURE_CRYPTO',
      SW_SECURE_DECODE: 'SW_SECURE_DECODE',
      HW_SECURE_CRYPTO: 'HW_SECURE_CRYPTO',
      HW_SECURE_DECODE: 'HW_SECURE_DECODE',
      HW_SECURE_ALL: 'HW_SECURE_ALL'
    }
  },
  MEDIA_KEY_STATUSES: {
    USABLE: 'usable',
    EXPIRED: 'expired',
    RELEASED: 'released',
    OUTPUT_RESTRICTED: 'output-restricted',
    OUTPUT_DOWNSCALED: 'output-downscaled',
    STATUS_PENDING: 'status-pending',
    INTERNAL_ERROR: 'internal-error'
  }
});

/***/ }),

/***/ "./src/streaming/vo/DashJSError.js":
/*!*****************************************!*\
  !*** ./src/streaming/vo/DashJSError.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class DashJSError {
  constructor(code, message, data) {
    this.code = code || null;
    this.message = message || null;
    this.data = data || null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (DashJSError);

/***/ }),

/***/ "./src/streaming/vo/DataChunk.js":
/*!***************************************!*\
  !*** ./src/streaming/vo/DataChunk.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
class DataChunk {
  //Represents a data structure that keep all the necessary info about a single init/media segment
  constructor() {
    this.streamId = null;
    this.segmentType = null;
    this.index = NaN;
    this.bytes = null;
    this.start = NaN;
    this.end = NaN;
    this.duration = NaN;
    this.representation = null;
    this.endFragment = null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (DataChunk);

/***/ }),

/***/ "./src/streaming/vo/FragmentRequest.js":
/*!*********************************************!*\
  !*** ./src/streaming/vo/FragmentRequest.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @class
 * @ignore
 */
class FragmentRequest {
  constructor(url) {
    this.action = FragmentRequest.ACTION_DOWNLOAD;
    this.availabilityEndTime = null;
    this.availabilityStartTime = null;
    this.bandwidth = NaN;
    this.bytesLoaded = NaN;
    this.bytesTotal = NaN;
    this.delayLoadingTime = NaN;
    this.duration = NaN;
    this.endDate = null;
    this.firstByteDate = null;
    this.index = NaN;
    this.isPartialSegmentRequest = false;
    this.mediaStartTime = NaN;
    this.mediaType = null;
    this.presentationStartTime = NaN;
    this.range = null;
    this.representation = null;
    this.responseType = 'arraybuffer';
    this.retryAttempts = 0;
    this.serviceLocation = null;
    this.startDate = null;
    this.startTime = NaN;
    this.timescale = NaN;
    this.type = null;
    this.url = url || null;
    this.wallStartTime = null;
  }
  isInitializationRequest() {
    return this.type && this.type === _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__.HTTPRequest.INIT_SEGMENT_TYPE;
  }
  setInfo(info) {
    this.type = info && info.init ? _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__.HTTPRequest.INIT_SEGMENT_TYPE : _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__.HTTPRequest.MEDIA_SEGMENT_TYPE;
    this.url = info && info.url ? info.url : null;
    this.range = info && info.range ? info.range.start + '-' + info.range.end : null;
    this.mediaType = info && info.mediaType ? info.mediaType : null;
    this.representation = info && info.representation ? info.representation : null;
  }
}
FragmentRequest.ACTION_DOWNLOAD = 'download';
FragmentRequest.ACTION_COMPLETE = 'complete';
/* harmony default export */ __webpack_exports__["default"] = (FragmentRequest);

/***/ }),

/***/ "./src/streaming/vo/metrics/HTTPRequest.js":
/*!*************************************************!*\
  !*** ./src/streaming/vo/metrics/HTTPRequest.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTPRequest: function() { return /* binding */ HTTPRequest; },
/* harmony export */   HTTPRequestTrace: function() { return /* binding */ HTTPRequestTrace; }
/* harmony export */ });
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @classdesc This Object holds reference to the HTTPRequest for manifest, fragment and xlink loading.
 * Members which are not defined in ISO23009-1 Annex D should be prefixed by a _ so that they are ignored
 * by Metrics Reporting code.
 * @ignore
 */
class HTTPRequest {
  /**
   * @class
   */
  constructor() {
    /**
     * Identifier of the TCP connection on which the HTTP request was sent.
     * @public
     */
    this.tcpid = null;
    /**
     * This is an optional parameter and should not be included in HTTP request/response transactions for progressive download.
     * The type of the request:
     * - MPD
     * - XLink expansion
     * - Initialization Fragment
     * - Index Fragment
     * - Media Fragment
     * - Bitstream Switching Fragment
     * - other
     * @public
     */
    this.type = null;
    /**
     * The original URL (before any redirects or failures)
     * @public
     */
    this.url = null;
    /**
     * The actual URL requested, if different from above
     * @public
     */
    this.actualurl = null;
    /**
     * The contents of the byte-range-spec part of the HTTP Range header.
     * @public
     */
    this.range = null;
    /**
     * Real-Time | The real time at which the request was sent.
     * @public
     */
    this.trequest = null;
    /**
     * Real-Time | The real time at which the first byte of the response was received.
     * @public
     */
    this.tresponse = null;
    /**
     * The HTTP response code.
     * @public
     */
    this.responsecode = null;
    /**
     * The duration of the throughput trace intervals (ms), for successful requests only.
     * @public
     */
    this.interval = null;
    /**
     * Throughput traces, for successful requests only.
     * @public
     */
    this.trace = [];
    /**
     * The CMSD static and dynamic values retrieved from CMSD response headers.
     * @public
     */
    this.cmsd = null;

    /**
     * Type of stream ("audio" | "video" etc..)
     * @public
     */
    this._stream = null;
    /**
     * Real-Time | The real time at which the request finished.
     * @public
     */
    this._tfinish = null;
    /**
     * The duration of the media requests, if available, in seconds.
     * @public
     */
    this._mediaduration = null;
    /**
     * all the response headers from request.
     * @public
     */
    this._responseHeaders = null;
    /**
     * The selected service location for the request. string.
     * @public
     */
    this._serviceLocation = null;
    /**
     * The type of the loader that was used. Distinguish between fetch loader and xhr loader
     */
    this._fileLoaderType = null;
    /**
     * The values derived from the ResourceTimingAPI.
     */
    this._resourceTimingValues = null;
  }
}

/**
 * @classdesc This Object holds reference to the progress of the HTTPRequest.
 * @ignore
 */
class HTTPRequestTrace {
  /**
   * @class
   */
  constructor() {
    /**
     * Real-Time | Measurement stream start.
     * @public
     */
    this.s = null;
    /**
     * Measurement stream duration (ms).
     * @public
     */
    this.d = null;
    /**
     * List of integers counting the bytes received in each trace interval within the measurement stream.
     * @public
     */
    this.b = [];
  }
}
HTTPRequest.GET = 'GET';
HTTPRequest.HEAD = 'HEAD';
HTTPRequest.MPD_TYPE = 'MPD';
HTTPRequest.XLINK_EXPANSION_TYPE = 'XLinkExpansion';
HTTPRequest.INIT_SEGMENT_TYPE = 'InitializationSegment';
HTTPRequest.INDEX_SEGMENT_TYPE = 'IndexSegment';
HTTPRequest.MEDIA_SEGMENT_TYPE = 'MediaSegment';
HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE = 'BitstreamSwitchingSegment';
HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE = 'FragmentInfoSegment';
HTTPRequest.DVB_REPORTING_TYPE = 'DVBReporting';
HTTPRequest.LICENSE = 'license';
HTTPRequest.CONTENT_STEERING_TYPE = 'ContentSteering';
HTTPRequest.OTHER_TYPE = 'other';


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/global */
/******/ !function() {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ !function() {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ }();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/mss/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MssHandler: function() { return /* reexport safe */ _MssHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _MssHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MssHandler.js */ "./src/mss/MssHandler.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



// Shove both of these into the global scope
var context = typeof window !== 'undefined' && window || global;
var dashjs = context.dashjs;
if (!dashjs) {
  dashjs = context.dashjs = {};
}
dashjs.MssHandler = _MssHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (dashjs);

__webpack_exports__ = __webpack_exports__["default"];
var __webpack_exports__MssHandler = __webpack_exports__.MssHandler;
var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__MssHandler as MssHandler, __webpack_exports__default as default };

//# sourceMappingURL=dash.mss.debug.js.map