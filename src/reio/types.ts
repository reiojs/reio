export namespace JSX {
  export type ChildElement = Element<void, void>;
  export type ChildFunction = (...args: any[]) => Element<void, void>;
  export type Children = ChildElement[] | ChildElement | ChildFunction | null;

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
    entity: Entity;

    componentWillMount(): void; // exec before children
    componentDidMount(): void; // exec after children

    present(): JSX.Children;
  };
}

export enum Priority {
  Server = 1,
  Router = 2,
  Route = 3,
  Middleware = 2,
  Database = 4,
}
