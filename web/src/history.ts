import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
history.location.state = null;

export default history;
