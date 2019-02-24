import Reio, {Priority} from '../../reio';
import {app, router, express} from './context';

type RouteProps = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
};

class Route extends Reio.Component<RouteProps, express.Handler> {
  priority = Priority.Route;

  private handler: express.Handler = (req, res, next) => {
    res.send('test');
  };

  componentDidMount() {
    const {path, method} = this.props;
    router[method](path, this.handler);
  }

  entity() {
    return this.handler;
  }
}

type RouterProps = {};

export class Router extends Reio.Component<RouterProps, express.Router> {
  static Route = Route;

  priority = Priority.Router;

  componentWillMount() {
    app.use(router);
  }

  entity() {
    return router;
  }
}
