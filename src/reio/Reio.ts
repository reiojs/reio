import {ReioComponent, fromComponent as _fromComponent} from './ReioComponent';
import {createReioElement} from './ReioElement';
import {registerNode} from './ReioNode';

namespace Reio {
  export const Component = ReioComponent;
  export const fromComponent = _fromComponent;
  export const createElement = createReioElement;
  export const register = registerNode;
}

export default Reio;
