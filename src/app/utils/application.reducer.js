import * as storage from '../persistance/storage.js';

const initApplication = {
  locale: storage.get('locale') || 'en',
};

export function application(state = initApplication) {
  return state;
}
