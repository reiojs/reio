import invariant from 'invariant';
import {JSX, Priority, Reio} from './types';

export abstract class ReioComponent<Props, Entity, Children = JSX.Children> {
  constructor(public props: Props, public children: Children) {}

  public abstract priority: Priority;
  public abstract entity: Entity;

  public displayName = this.constructor.name || 'ReioComponent';

  public componentWillMount() {}
  public componentDidMount() {}

  public present(): JSX.Children {
    return (this.children as unknown) as JSX.Children;
  }
}

export function fromComponent<Props, Entity>(
  element: JSX.Element<Props, Entity>,
): Reio.Instance<Props, Entity> {
  return invariant(false, 'Not implemented yet') as any;
}
