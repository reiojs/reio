import Reio, {Priority} from '../../reio';
import {app, express} from './context';

type ServerProps = {
  port: number;
};

export class Server extends Reio.Component<ServerProps, express.Express> {
  priority = Priority.Server;

  entity = app;

  componentDidMount() {
    const {port} = this.props;
    this.entity.listen(port);
  }
}
