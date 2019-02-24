import * as invariant from 'invariant';
import {JSX, Reio} from './types';

export function registerNode<Props = void, Entity = void>(
  element: JSX.Element<Props, Entity> | (() => JSX.Element<Props, Entity>),
  parent: Reio.Instance<any, any> | null = null,
) {
  if (typeof element === 'function') {
    registerNode(element(), parent);
  } else {
    const {component, props, children} = element;

    const instance = new component(props, children);
    if (process.env.NODE_ENV === 'development' && parent) {
      hasLowerPriority(parent, instance);
    }

    instance.componentWillMount();

    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child) {
          registerNode(child, instance);
        }
      });
    }

    instance.componentDidMount();
  }
}

function hasLowerPriority(
  {displayName: dnParent, priority: pParent}: Reio.Instance<any, any>,
  {displayName: dnChild, priority: pChild}: Reio.Instance<any, any>,
) {
  invariant(
    pParent < pChild,
    `Parent component (${dnParent} = ${pParent}) should have lower priority than child component (${dnChild} = ${pChild})!`,
  );
}
