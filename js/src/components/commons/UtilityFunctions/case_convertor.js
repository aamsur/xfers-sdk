import changeCase from "change-case-object"

function changeKeys (transformer, obj) {
  let objectKeys;

  if (Array.isArray(obj)) {
    return obj.map(function keysMap(key) {
      if (typeof key === 'string') {
        return transformer(key);
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

// exceptions is an object allow you assign key's name
// { originKey: 'assignedKey' }

const toSnake = (obj, exceptions={}) => {
  let snakeObj = changeCase.snakeCase(obj)
  Object.entries(exceptions).forEach(([key, val])=>{
    const transKey = Object.keys(changeCase.snakeCase({[key]:''}))[0]
    snakeObj = changeKeys((objKey)=> transKey === objKey ? val : objKey , snakeObj)
  })

  return snakeObj
}

const toCamel = (obj, exceptions={}) => {
  let camelObj = changeCase.camelCase(obj)
  Object.entries(exceptions).forEach(([key, val])=>{
    const transKey = Object.keys(changeCase.camelCase({[key]:''}))[0]
    camelObj = changeKeys((objKey)=> transKey === objKey ? val : objKey , camelObj)
  })

  return camelObj
}

export default {toSnake, toCamel}
