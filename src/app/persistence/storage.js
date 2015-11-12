let storageObject = {}
const storage = {
  set: set,
  get: get,
  remove: remove,
  clearAll: clearAll,
}

const db = {
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  clear: clear,
}
let dbStore = {}

init()

export default storage

function set(key, value) {
  storageObject.setItem(key, value)
}

function get(key) {
  return storageObject.getItem(key)
}

function remove(key) {
  return storageObject.removeItem(key)
}

function clearAll() {
  storageObject.clear()
}

function init() {
  const localOk = testBrowser(window.localStorage)
  const sessionOk = testBrowser(window.sessionStorage)
  storageObject = window.localStorage ? window.localStorage : window.sessionStorage
  if (localOk) {
    storageObject = window.localStorage
  } else if (sessionOk) {
    storageObject = window.sessionStorage
  } else {
    storageObject = db
    console.log('db', storageObject)
  }
}

function testBrowser(testStorage) {
  try {
    testStorage.setItem('test', true)
  } catch (err) {
    return false
  }
  return true
}

function setItem(key, value) {
  dbStore[key] = value
}

function getItem(key) {
  return dbStore[key]
}

function removeItem(key) {
  dbStore[key] = undefined
}

function clear() {
  dbStore = {}
}
