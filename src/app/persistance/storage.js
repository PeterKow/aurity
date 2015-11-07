let storage = {}

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

export function clear() {
  storage.clear()
}


function init() {
  storage = window.localStorage ? window.localStorage : window.sessionStorage
  if (!storage) {
    throw new Error('local and session storage not supported!')
  }
}
