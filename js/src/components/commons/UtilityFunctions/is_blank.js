//https://github.com/ianstormtaylor/is-empty/blob/master/lib/index.js
// modified to handle Dates
// Mimic ruby .blank?

const has = Object.prototype.hasOwnProperty;

const toString = Object.prototype.toString;

export default function isBlank(val) {
  // Catches Null and Undefined...
  if (val == null) return true;

  // Booleans...
  if ('boolean' == typeof val) return !val;

  // Numbers...
  if ('number' == typeof val) return val.toString() === 'NaN';

  // Strings...
  if ('string' == typeof val) return val.trim() === '';

  // Functions...
  if ('function' == typeof val) return false;

  // Arrays...
  if (Array.isArray(val)) return val.length === 0;

  // Errors...
  if (val instanceof Error) return val.message === '';

  // Dates...
  if (val instanceof Date) return val.toString() === "Invalid Date";

  // Objects...
  if (val.toString == toString) {
    switch (val.toString()) {

      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0
      }

      // Plain objects...
      case '[object Object]': {
        for (let key in val) {
          if (has.call(val, key)) return false
        }

        return true
      }
    }
  }

  // Anything else default to browser implementation
  return !val
}