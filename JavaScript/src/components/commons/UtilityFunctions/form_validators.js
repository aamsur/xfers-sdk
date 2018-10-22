import {isBlank} from 'UtilityFunctions'
import moment from 'moment'
import _isString from 'lodash/isString'


/*
* arrayOfValidators takes in an array of strings/objects with first value
* whose key corresponds to a specific validator in validatorsMap.
* e.g. ["required", {minValue: 4}, {maxValue: 9}]
*
* Further modifications are needed for custom error messages.
* 	1) Cannot use reduce anymore, change to for/forEach
* 	2) On validation fail, return boolean value with custom error message of
*				validation it failed at
*
* return value is a boolean: true if all validators are satisfied, false if
* any one validator fails
*/
export function fieldValidator(value, arrayOfValidators) {
	try {
		const reducer = (accumulator, currentValue) => {
			if (typeof currentValue === 'string') {
				return accumulator && validatorsMap[currentValue](value);
			} else {
				// FIXME: Need modification to introduce custom errors msgs
				const key = Object.keys(currentValue)[0];
				return accumulator && validatorsMap[key](currentValue[key], value);
			}
		}
		return arrayOfValidators.reduce(reducer, true);
	} catch (err) {
		// to catch reference errors of non-existent validators
		console.error(err)
	}
}

// TODO: format, equalTo, asyncValidation
const validatorsMap = {
	required: presenceChecker,
	numbersOnly: containsNumbersOnly,
	lettersOrSpacesOnly: containsLettersOrSpacesOnly,
	email: isEmail,
	url: isUrl,
	date: isDate,
	maxLength: withinMaxLength,
	minLength: atLeastMinLength,
	maxValue: atMostMaxValue,
	minValue: atLeastMinValue
}

// checkers below can be use in redux form validation

export function presenceChecker(value) {
	return !isBlank(value);
}

export function isString(value) {
	return _isString(value);
}

export function isNumber(value) {
	return !isNaN(Number(value));
}

export function containsNumbersOnly(value) {
	var numOnlyRegExp = new RegExp('^[0-9]+$');
	return numOnlyRegExp.test(value);
}

export function containsNumbersOrLettersOnly(value) {
	var numOrLetterRegExp = /^[0-9a-zA-Z]+$/;
	return numOrLetterRegExp.test(value);
}

// Javascript does not support unicode characters natively, so names like
// Peter Müller will not pass. Usage is up to own discretion
export function containsLettersOrSpacesOnly(value) {
	var lettersOrSpacesOnlyRegExp = /^[a-zA-Z\s'.-]*$/;
	return lettersOrSpacesOnlyRegExp.test(value);
}

export function isEmail(value) {
	// This is a simple regex that only checks if value satisfies string@string format
	var emailRegExp = /^\S+@\S+/;
	return emailRegExp.test(value);
}

export function isUrl(value) {
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

// Default date format is DD/MM/YYYY
export function isDate(value) {
	return typeof value === 'string' ?
		moment(value, 'DD/MM/YYYY', true).isValid() :
		false;
}

export function isNricNumber(value) {
	const nricRegExp = /^[STFG]\d{7}[A-Z]$/;
	return nricRegExp.test(value);
}

export function withinMaxLength(maxLength, value) {
	return typeof value === 'string' ?
		(value.length <= maxLength) :
		false;
}

export function atLeastMinLength(minLength, value) {
	return typeof value === 'string' ?
		(value.length >= minLength) :
		false;
}

export function atMostMaxValue(maxVal, value) {
	const intVal = parseInt(value);
	return intVal.toString() !== 'NaN' ?
		(intVal <= maxVal) :
		false;
}

export function atLeastMinValue(minVal, value) {
	const intVal = parseInt(value);
	return intVal.toString() !== 'NaN' ?
		(intVal >= minVal) :
		false;
}

export function isValidPassword(value) {
	return value.length >= 8 &&
				 /[a-z]/.test(value) &&
				 /[A-Z]/.test(value) &&
				 /[0-9]/.test(value);
}

// TODO:
// function formatChecker(format, value) {

// }

// function equalTo(val, value) {

// }
