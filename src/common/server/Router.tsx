import Reio, {Priority, JSX} from '../../reio';
import {app, router, express} from './context';

type RouteProps = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  response: string;
};

type RouteEntity = express.Handler;

class Route extends Reio.Component<RouteProps, RouteEntity> {
  priority = Priority.Route;

  entity: RouteEntity = (req, res, next) => {
    res.send(this.props.response);
  };

  componentDidMount() {
    const {path, method} = this.props;
    router[method](path, this.entity);
  }
}

type RouterProps = {};
type RouterEntity = express.Router;
type RouterChildren = JSX.ChildFunction;

export class Router extends Reio.Component<RouterProps, RouterEntity, RouterChildren> {
  static Route = Route;

  priority = Priority.Router;

  entity = router;

  componentWillMount() {
    app.use(router);
  }
}
