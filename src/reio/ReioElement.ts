import invariant from 'invariant';
import {ReioComponent} from './ReioComponent';
import {JSX} from './types';

type ParsedChildren = [] | [JSX.ChildFunction] | JSX.ChildElement[];

// No support for functional components yet
const isReioInstance = (instance: any) => {
  const prototype = instance && instance.component && instance.component.prototype;
  if (prototype) {
    return prototype instanceof ReioComponent;
  }
  return false;
};

export function createReioElement<Props, Entity>(
  component: JSX.Component<Props, Entity>,
  props: Props,
  ...ch: any[]
): JSX.Element<Props, Entity> {
  const filtered: ParsedChildren = ch.filter(child =>
    child && ((typeof child === 'function' && isReioInstance(child())) || isReioInstance(child)),
  );
  const filteredLength = filtered.length;

  let children = null;
  if (filteredLength) {
    if (filtered.some(child => typeof child === 'function')) {
      invariant(filteredLength === 1, 'JSX.ChildFunction could be used as the only child');
      children = (filtered[0] as unknown) as JSX.ChildFunction;
    } else {
      children = filtered;
    }
  }

  return {
    component,
    props,
    children,
  };
}
