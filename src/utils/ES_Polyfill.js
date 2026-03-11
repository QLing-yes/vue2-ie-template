/** 模拟部分高版本ES标准库的实现 - 增强 IE11 覆盖 */
const polyfill = {
  Promise: {
    withResolvers() {
      let resolve;
      let reject;
      const promise = new Promise((_res, _rej) => { [resolve, reject] = [_res, _rej]; });
      return { promise, resolve, reject };
    }
  },
  Array: {
    prototype: {
      at(index) {
        if (index < 0) return this[this.length + index];
        return this[index];
      },
      // IE11 缺失 Array.prototype.includes
      includes(searchElement, fromIndex = 0) {
        const arr = this;
        const len = arr.length;
        if (len === 0) return false;
        const start = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);
        for (let i = start; i < len; i++) {
          if (arr[i] === searchElement) return true;
        }
        return false;
      },
      // IE11 缺失 Array.prototype.find
      find(callback, thisArg) {
        const arr = this;
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          if (callback.call(thisArg, arr[i], i, arr)) return arr[i];
        }
        return undefined;
      }
    }
  },
  Object: {
    // IE11 缺失 Object.assign
    assign(target, ...sources) {
      if (target == null) throw new TypeError('Cannot convert undefined or null to object');
      const to = Object(target);
      sources.forEach(source => {
        if (source != null) {
          Object.keys(source).forEach(key => {
            to[key] = source[key];
          });
        }
      });
      return to;
    },
    // IE11 缺失 Object.entries
    entries(obj) {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i);
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    }
  },
  String: {
    prototype: {
      // IE11 缺失 String.prototype.padStart
      padStart(length, padChar = ' ') {
        if (this.length >= length) return this;
        return (padChar.repeat(length) + this).slice(-length);
      },
      // IE11 缺失 String.prototype.padEnd
      padEnd(length, padChar = ' ') {
        if (this.length >= length) return this;
        return (this + padChar.repeat(length)).slice(0, length);
      }
    }
  }
};

// 挂载 Polyfill 到全局
Promise.withResolvers = polyfill.Promise.withResolvers;
Array.prototype.at = polyfill.Array.prototype.at;
Array.prototype.includes = polyfill.Array.prototype.includes;
Array.prototype.find = polyfill.Array.prototype.find;
Object.assign = polyfill.Object.assign;
Object.entries = polyfill.Object.entries;
String.prototype.padStart = polyfill.String.prototype.padStart;
String.prototype.padEnd = polyfill.String.prototype.padEnd;

// 额外修复 IE11 中 Function.prototype.bind 兼容问题（部分场景失效）
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    const aArgs = Array.prototype.slice.call(arguments, 1);
    const fToBind = this;
    const fNOP = function () {};
    const fBound = function () {
      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}