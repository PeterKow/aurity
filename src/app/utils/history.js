import createBrowserHistory from 'history/lib/createBrowserHistory';

// const history = process.env.NODE_ENV === 'production' ? createHashHistory() : createBrowserHistory();

const history = createBrowserHistory()

export default history
