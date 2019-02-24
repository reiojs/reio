export namespace JSX {
  export type Child = Element<void, void> | null;
  // TODO: children as function
  export type Children = Child[] | null;

  export type Element<Props, Entity> = {
    component: Component<Props, Entity>;
    props: Props;
    children: Children;
  };

  export type Component<Props, Entity> = {
    new (props: Props, children: Children): Reio.Instance<Props, Entity>;
  };
}

export namespace Reio {
  export type Instance<Props, Entity> = {
    (props: Props, children: JSX.Children): JSX.Element<Props, Entity>;

    displayName: string;
    priority: Priority;

    componentWillMount(): void; // exec before children
    componentDidMount(): void; // exec after children

    entity(): Entity;
  };
}

export enum Priority {
  Server = 1,
  Router = 2,
  Route = 3,
  Middleware = 2,
  Database = 4,
}
