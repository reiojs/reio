import Reio, {Priority} from '../../reio';
import {app, express} from './context';

type ServerProps = {
  port: number;

};

export class Server extends Reio.Component<ServerProps, express.Express> {
  priority = Priority.Server;

  componentDidMount() {
    const {port} = this.props;
    app.listen(port);
  }

  entity() {
    return app;
  }
}
