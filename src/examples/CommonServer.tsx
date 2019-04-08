import Reio from '../reio';
import {Server, Router} from '../common/server';
const {Route} = Router;

const App = () => (
  <Server port={8080}>
    <Router>
      <Route path="/" method="get" response="Hello world" />
    </Router>
  </Server>
);

Reio.register(App);
