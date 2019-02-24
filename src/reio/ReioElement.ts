import {JSX} from './types';

export const createReioElement = <Props, Entity>(
  component: JSX.Component<Props, Entity>,
  props: Props,
  ...children: JSX.Child[]
): JSX.Element<Props, Entity> => ({
  component,
  props,
  children,
});
