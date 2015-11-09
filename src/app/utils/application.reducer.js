import storage from 'persistence/storage.js';

const initApplication = {
  locale: storage.get('locale') || 'en',
};

export function application(state = initApplication) {
  return state;
}
