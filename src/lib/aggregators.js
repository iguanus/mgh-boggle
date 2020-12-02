const push = (array, value) => [...array, value]
const plus_1 = (item) => item + 1
const group = (list, key, defaultValue, fn) => {
  return list.reduce((acc, item) => {
    const itemKey = recursiveKeyValue(item, key);
    // ensures key exist with default
    if (!acc[itemKey]) { acc[itemKey] = defaultValue }
    
    acc[itemKey] = fn(acc[itemKey], item);
    
    return acc
  }, {})
}
const recursiveKeyValue = (item, keys) => {
  // ensures key can be treated as array
  const arrayedKeys = [keys].flat(Infinity);
  if (arrayedKeys.length > 1) {
    const newKeys = arrayedKeys.slice(1, keys.length);
    return newKeys.reduce((acc, k) => {
      return acc[k]
    }, item[arrayedKeys[0]])
  } else {
    return item[keys];
  }
}

export const groupList = (list, key) => 
  group(list, key, [], push);

export const groupCount = (list, key) => 
  group(list, key, 0, plus_1)

