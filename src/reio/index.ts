import {default as Reio} from './Reio';

export default Reio;
export * from './types';

global.__DEV__ = process.env.NODE_ENV === 'development';
