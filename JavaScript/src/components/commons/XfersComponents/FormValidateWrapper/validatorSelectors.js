import {createSelector} from 'reselect'
import _isString from 'lodash/isString'
import _isPlainObject from 'lodash/isPlainObject'

export function stringChecker(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      return _isString(value);
    }
  )
}

export function containsNumbersOnly(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      const numOnlyRegExp = /^[0-9]+$/;
	    return numOnlyRegExp.test(value);
    }
  )
}

export function containsNumbersOrLettersOnly(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      const numOnlyRegExp = /^[0-9a-zA-Z]+$/;
	    return numOnlyRegExp.test(value);
    }
  )
}

export function dateChecker(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      return !isNaN(new Date(value));
    }
  )
}

export function containsLettersOrSpacesOnly(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      const lettersOrSpacesOnlyRegExp = /^[a-zA-Z\s'.,-]*$/;
	    return lettersOrSpacesOnlyRegExp.test(value);
    }
  )
}

export function isNricNumber(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      const nricRegExp = /^[STFG]\d{7}[A-Z]$/;
      return nricRegExp.test(value);
    }
  )
}

export function isUrl(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      var urlRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
      /*
      https://codegolf.stackexchange.com/questions/464/shortest-url-regex-match-in-javascript
      (^|\s)                            : ensure that we are not matching an url
                                          embeded in an other string
      (https?:\/\/)?                    : the http or https schemes (optional)
      [\w-]+(\.[\w-]+)+\.?              : domain name with at least two components;
                                          allows a trailing dot
      (:\d+)?                           : the port (optional)
      (\/\S*)?                          : the path (optional)
      */
      return urlRegExp.test(value);
    }
  )
}

export function minPriceChecker(key) {
  return createSelector(
    state => state,
    ({[key]: value}) => {
      const min = parseFloat(value);
      return isNaN(min) ? false : min >= 0;
    }
  )
}

// hack: value could be productPriceMax or {productPriceMin, productPriceMax}
export function maxPriceChecker(key) {
  return createSelector(
    state => state,
    ({[key]: value, productPriceMin: minValue}) => {
      let min, max;
      if(_isPlainObject(value)) {
        const { productPriceMin, productPriceMax } = value
        min = parseFloat(productPriceMin);
        max = parseFloat(productPriceMax);
      }else{
        min = parseFloat(minValue);
        max = parseFloat(value);
      }
      return isNaN(max) ? false : max >= min;
    }
  )
}
