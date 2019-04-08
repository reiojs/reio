import invariant from 'invariant';
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
    if (global.__DEV__) {
      if (parent) {
        hasLowerPriority(parent, instance);
      }
    }

    instance.componentWillMount();

    const instanceChildren = instance.present();

    if (instanceChildren) {
      if (Array.isArray(instanceChildren)) {
        instanceChildren.forEach(child => {
          if (child) {
            registerNode(child, instance);
          }
        });
      } else {
        registerNode(instanceChildren, instance);
      }
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
    `Parent component (%s = %s) should have lower priority than child component (%s = %s)!`,
    dnParent,
    pParent,
    dnChild,
    pChild,
  );
}
