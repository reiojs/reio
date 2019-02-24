import * as invariant from 'invariant';
import {JSX, Priority, Reio} from './types';

export abstract class ReioComponent<Props, Entity> {
  constructor(public props: Props, public children: JSX.Children) {}

  public abstract priority: Priority;
  public abstract entity(): Entity;

  public displayName = this.constructor.name || 'ReioComponent';

  public componentWillMount() {}
  public componentDidMount() {}
}

export function fromComponent<Props, Entity>(
  element: JSX.Element<Props, Entity>,
): Reio.Instance<Props, Entity> {
  return invariant(false, 'Not implemented yet') as any;
}
