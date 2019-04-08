import Reio, {JSX} from '../../src/reio';

class TestComponent extends Reio.Component<any, any> {
  priority = 0;

  entity() {
    return;
  }
}

/**
 * #createReioElement is applied for JSX elements by typescript internally ("jsxFactory" prop @ tsconfig)
 * not needed to use it manually
 */
describe('ReioElement', () => {
  describe('createReioElement', () => {
    let E: JSX.Element<void, void>;

    it('should return reference to a class for "component" prop as JSX.ChildElement', () => {
      E = (
        <TestComponent>
          <TestComponent />
        </TestComponent>
      );

      expect((E.children as any)[0].component).toBe(TestComponent);
    });

    it(`should return "null" for "children" prop if there is only a value(s) of primitive type given
          and value of JSX.Children type if at least one valid component provided`, () => {
      E = <TestComponent>''</TestComponent>;
      expect(E.children).toBe(null);

      E = (
        <TestComponent>
          ''
          <TestComponent />
        </TestComponent>
      );
      expect(Array.isArray(E.children)).toBe(true);
      expect((E.children as JSX.ChildElement[]).length).toBe(1);

      E = <TestComponent>{1}</TestComponent>;
      expect(E.children).toBe(null);

      E = (
        <TestComponent>
          <TestComponent />
          {1}
          <TestComponent />
        </TestComponent>
      );
      expect(Array.isArray(E.children)).toBe(true);
      expect((E.children as JSX.ChildElement[]).length).toBe(2);

      E = <TestComponent>{''}</TestComponent>;
      expect(E.children).toBe(null);

      E = <TestComponent>{true}</TestComponent>;
      expect(E.children).toBe(null);

      E = <TestComponent>{Symbol()}</TestComponent>;
      expect(E.children).toBe(null);
    });

    it(`should return the value of JSX.ChildFunction type for "children" prop only if
          the function that component returns extended from ReioComponent component and it's the only child`, () => {
      E = <TestComponent>{() => <TestComponent />}</TestComponent>;
      expect(typeof E.children).toBe('function');

      try {
        E = (
          <TestComponent>
            {() => <TestComponent />}
            <TestComponent />
          </TestComponent>
        );
      } catch (error) {
        expect(error).toBeTruthy();
      }

      function Mock1() {}
      E = <TestComponent>{() => <Mock1 />}</TestComponent>;
      expect(E.children).toBe(null);

      class Mock2 {}
      E = <TestComponent>{() => <Mock2 />}</TestComponent>;
      expect(E.children).toBe(null);

      E = <TestComponent>{() => {}}</TestComponent>;
      expect(E.children).toBe(null);

      E = <TestComponent>{() => 1}</TestComponent>;
      expect(E.children).toBe(null);
    });
  });
});
