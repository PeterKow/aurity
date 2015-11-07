let storage = {}
const db = {
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  clear: clear,
}
let dbStore = {}

init()

export function put(key, value) {
  storage.setItem(key, value)
}

export function get(key) {
  return storage.getItem(key)
}

export function remove(key) {
  return storage.removeItem(key)
}

export function clearAll() {
  storage.clear()
}


function init() {
  storage = window.localStorage ? window.localStorage : window.sessionStorage
  if (!storage) {
    storage = db
  }
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