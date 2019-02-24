import Reio from '../reio';
import {Server, Router} from '../common/server';
const {Route} = Router;

const App = () => (
  <Server port={8080}>
    <Router>
      <Route method="get" path="/" />
    </Router>
  </Server>
);

Reio.register(App);
