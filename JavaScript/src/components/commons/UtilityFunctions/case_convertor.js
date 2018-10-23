import camelCase from 'camel-case' // version 1.2.0
import snakeCase from 'snake-case' // version 1.1.1

function changeKeys(transformer, obj) {
  let objectKeys;

  if (Array.isArray(obj)) {
    return obj.map(function keysMap(key) {
      if(typeof key === 'string') {
        return key
      }

      return changeKeys(transformer, key);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    objectKeys = Object.keys(obj);
    return objectKeys.map(function keysMap(key) {
      return transformer(key);
    }).reduce(function keysReducer(object, changedKey, index) {
      let objValue;
      let transformedValue;

      objValue = obj[objectKeys[index]];
      transformedValue = changeKeys(transformer, objValue);
      object[changedKey] = transformedValue;
      return object;
    }, {});
  }

  return obj;
};

function camelCaseObject(obj) {
  if (typeof obj === 'string') {
    return camelCase(obj);
  }
  return changeKeys(camelCase, obj);
};

function snakeCaseObject(obj) {
  if (typeof obj === 'string') {
    return snakeCase(obj);
  }
  return changeKeys(snakeCase, obj);
};

// exceptions is an object allow you assign key's name
// { originKey: 'assignedKey' }

const toSnake = (obj, exceptions={}) => {
  let snakeObj = snakeCaseObject(obj)
  Object.entries(exceptions).forEach(([key, val])=>{
    const transKey = Object.keys(snakeCaseObject({[key]:''}))[0]
    snakeObj = changeKeys((objKey)=> transKey === objKey ? val : objKey , snakeObj)
  })

  return snakeObj
}

const toCamel = (obj, exceptions={}) => {
  let camelObj = camelCaseObject(obj)
  Object.entries(exceptions).forEach(([key, val])=>{
    const transKey = Object.keys(camelCaseObject({[key]:''}))[0]
    camelObj = changeKeys((objKey)=> transKey === objKey ? val : objKey , camelObj)
  })

  return camelObj
}

export default {toSnake, toCamel}
